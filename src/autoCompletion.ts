import * as vscode from 'vscode';


var doc = new Map([['Req', ["User","Meet","Attrs",]], ['Ctx',  ["SetLocal","Unix",]], ["Sys", [ "Load","UnLoad",]]]);

class CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
        // 支持换行 代码从起始位置到输入位置
        // const text = document.getText(new vscode.Range(
        //     new vscode.Position(0, 0),
        //     position
        // ));
        const range = document.getWordRangeAtPosition(new vscode.Position(position.line, position.character-1));
        const text = document.getText(range);

        console.log("On Call", text);

        if (doc.has(text)) {
            let arr = doc.get(text);
            if (arr === undefined) {
                arr = [];
            }
            return arr.map(item => new vscode.CompletionItem(item, vscode.CompletionItemKind.Field));
        }

        

        // let item = doc[0];
        // let completionItem = ;

        // completionItem.detail=item.detail;
        // completionItem.documentation = item.documentation;
        // 代码替换位置，查找位置会同步应用
        // completionItem.range = new vscode.Range(new vscode.Position(position.line, position.character), new vscode.Position(position.line, position.character));
        return [
            new vscode.CompletionItem("testA", vscode.CompletionItemKind.Field), 
            new vscode.CompletionItem("testB", vscode.CompletionItemKind.Field), 
            new vscode.CompletionItem("testC", vscode.CompletionItemKind.Field)
        ];

        // // 只有tyc_test调用会触发联想内容
        // if(/tyc_test\.$/.test(text)){
        //     console.log("Match Text");
        //     return doc.map(item => {
        //         return item.body.map(iitem => {
        //             let completionItem = new vscode.CompletionItem(iitem, vscode.CompletionItemKind.Function);
        //             completionItem.detail=item.detail;
        //             completionItem.documentation = item.documentation;
        //             // 代码替换位置，查找位置会同步应用
        //             completionItem.range = new vscode.Range(new vscode.Position(position.line, position.character), new vscode.Position(position.line, position.character));
        //             return completionItem;
        //         });
        //     }).flat();
        // }
    }

    // resolveCompletionItem(){}
}

export default function autoCompletion(context: vscode.ExtensionContext) {
    let file:vscode.DocumentSelector = { scheme: 'file', language: 'json' };
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(file, new CompletionItemProvider(), '.'));
    console.log("do Register");
}


