-- Create roadmap_votes table
CREATE TABLE roadmap_votes
(
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug       text NOT NULL UNIQUE,
    votes      integer NOT NULL DEFAULT 0,
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row-Level Security (RLS)
ALTER TABLE roadmap_votes ENABLE ROW LEVEL SECURITY;

-- Policies for read and write access
CREATE POLICY "Allow read access to votes"
    ON roadmap_votes
    FOR SELECT
                   USING (TRUE);

CREATE POLICY "Allow inserting new vote rows"
    ON roadmap_votes
    FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Allow updating vote counts"
    ON roadmap_votes
    FOR UPDATE
                          USING (TRUE)
        WITH CHECK (TRUE);

-- Create or replace voting function
CREATE FUNCTION public.increment_vote(slug_input text)
    RETURNS integer AS $$
DECLARE
updated_votes integer;
BEGIN
INSERT INTO roadmap_votes (slug, votes)
VALUES (slug_input, 1)
    ON CONFLICT (slug)
    DO UPDATE SET votes = roadmap_votes.votes + 1, updated_at = now();

SELECT votes INTO updated_votes FROM roadmap_votes WHERE slug = slug_input;
RETURN updated_votes;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Allow access to function
GRANT EXECUTE ON FUNCTION public.increment_vote(text) TO anon, authenticated;

-- Create or replace unvoting function
CREATE FUNCTION public.decrement_vote(slug_input text)
    RETURNS integer AS $$
DECLARE
updated_votes integer;
BEGIN
    -- Only decrement if the row exists and votes > 0
UPDATE roadmap_votes
SET votes = GREATEST(votes - 1, 0),
    updated_at = now()
WHERE slug = slug_input;

-- Return current votes (whether updated or not)
SELECT votes INTO updated_votes FROM roadmap_votes WHERE slug = slug_input;

-- If no row exists, return 0 (optional behavior)
IF NOT FOUND THEN
        INSERT INTO roadmap_votes (slug, votes)
        VALUES (slug_input, 0);
        updated_votes := 0;
END IF;

RETURN updated_votes;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Allow access to the unvote function
GRANT EXECUTE ON FUNCTION public.decrement_vote(text) TO anon, authenticated;