// src/pages/PublicPage.tsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface PageData {
  name: string;
  bio: string;
  link: string;
}

function PublicPage() {
  const { userId } = useParams<{ userId: string }>();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      if (!userId) return;

      setLoading(true);
      const { data } = await supabase
        .from('pages')
        .select('name, bio, link')
        .eq('user_id', userId)
        .single();
      
      setPageData(data);
      setLoading(false);
    };

    fetchPageData();
  }, [userId]);

  if (loading) {
    return <div>Загрузка страницы...</div>;
  }

  if (!pageData) {
    return <div>Страница не найдена.</div>;
  }

  return (
    <div className="container">
      <h1>{pageData.name}</h1>
      <p>{pageData.bio}</p>
      {pageData.link && (
        <a href={pageData.link} target="_blank" rel="noopener noreferrer">
          Перейти по ссылке
        </a>
      )}
    </div>
  );
}

export default PublicPage; // <-- Убедитесь, что эта строка есть и она именно такая