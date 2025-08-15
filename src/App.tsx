import { useState } from 'react';
import './App.css';

function App() {
  // Создаем "коробки" для хранения данных из полей ввода
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [link, setLink] = useState('');

  // Эта функция будет вызываться при нажатии на кнопку "Сохранить"
  const handleSave = () => {
    // Пока что просто покажем alert с данными.
    // В будущем здесь будет отправка на сервер.
    const message = `Имя: ${name}\nО себе: ${bio}\nСсылка: ${link}`;
    alert(message);
  };

  return (
    <div className="form-container">
      <h1>Редактор страницы</h1>

      <label>Ваше имя или никнейм</label>
      <input
        type="text"
        placeholder="Введите ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Коротко о себе</label>
      <textarea
        placeholder="Чем вы увлекаетесь?"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <label>Важная ссылка</label>
      <input
        type="text"
        placeholder="https://t.me/username"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <button onClick={handleSave}>
        Сохранить
      </button>
    </div>
  );
}

export default App;