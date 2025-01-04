@echo off
echo You Must have Git and NodeJS installed to run this script.

echo Cloning the repository...
git clone https://github.com/Hydrion-Tools/Hydrion-S3LFB0T.git

cd Hydrion-S3LFB0T || exit

set /p discord_token=Enter your Discord token: 
set /p prefix=Enter your Selfbot prefix: 

echo Creating configuration file...
(
    echo {
    echo   "token": "%discord_token%",
    echo   "prefix": "%prefix%"
    echo }
) > config.json

echo Installing Node.js dependencies...
call install.bat
