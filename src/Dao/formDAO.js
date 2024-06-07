const database = require("../../dbConnection");
const queryLibrary = require("./queryCollection");

const formDAO = {
  saveWPI: (form, callback) => {
    database.query(
      queryLibrary.postWPI,
      [
        form.nummer,
        form.datum,
        form.project,
        form.locatie,
        form.naamEigenaar,
        form.functieEigenaar,
        form.foto,
        form.inspectie.regelsVoorschriften
          .gehandeldVolgensRegelsEnVoorschriften,
        form.inspectie.regelsVoorschriften
          .gehandeldVolgensRegelsEnVoorschriftenAantekeningen,
        form.inspectie.omstandigheden.omstandighedenVeiligWerken,
        form.inspectie.omstandigheden.omstandighedenVeiligWerkenAantekeningen,
        form.inspectie.uitvoerenden.voldoenUitvoerendeAanEisen,
        form.inspectie.uitvoerenden.voldoenUitvoerendeAanEisenAantekeningen,
        form.inspectie.pbmGebruikt.vereisteBeschermingsmiddelen,
        form.inspectie.pbmGebruikt.vereisteBeschermingsmiddelenAantekeningen,
        form.inspectie.gevaarlijkeSituaties.gevaarlijkeSituatiesVoorkomen,
        form.inspectie.gevaarlijkeSituaties
          .gevaarlijkeSituatiesVoorkomenAantekeningen,
        form.inspectie.milieubelastendeStoffen.gevaarlijkeStoffenVerwerking,
        form.inspectie.milieubelastendeStoffen
          .gevaarlijkeStoffenVerwerkingAantekeningen,
        form.inspectie.voorzieningenAanwezig.benodigdeVoorzieningenCalimiteiten,
        form.inspectie.voorzieningenAanwezig
          .benodigdeVoorzieningenCalimiteitenAantekeningen,
        form.inspectie.gebruikteGereedschappen.staatGebruiktGereedschappen,
        form.inspectie.gebruikteGereedschappen
          .staatGebruiktGereedschappenAantekeningen,
        form.omschrijvingVerbetering,
        form.actieTeNemenDoor,
        form.actieTeNemenVoorDatum,
        form.evaluatieTerVerbetering,
        form.datumAfgehandeld,
        form.paraaf,
      ],
      (err, rows) => {
        if (err) {
          console.error("Error executing query", err);
          return callback(err, null);
        }
        callback(null, rows);
      }
    );
  },

  saveTRA: (form, callback) => {
    database.query(
      queryLibrary.postTRA,
      [
        form.nummer,
        form.naamVGWCoordinator,
        form.paraafVGWCoordinator,
        form.naamUitvoerendeLeidinggevende,
        form.paraafUitvoerendeLeidinggevende,
        form.omschrijvingTaak,
      ],
      (err, rows) => {
        if (err) {
          console.error("Error executing query", err);
          return callback(err, null);
        }
        callback(null, rows);
      }
    );
  },

  saveTaakStap: (form, callback) => {
    database.query(
      queryLibrary.postTaakStap,
      [
        form.number,
        form.taakstapNummer,
        form.taakstapActiviteit,
        form.gevaar,
        form.beheersMaatregel,
        form.actieDoor,
      ],
      (err, rows) => {
        if (err) {
          console.error("Error executing query", err);
          return callback(err, null);
        }
        callback(null, rows);
      }
    );
  },

  saveGezienUitvoering: (form, callback) => {
    database.query(
      queryLibrary.postGezienUitvoering,
      [form.number, form.name, form.signature],
      (err, rows) => {
        if (err) {
          console.error("Error executing query", err);
          return callback(err, null);
        }
        callback(null, rows);
      }
    );
  },

  saveMIO: (form, callback) => {
    database.query(
      queryLibrary.postMIO,
      [
        form.nummer,
        form.typeMelding,
        form.datum,
        form.tijdstip,
        form.naamEigenaar,
        form.functieEigenaar,
        form.locatie,
        form.aardLetsel,
        form.plaatsLetsel,
        form.foto,
        form.checkboxEersteBehandeling.eersteBehandeling,
        form.checkboxEersteBehandeling.onmiddellijkeActieNotitie,
        form.omschrijving,
        form.OH_onveiligeSnelheid,
        form.OH_beveiligingBuitenWerking,
        form.OH_verkeerdGebruikGereedschap,
        form.OH_nietGebruikenPBM,
        form.OH_onveiligLaden,
        form.OH_innemenOnveiligeLaden,
        form.OH_werkenAanGevaarlijkeDelen,
        form.OH_Afleiden,
        form.OH_AndersB,
        form.OH_Anders,
        form.OS_onvoldoendeBeveiligd,
        form.OS_onbeveiligd,
        form.OS_defectInstallatie,
        form.OS_onveiligeConstructie,
        form.OS_ondeugdelijkeGereedschap,
        form.OS_onveiligeKleding,
        form.OS_gebreikkigeOrdeEnNetheid,
        form.OS_Anders,
        form.OS_AndersB,
        form.BZ_onvoldoendeMaatregelen,
        form.BZ_onvoldoendeErvaring,
        form.BZ_onvoldoendeInstructie,
        form.BZ_nietBevoegdBedienen,
        form.BZ_onvoldoendeOnderhoud,
        form.BZ_onvoldoendeVakkenis,
        form.BZ_Anders,
        form.BZ_AndersB,
        form.omschrijvingActie,
        form.actieTeNemenDoor,
        form.actieTenemenVoorDatum,
        form.meldingAfgehandeldVoorDatum,
        form.meldingAfgehandeldDoor,
        form.paraaf,
      ],

      (err, rows) => {
        if (err) {
          console.error("Error executing query", err);
          return callback(err, null);
        }
        callback(null, rows);
      }
    );
  },

  saveTBM: (form, callback) => {
    database.query(
      queryLibrary.postTBM,
      [
        form.number,
        form.owner,
        form.date,
        form.location,
        form.holdBy,
        form.function,
        form.pageAmount,
        form.summary,
      ],
      (err, rows) => {
        if (err) {
          console.error("Error executing query", err);
          return callback(err, null);
        }
        callback(null, rows);
      }
    );
  },

  saveSignature: (form, callback) => {
    database.query(
      queryLibrary.postSignature,
      [form.number, form.name, form.signature],
      (err, rows) => {
        if (err) {
          console.error("Error executing query", err);
          return callback(err, null);
        }
        callback(null, rows);
      }
    );
  },
  
  getWPI: (primarykey, callback) => {
    database.query(queryLibrary.getWPI, [primarykey], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },
  getMIO: (primarykey, callback) => {
    database.query(queryLibrary.getMIO, [primarykey], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },
};

module.exports = formDAO;
