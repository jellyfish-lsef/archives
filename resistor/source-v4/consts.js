// Location of exploit files
exports.CALAMARI_API_LOCATION = "/Users/Shared/Resistor/";
// Location of IPC
exports.IPC_LOCATION = "/Users/Shared/SW-IPC.txt";
// Location of IPC Init
exports.IPC_LOCATION_AUTH = "/Users/Shared/SW-INIT.txt";
// Location of IPC Delay
exports.IPC_LOCATION_DELAY = "/Users/Shared/SW-DELAY.txt";
// Location of IPC Incoming
exports.IPC_LOCATION_NOTIFICATION = "/Users/Shared/SW-INJECT.txt";
// Location of user data files
exports.JELLYFISH_DATA_DIR = require("path").join(require("os").homedir(), "Documents", "Jellyfish");
// DyLib update URL
exports.DYLIB_UPDATE = "https://resistor.com/api/serve/beta/libResistor.dylib";
// API base URI
exports.API_BASE = "https://resistor.com";
// Friends API endpoint
exports.REALTIME_ENDPOINT = "https://friends.resistor.com/";
// The name of the service in the Keychain
exports.KEYCHAIN_SERVICE = exports.API_BASE;
// The path of the auto-inject folder
exports.AUTOINJECT_DIRECTORY = "/Users/Shared/Resistor/AutoExecute/";