import * as Extensions from "trimble-connect-project-workspace-api";


const statusEl = document.getElementById('status');
const outputEl = document.getElementById('output');
const btn = document.getElementById('btnCallHost');


async function init() {
statusEl.textContent = 'Requesting API from host...';
try {
// getTC is exported and returns a Promise<TCExtensionAPI>
const api = await Extensions.getTC();
statusEl.textContent = 'Connected to Trimble Connect API';


// Example: use Extension API to get the current project
if (api.extension && api.extension.on) {
// respond to extension messages from host
api.extension.on('extension.command', (arg) => {
appendOutput('extension.command received: ' + JSON.stringify(arg));
});
}


btn.addEventListener('click', async () => {
appendOutput('Calling host API: project.getActiveProject()');
try {
if (api.project && api.project.getActiveProject) {
const proj = await api.project.getActiveProject();
appendOutput(JSON.stringify(proj, null, 2));
} else {
appendOutput('project.getActiveProject not available on API');
}
} catch (err) {
appendOutput('API call failed: ' + err);
}
});


} catch (err) {
statusEl.textContent = 'Failed to get API: ' + err;
appendOutput(err.stack || String(err));
}
}


function appendOutput(text) {
outputEl.textContent = outputEl.textContent + '\n' + text;
}
