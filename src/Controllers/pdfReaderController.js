const readers = require('./Reader/readers');
const Reader = readers();

module.exports = {

    async index(req,res){

        const { pdfUrl } = await req.body;

        (async () => {

            const url = pdfUrl;
            const buffer = await Reader.bufferize(url);
            let lines = await Reader.readLines(buffer);

            lines = await JSON.parse(JSON.stringify(lines));

            const newLines = JSON.stringify(lines).slice(260);

            const invoiceCod = String(newLines).slice(10,68);
            console.log(invoiceCod);
            res.json(invoiceCod);
            
        })();
    }
}