-- Drop tables in order respecting foreign key constraints
DROP TABLE IF EXISTS gezienVoorUitvoering_tra;
DROP TABLE IF EXISTS taakstap_tra;
DROP TABLE IF EXISTS deelnemer_tbm;
DROP TABLE IF EXISTS handtekening;
DROP TABLE IF EXISTS formulier_tbm;
DROP TABLE IF EXISTS formulier_tra;
DROP TABLE IF EXISTS formulier_mio;
DROP TABLE IF EXISTS formulier_wpi;
DROP TABLE IF EXISTS formulier_lmra;
DROP TABLE IF EXISTS gebruiker;
DROP TABLE IF EXISTS rollen;
DROP TABLE IF EXISTS `order`;

-- Create rollen table
CREATE TABLE rollen (
    rolNummer INT PRIMARY KEY,
    rolOmschrijving VARCHAR(50)
);

-- Create gebruiker table
CREATE TABLE gebruiker (
    personeelsnummer varchar(6) PRIMARY KEY,
    naam VARCHAR(100),
    email VARCHAR(100),
    wachtwoord VARCHAR(100),
    handtekening MEDIUMTEXT,
    rol INT,
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (rol) REFERENCES rollen(rolNummer)
);

-- Create formulier_mio table
CREATE TABLE formulier_mio (
    formId INT AUTO_INCREMENT PRIMARY KEY,
    formNummer varChar(50),
    personeelsnummerEigenaar varchar(6),
    typeMelding VARCHAR(50),
    datum DATE,
    tijdstip TIME,
    naamEigenaar VARCHAR(100),
    functieEigenaar VARCHAR(100),
    locatie VARCHAR(100),
    aardLetsel varChar(100),
    plaatsLetsel varChar(100),
    foto MEDIUMTEXT,
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
    paraaf MEDIUMTEXT,
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEigenaar) REFERENCES gebruiker(personeelsnummer)
);

-- Create formulier_wpi table
CREATE TABLE formulier_wpi (
    formId INT AUTO_INCREMENT PRIMARY KEY,
    formNummer varchar(50),
    personeelsnummerEigenaar varchar(6),
    datum DATE,
    project VARCHAR(128),
    locatie VARCHAR(128),
    naamEigenaar VARCHAR(128),
    functieEigenaar VARCHAR(128),
    foto MEDIUMTEXT,
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
    door varchar(128),
    paraaf MEDIUMTEXT,
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEigenaar) REFERENCES gebruiker(personeelsnummer)
);

-- Create formulier_tbm table
CREATE TABLE formulier_tbm (
    formId INT AUTO_INCREMENT PRIMARY KEY,
    formNummer varchar(50),
    personeelsnummerEigenaar varchar(6),
    datumMeeting DATE,
    locatie VARCHAR(100),
    gehoudenDoor VARCHAR(100),
    functie VARCHAR(100),
    aantalPaginas INT,
    besprokenOnderwerpen MEDIUMTEXT,
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEigenaar) REFERENCES gebruiker(personeelsnummer)
);

-- Create formulier_tra table
CREATE TABLE formulier_tra (
    formId INT AUTO_INCREMENT PRIMARY KEY,
    formNummer varchar(50),
    personeelsnummerEigenaar varchar(6),
    naamVGWCoordinator VARCHAR(100),
    paraafVGWCoordinator MEDIUMTEXT,
    naamAkkoordUitvoerendLeidinggevende VARCHAR(100),
    paraafAkkoordUitvoerendLeidinggevende MEDIUMTEXT,
    taakomschrijving varchar(512),
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEigenaar) REFERENCES gebruiker(personeelsnummer)
);

-- Create formulier_lmra table
CREATE TABLE formulier_lmra (
    formId INT AUTO_INCREMENT PRIMARY KEY,
    formNummer varchar(50) DEFAULT "LMRA",
    personeelsnummerEigenaar varchar(6),
    inhoudTraWerkvergunning BOOL,
    traWerkvergunningBesproken BOOL,
    kenIkMijnTaak BOOL,
    waarWerkzaam BOOL,
    gekeurdGereedschapBeschikken BOOL,
    juisteMiddelenBeschikken BOOL,
    gevaarVallendeVoorwerpen BOOL,
    gevaarKnellenOfStoten BOOL,
    struikelgevaar BOOL,
    voldoendeVerlicht BOOL,
    kenIkMijnVluchtroute BOOL,
    juistePBMBeschikken BOOL,
    createDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updateDate datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (personeelsnummerEigenaar) REFERENCES gebruiker(personeelsnummer)
);

-- Create gezienVoorUitvoering_tra table
CREATE TABLE gezienVoorUitvoering_tra (
    formId INT,
    formNummer varchar(50),
    naam VARCHAR(100),
    paraaf MEDIUMTEXT,
    PRIMARY KEY (formId, naam),
    FOREIGN KEY (formId) REFERENCES formulier_tra(formId)
);

-- Create taakstap_tra table
CREATE TABLE taakstap_tra (
    formId INT,
    formNummer varchar(50),
    taakstapNummer INT,
    taakstapActiviteit varchar(512),
    gevaar varchar(512),
    beheersMaatregel varchar(512),
    actieDoor varchar(100),
    PRIMARY KEY (formId, taakstapNummer),
    FOREIGN KEY (formId) REFERENCES formulier_tra(formId)
);

-- Create handtekening table
CREATE TABLE handtekening (
    formId INT,
    name VARCHAR(100),
    signature MEDIUMTEXT,
    FOREIGN KEY (formId) REFERENCES formulier_tbm(formId)
);

-- Create orde table
CREATE TABLE `order` (
    ordernummer varchar(50) PRIMARY KEY,
    Naam varchar(100),
    beschrijving varchar(1000)
);


-- Insert test data into rollen
INSERT INTO rollen (rolNummer, rolOmschrijving) VALUES
(10, 'Medewerker'),
(20, 'Manager');

-- Insert test data into gebruiker
INSERT INTO gebruiker (personeelsnummer, naam, email, wachtwoord, handtekening, rol) VALUES
('010215', 'Volkan Aydinalp', 'volkanaydin09@gmail.com', '$2b$13$ZuBEqiu1xg0nq3CkkqaQ8eJFFUlAzlUUnClLs8tWniqxTfnVlxF7i', '', 10),
('010818', 'Sietse Blok', 'siets321@gmail.com', '$2b$13$z1/qAeAkKrm4K8ofOW3pbO1VohR4WcZ/R8YQsBcN9DgIvnhxiYG9m', '', 10),
('010913', 'Willem Braber', 'braber_92@live.nl', '$2b$13$ZZWujnGPEhyYSSCS1KMs8O.fNE41FX1tk4a6OxD1aIzK15J7ikzXq', '', 10),
('010614', 'Joost Breel', 'jopyg60@gmail.com', '$2b$13$U/mhZZj1wR/Q9FoNblmZ2.pYhsPnbmr0IJPNWFQBu.oR9HKUt3n9O', '', 10),
('170815', 'Andries Corré', 'andriescorre@hotmail.com', '$2b$13$zOavbRM45YqgsQ1VTcxVXeBAf95QQD58MzwabXDaJy4K429eFADFO', '', 10),
('010419', 'Patrick de Gier', 'patricknjsn70@hotmail.com', '$2b$13$CLCiWGjTnv0FT8ajW.ntV.g4qtrr05F1btdl5I59ly3ftj9SXX22u', '', 20),
('220311', 'Willem de Gier', 'wbdegier@turbinesupport.nl', '$2b$13$0iZFz1RtxwoTjnqqCs.rbOjD0FUb/yd6fKTO6EF2q2cn5halziZSK', '', 10),
('231113', 'Nels de Wolff', 'nelsdewolff@hotmail.com', '$2b$13$GX0jf.429P.2XD91haHZbuXBZCI0q8ed/2RZsmyNmdbAlGqoswRHu', '', 10),
('170320', 'Abdullah Demirci', 'abdullahdemirci@live.nl', '$2b$13$me22pEV.xT5rxtc66ZPauu9o7F3.CSJlZIgzG/3Q..SF4zf.J0YO.', '', 10),
('220708', 'Peter Driece', 'peterdriece@hotmail.com', '$2b$13$OGfGUSFdWaCmDW6hdPZmj.8nDamZXHzrbt7RFRgkHrtPx2fXK9C9q', '', 10),
('010819', 'Dylan Flohil', 'dylanflohil@hotmail.com', '$2b$13$Q4hnxmK5NEDBjTmqEU0O7eZ94G6vSN/TJK.p0UQhIuDjuqTBDddr2', '', 10),
('300810', 'Rudi Hoogenboom', 'rudi_hoogenboom@me.com', '$2b$13$9preA/ifbR3srGX1lTRdpONRkxPlY0ZdFm9lHI.kj1DG1llsFwiYe', '', 10),
('220497', 'Ton Huijer', 'tonhuijer@icould.com', '$2b$13$KOopyJ4YfAItfdqOIV2Rt.x5VgoC7/3vHQdTWionPveQIsCX64S.C', '', 10),
('010118', 'Bas Jelsma', 'ljjelsma@gmail.com', '$2b$13$El18V5lap0H7kVXaMPKbpelyTG4/U4SydcL4mbJneolOIQ7CHBIRa', '', 10),
('220373', 'Henk Levolger', 'h.levolger@gmail.com', '$2b$13$sAMFajXnNLdUHD0eIIRUners8gjRhnpDld47sdqvid/pBN9yeiW3C', '', 10),
('010710', 'Niels Melaard', 'nielsmelaard@gmail.com', '$2b$13$C1ttVbmqIUG1Wb89xvVdh.I5wnh/dwiJsHn0hRy9Bht.EXEiGwXwq', '', 10),
('010916', 'Christian Meyer', 'christianmeyer18@hotmail.com', '$2b$13$luWKw1.whlNST6QCjquB5O2WBnRP7zXLgD9Pa65QtJZ/gWId3Crua', '', 10),
('011018', 'Pim Mulders', 'mulderspim@gmail.com', '$2b$13$g94QDRT.NZ5My1qiCJZrLevDcz//JKQatV1sSpLSl4IT2O/ecikTa', '', 10),
('220101', 'Arie Prins', 'awprins@turbinesupport.nl', '$2b$13$zfvPyvqKiLMALYFPODrGf.Bq9MjL90iEnhBHHZYtirQVwW2.uNoWO', '', 10),
('010314', 'Ludwig Schoop', 'l.schoop@hotmail.nl', '$2b$13$guVj8PWup79rH8QV6tFbduR7QAauZjy9E1QO/wh6/vESSU8DgAyuq', '', 10),
('181001', 'Jochem Schoordijk', 'jochemschoordijk@outlook.com', '$2b$13$y.KTSbyV14I55WOM.8HFP.RHu80394ZqtX4d14LfsBjF.b5lsnk/W', '', 10),
('220504', 'Hennie Schouten', 'heja684@gmail.com', '$2b$13$spztoSJgtlRiwIMcUK52Z.S/GyAzRIp4mqXM5377i5qd8Y7OV0hHC', '', 10),
('220172', 'Robbie Sewnarain', 'robbysewnarain@hotmail.com', '$2b$13$rw/Zv0XSCHcErOaxggwnW.TxKwYpRGJxJ4bvZ/HUsdGCLRfbJdft2', '', 10),
('220221', 'Gerard Steenbergen', 'g.steenbergen65@chello.nl', '$2b$13$FScE6L5IaCcKmbsy0BupTeAAgzqoeTJVR3L14LuxbOf1y9f.70Xeq', '', 10),
('220132', 'Peter Tijl', 'ptijl@zeelandnet.nl', '$2b$13$sTmn3VqbywD1rluXiT6YaeOulo3kjKEScSndpEuj4GQscirT5XkjK', '', 10),
('172003', 'Adem Toker', 'ademtoker42@icloud.com', '$2b$13$xNi0EFYjYp/CX302OjLjAeMG/8/i.86aL/z1kIv9G79s81I6wMDkC', '', 10),
('220288', 'Vincent van Dijk', 'vincent_vandijk9@hotmail.com', '$2b$13$y7S/axHVm6GF.4OpQSQ.PemQEFFZAI81hDUez7sKX26pPp.m1GvJi', '', 10),
('010911', 'Robert Weijts', 'w-robert@live.nl', '$2b$13$g7a7lhVJ47/dNmKHxRqg5eDAIIidVKxO6cJXXeOf81b34I9X9WJMi', '', 10),
('110616', 'Cengiz Yildiz', 'c.yildizgpw@gmail.com', '$2b$13$.FNwEWFDR1oT51QIS0Mi/uSB10Y5rknP9XQjM4XMerGHThu4rx.8y', '', 10),
('010920', 'Ton Melaard', 't.melaard@upcmail.nl', '$2b$13$irrTO99AK45HIRXtgROuZevmZVdTaTWAo7yP4Sq9Y3lziHqcseJF6', '', 10),
('210109', 'Mick Hameeteman', 'mickhameeteman@hotmail.nl', '$2b$13$ORBKPF98RIEgxsWKK6rgQOomKfHpTPoGH.KbX2CCC38OfrIEWSuO.', '', 10),
('010921', 'Stefan Tuns', 's.tns0187@gmail.com', '$2b$13$GLseRbAiTHxDGDPfeZsdbu75VCcYSyQOtJsczmvD0nK.dGMpev41G', '', 10),
('012109', 'Mike Doorn', 'mikedoorn2000@hotmail.com', '$2b$13$zdE5BZ0axDwW8F2gp4DliO1tlgEEI1HaXvfAUpq1O7GVaduI0p8za', '', 10),
('210901', 'Ryan Pijl', 'ryanpijl@icloud.com', '$2b$13$aSodCDoXMoD8Qd0EXfMpDOYjeGl0gPsvKb9GWj7mr0v69PjakHCCS', '', 10),
('010821', 'Tom van Wamelen', 'tom_98@live.nl', '$2b$13$czm2wWNMN.V1LAT37BtFaObhpPRmHyrvrEzWbrSrtboiR2am50lK6', '', 10),
('010922', 'Jochem Klepper', 'jochemklepper@gmail.com', '$2b$13$gBM98Lan7iAaRITT9BbRiOn8qSVJF.280yZtMU6eeMHkpXeG6gze.', '', 10),
('090122', 'Sten Koppenaal', 'sten15kpnl@gmail.com', '$2b$13$E3e4XvM0A7Sae3WEj7K9PuJLeZXJxVy/s.jAnjwtUkM/v1ChKbqg.', '', 10),
('220901', 'Pieter Verheijden', 'pieter.verheijden@gmail.com', '$2b$13$3QszzImATV72bid7VYHOOuG90tiLYm5pxijP8NKJMV2Eyn6MC3j1.', '', 10),
('230109', 'Dion Rooijens', 'dionrooijens@outlook.com', '$2b$13$iw5vj8De4bivUJKfeYrdqeUb.vLQ5t7OXD2IUkNoX6igMrNU5gp2G', '', 10),
('010923', 'Quinn Schouten', 'q.a.schouten@gmail.com', '$2b$13$O1DnqWN19gBfe6hb53.hauhR8PCQ2KhCiMG5MzB6txrXOILsm7P7K', '', 10),
('130323', 'Quinten Schneider', 'quintensc@hotmail.com', '$2b$13$Nbo0mMJwCXvHs9t.7VaHwOtCvepN.b9haCDWgB/MbDpcx/FxQjkhK', '', 10),
('220342', 'Ron van der Windt', 'rlvanderwindt@turbinesupport.nl', '$2b$13$NxG4NzXe06.5rDVZgCuvQuoeXvfN9xmyskYe6viElovLJUJCvBgh2', '', 10);

-- Insert test data into order table
INSERT INTO `order` (ordernummer, Naam, beschrijving) VALUES
('10324234', 'Naam 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.'),
('20730274', 'Naam 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.'),
('36382940', 'Naam 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.'),
('39362811', 'Naam 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.'),
('32849332', 'Naam 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.'),
('32674383', 'Naam 6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.'),
('32398254', 'Naam 7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.'),
('10328492', 'Naam 8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.'),
('20738490', 'Naam 9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.'),
('36389420', 'Naam 10', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim metus ut elit suscipit, in laoreet justo ullamcorper. Praesent faucibus ex sit amet purus accumsan, nec posuere magna bibendum. Sed aliquam felis quis turpis ullamcorper, non dignissim urna tempus. Curabitur eleifend, sapien eu vehicula semper, turpis risus malesuada libero, a posuere purus leo nec mauris. Phasellus non est quis orci aliquam volutpat. Proin venenatis ante vel lacus posuere, nec fringilla velit varius. Nullam id leo auctor, mollis ex at, bibendum eros. Sed sagittis dui ut lectus malesuada, et lacinia eros congue.');