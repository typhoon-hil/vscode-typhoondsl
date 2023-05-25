#!/bin/sh
# Builds Rust outliner binaries for Linux and Windows
# Call this whenever the code of the outliner is changed.

cargo build --manifest-path ../typhoondsl-outliner/Cargo.toml --release
cp -f ../typhoondsl-outliner/target/release/typhoondsl-outliner bin/typhoondsl-outliner
chmod +x bin/typhoondsl-outliner
strip bin/typhoondsl-outliner

# Building for Windows. This need windows target and gcc mingw toolchain
# rustup target add x86_64-pc-windows-gnu
# sudo pacman -S mingw-w64-gcc
cargo build --manifest-path ../typhoondsl-outliner/Cargo.toml --target=x86_64-pc-windows-gnu --release
cp -f ../typhoondsl-outliner/target/x86_64-pc-windows-gnu/release/typhoondsl-outliner.exe bin/
strip bin/typhoondsl-outliner.exe
