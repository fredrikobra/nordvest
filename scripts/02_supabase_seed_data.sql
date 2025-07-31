-- Insert sample projects
INSERT INTO projects (id, name, description, status, user_email, user_name, company_name, phone, project_data, estimated_cost, sustainability_score, location, project_type, square_meters, target_completion_date, budget_range, special_requirements) VALUES
(
    uuid_generate_v4(),
    'Moderne Kjøkkenrenovering',
    'Komplett renovering av kjøkken med fokus på bærekraftige materialer og energieffektive løsninger.',
    'active',
    'lars.hansen@email.com',
    'Lars Hansen',
    'Hansen Bygg AS',
    '+47 123 45 678',
    '{"style": "moderne", "materials": ["bambus", "resirkulert_tre"], "appliances": ["energiklasse_A"]}',
    450000.00,
    85,
    'Oslo',
    'kjøkken',
    25.5,
    '2024-06-15',
    '400000-500000',
    ARRAY['miljøvennlige materialer', 'energieffektive apparater']
),
(
    uuid_generate_v4(),
    'Baderom Oppgradering',
    'Oppgradering av hovedbaderom med vannbesparende armaturer og naturlige materialer.',
    'draft',
    'maria.olsen@email.com',
    'Maria Olsen',
    NULL,
    '+47 987 65 432',
    '{"style": "skandinavisk", "features": ["gulvvarme", "vannbesparende"], "materials": ["naturstein", "tre"]}',
    280000.00,
    78,
    'Bergen',
    'baderom',
    12.0,
    '2024-08-01',
    '250000-300000',
    ARRAY['vannbesparende løsninger', 'naturlige materialer']
),
(
    uuid_generate_v4(),
    'Stue og Spisestue Renovering',
    'Åpen løsning mellom stue og spisestue med bærekraftige gulvløsninger.',
    'completed',
    'erik.berg@email.com',
    'Erik Berg',
    'Berg Interiør',
    '+47 456 78 901',
    '{"style": "industriell", "features": ["åpen_løsning", "store_vinduer"], "materials": ["resirkulert_metall", "bambusgulv"]}',
    650000.00,
    92,
    'Trondheim',
    'stue',
    45.0,
    '2024-03-30',
    '600000-700000',
    ARRAY['åpen løsning', 'maksimal naturlig lys']
);

-- Insert sample conversations
INSERT INTO conversations (id, project_id, title, conversation_type) VALUES
(
    uuid_generate_v4(),
    (SELECT id FROM projects WHERE name = 'Moderne Kjøkkenrenovering' LIMIT 1),
    'Planlegging av kjøkkenrenovering',
    'planning'
),
(
    uuid_generate_v4(),
    (SELECT id FROM projects WHERE name = 'Baderom Oppgradering' LIMIT 1),
    'Bærekraftige løsninger for baderom',
    'sustainability'
),
(
    uuid_generate_v4(),
    (SELECT id FROM projects WHERE name = 'Stue og Spisestue Renovering' LIMIT 1),
    'Finansieringsmuligheter',
    'financing'
);

-- Insert sample messages
INSERT INTO messages (conversation_id, role, content, metadata) VALUES
(
    (SELECT id FROM conversations WHERE title = 'Planlegging av kjøkkenrenovering' LIMIT 1),
    'user',
    'Hei! Jeg planlegger å renovere kjøkkenet mitt og ønsker å fokusere på bærekraftige materialer. Kan du hjelpe meg med å planlegge prosjektet?',
    '{"timestamp": "2024-01-15T10:00:00Z"}'
),
(
    (SELECT id FROM conversations WHERE title = 'Planlegging av kjøkkenrenovering' LIMIT 1),
    'assistant',
    'Hei! Jeg hjelper gjerne med å planlegge din kjøkkenrenovering med fokus på bærekraft. Basert på prosjektinformasjonen din ser jeg at du allerede har tenkt på bambus og resirkulert tre som materialer, noe som er utmerkede valg. La oss starte med å kartlegge dine behov og ønsker mer detaljert.',
    '{"model": "grok-3", "tokens": 156}'
);

-- Insert sample sustainability recommendations
INSERT INTO sustainability_recommendations (project_id, category, title, description, impact_score, cost_estimate, savings_estimate, implementation_time, priority, environmental_impact, roi_months, certification_eligible) VALUES
(
    (SELECT id FROM projects WHERE name = 'Moderne Kjøkkenrenovering' LIMIT 1),
    'Materialer',
    'Bambusgulv i stedet for laminat',
    'Bambus er en raskt fornybar ressurs som gir samme estetikk som tradisjonelt tre, men med betydelig lavere miljøpåvirkning.',
    9,
    35000.00,
    5000.00,
    '2-3 uker',
    1,
    'Reduserer CO2-utslipp med 60% sammenlignet med laminat',
    24,
    true
),
(
    (SELECT id FROM projects WHERE name = 'Baderom Oppgradering' LIMIT 1),
    'Vannbesparelse',
    'Installasjon av vannbesparende armaturer',
    'Moderne vannbesparende kraner og dusjhoder kan redusere vannforbruket med opptil 40% uten å påvirke komforten.',
    8,
    15000.00,
    8000.00,
    '1 uke',
    1,
    'Sparer 15000 liter vann årlig',
    18,
    true
);

-- Insert sample financing options
INSERT INTO financing_options (project_id, type, title, description, amount, interest_rate, term_months, requirements, benefits, provider, eligibility_score, processing_time_days, contact_info) VALUES
(
    (SELECT id FROM projects WHERE name = 'Moderne Kjøkkenrenovering' LIMIT 1),
    'green_loan',
    'Grønt Byggelån - Sparebank 1',
    'Spesiallån for miljøvennlige byggeprosjekter med redusert rente for sertifiserte bærekraftige materialer.',
    400000.00,
    3.2,
    120,
    ARRAY['minimum 70% bærekraftige materialer', 'energieffektivitetsklasse B eller bedre'],
    ARRAY['0.5% lavere rente enn standard byggelån', 'ingen etableringsgebyr'],
    'Sparebank 1',
    85,
    14,
    '{"phone": "+47 915 02000", "email": "kundeservice@sparebank1.no", "website": "https://www.sparebank1.no/gronn-finansiering"}'
),
(
    (SELECT id FROM projects WHERE name = 'Baderom Oppgradering' LIMIT 1),
    'energy_efficiency',
    'Energieffektiviseringslån - Husbanken',
    'Statlig støttet lån for energieffektivisering av boliger med gunstige betingelser.',
    200000.00,
    2.8,
    180,
    ARRAY['dokumentert energiforbedring', 'bolig eldre enn 10 år'],
    ARRAY['lav rente', 'lang nedbetalingstid', 'mulighet for avdragsfrihet'],
    'Husbanken',
    92,
    21,
    '{"phone": "+47 22 24 24 00", "email": "post@husbanken.no", "website": "https://www.husbanken.no/lan/energieffektivisering/"}'
);

-- Insert sample analytics events
INSERT INTO project_analytics (project_id, event_type, event_data, user_session) VALUES
(
    (SELECT id FROM projects WHERE name = 'Moderne Kjøkkenrenovering' LIMIT 1),
    'project_created',
    '{"source": "web", "referrer": "google", "device": "desktop"}',
    'session_123456'
),
(
    (SELECT id FROM projects WHERE name = 'Baderom Oppgradering' LIMIT 1),
    'sustainability_analysis_requested',
    '{"analysis_type": "full", "user_preferences": ["eco_friendly", "cost_effective"]}',
    'session_789012'
),
(
    (SELECT id FROM projects WHERE name = 'Stue og Spisestue Renovering' LIMIT 1),
    'financing_options_viewed',
    '{"options_count": 3, "user_budget": "600000-700000"}',
    'session_345678'
);
