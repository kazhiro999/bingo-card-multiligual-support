import React, { useState, useCallback, useEffect } from 'react';
import BingoCell from './BingoCell';
import './BingoCard.css';

// 言語別テキスト定義
const texts = {
  ja: {
    reach: 'リーチ',
    bingo: 'ビンゴ',
    bingoAchieved: '🎉 ビンゴ！ {count}ライン達成',
    reset: 'リセット',
    cardLabel: 'ビンゴカード',
    gridLabel: '5×5のビンゴグリッド',
    resetLabel: 'ビンゴカードをリセット',
    freeCell: 'フリーマス、常に選択済み',
    cellLabel: '{content}、{row}行{col}列、{status}',
    selected: '選択済み',
    unselected: '未選択',
    reachCount: 'リーチ数: {count}',
    bingoCount: 'ビンゴ数: {count}'
  },
  en: {
    reach: 'Reach',
    bingo: 'Bingo',
    bingoAchieved: '🎉 Bingo! {count} lines achieved',
    reset: 'Reset',
    cardLabel: 'Bingo Card',
    gridLabel: '5×5 Bingo Grid',
    resetLabel: 'Reset Bingo Card',
    freeCell: 'Free space, always selected',
    cellLabel: '{content}, row {row} column {col}, {status}',
    selected: 'selected',
    unselected: 'unselected',
    reachCount: 'Reach count: {count}',
    bingoCount: 'Bingo count: {count}'
  }
};

const BingoCard = ({ language = 'ja' }) => {
  // 5x5のビンゴカードの状態管理
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [bingoLines, setBingoLines] = useState([]);
  const [reachLines, setReachLines] = useState([]);
  const [cellNumbers, setCellNumbers] = useState([]);
  
  const t = texts[language];
  
  // テキスト補間関数
  const interpolate = (text, params) => {
    return text.replace(/\{(\w+)\}/g, (match, key) => params[key] || match);
  };

  // セルの数字を生成する関数（重複なし）
  const generateCellNumbers = useCallback(() => {
    // 1-50の数字配列を作成
    const availableNumbers = Array.from({ length: 50 }, (_, i) => i + 1);
    
    // Fisher-Yatesシャッフルアルゴリズムで配列をシャッフル
    for (let i = availableNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
    }
    
    // 最初の24個を使用（中央のFREEを除く）
    const shuffledNumbers = availableNumbers.slice(0, 24);
    let numberIndex = 0;
    
    const numbers = [];
    for (let i = 0; i < 25; i++) {
      if (i === 12) {
        numbers.push('FREE'); // 中央はFREE
      } else {
        numbers.push(shuffledNumbers[numberIndex]);
        numberIndex++;
      }
    }
    return numbers;
  }, []);

  // 初期化時に中央のFREEマスを選択状態にし、数字を生成
  useEffect(() => {
    setSelectedCells(new Set([12])); // 中央のセル（2行2列目、0ベースで12）
    setCellNumbers(generateCellNumbers());
  }, [generateCellNumbers]);

  // セルの選択状態を切り替える
  const toggleCell = useCallback((index) => {
    setSelectedCells(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  }, []);

  // 全ラインを取得する関数
  const getAllLines = useCallback(() => {
    const lines = [];
    
    // 横のライン
    for (let row = 0; row < 5; row++) {
      const line = [];
      for (let col = 0; col < 5; col++) {
        line.push(row * 5 + col);
      }
      lines.push(line);
    }
    
    // 縦のライン
    for (let col = 0; col < 5; col++) {
      const line = [];
      for (let row = 0; row < 5; row++) {
        line.push(row * 5 + col);
      }
      lines.push(line);
    }
    
    // 斜めのライン（左上から右下）
    lines.push([0, 6, 12, 18, 24]);
    
    // 斜めのライン（右上から左下）
    lines.push([4, 8, 12, 16, 20]);
    
    return lines;
  }, []);

  // ビンゴ判定
  const checkBingo = useCallback((selected) => {
    const allLines = getAllLines();
    return allLines.filter(line => line.every(index => selected.has(index)));
  }, [getAllLines]);

  // リーチ判定（ビンゴまであと1つ）
  const checkReach = useCallback((selected) => {
    const allLines = getAllLines();
    return allLines.filter(line => {
      const selectedCount = line.filter(index => selected.has(index)).length;
      return selectedCount === 4; // あと1つでビンゴ
    });
  }, [getAllLines]);

  // 選択状態が変わるたびにビンゴ・リーチ判定
  useEffect(() => {
    const bingo = checkBingo(selectedCells);
    const reach = checkReach(selectedCells);
    setBingoLines(bingo);
    setReachLines(reach);
  }, [selectedCells, checkBingo, checkReach]);

  // リセット機能
  const resetCard = useCallback(() => {
    setSelectedCells(new Set([12])); // FREEマスのみ選択状態
    setBingoLines([]);
    setReachLines([]);
    setCellNumbers(generateCellNumbers()); // 新しい数字を生成
  }, [generateCellNumbers]);

  return (
    <div className="bingo-card" role="application" aria-label={t.cardLabel}>
      <div className="bingo-header">
        {bingoLines.length > 0 && (
          <div className="bingo-status" role="status" aria-live="polite">
            {interpolate(t.bingoAchieved, { count: bingoLines.length })}
          </div>
        )}
      </div>
      
      {/* リーチ数とビンゴ数のカウンター */}
      <div className="bingo-counters">
        <div className="counter-item">
          <span className="counter-label">{t.reach}:</span>
          <span className="counter-value" aria-label={interpolate(t.reachCount, { count: reachLines.length })}>
            {reachLines.length}
          </span>
        </div>
        <div className="counter-item">
          <span className="counter-label">{t.bingo}:</span>
          <span className="counter-value" aria-label={interpolate(t.bingoCount, { count: bingoLines.length })}>
            {bingoLines.length}
          </span>
        </div>
      </div>
      
      <div 
        className="bingo-grid"
        role="grid"
        aria-label={t.gridLabel}
      >
        {Array.from({ length: 25 }, (_, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          const isSelected = selectedCells.has(index);
          const isFree = index === 12;
          const isInBingoLine = bingoLines.some(line => line.includes(index));
          
          return (
            <BingoCell
              key={index}
              index={index}
              row={row}
              col={col}
              content={cellNumbers[index] || ''}
              isSelected={isSelected}
              isFree={isFree}
              isInBingoLine={isInBingoLine}
              onToggle={toggleCell}
              language={language}
              texts={t}
            />
          );
        })}
      </div>
      
      <div className="bingo-controls">
        <button 
          className="reset-button"
          onClick={resetCard}
          aria-label={t.resetLabel}
        >
          {t.reset}
        </button>
      </div>
    </div>
  );
};

export default BingoCard; 