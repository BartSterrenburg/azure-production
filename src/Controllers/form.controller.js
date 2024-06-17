const formDAO = require("../Dao/formDAO");
const getPdf = require("../functions/getPdf");

const formController = {

  getFormsByPersoneelsnummer: (req, res, next) => {
    const personeelsnummer = req.params.personeelsnummer;
    formDAO.getFormsByPersoneelsnummer(personeelsnummer, (err, data) => {
      if (err) {
        console.error("getFormsByPersoneelsnummer error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "Forms found",
        data: data,
      });
    });
  },

  getParticipants: (req, res, next) => {
    const id = req.params.id;
    formDAO.getParticipants(id, (err, data) => {
      if (err) {
        console.error("getParticipants error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "Participants found",
        data: data,
      });
    });
  },

  getAllForms: (req, res, next) => {
    formDAO.getAllForms((err, data) => {
      if (err) {
        console.error("getAllForms error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "Forms found",
        data: data,
      });
    });
  },

  saveWPI: (req, res, next) => {
    const form = req.body;
    console.log(form.nummer);
    formDAO.saveWPI(form, (err, data) => {
      if (err) {
        console.error("saveWPI error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "WPI saved",
        data: data,
      });
    });
  },

  saveTRA: (req, res, next) => {
    const form = req.body;
    formDAO.saveTRA(form, (err, data) => {
      if (err) {
        console.error("saveWPI error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "TRA saved",
        data: data,
      });
    });
  },

  saveTaakStap: (req, res, next) => {
    const form = req.body;
    formDAO.saveTaakStap(form, (err, data) => {
      if (err) {
        console.error("saveWPI error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "Taakstap saved",
        data: data,
      });
    });
  },

  saveGezienUitvoering: (req, res, next) => {
    const form = req.body;
    formDAO.saveGezienUitvoering(form, (err, data) => {
      if (err) {
        console.error("saveWPI error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "TRA saved",
        data: data,
      });
    });
  },

  updateMIO: (req, res, next) => {
    const id = req.params.id;
    const form = req.body;
    formDAO.updateMIO(id, form, (err, data) => {
      if (err) {
        console.error("updateMIO error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "MIO updated",
        data: data,
      });
    });
  },

  updateWPI: (req, res, next) => {
    const id = req.params.id;
    const form = req.body;
    formDAO.updateWPI(id, form, (err, data) => {
      if (err) {
        console.error("updateWPI error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "WPI updated",
        data: data,
      });
    });
  },

  updateTBM: (req, res, next) => {
    const id = req.params.id;
    const form = req.body;
    formDAO.updateTBM(id, form, (err, data) => {
      if (err) {
        console.error("updateTBM error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "TBM updated",
        data: data,
      });
    });
  },

  updateTRA: (req, res, next) => {
    const id = req.params.id;
    const form = req.body;
    formDAO.updateTRA(id, form, (err, data) => {
      if (err) {
        console.error("updateTRA error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "TRA updated",
        data: data,
      });
    });
  },

  saveMIO: (req, res, next) => {
    const form = req.body;
    formDAO.saveMIO(form, (err, data) => {
      if (err) {
        console.error("saveMIO error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "MIO saved",
        data: data,
      });
    });
  },

  saveTBM: (req, res, next) => {
    const form = req.body;
    formDAO.saveTBM(form, (err, data) => {
      if (err) {
        console.error("saveWPI error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "TBM saved",
        data: data,
      });
    });
  },

  saveLMRA: (req, res, next) => {
    console.log("saveLMRA");
    const form = req.body;
    formDAO.saveLMRA(form, (err, data) => {
      if (err) {
        console.error("saveLMRA error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "LMRA saved",
        data: data,
      });
    });
  },

  saveSignature: (req, res, next) => {
    const form = req.body;
    formDAO.saveSignature(form, (err, data) => {
      if (err) {
        console.error("saveSignature error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "Signature saved",
        data: data,
      });
    });
  },

  deleteSignature: (req, res, next) => {
    const id = req.params.id;
    formDAO.deleteSignature(id, (err, data) => {
      if (err) {
        console.error("deleteSignature error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "Signature deleted",
        data: data,
      });
    });
  },

  //Get WPI data by primary key
  getPdfWPI: (req, res, next) => {
    const id = req.params.id;
    formDAO.getWPI(id, async (err, data) => {
      if (err) {
        console.error("getWPI error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }

      //Try to get PDF data and covert it to byte array to send to client
      try {
        const pdfBase64 = await getPdf.getPdfWPI(data);
        const byteArray = Buffer.from(pdfBase64, "base64");
        res.set({
          "Content-Type": "application/pdf",
          "Content-Length": byteArray.length,
        });
        res.send(byteArray);
      } catch (error) {
        console.error("Error sending PDF:", error);
        next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
    });
  },

  getPdfTBM: (req, res, next) => {
    const id = req.params.id;
    formDAO.getTBM(id, async (err, data) => {
      if (err) {
        console.error("getTBM error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }

      //Try to get PDF data and covert it to byte array to send to client
      try {
        const pdfBase64 = await getPdf.getPdfTBM(data);
        const byteArray = Buffer.from(pdfBase64, "base64");
        res.set({
          "Content-Type": "application/pdf",
          "Content-Length": byteArray.length,
        });
        res.send(byteArray);
      } catch (error) {
        console.error("Error sending PDF:", error);
        next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
    });
  },

  getPdfTRA: (req, res, next) => {
    console.log("getTRA");
    const id = req.params.id;
    formDAO.getTRA(id, async (err, data) => {
      if (err) {
        console.error("getTRA error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }

      //Try to get PDF data and covert it to byte array to send to client
      try {
        const pdfBase64 = await getPdf.getPdfTRA(data);
        const byteArray = Buffer.from(pdfBase64, "base64");
        res.set({
          "Content-Type": "application/pdf",
          "Content-Length": byteArray.length,
        });
        res.send(byteArray);
      } catch (error) {
        console.error("Error sending PDF:", error);
        next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
    });
  },

  getPdfMIO: (req, res, next) => {
    const id = req.params.id;
    formDAO.getMIO(id, async (err, data) => {
      if (err) {
        console.error("getMIO error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }

      //Try to get PDF data and covert it to byte array to send to client
      try {
        const pdfBase64 = await getPdf.getPdfMIO(data);
        const byteArray = Buffer.from(pdfBase64, "base64");
        res.set({
          "Content-Type": "application/pdf",
          "Content-Length": byteArray.length,
        });
        res.send(byteArray);
      } catch (error) {
        console.error("Error sending PDF:", error);
        next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
    });
  },

  getMIO: (req, res, next) => {
    const id = req.params.id;
    formDAO.getMIO(id, async (err, data) => {
      if (err) {
        console.error("getMio error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      } else {
        res.json({
          status: 200,
          message: "MIO found",
          data: data,
        });
      }
    });
  },

  getTRA: (req, res, next) => {
    const id = req.params.id;
    formDAO.getTRA(id, async (err, data) => {
      if (err) {
        console.error("getTRA error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      } else {
        res.json({
          status: 200,
          message: "TRA found",
          data: data,
        });
      }
    });
  },

  getWPI: (req, res, next) => {
    const id = req.params.id;
    formDAO.getWPI(id, async (err, data) => {
      if (err) {
        console.error("getWPI error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      } else {
        res.json({
          status: 200,
          message: "WPI found",
          data: data,
        });
      }
    });
  },

  getTBM: (req, res, next) => {
    const id = req.params.id;
    formDAO.getTBM(id, async (err, data) => {
      if (err) {
        console.error("getTBM error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      } else {
        res.json({
          status: 200,
          message: "TBM found",
          data: data,
        });
      }
    });
  },

  getTaakStap: (req, res, next) => {
    const id = req.params.id;
    formDAO.getTaakStap(id, async (err, data) => {
      if (err) {
        console.error("getTaakStap error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      } else {
        res.json({
          status: 200,
          message: "TaakStap found",
          data: data,
        });
      }
    });
  },

  updateTaakStap: (req, res, next) => {
    const id = req.params.id;
    const form = req.body;
    formDAO.updateTaakStap(id, form, (err, data) => {
      if (err) {
        console.error("updateTaakStap error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "TaakStap updated",
        data: data,
      });
    });
  },

  deleteTaakStap: (req, res, next) => {
    const id = req.params.id;
    formDAO.deleteTaakStap(id, (err, data) => {
      if (err) {
        console.error("deleteTaakStap error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "TaakStap deleted",
        data: data,
      });
    });
  },

  getGezienUitvoering: (req, res, next) => {
    const id = req.params.id;
    formDAO.getGezienUitvoering(id, (err, data) => {
      if (err) {
        console.error("getGezienUitvoering error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "GezienUitvoering found",
        data: data,
      });
    });
  },

  updateGezienUitvoering: (req, res, next) => {
    const id = req.params.id;
    const form = req.body;
    formDAO.updateGezienUitvoering(id, form, (err, data) => {
      if (err) {
        console.error("updateGezienUitvoering error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "GezienUitvoering updated",
        data: data,
      });
    });
  },

  deleteGezienUitvoering: (req, res, next) => {
    const id = req.params.id;
    formDAO.deleteGezienUitvoering(id, (err, data) => {
      if (err) {
        console.error("deleteGezienUitvoering error", err);
        return next({
          status: 500,
          message: "Internal Server Error",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "GezienUitvoering deleted",
        data: data,
      });
    });
  },

};

module.exports = formController;
