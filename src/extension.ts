// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { spawnSync, ChildProcess } from 'child_process';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let pythonExtension = vscode.extensions.getExtension('ms-python.python') ?? null;

    if (pythonExtension !== null) {
        if (!pythonExtension.isActive) {
            pythonExtension.activate().then(() => {
                vscode.window.showInformationMessage("Python extension activated");
            }, () => {
                vscode.window.showErrorMessage("Python extension activation failed");
            });
        }
    }
    else {
        vscode.window.showErrorMessage("Python extension not found!");
    }

    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(
            { scheme: "file", language: "typhoon-tse" },
            new TyphoonDocumentSymbolProvider(context)));

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "vscode-typhoondsl" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // let disposable = vscode.commands.registerCommand('vscode-typhoondsl.helloWorld', () => {
    // 	// The code you place here will be executed every time your command is executed

    // 	// Display a message box to the user
    // 	vscode.window.showInformationMessage('Hello World from vscode-typhoondsl!');
    // });

    // context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

class TyphoonDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    private binaryPath: string | undefined;

    constructor(context: vscode.ExtensionContext) {
        if (process.platform === 'win32') {
            this.binaryPath = path.join(context.extensionPath, 'bin', 'typhoondsl-outliner.exe');
        } else if (process.platform === 'darwin') {
            this.binaryPath = path.join(context.extensionPath, 'bin', 'typhoondsl-outliner-mac');
        } else if (process.platform === 'linux') {
            this.binaryPath = path.join(context.extensionPath, 'bin', 'typhoondsl-outliner');
        } else {
            console.error('Unsupported platform');
        }
        if (this.binaryPath && fs.existsSync(this.binaryPath)) {
            console.info('Outliner found', this.binaryPath);
        } else {
            console.error('Outliner not found!', this.binaryPath);
            this.binaryPath = undefined;
        }
    }

    public provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken): Promise<vscode.DocumentSymbol[]> {
        return new Promise((resolve, reject) => {

            if (this.binaryPath === undefined) {
                console.error('Error: Outliner binary not found!');
                reject("Outliner binary not found")
            } else {
                // Spawn the child process
                const childProcess = spawnSync(this.binaryPath, ['-j'], { input: document.getText() });

                if (childProcess.error) {
                    reject(`Error calling outliner. ${childProcess.error}`);
                }

                let symbols = this.getDocumentSymbolsFromModel(JSON.parse(childProcess.stdout.toString()));
                resolve(symbols);
            }

            reject("Error getting document symbols!");
        });
    }

    private getRange(obj: any): vscode.Range {
        return new vscode.Range(
            new vscode.Position(obj.location.line_start - 1, obj.location.column_start),
            new vscode.Position(obj.location.line_end - 1, obj.location.column_end));
    }

    private getDocumentSymbolsFromModel(model: any): vscode.DocumentSymbol[] {
        let symbols: vscode.DocumentSymbol[] = [];
        if (model.configuration) {
            const conf = model.configuration;
            const range = this.getRange(conf);
            symbols.push(new vscode.DocumentSymbol(
                'Configuration',
                'Configuration',
                vscode.SymbolKind.Constant,
                range, range
            ))
        }
        if (model.elements){
            for (const element of model.elements) {
                symbols.push(this.getDocumentSymbolsFromElement(element))
            }
        }
        return symbols;
    }

    private getDocumentSymbolsFromElement(element: any): vscode.DocumentSymbol {
        let symbol: vscode.DocumentSymbol;
        let range = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0));
        if (element.Component) {
            element = element.Component;
            range = this.getRange(element);
            symbol = new vscode.DocumentSymbol(
                element.name,
                element.component_type,
                vscode.SymbolKind.Function,
                range, range
            )
        } else if (element.Handler) {
            element = element.Handler;
            range = this.getRange(element);
            symbol = new vscode.DocumentSymbol(
                element.name,
                "",
                vscode.SymbolKind.Module,
                range, range
            )
        } else {
            symbol = new vscode.DocumentSymbol(
                'Unknown',
                'Unknown',
                vscode.SymbolKind.Null,
                range, range
            )
        }

        if (element.elements) {
            for (const e of element.elements) {
                symbol.children.push(this.getDocumentSymbolsFromElement(e))
            }
        }

        return symbol;
    }
}
