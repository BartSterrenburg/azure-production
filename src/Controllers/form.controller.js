const formDAO = require("../Dao/formDAO");
const getPdf = require("../functions/getPdf");

const formController = {
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

  //Get WPI data by primary key
  getWPI: (req, res, next) => {
    const primarykey = req.params.primarykey;
    formDAO.getWPI(primarykey, async (err, data) => {
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
  getTBM: (req, res, next) => {
    const primarykey = req.params.primarykey;
    formDAO.getTBM(primarykey, async (err, data) => {
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
  getTRA: (req, res, next) => {
    console.log("getTRA")
    const primarykey = req.params.primarykey;
    formDAO.getTRA(primarykey, async (err, data) => {
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
  getMIO: (req, res, next) => {
    const primarykey = req.params.primarykey;
    formDAO.getMIO(primarykey, async (err, data) => {
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
};

module.exports = formController;
