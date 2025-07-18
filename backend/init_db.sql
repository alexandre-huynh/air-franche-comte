-- Create the database and use it
CREATE DATABASE IF NOT EXISTS air_franche_comte;
USE air_franche_comte;

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS aircraft;
DROP TABLE IF EXISTS airfields;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS users;

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

-- Table: airfields
CREATE TABLE IF NOT EXISTS airfields (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

-- Table: aircraft
CREATE TABLE IF NOT EXISTS aircraft (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    registration_number VARCHAR(50) UNIQUE,
    year INT,
    price DECIMAL(10,2),
    price_with_tax DECIMAL(10,2),
    tips_price DECIMAL(10,2),
    capacity INT,
    range_km INT,
    max_speed_kmh INT,
    has_wifi BOOLEAN DEFAULT 0,
    luggage_capacity_kg INT,
    image_id INT,
    airfield_id INT,
    description TEXT,
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE SET NULL,
    FOREIGN KEY (airfield_id) REFERENCES airfields(id) ON DELETE SET NULL
);

-- Table: reservations
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    aircraft_id INT NOT NULL,
    airfield_id INT,
    reservation_date DATE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (aircraft_id) REFERENCES aircraft(id) ON DELETE CASCADE,
    FOREIGN KEY (airfield_id) REFERENCES airfields(id) ON DELETE SET NULL
);

-- Insert example airfields
INSERT INTO airfields (name) VALUES
('Greenfield Airfield'),
('Riverside Airfield'),
('Silverstone Airfield'),
('Maplewood Airfield'),
('Eastgate Airfield'),
('Adrien and Amadou"s room');

-- Insert example images
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
('XWING FIGHTER', 'src/assets/img/XWING_FIGHTER.png'),
('BISSAP Aircraft', 'src/assets/img/bissap.jpg');

-- Insert example aircraft (linked to images and airfields)
INSERT INTO aircraft 
(name, manufacturer, model, registration_number, year, price, price_with_tax, tips_price, capacity, range_km, max_speed_kmh, has_wifi, luggage_capacity_kg, image_id, airfield_id, description) VALUES
('ALTO NG', 'Direct Fly', 'ALTO NG', 'F-ALNG', 2021, 300.00, 350.00, 600.00, 2, 800, 200, 0, 20, 1, 1, 'Light Czech aircraft, ideal for training and leisure.'),
('Archer DLX', 'Piper Aircraft', 'Archer DLX', 'F-ADLX', 2019, 350.00, 400.00, 650.00, 4, 900, 220, 1, 50, 2, 2, 'American single-engine, very popular for training and private flights.'),
('Avengers', 'Stark Industries', 'Avenger', 'F-AVG5', 2023, 500.00, 550.00, 800.00, 6, 1500, 300, 1, 150, 3, 3, 'Braquage ou village ?'),
('CONDOG 42', 'Condog Aviation', 'Model 42', 'F-CD42', 2018, 400.00, 450.00, 700.00, 4, 1000, 250, 0, 80, 4, 4, 'LET ME DO IT FOR YOUUUUU'),
('Elite Progressive-AeroDyne', 'Progressive Aerodyne', 'Elite', 'F-ELPD', 2020, 380.00, 430.00, 680.00, 3, 750, 210, 1, 30, 5, 5, 'American seaplane for leisure and exploration.'),
('JETZERO', 'JetZero', 'Blended Wing', 'F-JZRO', 2025, 600.00, 650.00, 900.00, 8, 2000, 350, 1, 200, 6, 1, 'Blended wing prototype for green aviation.'),
('Jabiru J430', 'Jabiru Aircraft', 'J430', 'F-J430', 2017, 300.00, 350.00, 600.00, 4, 800, 180, 0, 40, 7, 2, 'Australian single-engine, economical and efficient.'),
('LEONARDO M345', 'Leonardo', 'M345', 'F-LM345', 2021, 700.00, 750.00, 1000.00, 2, 1800, 450, 0, 20, 8, 3, 'Modern Italian military trainer jet.'),
('Le Panther', 'Sport Performance Aviation', 'Panther', 'F-LPNR', 2016, 450.00, 500.00, 750.00, 1, 1200, 400, 0, 10, 9, 4, 'A single-seat, all-metal kit and LSA aircraft with folding wings and aerobatic performance.'),
('Murphy Radical', 'Murphy Aircraft', 'Radical', 'F-MRAD', 2019, 350.00, 400.00, 650.00, 2, 900, 190, 0, 30, 10, 5, 'Canadian two-seater, sturdy for rough fields.'),
('P-750 XSTOL', 'Pacific Aerospace', 'P-750 XSTOL', 'F-P750', 2018, 500.00, 550.00, 800.00, 9, 1400, 280, 1, 300, 11, 1, 'New Zealand utility aircraft with short takeoff.'),
('Pioneer 400', 'Alpi Aviation', 'Pioneer 400', 'F-P400', 2015, 300.00, 350.00, 600.00, 4, 700, 170, 0, 50, 12, 2, 'Italian ULM, efficient and elegant.'),
('Pitts Model 12', 'Aviat Aircraft', 'Pitts Model 12', 'F-PM12', 2014, 320.00, 370.00, 620.00, 2, 600, 350, 0, 15, 13, 3, 'Iconic American biplane for aerobatics.'),
('QUA CK12', 'Quick Aviation', 'CK12', 'F-QCK12', 2017, 280.00, 330.00, 580.00, 100, 700, 190, 0, 25, 14, 4, 'KROISSANT'),
('Scylax GmbH', 'Scylax', 'E10', 'F-SCYX', 2023, 400.00, 450.00, 700.00, 6, 1000, 240, 1, 100, 15, 5, 'German electric aircraft for regional flights.'),
('Super Decathlon', 'American Champion', 'Super Decathlon', 'F-SDEC', 2015, 300.00, 350.00, 600.00, 2, 500, 200, 0, 20, 16, 1, 'American single-engine for aerobatics and training.'),
('Turbo Stationair', 'Cessna', '206H Stationair', 'F-TSTN', 2020, 420.00, 470.00, 720.00, 6, 1200, 230, 1, 180, 17, 2, 'Versatile single-engine with high capacity.'),
('WAIEX-B Sonex', 'Sonex Aircraft', 'WAIEX-B', 'F-WXBS', 2019, 350.00, 400.00, 650.00, 2, 800, 180, 0, 30, 18, 3, 'American kitplane for homebuilders.'),
('X-Air LS', 'Rand Kar', 'X-Air LS', 'F-XALS', 2016, 280.00, 330.00, 580.00, 2, 600, 160, 0, 25, 19, 4, 'French ULM, simple and economical.'),
('XWING FIGHTER', 'Incom Corporation', 'T-65 X-Wing', 'F-XWNG', 4561, 1000.00, 1050.00, 1300.00, 4, 5000, 3000, 1, 0, 20, 5, 'I am your father... Luke'),
('BISSAP Aircraft', 'Bissap Industries', 'Fairy', 'F-BSSP', 2025, 800.00, 850.00, 1000.00, 2, 4000, 2500, 1, 0, 21, 6, 'Buy one, get one for free!');

