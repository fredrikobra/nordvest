-- Database Seeding for Nordvest Bygginnredning AI Assistant
-- Step 2: Insert all sample data into the created tables.

-- ==============================================================================
-- SAMPLE DATA INSERTION
-- ==============================================================================

-- Insert sample financing options
INSERT INTO financing_options (provider, product_name, product_type, max_amount, interest_rate_from, interest_rate_to, certification_requirements, energy_class_requirement, breeam_requirement, description) VALUES
('DNB', 'Grønne lån næringseiendom', 'green_loan', 50000000.00, 2.50, 4.50, 'BREEAM NOR Excellent for new buildings after 2022', 'B', 'excellent', 'Grønne lån for næringseiendom med redusert rente for bærekraftige prosjekter'),
('KBN', 'Grønne lån kommunal sektor', 'green_loan', 100000000.00, 2.00, 3.50, 'Minimum 30% energiforbedring eller miljøsertifisering', 'B', 'very_good', 'Grønne lån til kommunale byggeprosjekter'),
('SpareBank 1', 'Miljølån private', 'miljolaan', 300000.00, 0.00, 5.29, 'Enova-godkjente tiltak', NULL, NULL, 'Miljølån til private med gunstige betingelser');

-- Insert sample building materials
INSERT INTO building_materials (name, category, c2c_certification, embodied_carbon_kg_co2_m2, recyclability_percentage, origin_country, supplier, tek17_approved) VALUES
('Systemvegg Type A', 'walls', 'silver', 12.5, 95.0, 'Norge', 'Skandinavisk Byggsystem AS', TRUE),
('Glassvegger Premium', 'walls', 'gold', 8.3, 85.0, 'Danmark', 'Dansk Glass Solutions', TRUE),
('Systemhimling Akustisk', 'ceiling', 'bronze', 6.7, 90.0, 'Sverige', 'Nordic Ceiling Systems', TRUE);

-- Insert sample knowledge base articles
INSERT INTO knowledge_base (category, title, content, keywords) VALUES
('tek17', 'TEK17 Energikrav for Kontorbygg', 'Kontorbygg må oppfylle energibehov på maksimalt 115 kWh/m² per år...', 'TEK17, energikrav, kontorbygg, kWh'),
('financing', 'DNB Grønne Lån Kriterier', 'For å kvalifisere til DNB grønne lån må bygget oppnå BREEAM NOR Excellent...', 'DNB, grønne lån, BREEAM, finansiering'),
('space_planning', 'Prinsipper for Romplanlegging', 'Effektiv romplanlegging starter med analyse av rommets funksjon...', 'romplanlegging, space planning, design, funksjon');

-- Insert sample training intents
INSERT INTO training_intents (intent_name, description, example_phrases, required_entities, response_templates) VALUES
('get_financing_options', 'User wants to know about green financing options', '["Hvilke finansieringsmuligheter finnes?", "Kan jeg få grønt lån?", "Hva koster det å finansiere prosjektet?"]', '["project_type", "budget"]', '["Based on your project type and budget, here are the financing options available..."]'),
('check_tek17_compliance', 'User wants to check TEK17 compliance requirements', '["Hva krever TEK17?", "Er bygget TEK17-godkjent?", "Energikrav kontorbygg"]', '["building_type", "area"]', '["For your building type, TEK17 requires the following standards..."]'),
('space_planning_advice', 'User needs help with space planning', '["Hvordan planlegge rom?", "Romløsninger kontor", "Akustikk møterom"]', '["room_type", "area", "function"]', '["For optimal space planning of your room, consider these principles..."]');
