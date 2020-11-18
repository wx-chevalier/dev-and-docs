// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var request = require('request');
var crypto = require('crypto');
var randomstring = require("randomstring");

var config = {
    api:'http://api.fanyi.baidu.com/api/trans/vip/translate',
    appId:'20160824000027365',
    appKey:'aiVo_in2zUAqPFRDp9AA',
};

function getMD5(content){
    if(!content){
        return content;
    }
    var md5 = crypto.createHash('md5');
    md5.update(content);
    var d = md5.digest('hex'); 
    return d.toLowerCase();
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "translation" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed

        
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            console.log('no open thext editor!');
            return; // No open text editor
        }

        var selection = editor.selection;
        var text = editor.document.getText(selection);


        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World! '+text.length+'  :  '+text);
    });

     var transDisposable = vscode.commands.registerCommand('extension.translate', function () {
        // The code you place here will be executed every time your command is executed

        var editor = vscode.window.activeTextEditor;

        if (!editor) {
            console.log('no open thext editor!');
            return; // No open text editor
        }

        var selection = editor.selection;
        var text = editor.document.getText(selection);

        if(!text){
            return;
        }

        var salt = (new Date()).getTime()+randomstring.generate();

        var ipt = '';
        var texts = text.split(/\s+/);
        texts.forEach(function(v){
           ipt += encodeURI(v)+' '
        });
        //var ecText = encodeURIComponent(text.replace(/\s+/g,'\r'));
        request.post({
            url:config.api,
            formData:{
                q:ipt,
                from:'auto',
                to:'zh',
                appid:config.appId,
                salt:salt,
                sign:getMD5(config.appId+ipt+salt+config.appKey)
         }},function(err,res,body){
            if(err){
                vscode.window.showInformationMessage('翻译出错了：'+err.message);
                return;
            }
            try{
                var msg = JSON.parse(body);
                if(msg.error_code){
                    vscode.window.showInformationMessage('翻译出错了：'+msg.error_msg);
                }else{
                    msg.trans_result && msg.trans_result.forEach(function(v,i){
                         vscode.window.showInformationMessage(decodeURIComponent(v.dst));
                    });
                }
            }catch(e){
                 vscode.window.showInformationMessage('翻译出错了：'+e.message);
            }

        });

    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(transDisposable);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;