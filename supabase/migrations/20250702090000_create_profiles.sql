-- Create a table for public profiles
CREATE TABLE profiles
(
    id         uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    updated_at timestamp with time zone DEFAULT now(),
    email      text UNIQUE,
    full_name  text,
    avatar_url text
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
ALTER TABLE profiles
    enable ROW LEVEL SECURITY;

CREATE
policy "Public profiles are viewable by everyone." ON profiles
  FOR
SELECT USING (TRUE);

CREATE
policy "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE
policy "Users can update own profile." ON profiles
  FOR
UPDATE using (auth.uid() = id);

-- inserts a row into public users
CREATE FUNCTION public.handle_new_user()
    RETURNS trigger AS $$
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
-- trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW EXECUTE procedure PUBLIC.handle_new_user();
