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
    foto TEXT,
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
    paraaf TEXT,
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
(1, 'Jan Janssen', 'jan.janssen@example.com', 'password20202', 'data:image/png;base64,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', 10),
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
