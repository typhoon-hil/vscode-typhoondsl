#!/bin/sh
# Script for testing extension from vsix file
# When code is running install extension from vsix file
# Workspace is in ./local/test-workspace
EXT_DIR="./local/vscode-extensions-testinstall"
WSP_DIR="./local/test-workspace"
EXTENSION="./vscode-typhoondsl-0.3.1.vsix"

rm -fr $EXT_DIR
mkdir -p $EXT_DIR

if [ ! -d $WSP_DIR ]; then
    mkdir -p $WSP_DIR
fi

code --extensions-dir $EXT_DIR --install-extension $EXTENSION
code --extensions-dir $EXT_DIR $WSP_DIR
