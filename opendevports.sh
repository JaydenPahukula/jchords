#!/usr/bin/env bash

# open port for jchords
iptables -I INPUT -p tcp --dport 5173 -j ACCEPT;

# port forwarding for backend (not working)
iptables -I INPUT -p tcp --dport 5001 -j ACCEPT;
