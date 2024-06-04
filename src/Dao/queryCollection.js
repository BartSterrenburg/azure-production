const queries = {
  getAllUsers: "SELECT * FROM gebruiker",
  getUserById: "SELECT * FROM gebruiker WHERE personeelsnummer = ?",
  getUserRolByID: "SELECT rol FROM gebruiker WHERE personeelsnummer = ?",
  getPasswordByID:
    "SELECT wachtwoord FROM gebruiker WHERE personeelsnummer = ?",
  saveWPI: "INSERT INTO formulier_wpi VALUES (?)",
  createUser:
    "INSERT INTO gebruiker (personeelsnummer, naam, email, wachtwoord, handtekening, rol) VALUES (?, ?, ?, ?, ?, ?)",
  loginUser: "SELECT * FROM `gebruiker` WHERE personeelsnummer = ? AND wachtwoord = ?",
};


module.exports = queries;
