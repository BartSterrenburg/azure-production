const { jsPDF } = require("jspdf");

const pdfFunctions = {
    getPdfWPI: (data) => {
        const doc = new jsPDF();
        const object = data[0];
        doc.text(`Datum: + ${object.locatie}`, 10, 10); // Use the assigned value of locatie
        doc.save("a4.pdf");

        return doc;
    }
};

module.exports = pdfFunctions;