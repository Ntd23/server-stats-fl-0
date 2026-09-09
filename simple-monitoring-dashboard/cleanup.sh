#!/bin/bash

set -e

curl https://get.netdata.cloud/kickstart.sh > /tmp/netdata-kickstart.sh

sudo sh /tmp/netdata-kickstart.sh \
  --uninstall \
  --non-interactive

echo "Netdata removed successfully"