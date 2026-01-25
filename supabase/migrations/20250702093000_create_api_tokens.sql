-- Create api_tokens table
CREATE TABLE api_tokens
(
    id            uuid PRIMARY KEY         DEFAULT gen_random_uuid(),
    user_id       uuid REFERENCES auth.users (id) ON DELETE CASCADE,
    name          text NOT NULL,
    private_token text NOT NULL,
    public_token  text NOT NULL,
    created_at    timestamp with time zone DEFAULT now()
);

-- Enable Row-Level Security (RLS)
ALTER TABLE api_tokens enable ROW LEVEL SECURITY;

-- Policies for secure access
CREATE
policy "Allow users to read their own tokens"
ON api_tokens
FOR
SELECT
    USING (auth.uid() = user_id);

CREATE
policy "Allow users to insert their own tokens"
ON api_tokens
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE
policy "Allow users to delete their own tokens"
ON api_tokens
FOR DELETE
USING (auth.uid() = user_id);