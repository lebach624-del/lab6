-- Create the messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  sender_type TEXT CHECK (sender_type IN ('user', 'ai')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to view only their own messages
CREATE POLICY "Users can only see their own messages" ON messages
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy to allow authenticated users to insert their own messages
CREATE POLICY "Users can insert their own messages" ON messages
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Enable real-time for the messages table
-- You might also need to explicitly enable real-time for this table in your Supabase Dashboard
-- Database -> Replication -> Click '0 tables' -> Toggle on 'messages' table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
