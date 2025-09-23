import React, { useState, useEffect, useRef } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
  hoverColor: string;
  description: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      icon: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
      url: 'https://github.com/IamJoof',
      color: '#181717',
      hoverColor: '#4078c0',
      description: 'Check out my code and projects'
    },
    {
      name: 'Facebook',
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      url: 'https://www.facebook.com/JoofMacapaz',
      color: '#1877F2',
      hoverColor: '#166fe5',
      description: 'Connect on Facebook'
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = ['contact-header', 'contact-info', 'contact-form', 'social-links'];
    elements.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call (replace with your actual email service)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the email using services like:
      // - EmailJS
      // - Netlify Forms
      // - Your backend API
      
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status and button after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setIsSubmitting(false);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      // Reset error status and button after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setIsSubmitting(false);
      }, 5000);
    }
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  return (
    <section 
      id="contact"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#242424',
        padding: 'clamp(2rem, 8vw, 4rem) clamp(1rem, 4vw, 2rem)',
        fontFamily: 'Montserrat, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-15rem',
        width: '30rem',
        height: '30rem',
        background: 'radial-gradient(circle, rgba(250, 204, 21, 0.08), transparent)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-15rem',
        width: '25rem',
        height: '25rem',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08), transparent)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div 
          id="contact-header"
          style={{ 
            textAlign: 'center', 
            marginBottom: 'clamp(3rem, 8vw, 5rem)',
            opacity: visibleElements.has('contact-header') ? 1 : 0,
            transform: visibleElements.has('contact-header') ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #FACC15, #10B981, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            Let's Work Together
          </h2>
          <div style={{
            width: '8rem',
            height: '4px',
            background: 'linear-gradient(to right, #FACC15, #10B981)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
          <p style={{
            marginTop: '1.5rem',
            color: '#D1D5DB',
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            maxWidth: '700px',
            margin: '1.5rem auto 0',
            lineHeight: '1.6'
          }}>
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 6vw, 4rem)',
          alignItems: 'start'
        }}>
          {/* Contact Info & Social Links */}
          <div>
            {/* Contact Information */}
            <div 
              id="contact-info"
              style={{
                background: 'rgba(55, 65, 81, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                padding: '2rem',
                border: '1px solid rgba(75, 85, 99, 0.5)',
                marginBottom: '2rem',
                opacity: visibleElements.has('contact-info') ? 1 : 0,
                transform: visibleElements.has('contact-info') ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
              }}
            >
              <h3 style={{
                color: 'white',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                background: 'linear-gradient(to right, #FACC15, #10B981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Get In Touch
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #FACC15, #10B981)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: '#D1D5DB', fontSize: '0.875rem', margin: 0 }}>Email</p>
                    <p style={{ color: 'white', fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                      jfmacapaz@gmail.com
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: '#D1D5DB', fontSize: '0.875rem', margin: 0 }}>Location</p>
                    <p style={{ color: 'white', fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                      Cebu City, Philippines
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: '#D1D5DB', fontSize: '0.875rem', margin: 0 }}>Response Time</p>
                    <p style={{ color: 'white', fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div 
              id="social-links"
              style={{
                opacity: visibleElements.has('social-links') ? 1 : 0,
                transform: visibleElements.has('social-links') ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
              }}
            >
              <h4 style={{
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                Connect With Me
              </h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'rgba(55, 65, 81, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '1rem',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      opacity: 0,
                      animation: `socialSlideIn 0.6s ease-out forwards ${index * 0.1 + 0.5}s`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 10px 30px ${social.color}40`;
                      e.currentTarget.style.borderColor = social.color + '80';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                    }}
                  >
                    <div style={{
                      width: '45px',
                      height: '45px',
                      background: social.color,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 15px ${social.color}40`,
                      flexShrink: 0
                    }}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d={social.icon} />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: '600',
                        margin: 0,
                        marginBottom: '0.25rem'
                      }}>
                        {social.name}
                      </p>
                      <p style={{
                        color: '#D1D5DB',
                        fontSize: '0.875rem',
                        margin: 0
                      }}>
                        {social.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            id="contact-form"
            style={{
              background: 'rgba(55, 65, 81, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem',
              padding: '2rem',
              border: '1px solid rgba(75, 85, 99, 0.5)',
              opacity: visibleElements.has('contact-form') ? 1 : 0,
              transform: visibleElements.has('contact-form') ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
            }}
          >
            <h3 style={{
              color: 'white',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              background: 'linear-gradient(to right, #10B981, #FACC15)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Send Message
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {/* Name Input */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(75, 85, 99, 0.6)',
                      border: `2px solid ${focusedField === 'name' ? '#10B981' : 'rgba(107, 114, 128, 0.5)'}`,
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Your Name"
                  />
                  <label style={{
                    position: 'absolute',
                    top: formData.name || focusedField === 'name' ? '-0.5rem' : '1rem',
                    left: '1rem',
                    background: formData.name || focusedField === 'name' ? '#242424' : 'transparent',
                    padding: '0 0.5rem',
                    color: focusedField === 'name' ? '#10B981' : '#9CA3AF',
                    fontSize: formData.name || focusedField === 'name' ? '0.875rem' : '1rem',
                    transition: 'all 0.3s ease',
                    pointerEvents: 'none'
                  }}>
                    {formData.name || focusedField === 'name' ? 'Name' : ''}
                  </label>
                </div>

                {/* Email Input */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'rgba(75, 85, 99, 0.6)',
                      border: `2px solid ${focusedField === 'email' ? '#10B981' : 'rgba(107, 114, 128, 0.5)'}`,
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Your Email"
                  />
                  <label style={{
                    position: 'absolute',
                    top: formData.email || focusedField === 'email' ? '-0.5rem' : '1rem',
                    left: '1rem',
                    background: formData.email || focusedField === 'email' ? '#242424' : 'transparent',
                    padding: '0 0.5rem',
                    color: focusedField === 'email' ? '#10B981' : '#9CA3AF',
                    fontSize: formData.email || focusedField === 'email' ? '0.875rem' : '1rem',
                    transition: 'all 0.3s ease',
                    pointerEvents: 'none'
                  }}>
                    {formData.email || focusedField === 'email' ? 'Email' : ''}
                  </label>
                </div>
              </div>

              {/* Subject Input */}
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(75, 85, 99, 0.6)',
                    border: `2px solid ${focusedField === 'subject' ? '#10B981' : 'rgba(107, 114, 128, 0.5)'}`,
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Subject"
                />
                <label style={{
                  position: 'absolute',
                  top: formData.subject || focusedField === 'subject' ? '-0.5rem' : '1rem',
                  left: '1rem',
                  background: formData.subject || focusedField === 'subject' ? '#242424' : 'transparent',
                  padding: '0 0.5rem',
                  color: focusedField === 'subject' ? '#10B981' : '#9CA3AF',
                  fontSize: formData.subject || focusedField === 'subject' ? '0.875rem' : '1rem',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none'
                }}>
                  {formData.subject || focusedField === 'subject' ? 'Subject' : ''}
                </label>
              </div>

              {/* Message Textarea */}
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(75, 85, 99, 0.6)',
                    border: `2px solid ${focusedField === 'message' ? '#10B981' : 'rgba(107, 114, 128, 0.5)'}`,
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '120px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Your message..."
                />
                <label style={{
                  position: 'absolute',
                  top: formData.message || focusedField === 'message' ? '-0.5rem' : '1rem',
                  left: '1rem',
                  background: formData.message || focusedField === 'message' ? '#242424' : 'transparent',
                  padding: '0 0.5rem',
                  color: focusedField === 'message' ? '#10B981' : '#9CA3AF',
                  fontSize: formData.message || focusedField === 'message' ? '0.875rem' : '1rem',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none'
                }}>
                  {formData.message || focusedField === 'message' ? 'Message' : ''}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  background: isFormValid && !isSubmitting 
                    ? 'linear-gradient(to right, #FACC15, #10B981)' 
                    : 'rgba(107, 114, 128, 0.5)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (isFormValid && !isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(250, 204, 21, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isFormValid && !isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22,2 15,22 11,13 2,9"></polygon>
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.5)',
                  borderRadius: '0.75rem',
                  color: '#10B981',
                  textAlign: 'center',
                  animation: 'successFadeIn 0.5s ease-out'
                }}>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  borderRadius: '0.75rem',
                  color: '#EF4444',
                  textAlign: 'center',
                  animation: 'errorFadeIn 0.5s ease-out'
                }}>
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          marginTop: 'clamp(3rem, 8vw, 5rem)',
          padding: '2rem',
          background: 'rgba(55, 65, 81, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(75, 85, 99, 0.3)'
        }}>
          <h4 style={{
            color: 'white',
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Ready to start a project?
          </h4>
          <p style={{
            color: '#D1D5DB',
            fontSize: 'clamp(0.875rem, 3vw, 1rem)',
            marginBottom: '1.5rem'
          }}>
            Whether it's a website, web application, or custom software solution, 
            I'm here to bring your ideas to life with clean, modern code.
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <a
              href="mailto:jfmacapaz@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(to right, #FACC15, #10B981)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(250, 204, 21, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Email Me
            </a>
            <a
              href="tel:+639083536847"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(55, 65, 81, 0.6)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                border: '1px solid rgba(75, 85, 99, 0.5)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(75, 85, 99, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(55, 65, 81, 0.6)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call Me
            </a>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes successFadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes errorFadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes socialSlideIn {
          0% { 
            opacity: 0; 
            transform: translateX(-30px);
          }
          100% { 
            opacity: 1; 
            transform: translateX(0);
          }
        }
        
        /* Form field animations */
        input:focus, textarea:focus {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 8px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 4px;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.6);
          border-radius: 4px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.8);
        }
      `}</style>
    </section>
  );
};

export default Contact;