#!/bin/sh
# This generates TextMate syntax file
# Use to extract and copy/paste keywords to syntax/typhoon.json file

TEXTX_GRAMMAR=~/repos/typhoon/t_sw/thcc/typhoon/lang/model.tx

textx generate --target textmate $TEXTX_GRAMMAR --name typhoon -o typhoon-textmate.tx.json
