#!/bin/sh
# Compile and build extension. Create .vsix file.

export PATH="$(yarn global bin):$PATH"

yarn install
yarn run compile
vsce package
