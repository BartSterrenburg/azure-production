const database = require("../../dbConnection");
const queryLibrary = require("./queryCollection");

const formDAO = {
  getFormsByPersoneelsnummer: (personeelsnummer, callback) => {
    database.query(
      queryLibrary.getFormsByPersoneelsnummer,
      [
        personeelsnummer,
        personeelsnummer,
        personeelsnummer,
        personeelsnummer,
        personeelsnummer,
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

  getAllForms: (callback) => {
    database.query(queryLibrary.getAllForms, (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  getParticipants: (id, callback) => {
    database.query(queryLibrary.getParticipants, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  saveWPI: (form, callback) => {
    database.query(
      queryLibrary.postWPI,
      [
        form.owner,
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
        form.door,
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
        form.owner,
        form.nummer,
        form.naamVGWCoordinator,
        form.paraafVGWCoordinator,
        form.naamUitvoerendeLeidinggevende,
        form.paraafUitvoerendeLeidinggevende,
        form.omschrijvingTaak,
      ],
      (err, result) => {
        if (err) {
          console.error("Error executing INSERT query", err);
          return callback(err, null);
        }

        // After successful INSERT, perform the SELECT operation
        const selectQuery = `SELECT last_insert_id() AS id`;

        database.query(selectQuery, (err, rows) => {
          if (err) {
            console.error("Error executing SELECT query", err);
            return callback(err, null);
          }

          console.log(rows);
          callback(null, rows);
        });
      }
    );
  },

  saveTaakStap: (form, callback) => {
    database.query(
      queryLibrary.postTaakStap,
      [
        form.id,
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
      [form.id, form.number, form.name, form.signature],
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
        form.owner,
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
        form.eersteBehandeling,
        form.onmiddellijkeActieNotitie,
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
        form.owner,
        form.number,
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
        // After successful INSERT, perform the SELECT operation
        const selectQuery = `SELECT last_insert_id() AS id`;

        database.query(selectQuery, (err, rows) => {
          if (err) {
            console.error("Error executing SELECT query", err);
            return callback(err, null);
          }

          console.log(rows);
          callback(null, rows);
        });
      }
    );
  },

  saveLMRA: (form, callback) => {
    database.query(
      queryLibrary.postLMRA,
      [
        form.personeelsnummerEigenaar,
        form.inhoudTraWerkvergunning,
        form.traWerkvergunningBesproken,
        form.kenIkMijnTaak,
        form.waarWerkzaam,
        form.gekeurdGereedschapBeschikken,
        form.juisteMiddelenBeschikken,
        form.gevaarVoorVallendeVoorwerpen,
        form.gevaarKnellenOfStoten,
        form.struikelgevaar,
        form.voldoendeVerlicht,
        form.kenIkMijnVluchtroute,
        form.juistePBMBeschikken,
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
      [form.id, form.name, form.signature],
      (err, rows) => {
        if (err) {
          console.error("Error executing query", err);
          return callback(err, null);
        }
        callback(null, rows);
      }
    );
  },

  deleteSignature: (id, callback) => {
    database.query(queryLibrary.deleteSignature, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  getMIO: (id, callback) => {
    database.query(queryLibrary.getMIO, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  getWPI: (id, callback) => {
    database.query(queryLibrary.getWPI, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  getTBM: (id, callback) => {
    database.query(queryLibrary.getTBM, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  updateMIO: (id, form, callback) => {
    console.log('aangeroepen')
    console.log(id)
    // console.log(form)
    database.query(
        queryLibrary.updateMIO,
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
            form.eersteBehandeling,
            form.onmiddellijkeActieNotitie,
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
            id // totaal 46
        ],
        (err, rows) => {
            if (err) {
                console.error("Error executing query", err);
                callback(err);
            } else {
                callback(null, rows);
            }
        }
    );
},

  updateWPI: (id, form, callback) => {
    database.query(
      queryLibrary.updateWPI,
      [
        form.nummer,
        form.datum,
        form.project,
        form.locatie,
        form.naamEigenaar,
        form.functieEigenaar,
        form.foto,
        form.inspectie.regelsVoorschriften.gehandeldVolgensRegelsEnVoorschriften,
        form.inspectie.regelsVoorschriften.gehandeldVolgensRegelsEnVoorschriftenAantekeningen,
        form.inspectie.omstandigheden.omstandighedenVeiligWerken,
        form.inspectie.omstandigheden.omstandighedenVeiligWerkenAantekeningen,
        form.inspectie.uitvoerenden.voldoenUitvoerendeAanEisen,
        form.inspectie.uitvoerenden.voldoenUitvoerendeAanEisenAantekeningen,
        form.inspectie.pbmGebruikt.vereisteBeschermingsmiddelen,
        form.inspectie.pbmGebruikt.vereisteBeschermingsmiddelenAantekeningen,
        form.inspectie.gevaarlijkeSituaties.gevaarlijkeSituatiesVoorkomen,
        form.inspectie.gevaarlijkeSituaties.gevaarlijkeSituatiesVoorkomenAantekeningen,
        form.inspectie.milieubelastendeStoffen.gevaarlijkeStoffenVerwerking,
        form.inspectie.milieubelastendeStoffen.gevaarlijkeStoffenVerwerkingAantekeningen,
        form.inspectie.voorzieningenAanwezig.benodigdeVoorzieningenCalimiteiten,
        form.inspectie.voorzieningenAanwezig.benodigdeVoorzieningenCalimiteitenAantekeningen,
        form.inspectie.gebruikteGereedschappen.staatGebruiktGereedschappen,
        form.inspectie.gebruikteGereedschappen.staatGebruiktGereedschappenAantekeningen,
        form.omschrijvingVerbetering,
        form.actieTeNemenDoor,
        form.actieTeNemenVoorDatum,
        form.evaluatieTerVerbetering,
        form.datumAfgehandeld,
        form.door,
        form.paraaf,
        id,
      ],
    )
  },

  updateTBM: (id, form, callback) => {
    database.query(
      queryLibrary.updateTBM,
      [
        form.number,
        form.date,
        form.location,
        form.holdBy,
        form.function,
        form.pageAmount,
        form.summary,
        id,
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

  updateTRA: (id, form, callback) => {
    database.query(
      queryLibrary.updateTRA,
      [
        form.nummer,
        form.naamVGWCoordinator,
        form.paraafVGWCoordinator,
        form.naamUitvoerendeLeidinggevende,
        form.paraafUitvoerendeLeidinggevende,
        form.omschrijvingTaak,
        id,
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



  getTRA: (id, callback) => {
    database.query(queryLibrary.getTRA, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  getMIO: (id, callback) => {
    database.query(queryLibrary.getMIO, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },


  getTaakStap: (id, callback) => {
    database.query(queryLibrary.getTaakStap, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  getGezienUitvoering: (id, callback) => {
    database.query(queryLibrary.getGezienUitvoering, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  updateTaakStap: (id, form, callback) => {
    database.query(
      queryLibrary.updateTaakStap,
      [
        form.number,
        form.taakstapNummer,
        form.taakstapActiviteit,
        form.gevaar,
        form.beheersMaatregel,
        form.actieDoor,
        id,
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

  updateGezienUitvoering: (id, form, callback) => {
    database.query(
      queryLibrary.updateGezienUitvoering,
      [form.number, form.name, form.signature, id],
      (err, rows) => {
        if (err) {
          console.error("Error executing query", err);
          return callback(err, null);
        }
        callback(null, rows);
      }
    );
  },

  deleteTaakStap: (id, callback) => {
    database.query(queryLibrary.deleteTaakStap, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  deleteGezienUitvoering: (id, callback) => {
    database.query(queryLibrary.deleteGezienUitvoering, [id], (err, rows) => {
      if (err) {
        console.error("Error executing query", err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },
  
};

module.exports = formDAO;
