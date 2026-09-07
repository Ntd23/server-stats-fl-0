#!/bin/bash

LOG_FILE="$1"

if [[ -z "$LOG_FILE" ]]; then
    echo "Usage: $0 <nginx-log-file>"
    exit 1
fi

if [[ ! -f "$LOG_FILE" ]]; then
    echo "Error: File does not exist: $LOG_FILE"
    exit 1
fi

echo "=== Top 5 IP Addresses ==="
awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -n 5

echo
echo "=== Top 5 Requested Paths ==="
awk '{print $7}' nginx-access.log | grep '^/' | sort | uniq -c | sort -nr | head -n 5

echo
echo "=== Top 5 Status Codes ==="
awk '{print $9}' nginx-access.log | grep -E '^[1-5][0-9][0-9]$' | sort | uniq -c | sort -nr | head -n 5

echo
echo "=== Top 5 User Agents ==="
awk -F'"' '{print $6}' nginx-access.log | sort | uniq -c | sort -nr | head -n 5
