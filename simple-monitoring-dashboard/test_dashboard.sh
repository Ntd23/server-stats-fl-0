#!/bin/bash

set -e

if ! command -v stress-ng >/dev/null 2>&1; then
    sudo apt update
    sudo apt install stress-ng -y
fi

echo "Generating CPU load for 90 seconds..."

stress-ng --cpu 2 --timeout 90s

echo "Load test finished."
echo "Check the Netdata dashboard and CPU alert."