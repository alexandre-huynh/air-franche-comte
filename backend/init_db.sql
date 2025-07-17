-- Create the database and use it
CREATE DATABASE IF NOT EXISTS air_franche_comte;
USE air_franche_comte;

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: images
CREATE TABLE IF NOT EXISTS images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    image_url VARCHAR(255) NOT NULL,
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Table: aircraft
CREATE TABLE IF NOT EXISTS aircraft (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    registration_number VARCHAR(50) UNIQUE,
    year INT,
    image_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE SET NULL
);

-- Table: aerodromes
CREATE TABLE IF NOT EXISTS aerodromes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    code_icao VARCHAR(10),
    description TEXT
);

-- Table: reservations
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    aircraft_id INT NOT NULL,
    aerodrome_id INT,
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (aircraft_id) REFERENCES aircraft(id) ON DELETE CASCADE,
    FOREIGN KEY (aerodrome_id) REFERENCES aerodromes(id) ON DELETE SET NULL
);

-- Insert images
INSERT INTO images (title, image_url) VALUES
('ALTO NG', 'src/assets/img/ALTO_NG.jpg'),
('Archer DLX', 'src/assets/img/Archer_DLX.jpg'),
('Avengers GTA5', 'src/assets/img/Avengers_GTA5.jpg'),
('CONDOG 42', 'src/assets/img/CONDOG_42.jpg'),
('Elite Progressive-AeroDyne', 'src/assets/img/Elite_Progressive-AeroDyne.jpg'),
('JETZERO', 'src/assets/img/JETZERO.jpg'),
('Jabiru J430', 'src/assets/img/Jabiru_J430.jpg'),
('LEONARDO M345', 'src/assets/img/LEONARDO_M345.jpg'),
('Le Panther', 'src/assets/img/Le_Panther.jpg'),
('Murphy Radical', 'src/assets/img/Murphy_Radical.jpg'),
('P-750 XSTOL', 'src/assets/img/P-750_XSTOL.jpg'),
('Pioneer 400', 'src/assets/img/Pioneer_400.jpg'),
('Pitts Model 12', 'src/assets/img/Pitts_Model_12.jpg'),
('QUA CK12', 'src/assets/img/QUA_CK12.jpeg'),
('Scylax GmbH', 'src/assets/img/Scylax_GmbH.jpg'),
('Super Decathlon', 'src/assets/img/Super_Decathlon.jpg'),
('Turbo Stationair', 'src/assets/img/Turbo_Stationair.jpg'),
('WAIEX-B Sonex', 'src/assets/img/WAIEX-B_Sonex.jpg'),
('X-Air LS', 'src/assets/img/X-Air_LS.jpg'),
('XWING FIGHTER', 'src/assets/img/XWING_FIGHTER.png');

-- Insert aircraft linked to images
INSERT INTO aircraft (name, manufacturer, model, registration_number, year, image_id, description) VALUES
('ALTO NG', 'Direct Fly', 'ALTO NG', 'F-ALNG', 2021, 1, 'Light Czech aircraft, ideal for training and leisure.'),
('Archer DLX', 'Piper Aircraft', 'Archer DLX', 'F-ADLX', 2019, 2, 'American single-engine, very popular for training and private flights.'),
('Avengers', 'Stark Industries', 'Avenger', 'F-AVG5', 2023, 3, 'Fictional aircraft inspired by the Marvel universe and GTA 5 game.'),
('CONDOG 42', 'Condog Aviation', 'Model 42', 'F-CD42', 2018, 4, 'Rugged utility aircraft for rough terrains.'),
('Elite Progressive-AeroDyne', 'Progressive Aerodyne', 'Elite', 'F-ELPD', 2020, 5, 'American seaplane for leisure and exploration.'),
('JETZERO', 'JetZero', 'Blended Wing', 'F-JZRO', 2025, 6, 'Blended wing prototype for green aviation.'),
('Jabiru J430', 'Jabiru Aircraft', 'J430', 'F-J430', 2017, 7, 'Australian single-engine, economical and efficient.'),
('LEONARDO M345', 'Leonardo', 'M345', 'F-LM345', 2021, 8, 'Modern Italian military trainer jet.'),
('Le Panther', 'Fictional Aero', 'Panther', 'F-LPNR', 2016, 9, 'Fictional fighter aircraft with aggressive design.'),
('Murphy Radical', 'Murphy Aircraft', 'Radical', 'F-MRAD', 2019, 10, 'Canadian two-seater, sturdy for rough fields.'),
('P-750 XSTOL', 'Pacific Aerospace', 'P-750 XSTOL', 'F-P750', 2018, 11, 'New Zealand utility aircraft with short takeoff.'),
('Pioneer 400', 'Alpi Aviation', 'Pioneer 400', 'F-P400', 2015, 12, 'Italian ULM, efficient and elegant.'),
('Pitts Model 12', 'Aviat Aircraft', 'Pitts Model 12', 'F-PM12', 2014, 13, 'Iconic American biplane for aerobatics.'),
('QUA CK12', 'Quick Aviation', 'CK12', 'F-QCK12', 2017, 14, 'Small light aircraft, fast and agile.'),
('Scylax GmbH', 'Scylax', 'E10', 'F-SCYX', 2023, 15, 'German electric aircraft for regional flights.'),
('Super Decathlon', 'American Champion', 'Super Decathlon', 'F-SDEC', 2015, 16, 'American single-engine for aerobatics and training.'),
('Turbo Stationair', 'Cessna', '206H Stationair', 'F-TSTN', 2020, 17, 'Versatile single-engine with high capacity.'),
('WAIEX-B Sonex', 'Sonex Aircraft', 'WAIEX-B', 'F-WXBS', 2019, 18, 'American kitplane for homebuilders.'),
('X-Air LS', 'Rand Kar', 'X-Air LS', 'F-XALS', 2016, 19, 'French ULM, simple and economical.'),
('XWING FIGHTER', 'Incom Corporation', 'T-65 X-Wing', 'F-XWNG', 1977, 20, 'Iconic Star Wars spaceship.');
