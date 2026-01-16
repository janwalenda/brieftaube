CREATE TABLE IF NOT EXISTS template (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  user_id TEXT NOT NULL REFERENCES "user" (id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW (),
  updated_at TIMESTAMP DEFAULT NOW ()
);

CREATE INDEX idx_template_user_id ON template (user_id);