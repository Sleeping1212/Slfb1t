#!/bin/bash

# Update and install dependencies
echo "Updating and installing dependencies..."
pkg update && pkg upgrade -y
pkg install -y nodejs git

rm -rf ./Hydrion-S3LFB0T

# Clone the repository
echo "Cloning the repository..."
git clone https://github.com/Hydrion-Tools/Hydrion-S3LFB0T.git
cd Hydrion-S3LFB0T || exit

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
echo "Starting the selfbot with pm2..."
npm start