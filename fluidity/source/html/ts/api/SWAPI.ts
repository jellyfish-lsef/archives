import { MockClientAPI, MockDashboardAPI } from "./mock.js";

class SWAPI {
    API_BASE = "https://fluidity.developer.com";

    async makeClientApiRequest(url: string, options?: RequestInit): Promise<Response> {
        if (!this.clientAuthToken) throw new Error("not logged in!");
        if (1) return MockClientAPI(url, options);

        options = options || {};
        options.body = this.clientAuthToken;
        options.method = "POST";
        const f = await fetch(this.API_BASE + "/api/" + url, options);
        if (f.status == 429) {
            console.log("Rate limited, waiting...");
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return this.makeClientApiRequest(url, options);
        }
        return f;
    }

    clientAuthToken = "";
    username = "";
    dashboardAuthToken?: string;
    userInfo?: LocalUserInfo;

    async getUsername(): Promise<string> {
        if (this.username) return this.username;
        const request = await this.makeClientApiRequest("username");
        if (!request.ok) throw new Error("Failed to get username");
        const username = await request.text();
        this.username = username;
        return username;
    }

    async ensureDashboardAuthToken(): Promise<string> {
        if (this.dashboardAuthToken) return this.dashboardAuthToken;
        if (1) {
            this.userInfo = {
                avatar: "https://i.imgur.com/COgqRID.png",
                created_at: "1970-01-01T00:00:00.000Z",
                email: "fluidityuser@example.com",
                has_i: true,
                has_m: true,
                has_w: true,
                id: 1,
                is_staff: true,
                last_login: "1970-01-01T00:00:00.000Z",
                role_id: 1,
                status: "",
                two_factor_enabled: false,
                updated_at: "1970-01-01T00:00:00.000Z",
                username: "FluidityUser"
            };

            return "fake dashboard auth token";
        }

        const stored = localStorage.getItem("upgradedAuthToken_" + await this.getUsername());
        const response = stored && (await fetch(this.API_BASE + "/api/me", { headers: { Authorization: "Bearer " + stored } }));

        if (response && response.ok) {
            this.dashboardAuthToken = stored;
            const json = await response.json();
            this.userInfo = json.data;
            return json.data;
        } else {
            if (!this.clientAuthToken) throw new Error("No auth token");
            console.log("Upgrading auth token");
            const upgradeFetch = await fetch(this.API_BASE + "/api/tkn/dash", { method: "POST", body: this.clientAuthToken });
            if (!upgradeFetch.ok) throw new Error("Failed to upgrade auth token");
            const upgradedAuthToken = await upgradeFetch.text();
            localStorage.setItem("upgradedAuthToken_" + await this.getUsername(), upgradedAuthToken);
            this.dashboardAuthToken = upgradedAuthToken;
            const json = await (await this.makeDashboardApiRequest("me")).json();
            this.userInfo = json.data;
            return json.data;
        }
    }


    async makeDashboardApiRequest(url: string, options?: RequestInit): Promise<Response> {
        options = options || {};
        await this.ensureDashboardAuthToken();
        if (1) return MockDashboardAPI(url, options);
        return fetch(this.API_BASE + "/api/" + url, {
            ...options,
            headers: {
                Authorization: "Bearer " + this.dashboardAuthToken,
                ...(options.headers || {})

            }
        });
    }
}
const swapi = new SWAPI();
(window as any).swapi = swapi;
export default swapi;
