import React, { useState, useEffect } from 'react';

interface ProjectItem {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    liveLink?: string;
    githubLink?: string;
    colorStart: string;
    colorEnd: string;
}

const Projects: React.FC = () => {
    const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set());
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    const projectsData: ProjectItem[] = [
        {
            id: 'portfolio',
            title: 'Personal Portfolio',
            description: 'A modern, responsive portfolio website built with React and TypeScript. Features smooth animations, interactive elements, and a clean design that showcases my work effectively.',
            technologies: ['React', 'TypeScript', 'CSS3', 'Vite'],
            image: '/project-portfolio.png',
            colorStart: '#FACC15',
            colorEnd: '#10B981'
        },
        {
            id: 'project2',
            title: 'ApplianceZone',
            description: 'ApplianceZone is a comprehensive e-commerce dashboard with real-time analytics, inventory management, and sales tracking. Built with modern web technologies and best practices.',
            technologies: ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL','CSS3','JavaScript'],
            image: '/project-ecommerce.png',
            colorStart: '#4ADE80',
            colorEnd: '#059669'
        },
        {
            id: 'project3',
            title: 'STLCFI Tuition Tracker',
            description: 'A comprehensive school fee management system built with Laravel, designed to track and manage student payments, fees, and ledgers efficiently.',
            technologies: ['Laravel', 'PHP', 'MySQL','CSS3', 'Tailwind CSS','JavaScript'],
            image: '/project-taskmanager.png',
            colorStart: '#A3E635',
            colorEnd: '#10B981'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id) {
                        setVisibleProjects(prev => new Set([...prev, entry.target.id]));
                    }
                });
            },
            {
                threshold: 0.1, // Reduced threshold for mobile
                rootMargin: '0px 0px -50px 0px' // Reduced margin for mobile
            }
        );

        const projectElements = document.querySelectorAll('.project-card');
        projectElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleMouseEnter = (id: string) => setHoveredProject(id);
    const handleMouseLeave = () => setHoveredProject(null);

    return (
        <section 
            id="projects"
            style={{
                minHeight: '100vh',
                backgroundColor: '#242424',
                padding: 'clamp(2rem, 8vw, 4rem) clamp(1rem, 4vw, 2rem)', // Responsive padding
                position: 'relative',
                fontFamily: 'Montserrat, sans-serif'
            }}
        >
            {/* Background decorations - Hidden on very small screens */}
            <div style={{
                position: 'absolute',
                top: '-10rem',
                right: '-10rem',
                width: '20rem',
                height: '20rem',
                background: 'radial-gradient(circle, rgba(250, 204, 21, 0.1), transparent)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                display: window.innerWidth < 480 ? 'none' : 'block' // Hide on very small screens
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-10rem',
                left: '-10rem',
                width: '20rem',
                height: '20rem',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                display: window.innerWidth < 480 ? 'none' : 'block' // Hide on very small screens
            }}></div>

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
                width: '100%' // Ensure full width on mobile
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 8vw, 4rem)', // More aggressive mobile scaling
                        fontWeight: 'bold',
                        background: 'linear-gradient(to right, #FACC15, #10B981, #059669)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '1rem'
                    }}>
                        Projects
                    </h2>
                    <div style={{
                        width: '6rem',
                        height: '4px',
                        background: 'linear-gradient(to right, #FACC15, #10B981)',
                        margin: '0 auto',
                        borderRadius: '2px'
                    }}></div>
                    <p style={{
                        marginTop: '1.5rem',
                        color: '#D1D5DB',
                        fontSize: 'clamp(1rem, 3vw, 1.125rem)', // Responsive font size
                        maxWidth: '600px',
                        margin: '1.5rem auto 0',
                        padding: '0 1rem' // Add padding for very small screens
                    }}>
                        Here are some of my recent projects that showcase my skills and experience
                    </p>
                </div>

                {/* Projects Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Reduced min-width for mobile
                    gap: 'clamp(1rem, 4vw, 2rem)', // Responsive gap
                    padding: '0', // Remove padding that might cause overflow
                    width: '100%'
                }}>
                    {projectsData.map((project, index) => {
                        const isVisible = visibleProjects.has(project.id);
                        const isHovered = hoveredProject === project.id;
                        const isMobile = window.innerWidth <= 768;

                        return (
                            <div
                                key={project.id}
                                id={project.id}
                                className="project-card"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible 
                                        ? `translateY(0) ${isHovered && !isMobile ? 'scale(1.02)' : 'scale(1)'}` 
                                        : 'translateY(30px)', // Reduced transform distance for mobile
                                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Faster animation for mobile
                                    transitionDelay: isMobile ? `${index * 100}ms` : `${index * 200}ms`, // Faster stagger on mobile
                                    width: '100%', // Ensure full width
                                    minWidth: 0 // Prevent flex shrinking issues
                                }}
                                onMouseEnter={() => !isMobile && handleMouseEnter(project.id)} // Disable hover on mobile
                                onMouseLeave={handleMouseLeave}
                            >
                                <div style={{
                                    background: 'rgba(55, 65, 81, 0.6)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '1rem',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(75, 85, 99, 0.5)',
                                    transition: 'all 0.3s ease-out',
                                    boxShadow: isHovered && !isMobile
                                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                                        : '0 10px 25px -3px rgba(0, 0, 0, 0.3)',
                                    width: '100%'
                                }}>
                                    {/* Project Image Container */}
                                    <div style={{
                                        position: 'relative',
                                        paddingBottom: '56.25%', // 16:9 aspect ratio
                                        background: `linear-gradient(to right, ${project.colorStart}, ${project.colorEnd})`,
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: `url(${project.image || '/placeholder.png'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            transition: 'transform 0.5s ease-out',
                                            transform: isHovered && !isMobile ? 'scale(1.1)' : 'scale(1)' // Disable on mobile
                                        }} />
                                    </div>

                                    {/* Project Content */}
                                    <div style={{ 
                                        padding: 'clamp(1rem, 3vw, 1.5rem)', // Responsive padding
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}>
                                        <h3 style={{
                                            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', // Responsive title size
                                            fontWeight: 'bold',
                                            marginBottom: '1rem',
                                            color: 'white',
                                            background: isHovered && !isMobile
                                                ? `linear-gradient(to right, ${project.colorStart}, ${project.colorEnd})` 
                                                : 'none',
                                            WebkitBackgroundClip: isHovered && !isMobile ? 'text' : 'unset',
                                            WebkitTextFillColor: isHovered && !isMobile ? 'transparent' : 'white',
                                            backgroundClip: 'text',
                                            transition: 'all 0.3s ease',
                                            wordBreak: 'break-word' // Prevent title overflow
                                        }}>
                                            {project.title}
                                        </h3>

                                        <p style={{
                                            color: '#D1D5DB',
                                            marginBottom: '1.5rem',
                                            lineHeight: '1.6',
                                            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', // Responsive text size
                                            wordBreak: 'break-word' // Prevent text overflow
                                        }}>
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '0.5rem',
                                            marginBottom: '1.5rem'
                                        }}>
                                            {project.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        padding: '0.25rem 0.5rem', // Slightly reduced padding for mobile
                                                        background: 'rgba(55, 65, 81, 0.6)',
                                                        color: '#D1D5DB',
                                                        borderRadius: '9999px',
                                                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', // Responsive tech tag size
                                                        border: '1px solid rgba(75, 85, 99, 0.6)',
                                                        transition: 'all 0.3s ease',
                                                        whiteSpace: 'nowrap' // Prevent text wrapping in tags
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap', // Allow wrapping on very small screens
                                            gap: '0.75rem', // Slightly larger gap for mobile
                                            marginTop: 'auto'
                                        }}>
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(0.75rem, 3vw, 1rem)', // Responsive button padding
                                                        borderRadius: '0.5rem',
                                                        background: 'rgba(55, 65, 81, 0.6)',
                                                        color: 'white',
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        transition: 'all 0.3s ease',
                                                        border: '1px solid rgba(75, 85, 99, 0.6)',
                                                        fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', // Responsive button text
                                                        minHeight: '44px', // Minimum touch target size
                                                        flex: isMobile ? '1 1 auto' : 'none' // Flexible on mobile
                                                    }}
                                                >
                                                    <svg
                                                        height="20"
                                                        width="20"
                                                        viewBox="0 0 16 16"
                                                        fill="currentColor"
                                                        style={{ flexShrink: 0 }} // Prevent icon shrinking
                                                    >
                                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                                                    </svg>
                                                    GitHub
                                                </a>
                                            )}
                                            {project.liveLink && (
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(0.75rem, 3vw, 1rem)', // Responsive button padding
                                                        borderRadius: '0.5rem',
                                                        background: `linear-gradient(to right, ${project.colorStart}, ${project.colorEnd})`,
                                                        color: 'white',
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        transition: 'all 0.3s ease',
                                                        fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', // Responsive button text
                                                        minHeight: '44px', // Minimum touch target size
                                                        flex: isMobile ? '1 1 auto' : 'none' // Flexible on mobile
                                                    }}
                                                >
                                                    <svg
                                                        height="20"
                                                        width="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        style={{ flexShrink: 0 }} // Prevent icon shrinking
                                                    >
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                        <polyline points="15 3 21 3 21 9" />
                                                        <line x1="10" y1="14" x2="21" y2="3" />
                                                    </svg>
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;