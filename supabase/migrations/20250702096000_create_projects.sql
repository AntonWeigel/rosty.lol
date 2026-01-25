-- Create projects table
CREATE TABLE public.projects
(
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name       text NOT NULL,
    status     text             DEFAULT 'draft',
    created_at timestamp WITHOUT TIME ZONE DEFAULT now() NOT NULL,
    user_id    uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    CONSTRAINT projects_status_check CHECK (
        status = ANY (ARRAY['draft', 'active', 'completed'])
        )
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policies for secure access

-- SELECT (read)
CREATE
POLICY "Allow users to read their own projects"
  ON PUBLIC.projects
  FOR
SELECT
    USING (auth.uid() = user_id);

-- INSERT (create)
CREATE
POLICY "Allow users to create projects"
  ON PUBLIC.projects
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE
CREATE
POLICY "Allow users to update their own projects"
  ON PUBLIC.projects
  FOR
UPDATE
    USING (auth.uid() = user_id);

-- DELETE
CREATE
POLICY "Allow users to delete their own projects"
  ON PUBLIC.projects
  FOR DELETE
USING (auth.uid() = user_id);
