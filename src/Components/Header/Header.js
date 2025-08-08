import React from "react";
import './Header.css';

export default function Header({ logoSrc, navData }) {


    return (
        <header className="header">
            <div className="top-bar">
                <div className="search-container">
                    <input type="text" placeholder="Digite sua pesquisa" className="header-search-input"/>
                    <button className="header-search-button">
                        <img src="./img/icons8-search.svg" alt="search icon" className="header-search-icon"/>
                    </button>
                </div>

                <div className="logo-container">
                    <img src={logoSrc} alt="Lion Diamonds Logo" className="logo-img"/>
                </div>

                <div className="header-actions">
                    <div className="cart-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </div>
                    <button className="login-btn">Login</button>
                </div>
            </div>

            <nav className="nav-bar">
                <div className="nav-container">
                    <ul className="nav-menu">
                        {/* O map agora itera sobre 'navData' diretamente */}
                        {navData.map((item) => (
                            <li
                                key={item.id}
                                className={`nav-item ${item.dropdown && item.dropdown.length > 0 ? 'dropdown-container' : ''}`}
                            >
                                <span className="nav-link">{item.title}</span>
                                {item.dropdown && item.dropdown.length > 0 && (
                                    <ul className="dropdown-menu">
                                        {item.dropdown.map((dropdownItem) => (
                                            <li key={dropdownItem.id} className="dropdown-item">
                                                {dropdownItem.text}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}