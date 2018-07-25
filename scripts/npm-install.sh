#!/bin/bash
cd /var/www/html/knowhow
sudo npm install
sudo ./node_modules/.bin/webpack --progress --colors --config webpack.config.js --bail

# install pm2 module globaly
sudo npm install -g pm2
sudo pm2 update
echo "install complete"