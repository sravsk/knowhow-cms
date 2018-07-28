#!/bin/bash
pm2 start webpack && /var/www/html/knowhow/server/index.js 
echo "ec2 instance started"