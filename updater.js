const axios = require("axios");
const path = require("path");
const os = require("os");
const fse = require("fs-extra");
const readline = require("readline");

exports.checkUpdate = async (client, cp, Json) => {
    const askUser = (question) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                rl.close();
                resolve(answer.trim().toLowerCase());
            });
        });
    };

    try {
        const headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
        };
        const response = await axios.get(
            `https://raw.githubusercontent.com/Hydrion-Tools/Hydrion-S3LFB0T/main/package.json`,
            { headers },
        );
        const ghVersion = response.data.version;
        const version = Json.version;

        if (ghVersion > version) {
            const userResponse = await askUser(
                "Would you like to update now? (yes/no): ",
            );

            if (userResponse === "yes" || userResponse === "y") {
                const configPath = path.resolve(__dirname, "../config.json");
                const backupPath = await backupConfig(client, configPath);

                if (fse.existsSync(".git")) {
                    try {
                        cp.execSync("git --version");
                        client.logger.warn(
                            "Bot",
                            "Updater",
                            "Updating with Git...",
                        );
                        await gitUpdate(client, cp);
                    } catch (error) {
                        client.logger.alert(
                            "Bot",
                            "Updater",
                            `Git update error: ${error}`,
                        );
                    }
                } else {
                    await downloaddotgit(client, cp);
                }
                updateConfigFile(client, configPath, backupPath);
            } 
        }
    } catch (error){}
};

const backupConfig = async (client, configPath) => {
    try {
        const tempDir = os.tmpdir();
        const backupPath = path.join(tempDir, "config.backup.json");

        if (!fse.existsSync(tempDir)) {
            throw new Error("Temp directory does not exist.");
        }

        if (!fse.existsSync(configPath)) {
            throw new Error("Config file does not exist.");
        }
        fse.copySync(configPath, backupPath);
        return backupPath;
    } catch (error) {
        throw error;
    }
};

const updateConfigFile = (client, configPath, backupPath) => {
    try {
        if (!fse.existsSync(backupPath)) {
            return;
        }

        const backupConfig = fse.readJsonSync(backupPath);
        const updatedConfig = fse.readJsonSync(configPath);

        const mergedConfig = { ...updatedConfig, ...backupConfig };

        for (const key in backupConfig) {
            if (updatedConfig.hasOwnProperty(key)) {
                mergedConfig[key] = backupConfig[key];
            }
        }

        fse.writeJsonSync(configPath, mergedConfig, { spaces: 2 });
        fse.unlinkSync(backupPath);
    } catch (error) {}
};

const gitUpdate = async (client, cp) => {
    try {
        cp.execSync("git stash");
        cp.execSync("git pull --force");
        cp.execSync("git reset --hard");
    } catch (error) {}
};

const downloaddotgit = async (client, cp) => {
    const repoUrl = "https://github.com/Hydrion-Tools/Hydrion-S3LFB0T.git";
    const targetFolder = path.join(__dirname, "../.git");

    if (!fse.existsSync(targetFolder)) {
        fse.mkdirSync(targetFolder, { recursive: true });
    }
    const cloneCommand = `git clone --bare ${repoUrl} ${targetFolder}`;

    cp.execSync(cloneCommand, { stdio: "inherit" });
    await gitUpdate(client, cp);
};
