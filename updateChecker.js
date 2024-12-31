const axios = require('axios') ;
const puppeteer = require('puppeteer');

const checkUpdate = async (Json) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://github.com/Hydrion-Tools/Hydrion-S3LFB0T/blob/main/package.json', { waitUntil: 'networkidle2' });

    const rawButtonSelector = 'a[data-view-component="true"][href*="/raw/"]';
    await page.waitForSelector(rawButtonSelector);
    const rawFileUrl = await page.$eval(rawButtonSelector, (element) => element.href);

    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
    };
    const response = await axios.get(rawFileUrl, { headers });
    const ghVersion = response.data.version;

    console.log(`GitHub Version: ${ghVersion}`);
    await browser.close();
    const version = Json.version;

    if (ghVersion > version) {  
        console.log(`New version available: ${ghVersion}`);
        console.log(`Please backup your config.json and install the latest version to continue using Hydrion!! Thank you`)
        return false;
    }
    else {
        console.log(`You are running the latest version: ${version}`);
        return true;
    }
}

module.exports = { checkUpdate };