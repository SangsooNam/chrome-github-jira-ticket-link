#!/bin/bash

# Build script for Chrome GitHub Jira Ticket Link extension
# Creates a zip file with only the necessary extension files

set -e  # Exit on error

# Configuration
OUTPUT_FILE="chrome-github-jira-ticket-link.zip"
TEMP_DIR="build_temp"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building Chrome extension...${NC}"

# Clean up previous build
if [ -f "$OUTPUT_FILE" ]; then
    echo "Removing existing $OUTPUT_FILE"
    rm "$OUTPUT_FILE"
fi

if [ -d "$TEMP_DIR" ]; then
    echo "Removing existing temp directory"
    rm -rf "$TEMP_DIR"
fi

# Create temporary directory
mkdir -p "$TEMP_DIR"

# Copy files to temp directory, excluding unwanted files
echo "Copying extension files..."

# Copy specific files and directories
cp manifest.json "$TEMP_DIR/"
cp popup.html "$TEMP_DIR/"

# Copy directories
cp -r js "$TEMP_DIR/"
cp -r image "$TEMP_DIR/"

# Create the zip file
echo "Creating zip file..."
cd "$TEMP_DIR"
zip -r "../$OUTPUT_FILE" . -x "*.DS_Store" "*/\.*"
cd ..

# Clean up temp directory
rm -rf "$TEMP_DIR"

# Get file size
FILE_SIZE=$(ls -lh "$OUTPUT_FILE" | awk '{print $5}')

echo -e "${GREEN}✓ Build complete!${NC}"
echo -e "Output: ${BLUE}$OUTPUT_FILE${NC} (${FILE_SIZE})"
echo ""
echo "Included:"
echo "  - manifest.json"
echo "  - popup.html"
echo "  - js/"
echo "  - image/"