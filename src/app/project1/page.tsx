"use client";

import { useRouter } from 'next/navigation';
import { Terminal, ArrowUp, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from 'react';

export default function Projects() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const projectImages = [
    "/afbeeldingen/parallax1.png",
    "/afbeeldingen/parallax2.png",
    "/afbeeldingen/parallax3.png",
    // Voeg hier meer afbeeldingen toe
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('menu-item') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [projectImages.length]);

  return (
    <>
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: 'transparent',
          border: '2px solid #292929',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          transform: `translate(${cursorPosition.x - 10}px, ${cursorPosition.y - 10}px)`,
          transition: 'transform 0.1s ease-out, width 0.2s, height 0.2s',
          zIndex: 99999,
          mixBlendMode: 'difference',
          ...(isHovering ? {
            width: '40px',
            height: '40px',
            transform: `translate(${cursorPosition.x - 20}px, ${cursorPosition.y - 20}px)`,
          } : {})
        }}
      />

      <button 
        onClick={() => router.push('/projects')}
        style={{ 
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "transparent",
          border: "2px solid #292929",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 9999,
          transition: "all 0.3s ease",
        }} 
        className="back-button"
      >
        <ArrowLeft size={40} color="#292929" />
      </button>

      <h1 
        style={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Bruno Ace SC', cursive",
          fontSize: '8rem',
          color: '#292929',
          margin: 0,
          zIndex: 10,
          transition: 'all 0.3s ease',
          cursor: 'default',
        }} 
        className="project-title"
      >
        PROJECT 1
      </h1>

      <div 
        className="project-description"
        style={{
          position: 'absolute',
          top: '15rem',
          left: 0,
          width: '100%',
          height: '400px',
          backgroundColor: '#000000',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          color: '#ffffff'
        }}
      >
        <h2 className="project-description-title">
          Project Titel
        </h2>
        <p className="project-description-text">
          Hier komt je project beschrijving. Dit kan een korte introductie zijn over waar het project over gaat
          en welke technologieën er zijn gebruikt.
        </p>
      </div>

      <div 
        style={{
          position: 'absolute',
          top: '15rem',
          left: 0,
          width: '100%',
          height: '700px',
          zIndex: 4,
          transform: `translateY(${Math.max(0, 700 - scrollPosition)}px)`,
          transition: 'transform 0.1s ease-out',
          backgroundColor: '#000000',
        }}
      >
        <img 
          src="/afbeeldingen/eindhoven.png"
          alt="Project afbeelding"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }

        .back-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .back-button:hover {
          background-color: #292929;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(41, 41, 41, 0.3);
        }

        .back-button:hover svg {
          animation: orbitEffect 1.2s infinite;
        }

        .back-button svg {
          transition: all 0.3s ease;
        }

        @keyframes orbitEffect {
          0% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
          20% {
            transform: translateX(-20px) rotate(-20deg);
            opacity: 0;
          }
          50% {
            transform: translateX(20px) rotate(20deg);
            opacity: 0;
          }
          80% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
        }

        .project-title {
          position: relative;
        }

        .project-title:hover {
          color: #292929;
          text-shadow: 
            0 0 5px #292929,
            0 0 10px #292929,
            0 0 20px #292929;
          animation: glitch 0.5s ease-in-out infinite alternate;
        }

        @keyframes glitch {
          0% {
            transform: translateX(-50%) skew(0deg);
          }
          20% {
            transform: translateX(-50%) skew(2deg);
          }
          40% {
            transform: translateX(-50%) skew(-2deg);
          }
          60% {
            transform: translateX(-50%) skew(1deg);
          }
          80% {
            transform: translateX(-50%) skew(-1deg);
          }
          100% {
            transform: translateX(-50%) skew(0deg);
          }
        }

        @media (max-width: 768px) {
          .project-title {
            font-size:1.5rem !important;
            top: 2rem !important;
          }
        }

        .scroll-top-button:hover {
          background-color: #292929;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(41, 41, 41, 0.3);
        }

        .scroll-top-button:hover svg {
          animation: orbitEffectVertical 1.2s infinite;
        }

        .scroll-top-button svg {
          transition: all 0.3s ease;
        }

        @keyframes orbitEffectVertical {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          20% {
            transform: translateY(-20px) rotate(-20deg);
            opacity: 0;
          }
          50% {
            transform: translateY(20px) rotate(20deg);
            opacity: 0;
          }
          80% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .project-description {
            top: '10rem' !important;
            height: 300px !important;
          }
          
          .project-image-container {
            top: 4rem !important;
            height: 320px !important;
          }
          
          div[style*="height: '700px'"] {
            height: 320px !important;
          }
          
          img[alt="Project afbeelding"] {
            height: 320px !important;
            width: 100% !important;
            object-fit: cover !important;
          }
          
          .project-description h2 {
            font-size: 2rem !important;
            margin-top: -2rem !important;
          }
          
          .project-description p {
            font-size: 1rem !important;
            padding: 0 1rem !important;
          }
        }

        .tech-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .tech-button:hover {
          background-color: #292929 !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .tech-button {
            font-size: 0.9rem;
            padding: 0.6rem 1.2rem;
          }
        }

        .gallery-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .gallery-button:hover {
          background-color: #292929;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(41, 41, 41, 0.3);
        }

        .gallery-button:hover svg {
          animation: orbitEffect 1.2s infinite;
        }

        .gallery-button.right:hover svg {
          animation: orbitEffectRight 1.2s infinite;
        }

        @keyframes orbitEffectRight {
          0% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
          20% {
            transform: translateX(20px) rotate(20deg);
            opacity: 0;
          }
          50% {
            transform: translateX(-20px) rotate(-20deg);
            opacity: 0;
          }
          80% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
        }

        .gallery-button svg {
          transition: all 0.3s ease;
        }

        .footer-title-mobile {
          position: relative;
        }

        .footer-title-mobile:hover {
          color: #262626;
          text-shadow: 
            0 0 5px #262626,
            0 0 10px #262626,
            0 0 20px #262626;
          animation: footerGlitch 0.5s ease-in-out infinite alternate;
        }

        @keyframes footerGlitch {
          0% {
            transform: skew(0deg);
          }
          20% {
            transform: skew(2deg);
          }
          40% {
            transform: skew(-2deg);
          }
          60% {
            transform: skew(1deg);
          }
          80% {
            transform: skew(-1deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
      `}</style>

      <style jsx>{`
        .project-description-title {
          font-family: 'Bruno Ace SC', cursive;
          font-size: 3rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .project-description-text {
          font-family: monospace;
          font-size: 1.2rem;
          max-width: 800px;
          text-align: center;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .project-description-title {
            font-size: 2rem;
            margin-top: -8rem;
          }

          .project-description-text {
            font-size: 1rem;
            padding: 0 1rem;
          }
        }
      `}</style>

      <div>
        {/* Faded Grid */}
        <div style={{
          width: '100%',
          position: 'relative',
          backgroundColor: '#000000',
          overflowX: 'hidden',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          backgroundImage: `
            linear-gradient(rgba(38, 38, 38, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(38, 38, 38, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
        }} className="hide-scrollbar">
          {/* Overlay voor grid */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backgroundImage: `
              linear-gradient(rgba(38, 38, 38, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(38, 38, 38, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center center',
            cursor: 'crosshair',
            zIndex: 1,
          }} />

          {/* Technologie buttons container */}
          <div style={{
            position: 'relative',
            zIndex: 3,
            padding: '4rem 2rem',
            marginTop: '1100px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            opacity: scrollPosition > 700 ? 1 : 0,
            transform: `translateY(${scrollPosition > 700 ? '0' : '50px'})`,
            transition: 'opacity 1s ease, transform 1s ease',
            filter: `blur(${scrollPosition > 700 ? '0' : '10px'})`,
          }}>
            {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript'].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: '0.8rem 1.5rem',
                  border: '2px solid #292929',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="tech-button"
              >
                {tech}
              </div>
            ))}
          </div>

          <div style={{
            position: 'relative',
            zIndex: 3,
            padding: '2rem',
            marginTop: '2rem',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            opacity: scrollPosition > 850 ? 1 : 0,
            transform: `translateY(${scrollPosition > 850 ? '0' : '50px'})`,
            transition: 'opacity 1s ease, transform 1s ease',
            filter: `blur(${scrollPosition > 850 ? '0' : '10px'})`,
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '600px',
              backgroundColor: '#111111',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              <img
                src={projectImages[currentImageIndex]}
                alt={`Project afbeelding ${currentImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
              />
              
              <button
                onClick={previousImage}
                className="gallery-button"
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: "transparent",
                  border: "2px solid #292929",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  zIndex: 9999,
                  transition: "all 0.3s ease",
                }}
              >
                <ArrowLeft size={40} color="#292929" />
              </button>
              
              <button
                onClick={nextImage}
                className="gallery-button right"
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: "transparent",
                  border: "2px solid #292929",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  zIndex: 9999,
                  transition: "all 0.3s ease",
                }}
              >
                <ArrowRight size={40} color="#292929" />
              </button>

              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px',
              }}>
                {projectImages.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Nieuwe project details sectie */}
          <div style={{
            position: 'relative',
            zIndex: 3,
            padding: '4rem 2rem',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            opacity: scrollPosition > 1300 ? 1 : 0,
            transform: `translateY(${scrollPosition > 1300 ? '0' : '50px'})`,
            transition: 'opacity 1s ease, transform 1s ease',
            filter: `blur(${scrollPosition > 1300 ? '0' : '10px'})`,
          }}>
            <h3 style={{
              color: '#ffffff',
              fontFamily: "'Bruno Ace SC', cursive",
              fontSize: '2.5rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Project Details
            </h3>
            <div style={{
              color: '#ffffff',
              fontFamily: 'monospace',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              textAlign: 'justify',
              padding: '0 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p style={{ marginTop: '1.5rem' }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <div style={{
                position: 'relative',
                zIndex: 3,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                opacity: scrollPosition > 1300 ? 1 : 0,
                transform: `translateY(${scrollPosition > 1300 ? '0' : '50px'})`,
                transition: 'opacity 1s ease, transform 1s ease',
                filter: `blur(${scrollPosition > 1300 ? '0' : '10px'})`,
              }}>
                <button 
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #292929',
                    color: '#ffffff',
                    padding: '1rem 2rem',
                    fontSize: '1.2rem',
                    fontFamily: "'Bruno Ace SC', cursive",
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  className="tech-button"
                  onClick={() => router.push('/contact')}
                >
                  Get in touch
                </button>
              </div>
            </div>
          </div>

          {/* Menu Knop */}
          <button 
            className="menu-button"
            style={{ 
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "#111111",
              border: "none",
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              zIndex: 1000,
            }} 
            onClick={toggleMenu}
          >
            <Terminal size={40} color="white" />
          </button>

          {/* Menu Items */}
          {isMenuOpen && (
            <div className="fullscreen-menu">
              <ul className="menu-list">
                <li className="menu-item" onClick={() => router.push('/')}>home</li>
                <li className="menu-item" onClick={() => router.push('/about')}>about</li>
                <li className="menu-item" onClick={() => {
                  router.push('/projects');
                  setIsMenuOpen(false);
                }}>projects</li>
                <li className="menu-item" onClick={() => router.push('/contact')}>contact</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        width: '100%',
        backgroundColor: 'black',
        borderTop: '1px solid #262626',
        padding: '2rem 0',
        marginTop: 'auto',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1rem',
          position: 'relative',
          padding: '0',
          left: '-13%',
          backgroundColor: 'transparent'
        }} className="footer-content-mobile">
          <button
            onClick={scrollToTop}
            style={{
              position: 'absolute',
              right: '1rem',
              bottom: '1rem',
              background: 'transparent',
              border: '2px solid #262626',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
            }}
            className="scroll-top-button"
          >
            <ArrowUp size={24} color="#262626" />
          </button>
          <h2 
            onClick={() => router.push('/contact')}
            style={{
              color: '#262626',
              fontFamily: "'Bruno Ace SC', cursive",
              fontSize: window.innerWidth <= 768 ? '1.5rem' : '7rem',
              margin: '0 0 1rem 0',
              textAlign: 'left',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }} 
            className="footer-title-mobile"
          >
            LET'S CHAT
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}>
            <div className="status-dot"></div>
            <span style={{
              color: '#262626',
              fontFamily: 'monospace',
              fontSize: '1rem',
            }}>Available</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
            marginTop: '2rem',
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              paddingRight: '2rem',
            }}>
              <div style={{
                height: '1px',
                backgroundColor: '#262626',
                width: '100%',
                marginBottom: '1rem',
              }}></div>
              <h3 style={{
                color: '#262626',
                fontFamily: 'monospace',
                fontSize: '1.2rem',
                margin: '0.2rem 0',
              }}>Social</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                <a 
                  href="https://www.instagram.com/luc_vancasteren" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{
                    color: '#262626',
                    textDecoration: 'none',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  Instagram
                </a>
                <a href="#" style={{
                  color: '#262626',
                  textDecoration: 'none',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                }}>LinkedIn</a>
              </div>
            </div>
            <div style={{ width: '50px' }}></div>
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              paddingRight: '2rem',
            }}>
              <div style={{
                height: '1px',
                backgroundColor: '#262626',
                width: '100%',
                marginBottom: '1rem',
              }}></div>
              <h3 style={{
                color: '#262626',
                fontFamily: 'monospace',
                fontSize: '1.2rem',
                margin: '0.2rem 0',
              }}>Contact</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                <a href="#" style={{
                  color: '#262626',
                  textDecoration: 'none',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                }}>Phone</a>
                <a 
                  href="mailto:luc1708@hotmail.com" 
                  style={{
                    color: '#262626',
                    textDecoration: 'none',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}