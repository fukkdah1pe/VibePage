// src/pages/EditorPage.tsx - Финальная версия с интеграцией Telegram

// Эта строчка - "подсказка" для TypeScript, что мы работаем с Telegram Web App
/// <reference types="@twa-dev/types" />

import { useState, useEffect } from 'react'; // Добавили useEffect
import { supabase } from '../supabaseClient';

function EditorPage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки

  // Получаем главный объект для работы с Telegram
  const tg = window.Telegram.WebApp;

  // Получаем ID пользователя. Если мы не в Telegram, то userId будет undefined
  const userId = tg.initDataUnsafe?.user?.id.toString();

  // useEffect будет выполняться один раз при загрузке компонента
  useEffect(() => {
    // Расширяем приложение на весь экран при запуске
    tg.expand();

    // Функция для загрузки данных пользователя из Supabase
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        console.log("Приложение открыто не в Telegram, загрузка данных невозможна.");
        return;
      }

      const { data, error } = await supabase
        .from('pages')
        .select('name, bio, link')
        .eq('user_id', userId)
        .single();

      if (data) {
        // Если данные нашлись, заполняем ими поля
        setName(data.name || '');
        setBio(data.bio || '');
        setLink(data.link || '');
      }
      
      if (error && error.code !== 'PGRST116') { // PGRST116 - это код ошибки "строка не найдена", это не страшно
          console.error("Ошибка загрузки данных:", error);
      }
      
      setLoading(false); // Завершаем загрузку
    };

    fetchUserData();
  }, [userId]); // Пустой массив зависимостей означает, что эффект выполнится один раз

  const handleSave = async () => {
    // Проверяем, есть ли у нас ID пользователя
    if (!userId) {
      alert('Ошибка: невозможно определить пользователя. Откройте приложение через Telegram.');
      return;
    }

    const { error } = await supabase
      .from('pages')
      .upsert({ user_id: userId, name, bio, link }); // <-- Используем настоящий userId!

    if (error) {
      tg.showAlert('Ошибка сохранения: ' + error.message); // Используем нативное уведомление
    } else {
      tg.showAlert('Ваша страница успешно сохранена!'); // Используем нативное уведомление
    }
  };

  // Пока данные грузятся, показываем заглушку
  if (loading) {
    return <div className="container"><h1>Загрузка профиля...</h1></div>;
  }

  // Основной JSX остается почти без изменений
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