
const queries = {
  getAllUsers: "SELECT * FROM gebruiker",
  getParticipants: "SELECT * FROM handtekening WHERE formId = ?",
  getUserById: "SELECT * FROM gebruiker WHERE personeelsnummer = ?",
  getUserRolByID: "SELECT rol FROM gebruiker WHERE personeelsnummer = ?",
  getPasswordByID:
    "SELECT wachtwoord FROM gebruiker WHERE personeelsnummer = ?",
  postWPI:
    "INSERT INTO formulier_wpi (personeelsnummerEigenaar, formNummer, datum, project, locatie, naamEigenaar, functieEigenaar, foto, gehandeldVolgensRegelsEnVoorschriften, gehandeldVolgensRegelsEnVoorschriftenAantekeningen, omstandighedenVeiligWerken, omstandighedenVeiligWerkenAantekeningen, voldoenUitvoerendeAanEisen, voldoenUitvoerendeAanEisenAantekeningen, vereisteBeschermingsmiddelen, vereisteBeschermingsmiddelenAantekeningen, gevaarlijkeSituatiesVoorkomen, gevaarlijkeSituatiesVoorkomenAantekeningen, gevaarlijkeStoffenVerwerking, gevaarlijkeStoffenVerwerkingAantekeningen, benodigdeVoorzieningenCalimiteiten, benodigdeVoorzieningenCalimiteitenAantekeningen, staatGebruiktGereedschappen, staatGebruiktGereedschappenAantekeningen, omschrijvingVerbetering, actieTeNemenDoor, actieTeNemenVoorDatum, evaluatieTerVerbetering, datumAfgehandeld, door, paraaf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",

  postTRA:
    "INSERT INTO formulier_tra(personeelsnummerEigenaar, formNummer, naamVGWCoordinator, paraafVGWCoordinator, naamAkkoordUitvoerendLeidinggevende, paraafAkkoordUitvoerendLeidinggevende, taakomschrijving) VALUES (?, ?, ?, ?, ?, ?, ?)",
  postTaakStap:
    "INSERT INTO taakstap_tra(formId, formNummer, taakstapNummer, taakstapActiviteit, gevaar, beheersMaatregel, actieDoor) VALUES(?, ?, ?, ?, ?, ?, ?)",
    getTaakStap: "SELECT * FROM taakstap_tra WHERE formId = ?",
    deleteTaakStap: "DELETE FROM taakstap_tra WHERE formId = ?",
    postGezienUitvoering:
    "INSERT INTO gezienVoorUitvoering_tra(formId, formNummer, naam, paraaf) VALUES(?, ?, ?, ?)",
    getGezienUitvoering: "SELECT * FROM gezienVoorUitvoering_tra WHERE formId = ?",
    deleteGezienUitvoering: "DELETE FROM gezienVoorUitvoering_tra WHERE formId = ?",
  postMIO:
    "INSERT INTO formulier_mio (personeelsnummerEigenaar, formNummer, typeMelding, datum, tijdstip, naamEigenaar, functieEigenaar, locatie, aardLetsel, plaatsLetsel, foto, eersteBehandeling, onmiddellijkeActieNotitie, omschrijving, OH_onveiligeSnelheid, OH_beveiligingBuitenWerking, OH_verkeerdGebruikGereedschap, OH_nietGebruikenPBM, OH_onveiligLaden, OH_innemenOnveiligeLaden, OH_werkenAanGevaarlijkeDelen, OH_Afleiden, OH_AndersB, OH_Anders, OS_onvoldoendeBeveiligd, OS_onbeveiligd, OS_defectInstallatie, OS_onveiligeConstructie, OS_ondeugdelijkeGereedschap, OS_onveiligeKleding, OS_gebreikkigeOrdeEnNetheid, OS_Anders, OS_AndersB, BZ_onvoldoendeMaatregelen, BZ_onvoldoendeErvaring, BZ_onvoldoendeInstructie, BZ_nietBevoegdBedienen, BZ_onvoldoendeOnderhoud, BZ_onvoldoendeVakkenis, BZ_Anders, BZ_AndersB, omschrijvingActie, actieTeNemenDoor, actieTenemenVoorDatum, meldingAfgehandeldVoorDatum, meldingAfgehandeldDoor, paraaf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  postTBM:
    "INSERT INTO formulier_tbm(personeelsnummerEigenaar, formNummer, datumMeeting, locatie, gehoudenDoor, functie, aantalPaginas, besprokenOnderwerpen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  postLMRA:
    "INSERT INTO formulier_lmra (personeelsnummerEigenaar, inhoudTraWerkvergunning, traWerkvergunningBesproken, kenIkMijnTaak, waarWerkzaam, gekeurdGereedschapBeschikken, juisteMiddelenBeschikken, gevaarVallendeVoorwerpen, gevaarKnellenOfStoten, struikelgevaar, voldoendeVerlicht, kenIkMijnVluchtroute, juistePBMBeschikken) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
  postSignature:
    "INSERT INTO handtekening(formId, name, signature) VALUES(?,?,?)",

  deleteSignature: "DELETE FROM handtekening WHERE formId = ?",
  createUser:
    "INSERT INTO gebruiker (personeelsnummer, naam, email, wachtwoord, handtekening, rol) VALUES (?, ?, ?, ?, ?, ?)",
  loginUser:
    "SELECT * FROM `gebruiker` WHERE personeelsnummer = ?",

  updateSignature:
    "UPDATE gebruiker SET handtekening = ? WHERE personeelsnummer = ?",

  postFile: 'INSERT INTO `order_files` (ordernummer, file_name, file_data) VALUES (?, ?, ?);',
  getFiles: 'SELECT fileId, file_name, file_data FROM `order_files` WHERE ordernummer = ?;',
  deleteFiles: 'DELETE FROM `order_files` WHERE file_name = ? AND ordernummer = ? LIMIT 1;',
  getFileByFileName: 'SELECT file_name FROM `order_files` WHERE ordernummer = ?',

  getFormsByPersoneelsnummer:
    "SELECT formId, formNummer, datum FROM formulier_mio WHERE personeelsnummerEigenaar = ? UNION ALL SELECT formId, formNummer, datumMeeting FROM formulier_tbm WHERE personeelsnummerEigenaar = ? UNION ALL SELECT formId, formNummer, createDate FROM formulier_tra WHERE personeelsnummerEigenaar = ? UNION ALL SELECT formId, formNummer, datum FROM formulier_wpi WHERE personeelsnummerEigenaar = ?;",
  getAllForms:
    "SELECT formId, formNummer, datum FROM formulier_mio UNION ALL SELECT formId, formNummer, datumMeeting FROM formulier_tbm UNION ALL SELECT formId, formNummer, createDate FROM formulier_tra UNION ALL SELECT formId, formNummer, datum FROM formulier_wpi;",
  getOrders: "SELECT * FROM `order`",

  
  updateWPI: "UPDATE formulier_wpi SET formNummer = ?, datum = ?, project = ?, locatie = ?, naamEigenaar = ?, functieEigenaar = ?, foto = ?, gehandeldVolgensRegelsEnVoorschriften = ?, gehandeldVolgensRegelsEnVoorschriftenAantekeningen = ?, omstandighedenVeiligWerken = ?, omstandighedenVeiligWerkenAantekeningen = ?, voldoenUitvoerendeAanEisen = ?, voldoenUitvoerendeAanEisenAantekeningen = ?, vereisteBeschermingsmiddelen = ?, vereisteBeschermingsmiddelenAantekeningen = ?, gevaarlijkeSituatiesVoorkomen = ?, gevaarlijkeSituatiesVoorkomenAantekeningen = ?, gevaarlijkeStoffenVerwerking = ?, gevaarlijkeStoffenVerwerkingAantekeningen = ?, benodigdeVoorzieningenCalimiteiten = ?, benodigdeVoorzieningenCalimiteitenAantekeningen = ?, staatGebruiktGereedschappen = ?, staatGebruiktGereedschappenAantekeningen = ?, omschrijvingVerbetering = ?, actieTeNemenDoor = ?, actieTeNemenVoorDatum = ?, evaluatieTerVerbetering = ?, datumAfgehandeld = ?, door = ?, paraaf = ? WHERE formId = ?",
  updateMIO: "UPDATE formulier_mio SET formNummer = ?, typeMelding = ?, datum = ?, tijdstip = ?, naamEigenaar = ?, functieEigenaar = ?, locatie = ?, aardLetsel = ?, plaatsLetsel = ?, foto = ?, eersteBehandeling = ?, onmiddellijkeActieNotitie = ?, omschrijving = ?, OH_onveiligeSnelheid = ?, OH_beveiligingBuitenWerking = ?, OH_verkeerdGebruikGereedschap = ?, OH_nietGebruikenPBM = ?, OH_onveiligLaden = ?, OH_innemenOnveiligeLaden = ?, OH_werkenAanGevaarlijkeDelen = ?, OH_Afleiden = ?, OH_AndersB = ?, OH_Anders = ?, OS_onvoldoendeBeveiligd = ?, OS_onbeveiligd = ?, OS_defectInstallatie = ?, OS_onveiligeConstructie = ?, OS_ondeugdelijkeGereedschap = ?, OS_onveiligeKleding = ?, OS_gebreikkigeOrdeEnNetheid = ?, OS_Anders = ?, OS_AndersB = ?, BZ_onvoldoendeMaatregelen = ?, BZ_onvoldoendeErvaring = ?, BZ_onvoldoendeInstructie = ?, BZ_nietBevoegdBedienen = ?, BZ_onvoldoendeOnderhoud = ?, BZ_onvoldoendeVakkenis = ?, BZ_Anders = ?, BZ_AndersB = ?, omschrijvingActie = ?, actieTeNemenDoor = ?, actieTenemenVoorDatum = ?, meldingAfgehandeldVoorDatum = ?, meldingAfgehandeldDoor = ? WHERE formId = ?",
  updateTBM: "UPDATE formulier_tbm SET formNummer = ?, datumMeeting = ?, locatie = ?, gehoudenDoor = ?, functie = ?, aantalPaginas = ?, besprokenOnderwerpen = ? WHERE formId = ?",
  updateTRA: "UPDATE formulier_tra SET formNummer = ?, naamVGWCoordinator = ?, paraafVGWCoordinator = ?, naamAkkoordUitvoerendLeidinggevende = ?, paraafAkkoordUitvoerendLeidinggevende = ?, taakomschrijving = ? WHERE formId = ?",
  getWPI: "SELECT * FROM `formulier_wpi` WHERE formId = ?",
  getMIO: "SELECT * FROM `formulier_mio` WHERE formId = ?",
  getTBM:
    "SELECT * FROM formulier_tbm JOIN handtekening ON handtekening.formId = formulier_tbm.formId WHERE formulier_tbm.formId = ?",
  getTRA:
    "SELECT * FROM formulier_tra JOIN taakstap_tra ON formulier_tra.formId = taakstap_tra.formId JOIN gezienVoorUitvoering_tra ON formulier_tra.formId = gezienVoorUitvoering_tra.formId WHERE formulier_tra.formId = ?",
};

module.exports = queries;
