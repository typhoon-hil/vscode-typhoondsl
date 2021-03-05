#!/bin/sh
# Creates extensions and workspace dirs and link this extension
EXT_DIR="./local/vscode-extensions"
WSP_DIR="./local/test-workspace"

if [ ! -d $WSP_DIR ]; then
    mkdir -p $WSP_DIR
fi

if [ ! -d $EXT_DIR ]; then
    mkdir -p $EXT_DIR
    # Link first this folder to the vscode-extensions with:
    ln -s `pwd` "$EXT_DIR/typhoonhil.vscode-typhoondsl-0.1.0"
fi

code --extensions-dir $EXT_DIR $WSP_DIR
