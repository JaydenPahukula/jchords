#!/usr/bin/env bash

# open ports
iptables -I INPUT -p tcp --dport 5173 -j ACCEPT; # frontend
iptables -I INPUT -p tcp --dport 9099 -j ACCEPT; # auth
