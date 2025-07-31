-- Database Schema for Nordvest Bygginnredning AI Assistant
-- Corrected for PostgreSQL compatibility

-- ==============================================================================
-- TYPE DEFINITIONS (ENUMS for PostgreSQL)
-- ==============================================================================

CREATE TYPE user_type AS ENUM ('customer', 'architect', 'designer', 'contractor', 'admin');
CREATE TYPE project_type AS ENUM ('office', 'residential', 'school', 'healthcare', 'retail', 'other');
CREATE TYPE budget_range AS ENUM ('under_500k', '500k_1m', '1m_2m', '2m_5m', 'over_5m');
CREATE TYPE project_status AS ENUM ('planning', 'design', 'approval', 'construction', 'completed');
CREATE TYPE room_type AS ENUM ('office', 'meeting', 'kitchen', 'bathroom', 'storage', 'reception', 'corridor', 'other');
CREATE TYPE light_rating AS ENUM ('low', 'medium', 'high');
CREATE TYPE acoustic_requirements AS ENUM ('low', 'medium', 'high');
CREATE TYPE storage_needs AS ENUM ('minimal', 'moderate', 'extensive');
CREATE TYPE energy_class AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G');
CREATE TYPE building_material_category AS ENUM ('insulation', 'walls', 'windows', 'doors', 'flooring', 'ceiling', 'other');
CREATE TYPE c2c_certification AS ENUM ('bronze', 'silver', 'gold', 'platinum', 'none');
CREATE TYPE material_unit AS ENUM ('m2', 'm3', 'pieces', 'kg');
CREATE TYPE financing_product_type AS ENUM ('green_loan', 'miljolaan', 'sustainability_linked', 'conventional');
CREATE TYPE breeam_requirement AS ENUM ('excellent', 'very_good', 'good', 'none');
CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected');
CREATE TYPE message_type AS ENUM ('user', 'assistant');
CREATE TYPE feedback_rating AS ENUM ('1', '2', '3', '4', '5');
CREATE TYPE knowledge_base_category AS ENUM ('tek17', 'financing', 'space_planning', 'materials', 'sustainability', 'general');
CREATE TYPE product_category AS ENUM ('glassvegger', 'systemvegger', 'systemhimling', 'dører', 'spiler', 'finér', 'treull');
CREATE TYPE product_origin_country AS ENUM ('Norge', 'Sverige', 'Danmark');
CREATE TYPE product_price_range AS ENUM ('low', 'medium', 'high');
CREATE TYPE reusability_rating AS ENUM ('low', 'medium', 'high', 'excellent');
CREATE TYPE inspiration_style AS ENUM ('modern', 'scandinavian', 'industrial', 'minimalist', 'traditional', 'mixed');


-- ==============================================================================
-- CORE TABLES
-- ==============================================================================

-- Users table for authentication and profile management
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(200),
    user_type user_type DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Projects table for customer projects
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    project_type project_type NOT NULL,
    building_size DECIMAL(10,2), -- square meters
    budget_range budget_range,
    location VARCHAR(255),
    status project_status DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- SPACE PLANNING AND ROOM DATA
-- ==============================================================================

-- Rooms table for space planning
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    room_type room_type NOT NULL,
    area DECIMAL(10,2), -- square meters
    ceiling_height DECIMAL(5,2), -- meters
    window_count INT DEFAULT 0,
    door_count INT DEFAULT 1,
    natural_light_rating light_rating,
    function_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Space analysis data
CREATE TABLE space_analysis (
    id SERIAL PRIMARY KEY,
    room_id INT REFERENCES rooms(id) ON DELETE CASCADE,
    traffic_flow_rating light_rating NOT NULL,
    accessibility_compliant BOOLEAN DEFAULT FALSE,
    acoustic_requirements acoustic_requirements NOT NULL,
    storage_needs storage_needs NOT NULL,
    technology_requirements TEXT,
    special_considerations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- NORWEGIAN BUILDING STANDARDS (TEK17)
-- ==============================================================================

-- TEK17 compliance data
CREATE TABLE tek17_compliance (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    energy_class energy_class,
    energy_need_kwh_m2 DECIMAL(8,2), -- kWh per m² per year
    u_value_walls DECIMAL(5,3), -- W/(m²K)
    u_value_roof DECIMAL(5,3),
    u_value_floor DECIMAL(5,3),
    u_value_windows DECIMAL(5,3),
    air_leakage_rate DECIMAL(5,2), -- per hour at 50Pa
    is_nzeb_compliant BOOLEAN DEFAULT FALSE,
    ghg_emissions_calculated BOOLEAN DEFAULT FALSE,
    compliance_notes TEXT,
    verified_by VARCHAR(255),
    verification_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Building materials tracking
CREATE TABLE building_materials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category building_material_category NOT NULL,
    c2c_certification c2c_certification DEFAULT 'none',
    embodied_carbon_kg_co2_m2 DECIMAL(8,3),
    recyclability_percentage DECIMAL(5,2),
    origin_country VARCHAR(100),
    supplier VARCHAR(255),
    tek17_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project materials junction table
CREATE TABLE project_materials (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    material_id INT REFERENCES building_materials(id),
    quantity DECIMAL(10,2),
    unit material_unit NOT NULL,
    cost_per_unit DECIMAL(10,2),
    total_cost DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- GREEN FINANCING DATA
-- ==============================================================================

-- Financing options
CREATE TABLE financing_options (
    id SERIAL PRIMARY KEY,
    provider VARCHAR(255) NOT NULL, -- DNB, KBN, SpareBank1, etc.
    product_name VARCHAR(255) NOT NULL,
    product_type financing_product_type NOT NULL,
    max_amount DECIMAL(15,2),
    interest_rate_from DECIMAL(5,3),
    interest_rate_to DECIMAL(5,3),
    certification_requirements TEXT,
    energy_class_requirement energy_class,
    breeam_requirement breeam_requirement,
    min_energy_improvement_pct DECIMAL(5,2),
    description TEXT,
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project financing applications
CREATE TABLE project_financing (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    financing_option_id INT REFERENCES financing_options(id),
    application_amount DECIMAL(15,2),
    application_status application_status DEFAULT 'draft',
    approval_amount DECIMAL(15,2),
    interest_rate DECIMAL(5,3),
    application_date DATE,
    decision_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- AI TRAINING AND INTERACTION DATA
-- ==============================================================================

-- Conversation history for AI training
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255) NOT NULL,
    message_type message_type NOT NULL,
    message_content TEXT NOT NULL,
    context_data JSON, -- Store relevant context
    intent VARCHAR(255), -- Classified intent
    confidence_score DECIMAL(4,3),
    response_time_ms INT,
    feedback_rating feedback_rating,
    feedback_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge base articles for AI training
CREATE TABLE knowledge_base (
    id SERIAL PRIMARY KEY,
    category knowledge_base_category NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    keywords TEXT, -- Comma-separated keywords
    source_url VARCHAR(500),
    last_updated DATE,
    is_active BOOLEAN DEFAULT TRUE,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User intents and entities for NLP training
CREATE TABLE training_intents (
    id SERIAL PRIMARY KEY,
    intent_name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    example_phrases TEXT, -- JSON array of example phrases
    required_entities TEXT, -- JSON array of required entities
    response_templates TEXT, -- JSON array of response templates
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- PRODUCT AND INSPIRATION DATA
-- ==============================================================================

-- Product catalog
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category product_category NOT NULL,
    supplier VARCHAR(255),
    origin_country product_origin_country NOT NULL,
    c2c_certification c2c_certification DEFAULT 'none',
    embodied_carbon DECIMAL(8,3),
    recyclability_pct DECIMAL(5,2),
    price_range product_price_range,
    description TEXT,
    technical_specs JSON,
    image_urls TEXT, -- JSON array of image URLs
    is_prefabricated BOOLEAN DEFAULT TRUE,
    reusability_rating reusability_rating DEFAULT 'high',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inspiration gallery
CREATE TABLE inspiration_gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_type project_type NOT NULL,
    style inspiration_style NOT NULL,
    primary_materials TEXT, -- JSON array
    color_palette TEXT, -- JSON array of hex colors
    space_size_m2 DECIMAL(10,2),
    image_urls TEXT, -- JSON array of image URLs
    tags TEXT, -- Comma-separated tags
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- SYSTEM AND ANALYTICS TABLES
-- ==============================================================================

-- System configuration
CREATE TABLE system_config (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(255) UNIQUE NOT NULL,
    config_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User analytics
CREATE TABLE user_analytics (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(255) NOT NULL,
    event_data JSON,
    page_url VARCHAR(500),
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================

-- Essential indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_rooms_project_id ON rooms(project_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_knowledge_base_category ON knowledge_base(category);
-- For full-text search on keywords, you might need to install extensions like pg_trgm or use to_tsvector
-- CREATE INDEX idx_knowledge_base_keywords_gin ON knowledge_base USING GIN (to_tsvector('english', keywords));
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_inspiration_project_type ON inspiration_gallery(project_type);
CREATE INDEX idx_user_analytics_user_id ON user_analytics(user_id);
CREATE INDEX idx_user_analytics_event_type ON user_analytics(event_type);

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
