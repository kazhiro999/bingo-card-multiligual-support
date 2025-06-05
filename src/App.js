import React, { useState } from 'react';
import BingoCard from './components/BingoCard';
import './App.css';

// 言語別テキスト定義
const texts = {
  ja: {
    title: 'ビンゴカード',
    japanese: '日本語',
    english: 'English'
  },
  en: {
    title: 'Bingo Card',
    japanese: '日本語', 
    english: 'English'
  }
};

function App() {
  const [language, setLanguage] = useState('ja');
  
  const t = texts[language];

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t.title}</h1>
        <div className="language-tabs">
          <button
            className={`language-tab ${language === 'ja' ? 'active' : ''}`}
            onClick={() => setLanguage('ja')}
            aria-label="日本語に切り替え"
          >
            {t.japanese}
          </button>
          <button
            className={`language-tab ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-label="Switch to English"
          >
            {t.english}
          </button>
        </div>
      </header>
      <main className="app-main">
        <BingoCard language={language} />
      </main>
    </div>
  );
}

export default App; 