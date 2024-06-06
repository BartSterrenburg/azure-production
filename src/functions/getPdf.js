const { jsPDF } = require("jspdf");
const fs = require("fs");

const pdfFunctions = {
    //Get data from GET request
    getPdfWPI: async (data) => {
        const doc = new jsPDF();
        const object = data[0];
        
        // Voeg de titel "Werkplekinspectie" toe
        doc.setFontSize(16);
        doc.text("Werkplekinspectie", 105, 10, { align: "center" });
    
        // Voeg de tekst over locatie toe
        doc.setFontSize(12);
        doc.text(`Nummer: ${object.formNummer}`, 10, 20);
        doc.text(`Locatie: ${object.locatie}`, 10, 30);
        
    
        // Genereer de PDF als een data-URI
        const pdfDataUri = doc.output('datauristring'); 
    
        // Verwijder de voorvoegsel om de base64-gecodeerde PDF te verkrijgen
        const base64 = pdfDataUri.split(',')[1]; 

        // Sla het document op met de toegevoegde titel en logo
        doc.save('a4.pdf'); 

        return base64;
    }
};

module.exports = pdfFunctions;
