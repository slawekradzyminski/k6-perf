#!/bin/bash

# Check if a branch name was provided
if [ -z "$1" ]; then
  echo "Usage: $0 <branch-name>"
  exit 1
fi

branch="$1"

echo "Resetting local changes..."
git reset --hard

echo "Cleaning untracked files..."
git clean -fd

echo "Pulling latest changes..."
git pull

echo "Switching to branch '$branch'..."
git checkout "$branch"
