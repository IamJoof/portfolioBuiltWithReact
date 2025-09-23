import React, { useState, useEffect } from 'react';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  highlights: string[];
  colorStart: string;
  colorEnd: string;
}

const Education: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const educationData: EducationItem[] = [
    {
      id: 'bachelor',
      degree: 'Bachelor of Science in Information Technology',
      institution: 'Cebu Technological University - Danao Campus',
      period: '2021 - 2025',
      description: 'Gained a strong foundation in web development and programming, mastering core concepts such as HTML, CSS, and JavaScript. Developed hands-on skills in various programming paradigms and software development lifecycle, preparing for real-world projects.',
      highlights: ['Web Development', 'Programming', 'HTML/CSS/JavaScript'],
      colorStart: '#FACC15',
      colorEnd: '#10B981'
    },
    {
      id: 'secondary',
      degree: 'Secondary Education (High School)',
      institution: 'Consolatrix College of Toledo City',
      period: '2010 - 2014',
      description: 'Completed a comprehensive high school curriculum with a focus on core academic subjects. Developed critical thinking and problem-solving skills, and participated in various extracurricular activities that fostered leadership and teamwork.',
      highlights: ['Critical Thinking', 'Problem Solving', 'Leadership'],
      colorStart: '#4ADE80',
      colorEnd: '#059669'
    },
    {
      id: 'elementary',
      degree: 'Primary Education (Elementary)',
      institution: 'University of Southern Philippines Foundation',
      period: '2002 - 2008',
      description: 'Cultivated fundamental skills in reading, writing, and arithmetic, which are essential for all future learning. The curriculum focused on core subjects including Filipino, English, Mathematics, and Science, providing a strong foundation for both academic and personal growth.',
      highlights: ['Reading & Writing', 'Mathematics', 'Core Subjects'],
      colorStart: '#A3E635',
      colorEnd: '#10B981'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleCards(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    educationData.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (id: string) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const sectionStyles: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#242424',
    padding: '4rem 1rem',
    position: 'relative',
    fontFamily: 'Montserrat, sans-serif'
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '4rem'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 'bold',
    background: `linear-gradient(to right, #FACC15, #10B981, #059669)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1rem'
  };

  const underlineStyles: React.CSSProperties = {
    width: '6rem',
    height: '4px',
    background: `linear-gradient(to right, #FACC15, #10B981)`,
    margin: '0 auto',
    borderRadius: '2px'
  };

  const subtitleStyles: React.CSSProperties = {
    marginTop: '1.5rem',
    color: '#D1D5DB',
    fontSize: '1.125rem',
    maxWidth: '600px',
    margin: '1.5rem auto 0'
  };

  const timelineStyles: React.CSSProperties = {
    position: 'relative'
  };

  const timelineLineStyles: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '0',
    bottom: '0',
    width: '2px',
    background: `linear-gradient(to bottom, #FACC15, #10B981, #059669)`,
    transform: 'translateX(-50%)',
    display: window.innerWidth >= 768 ? 'block' : 'none'
  };

  const getCardStyles = (edu: EducationItem, index: number): React.CSSProperties => {
    const isVisible = visibleCards.has(edu.id);
    const isHovered = hoveredCard === edu.id;
    
    return {
      position: 'relative',
      marginBottom: '3rem',
      transform: isVisible 
        ? `translateY(0) ${isHovered ? 'scale(1.05)' : 'scale(1)'}` 
        : 'translateY(50px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.8s ease-out',
      transitionDelay: `${index * 200}ms`,
      width: window.innerWidth >= 768 ? '45%' : '100%',
      marginLeft: window.innerWidth >= 768 && index % 2 === 0 ? 'auto' : '0',
      marginRight: window.innerWidth >= 768 && index % 2 === 1 ? 'auto' : '0',
      paddingLeft: window.innerWidth >= 768 && index % 2 === 0 ? '2rem' : '0',
      paddingRight: window.innerWidth >= 768 && index % 2 === 1 ? '2rem' : '0'
    };
  };

  const getCardContentStyles = (isHovered: boolean): React.CSSProperties => ({
    background: 'rgba(55, 65, 81, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    padding: '2rem',
    border: '1px solid rgba(75, 85, 99, 0.5)',
    transition: 'all 0.5s ease-out',
    boxShadow: isHovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 10px 25px -3px rgba(0, 0, 0, 0.3)',
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
    position: 'relative',
    overflow: 'hidden'
  });

  const getBadgeStyles = (edu: EducationItem, isHovered: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    background: `linear-gradient(to right, ${edu.colorStart}, ${edu.colorEnd})`,
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '1rem',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'all 0.3s ease'
  });

  const titleTextStyles: React.CSSProperties = {
    fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
    transition: 'all 0.3s ease'
  };

  const institutionStyles: React.CSSProperties = {
    fontSize: '1.125rem',
    color: '#D1D5DB',
    marginBottom: '1rem',
    fontWeight: '500'
  };

  const descriptionStyles: React.CSSProperties = {
    color: '#9CA3AF',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  };

  const highlightsContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  };

  const getHighlightStyles = (edu: EducationItem): React.CSSProperties => ({
    padding: '0.25rem 0.75rem',
    background: 'rgba(55, 65, 81, 0.6)',
    color: '#D1D5DB',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    border: '1px solid rgba(75, 85, 99, 0.6)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  });

  return (
    <section id="education" style={sectionStyles}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '-10rem',
        right: '-10rem',
        width: '20rem',
        height: '20rem',
        background: `radial-gradient(circle, ${educationData[0].colorStart}20, transparent)`,
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10rem',
        left: '-10rem',
        width: '20rem',
        height: '20rem',
        background: `radial-gradient(circle, ${educationData[1].colorStart}20, transparent)`,
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }}></div>

      <div style={containerStyles}>
        {/* Header */}
        <div style={headerStyles}>
          <h2 style={titleStyles}>Education</h2>
          <div style={underlineStyles}></div>
          <p style={subtitleStyles}>
            My academic journey and the foundations that shaped my expertise
          </p>
        </div>

        {/* Timeline */}
        <div style={timelineStyles}>
          <div style={timelineLineStyles}></div>

          {educationData.map((edu: EducationItem, index: number) => {
            const isVisible = visibleCards.has(edu.id);
            const isHovered = hoveredCard === edu.id;
            
            return (
              <div
                key={edu.id}
                id={edu.id}
                style={getCardStyles(edu, index)}
                onMouseEnter={() => handleMouseEnter(edu.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Timeline dot */}
                {window.innerWidth >= 768 && (
                  <div style={{
                    position: 'absolute',
                    left: index % 2 === 0 ? '-2.5rem' : 'calc(100% + 1.5rem)',
                    top: '2rem',
                    width: '1rem',
                    height: '1rem',
                    background: 'linear-gradient(to right, white, #E5E7EB)',
                    borderRadius: '50%',
                    border: '4px solid #1F2937',
                    zIndex: 10
                  }}></div>
                )}

                <div style={getCardContentStyles(isHovered)}>
                  {/* Period Badge */}
                  <div style={getBadgeStyles(edu, isHovered)}>
                    <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {edu.period}
                  </div>

                  {/* Content */}
                  <h3 style={{
                    ...titleTextStyles,
                    ...(isHovered ? {
                      background: `linear-gradient(to right, ${edu.colorStart}, ${edu.colorEnd})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    } : {})
                  }}>
                    {edu.degree}
                  </h3>
                  
                  <h4 style={institutionStyles}>
                    {edu.institution}
                  </h4>

                  <p style={descriptionStyles}>
                    {edu.description}
                  </p>

                  {/* Highlights */}
                  <div style={highlightsContainerStyles}>
                    {edu.highlights.map((highlight: string, idx: number) => (
                      <span
                        key={idx}
                        style={getHighlightStyles(edu)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `linear-gradient(to right, ${edu.colorStart}, ${edu.colorEnd})`;
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(55, 65, 81, 0.6)';
                          e.currentTarget.style.color = '#D1D5DB';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Decorative element */}
                  <div style={{
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '-0.5rem',
                    width: '5rem',
                    height: '5rem',
                    background: `linear-gradient(135deg, ${edu.colorStart}20, ${edu.colorEnd}20)`,
                    borderRadius: '50%',
                    opacity: 0.3,
                    transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                    transition: 'all 0.5s ease',
                    pointerEvents: 'none'
                  }}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280' }}>
            <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(to right, transparent, #6B7280)' }}></div>
            <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L3.09 8.26L12 14L20.91 8.26L12 2ZM21 16L12 22L3 16L12 10L21 16Z" />
            </svg>
            <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(to left, transparent, #6B7280)' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;