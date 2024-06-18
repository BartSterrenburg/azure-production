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
    const pageWidth = doc.internal.pageSize.getWidth(); 
    const logoX = (pageWidth - logoWidth) / 2; 
    const logoY = 10; 
    doc.addImage(logoImageData, "PNG", logoX, logoY, logoWidth, logoHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    const titleWidth = doc.getStringUnitWidth("Werkplekinspectie") * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2; 
    const titleY = logoY + logoHeight + 10; 
    doc.text("Werkplekinspectie", titleX + 25, titleY, { align: "center" }); 
    doc.setFontSize(10);
    const startY = titleY + 10; 
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
      { label: "Nummer", value: String(object.formNummer) },
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
      doc.setTextColor(100); 
      const splitText = doc.splitTextToSize(value, 180 - labelWidth);
      splitText.forEach(line => {
        if (currentY + 8 > 280) { 
          doc.addPage();
          currentY = 20; 
        }
        doc.text(line, 10 + labelWidth + 2, currentY);
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
      drawCheckbox(125, currentY - 5, section.value === 2 || section.value === null);  
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
    const doc = new jsPDF('p', 'mm', 'a4');
    const object = data[0];
    const logoPath = path.join(__dirname, "logo.png");
  
    const logoImageData = fs.readFileSync(logoPath);
  
    const logoWidth = 40; 
    const logoHeight = 20; 
    const pageWidth = doc.internal.pageSize.getWidth(); 
    const logoX = (pageWidth - logoWidth) / 2; 
    const logoY = 10; 
    doc.addImage(logoImageData, "PNG", logoX, logoY, logoWidth, logoHeight);
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    const titleWidth = doc.getStringUnitWidth("ToolBox Meeting") * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2; 
    const titleY = logoY + logoHeight + 10; 
    doc.text("ToolBox Meeting", titleX + 25, titleY, { align: "center" }); 
    doc.setFontSize(10);
    let currentY = titleY + 10; 
  
    // Function to format date to day/month/year format
    const formatDate = (date) => {
      const d = new Date(date);
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };
  
    // Function to add a section title
    const addSectionTitle = (title) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      if (currentY + 10 > 280) { 
        doc.addPage();
        currentY = 20;
      }
      doc.setTextColor(0); 
      doc.text(title, 10, currentY + 10);
      currentY += 15;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
    };

    // Function to add a field
    const addField = (label, value) => {
      doc.setTextColor(0); 
      doc.setFont("helvetica", "bold");
      const labelWidth = doc.getStringUnitWidth(label) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      if (currentY + 8 > 280) { 
          doc.addPage();
          currentY = 20;
      }
      doc.text(label, 10, currentY, { fontWeight: 'normal', color: [0, 0, 0] }); 
      doc.setTextColor(150); 
      const splitText = doc.splitTextToSize(value, 180 - labelWidth);
      splitText.forEach(line => {
          if (currentY + 8 > 280) { 
              doc.addPage();
              currentY = 20; 
          }
          doc.text(line, 10 + labelWidth + 2, currentY);
          currentY += 8;
      });
    };

  
    const fields = [
      // General Information
      { label: "Nummer:", value: String(object.formNummer) },
      { label: "Datum Meeting:", value: formatDate(object.datumMeeting) },
      { label: "Locatie:", value: String(object.locatie) },
      { label: "Gehouden door:", value: String(object.gehoudenDoor) },
      { label: "Functie:", value: String(object.functie) },
      { label: "Aantal pagina's:", value: String(object.aantalPaginas) },
      { label: "Besproken onderwerpen:", value: String(object.besprokenOnderwerpen) },
    ];
  
    const deelnemersFields = [
      { label: "Deelnemers:", value: String(object.name) },
    ];
  
    fields.forEach(field => {
      addField(field.label, field.value);
    });

    // Add section title for deelnemers
    addSectionTitle("Deelnemers");
  
    deelnemersFields.forEach(field => {
      addField(field.label, field.value);
    });
  
    // Add paraaf section for deelnemers
    if (object.signature) {
      const paraafHeight = 65;
      if (currentY + paraafHeight > 280) {
        doc.addPage();
            currentY = 20; 
        }
        const paraafY = currentY + 5;
        doc.setTextColor(0);
        doc.text("Paraaf Uitvoerende Leidinggevende:", 10, paraafY);
        doc.addImage(object.signature, "PNG", 10, paraafY + 5, 50, 50);
        currentY += paraafHeight; 
    }

    // Output the PDF document as a base64 string
    const base64 = doc.output("datauristring").split(",")[1];

    return base64;
  },


  getPdfMIO : async (data) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const object = data[0];
    const logoPath = path.join(__dirname, "logo.png");
    const logoImageData = fs.readFileSync(logoPath);
    const logoWidth = 40;
    const logoHeight = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 10;
  
    doc.addImage(logoImageData, "PNG", logoX, logoY, logoWidth, logoHeight);
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    const titleWidth = doc.getStringUnitWidth("Melding Incident en Ongeval") * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;
    const titleY = logoY + logoHeight + 10;
    doc.text("Melding Incident en Ongeval", titleX + 45, titleY, { align: "center" });
    doc.setFontSize(10);
    let currentY = titleY + 10;
  
    // Function to format date to day/month/year format
    const formatDate = (date) => {
      const d = new Date(date);
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };
  
    // Function to capitalize first letter of each word
    const capitalizeFirstLetter = (str) => {
      return str.replace(/\b\w/g, c => c.toUpperCase());
    };
  
    // Function to draw checkboxes
    const drawCheckbox = (x, y, checked) => {
      doc.rect(x, y, 5, 5);
      if (checked) {
        doc.setFillColor(0, 0, 0); 
        doc.rect(x, y, 5, 5, "F"); 
      }
    };
  
    // Function to add fields with text
    const addField = (label, value) => {
      const text = `${label} ${value}`;
      doc.setTextColor(0, 0, 0); 
      const labelWidth = doc.getStringUnitWidth(label) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      if (currentY + 8 > 280) { 
        doc.addPage();
        currentY = 20; 
      }
      doc.text(label, 10, currentY, { fontWeight: 'normal', color: [0, 0, 0] }); 
      doc.setTextColor(100); 
      const splitText = doc.splitTextToSize(value, 180 - labelWidth);
      splitText.forEach(line => {
        if (currentY + 8 > 280) { 
          doc.addPage();
          currentY = 20; 
        }
        doc.text(line, 10 + labelWidth + 2, currentY); 
        currentY += 8; 
      });
    };
  
    // Function to add fields with checkboxes
    const addFieldWithCheckbox = (label, checked) => {
      const text = `${label}`;
      doc.setTextColor(0, 0, 0);
      if (currentY + 8 > 280) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(label, 10, currentY + 2, { fontWeight: 'normal', color: [0, 0, 0] });
      drawCheckbox(140, currentY - 2, checked);
      currentY += 8;
    };
  
    // Define the checkbox sections
    const checkboxFields = [
      {
        label: "Onveilige Handelingen", values: {
          onveiligeSnelheid: object.OH_onveiligeSnelheid,
          beveiligingBuitenWerking: object.OH_beveiligingBuitenWerking,
          verkeerdGebruikGereedschap: object.OH_verkeerdGebruikGereedschap,
          nietGebruikenPBM: object.OH_nietGebruikenPBM,
          onveiligLaden: object.OH_onveiligLaden,
          innemenOnveiligeLaden: object.OH_innemenOnveiligeLaden,
          werkenAanGevaarlijkeDelen: object.OH_werkenAanGevaarlijkeDelen,
          Afleiden: object.OH_Afleiden,
          Anders: object.OH_AndersB
        },
        andersField: "OH_Anders"
      },
      {
        label: "Onveilige Situaties", values: {
          onvoldoendeBeveiligd: object.OS_onvoldoendeBeveiligd,
          onbeveiligd: object.OS_onbeveiligd,
          defectInstallatie: object.OS_defectInstallatie,
          onveiligeConstructie: object.OS_onveiligeConstructie,
          ondeugdelijkeGereedschap: object.OS_ondeugdelijkeGereedschap,
          onveiligeKleding: object.OS_onveiligeKleding,
          gebrekkigeOrdeEnNetheid: object.OS_gebreikkigeOrdeEnNetheid,
          Anders: object.OS_AndersB
        },
        andersField: "OS_Anders"
      },
      {
        label: "Bijkomende Zaken", values: {
          onvoldoendeMaatregelen: object.BZ_onvoldoendeMaatregelen,
          onvoldoendeErvaring: object.BZ_onvoldoendeErvaring,
          onvoldoendeInstructie: object.BZ_onvoldoendeInstructie,
          nietBevoegdBedienen: object.BZ_nietBevoegdBedienen,
          onvoldoendeOnderhoud: object.BZ_onvoldoendeOnderhoud,
          onvoldoendeVakkenis: object.BZ_onvoldoendeVakkenis,
          Anders: object.BZ_AndersB
        },
        andersField: "BZ_Anders"
      }
    ];
  
    // Function to add a checkbox section
    const addCheckboxSection = (section) => {
      const sectionHeight = (Object.keys(section.values).length + 1) * 8 + 16; 
      if (currentY + sectionHeight > 280) { 
        doc.addPage();
        currentY = 20; 
      }
      doc.setFontSize(12); 
      addField(section.label, ''); 
      doc.setFontSize(10); 
      Object.entries(section.values).forEach(([key, value]) => {
        addFieldWithCheckbox(`${capitalizeFirstLetter(key)}:`, value === 1);
      });
      addField("", String(object[section.andersField] || ""));
      currentY += 8; 
    };
  
    // Add fields
    const fields = [
      { label: "Nummer:", value: String(object.formNummer) },
      { label: "Type Melding:", value: capitalizeFirstLetter(object.typeMelding) },
      { label: "Datum:", value: formatDate(object.datum) },
      { label: "Tijd:", value: String(object.tijdstip) },
      { label: "Naam eigenaar:", value: String(object.naamEigenaar) },
      { label: "Functie eigenaar:", value: String(object.functieEigenaar) },
      { label: "Locatie:", value: String(object.locatie) },
      { label: "Aard van de letsel:", value: String(object.aardLetsel) },
      { label: "Plaats van de letsel:", value: String(object.plaatsLetsel) },
      { label: "Eerste behandeling:", value: capitalizeFirstLetter(String(object.eersteBehandeling)) },
    ];
  
    fields.forEach(field => {
      addField(field.label, field.value);
      if (field.label === "Eerste behandeling:") {
        currentY += 10; 
      }
    });
  
    // Add checkbox sections
    checkboxFields.forEach(section => {
      addCheckboxSection(section);
    });

    // Add remaining fields
    const remainingFields = [
      { label: "Omschrijving van Actie:", value: String(object.OmschrijvingActie) },
      { label: "Actie te nemen door:", value: String(object.ActieTeNemenDoor) },
      { label: "Actie te nemen voor datum:", value: formatDate(object.ActieTeNemenVoorDatum) },
      { label: "Melding afgehandeld voor datum:", value: formatDate(object.MeldingAfgehandeldVoorDatum) },
      { label: "Melding afgehandeld door:", value: String(object.MeldingAfgehandeldDoor) }
    ];
  
    remainingFields.forEach(field => {
      addField(field.label, field.value);
    });
  
    // Add paraaf section
    if (object.paraaf) {
      const paraafHeight = 65;
      if (currentY + paraafHeight > 280) {
        doc.addPage();
        currentY = 20; 
      }
      const paraafY = currentY + 5;
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
  
  getPdfTRA: async (data) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const object = data[0];
    const logoPath = path.join(__dirname, "logo.png");

    const logoImageData = fs.readFileSync(logoPath);

    const logoWidth = 40; 
    const logoHeight = 20; 
    const pageWidth = doc.internal.pageSize.getWidth(); 
    const logoX = (pageWidth - logoWidth) / 2; 
    const logoY = 10; 
    doc.addImage(logoImageData, "PNG", logoX, logoY, logoWidth, logoHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    const titleWidth = doc.getStringUnitWidth("Taak Risico Analyse") * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2; 
    const titleY = logoY + logoHeight + 10; 
    doc.text("Taak Risico Analyse", titleX + 25, titleY, { align: "center" }); 
    doc.setFontSize(10);
    const startY = titleY + 10; 
    let currentY = startY;

    // Function to format date to day/month/year format
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Function to add a section title
    const addSectionTitle = (title) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      if (currentY + 10 > 280) { 
          doc.addPage();
          currentY = 20;
      }
      doc.setTextColor(0); 
      doc.text(title, 10, currentY + 10);
      currentY += 15;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
    };

    // Function to add a field
    const addField = (label, value) => {
      doc.setTextColor(0); 
      doc.setFont("helvetica", "bold");
      const labelWidth = doc.getStringUnitWidth(label) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      if (currentY + 8 > 280) { 
          doc.addPage();
          currentY = 20;
      }
      doc.text(label, 10, currentY, { fontWeight: 'normal', color: [0, 0, 0] }); 
      doc.setTextColor(150); 
      const splitText = doc.splitTextToSize(value, 180 - labelWidth);
      splitText.forEach(line => {
          if (currentY + 8 > 280) { 
              doc.addPage();
              currentY = 20; 
          }
          doc.text(line, 10 + labelWidth + 2, currentY);
          currentY += 8;
      });
    };


    // General Information
    const generalInfoFields = [
        { label: "Nummer:", value: String(object.formNummer) },
        { label: "Naam VGW Coördinator:", value: String(object.naamVGWCoordinator) },
        { label: "Naam Uitvoerende Leidinggevende:", value: String(object.naamAkkoordUitvoerendLeidinggevende) },
        { label: "Taak Omschrijving:", value: String(object.taakomschrijving) },
    ];

    // Taakstap
    const taskStepFields = [
        { label: "Taakstap of activiteit:", value: String(object.taakstapActiviteit) },
        { label: "Gevaar:", value: String(object.gevaar) },
        { label: "Beheersmaatregel:", value: String(object.beheersMaatregel) },
        { label: "Actie door:", value: String(object.actieDoor) },
    ];

    const seenByExecutionFields = [
        { label: "Gezien door uitvoerende:", value: String(object.naam) },
    ];

    generalInfoFields.forEach(field => {
        addField(field.label, field.value);
    });

    addSectionTitle("Taakstap");

    taskStepFields.forEach(field => {
        addField(field.label, field.value);
    });

    addSectionTitle("Gezien door uitvoering");

    seenByExecutionFields.forEach(field => {
        addField(field.label, field.value);
    });

    // Add paraaf section for Gezien door uitvoering
    if (object.paraaf) {
        const paraafHeight = 65;
        if (currentY + paraafHeight > 280) {
            doc.addPage();
            currentY = 20; 
        }
        const paraafY = currentY + 5;
        doc.setTextColor(0);
        doc.text("Gezien door uitvoerende paraaf:", 10, paraafY);
        doc.addImage(object.paraaf, "PNG", 10, paraafY + 5, 50, 50);
        currentY += paraafHeight; 
    }

    // Add paraaf section for VGW Coordinator
    if (object.paraafVGWCoordinator) {
        const paraafHeight = 65;
        if (currentY + paraafHeight > 280) {
            doc.addPage();
            currentY = 20; 
        }
        const paraafY = currentY + 5;
        doc.setTextColor(0);
        doc.text("Paraaf VGW Coördinator:", 10, paraafY);
        doc.addImage(object.paraafVGWCoordinator, "PNG", 10, paraafY + 5, 50, 50);
        currentY += paraafHeight; 
    }

    // Add paraaf section for Uitvoerende Leidinggevende
    if (object.paraafAkkoordUitvoerendLeidinggevende) {
        const paraafHeight = 65;
        if (currentY + paraafHeight > 280) {
            doc.addPage();
            currentY = 20; 
        }
        const paraafY = currentY + 5;
        doc.setTextColor(0);
        doc.text("Paraaf Uitvoerende Leidinggevende:", 10, paraafY);
        doc.addImage(object.paraafAkkoordUitvoerendLeidinggevende, "PNG", 10, paraafY + 5, 50, 50);
        currentY += paraafHeight; 
    }

    // Output the PDF document as a base64 string
    const base64 = doc.output("datauristring").split(",")[1];

    return base64;
  },
}
  
  module.exports = pdfFunctions;
  
