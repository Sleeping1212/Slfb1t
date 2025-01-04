#!/bin/bash

# Update and install dependencies
echo "Updating and installing dependencies..."
pkg update && pkg upgrade -y
pkg install -y nodejs git

# Prompt for Discord token
read -p "Enter your Discord token: " discord_token
read -p "Enter your Selfbot prefix: " prefix

# Create the config.json file
echo "Creating configuration file..."
cat <<EOF > config.json
{
  "token": "$discord_token",
  "prefix": "$prefix"
}
EOF

echo "Installing Node.js dependencies..."
bash install.sh