const queries = {
  getAllUsers: "SELECT * FROM gebruiker",
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
  postGezienUitvoering:
    "INSERT INTO gezienVoorUitvoering_tra(formId, formNummer, naam, paraaf) VALUES(?, ?, ?, ?)",

  postMIO:
    "INSERT INTO formulier_mio (personeelsnummerEigenaar, formNummer, typeMelding, datum, tijdstip, naamEigenaar, functieEigenaar, locatie, aardLetsel, plaatsLetsel, foto, eersteBehandeling, onmiddellijkeActieNotitie, omschrijving, OH_onveiligeSnelheid, OH_beveiligingBuitenWerking, OH_verkeerdGebruikGereedschap, OH_nietGebruikenPBM, OH_onveiligLaden, OH_innemenOnveiligeLaden, OH_werkenAanGevaarlijkeDelen, OH_Afleiden, OH_AndersB, OH_Anders, OS_onvoldoendeBeveiligd, OS_onbeveiligd, OS_defectInstallatie, OS_onveiligeConstructie, OS_ondeugdelijkeGereedschap, OS_onveiligeKleding, OS_gebreikkigeOrdeEnNetheid, OS_Anders, OS_AndersB, BZ_onvoldoendeMaatregelen, BZ_onvoldoendeErvaring, BZ_onvoldoendeInstructie, BZ_nietBevoegdBedienen, BZ_onvoldoendeOnderhoud, BZ_onvoldoendeVakkenis, BZ_Anders, BZ_AndersB, omschrijvingActie, actieTeNemenDoor, actieTenemenVoorDatum, meldingAfgehandeldVoorDatum, meldingAfgehandeldDoor, paraaf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  postTBM:
    "INSERT INTO formulier_tbm(personeelsnummerEigenaar, formNummer, datumMeeting, locatie, gehoudenDoor, functie, aantalPaginas, besprokenOnderwerpen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  postLMRA:
    "INSERT INTO formulier_lmra (personeelsnummerEigenaar, inhoudTraWerkvergunning, traWerkvergunningBesproken, kenIkMijnTaak, waarWerkzaam, gekeurdGereedschapBeschikken, juisteMiddelenBeschikken, gevaarVallendeVoorwerpen, gevaarKnellenOfStoten, struikelgevaar, voldoendeVerlicht, kenIkMijnVluchtroute, juistePBMBeschikken) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
  postSignature:
    "INSERT INTO handtekening(formId, name, signature) VALUES(?,?,?)",

  createUser:
    "INSERT INTO gebruiker (personeelsnummer, naam, email, wachtwoord, handtekening, rol) VALUES (?, ?, ?, ?, ?, ?)",
  loginUser:
    "SELECT * FROM `gebruiker` WHERE personeelsnummer = ? AND wachtwoord = ?",

  updateSignature:
    "UPDATE gebruiker SET handtekening = ? WHERE personeelsnummer = ?",

  getFormsByPersoneelsnummer:
    "SELECT formId, formNummer, datum FROM formulier_mio WHERE personeelsnummerEigenaar = ? UNION ALL SELECT formId, formNummer, datumMeeting FROM formulier_tbm WHERE personeelsnummerEigenaar = ? UNION ALL SELECT formId, formNummer, createDate FROM formulier_tra WHERE personeelsnummerEigenaar = ? UNION ALL SELECT formId, formNummer, datum FROM formulier_wpi WHERE personeelsnummerEigenaar = ?;",

  getOrders: "SELECT * FROM `order`",

  updateMIO:
  "UPDATE formulier_mio SET formNummer = ?, typeMelding = ?, datum = ?, tijdstip = ?, naamEigenaar = ?, functieEigenaar = ?, locatie = ?, aardLetsel = ?, plaatsLetsel = ?, foto = ?, eersteBehandeling = ?, onmiddellijkeActieNotitie = ?, omschrijving = ?, OH_onveiligeSnelheid = ?, OH_beveiligingBuitenWerking = ?, OH_verkeerdGebruikGereedschap = ?, OH_nietGebruikenPBM = ?, OH_onveiligLaden = ?, OH_innemenOnveiligeLaden = ?, OH_werkenAanGevaarlijkeDelen = ?, OH_Afleiden = ?, OH_AndersB = ?, OH_Anders = ?, OS_onvoldoendeBeveiligd = ?, OS_onbeveiligd = ?, OS_defectInstallatie = ?, OS_onveiligeConstructie = ?, OS_ondeugdelijkeGereedschap = ?, OS_onveiligeKleding = ?, OS_gebreikkigeOrdeEnNetheid = ?, OS_Anders = ?, OS_AndersB = ?, BZ_onvoldoendeMaatregelen = ?, BZ_onvoldoendeErvaring = ?, BZ_onvoldoendeInstructie = ?, BZ_nietBevoegdBedienen = ?, BZ_onvoldoendeOnderhoud = ?, BZ_onvoldoendeVakkenis = ?, BZ_Anders = ?, BZ_AndersB = ?, omschrijvingActie = ?, actieTeNemenDoor = ?, actieTenemenVoorDatum = ?, meldingAfgehandeldVoorDatum = ?, meldingAfgehandeldDoor = ? WHERE formId = ?",  getMIO: "SELECT * FROM formulier_mio WHERE formId = ?",

  getWPI: "SELECT * FROM `formulier_wpi` WHERE formId = ?",
  getTBM:
    "SELECT * FROM formulier_tbm JOIN handtekening ON handtekening.formId = formulier_tbm.formId WHERE formulier_tbm.formId = ?",
  getTRA:
    "SELECT * FROM formulier_tra JOIN taakstap_tra ON formulier_tra.formId = taakstap_tra.formId JOIN gezienVoorUitvoering_tra ON formulier_tra.formId = gezienVoorUitvoering_tra.formId WHERE formulier_tra.formId = ?",
};

module.exports = queries;
