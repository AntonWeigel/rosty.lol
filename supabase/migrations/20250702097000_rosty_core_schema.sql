-- Create a table for public profiles
CREATE TABLE profiles
(
    id               uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    updated_at       timestamp with time zone DEFAULT now(),
    email            text UNIQUE,
    full_name        text,
    avatar_url       text,
    username         TEXT UNIQUE,
    coal_balance     INT                      DEFAULT 0,
    reputation_score INT                      DEFAULT 0,
    rank_tier        TEXT                     DEFAULT 'rookie'
);

-- Set up Row Level Security (RLS) for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE
POLICY "Public profiles are viewable by everyone." ON profiles
    FOR
SELECT USING (TRUE);

CREATE
POLICY "Users can insert their own profile." ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE
POLICY "Users can update own profile." ON profiles
    FOR
UPDATE USING (auth.uid() = id);

-- Function and trigger for new user creation
CREATE
OR REPLACE FUNCTION PUBLIC.handle_new_user()
    RETURNS TRIGGER AS $$
BEGIN
INSERT INTO public.profiles (id, email, full_name, avatar_url)
VALUES (new.id,
        new.raw_user_meta_data ->>'email',
        COALESCE(new.raw_user_meta_data ->>'full_name', ''),
        COALESCE(new.raw_user_meta_data ->>'avatar_url', ''));
RETURN new;
END;
$$
LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE PUBLIC.handle_new_user();

-- Create projects table
CREATE TABLE public.projects
(
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name             TEXT                           NOT NULL,
    status           TEXT             DEFAULT 'draft',
    created_at       TIMESTAMPTZ      DEFAULT now() NOT NULL,
    user_id          UUID                           NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    url              TEXT,
    logo_url         TEXT,
    hero_image_url   TEXT,
    one_liner        TEXT,
    pricing_model    TEXT,
    target_audience  TEXT,
    views            INT              DEFAULT 0,
    heat_score       INT              DEFAULT 0,
    bounty_balance   INT              DEFAULT 0,
    trust_score      INT              DEFAULT 0,
    roast_count      INT              DEFAULT 0,
    bug_count        INT              DEFAULT 0,
    last_activity_at TIMESTAMPTZ,
    CONSTRAINT projects_status_check CHECK (
        status = ANY (ARRAY['draft', 'active', 'completed'])
        )
);

-- Enable RLS for projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE
POLICY "Allow public read access for active projects"
    ON PUBLIC.projects FOR
SELECT USING (status = 'active');

CREATE
POLICY "Allow users to read their own projects"
    ON PUBLIC.projects FOR
SELECT USING (auth.uid() = user_id);

CREATE
POLICY "Allow users to create projects"
    ON PUBLIC.projects FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE
POLICY "Allow users to update their own projects"
    ON PUBLIC.projects FOR
UPDATE USING (auth.uid() = user_id);

CREATE
POLICY "Allow users to delete their own projects"
    ON PUBLIC.projects FOR DELETE
USING (auth.uid() = user_id);

-- Create Enums
CREATE TYPE payout_status_enum AS ENUM ('pending', 'paid', 'rejected');
CREATE TYPE feature_status_enum AS ENUM ('open', 'planned', 'shipped', 'rejected');
CREATE TYPE activity_type_enum AS ENUM ('new_roast', 'bug_report', 'upvote', 'blind_guess');

-- Create roasts table
CREATE TABLE roasts
(
    id            UUID PRIMARY KEY   DEFAULT gen_random_uuid(),
    project_id    UUID NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    user_id       UUID NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    created_at    TIMESTAMPTZ        DEFAULT now(),
    type          TEXT,
    content       TEXT,
    images        TEXT[],
    is_helpful    BOOLEAN            DEFAULT FALSE,
    is_spam       BOOLEAN            DEFAULT FALSE,
    payout_status payout_status_enum DEFAULT 'pending',
    laugh_count   INT                DEFAULT 0
);

-- Create features table
CREATE TABLE features
(
    id          UUID PRIMARY KEY    DEFAULT gen_random_uuid(),
    project_id  UUID NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ         DEFAULT now(),
    title       TEXT NOT NULL,
    description TEXT,
    images      TEXT[],
    vote_count  INT                 DEFAULT 0,
    status      feature_status_enum DEFAULT 'open'
);

-- Create blind_guesses table
CREATE TABLE blind_guesses
(
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id       UUID NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    user_id          UUID NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    created_at       TIMESTAMPTZ      DEFAULT now(),
    one_liner        TEXT,
    pricing_model    TEXT,
    target_audience  TEXT,
    similarity_score INT,
    is_accurate      BOOLEAN          DEFAULT FALSE,
    reward_claimed   BOOLEAN          DEFAULT FALSE
);

-- Create activities table
CREATE TABLE activities
(
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id     UUID               NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    recipient_user_id UUID REFERENCES profiles (id) ON DELETE CASCADE,
    project_id        UUID REFERENCES projects (id) ON DELETE CASCADE,
    type              activity_type_enum NOT NULL,
    payload           JSONB,
    is_read           BOOLEAN          DEFAULT FALSE,
    created_at        TIMESTAMPTZ      DEFAULT now()
);

-- Create transactions table
CREATE TABLE transactions
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    amount     INT  NOT NULL,
    type       TEXT NOT NULL,
    created_at TIMESTAMPTZ      DEFAULT now()
);

-- Enable Row Level Security (RLS) for new tables
ALTER TABLE roasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE blind_guesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies for new tables
CREATE
POLICY "Public read access for roasts" ON roasts FOR
SELECT USING (TRUE);
CREATE
POLICY "Users can create their own roasts" ON roasts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE
POLICY "Public read access for features" ON features FOR
SELECT USING (TRUE);
CREATE
POLICY "Users can create their own features" ON features FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE
POLICY "Users can see their own blind guesses" ON blind_guesses FOR
SELECT USING (auth.uid() = user_id);
CREATE
POLICY "Users can create their own blind guesses" ON blind_guesses FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE
POLICY "Users can see activities related to them" ON activities FOR
SELECT USING (auth.uid() = actor_user_id OR auth.uid() = recipient_user_id);

CREATE
POLICY "Users can see their own transactions" ON transactions FOR
SELECT USING (auth.uid() = user_id);
