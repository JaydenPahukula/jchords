#!/usr/bin/env bash

firebase emulators:start --only 'firestore' --import=./firestore-data
