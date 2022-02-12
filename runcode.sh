#!/bin/sh
# Creates extensions and workspace dirs and link this extension
EXT_DIR="./local/vscode-extensions"
WSP_DIR="./local/test-workspace"
EXTENSION="typhoonhil.vscode-typhoondsl-0.2.0"

if [ ! -d $WSP_DIR ]; then
    mkdir -p $WSP_DIR
fi

if [ ! -d $EXT_DIR ]; then
    mkdir -p $EXT_DIR
fi

if [ ! -d "$EXT_DIR/$EXTENSION" ]; then
    # Link this project folder in the Code extensions folder to test from
    # source.
    ln -s `pwd` "$EXT_DIR/$EXTENSION"
fi

code --extensions-dir $EXT_DIR $WSP_DIR
