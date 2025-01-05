#!/bin/bash

# Navigate to the script's directory
script_dir=$(dirname "$0")
cd "$script_dir" || { echo "Failed to navigate to the script's directory! Exiting..."; exit 1; }

# Pull the latest updates from the repository
echo "Pulling the latest updates from the repository..."
git fetch --all
git reset --hard origin/main || { echo "Failed to pull updates! Exiting..."; exit 1; }

echo "Repository successfully updated."

echo "Now rerun the setup script to continue the installation process."
bash setup.sh