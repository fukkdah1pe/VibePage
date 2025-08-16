// src/pages/EditorPage.tsx - ДИАГНОСТИЧЕСКАЯ ВЕРСИЯ

/// <reference types="@twa-dev/types" />
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function EditorPage() {
  const [debugLog, setDebugLog] = useState<string[]>([]);

  // Функция для добавления записей в наш лог
  const addLog = (message: string) => {
    setDebugLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addLog("Приложение запущено.");

    const tg = window.Telegram?.WebApp;
    if (!tg) {
      addLog("Критическая ошибка: window.Telegram.WebApp не найден!");
      return;
    }
    addLog("Объект Telegram.WebApp найден.");
    tg.expand();

    const userId = tg.initDataUnsafe?.user?.id.toString();
    addLog(`ID пользователя: ${userId || "не определен"}`);

    if (!userId) {
      addLog("Загрузка данных невозможна без ID пользователя.");
      return;
    }

    const fetchUserData = async () => {
      addLog("Начинаю загрузку данных из Supabase...");
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('name, bio, link')
          .eq('user_id', userId)
          .single();

        if (error) {
          // PGRST116 - это нормальная ошибка "строка не найдена"
          if (error.code === 'PGRST116') {
             addLog("Данные для этого пользователя еще не созданы. Это нормально.");
          } else {
             // А вот другие ошибки - это проблема
             throw error;
          }
        }
        
        if (data) {
          addLog("Данные успешно загружены!");
        }

      } catch (err: any) {
        addLog(`!!! ОШИБКА SUPABASE: ${err.message}`);
      } finally {
        addLog("Процесс загрузки завершен.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ padding: '10px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
      <h1>Диагностика</h1>
      {/* Выводим наш лог на экран */}
      {debugLog.map((log, index) => (
        <p key={index} style={{ margin: 0, borderBottom: '1px solid #eee' }}>{log}</p>
      ))}
      <hr />
      <p>Если вы видите этот текст, значит React работает. Пришлите скриншот этого экрана.</p>
    </div>
  );
}

export default EditorPage;