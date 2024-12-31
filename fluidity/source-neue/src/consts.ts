import { homedir } from "os";
import { join } from "path";

// Location of exploit files
export const CALAMARI_API_LOCATION = "/Users/Shared/Fluidity/";
// Location of IPC
export const IPC_LOCATION = "/Users/Shared/SW-IPC.txt";
// Location of IPC Init
export const IPC_LOCATION_AUTH = "/Users/Shared/SW-INIT.txt";
// Location of IPC Delay
export const IPC_LOCATION_DELAY = "/Users/Shared/SW-DELAY.txt";
// Location of IPC Incoming
export const IPC_LOCATION_NOTIFICATION = "/Users/Shared/SW-INJECT.txt";
// Location of IPC TCP port
export const IPC_LOCATION_PORT = "/Users/Shared/SW-PORT.txt";
// Location of user data files
export const JELLYFISH_DATA_DIR = join(homedir(), "Documents", "Fluidity");
// DyLib update URL
export const DYLIB_UPDATE = "https://fluidity.developer.com/api/serve/beta/libFluidity.dylib";
// API base URI
export const API_BASE = "https://fluidity.developer.com";
// Friends API endpoint
export const REALTIME_ENDPOINT = "http://51.83.147.253:6969";
// The name of the service in the Keychain
export const KEYCHAIN_SERVICE = API_BASE;
// The path of the auto-inject folder
export const AUTOINJECT_DIRECTORY = "/Users/Shared/Fluidity/AutoExecute/";