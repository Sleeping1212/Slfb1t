#!/bin/bash

# Update and install dependencies
echo "Updating and installing dependencies..."
pkg update && pkg upgrade -y
pkg install -y nodejs git

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Prompt for Discord token
read -p "Enter your Discord token: " discord_token

# Create the config.json file
echo "Creating configuration file..."
cat <<EOF > config.json
{
  "token": "$discord_token"
}
EOF

# Start the bot
echo "Starting the selfbot"
npm start