-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_email VARCHAR(255),
    user_name VARCHAR(255),
    company_name VARCHAR(255),
    phone VARCHAR(50),
    project_data JSONB DEFAULT '{}',
    estimated_cost DECIMAL(12,2),
    sustainability_score INTEGER CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
    location VARCHAR(255),
    project_type VARCHAR(100),
    square_meters DECIMAL(10,2),
    target_completion_date DATE,
    budget_range VARCHAR(50),
    special_requirements TEXT[]
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'completed')),
    conversation_type VARCHAR(50) DEFAULT 'general' CHECK (conversation_type IN ('general', 'sustainability', 'financing', 'planning'))
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    tokens_used INTEGER DEFAULT 0,
    model_used VARCHAR(100),
    processing_time_ms INTEGER
);

-- Sustainability recommendations table
CREATE TABLE IF NOT EXISTS sustainability_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    impact_score INTEGER CHECK (impact_score >= 1 AND impact_score <= 10),
    cost_estimate DECIMAL(12,2),
    savings_estimate DECIMAL(12,2),
    implementation_time VARCHAR(100),
    priority INTEGER DEFAULT 1 CHECK (priority >= 1 AND priority <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'implemented', 'rejected')),
    environmental_impact TEXT,
    roi_months INTEGER,
    certification_eligible BOOLEAN DEFAULT FALSE
);

-- Financing options table
CREATE TABLE IF NOT EXISTS financing_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL CHECK (type IN ('green_loan', 'energy_efficiency', 'sustainability_grant', 'tax_incentive', 'business_loan')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    amount DECIMAL(12,2),
    interest_rate DECIMAL(5,2),
    term_months INTEGER,
    requirements TEXT[] DEFAULT '{}',
    benefits TEXT[] DEFAULT '{}',
    provider VARCHAR(255),
    application_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'applied', 'approved', 'rejected')),
    eligibility_score INTEGER CHECK (eligibility_score >= 0 AND eligibility_score <= 100),
    processing_time_days INTEGER,
    contact_info JSONB DEFAULT '{}'
);

-- AI analysis cache table
CREATE TABLE IF NOT EXISTS ai_analysis_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cache_key VARCHAR(255) UNIQUE NOT NULL,
    analysis_type VARCHAR(100) NOT NULL,
    input_data JSONB NOT NULL,
    output_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    model_version VARCHAR(50),
    confidence_score DECIMAL(3,2)
);

-- Project analytics table
CREATE TABLE IF NOT EXISTS project_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_session VARCHAR(255),
    ip_address INET,
    user_agent TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_sustainability_score ON projects(sustainability_score);
CREATE INDEX IF NOT EXISTS idx_conversations_project_id ON conversations(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_sustainability_project_id ON sustainability_recommendations(project_id);
CREATE INDEX IF NOT EXISTS idx_financing_project_id ON financing_options(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_cache_key ON ai_analysis_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_ai_cache_expires ON ai_analysis_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_analytics_project_id ON project_analytics(project_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON project_analytics(event_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sustainability_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE financing_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analysis_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (for now, allow all operations - in production, implement proper auth)
CREATE POLICY "Allow all operations on projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all operations on conversations" ON conversations FOR ALL USING (true);
CREATE POLICY "Allow all operations on messages" ON messages FOR ALL USING (true);
CREATE POLICY "Allow all operations on sustainability_recommendations" ON sustainability_recommendations FOR ALL USING (true);
CREATE POLICY "Allow all operations on financing_options" ON financing_options FOR ALL USING (true);
CREATE POLICY "Allow all operations on ai_analysis_cache" ON ai_analysis_cache FOR ALL USING (true);
CREATE POLICY "Allow all operations on project_analytics" ON project_analytics FOR ALL USING (true);
