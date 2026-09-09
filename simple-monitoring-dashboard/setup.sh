#!/bin/bash

set -e

curl https://get.netdata.cloud/kickstart.sh > /tmp/netdata-kickstart.sh

sudo sh /tmp/netdata-kickstart.sh \
  --non-interactive \
  --release-channel stable

sudo systemctl enable --now netdata

echo "Netdata installed successfully"
echo "Dashboard: http://localhost:19999"