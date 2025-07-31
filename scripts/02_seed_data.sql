-- Insert sample projects
INSERT INTO projects (name, description, status, user_email, user_name, company_name, phone, project_data, estimated_cost, sustainability_score) VALUES
('Moderne Kontorlandskap', 'Åpent kontorlandskap med glassvegger og akustikkløsninger', 'active', 'john@example.com', 'John Doe', 'Tech Solutions AS', '+47 123 45 678', '{"components": ["glass-walls", "acoustic-solutions"], "area": 150}', 450000.00, 85),
('Møteromskompleks', 'Fleksible møterom med systemvegger', 'draft', 'jane@company.no', 'Jane Smith', 'Innovation Hub', '+47 987 65 432', '{"components": ["system-walls", "glass-walls"], "area": 80}', 280000.00, 75),
('Bærekraftig Renovering', 'Ombygging med fokus på gjenbruk og miljøvennlige materialer', 'completed', 'erik@green.no', 'Erik Hansen', 'Green Building AS', '+47 555 12 345', '{"components": ["reuse-solutions", "acoustic-solutions"], "area": 200}', 380000.00, 95);

-- Insert sample conversations
INSERT INTO conversations (project_id, title) VALUES
((SELECT id FROM projects WHERE name = 'Moderne Kontorlandskap'), 'Planlegging av kontorlandskap'),
((SELECT id FROM projects WHERE name = 'Møteromskompleks'), 'Møterom design diskusjon'),
((SELECT id FROM projects WHERE name = 'Bærekraftig Renovering'), 'Bærekraft og gjenbruk');

-- Insert sample messages
INSERT INTO messages (conversation_id, role, content, metadata) VALUES
((SELECT id FROM conversations WHERE title = 'Planlegging av kontorlandskap'), 'user', 'Hei! Jeg trenger hjelp med å planlegge et nytt kontorlandskap på 150 kvm.', '{}'),
((SELECT id FROM conversations WHERE title = 'Planlegging av kontorlandskap'), 'assistant', 'Hei! Jeg kan hjelpe deg med å planlegge kontorlandskapet. Basert på 150 kvm anbefaler jeg en kombinasjon av glassvegger og akustikkløsninger for optimal funksjonalitet.', '{"suggestions": ["glass-walls", "acoustic-solutions"]}'),
((SELECT id FROM conversations WHERE title = 'Møterom design diskusjon'), 'user', 'Hvilke løsninger anbefaler dere for fleksible møterom?', '{}'),
((SELECT id FROM conversations WHERE title = 'Møterom design diskusjon'), 'assistant', 'For fleksible møterom anbefaler jeg systemvegger som kan flyttes etter behov, kombinert med glassvegger for åpenhet og lys.', '{"recommendations": ["flexibility", "natural_light"]}');

-- Insert sample financing options
INSERT INTO financing_options (project_id, type, title, description, amount, interest_rate, term_months, requirements, benefits, provider, application_url) VALUES
((SELECT id FROM projects WHERE name = 'Moderne Kontorlandskap'), 'green_loan', 'Grønt Bedriftslån', 'Spesiallån for miljøvennlige kontorløsninger', 450000.00, 2.5, 60, ARRAY['Miljøsertifiserte materialer', 'Energieffektive løsninger'], ARRAY['Lav rente', 'Fleksible nedbetalingsvilkår'], 'Grønn Bank AS', 'https://gronnbank.no/bedriftslaan'),
((SELECT id FROM projects WHERE name = 'Bærekraftig Renovering'), 'sustainability_grant', 'Innovasjon Norge Miljøstøtte', 'Tilskudd for bærekraftige byggeprosjekter', 100000.00, 0.0, 0, ARRAY['Dokumentert miljøgevinst', 'Norsk bedrift'], ARRAY['Ikke tilbakebetaling', 'Støtte til innovasjon'], 'Innovasjon Norge', 'https://innovasjonnorge.no/miljo');

-- Insert sample sustainability recommendations
INSERT INTO sustainability_recommendations (project_id, category, title, description, impact_score, cost_estimate, savings_estimate, implementation_time, priority) VALUES
((SELECT id FROM projects WHERE name = 'Moderne Kontorlandskap'), 'Energi', 'LED-belysning med sensorer', 'Installasjon av energieffektiv LED-belysning med bevegelsessensorer', 8, 45000.00, 15000.00, '2-3 uker', 1),
((SELECT id FROM projects WHERE name = 'Moderne Kontorlandskap'), 'Materialer', 'Resirkulerte materialer', 'Bruk av resirkulerte materialer i innredningen', 7, 25000.00, 8000.00, '1-2 uker', 2),
((SELECT id FROM projects WHERE name = 'Bærekraftig Renovering'), 'Gjenbruk', 'Gjenbruk av eksisterende strukturer', 'Maksimal gjenbruk av eksisterende bygningselementer', 9, 0.00, 120000.00, '3-4 uker', 1),
((SELECT id FROM projects WHERE name = 'Bærekraftig Renovering'), 'Isolasjon', 'Forbedret isolasjon', 'Oppgradering av isolasjon for bedre energieffektivitet', 8, 80000.00, 25000.00, '2-3 uker', 2);
