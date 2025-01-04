@echo off

REM Navigate to the script's directory
set script_dir=%~dp0
cd /d "%script_dir%" || (echo Failed to navigate to the script's directory! Exiting... && exit /b 1)

REM Pull the latest updates from the repository
echo Pulling the latest updates from the repository...
git fetch --all
git reset --hard origin/main || (echo Failed to pull updates! Exiting... && exit /b 1)

echo Repository successfully updated.

echo Now rerun the setup script to continue the installation process.
