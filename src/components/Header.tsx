import React from 'react';

interface HeaderProps {
    firstName:  string;
    lastName:   string;
}

const Header:React.FC<HeaderProps> = ({firstName, lastName}) => {
    return (
        <header className="header">
            <div className='container header-inner'>
                <h1 className='brand-name'>{firstName} {lastName}<em color='red'> .</em></h1>
                <nav className='nav-bar'>
                    <a href="#about">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#tech-stack">Tech Stack</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </header>
    )
}

export default Header;