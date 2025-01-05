# Navigate to the script's directory
$script_dir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $script_dir

# Start the bot
Write-Host "Starting the Selfbot..."
npm start

# Optionally, you can call setup or other scripts after starting (not typical for this scenario)
Write-Host "You can run the setup script later if necessary."
