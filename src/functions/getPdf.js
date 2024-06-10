const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const pdfFunctions = {
  getPdfWPI: async (data) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const object = data[0];
    const logoPath = path.join(__dirname, "logo.png");

    const logoImageData = fs.readFileSync(logoPath);

    const logoWidth = 40; 
    const logoHeight = 20; 
    const pageWidth = doc.internal.pageSize.getWidth(); // Breedte van de pagina
    const logoX = (pageWidth - logoWidth) / 2; // Bereken de x-positie van het logo
    const logoY = 10; // Y-positie van het logo
    doc.addImage(logoImageData, "PNG", logoX, logoY, logoWidth, logoHeight);

    doc.setFont("Arial", "bold"); // Gebruik het lettertype "Arial"
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    const titleWidth = doc.getStringUnitWidth("Werkplekinspectie") * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2; // Bereken de x-positie van de titel
    const titleY = logoY + logoHeight + 10; // Y-positie van de titel
    doc.text("Werkplekinspectie", titleX + 25, titleY, { align: "center" }); // Verschuif de titel naar rechts met 10 eenheden
    doc.setFontSize(10);
    const startY = titleY + 10; // Begin Y-positie voor de velden
    let currentY = startY;

    // Function to format date to day/month/year format
    const formatDate = (date) => {
      const d = new Date(date);
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const fields = [
      // General Information
      { label: "Nummer WPI-", value: String(object.formNummer) },
      { label: "Beschrijving:", value: String(object.beschrijving) }, 
      { label: "Datum:", value: formatDate(object.datum) },
      { label: "Project:", value: String(object.project) },
      { label: "Locatie:", value: String(object.locatie) },
      { label: "Naam:", value: String(object.naamEigenaar) },
      { label: "Functie:", value: String(object.functieEigenaar) },
    ];


    // Function to draw checkboxes
    const drawCheckbox = (x, y, checked) => {
      doc.rect(x, y, 5, 5);
      if (checked) {
        doc.setFillColor(0, 0, 0);
        doc.rect(x, y, 5, 5, "F");
      }
    };

    // Function to add and check for new page
    const addField = (label, value) => {
      const text = `${label} ${value}`;
      doc.setTextColor(0, 0, 0); 
      const labelWidth = doc.getStringUnitWidth(label) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      if (currentY + 8 > 280) { 
        doc.addPage();
        currentY = 20;
      }
      if (currentY + 8 > 280) { 
        doc.addPage();
        currentY = 20; 
      }
      doc.text(label, 10, currentY, { fontWeight: 'normal', color: [0, 0, 0] }); 
      doc.setTextColor(100); // Dark gray color for values
      const splitText = doc.splitTextToSize(value, 180 - labelWidth);
      splitText.forEach(line => {
        if (currentY + 8 > 280) { 
          doc.addPage();
          currentY = 20; 
        }
        doc.text(line, 10 + labelWidth + 5, currentY);
        currentY += 8;
      });
    };
    

    fields.forEach(field => {
      addField(field.label, field.value);
    });

    // Add checkboxes after "Functie"
    const checklistSections = [
      {
        label: "Wordt gehandeld volgens relevante regels- en voorschriften:",
        value: object.gehandeldVolgensRegelsEnVoorschriften,
        notes: String(object.gehandeldVolgensRegelsEnVoorschriftenAantekeningen),
      },
      {
        label: "Omstandigheden voor veilig werken:",
        value: object.omstandighedenVeiligWerken,
        notes: String(object.omstandighedenVeiligWerkenAantekeningen),
      },
      {
        label: "Voldoen uitvoerende aan eisen:",
        value: object.voldoenUitvoerendeAanEisen,
        notes: String(object.voldoenUitvoerendeAanEisenAantekeningen),
      },
      {
        label: "Vereiste beschermingsmiddelen:",
        value: object.vereisteBeschermingsmiddelen,
        notes: String(object.vereisteBeschermingsmiddelenAantekeningen),
      },
      {
        label: "Gevaarlijke situaties voorkomen:",
        value: object.gevaarlijkeSituatiesVoorkomen,
        notes: String(object.gevaarlijkeSituatiesVoorkomenAantekeningen),
      },
      {
        label: "Gevaarlijke stoffen verwerking:",
        value: object.gevaarlijkeStoffenVerwerking,
        notes: String(object.gevaarlijkeStoffenVerwerkingAantekeningen),
      },
      {
        label: "Benodigde voorzieningen calamiteiten:",
        value: object.benodigdeVoorzieningenCalimiteiten,
        notes: String(object.benodigdeVoorzieningenCalimiteitenAantekeningen),
      },
      {
        label: "Staat gebruikt gereedschap:",
        value: object.staatGebruiktGereedschappen,
        notes: String(object.staatGebruiktGereedschappenAantekeningen),
      },
    ];

    checklistSections.forEach(section => {
      addField(section.label, "");
      drawCheckbox(60, currentY - 5, section.value === 1);
      doc.text("In orde", 67, currentY);
      drawCheckbox(90, currentY - 5, section.value === 0);
      doc.text("Niet in orde", 97, currentY);
      drawCheckbox(125, currentY - 5, section.value === 2);
      doc.text("n.v.t.", 132, currentY);
      currentY += 8;
      addField("Aantekeningen:", section.notes || "");
      currentY += 4; 
    });

    const remainingFields = [
      { label: "Omschrijving actie(s) ter verbetering:", value: String(object.omschrijvingVerbetering) },
      { label: "Actie te nemen door:", value: String(object.actieTeNemenDoor) },
      { label: "Voor datum:", value: formatDate(object.actieTeNemenVoorDatum) },
      { label: "Evaluatie van de actie(s) ter verbetering:", value: String(object.evaluatieTerVerbetering) },
      { label: "Afgehandeld voor datum:", value: formatDate(object.datumAfgehandeld) },
      { label: "Door:", value: String(object.door) },
    ];

    remainingFields.forEach(field => {
      addField(field.label, field.value);
    });

    // Add the paraaf section
    if (object.paraaf) {
      const paraafHeight = 65; 
      if (currentY + paraafHeight > 280) { 
        doc.addPage();
        currentY = 20; 
      }
      const paraafY = currentY + 10;
      doc.setTextColor(0); 
      doc.text("Paraaf:", 10, paraafY);
      doc.addImage(object.paraaf, "PNG", 10, paraafY + 5, 50, 50);
      currentY += paraafHeight; 
    }


    // Add photo(s)
    if (object.foto && Array.isArray(object.foto)) {
      object.foto.forEach(photo => {
        if (currentY > 230) { 
          doc.addPage();
          currentY = 20; 
        }
        doc.setTextColor(0);
        doc.text("Foto:", 10, currentY + 10);
        doc.addImage(photo, "PNG", 10, currentY + 15, 50, 50);
        currentY += 70;
      });
    } else if (object.foto) { 
      if (currentY > 230) { 
        doc.addPage();
        currentY = 20; 
      }
      doc.setTextColor(0);
      doc.text("Foto:", 10, currentY + 10);
      doc.addImage(object.foto, "PNG", 10, currentY + 15, 50, 50);
      currentY += 70;
    }

    // Output the PDF document as a base64 string
    const base64 = doc.output("datauristring").split(",")[1];

    return base64;
  },


  getPdfTBM: async (data) => {
    const doc = new jsPDF();
    const object = data[0];
    doc.setFontSize(16);
    doc.text("Toolbox Meeting", 105, 10, { align: "center" });

    doc.setFontSize(12);
    const startY = 40;

    const fields = [{ label: "Nummer:", value: object.formNummer, y: startY }];

    fields.forEach((field) => {
      doc.text(`${field.label} ${field.value}`, 10, field.y);
    });

    // Output the PDF document as a base64 string
    const base64 = doc.output("datauristring").split(",")[1];

    return base64;
  },

  getPdfTRA: async (data) => {
    const doc = new jsPDF();
    const object = data[0];
    console.log("object: " + object);
    doc.setFontSize(16);
    doc.text("Taak Risico Analyse", 105, 10, { align: "center" });

    doc.setFontSize(12);
    const startY = 40;
    const fields = [{ label: "Nummer:", value: object.formNummer, y: startY }];
    fields.forEach((field) => {
      doc.text(`${field.label} ${field.value}`, 10, field.y);
    });

    // Output the PDF document as a base64 string
    const base64 = doc.output("datauristring").split(",")[1];

    console.log("works");

    return base64;
  },

  getPdfMIO: async (data) => {
    const doc = new jsPDF();
    const object = data[0];

    doc.setFontSize(16);
    doc.text("Melding Incident Ongeval", 105, 10, { align: "center" });

    doc.setFontSize(12);
    const startY = 40;

    const fields = [
      { label: "Nummer:", value: object.formNummer, y: startY },
      { label: "Beschrijving:", value: object.beschrijving, y: startY + 10 },
      { label: "typeMelding", value: object.typeMelding, y: startY + 20 },
      { label: "Datum:", value: object.datum, y: startY + 30 },
      { label: "Tijd:", value: object.tijdstip, y: startY + 40 },
      { label: "Naam eigenaar:", value: object.naamEigenaar, y: startY + 50 },
      {
        label: "Functie eigenaar:",
        value: object.functieEigenaar,
        y: startY + 60,
      },
      { label: "locatie:", value: object.locatie, y: startY + 70 },
      {
        label: "Aard van de letsel:",
        value: object.aardLetsel,
        y: startY + 80,
      },
      {
        label: "Plaats van de letsel:",
        value: object.plaatsLetsel,
        y: startY + 90,
      },
    ];

    fields.forEach((field) => {
      doc.text(`${field.label} ${field.value}`, 10, field.y);
    });

    doc.addImage(object.foto, "PNG", 10, 140, 50, 50);
    doc.addImage(object.paraaf, "PNG", 10, 200, 80, 50);

    // Output the PDF document as a base64 string
    const base64 = doc.output("datauristring").split(",")[1];

    return base64;
  },
};

module.exports = pdfFunctions;
