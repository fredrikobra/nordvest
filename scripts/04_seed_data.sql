-- Insert sample projects
INSERT INTO projects (name, description, user_email, user_name, company_name, phone, estimated_cost, project_data, sustainability_score) VALUES
(
    'Moderne Kontorløsning - Oslo Sentrum',
    'Komplett renovering av kontorlandskap med fokus på bærekraft og moderne design',
    'lars.hansen@example.com',
    'Lars Hansen',
    'Hansen Consulting AS',
    '+47 123 45 678',
    850000.00,
    '{"area_sqm": 250, "rooms": 8, "employees": 25, "sustainability_focus": true, "materials": ["glass_walls", "acoustic_panels", "recycled_furniture"], "timeline": "3_months"}',
    78
),
(
    'Bærekraftig Showroom - Bergen',
    'Utvikling av miljøvennlig showroom med gjenbruksmaterialer',
    'maria.olsen@example.com',
    'Maria Olsen',
    'Green Design AS',
    '+47 987 65 432',
    450000.00,
    '{"area_sqm": 150, "rooms": 4, "sustainability_focus": true, "materials": ["reclaimed_wood", "eco_paint", "energy_efficient_lighting"], "timeline": "2_months"}',
    92
),
(
    'Kontoroppgradering - Trondheim',
    'Modernisering av eksisterende kontorlokaler',
    'erik.nordahl@example.com',
    'Erik Nordahl',
    'Nordahl Eiendom',
    '+47 456 78 901',
    320000.00,
    '{"area_sqm": 180, "rooms": 6, "employees": 15, "materials": ["system_walls", "carpet_tiles"], "timeline": "6_weeks"}',
    65
);

-- Insert sample conversations
INSERT INTO conversations (project_id, title) 
SELECT id, 'Prosjektplanlegging og bærekraftsråd' 
FROM projects 
WHERE name = 'Moderne Kontorløsning - Oslo Sentrum';

INSERT INTO conversations (project_id, title) 
SELECT id, 'Materialvalg og finansiering' 
FROM projects 
WHERE name = 'Bærekraftig Showroom - Bergen';

-- Insert sample messages
INSERT INTO messages (conversation_id, role, content) 
SELECT c.id, 'user', 'Hei! Jeg trenger hjelp med å planlegge vårt nye kontorprosjekt. Vi ønsker å fokusere på bærekraftige løsninger.'
FROM conversations c
JOIN projects p ON c.project_id = p.id
WHERE p.name = 'Moderne Kontorløsning - Oslo Sentrum';

INSERT INTO messages (conversation_id, role, content) 
SELECT c.id, 'assistant', 'Hei! Det høres ut som et spennende prosjekt. Basert på prosjektdataene dine ser jeg at dere planlegger 250 kvm for 25 ansatte. For bærekraftige løsninger anbefaler jeg å se på gjenbruksmaterialer, energieffektiv belysning og sertifiserte miljøvennlige produkter. Skal vi starte med å se på materialvalg?'
FROM conversations c
JOIN projects p ON c.project_id = p.id
WHERE p.name = 'Moderne Kontorløsning - Oslo Sentrum';

-- Insert sample financing options
INSERT INTO financing_options (project_id, type, title, description, amount, interest_rate, term_months, requirements, benefits, provider, application_url)
SELECT 
    id,
    'green_loan',
    'Grønt Byggelån - Sparebank 1',
    'Spesiallån for miljøvennlige byggeprosjekter med redusert rente',
    850000.00,
    3.2,
    60,
    '["Miljøsertifiserte materialer", "Energieffektive løsninger", "Dokumentert bærekraftsfokus"]',
    '["Redusert rente", "Fleksible nedbetalingsvilkår", "Gratis bærekraftsrådgivning"]',
    'Sparebank 1',
    'https://www.sparebank1.no/gronn-finansiering'
FROM projects 
WHERE name = 'Moderne Kontorløsning - Oslo Sentrum';

INSERT INTO financing_options (project_id, type, title, description, amount, interest_rate, term_months, requirements, benefits, provider, application_url)
SELECT 
    id,
    'sustainability_grant',
    'Enova Støtte - Energieffektivisering',
    'Tilskudd til energieffektive tiltak i næringsbygg',
    150000.00,
    0.0,
    0,
    '["Dokumentert energisparing", "Profesjonell energianalyse", "Godkjente leverandører"]',
    '["Inntil 30% av investeringskostnad", "Ingen renter", "Ingen tilbakebetaling"]',
    'Enova',
    'https://www.enova.no/bedrift/'
FROM projects 
WHERE name = 'Bærekraftig Showroom - Bergen';

-- Insert sample sustainability recommendations
INSERT INTO sustainability_recommendations (project_id, category, title, description, impact_score, cost_estimate, savings_estimate, implementation_time, priority)
SELECT 
    id,
    'Materialer',
    'Bruk av gjenbruksmaterialer',
    'Erstatt 40% av nye materialer med kvalitetssikrede gjenbruksmaterialer',
    85,
    -120000.00,
    180000.00,
    '2-3 uker',
    1
FROM projects 
WHERE name = 'Moderne Kontorløsning - Oslo Sentrum';

INSERT INTO sustainability_recommendations (project_id, category, title, description, impact_score, cost_estimate, savings_estimate, implementation_time, priority)
SELECT 
    id,
    'Energi',
    'LED-belysning med bevegelsessensorer',
    'Installer energieffektiv LED-belysning med automatisk styring',
    70,
    45000.00,
    25000.00,
    '1 uke',
    2
FROM projects 
WHERE name = 'Moderne Kontorløsning - Oslo Sentrum';

INSERT INTO sustainability_recommendations (project_id, category, title, description, impact_score, cost_estimate, savings_estimate, implementation_time, priority)
SELECT 
    id,
    'Inneklima',
    'Naturlige og miljøvennlige malinger',
    'Bruk VOC-fri malinger og naturlige overflatebehandlinger',
    60,
    15000.00,
    5000.00,
    '3-4 dager',
    3
FROM projects 
WHERE name = 'Bærekraftig Showroom - Bergen';
