-- Drop existing types if they exist and recreate them
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS message_role CASCADE;
DROP TYPE IF EXISTS financing_type CASCADE;

-- Create ENUM types
CREATE TYPE project_status AS ENUM ('draft', 'active', 'completed', 'cancelled');
CREATE TYPE message_role AS ENUM ('user', 'assistant', 'system');
CREATE TYPE financing_type AS ENUM ('green_loan', 'energy_efficiency', 'sustainability_grant', 'tax_incentive');

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status project_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_email VARCHAR(255),
    user_name VARCHAR(255),
    company_name VARCHAR(255),
    phone VARCHAR(50),
    project_data JSONB DEFAULT '{}',
    estimated_cost DECIMAL(12,2),
    sustainability_score INTEGER CHECK (sustainability_score >= 0 AND sustainability_score <= 100)
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    role message_role NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create financing_options table
CREATE TABLE IF NOT EXISTS financing_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    type financing_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    amount DECIMAL(12,2),
    interest_rate DECIMAL(5,2),
    term_months INTEGER,
    requirements JSONB DEFAULT '[]',
    benefits JSONB DEFAULT '[]',
    provider VARCHAR(255),
    application_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sustainability_recommendations table
CREATE TABLE IF NOT EXISTS sustainability_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    impact_score INTEGER CHECK (impact_score >= 0 AND impact_score <= 100),
    cost_estimate DECIMAL(12,2),
    savings_estimate DECIMAL(12,2),
    implementation_time VARCHAR(100),
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_user_email ON projects(user_email);
CREATE INDEX IF NOT EXISTS idx_conversations_project_id ON conversations(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_financing_options_project_id ON financing_options(project_id);
CREATE INDEX IF NOT EXISTS idx_sustainability_recommendations_project_id ON sustainability_recommendations(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_conversations_updated_at ON conversations;
CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
