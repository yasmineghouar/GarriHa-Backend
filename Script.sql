-- Script BDD TDM Project : 

CREATE TABLE IF NOT EXISTS `parkings` (
  `parkingId` INT AUTO_INCREMENT PRIMARY KEY,
  `parkingName` VARCHAR(255) NOT NULL,
  `CommuneParking` VARCHAR(255),
  `WilayaParking` VARCHAR(255),
  `AdresseParking` VARCHAR(255),
  `photoParking` VARCHAR(255) NOT NULL,
  `nombreDePlaces` INT,
  `PrixParHeure` INT,
  `DescriptionParking` TEXT,
  `SurfaceParking` VARCHAR(255),
  `Latitude` DECIMAL(10,8) NOT NULL,
  `Longitude` DECIMAL(11,8) NOT NULL
);


CREATE TABLE IF NOT EXISTS `users` (
    `userId` INT AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `NUmeroTel` INT NOT NULL,
    `motDePasse` VARCHAR(255) NOT NULL,
    -- `PhotoUser` VARCHAR(255) 
    `PhotoUser` VARCHAR(255)  
);


CREATE TABLE IF NOT EXISTS `reservations` (
  `reservationId` INT AUTO_INCREMENT PRIMARY KEY,
  `numero` INT,
  `QRCode` TEXT NOT NULL UNIQUE,
  `DateReservation` DATE NOT NULL,
  `HeureDebut` TIME NOT NULL, 
  `HeureFin` TIME NOT NULL, 
  `iduser` INT,
  `idparking` INT,
  FOREIGN KEY (`idparking`) REFERENCES `parkings` (`parkingId`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`iduser`) REFERENCES `users` (`userId`) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO `parkings` (`parkingName`, `CommuneParking`, `WilayaParking`, `AdresseParking`, `photoParking`, `nombreDePlaces`, `PrixParHeure`, `DescriptionParking`, `SurfaceParking`, `Latitude`, `Longitude`) VALUES
('Parking Tipaza', 'Tipaza', 'Tipaza', 'Adresse de Tipaza', 'photo_tipaza.jpg', 100, 200, 'Parking spacieux situé près de la plage de Tipaza, avec une capacité de 100 véhicules.', '500m²', 36.58975, 2.44744),
('Parking Alger', 'Alger', 'Alger', 'Adresse de Oued Semar', 'photo_alger.jpg', 150, 300, 'Parking sécurisé au centre d Alger, près de la place du 1er Mai.', '600m²', 36.73225, 3.08746),
('Parking Tizi', 'Tizi Ouzou', 'Tizi Ouzou', 'Adresse de Tedmait', 'photo_tizi.jpg', 200, 250, 'Parking moderne dans la zone industrielle de Tedmait, équipé de caméras de surveillance.', '700m²', 36.71182, 4.04591),
('Parking Bejaia', 'Bejaia', 'Bejaia', 'Adresse de Akfadou', 'photo_bejaia.jpg', 120, 150, 'Parking bien entretenu à Bejaia, à proximité des zones commerciales et résidentielles.', '450m²', 36.7525, 5.0567),
('Parking Ain Taya', 'Ain Taya', 'Alger', 'Adresse de Ain Taya', 'photo_ain_taya.jpg', 80, 100, 'Parking familial à Ain Taya, idéal pour les sorties en famille ou entre amis.', '300m²', 36.7931, 3.2867),
('Parking Reghaia', 'Reghaia', 'Alger', 'Adresse de Reghaia', 'photo_reghaia.jpg', 90, 120, 'Parking couvert situé dans le centre de Reghaia, offrant une protection contre les intempéries.', '350m²', 36.7351, 3.3402),
('Parking Blida', 'Blida', 'Blida', 'Adresse de Blida', 'photo_blida.jpg', 180, 220, 'Grand parking à Blida, avec un accès facile depuis l autoroute.', '650m²', 36.4701, 2.8289),
('Parking Oran', 'Oran', 'Oran', 'Adresse de Oran', 'photo_oran.jpg', 250, 300, 'Parking central à Oran, à quelques pas des principaux sites touristiques.', '900m²', 35.6971, -0.6308),
('Parking Constantine', 'Constantine', 'Constantine', 'Adresse de Constantine', 'photo_constantine.jpg', 130, 170, 'Parking sécurisé près du centre-ville de Constantine, avec des tarifs abordables.', '500m²', 36.365, 6.6147),
('Parking Tlemcen', 'Tlemcen', 'Tlemcen', 'Adresse de Tlemcen', 'photo_tlemcen.jpg', 110, 140, 'Parking bien éclairé à Tlemcen, ouvert 24h/24 pour répondre à vos besoins de stationnement.', '400m²', 34.8783, -1.3180);
