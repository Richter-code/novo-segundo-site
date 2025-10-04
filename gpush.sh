#!/bin/bash
# Simple push helper: git add -A, commit with message and push
msg=${1:-"chore: update"}
git add -A
git commit -m "$msg"
git push origin main
