"use client";

import { useRouter } from 'next/navigation';
import { Terminal, ArrowUp } from "lucide-react";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Projects() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          left: cursorPosition.x,
          top: cursorPosition.y,
          width: isHovering ? '50px' : '20px',
          height: isHovering ? '50px' : '20px',
          backgroundColor: 'transparent',
          border: '2px solid #292929',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      
      <div>
        <div style={{
          height: '120vh',
          width: '100%',
          position: 'relative',
          backgroundColor: '#000000',
          overflowX: 'auto',
          overflowY: 'auto',
          minWidth: '100vw',
          maxWidth: '2500px',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          backgroundImage: `
            linear-gradient(rgba(38, 38, 38, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(38, 38, 38, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
        }} className="hide-scrollbar">
          <div style={{
            position: 'relative',
          }}>
            <Link href="/project1">
              <img 
                src="/afbeeldingen/eindhoven.png"
                alt="Logo"
                style={{
                  position: 'absolute',
                  top: '200px',
                  left: '300px',
                  width: '400px',
                  height: '400px',
                  zIndex: 1000,
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  cursor: 'pointer',
                  filter: 'brightness(100%)',
                }}
                className="first-project-image project-image"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.filter = 'brightness(20%)';
                  e.currentTarget.nextElementSibling?.classList.add('visible');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'brightness(100%)';
                  e.currentTarget.nextElementSibling?.classList.remove('visible');
                }}
              />
              <div style={{
                position: 'absolute',
                top: '350px',
                left: '300px',
                width: '400px',
                textAlign: 'center',
                color: 'white',
                zIndex: 1001,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                fontFamily: "'Bruno Ace SC', cursive",
              }} className="hover-text">
                <h2 style={{ fontSize: '2.5rem', margin: '0' }}>Project Titel</h2>
                <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Projectbeschrijving hier</p>
              </div>
            </Link>
          </div>

          <div style={{
            position: 'relative',
          }}>
            <img 
              src="/afbeeldingen/eindhoven.png"
              alt="Logo"
              style={{
                position: 'absolute',
                top: '700px',
                left: '800px',
                width: '300px',
                height: '300px',
                zIndex: 1000,
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
                cursor: 'pointer',
                filter: 'brightness(100%)',
              }}
              className="second-project-image project-image"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.filter = 'brightness(20%)';
                e.currentTarget.nextElementSibling?.classList.add('visible');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(100%)';
                e.currentTarget.nextElementSibling?.classList.remove('visible');
              }}
            />
            <div style={{
              position: 'absolute',
              top: '800px',
              left: '800px',
              width: '300px',
              textAlign: 'center',
              color: 'white',
              zIndex: 1001,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              fontFamily: "'Bruno Ace SC', cursive",
            }} className="hover-text">
              <h2 style={{ fontSize: '2.5rem', margin: '0' }}>Project Titel 2</h2>
              <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Projectbeschrijving hier</p>
            </div>
          </div>

          <div style={{
            position: 'relative',
          }}>
            <img 
              src="/afbeeldingen/eindhoven.png"
              alt="Logo"
              style={{
                position: 'absolute',
                top: '300px',
                left: '1500px',
                width: '500px',
                height: '500px',
                zIndex: 1000,
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
                cursor: 'pointer',
                filter: 'brightness(100%)',
              }}
              className="third-project-image project-image"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.filter = 'brightness(20%)';
                e.currentTarget.nextElementSibling?.classList.add('visible');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(100%)';
                e.currentTarget.nextElementSibling?.classList.remove('visible');
              }}
            />
            <div style={{
              position: 'absolute',
              top: '400px',
              left: '1500px',
              width: '500px',
              textAlign: 'center',
              color: 'white',
              zIndex: 1001,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              fontFamily: "'Bruno Ace SC', cursive",
            }} className="hover-text">
              <h2 style={{ fontSize: '2.5rem', margin: '0' }}>Project Titel 3</h2>
              <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Projectbeschrijving hier</p>
            </div>
          </div>

          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '2500px',
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

          <div style={{
            position: 'absolute',
            top: '20%',
            left: '900px',
            transform: 'translateY(-50%)',
            color: '#292929',
            fontFamily: "'Bruno Ace SC', cursive",
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 10,
          }} className="scroll-indicator">
            Scroll 
            <div style={{
              width: '40px',
              height: '20px',
              border: '2px solid #292929',
              borderRadius: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                backgroundColor: '#292929',
                borderRadius: '50%',
                top: '50%',
                transform: 'translateY(-50%)',
                animation: 'scrollDot 3s infinite',
              }} />
            </div>
          </div>

          <style jsx>{`
            @keyframes scrollDot {
              0% {
                left: 4px;
              }
              40% {
                left: 32px;
              }
              45% {
                left: 32px;
              }
              46% {
                left: 4px;
              }
              100% {
                left: 4px;
              }
            }

            @media (hover: none) and (pointer: coarse) {
              img:hover {
                transform: scale(1) !important;
                filter: brightness(100%) !important;
              }
              
              .hover-text {
                display: block !important;
                opacity: 1 !important;
              }

              :global(.first-project-image) {
                left: 50px !important;
                width: 300px !important;
                height: 300px !important;
              }

              :global(.second-project-image) {
                left: 400px !important;
                top: 200px !important;
                width: 300px !important;
                height: 300px !important;
              }

              :global(.third-project-image) {
                left: 750px !important;
                top: 200px !important;
                width: 300px !important;
                height: 300px !important;
              }

              :global(.scroll-indicator) {
                left: 50px !important;
              }

              :global(.first-project-image),
              :global(.second-project-image),
              :global(.third-project-image) {
                filter: brightness(20%) !important;
              }

              :global(.first-project-image + .hover-text) {
                top: 300px !important;
                left: 50px !important;
                width: 300px !important;
              }

              :global(.second-project-image + .hover-text) {
                top: 300px !important;
                left: 400px !important;
                width: 300px !important;
              }

              :global(.third-project-image + .hover-text) {
                top: 300px !important;
                left: 750px !important;
                width: 300px !important;
              }

              :global(.first-project-image + .hover-text),
              :global(.second-project-image + .hover-text),
              :global(.third-project-image + .hover-text) {
                h2 {
                  font-size: 1.5rem !important;
                }
                
                p {
                  font-size: 1rem !important;
                  margin-top: 0.5rem !important;
                }
              }

              :global(.fullscreen-menu) {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background-color: black !important;
                z-index: 1500 !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
              }

              :global(.menu-button) {
                z-index: 2000 !important;
              }

              :global(.fullscreen-menu ~ *:not(.menu-button):not(.fullscreen-menu)) {
                display: none !important;
              }
            }

            .neon-text {
              text-shadow: none;
              transition: all 0.3s ease !important;
            }

            .neon-text:hover {
              color: #fff !important;
              text-shadow: 
                0 0 5px #fff,
                0 0 10px #fff,
                0 0 20px #fff,
                0 0 40px #0ff,
                0 0 80px #0ff,
                0 0 90px #0ff,
                0 0 100px #0ff,
                0 0 150px #0ff;
              animation: glitch-neon 0.2s ease-in-out infinite alternate;
            }

            @keyframes glitch-neon {
              0% {
                opacity: 1;
                transform: skew(-2deg);
              }
              25% {
                opacity: 0.8;
                transform: skew(2deg);
              }
              50% {
                opacity: 0.9;
                transform: skew(-1deg);
              }
              75% {
                opacity: 0.7;
                transform: skew(3deg);
              }
              100% {
                opacity: 1;
                transform: skew(0deg);
              }
            }

            .scroll-top-button:hover {
              background-color: #262626;
              transform: scale(1.1);
              box-shadow: 0 0 15px rgba(41, 41, 41, 0.3);
            }

            .scroll-top-button:hover .arrow-icon {
              color: white !important;
              animation: orbitEffectVertical 1.2s infinite;
            }

            .arrow-icon {
              transition: all 0.3s ease;
            }

            @keyframes orbitEffectVertical {
              0% {
                transform: translateY(0);
                opacity: 1;
              }
              20% {
                transform: translateY(-20px);
                opacity: 0;
              }
              50% {
                transform: translateY(20px);
                opacity: 0;
              }
              80% {
                transform: translateY(0);
                opacity: 1;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </div>

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
            <ArrowUp size={24} color="#262626" className="arrow-icon" />
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
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }} 
            className="neon-text"
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