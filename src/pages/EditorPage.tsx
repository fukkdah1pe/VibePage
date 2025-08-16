// src/pages/EditorPage.tsx - ФИНАЛЬНАЯ ДИАГНОСТИЧЕСКАЯ ВЕРСИЯ (С ОЖИДАНИЕМ)

/// <reference types="@twa-dev/types" />
import { useState, useEffect } from 'react';
//import { supabase } from '../supabaseClient';

function EditorPage() {
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setDebugLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addLog("Приложение запущено.");

    // Функция, которая будет пытаться инициализировать приложение
    const initializeApp = (attempt = 1) => {
      const tg = window.Telegram?.WebApp;

      if (tg) {
        // УСПЕХ! Объект найден
        addLog(`Успех! Объект Telegram.WebApp найден с ${attempt} попытки.`);
        tg.expand();

        const userId = tg.initDataUnsafe?.user?.id.toString();
        addLog(`ID пользователя: ${userId || "не определен"}`);

        if (!userId) {
            addLog("Загрузка данных невозможна без ID пользователя.");
            return;
        }
        
        // ... (остальная логика загрузки данных останется здесь, когда мы вернемся к ней)
        addLog("Приложение готово к работе!");

      } else {
        // ОБЪЕКТ НЕ НАЙДЕН. Пробуем еще раз через 100 миллисекунд
        if (attempt > 30) { // Если за 3 секунды объект не появился - что-то не так
          addLog("Критическая ошибка: Telegram.WebApp не появился после 3 секунд ожидания.");
          return;
        }
        addLog(`Попытка #${attempt}: Telegram.WebApp еще не готов. Жду 100мс...`);
        setTimeout(() => initializeApp(attempt + 1), 100);
      }
    };

    initializeApp(); // Начинаем процесс инициализации

  }, []);

  return (
    <div style={{ padding: '10px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
      <h1>Диагностика (с ожиданием)</h1>
      {debugLog.map((log, index) => (
        <p key={index} style={{ margin: 0, borderBottom: '1px solid #eee' }}>{log}</p>
      ))}
    </div>
  );
}

export default EditorPage;