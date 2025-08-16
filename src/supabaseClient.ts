// src/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Замените 'ВАШ_URL' и 'ВАШ_ANON_KEY' на ваши реальные данные из Supabase
const supabaseUrl = 'https://fltordyqiztlsmlsdjfq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdG9yZHlxaXp0bHNtbHNkamZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNDg0NDYsImV4cCI6MjA3MDkyNDQ0Nn0.NwnxnLwbPCvLAXz0zZ9J6WqTc62_-ZqDtL-Uh29pISM';

// Экспортируем клиент, чтобы его можно было использовать в других файлах
export const supabase = createClient(supabaseUrl, supabaseKey);