var ioHook = require('iohook');
var ks = require('node-key-sender');
var nrc = require('node-run-cmd');
var robotjs = require('robotjs')
var clipboardy = require('clipboardy');
var path = require("path");

function isFindUsagesEvent(e) {
    return e.ctrlKey && e.keychar === 117;
}

ioHook.on("keypress", function(e){
    try {
        if (isFindUsagesEvent(e)) {
            //ks.sendCombination(['control', 'shift', 'v']);
            // nrc.run("java -jar 'C:/projects/codingTools/node_modules/node-key-sender/jar/key-sender.jar' control-shift-v")
            //     .then(function(exitCodes) {
            //         console.log("exit codes are ", exitCodes);
            //     });
            console.log("detect ctrl u");
            setTimeout(function () {
                robotjs.keyTap("c", ["control", "shift"]);
                var filePath = clipboardy.readSync();
                var name = filePath.split(path.sep).pop();
                name = name.split(".")[0];
                console.log("got path ", name);
                robotjs.keyTap("f", ["control", "shift"]);
                robotjs.typeString(name);
                console.log("sent search command for ", name);
            }, 1000);
        }
    } catch (e) {
        console.error("error occured", e.toString());
    }
});

ioHook.start();