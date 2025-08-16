// src/pages/EditorPage.tsx - ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ

/// <reference types="@twa-dev/types" />
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // <-- РАСКОММЕНТИРОВАЛИ ОБРАТНО!

function EditorPage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(true);

  // Используем useEffect, чтобы код выполнился один раз при запуске
  useEffect(() => {
    const initializeApp = () => {
      const tg = window.Telegram?.WebApp;
      if (!tg) {
        console.error("Telegram WebApp object is not available.");
        setLoading(false);
        return;
      }

      tg.expand();
      const userId = tg.initDataUnsafe?.user?.id.toString();

      if (!userId) {
        setLoading(false);
        return;
      }

      // Загружаем данные пользователя
      const fetchUserData = async () => {
        const { data } = await supabase
          .from('pages')
          .select('name, bio, link')
          .eq('user_id', userId)
          .single();

        if (data) {
          setName(data.name || '');
          setBio(data.bio || '');
          setLink(data.link || '');
        }
        setLoading(false);
      };

      fetchUserData();
    };

    // Терпеливо ждем, пока объект Telegram не появится
    if (window.Telegram?.WebApp) {
      initializeApp();
    } else {
      setTimeout(initializeApp, 100);
    }
  }, []);

  const handleSave = async () => {
    const tg = window.Telegram.WebApp;
    const userId = tg.initDataUnsafe?.user?.id.toString();
    if (!userId) {
      tg.showAlert('Ошибка: невозможно определить пользователя.');
      return;
    }

    const { error } = await supabase
      .from('pages')
      .upsert({ user_id: userId, name, bio, link });

    if (error) {
      tg.showAlert('Ошибка сохранения: ' + error.message);
    } else {
      tg.showAlert('Ваша страница успешно сохранена!');
    }
  };

  if (loading) {
    return <div className="container"><h1>Загрузка...</h1></div>;
  }

  return (
    <div className="container">
      <h1>Редактор вашей страницы</h1>
      <div className="form-group">
        <label>Имя или никнейм</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя"/>
      </div>
      <div className="form-group">
        <label>О себе</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Расскажите немного о себе"/>
      </div>
      <div className="form-group">
        <label>Ссылка</label>
        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Ваша главная ссылка"/>
      </div>
      <button onClick={handleSave} className="save-button">
        Сохранить
      </button>
    </div>
  );
}

export default EditorPage;