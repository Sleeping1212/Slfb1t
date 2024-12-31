const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');

const REPO_URL = 'https://github.com/Hydradevx/Hydrion-S3LFB0T';
const CONFIG_FILE = 'config.json';
const TEMP_ZIP = path.join(__dirname, 'repo.zip');

async function isNewerVersion(installed, latest) {
    const [major1, minor1, patch1] = installed.split('.').map(Number);
    const [major2, minor2, patch2] = latest.split('.').map(Number);
    return (
        major2 > major1 ||
        (major2 === major1 && minor2 > minor1) ||
        (major2 === major1 && minor2 === minor1 && patch2 > patch1)
    );
}

async function getRemotePackageJson() {
    const url = `${REPO_URL}/raw/main/package.json`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch remote package.json: ${response.statusText}`);
    }
    return response.json();
}

async function downloadAndExtractZip() {
    const zipUrl = `${REPO_URL}/archive/refs/heads/main.zip`;
    const response = await fetch(zipUrl);

    if (!response.ok) {
        throw new Error(`Failed to download repository: ${response.statusText}`);
    }

    const buffer = await response.buffer();
    fs.writeFileSync(TEMP_ZIP, buffer);

    const zip = new AdmZip(TEMP_ZIP);
    zip.extractAllTo(__dirname, true);

    fs.unlinkSync(TEMP_ZIP);
}

function updateFiles() {
    const extractedFolderName = path.basename(REPO_URL) + '-main';
    const extractedPath = path.join(__dirname, extractedFolderName);

    if (!fs.existsSync(extractedPath)) {
        throw new Error('Extracted folder not found.');
    }

    const files = fs.readdirSync(extractedPath);

    files.forEach((file) => {
        const srcPath = path.join(extractedPath, file);
        const destPath = path.join(__dirname, file);

        if (file === CONFIG_FILE) return;

        if (fs.existsSync(destPath)) {
            fs.rmSync(destPath, { recursive: true, force: true });
        }

        fs.renameSync(srcPath, destPath);
    });

    fs.rmSync(extractedPath, { recursive: true, force: true });
}

async function checkAndUpdate() {
    const remotePackageJson = await getRemotePackageJson();
    const remoteVersion = remotePackageJson.version;

    const localPackageJsonPath = path.join(__dirname, 'package.json');
    if (!fs.existsSync(localPackageJsonPath)) {
        throw new Error('Local package.json not found.');
    }

    const localPackageJson = JSON.parse(fs.readFileSync(localPackageJsonPath, 'utf8'));
    const localVersion = localPackageJson.version;

    if (await isNewerVersion(localVersion, remoteVersion)) {
        console.log(`Updating from version ${localVersion} to ${remoteVersion}...`);
        await downloadAndExtractZip();
        updateFiles();
        console.log('Update complete. Restarting bot...');
        process.exit(0);
    } else {
        console.log('Already up-to-date.');
    }
}

module.exports = { checkAndUpdate };
