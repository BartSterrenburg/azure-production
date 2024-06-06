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
    primarykey INT AUTO_INCREMENT PRIMARY KEY,
    formNummer varChar(50),
    personeelsnummerEigenaar INT,
    typeMelding VARCHAR(50),
    datum DATE,
    tijdstip TIME,
    naamEigenaar VARCHAR(100),
    functieEigenaar VARCHAR(100),
    locatie VARCHAR(100),
    aardLetsel varChar(100),
    plaatsLetsel varChar(100),
    foto MEDIUMBLOB,
    eersteBehandeling varChar(100),
    onmiddellijkeActieNotitie varChar(512),
    omschrijving varChar(512),
    OH_onveiligeSnelheid BOOL,
    OH_beveiligingBuitenWerking BOOL,
    OH_verkeerdGebruikGereedschap BOOL,
    OH_nietGebruikenPBM BOOL,
    OH_onveiligLaden BOOL,
    OH_innemenOnveiligeLaden BOOL,
    OH_werkenAanGevaarlijkeDelen BOOL,
    OH_Afleiden BOOL,
    OH_AndersB BOOL,
    OH_Anders varChar(100),
    OS_onvoldoendeBeveiligd BOOL,
    OS_onbeveiligd BOOL,
    OS_defectInstallatie BOOL,
    OS_onveiligeConstructie BOOL,
    OS_ondeugdelijkeGereedschap BOOL,
    OS_onveiligeKleding BOOL,
    OS_gebreikkigeOrdeEnNetheid BOOL,
    OS_AndersB BOOL,
    OS_Anders varChar(100),
    BZ_onvoldoendeMaatregelen BOOL,
    BZ_onvoldoendeErvaring  BOOL,
    BZ_onvoldoendeInstructie BOOL,
    BZ_nietBevoegdBedienen BOOL,
    BZ_onvoldoendeOnderhoud BOOL,
    BZ_onvoldoendeVakkenis BOOL,
    BZ_AndersB BOOL,
    BZ_Anders varChar(100),
    OmschrijvingActie varChar(512),
    ActieTeNemenDoor varChar(100),
    ActieTeNemenVoorDatum DATE,
    MeldingAfgehandeldVoorDatum DATE,
    MeldingAfgehandeldDoor varChar(100),
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEigenaar) REFERENCES gebruiker(personeelsnummer)
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
    gehandeldVolgensRegelsEnVoorschriften BOOL,
    gehandeldVolgensRegelsEnVoorschriftenAantekeningen varchar(512),
    omstandighedenVeiligWerken BOOL,
    omstandighedenVeiligWerkenAantekeningen varchar(512),
    voldoenUitvoerendeAanEisen BOOL,
    voldoenUitvoerendeAanEisenAantekeningen varchar(512),
    vereisteBeschermingsmiddelen BOOL,
    vereisteBeschermingsmiddelenAantekeningen varchar(512),
    gevaarlijkeSituatiesVoorkomen BOOL,
    gevaarlijkeSituatiesVoorkomenAantekeningen varchar(512),
    gevaarlijkeStoffenVerwerking BOOL,
    gevaarlijkeStoffenVerwerkingAantekeningen varchar(512),
    benodigdeVoorzieningenCalimiteiten BOOL,
    benodigdeVoorzieningenCalimiteitenAantekeningen varchar(512),
    staatGebruiktGereedschappen BOOL,
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
    formNummer varchar(50),
    naam VARCHAR(100),
    paraaf TEXT,
    PRIMARY KEY (formNummer, naam)
);

-- Create taakstap_tra table
CREATE TABLE taakstap_tra (
    formNummer varchar(50),
    taakstapNummer INT,
    taakstapActiviteit varChar(512),
    gevaar varchar(512),
    beheersMaatregel varchar(512),
    actieDoor varchar(100),
    PRIMARY KEY (formNummer, taakstapNummer)
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
(1, 'Jan Janssen', 'jan.janssen@example.com', 'password20202', '', 10),
(2, 'Piet Pietersen', 'piet.pietersen@example.com', 'odsdfydfg2378G', '', 20);

-- Insert test data into formulier_mio
INSERT INTO formulier_mio (formNummer, personeelsnummerEigenaar, typeMelding, datum, tijdstip, naamEigenaar, functieEigenaar, locatie, aardLetsel, plaatsLetsel, foto, eersteBehandeling, onmiddellijkeActieNotitie, omschrijving, OH_onveiligeSnelheid, OH_beveiligingBuitenWerking, OH_verkeerdGebruikGereedschap, OH_nietGebruikenPBM, OH_onveiligLaden, OH_innemenOnveiligeLaden, OH_werkenAanGevaarlijkeDelen, OH_Afleiden, OH_Anders, OS_onvoldoendeBeveiligd, OS_onbeveiligd, OS_defectInstallatie, OS_onveiligeConstructie, OS_ondeugdelijkeGereedschap, OS_onveiligeKleding, OS_gebreikkigeOrdeEnNetheid, OS_Anders, BZ_onvoldoendeMaatregelen, BZ_onvoldoendeErvaring, BZ_onvoldoendeInstructie, BZ_nietBevoegdBedienen, BZ_onvoldoendeOnderhoud, BZ_onvoldoendeVakkenis, BZ_Anders, OmschrijvingActie, ActieTeNemenDoor, ActieTeNemenVoorDatum, MeldingAfgehandeldVoorDatum, MeldingAfgehandeldDoor)
VALUES ('ABC123', 2, 'Type Melding', '2024-06-06', '12:30:00', 'Naam Eigenaar', 'Functie Eigenaar', 'Locatie', 'Aard Letsel', 'Plaats Letsel', NULL, 'Eerste Behandeling', 'Onmiddellijke Actie Notitie', 'Omschrijving', 1, 0, 1, 0, 1, 0, 1, 0, 'Anders', 1, 0, 1, 0, 1, 0, 1, 'Anders', 1, 0, 1, 0, 1, 0, 'Anders', 'Omschrijving Actie', 'Actie Te Nemen Door', '2024-06-07', '2024-06-08', 'Afgehandeld Door');

-- Insert test data into formulier_wpi
INSERT INTO formulier_wpi (formNummer, personeelsnummerEigenaar, datum, project, locatie, naamEigenaar, functieEigenaar, gehandeldVolgensRegelsEnVoorschriften, gehandeldVolgensRegelsEnVoorschriftenAantekeningen, omstandighedenVeiligWerken, omstandighedenVeiligWerkenAantekeningen, voldoenUitvoerendeAanEisen, voldoenUitvoerendeAanEisenAantekeningen, vereisteBeschermingsmiddelen, vereisteBeschermingsmiddelenAantekeningen, gevaarlijkeSituatiesVoorkomen, gevaarlijkeSituatiesVoorkomenAantekeningen, gevaarlijkeStoffenVerwerking, gevaarlijkeStoffenVerwerkingAantekeningen, benodigdeVoorzieningenCalimiteiten, benodigdeVoorzieningenCalimiteitenAantekeningen, staatGebruiktGereedschappen, staatGebruiktGereedschappenAantekeningen, omschrijvingVerbetering, actieTeNemenDoor, actieTeNemenVoorDatum, evaluatieTerVerbetering, datumAfgehandeld, paraaf) VALUES 
('1', 2, '2023-02-01', 'Project 1', 'Locatie 1', 'Eigenaar 1', 'Functie 1', true, 'Aantekeningen 1', true, 'Aantekeningen 2', true, 'Aantekeningen 3', true, 'Aantekeningen 4', true, 'Aantekeningen 5', true, 'Aantekeningen 6', true, 'Aantekeningen 7', true, 'Aantekeningen 8', 'Verbetering 1', 'Actiehouder 1', '2023-03-01', 'Evaluatie 1', '2023-04-01', 'Paraaf 1');

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
INSERT INTO taakstap_tra (formNummer, taakstapNummer, taakstapActiviteit, gevaar, Beheersmaatregel, actieDoor) VALUES
('12348', 1, 'Activiteit 1', 'Gevaar 1', 'Beheersmaatregel 1', 'Actie Door 1'), 
('12348', 2, 'Activiteit 2', 'Gevaar 2', 'Beheersmaatregel 2', 'Actie Door 2'), 
('12348', 3, 'Activiteit 3', 'Gevaar 3', 'Beheersmaatregel 3', 'Actie Door 3');

-- Insert test data into deelnemer_tbm
INSERT INTO deelnemer_tbm (formId, personeelsnummer) VALUES
(1, 1),
(1, 2);
