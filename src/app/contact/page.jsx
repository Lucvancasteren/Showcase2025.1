"use client";

import { useRouter } from 'next/navigation';
import { Terminal, ArrowUp } from "lucide-react";
import { useState, useEffect } from 'react';

export default function Contact() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hackedItems, setHackedItems] = useState({});
  const currentPath = '/contact';
  const [footerHackedText, setFooterHackedText] = useState("LET'S CHAT");

  const greetings = [
    "HALLO", // Nederlands
    "HELLO", // Engels
    "BONJOUR", // Frans
    "HOLA", // Spaans
    "CIAO", // Italiaans
    "こんにちは", // Japans (Konnichiwa)
    "안녕하세요", // Koreaans (Annyeong)
    "你好", // Chinees Traditioneel (Ni Hao)
    "नमस्ते", // Hindi (Namaste)
    "MERHABA", // Turks
    "ΓΕΙΑ ΣΑΣ", // Grieks
    "ПРИВЕТ", // Russisch
    "שָׁלוֹם", // Hebreeuws
    "SALAAM", // Arabisch
    "SAWUBONA", // Zulu
    "JAMBO", // Swahili
    "XALÒ", // Vietnamees
    "สวัสดี", // Thai
    "HALLO", // Duits
    "HALLÅ", // Zweeds
    "TERVE", // Fins
    "OLÁ", // Portugees
    "DZIEŃ DOBRY", // Pools
    "DOBRÝ DEN", // Tsjechisch
    "ЗДРАВЕЙТЕ", // Bulgaars
    "TERE", // Estlands
    "BONGU", // Maltees
    "SVEIKI", // Lets
    "LABAS", // Litouws
    "AHOJ", // Slowaaks
  ];

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
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prevIndex) => 
        prevIndex === greetings.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Verander elke 2 seconden

    return () => clearInterval(interval);
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

  const startMenuItemHack = (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let iterations = 0;
    const maxIterations = 3;
    const interval = setInterval(() => {
      setHackedItems(prev => ({
        ...prev,
        [text]: text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      }));
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setHackedItems(prev => ({
          ...prev,
          [text]: text
        }));
      }
    }, 50);
  };

  const startFooterHack = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    let iterations = 0;
    const maxIterations = 3;
    
    const hackInterval = setInterval(() => {
      iterations++;
      const randomText = Array("LET'S CHAT".length)
        .fill()
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('');
      
      setFooterHackedText(randomText);
      
      if (iterations >= maxIterations) {
        clearInterval(hackInterval);
        setFooterHackedText("LET'S CHAT");
      }
    }, 50);
  };

  return (
    <>
      <div>
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
            zIndex: 9999,
            mixBlendMode: 'normal',
            ...(isHovering ? {
              width: '40px',
              height: '40px',
              transform: `translate(${cursorPosition.x - 20}px, ${cursorPosition.y - 20}px)`,
            } : {})
          }}
        />

        <div style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          zIndex: 100,
        }}>
          <div style={{
            display: 'inline-block',
            animation: 'scroll 240s linear infinite',
            transform: 'translateX(-50%)',
            color: '#959595',
            fontSize: '14rem',
            fontFamily: "'Bruno Ace SC', cursive",
          }} 
          className="greeting-carousel">
            {greetings.join(' ') + ' ' + greetings.join(' ') + ' ' + greetings.join(' ') + ' ' + greetings.join(' ')}
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '95%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 'none',
          zIndex: 99,
        }}>
          <div 
            style={{
              position: 'relative',
              width: '100%',
              height: '500px',
              overflow: 'hidden',
            }}
            className="image-container"
          >
            <img 
              src="/afbeeldingen/eindhoven.png" 
              alt="Brede afbeelding"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(20%)',
                transition: 'all 0.5s ease',
                cursor: 'pointer',
                transform: 'scale(1)',
                position: 'relative',
                zIndex: 1,
              }}
            />
            <div className="hover-text">
              Eindhoven, The Netherlands
            </div>
          </div>
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#959595',

          }} />
          <div style={{
            position: 'absolute',
            left: '30px',
            marginTop: '30px',
            color: '#959595',
            fontSize: '14px',
            fontFamily: "'Bruno Ace SC', cursive",
          }}>
            email
          </div>
          <div style={{
            position: 'absolute',
            left: isMobile ? '15px' : '100px',
            marginTop: '100px',
            color: '#959595',
            fontSize: isMobile ? '3rem' : '48px',
            fontFamily: "'Bruno Ace SC', cursive",
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '14px' : '28px',
          }}>
            <a 
              href="mailto:luc1708@hotmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '14px' : '28px',
                textDecoration: 'none',
                color: 'inherit',
                fontSize: isMobile ? '3rem' : '48px',
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#959595',
                borderRadius: '50%',
                position: 'relative',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                display: isMobile ? 'none' : 'block',
              }} 
              className="animated-dot"
              />
              luc1708@hotmail.com
            </a>
          </div>
        </div>

        <div style={{
          height: '140vh',
          width: '100%',
          position: 'relative',
          backgroundColor: '#000000',
          overflowX: 'hidden',
          overflowY: 'auto',
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
            <div className="fullscreen-menu">
              <ul className="menu-list">
                {[
                  { text: 'home', path: '/' },
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
                      fontSize: '24px',
                      color: '#959595',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontFamily: 'monospace'
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

          <style jsx global>{`
            .image-container {
              position: relative;
              overflow: hidden;
            }

            .image-container img {
              transition: all 0.5s ease !important;
            }

            .hover-text {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #959595;
              font-size: 2rem;
              font-family: 'Bruno Ace SC', cursive;
              opacity: 0;
              transition: opacity 0.5s ease;
              z-index: 2;
            }

            .image-container:hover img {
              transform: scale(1.05) !important;
              filter: brightness(40%) !important;
            }

            .image-container:hover .hover-text {
              opacity: 1;
            }

            .scroll-top-button {
              position: absolute;
              right: 1rem !important;
              bottom: 1rem !important;
              background: transparent;
              border: 2px solid #959595;
              border-radius: 50%;
              width: 50px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }

            .scroll-top-button svg {
              transition: all 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
            }

            .scroll-top-button:hover svg {
              animation: flyAroundWorld 2s cubic-bezier(0.68, -0.6, 0.32, 1.6) infinite;
            }

            @keyframes flyAroundWorld {
              0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 1;
              }
              40% {
                transform: translate(0, -20px) rotate(-5deg);
                opacity: 0.3;
              }
              50% {
                transform: translate(0, 20px) rotate(-5deg);
                opacity: 0;
              }
              60% {
                transform: translate(0, 10px) rotate(0deg);
                opacity: 0.3;
              }
              100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 1;
              }
            }

            .scroll-top-button:hover svg {
              color: #959595 !important;
            }

            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            @media (max-width: 768px) {
              .footer-title-mobile {
                font-size: 1.5rem !important;
                white-space: normal !important;
                display: flex !important;
                gap: 10px !important;
                align-items: center !important;
              }

              .footer-title-mobile br {
                display: none !important;
              }

              .footer-content-mobile {
                padding-right: 2rem !important;
                left: 0 !important;
                padding-left: 1rem !important;
              }

              /* Aangepaste selector voor de carrousel */
              .greeting-carousel {
                font-size: 6rem !important;
              }

              .image-container {
                height: 300px !important;
              }
              
              /* Verplaats de container omhoog op mobiel */
              div[style*="top: 95%"] {
                top: 85% !important;
              }

              /* Telefoonnummer specifiek */
              .contact-number {
                font-size: 32px !important;
              }
              
              .contact-number span {
                font-size: inherit !important;
              }

              /* Email container specifiek */
              div[style*="marginTop: '100px'"] a[href^="mailto"],
              div[style*="marginTop: '100px'"] a[href^="mailto"] span,
              a[href^="mailto"] {
                font-size: 24px !important;
              }

              /* Verberg dots op mobiel */
              .animated-dot {
                display: none !important;
              }

              /* Pas de ruimte tussen dot en tekst aan */
              div[style*="alignItems: 'center'"][style*="gap: '28px'"] {
                gap: 0 !important;
              }

              /* Labels "call me" en "email us" */
              div[style*="marginTop: '30px'"] {
                left: 15px !important;
                font-size: 10px !important;
              }

              /* Email link container specifiek */
              a[href^="mailto"] {
                margin-left: 15px !important;
                font-size: 12px !important;
              }

              .footer-content-mobile {
                left: 2rem !important;
                padding-right: 2rem !important;
              }

              /* Verberg de scroll-top knop op mobiel */
              .scroll-top-button {
                display: none !important;
              }

              .footer-content-mobile > * {
                margin-left: 0 !important;
              }

              /* Pas de lijn container aan */
              .footer-content-mobile .columnContainer {
                padding-right: 1rem !important; /* Zelfde padding als links */
              }

              /* Specifiek voor de lijn */
              .footer-content-mobile .columnContainer .line {
                margin-right: 1rem !important;
                width: calc(100% - 1rem) !important; /* Trek de padding er vanaf */
              }

              /* Specifiekere selector voor de lijn containers */
              .footer-content-mobile .lineContainer {
                padding: 0 1rem !important;
              }

              /* Pas beide kolommen aan */
              .footer-content-mobile .columnContainer {
                padding-right: 0 !important;
                width: calc(50% - 25px) !important; /* Helft van de breedte minus de helft van lineGap */
              }

              /* Reset de lijn breedte */
              .footer-content-mobile .line {
                width: 100% !important;
                margin: 0 !important;
              }

              /* Behoud de gap tussen de kolommen */
              .footer-content-mobile .lineGap {
                width: 50px !important;
              }
            }

            .contact-number {
              font-size: 80px !important;
            }
            
            .contact-number span {
              font-size: inherit !important;
            }

            /* Alleen voor de grote email link */
            .contact-email a[href^="mailto"] {
              font-size: 80px !important;
            }

            @media (max-width: 768px) {
              .contact-email a[href^="mailto"] {
                font-size: 20px !important;
              }
            }

            /* Reset voor andere mailto links */
            a[href^="mailto"] {
              font-size: inherit;
            }

            /* Desktop stijlen */
            .footer-title-mobile br {
              display: none !important; /* Verberg de break op desktop */
            }

            .footer-title-mobile {
              white-space: nowrap !important; /* Hou tekst op één regel op desktop */
            }

            @media (max-width: 768px) {
              .footer-title-mobile {
                font-size: 2rem !important;
                white-space: nowrap !important;
                display: inline-block !important;
              }

              .footer-title-mobile br {
                display: block !important; /* Toon break alleen op mobiel */
              }
            }

            .fullscreen-menu {
              position: fixed;
              top: 0;
              right: 0;
              width: ${isMobile ? '100vw' : '300px'};
              height: 140px;
              background-color: black;
              z-index: 9999;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              padding-left: 30px;
              padding-top: 10px;
            }

            .menu-list {
              list-style: none;
              padding: 0 0 10px 0;
              margin: 0;
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            .menu-item {
              opacity: 1 !important;
              transition: opacity 0.3s ease;
              font-size: 18px !important;
              font-family: monospace !important;
              margin: 0 !important;
              color: #959595 !important;
            }

            .menu-item:hover {
              opacity: 0.6 !important;
            }

            .menu-icon {
              width: 30px;
              height: 20px;
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }

            .menu-icon .line {
              display: block;
              height: 2px;
              background-color: white;
              transition: all 0.4s ease-in-out;
              transform-origin: center;
              width: 100%;
            }

            .menu-icon.open .line:first-child {
              transform: translateY(9px) rotate(45deg);
            }

            .menu-icon.open .line:nth-child(2) {
              opacity: 0;
            }

            .menu-icon.open .line:last-child {
              transform: translateY(-9px) rotate(-45deg);
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
          <button
            onClick={scrollToTop}
            style={{
              position: 'absolute',
              right: '1rem',
              bottom: '1rem',
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
            }}
            className="scroll-top-button"
          >
            <ArrowUp size={24} color="#959595" />
          </button>
          <h2 
            style={{
              color: '#959595',
              fontFamily: "'Bruno Ace SC', cursive",
              fontSize: isMobile ? '1.5rem' : '7rem',
              margin: '0 0 1rem 0',
              textAlign: 'left',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }} 
            className="footer-title-mobile"
            onMouseEnter={startFooterHack}
          >
            {footerHackedText}
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
              color: '#959595',
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
                }}>Email</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}