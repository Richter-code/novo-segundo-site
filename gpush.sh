#!/bin/bash
msg=${1:-"chore: update"}
git add .
git commit -m "$msg"
git push origin main
