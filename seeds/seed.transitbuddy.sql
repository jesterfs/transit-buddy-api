INSERT INTO lines (name, color)
VALUES 
('Los Angeles B/Red Line', '#ff0000'),
('Los Angeles E/Expo Line', '#66ccff'),
('Los Angeles A/Blue Line', '#0033cc'),
('Los Angeles L/Gold Line', '#ffff00'),
('Los Angeles D/Purple Line', '#3333cc'),;

INSERT INTO members (name, email, password, line)
VALUES
('Bob', 'bob@gmail.com', 'password', 1),
('Fred', 'fred@gmail.com', 'password', 2),
('Stan', 'stan@gmail.com', 'password', 3),
('Sally', 'sally@gmail.com', 'password', 4),
('Deb', 'deb@gmail.com', 'password', 1),
('Test', 'email@gmail.com', 'password', 2);




INSERT INTO stations (name, line)
VALUES 
('North Hollywood', 1),
('Universal City/Studio City', 1),
('Hollywood/Highland', 1),
('Hollywood/Vine', 1),
('Hollywood/Western', 1),
('Vermont/Sunset', 1),
('Vermont/Santa Monica', 1),
('Vermont/Beverly', 1),
('Wilshire/Vermont', 1),
('Westlake/MacArthur Park', 1),
('7th St/Metro Center', 1),
('Pershing Square', 1),
('Civic Center/Grand Park', 1),
('Union Station', 1),

('7th St/Metro Center', 2),
('Pico', 2),
('LATTC/Ortho Institute', 2),
('Jefferson/USC', 2),
('Expo Park/USC', 2),
('Expo/Vermont', 2),
('Expo/Western', 2),
('Expo/Crenshaw', 2),
('Farmdale', 2),
('Expo/La Brea', 2),
('La Cienega/Jefferson', 2),
('Culver City', 2),
('Palms', 2),
('Westwood/Rancho', 2),
('Expo/Sepulveda', 2),
('Expo/Bundy', 2),
('26th St/Bergamot', 2),
('17th St/SMC', 2),
('Downtown Santa Monica', 2),

('7th St/Metro Center', 3),
('Pico', 3),
('Grand/LATTC', 3),
('San Pedro St', 3),
('Washington', 3),
('Vernon', 3),
('Slauson', 3),
('Florence', 3),
('Firestone', 3),
('103rd St/Watts Towers', 3),
('Willowbrook/Rosa Parks', 3),
('Compton', 3),
('Artesia', 3),
('Del Amo', 3),
('Wardlow', 3),
('Willow St', 3),
('Pacific Coast Highway', 3),
('Anaheim St', 3),
('5th Street', 3),
('1st Street', 3),
('Downtown Long Beach', 3),
('Pacific Av', 3),

('APU/Citrus', 4),
('Azusa Downtown', 4),
('Irwindale', 4),
('Duarte/City of Hope', 4),
('Monrovia', 4),
('Arcadia', 4),
('Sierra Madre Villa', 4),
('Allen', 4),
('Lake Avenue', 4),
('Memorial Park', 4),
('Del Mar', 4),
('Fillmore', 4),
('South Pasadena', 4),
('Highland Park', 4),
('Southwest Museum', 4),
('Heritage Square', 4),
('Lincoln/Cypress', 4),
('Chinatown', 4),
('Union Station', 4),
('Little Tokyo/Arts District', 4),
('Pico/Aliso', 4),
('Mariachi Plaza', 4),
('Soto', 4),
('Indiana', 4),
('Maraville', 4),
('East LA Civic Center', 4),
('Atlantic', 4),

('Wilshire/Western', 5),
('Wilshire/Normandie', 5),
('Wilshire/Vermont', 5),
('Westlake/MacArthur Park', 5),
('7th St/Metro Center', 5),
('Pershing Square', 5),
('Civic Center', 5),
('Union Station', 5)
;

INSERT INTO reports (name, date, station)
VALUES
('Construction', '2020-10-01 12:00:00', 1)
;


