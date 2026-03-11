const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('../sosial/CV SUTAN ARLIE.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error("Error formatting PDF: ", err);
});
