import React from 'react';
import './Header.scss';

export default function Header() {
  const day = new Date().getDay();
  return (
    <>
      <header className="app-header">
        <a href="/" className="brand-link">
          {' '}
          Finance Portfolio Tracker{' '}
        </a>
      </header>
      {day === 0 || day === 6 ? (
        <div style={{ textAlign: 'center' }}>
          * Since it is a weekend all the stock closing prices are taken from
          Friday.
        </div>
      ) : null}
    </>
  );
}
