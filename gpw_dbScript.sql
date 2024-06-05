-- Drop tables in order respecting foreign key constraints
DROP TABLE IF EXISTS gezienVoorUitvoering_tra;
DROP TABLE IF EXISTS taakstap_tra;
DROP TABLE IF EXISTS deelnemer_tbm;
DROP TABLE IF EXISTS handtekening;
DROP TABLE IF EXISTS formulier_tbm;
DROP TABLE IF EXISTS formulier_tra;
DROP TABLE IF EXISTS formulier_mio;
DROP TABLE IF EXISTS formulier_wpi;
DROP TABLE IF EXISTS gebruiker;
DROP TABLE IF EXISTS rollen;

-- Create rollen table
CREATE TABLE rollen (
    rolNummer INT PRIMARY KEY,
    rolOmschrijving VARCHAR(50)
);

-- Create gebruiker table
CREATE TABLE gebruiker (
    personeelsnummer INT PRIMARY KEY,
    naam VARCHAR(100),
    email VARCHAR(100),
    wachtwoord VARCHAR(100),
    handtekening TEXT,
    rol INT,
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (rol) REFERENCES rollen(rolNummer)
);

-- Create formulier_mio table
CREATE TABLE formulier_mio (
    formId INT PRIMARY KEY AUTO_INCREMENT,
    ordernummer INT,
    personeelsnummerEige INT,
    typeMelding VARCHAR(50),
    datum DATE,
    tijdstip TIME,
    naamEigenaar VARCHAR(100),
    functieEigenaar VARCHAR(100),
    locatie VARCHAR(100),
    aardLetsel TEXT,
    plaatsLetsel TEXT,
    eersteBehandeling TEXT,
    onmiddellijkeActieNotitie TEXT,
    omschrijving TEXT,
    fotoTerIl TEXT,
    OH_onveiligeSnelheid BOOLEAN,
    OH_beveiligingBuitenWerking BOOLEAN,
    OH_verkeerdGereedschap BOOLEAN,
    OH_nietGebruikenPBM BOOLEAN,
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEige) REFERENCES gebruiker(personeelsnummer)
);

-- Create formulier_wpi table
CREATE TABLE formulier_wpi (
    primarykey INT AUTO_INCREMENT PRIMARY KEY,
    formNummer varchar(50),
    personeelsnummerEigenaar INT,
    datum DATE,
    project VARCHAR(128),
    locatie VARCHAR(128),
    naamEigenaar VARCHAR(128),
    functieEigenaar VARCHAR(128),
    foto MEDIUMBLOB,
    gehandeldVolgensRegelsEnVoorschriften BOOLEAN,
    gehandeldVolgensRegelsEnVoorschriftenAantekeningen varchar(512),
    omstandighedenVeiligWerken BOOLEAN,
    omstandighedenVeiligWerkenAantekeningen varchar(512),
    voldoenUitvoerendeAanEisen BOOLEAN,
    voldoenUitvoerendeAanEisenAantekeningen varchar(512),
    vereisteBeschermingsmiddelen BOOLEAN,
    vereisteBeschermingsmiddelenAantekeningen varchar(512),
    gevaarlijkeSituatiesVoorkomen BOOLEAN,
    gevaarlijkeSituatiesVoorkomenAantekeningen varchar(512),
    gevaarlijkeStoffenVerwerking BOOLEAN,
    gevaarlijkeStoffenVerwerkingAantekeningen varchar(512),
    benodigdeVoorzieningenCalimiteiten BOOLEAN,
    benodigdeVoorzieningenCalimiteitenAantekeningen varchar(512),
    staatGebruiktGereedschappen BOOLEAN,
    staatGebruiktGereedschappenAantekeningen varchar(512),
    omschrijvingVerbetering varchar(512),
    actieTeNemenDoor varchar(128),
    actieTeNemenVoorDatum DATE,
    evaluatieTerVerbetering varchar(512),
    datumAfgehandeld DATE,
    paraaf varchar(5000),
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEigenaar) REFERENCES gebruiker(personeelsnummer)
);

-- Create formulier_tbm table
CREATE TABLE formulier_tbm (
    formId INT AUTO_INCREMENT PRIMARY KEY,
    formNummer varchar(50),
    personeelsnummerEige INT,
    datumMeeting DATE,
    locatie VARCHAR(100),
    gehoudenDoor VARCHAR(100),
    functie VARCHAR(100),
    aantalPaginas INT,
    besprokenOnderwerpen TEXT,
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEige) REFERENCES gebruiker(personeelsnummer)
);

-- Create formulier_tra table
CREATE TABLE formulier_tra (
    primarykey INT AUTO_INCREMENT PRIMARY KEY,
    formNummer varchar(50),
    personeelsnummerEigenaar INT,
    naamVGWCoordinator VARCHAR(100),
    paraafVGWCoordinator varchar(5000),
    naamAkkoordUitvoerendLeidinggevende VARCHAR(100),
    paraafAkkoordUitvoerendLeidinggevende varchar(5000),
    taakomschrijving varchar(512),
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEigenaar) REFERENCES gebruiker(personeelsnummer)
);

-- Create gezienVoorUitvoering_tra table
CREATE TABLE gezienVoorUitvoering_tra (
    primarykey INT PRIMARY KEY AUTO_INCREMENT,
    formNummer varchar(50),
    naam VARCHAR(100),
    paraaf TEXT,
    FOREIGN KEY (primarykey) REFERENCES formulier_tra(primarykey)
);

-- Create taakstap_tra table
CREATE TABLE taakstap_tra (
    primarykey INT PRIMARY KEY AUTO_INCREMENT,
    formNummer varchar(50),
    taakstapNummer INT,
    taakstapActiviteit TEXT,
    FOREIGN KEY (primarykey) REFERENCES formulier_tra(primarykey)
);

-- Create deelnemer_tbm table
CREATE TABLE deelnemer_tbm (
    formId INT,
    personeelsnummer INT,
    PRIMARY KEY (formId, personeelsnummer),
    FOREIGN KEY (formId) REFERENCES formulier_tbm(formId),
    FOREIGN KEY (personeelsnummer) REFERENCES gebruiker(personeelsnummer)
);

-- Create handtekening table
CREATE TABLE handtekening (
    formNummer VARCHAR(50),
    name VARCHAR(100),
    signature varchar(5000)
);

-- Insert test data into rollen
INSERT INTO rollen (rolNummer, rolOmschrijving) VALUES
(10, 'Medewerker'),
(20, 'Manager');

-- Insert test data into gebruiker
INSERT INTO gebruiker (personeelsnummer, naam, email, wachtwoord, handtekening, rol) VALUES
(1, 'Jan Janssen', 'jan.janssen@example.com', 'password20202', 'handtekening1', 10),
(2, 'Piet Pietersen', 'piet.pietersen@example.com', 'odsdfydfg2378G', 'handtekening2', 20);

-- Insert test data into formulier_mio
INSERT INTO formulier_mio (ordernummer, personeelsnummerEige, datum, tijdstip, typeMelding, naamEigenaar, functieEigenaar, locatie, aardLetsel, plaatsLetsel, eersteBehandeling, onmiddellijkeActieNotitie, omschrijving, fotoTerIl, OH_onveiligeSnelheid, OH_beveiligingBuitenWerking, OH_verkeerdGereedschap, OH_nietGebruikenPBM) VALUES
(12345, 1, '2023-01-01', '12:00:00', 'Melding Type 1', 'Eigenaar 1', 'Functie 1', 'Locatie 1', 'Aard Letsel 1', 'Plaats Letsel 1', 'Eerste Behandeling 1', 'Actie Notitie 1', 'Omschrijving 1', 'Foto 1', true, false, true, false);

-- Insert test data into formulier_wpi
INSERT INTO formulier_wpi (formNummer, personeelsnummerEigenaar, datum, project, locatie, naamEigenaar, functieEigenaar, gehandeldVolgensRegelsEnVoorschriften, gehandeldVolgensRegelsEnVoorschriftenAantekeningen, omstandighedenVeiligWerken, omstandighedenVeiligWerkenAantekeningen, voldoenUitvoerendeAanEisen, voldoenUitvoerendeAanEisenAantekeningen, vereisteBeschermingsmiddelen, vereisteBeschermingsmiddelenAantekeningen, gevaarlijkeSituatiesVoorkomen, gevaarlijkeSituatiesVoorkomenAantekeningen, gevaarlijkeStoffenVerwerking, gevaarlijkeStoffenVerwerkingAantekeningen, benodigdeVoorzieningenCalimiteiten, benodigdeVoorzieningenCalimiteitenAantekeningen, staatGebruiktGereedschappen, staatGebruiktGereedschappenAantekeningen, omschrijvingVerbetering, actieTeNemenDoor, actieTeNemenVoorDatum, evaluatieTerVerbetering, datumAfgehandeld, paraaf) 
VALUES ('1', 1, '2023-02-01', 'Project 1', 'Locatie 1', 'Eigenaar 1', 'Functie 1', true, 'Aantekeningen 1', true, 'Aantekeningen 2', true, 'Aantekeningen 3', true, 'Aantekeningen 4', true, 'Aantekeningen 5', true, 'Aantekeningen 6', true, 'Aantekeningen 7', true, 'Aantekeningen 8', 'Verbetering 1', 'Actiehouder 1', '2023-03-01', 'Evaluatie 1', '2023-04-01', 'Paraaf 1');

-- Insert test data into formulier_tbm
INSERT INTO formulier_tbm (formNummer, personeelsnummerEige, datumMeeting, locatie, gehoudenDoor, functie, aantalPaginas, besprokenOnderwerpen)
VALUES ('TBM001', 1, '2023-06-01', 'Locatie A', 'John Doe', 'Manager', 5, 'Onderwerp 1, Onderwerp 2, Onderwerp 3');

-- Insert test data into formulier_tra
INSERT INTO formulier_tra (formNummer, personeelsnummerEigenaar, naamVGWCoordinator, paraafVGWCoordinator, naamAkkoordUitvoerendLeidinggevende, paraafAkkoordUitvoerendLeidinggevende, taakomschrijving) 
VALUES ('12348', 2, 'VGW Coordinator 1', 'Paraaf 1', 'Leidinggevende 1', 'Paraaf 2', 'Taakomschrijving 1');

-- Insert test data into gezienVoorUitvoering_tra
INSERT INTO gezienVoorUitvoering_tra (formNummer, naam, paraaf) VALUES
('12348', 'Naam 1', 'Paraaf 1');

-- Insert test data into taakstap_tra
INSERT INTO taakstap_tra (formNummer, taakstapNummer, taakstapActiviteit) VALUES
('12348', 1, 'Activiteit 1');

-- Insert test data into deelnemer_tbm
INSERT INTO deelnemer_tbm (formId, personeelsnummer) VALUES
(1, 1),
(1, 2);