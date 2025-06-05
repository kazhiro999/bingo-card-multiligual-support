import React from 'react';
import './BingoCell.css';

const BingoCell = ({ 
  index, 
  row, 
  col, 
  content, 
  isSelected, 
  isFree, 
  isInBingoLine, 
  onToggle,
  language = 'ja',
  texts
}) => {
  const handleClick = () => {
    if (!isFree) { // FREEマスは常に選択状態なのでクリック無効
      onToggle(index);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // テキスト補間関数
  const interpolate = (text, params) => {
    return text.replace(/\{(\w+)\}/g, (match, key) => params[key] || match);
  };

  const cellClasses = [
    'bingo-cell',
    isSelected ? 'selected' : '',
    isFree ? 'free' : '',
    isInBingoLine ? 'bingo-line' : ''
  ].filter(Boolean).join(' ');

  // ARIA ラベルの生成
  const getAriaLabel = () => {
    if (isFree) {
      return texts.freeCell;
    } else {
      const status = isSelected ? texts.selected : texts.unselected;
      return interpolate(texts.cellLabel, {
        content,
        row: row + 1,
        col: col + 1,
        status
      });
    }
  };

  return (
    <div
      className={cellClasses}
      role="gridcell"
      tabIndex={isFree ? -1 : 0}
      aria-selected={isSelected}
      aria-label={getAriaLabel()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-row={row}
      data-col={col}
      data-index={index}
    >
      <span className="cell-content" aria-hidden="true">
        {content}
      </span>
      {isSelected && (
        <span className="selection-indicator" aria-hidden="true">
          ✓
        </span>
      )}
    </div>
  );
};

export default BingoCell; 