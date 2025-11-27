// main.js

// Global reference so DOM handlers can use it after initialization
let workSpaceAPI = null;

// Default URLs and icons (kept from your original post)
const ICON_BASE = {
    app: "https://shivarajam77.github.io/trimble-extension/V.png",
    auth: "https://shivarajam77.github.io/trimbleTestong/key-icon.svg",
    project: "https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/projectspecification.svg",
    model: "https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/modelcheck.svg",
    rfi: "https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/rfimanagement.svg"
};

const DEV_BASE = "https://dev.virtuele.us";

async function initializeTrimbleConnect() {
    try {
        if (!window.TrimbleConnectWorkspace) {
            console.error("TrimbleConnectWorkspace library not found. Make sure index.js was loaded.");
            return;
        }

        // Connect to Trimble Connect Workspace API (parent frame)
        workSpaceAPI = await TrimbleConnectWorkspace.connect(
            window.parent,
            (event, args) => {
                console.debug("TrimbleConnect event:", event, args);
            },
            3000 // timeout in ms
        );

        if (!workSpaceAPI) {
            console.error("Failed to get workSpaceAPI from TrimbleConnectWorkspace.connect()");
            return;
        }

        // Build menu object (icons restored)
        const mainMenuObject = {
            title: "Virtuele app",
            icon: ICON_BASE.app,
            command: "main_nav_menu_clicked",
            subMenus: [
                {
                    title: "Authorization",
                    icon: ICON_BASE.auth,
                    command: "submenu_1_clicked"
                },
                {
                    title: "Sync Project",
                    icon: ICON_BASE.project,
                    command: "submenu_2_clicked"
                },
                {
                    title: "Sync Models",
                    icon: ICON_BASE.model,
                    command: "submenu_3_clicked"
                },
                {
                    title: "RFI Manager",
                    icon: ICON_BASE.rfi,
                    command: "submenu_4_clicked"
                }
            ]
        };

        // Set menu in Trimble UI
        try {
            if (workSpaceAPI.ui && typeof workSpaceAPI.ui.setMenu === "function") {
                workSpaceAPI.ui.setMenu(mainMenuObject);
            } else {
                console.warn("workSpaceAPI.ui.setMenu is not available.");
            }
        } catch (uiErr) {
            console.error("Error while calling ui.setMenu:", uiErr);
        }

        // Wire Trimble commands to our iframe navigation
        if (workSpaceAPI.extension && typeof workSpaceAPI.extension.onCommand === "function") {
            workSpaceAPI.extension.onCommand((cmd) => {
                console.debug("Received Trimble command:", cmd);
                navigateByCommand(cmd);
            });
        } else {
            console.warn("workSpaceAPI.extension.onCommand not available.");
        }

    } catch (err) {
        console.error("initializeTrimbleConnect error:", err);
    }
}

// Map commands to frame URLs
function navigateByCommand(cmd) {
    const frame = document.getElementById("contentFrame");
    if (!frame) {
        console.error("contentFrame not found in DOM");
        return;
    }

    switch (cmd) {
        case "submenu_1_clicked":
            frame.src = `https://www.w3schools.com`;
            break;
        case "submenu_2_clicked":
            frame.src = `https://www.w3schools.com`;
            break;
        case "submenu_3_clicked":
            frame.src = `${DEV_BASE}/model-sync`;
            break;
        case "submenu_4_clicked":
            frame.src = `${DEV_BASE}/rfi`;
            break;
        case "main_nav_menu_clicked":
            frame.src = `https://www.w3schools.com`;
            break;
        default:
            console.warn("Unknown command:", cmd);
    }
}

// Called after DOM loads to wire local UI buttons and default iframe src
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("redirectButton");
    const frame = document.getElementById("contentFrame");

    if (!frame) {
        console.error("contentFrame not found in DOM");
        return;
    }

    // Default landing page
    frame.src = `${DEV_BASE}/home`;

    // Click handler on the button: set active menu and open submenu
    if (button) {
        button.addEventListener("click", () => {
            if (workSpaceAPI && workSpaceAPI.ui && typeof workSpaceAPI.ui.setActiveMenuItem === "function") {
                try {
                    // Set Trimble's active menu item to Authorization (submenu_1_clicked)
                    workSpaceAPI.ui.setActiveMenuItem("submenu_1_clicked");
                } catch (err) {
                    console.warn("Failed to call setActiveMenuItem:", err);
                }
            } else {
                // If Trimble API not available, just navigate the iframe directly
                navigateByCommand("submenu_1_clicked");
            }
        });
    } else {
        console.warn("redirectButton not found in DOM");
    }
});

// Small helper that developers can call if iframe fails due to server headers
// Usage: openCurrentInNewTab()
function openCurrentInNewTab() {
    const frame = document.getElementById("contentFrame");
    if (!frame) {
        console.error("contentFrame not present");
        return;
    }
    const url = frame.src || `${DEV_BASE}/home`;
    window.open(url, "_blank", "noopener");
}

// Start initialization (no await so page continues rendering)
initializeTrimbleConnect();

// Export helper to global so you can call from console if needed
window.openCurrentInNewTab = openCurrentInNewTab;
