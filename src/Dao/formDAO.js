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
          form.paraaf

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
};

module.exports = formDAO;
