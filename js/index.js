const fs = require('fs');
const path = require('path');
const marked = require('marked');
(function () {
    var btnAction = document.querySelector("#btn_action");
        var btnClear = document.querySelector("#btn_clear");

    btnAction.addEventListener('click', function (e) {
        console.log(fileAll)

        if (fileAll.length != 0) {
            for (i in fileAll) {
                createHtmlFile(fileAll[i])
            }
        }
    })

    btnClear.addEventListener('click',function(e){
        var ulFileList = document.querySelector("#fileList");
        ulFileList.innerHTML = "";
        fileAll.length=0;
    });

})();

let createHtmlFile = (file) => {
    fs.readFile(path.join(file.path), 'utf-8', (err, content) => {
        if (err) {
            console.log(err);
        }
        fs.readFile(path.join('./css/github.css'), 'utf-8', (err, style) => {
            if (err) {
                console.log(err);
            }
            let html = marked(content);
            html = template.replace('{{{content}}}', html).replace('{{{style}}}', style);
            let htmlfilename = file.path.replace(path.extname(file.path),'.html');
            fs.writeFile(htmlfilename, html, 'utf-8');

        });
    });

}
let template = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <style>{{{style}}}</style>
    </head>
    <body>
        <div class="vs">{{{content}}}</div>
    </body>
<html>
`;