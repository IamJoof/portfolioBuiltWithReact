import React, { useState, useEffect } from 'react';

interface HeaderProps {
    firstName: string;
    lastName: string;
}

const Header: React.FC<HeaderProps> = ({ firstName, lastName }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);

            const sections = ['about', 'education', 'projects', 'tech-stack', 'contact'];
            let currentSection = '';
            
            let maxVisibility = 0;
            
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const total = rect.height;
                    const visible = Math.min(rect.bottom, window.innerHeight) - 
                                 Math.max(rect.top, 0);
                    
                    const visibility = visible > 0 ? (visible / total) : 0;
                    
                    if (visibility > maxVisibility && visibility > 0.3) { 
                        maxVisibility = visibility;
                        currentSection = section;
                    }
                }
            });
            
            if (currentSection !== activeSection) {
                setActiveSection(currentSection);
            }
        };

        // Initial check
        handleScroll();

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const nav = document.querySelector('.nav-bar');
            const menuButton = document.querySelector('.menu-button');
            if (isMenuOpen && nav && !nav.contains(event.target as Node) && 
                menuButton && !menuButton.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Smooth scroll to section
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 100; // Increased offset to ensure section titles are clearly visible
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = window.pageYOffset + elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active section immediately for better UX
            setActiveSection(sectionId);
        }
        setIsMenuOpen(false);
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-inner">
                <h1 className="brand-name">
                    {firstName} {lastName}
                    <em> .</em>
                </h1>
                
                <button 
                    className={`menu-button ${isMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-bar ${isMenuOpen ? 'open' : ''}`}>
                    {['about', 'education', 'projects', 'tech-stack', 'contact'].map((section) => (
                        <a
                            key={section}
                            href={`#${section}`}
                            className={activeSection === section ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(section);
                            }}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;