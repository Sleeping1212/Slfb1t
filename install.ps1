# Install Node.js dependencies
Write-Host "Installing Node.js dependencies..."
npm install

# Prompt for Discord token and selfbot prefix
$discord_token = Read-Host "Enter your Discord token"
$prefix = Read-Host "Enter your Selfbot prefix"

# Create config.json
Write-Host "Creating configuration file..."
$config = @"
{
    "token": "$discord_token",
    "prefix": "$prefix"
}
"@
Set-Content -Path "config.json" -Value $config

# Optional: Prompt for further action
Write-Host "Dependencies installed. You can now run the bot with the 'start.ps1' script."

# Run the start script after installing dependencies (calling start.ps1)
Write-Host "Running the start script..."
& ".\start.ps1"
