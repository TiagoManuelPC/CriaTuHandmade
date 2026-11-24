import { createClient } from '@supabase/supabase-js';

// The shared "tiago-apps" Supabase project; this site keeps to its own `criatu` schema
// (see supabase/001_blog.sql). The publishable key is meant to be public: what a visitor
// may read or write is decided by the row-level security rules in the database.
const SUPABASE_URL = 'https://smfnlwgvkjpcwivjvxfa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_p6Lc3FE78ZOFQTnZ3-GAQA_20Cminp_';

export const db = createClient(SUPABASE_URL, SUPABASE_KEY, { db: { schema: 'criatu' } });
