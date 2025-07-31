-- Insert sample projects
INSERT INTO projects (
  id,
  name,
  description,
  status,
  user_email,
  user_name,
  company_name,
  phone,
  estimated_cost,
  location,
  project_type,
  square_meters,
  budget_range,
  special_requirements,
  sustainability_score
) VALUES 
(
  uuid_generate_v4(),
  'Moderne Kontorinnredning - Oslo Sentrum',
  'Komplett renovering av kontorlandskap med fokus på bærekraft og medarbeideropplevelse. Inkluderer nye møterom, åpent kontorlandskap og sosiale områder.',
  'active',
  'lars.hansen@example.no',
  'Lars Hansen',
  'TechNorway AS',
  '+47 123 45 678',
  2500000,
  'Oslo',
  'office_renovation',
  450,
  '2000000-3000000',
  ARRAY['Akustiske løsninger', 'Fleksible arbeidsplasser', 'Miljøsertifiserte materialer'],
  75
),
(
  uuid_generate_v4(),
  'Bærekraftig Showroom - Bergen',
  'Nytt showroom for møbelprodusent med fokus på sirkulær økonomi og miljøvennlige materialer.',
  'draft',
  'kari.olsen@example.no',
  'Kari Olsen',
  'Nordic Design AS',
  '+47 987 65 432',
  1800000,
  'Bergen',
  'showroom',
  320,
  '1500000-2000000',
  ARRAY['Naturlige materialer', 'Energieffektiv belysning', 'Gjenbruk av eksisterende elementer'],
  82
),
(
  uuid_generate_v4(),
  'Hotell Lobby Renovering - Trondheim',
  'Oppgradering av hotelllobby med moderne design og bærekraftige løsninger.',
  'completed',
  'erik.nordahl@example.no',
  'Erik Nordahl',
  'Grand Hotel Trondheim',
  '+47 555 12 345',
  3200000,
  'Trondheim',
  'hospitality',
  280,
  '3000000-4000000',
  ARRAY['Luksus finish', 'Norske materialer', 'Historisk bevaring'],
  68
);

-- Insert sample conversations
INSERT INTO conversations (id, project_id, title, conversation_type)
SELECT 
  uuid_generate_v4(),
  p.id,
  'Bærekraftsdiskusjon for ' || p.name,
  'sustainability'
FROM projects p
WHERE p.name = 'Moderne Kontorinnredning - Oslo Sentrum';

INSERT INTO conversations (id, project_id, title, conversation_type)
SELECT 
  uuid_generate_v4(),
  p.id,
  'Finansieringsmuligheter for ' || p.name,
  'financing'
FROM projects p
WHERE p.name = 'Bærekraftig Showroom - Bergen';

-- Insert sample messages
INSERT INTO messages (conversation_id, role, content, tokens_used, model_used)
SELECT 
  c.id,
  'user',
  'Hei! Jeg lurer på hvilke bærekraftige materialer som ville passe best for vårt kontorprosjekt. Vi ønsker å oppnå BREEAM-sertifisering.',
  45,
  null
FROM conversations c
WHERE c.conversation_type = 'sustainability'
LIMIT 1;

INSERT INTO messages (conversation_id, role, content, tokens_used, model_used, processing_time_ms)
SELECT 
  c.id,
  'assistant',
  'Hei! For å oppnå BREEAM-sertifisering for ditt kontorprosjekt i Oslo, anbefaler jeg følgende bærekraftige materialer:

1. **Gulv**: Linoleum fra Forbo eller kork fra Wicanders - begge har lave VOC-utslipp og er produsert bærekraftig.

2. **Vegger**: Gipsplater med høyt resirkulert innhold, malt med miljømerket maling som Jotun LADY Pure Color.

3. **Møbler**: FSC-sertifisert tre fra norske leverandører som Kinnarps eller Martela, som har sterke bærekraftsprogrammer.

4. **Belysning**: LED-løsninger fra Fagerhult eller Glamox med høy energieffektivitet og lang levetid.

5. **Tekstiler**: Cradle to Cradle-sertifiserte tepper og møbeltrekk fra Interface eller Kvadrat.

For BREEAM-poeng bør du også vurdere:
- Materialer produsert innen 500 km fra prosjektet
- Produkter med miljødeklarasjoner (EPD)
- Materialer med høyt resirkulert innhold

Ønsker du at jeg går dypere inn på noen av disse kategoriene?',
  320,
  'grok-beta',
  1250
FROM conversations c
WHERE c.conversation_type = 'sustainability'
LIMIT 1;

-- Insert sample sustainability recommendations
INSERT INTO sustainability_recommendations (
  project_id,
  category,
  title,
  description,
  impact_score,
  cost_estimate,
  savings_estimate,
  implementation_time,
  priority,
  environmental_impact,
  roi_months,
  certification_eligible
)
SELECT 
  p.id,
  'energy',
  'LED-belysning med dagslysstyring',
  'Installere energieffektive LED-armaturer med automatisk dagslysstyring og tilstedeværelsessensorer. Dette reduserer energiforbruket med 40-60% sammenlignet med tradisjonell belysning.',
  9,
  180000,
  35000,
  '2-3 uker',
  1,
  'Reduserer CO2-utslipp med 8 tonn årlig',
  62,
  true
FROM projects p
WHERE p.name = 'Moderne Kontorinnredning - Oslo Sentrum';

INSERT INTO sustainability_recommendations (
  project_id,
  category,
  title,
  description,
  impact_score,
  cost_estimate,
  savings_estimate,
  implementation_time,
  priority,
  environmental_impact,
  roi_months,
  certification_eligible
)
SELECT 
  p.id,
  'materials',
  'FSC-sertifiserte tremøbler',
  'Velge møbler produsert av FSC-sertifisert tre fra bærekraftige skoger. Dette sikrer ansvarlig skogforvaltning og reduserer miljøpåvirkningen.',
  8,
  120000,
  null,
  '4-6 uker',
  2,
  'Støtter bærekraftig skogbruk og reduserer avskogning',
  null,
  true
FROM projects p
WHERE p.name = 'Moderne Kontorinnredning - Oslo Sentrum';

-- Insert sample financing options
INSERT INTO financing_options (
  project_id,
  type,
  title,
  description,
  amount,
  interest_rate,
  term_months,
  requirements,
  benefits,
  provider,
  eligibility_score,
  processing_time_days
)
SELECT 
  p.id,
  'green_loan',
  'DNB Grønt Næringslån',
  'Spesiallån for miljøvennlige næringsprosjekter med redusert rente for prosjekter som oppfyller bærekraftskriterier.',
  2000000,
  3.2,
  120,
  ARRAY['Minimum 70% bærekraftige materialer', 'Energiklasse B eller bedre', 'Dokumentert miljøeffekt'],
  ARRAY['0.3% rentereduksjon', 'Ingen etableringsgebyr', 'Fleksible nedbetalingsvilkår'],
  'DNB Bank ASA',
  88,
  10
FROM projects p
WHERE p.name = 'Moderne Kontorinnredning - Oslo Sentrum';

INSERT INTO financing_options (
  project_id,
  type,
  title,
  description,
  amount,
  interest_rate,
  term_months,
  requirements,
  benefits,
  provider,
  eligibility_score,
  processing_time_days
)
SELECT 
  p.id,
  'sustainability_grant',
  'Enova Støtte til Energieffektivisering',
  'Tilskudd til energieffektiviseringstiltak i næringsbygg. Dekker inntil 40% av merkostnadene for energieffektive løsninger.',
  400000,
  null,
  null,
  ARRAY['Minimum 20% energireduksjon', 'Profesjonell energianalyse', 'Dokumentert energieffekt'],
  ARRAY['Inntil 40% tilskudd', 'Ingen tilbakebetaling', 'Rask saksbehandling'],
  'Enova SF',
  92,
  21
FROM projects p
WHERE p.name = 'Bærekraftig Showroom - Bergen';

-- Insert sample analytics events
INSERT INTO project_analytics (project_id, event_type, event_data)
SELECT 
  p.id,
  'project_created',
  jsonb_build_object(
    'project_type', p.project_type,
    'estimated_cost', p.estimated_cost,
    'location', p.location,
    'timestamp', NOW()
  )
FROM projects p;

INSERT INTO project_analytics (project_id, event_type, event_data)
SELECT 
  p.id,
  'sustainability_analysis_requested',
  jsonb_build_object(
    'square_meters', p.square_meters,
    'current_score', p.sustainability_score,
    'timestamp', NOW() - INTERVAL '2 days'
  )
FROM projects p
WHERE p.sustainability_score IS NOT NULL;

INSERT INTO project_analytics (project_id, event_type, event_data)
SELECT 
  p.id,
  'financing_analysis_requested',
  jsonb_build_object(
    'estimated_cost', p.estimated_cost,
    'project_type', p.project_type,
    'timestamp', NOW() - INTERVAL '1 day'
  )
FROM projects p
WHERE p.estimated_cost IS NOT NULL;

-- Insert sample AI analysis cache entries
INSERT INTO ai_analysis_cache (
  cache_key,
  analysis_type,
  input_data,
  output_data,
  expires_at,
  model_version,
  confidence_score
)
SELECT 
  'sustainability:' || p.id || ':sample',
  'sustainability_analysis',
  jsonb_build_object(
    'project_id', p.id,
    'project_type', p.project_type,
    'square_meters', p.square_meters
  ),
  jsonb_build_object(
    'overall_score', p.sustainability_score,
    'recommendations_count', 5,
    'analysis_date', NOW()
  ),
  NOW() + INTERVAL '1 hour',
  'grok-beta',
  0.89
FROM projects p
WHERE p.sustainability_score IS NOT NULL;

-- Update project statistics
UPDATE projects SET 
  project_data = jsonb_build_object(
    'last_updated', NOW(),
    'analysis_completed', true,
    'recommendations_count', (
      SELECT COUNT(*) 
      FROM sustainability_recommendations sr 
      WHERE sr.project_id = projects.id
    ),
    'financing_options_count', (
      SELECT COUNT(*) 
      FROM financing_options fo 
      WHERE fo.project_id = projects.id
    )
  )
WHERE id IN (SELECT id FROM projects LIMIT 3);
