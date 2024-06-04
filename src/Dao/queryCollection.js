const queries = {
  getAllUsers: "SELECT * FROM gebruiker",
  getUserById: "SELECT * FROM gebruiker WHERE personeelsnummer = ?",
  getUserRolByID: "SELECT rol FROM gebruiker WHERE personeelsnummer = ?",
  getPasswordByID:
    "SELECT wachtwoord FROM gebruiker WHERE personeelsnummer = ?",
  saveWPI:
    "INSERT INTO formulier_wpi VALUES (?)",
};

module.exports = queries;