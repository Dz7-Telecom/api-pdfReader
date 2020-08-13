const https = require('https');
const pdfreader = require('pdfreader');

function reader(){

    async function bufferize(url) {

        let link = url.substring(url.search("//") + 2);

        link = link.substring(0, link.search("/"));

        let archive = url.substring(url.search("//") + 2);

        archive = archive.substring(archive.search("/"));

        const options = { hostname: link, port: 443, path: archive, method: "GET" };

        return new Promise(function (resolve, reject) {

            let buff = new Buffer.alloc(0);

            const req = https.request(options, res => {
                res.on("data", d => {
                    buff = Buffer.concat([buff, d]);
                });
                res.on("end", () => {
                    resolve(buff);
                });
            });
            req.on("error", e => {
                console.error("https request error: " + e);
            });
            req.end();
        });
    }

    async function readLines(buffer, xwidth) {

        return new Promise((resolve, reject) => {

            const pdftxt = new Array();
        
            let page = 0;

            new pdfreader.PdfReader().parseBuffer(buffer, function (err, item) {
                
                if (err) console.log("pdf reader error: " + err);
                
                else if (!item) {
                
                    pdftxt.forEach(function (a, index) {
                
                        pdftxt[index].forEach(function (v, i) {
                
                            pdftxt[index][i].splice(1, 2);
                
                        });
                
                    });

                    resolve(pdftxt);
                
                } else if (item && item.page) {

                    page = item.page - 1;
                    pdftxt[page] = [];

                } else if (item.text) {
                    
                    let t = 0;
                    let space = "";
                    
                    pdftxt[page].forEach(function (value, index) {
                        if (value[1] == item.y) {
                            if (xwidth && item.x - value[2] > xwidth) {
                                space += " ";
                            } else {
                                space = "";
                            }
                            pdftxt[page][index][0] += space + item.text;
                            t = 1;
                        }
                    })

                    if (t == 0) {
                        pdftxt[page].push([item.text, item.y, item.x]);
                    }
                }
            });
        });
    }




   return {

    bufferize,
    readLines
   }
}

module.exports = reader;