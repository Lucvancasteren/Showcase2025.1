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
  const [fontSize, setFontSize] = useState('7rem');
  const [footerHackedText, setFooterHackedText] = useState('LET\'S CHAT');
  const [isFooterHacking, setIsFooterHacking] = useState(false);
  const [menuItemHackText, setMenuItemHackText] = useState('');
  const [isMenuItemHacking, setIsMenuItemHacking] = useState(false);
  const [hackedItems, setHackedItems] = useState({});
  const [currentPath, setCurrentPath] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
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
    setFontSize(window.innerWidth <= 768 ? '3rem' : '7rem');
    
    const handleResize = () => {
      setFontSize(window.innerWidth <= 768 ? '3rem' : '7rem');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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

  const startFooterHack = () => {
    if (isFooterHacking) return;
    setIsFooterHacking(true);
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    let hackInterval = setInterval(() => {
      const randomText = Array(9)
        .fill()
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('');
      setFooterHackedText(randomText);
    }, 50);

    setTimeout(() => {
      clearInterval(hackInterval);
      setFooterHackedText('LET\'S CHAT');
      setIsFooterHacking(false);
    }, 250);
  };

  const stopFooterHack = () => {
    if (!isFooterHacking) {
      setFooterHackedText('LET\'S CHAT');
    }
  };

  const startMenuItemHack = (originalText) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    let iterations = 0;
    const maxIterations = 3;
    
    const hackInterval = setInterval(() => {
      iterations++;
      const randomText = Array(originalText.length)
        .fill()
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('');
      
      setHackedItems(prev => ({
        ...prev,
        [originalText]: randomText
      }));
      
      if (iterations >= maxIterations) {
        clearInterval(hackInterval);
        setHackedItems(prev => ({
          ...prev,
          [originalText]: originalText
        }));
      }
    }, 100);
  };

  const getProjectImageStyle = (top, left, width, height, isMobile) => ({
    position: isMobile ? 'relative' : 'absolute',
    top: isMobile ? '200px' : `${top}px`,
    left: isMobile ? '50%' : `${left}px`,
    width: isMobile ? '80vw' : `${width}px`,
    height: isMobile ? '80vw' : `${height}px`,
    transform: isMobile ? 'translateX(-50%)' : 'none',
    marginBottom: isMobile ? '1px' : '0',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    filter: 'brightness(100%)',
  });

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
          zIndex: 9998,
        }}
      />
      
      <div>
        <div style={{
          position: 'fixed',
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
            zIndex: 10000,
            transition: "transform 0.3s ease, background-color 0.3s ease",
          }} 
          onClick={toggleMenu}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.backgroundColor = "#292929";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "#111111";
          }}
        >
          {isMenuOpen ? (
            <div className="menu-icon open">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          ) : (
            <Terminal size={40} color="white" />
          )}
        </button>

        {isMenuOpen && (
          <div className="fullscreen-menu" style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: isMobile ? '100vw' : '300px',
            height: '100vh',
            backgroundColor: 'black',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ul className="menu-list">
              {[
                { text: 'home', path: '/' },
                { text: 'about', path: '/about' },
                { text: 'projects', path: '/projects' },
                { text: 'contact', path: '/contact' }
              ].map((item) => (
                <li 
                  key={item.text}
                  className="menu-item" 
                  onClick={() => {
                    router.push(item.path);
                    setIsMenuOpen(false);
                  }}
                  onMouseEnter={() => !isMobile && startMenuItemHack(item.text)}
                  style={{ 
                    fontSize: '18px',
                    color: '#959595',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {hackedItems[item.text] || item.text}
                  {currentPath === item.path && (
                    <span 
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#959595',
                        borderRadius: '50%',
                        display: 'inline-block'
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{
          height: '100vh',
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
            display: isMobile ? 'none' : 'block',
          }}>
            <Link href="/project1">
              <img 
                src="/afbeeldingen/eindhoven.png"
                alt="Logo"
                style={{
                  ...getProjectImageStyle(200, 300, 400, 400, isMobile),
                  filter: isMobile ? 'brightness(50%)' : 'brightness(100%)',
                  zIndex: 1000,
                }}
                className="first-project-image project-image"
                onMouseEnter={!isMobile ? (e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.filter = 'brightness(20%)';
                  e.currentTarget.nextElementSibling?.classList.add('visible');
                } : undefined}
                onMouseLeave={!isMobile ? (e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'brightness(100%)';
                  e.currentTarget.nextElementSibling?.classList.remove('visible');
                } : undefined}
              />
              <div style={{
                position: 'absolute',
                top: '350px',
                left: '300px',
                transform: 'none',
                width: '400px',
                textAlign: 'center',
                color: 'white',
                zIndex: 1001,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                fontFamily: "'Bruno Ace SC', cursive",
                display: isMobile ? 'none' : 'block',
              }} className="hover-text">
                <h2 style={{ fontSize: '2.5rem', margin: '0' }}>Project Titel</h2>
                <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Projectbeschrijving hier</p>
              </div>
            </Link>
          </div>

          <div style={{
            position: 'relative',
            display: isMobile ? 'none' : 'block',
          }}>
            <img 
              src="/afbeeldingen/eindhoven.png"
              alt="Logo"
              style={getProjectImageStyle(700, 800, 300, 300, isMobile)}
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
              position: isMobile ? 'relative' : 'absolute',
              top: isMobile ? '0' : '800px',
              left: isMobile ? '50%' : '800px',
              transform: isMobile ? 'translateX(-50%)' : 'none',
              width: isMobile ? '80vw' : '300px',
              textAlign: 'center',
              color: 'white',
              zIndex: 1001,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              fontFamily: "'Bruno Ace SC', cursive",
              marginTop: isMobile ? '10px' : '0',
            }} className="hover-text">
              <h2 style={{ fontSize: '2.5rem', margin: '0' }}>Project Titel 2</h2>
              <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Projectbeschrijving hier</p>
            </div>
          </div>

          <div style={{
            position: 'relative',
            display: isMobile ? 'none' : 'block',
          }}>
            <img 
              src="/afbeeldingen/eindhoven.png"
              alt="Logo"
              style={getProjectImageStyle(300, 1500, 500, 500, isMobile)}
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
              position: isMobile ? 'relative' : 'absolute',
              top: isMobile ? '0' : '400px',
              left: isMobile ? '50%' : '1500px',
              transform: isMobile ? 'translateX(-50%)' : 'none',
              width: isMobile ? '80vw' : '500px',
              textAlign: 'center',
              color: 'white',
              zIndex: 1001,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              fontFamily: "'Bruno Ace SC', cursive",
              marginTop: isMobile ? '10px' : '0',
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

          <div style={{
            position: 'absolute',
            top: '20%',
            left: '900px',
            transform: 'translateY(-50%)',
            color: '#959595',
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
              border: '2px solid #959595',
              borderRadius: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                backgroundColor: '#959595',
                borderRadius: '50%',
                top: '50%',
                transform: 'translateY(-50%)',
                animation: 'scrollDot 3s infinite',
              }} />
            </div>
          </div>

          <style jsx global>{`
            .scroll-top-button {
              position: relative;
              background: transparent;
              border: 2px solid #959595;
              border-radius: 50%;
              width: 50px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s ease;
              overflow: hidden;
            }

            .scroll-top-button:hover {
              background-color: #959595;
              transform: scale(1.1);
              box-shadow: 0 0 15px rgba(149, 149, 149, 0.3);
            }

            .scroll-top-button:hover .arrow-icon {
              color: white !important;
              animation: flightPath 1.5s infinite;
            }

            @keyframes flightPath {
              0% {
                transform: translate(-50%, -50%);
                opacity: 1;
              }
              50% {
                transform: translate(-50%, -150%);
                opacity: 0;
              }
              51% {
                transform: translate(-50%, 50%);
                opacity: 0;
              }
              100% {
                transform: translate(-50%, -50%);
                opacity: 1;
              }
            }

            .arrow-icon {
              transition: all 0.3s ease;
            }

            @media screen and (max-width: 768px) {
              .scroll-top-button:hover .arrow-icon {
                animation: none;
              }
            }

            @keyframes scrollDot {
              0% {
                left: 10%;
              }
              50% {
                left: 90%;
              }
              100% {
                left: 10%;
              }
            }
          `}</style>
        </div>
      </div>

      <footer style={{
        width: '100%',
        backgroundColor: 'black',
        borderTop: '1px solid #959595',
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
          <h2 
            onClick={() => router.push('/contact')}
            onMouseEnter={startFooterHack}
            onMouseLeave={stopFooterHack}
            style={{
              color: '#959595',
              fontFamily: "'Bruno Ace SC', cursive",
              fontSize: fontSize,
              margin: '0 0 1rem 0',
              textAlign: 'left',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }} 
            className="neon-text footer-title-mobile"
          >
            {footerHackedText}
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '1rem',
            marginBottom: '1rem',
            paddingRight: isMobile ? '10%' : '0',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <div className="status-dot"></div>
              <span style={{
                color: '#959595',
                fontFamily: 'monospace',
                fontSize: '1rem',
              }}>Available</span>
            </div>
            
            {isMobile && (
              <button
                onClick={scrollToTop}
                className="scroll-top-button"
                style={{
                  position: 'relative',
                  background: 'transparent',
                  border: '2px solid #959595',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  paddingRight: '2rem',
                }}
              >
                <ArrowUp 
                  size={24} 
                  color="#959595"
                  className="arrow-icon"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </button>
            )}
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
                backgroundColor: '#959595',
                width: '100%',
                marginBottom: '1rem',
              }}></div>
              <h3 style={{
                color: '#959595',
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
                  href="https://nl.linkedin.com/in/luc-van-casteren-bb0823345" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#959595',
                    textDecoration: 'none',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  LinkedIn
                </a>
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
                backgroundColor: '#959595',
                width: '100%',
                marginBottom: '1rem',
              }}></div>
              <h3 style={{
                color: '#959595',
                fontFamily: 'monospace',
                fontSize: '1.2rem',
                margin: '0.2rem 0',
              }}>Contact</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                <a 
                  href="mailto:luc1708@hotmail.com" 
                  style={{
                    color: '#959595',
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
          
          {!isMobile && (
            <button
              onClick={scrollToTop}
              className="scroll-top-button"
              style={{
                position: 'absolute',
                top: '18.5rem',
                right: '2rem',
                background: 'transparent',
                border: '2px solid #959595',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                zIndex: 1000,
              }}
            >
              <ArrowUp 
                size={24} 
                color="#959595"
                className="arrow-icon"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </button>
          )}
        </div>
      </footer>
    </>
  );
}