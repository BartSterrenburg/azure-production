const queries = {
  getAllUsers: "SELECT * FROM gebruiker",
  getUserById: "SELECT * FROM gebruiker WHERE personeelsnummer = ?",
  getUserRolByID: "SELECT rol FROM gebruiker WHERE personeelsnummer = ?",
  getPasswordByID:
    "SELECT wachtwoord FROM gebruiker WHERE personeelsnummer = ?",
  postWPI:
    "INSERT INTO formulier_wpi (formNummer, datum, project, locatie, naamEigenaar, functieEigenaar, foto, gehandeldVolgensRegelsEnVoorschriften, gehandeldVolgensRegelsEnVoorschriftenAantekeningen, omstandighedenVeiligWerken, omstandighedenVeiligWerkenAantekeningen, voldoenUitvoerendeAanEisen, voldoenUitvoerendeAanEisenAantekeningen, vereisteBeschermingsmiddelen, vereisteBeschermingsmiddelenAantekeningen, gevaarlijkeSituatiesVoorkomen, gevaarlijkeSituatiesVoorkomenAantekeningen, gevaarlijkeStoffenVerwerking, gevaarlijkeStoffenVerwerkingAantekeningen, benodigdeVoorzieningenCalimiteiten, benodigdeVoorzieningenCalimiteitenAantekeningen, staatGebruiktGereedschappen, staatGebruiktGereedschappenAantekeningen, omschrijvingVerbetering, actieTeNemenDoor, actieTeNemenVoorDatum, evaluatieTerVerbetering, datumAfgehandeld, paraaf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",

  postTRA:
    "INSERT INTO formulier_tra(formNummer, naamVGWCoordinator, paraafVGWCoordinator, naamAkkoordUitvoerendLeidinggevende, paraafAkkoordUitvoerendLeidinggevende, taakomschrijving) VALUES (?, ?, ?, ?, ?, ?)",
  postTaakStap: "INSERT INTO taakstap_tra(formNummer, taakstapNummer, taakstapActiviteit, gevaar, beheersMaatregel, actieDoor) VALUES(?, ?, ?, ?, ?, ?)",
  postGezienUitvoering: "INSERT INTO gezienVoorUitvoering_tra(formNummer, naam, paraaf) VALUES(?, ?, ?)",

  postMIO:
    "INSERT INTO formulier_mio (formNummer, typeMelding, datum, tijdstip, naamEigenaar, functieEigenaar, locatie, aardLetsel, plaatsLetsel, foto, eersteBehandeling, onmiddellijkeActieNotitie, omschrijving, OH_onveiligeSnelheid, OH_beveiligingBuitenWerking, OH_verkeerdGebruikGereedschap, OH_nietGebruikenPBM, OH_onveiligLaden, OH_innemenOnveiligeLaden, OH_werkenAanGevaarlijkeDelen, OH_Afleiden, OH_AndersB, OH_Anders, OS_onvoldoendeBeveiligd, OS_onbeveiligd, OS_defectInstallatie, OS_onveiligeConstructie, OS_ondeugdelijkeGereedschap, OS_onveiligeKleding, OS_gebreikkigeOrdeEnNetheid, OS_Anders, OS_AndersB, BZ_onvoldoendeMaatregelen, BZ_onvoldoendeErvaring, BZ_onvoldoendeInstructie, BZ_nietBevoegdBedienen, BZ_onvoldoendeOnderhoud, BZ_onvoldoendeVakkenis, BZ_Anders, BZ_AndersB, omschrijvingActie, actieTeNemenDoor, actieTenemenVoorDatum, meldingAfgehandeldVoorDatum, meldingAfgehandeldDoor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  postTBM:
    "INSERT INTO formulier_tbm(formNummer, personeelsnummerEige, datumMeeting, locatie, gehoudenDoor, functie, aantalPaginas, besprokenOnderwerpen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  postSignature:
    "INSERT INTO handtekening(formNummer, name, signature) VALUES(?,?,?)",

  createUser:
    "INSERT INTO gebruiker (personeelsnummer, naam, email, wachtwoord, handtekening, rol) VALUES (?, ?, ?, ?, ?, ?)",
  loginUser:
    "SELECT * FROM `gebruiker` WHERE personeelsnummer = ? AND wachtwoord = ?",

    updateSignature:
    "UPDATE gebruiker SET handtekening = ? WHERE personeelsnummer = ?",
};

module.exports = queries;
