# Navigate to the script's directory
$script_dir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $script_dir

# Pull the latest updates from the repository
Write-Host "Pulling the latest updates from the repository..."
git fetch --all
git reset --hard origin/main

Write-Host "Repository successfully updated."

# Run the install script after updating (calling install.ps1)
Write-Host "Running the install script..."
& ".\install.ps1"
