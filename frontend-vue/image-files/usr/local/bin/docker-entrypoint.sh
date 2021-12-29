#!/bin/sh

set -e


echo "_____________________ ________    _____________________________ _______  ________   ";
echo "\_   _____/\______   \\\\_____  \   \      \__    ___/\_   _____/ \      \ \______ \  ";
echo " |    __)   |       _/ /   |   \  /   |   \|    |    |    __)_  /   |   \ |    |  \ ";
echo " |     \    |    |   \/    |    \/    |    \    |    |        \/    |    \|    \   \ " ;
echo " \___  /    |____|_  /\_______  /\____|__  /____|   /_______  /\____|__  /_______  /";
echo "     \/            \/         \/         \/                 \/         \/        \/ ";


##mkdir -p /srv/static

#cat <<EOT > /srv/static/config.json
##{
 # "apiUrl": "$GCHECK_API_URL",
##  "format": {
#    "timeZone": "$GCHECK_TZ",
 #   "dateTime": "$GCHECK_DATETIME"
##  }
#}
#EOT
 ## "pickerDateTime": "yyyy-MM-dd HH:mm"
exec "$@"
