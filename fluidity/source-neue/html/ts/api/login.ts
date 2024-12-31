const { ipcRenderer } = require("electron");
import friendsManager from "../friends/logic/friendManager.js";
import { Toast } from "../toasts/toastManager.js";
import swapi from "./SWAPI.js";

export const enum LoginReqType {
    NORMAL, AUTHTOKEN, FREE
}

export const enum LoginStatus {
    SUCCESS,
    HWID_RESET
}

export interface LoginResponse {
    status: LoginStatus;
    message: string;
}


export async function doLogin(type: LoginReqType, username?: string, password?: string): Promise<LoginResponse> {
    let authToken;
    if (type == LoginReqType.AUTHTOKEN) {
        if (!username) throw new Error("Please enter an auth token");
        authToken = username;
    } else if (type == LoginReqType.NORMAL) {
        if (!username || !password) throw new Error("Please enter a username and password");
        const [success, code, token] = (await ipcRenderer.invoke("auth", [username, password])).split(".");

        if (success == "true") { authToken = token; } else {
            switch (code) {
                case "1002":
                    ipcRenderer.invoke("auth-set-account", { username, password });
                    return { status: LoginStatus.HWID_RESET, message: "You're logging in from a new device. Please enter the code sent to your email to continue." };
                case "1001":
                    ipcRenderer.invoke("auth-delete-account", { username });
                    throw new Error("Invalid username or password");

                case "9999": throw new Error("To protect our customers, Fluidity is temporarily unavailable. We apologize for the inconvenience.");

                case "502":
                case "false.998":
                case "998": throw new Error("Sorry, we're having technical difficulties. Please try again later. (" + code + ")");

                case "1006": throw new Error("This account has been disabled. Please check your email for more information.");
                case "1005": throw new Error("You have logged in on too many devices recently. Please try again later.");

                case "1004":
                    open("https://support.apple.com/en-us/HT203413");
                    throw new Error("Your system clock is incorrect. Please set it to the correct time and try again.");

                default:
                    throw new Error("Sorry, there was an error. (" + code + ")");
            }
        }
    }

    if (authToken) {
        swapi.clientAuthToken = authToken;
        await swapi.ensureDashboardAuthToken();

        if (!swapi.userInfo) throw new Error("Failed to get user info");

        if (type == LoginReqType.NORMAL) {
            if (username !== swapi.userInfo?.username) { ipcRenderer.invoke("auth-delete-account", { username }); }
            ipcRenderer.invoke("auth-set-account", { username: swapi.userInfo.username, password });
        }

        localStorage.setItem("cachedUserInfo_" + swapi.userInfo.username, JSON.stringify(swapi.userInfo));

        friendsManager.connectToRt();
    }
    ipcRenderer.send("authenticated", authToken);

    new Toast({
        icon: "waving_hand",
        title: swapi.userInfo?.username ? "Welcome," : "Welcome",
        message: swapi.userInfo?.username ? (swapi.userInfo!.username + "!") : "to Fluidity!",
        type: "accent",
        timeout: 3000
    });

    return { status: LoginStatus.SUCCESS, message: "Welcome!" };
}

export async function do2FA(code: string) {
    if (!code) throw new Error("Please enter a code");
    const [success, errCode] = (await ipcRenderer.invoke("auth", code)).split(".");
    if (success == "true") return true;
    else throw new Error("An issue occured. Please check your code and try again. (" + errCode + ")");
}