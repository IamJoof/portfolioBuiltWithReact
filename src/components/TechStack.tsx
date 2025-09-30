import React, { useState, useEffect, useRef } from 'react';

interface TechStack {
  name: string;
  category: string;
  icon?: string;
  color: string;
  description: string;
}

const TechStack: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [displayedTechs, setDisplayedTechs] = useState<TechStack[]>([]);
  const [selectedTech, setSelectedTech] = useState<TechStack | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const techStacks: TechStack[] = [
    // Frontend
    { 
      name: 'React', 
      category: 'Frontend', 
      color: '#61DAFB',
      description: 'A JavaScript library for building user interfaces with component-based architecture.',
    },
    { 
      name: 'TypeScript', 
      category: 'Frontend', 
      color: '#3178C6',
      description: 'Typed superset of JavaScript that compiles to plain JavaScript.',
    },
    { 
      name: 'JavaScript', 
      category: 'Frontend', 
      color: '#F7DF1E',
      description: 'Dynamic programming language for web development and interactive user interfaces.',
    },
    { 
      name: 'Tailwind CSS', 
      category: 'Frontend', 
      color: '#06B6D4',
      description: 'Utility-first CSS framework for rapidly building custom user interfaces.',
    },
    // Backend
    { 
      name: 'Laravel', 
      category: 'Backend', 
      color: '#FF2D20',
      description: 'PHP web application framework with expressive, elegant syntax.',
    },
    { 
      name: 'PHP', 
      category: 'Backend', 
      color: '#777BB4',
      description: 'Server-side scripting language designed for web development.',
    },
    { 
      name: 'Java', 
      category: 'Backend', 
      color: '#ED8B00',
      description: 'Object-oriented programming language for enterprise applications.',
    },

    // Database
    { 
      name: 'MySQL', 
      category: 'Database', 
      color: '#4479A1',
      description: 'Open-source relational database management system. Popular database utilized by industries aside from MongoDB',
    },

    // Tools
    { 
      name: 'Git', 
      category: 'Tools', 
      color: '#F05032',
      description: 'Distributed version control system for tracking changes in source code.',
    },
    { 
      name: 'GitHub', 
      category: 'Tools', 
      color: '#181717',
      description: 'Web-based platform for version control and collaboration.',
    },
    { 
      name: 'VS Code', 
      category: 'Tools', 
      color: '#007ACC',
      description: 'Lightweight but powerful source code editor with rich ecosystem.',
    },
    { 
      name: 'Postman', 
      category: 'Tools', 
      color: '#FF6C37',
      description: 'API platform for building and using APIs with testing capabilities.',
    },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * 100);
          } else {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * 300);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
      card.setAttribute('data-index', index.toString());
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [displayedTechs]);

  // Filter function
  const filterTechStacks = (category: string): TechStack[] => {
    if (category === 'All') {
      return [...techStacks];
    }
    return techStacks.filter(tech => 
      tech.category.toLowerCase() === category.toLowerCase()
    );
  };

  // Update displayed techs when filter changes
  useEffect(() => {
    setVisibleItems(new Set()); // Reset visible items
    const filtered = filterTechStacks(activeFilter);
    setDisplayedTechs(filtered);
  }, [activeFilter]);

  // Initialize on mount
  useEffect(() => {
    setDisplayedTechs([...techStacks]);
  }, []);

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
    setSelectedTech(null); // Close modal when filtering
  };

  const handleTechClick = (tech: TechStack) => {
    setSelectedTech(tech);
  };

  const closeModal = () => {
    setSelectedTech(null);
  };



  return (
    <section 
      id="tech-stack"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#242424',
        padding: 'clamp(2rem, 8vw, 4rem) clamp(1rem, 4vw, 2rem)',
        fontFamily: 'Montserrat, sans-serif',
        position: 'relative'
      }}
    >
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-10rem',
        width: '20rem',
        height: '20rem',
        background: 'radial-gradient(circle, rgba(97, 218, 251, 0.1), transparent)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '-10rem',
        width: '15rem',
        height: '15rem',
        background: 'radial-gradient(circle, rgba(250, 204, 21, 0.1), transparent)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #FACC15, #10B981, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            Tech Stack
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
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            maxWidth: '600px',
            margin: '1.5rem auto 0'
          }}>
            Technologies I use to bring ideas to life. Click on any tech to learn more!
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '3rem',
          padding: '0 1rem'
        }}>
          {categories.map((category) => {
            const count = category === 'All' 
              ? techStacks.length 
              : techStacks.filter(tech => tech.category === category).length;
            
            return (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  border: 'none',
                  background: activeFilter === category 
                    ? 'linear-gradient(to right, #FACC15, #10B981)' 
                    : 'rgba(55, 65, 81, 0.6)',
                  color: 'white',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  minHeight: '44px',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== category) {
                    e.currentTarget.style.background = 'rgba(75, 85, 99, 0.8)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px -3px rgba(0, 0, 0, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== category) {
                    e.currentTarget.style.background = 'rgba(55, 65, 81, 0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {category}
                <span style={{
                  marginLeft: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem'
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tech Stack Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          padding: '0',
          marginBottom: '2rem'
        }}>
          {displayedTechs.map((tech, index) => {
            const isVisible = visibleItems.has(index);
            
            return (
              <div
                key={`${tech.name}-${tech.category}`}
                className="tech-card"
                onClick={() => handleTechClick(tech)}
                style={{
                  background: 'rgba(55, 65, 81, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  border: '1px solid rgba(75, 85, 99, 0.5)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  minHeight: '140px',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 20px 40px -10px ${tech.color}30`;
                  e.currentTarget.style.borderColor = tech.color + '80';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                }}
              >
                {/* Subtle background pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60px',
                  height: '60px',
                  background: `radial-gradient(circle, ${tech.color}15, transparent)`,
                  borderRadius: '50%',
                  transform: 'translate(20px, -20px)'
                }}></div>

                {/* Tech Icon */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${tech.color}, ${tech.color}CC)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: tech.color === '#F7DF1E' || tech.color === '#FACC15' ? '#000' : '#fff',
                  boxShadow: `0 8px 25px ${tech.color}40`,
                  position: 'relative',
                  zIndex: 2
                }}>
                  {tech.name.charAt(0)}
                </div>

                {/* Tech Name */}
                <span style={{
                  color: 'white',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {tech.name}
                </span>

                {/* Proficiency Bar */}
                <div style={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(55, 65, 81, 0.8)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                </div>

                {/* Category Badge */}
                <span style={{
                  background: tech.color + '20',
                  color: tech.color,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  border: `1px solid ${tech.color}40`,
                  position: 'relative',
                  zIndex: 2
                }}>
                  {tech.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Detail Modal */}
      {selectedTech && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'modalFadeIn 0.3s ease-out'
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: 'rgba(55, 65, 81, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              border: `2px solid ${selectedTech.color}40`,
              position: 'relative',
              animation: 'modalSlideIn 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(75, 85, 99, 0.6)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '60px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(75, 85, 99, 0.6)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>

            {/* Modal Content */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${selectedTech.color}, ${selectedTech.color}CC)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: selectedTech.color === '#F7DF1E' || selectedTech.color === '#FACC15' ? '#000' : '#fff',
                boxShadow: `0 10px 30px ${selectedTech.color}40`,
                margin: '0 auto 1rem'
              }}>
                {selectedTech.name.charAt(0)}
              </div>
              
              <h3 style={{
                color: 'white',
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {selectedTech.name}
              </h3>
              
              <span style={{
                background: selectedTech.color + '20',
                color: selectedTech.color,
                padding: '0.5rem 1rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: `1px solid ${selectedTech.color}40`
              }}>
                {selectedTech.category}
              </span>
            </div>

            <p style={{
              color: '#D1D5DB',
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              fontSize: '1rem'
            }}>
              {selectedTech.description}
            </p>

            {/* Proficiency */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
              </div>
              
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(55, 65, 81, 0.8)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .tech-card:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default TechStack;