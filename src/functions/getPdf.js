const { jsPDF } = require("jspdf");
const fs = require("fs");

const pdfFunctions = {
    getPdfWPI: async (data) => {
        const doc = new jsPDF();
        const object = data[0];
        
        doc.setFontSize(16);
        doc.text("Werkplekinspectie", 105, 10, { align: "center" });
        const startY = 40;
        
        const fields = [
            //General Information
            { label: "Nummer WPI-:", value: object.nummer, y: startY },
            { label: "Datum:", value: object.datum, y: startY },
            { label: "Project:", value: object.project, y: startY + 10 },
            { label: "Locatie:", value: object.locatie, y: startY + 20 },
            { label: "Naam:", value: object.naamEigenaar, y: startY + 20 },
            { label: "Functie:", value: object.functieEigenaar, y: startY + 30 },

            //Foto
            { label: "Foto", value: object.foto, y: startY + 40 },

            //General Inspections
            { label: "Omschrijving actie(s) ter verbetering:", value: object.omschrijvingVerbetering, y: startY + 40 },
            { label: "Actie te nemen door:", value: object.actieTeNemenDoor, y: startY + 50 },
            { label: "Voor datum:", value: object.actieTeNemenVoorDatum, y: startY + 60 },
            { label: "Evaluatie van de actie(s) ter verbetering:", value: object.evaluatieTerVerbetering, y: startY + 70 },
            { label: "Afgehandeld voor datum:", value: object.datumAfgehandeld, y: startY + 80 },
            { label: "Door:", value: object.paraaf, y: startY + 90 },
        ];

        fields.forEach(field => {
            doc.text(`${field.label} ${field.value}`, 10, field.y);
        });

        // Output het PDF-document als een base64-string
        const pdfDataUri = doc.output('datauristring');
        const base64 = pdfDataUri.split(',')[1];

        return base64;
    }
};

module.exports = pdfFunctions;
