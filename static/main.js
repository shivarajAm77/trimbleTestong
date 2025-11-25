import * as Extensions from "trimble-connect-project-workspace-api";

....
....

/** Instantiate extension .
   *  @param window - Parent window object.
   *  @param callback - Listen the events with args from the parent.
   *  @param timeout - Connect timeout in milliseconds.
   *  @returns TCExtensionAPI - Object with the interaction methods.
*/
this.API = await Extensions.connect(
  window.parent,
  (event, args) => {
    switch (event) {
      case "extension.command":
        //"Command executed by the user: args.data"
        break;
      case "extension.accessToken":
        //"Accestoken or status: args.data"
        break;
      case "extension.userSettingsChanged":
        //"User settings changed!"
        break;
      default:
    }
  },
  30000
);

....
....

// Updating the menu object.
this.API.ui.setMenu("<mainMenuObject>:ExtensionMainMenu")
// Where <mainMenuObject> is the menu object and ExtensionMainMenu is the object type which you can find it in the documentation.

// Updating the active submenu.
this.API.ui.setActiveMenuItem("<submenuCommand>:string");

// Get the current project info
this.API.project.getCurrentProject().then((projectInfo: ConnectProject) => {
    //Current project info: projectInfo.
});

//Get the current user language info.
this.API.user.getUserSettings().then((userSettings: UserSettings) => {
    //Current user language: userSettings.language
});

//Updating the status message.
this.API.extension.setStatusMessage("<statusMessage>:string");

//Request for the access token.
this.API.extension.getPermission("accesstoken").then((accessToken: string) => {
    //Current user access token or status: accessToken
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('redirectButton');

    button.addEventListener('click', () => {
        // Open external link in a new tab
        window.open('https://dev.virtuele.us', '_blank');
    });

    // Optional: If you want to integrate with Trimble Connect UI API
    if (window.TC && TC.UI) {
        TC.UI.addCustomButton({
            id: 'redirectButton',
            label: 'Go to Virtuele Development',
            onClick: () => {
                window.open('https://dev.virtuele.us', '_blank');
            }
        });
    }
});

TC.ready(function () {
    TC.UI.addCustomButton({
        id: "virtueleButton",
        label: "Go to Virtuele",
        onClick: () => {
            window.open("https://dev.virtuele.us", "_blank");
        }
    });
});


