const axios = require('axios') ;
const { info, status, warn } = require('./logger');

const checkUpdate = async (Json) => {
    const rawFileUrl = 'https://raw.githubusercontent.com/Hydrion-Tools/Hydrion-S3LFB0T/refs/heads/main/package.json';

    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
    };
    const response = await axios.get(rawFileUrl, { headers });
    const ghVersion = response.data.version;

    const version = Json.version;
    if (ghVersion > version) { 
        status(`New version available: ${ghVersion}`);
        warn(`Please backup your config.json and install the latest version to continue using Hydrion!! Thank you`)
        return false;
    }
    else {
        info(`You are running the latest version: ${version}`);
        return true;
    }
}

module.exports = { checkUpdate };