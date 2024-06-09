const { jsPDF } = require("jspdf");
const fs = require("fs");

const pdfFunctions = {
  getPdfWPI: async (data) => {
    const doc = new jsPDF();
    const object = data[0];

    doc.setFontSize(16);
    doc.text("Werkplekinspectie", 105, 10, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Nummer: ${object.formNummer}`, 10, 20);
    doc.text(`Locatie: ${object.locatie}`, 10, 30);

    const startY = 40;

    const fields = [
      { label: "Datum:", value: object.datum, y: startY },
      { label: "Project:", value: object.project, y: startY + 10 },
      { label: "Naam:", value: object.naamEigenaar, y: startY + 20 },
      { label: "Functie:", value: object.functieEigenaar, y: startY + 30 },
      {
        label: "Omschrijving actie(s) ter verbetering:",
        value: object.omschrijvingVerbetering,
        y: startY + 40,
      },
      {
        label: "Actie te nemen door:",
        value: object.actieTeNemenDoor,
        y: startY + 50,
      },
      {
        label: "Voor datum:",
        value: object.actieTeNemenVoorDatum,
        y: startY + 60,
      },
      {
        label: "Evaluatie van de actie(s) ter verbetering:",
        value: object.evaluatieTerVerbetering,
        y: startY + 70,
      },
      {
        label: "Afgehandeld voor datum:",
        value: object.datumAfgehandeld,
        y: startY + 80,
      },
      { label: "Door:", value: object.paraaf, y: startY + 90 },
    ];

    fields.forEach((field) => {
      doc.text(`${field.label} ${field.value}`, 10, field.y);
    });

    // Output het PDF-document als een base64-string
    const pdfDataUri = doc.output("datauristring");
    const base64 = pdfDataUri.split(",")[1];

    return base64;
  },

  getPdfMIO: async (data) => {
    const doc = new jsPDF();
    const object = data[0];

    doc.setFontSize(16);
    doc.text("Melding Incident Ongeval", 105, 10, { align: "center" });

    doc.setFontSize(12);
    const startY = 40;

    console.log(object);

    const fields = [
      { label: "Nummer:", value: object.formNummer, y: startY },
      { label: "Beschrijving:", value: object.beschrijving, y: startY + 10 },
      { label: "typeMelding", value: object.typeMelding, y: startY + 20 },
      { label: "Datum:", value: object.datum, y: startY + 30 },
      { label: "Tijd:", value: object.tijdstip, y: startY + 40 },
      { label: "Naam eigenaar:", value: object.naamEigenaar, y: startY + 50 },
      { label: "Functie eigenaar:", value: object.functieEigenaar, y: startY + 60 },
      {label: "locatie:", value: object.locatie, y: startY + 70},
      {label: "Aard van de letsel:", value: object.aardLetsel, y: startY + 80},
      {label: "Plaats van de letsel:", value: object.plaatsLetsel, y: startY + 90},
    ];

    fields.forEach((field) => {
      doc.text(`${field.label} ${field.value}`, 10, field.y);
    });

    doc.addImage(object.foto, "PNG", 10, 140, 50, 50);
    doc.addImage(object.paraaf, "PNG", 10, 200, 50, 50);

    // Output the PDF document as a base64 string
    const base64 = doc.output("datauristring").split(",")[1];

    return base64;
  },
};

module.exports = pdfFunctions;
