"use client";

import { useState, useEffect } from "react";
import { Terminal, ArrowUp } from "lucide-react";
import "./styles.css";
import { useRouter, usePathname } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [displayText, setDisplayText] = useState("Type 'help' for commands");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState([false, false, false, false]);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [dots, setDots] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [shouldTrackCursor, setShouldTrackCursor] = useState(false);
  const [isCursorReady, setIsCursorReady] = useState(false);
  const [hackedText, setHackedText] = useState('');
  const [isHackComplete, setIsHackComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [footerHackedText, setFooterHackedText] = useState('LET\'S CHAT');
  const [isFooterHacking, setIsFooterHacking] = useState(false);
  const [statusText, setStatusText] = useState("Type 'help' for commands");
  const [isStatusHacking, setIsStatusHacking] = useState(false);
  const [menuItemHackText, setMenuItemHackText] = useState('');
  const [isMenuItemHacking, setIsMenuItemHacking] = useState(false);
  const [hackedItems, setHackedItems] = useState({});
  const [currentPath, setCurrentPath] = useState('');
  const [showNameOverlay, setShowNameOverlay] = useState(false);
  const [overlayHackText, setOverlayHackText] = useState('');
  const [hasVisited, setHasVisited] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const textContainer = document.querySelector('.text-container');
      if (textContainer) {
        const containerTop = textContainer.getBoundingClientRect().top;
        const containerHeight = textContainer.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        
        // Bereken wanneer elke regel zichtbaar moet worden
        const lineHeight = containerHeight / 4;
        const newVisibleLines = visibleLines.map((_, index) => {
          const linePosition = containerTop + (lineHeight * index);
          return linePosition < windowHeight + 100 && linePosition > -200;
        });
        
        setVisibleLines(newVisibleLines);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initiële staat
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!shouldTrackCursor) return;

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
  }, [shouldTrackCursor]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Loading dots animatie
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  useEffect(() => {
    const duration = 3750;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      setLoadingProgress(Math.floor(progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsLoading(false);
        setShowWelcome(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showWelcome) {
      setTimeout(() => {
        setCursorPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        });
        
        setTimeout(() => {
          setShouldTrackCursor(true);
          setIsCursorReady(true);
        }, 50);
      }, 100);
    }
  }, [showWelcome]);

  useEffect(() => {
    if (!showWelcome || isHackComplete) return;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const finalText = 'LUC VAN CASTEREN';
    let interval;

    // Hack effect
    interval = setInterval(() => {
      const randomText = Array(14)
        .fill()
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('');
      setHackedText(randomText);
    }, 50);

    // Stop het hack effect na 2 seconden
    setTimeout(() => {
      clearInterval(interval);
      setIsHackComplete(true);
    }, 2000);

    return () => clearInterval(interval);
  }, [showWelcome]);

  useEffect(() => {
    // Check voor touch device
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    };

    // Check voor force touch
    const hasForceTouch = () => {
      return ('force' in Touch.prototype) ||
             ('webkitForce' in Touch.prototype) ||
             ('mozForce' in Touch.prototype);
    };

    // Als het een touch device is of force touch heeft, verberg de cursor
    if (isTouchDevice() || hasForceTouch()) {
      setShouldTrackCursor(false);
      setIsCursorReady(false);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    // Check eerst of we aan de client-side zijn
    if (typeof window !== 'undefined') {
      const navigationState = window.history.state;
      // Als we een navigatie geschiedenis hebben, komen we van een andere pagina
      if (navigationState && navigationState.idx > 0) {
        setHasVisited(true);
        setShowMainContent(true);
      }
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const command = searchInput.toLowerCase();
      if (command === "help") {
        setDisplayText(
          "Available commands:\n- home\n- about\n- projects\n- contact\n- help"
        );
      } else if (command === "projects") {
        router.push('/projects');
      } else if (command === "contact") {
        router.push('/contact');
      } else {
        setDisplayText(`Command '${searchInput}' not found. Type 'help' for available commands.`);
      }
      setSearchInput("");
    }
  };

  const handleWelcomeClick = () => {
    setShouldTrackCursor(true);
    setShowWelcome(false);
    setShowMainContent(true);
    setHasVisited(true);
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

  const handleStatusLightClick = () => {
    if (isStatusHacking) return;
    setIsStatusHacking(true);
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    let hackInterval = setInterval(() => {
      const randomText = Array(displayText.length)
        .fill()
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('');
      setStatusText(randomText);
    }, 50);

    setTimeout(() => {
      clearInterval(hackInterval);
      setStatusText(displayText);
      setIsStatusHacking(false);
    }, 500);
  };

  const startMenuItemHack = (originalText) => {
    console.log('Starting hack for:', originalText);
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    let iterations = 0;
    const maxIterations = 3; // Aantal keer dat we de tekst willen hacken
    
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

  const handleVideoClick = () => {
    if (isMobile) return; // Alleen uitvoeren op desktop
    
    setShowNameOverlay(true);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    let iterations = 0;
    const maxIterations = 10;
    
    const hackInterval = setInterval(() => {
      iterations++;
      const randomText = Array(14) // Lengte van "LUC VAN CASTEREN"
        .fill()
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('');
      
      setOverlayHackText(randomText);
      
      if (iterations >= maxIterations) {
        clearInterval(hackInterval);
        setOverlayHackText('LUC VAN CASTEREN');
        setTimeout(() => {
          setShowNameOverlay(false);
          setOverlayHackText('');
        }, 1000); // Verdwijnt na 1 seconde
      }
    }, 50);
  };

  useEffect(() => {
    if (hasVisited) {
      setShowMainContent(true);
    }
  }, [hasVisited]);

  if (isLoading && !hasVisited) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        backgroundImage: `
          linear-gradient(rgba(38, 38, 38, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(38, 38, 38, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: 'center center',
      }}>
        <div style={{
          width: '90%',
          maxWidth: '800px',
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#111111',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              height: '100%',
              width: `${loadingProgress}%`,
              backgroundColor: '#959595',
              transition: 'width 0.02s linear'
            }} />
          </div>
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#959595',
            fontFamily: "'Bruno Ace SC', cursive",
            backgroundColor: 'black',
            padding: '0 20px',
            fontSize: 'clamp(16px, 5vw, 24px)'
          }}>
            {loadingProgress}%
          </div>
        </div>
        
        <div style={{
          color: '#959595',
          fontFamily: "'Bruno Ace SC', cursive",
          fontSize: 'clamp(16px, 5vw, 24px)',
          marginTop: '20px',
          minWidth: '150px',
          textAlign: 'center'
        }}>
          LOADING{dots}
        </div>
      </div>
    );
  }

  if (showWelcome && !hasVisited) {
    return (
      <>
        <div
          style={{
            width: isHovering ? '40px' : '20px',
            height: isHovering ? '40px' : '20px',
            backgroundColor: 'transparent',
            border: '2px solid #292929',
            borderRadius: '50%',
            position: 'fixed',
            pointerEvents: 'none',
            transform: `translate(${cursorPosition.x - (isHovering ? 20 : 10)}px, ${cursorPosition.y - (isHovering ? 20 : 10)}px)`,
            zIndex: 9999,
            mixBlendMode: 'normal',
            opacity: isCursorReady ? 1 : 0,
            ...(isCursorReady && {
              transition: 'all 0.2s ease-out'
            }),
            '@media (pointer: coarse)': {
              display: 'none'
            }
          }}
        />
        
        <div 
          style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            backgroundImage: `
              linear-gradient(rgba(38, 38, 38, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(38, 38, 38, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center center',
          }}
        >
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>
            <div style={{ position: 'relative' }}>
              <h1 style={{
                color: '#959595',
                fontFamily: "'Bruno Ace SC', cursive",
                fontSize: 'clamp(2rem, 8vw, 6rem)',
                textAlign: 'center',
                margin: 0,
                animation: isHackComplete ? 'float 3s ease-in-out infinite' : 'none',
              }}>
                {isHackComplete ? 'LUC VAN CASTEREN' : hackedText}
              </h1>
            </div>

            <button
              onClick={handleWelcomeClick}
              style={{
                color: '#959595',
                fontFamily: "'Bruno Ace SC', cursive",
                fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                padding: '1rem 2rem',
                border: '1px solid #959595',
                background: 'transparent',
                cursor: 'pointer',
                animation: 'pulse 2s ease-in-out infinite',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#959595'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span className="desktop-text">ENTER</span>
              <span className="mobile-text">TAP TO ENTER</span>
            </button>
          </div>

          <style jsx>{`
            @keyframes float {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
              100% {
                transform: translateY(0px);
              }
            }

            @keyframes pulse {
              0% {
                opacity: 0.6;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0.6;
              }
            }

            @keyframes slideRight {
              0% {
                left: -50%;
              }
              100% {
                left: 100%;
              }
            }

            @keyframes slideLeft {
              0% {
                right: -50%;
              }
              100% {
                right: 100%;
              }
            }

            .mobile-text {
              display: none;
            }

            @media (hover: none) and (pointer: coarse) {
              .desktop-text {
                display: none;
              }
              .mobile-text {
                display: inline;
              }
            }

            @media (max-width: 768px) {
              .footer-title-mobile {
                font-size: 3rem !important;
              }
            }
          `}</style>
        </div>
      </>
    );
  }

  if (!showMainContent) {
    return null;
  }

  const styles = {
    container: {
      position: "relative",
      height: "100vh",
      width: "100vw",
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    statusLights: {
      position: "absolute",
      top: "80px",
      left: "15rem",
      display: "flex",
      gap: "10px",
      zIndex: 50,
    },
    lightRed: {
      width: "15px",
      height: "15px",
      backgroundColor: "#FF5F57",
      borderRadius: "50%",
    },
    lightYellow: {
      width: "15px",
      height: "15px",
      backgroundColor: "#FFBD2E",
      borderRadius: "50%",
    },
    lightGreen: {
      width: "15px",
      height: "15px",
      backgroundColor: "#28C840",
      borderRadius: "50%",
    },
    video: {
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "180%",
      objectFit: "contain",
    },
    alwaysVisibleText: {
      position: "absolute",
      top: "100px",
      left: isMobile ? "20px" : "15rem",
      color: "#959595",
      fontSize: "18px",
      fontFamily: "monospace",
      zIndex: 21,
      width: isMobile ? "calc(100% - 40px)" : "auto",
    },
    searchBar: {
      position: "absolute",
      top: "140px",
      left: isMobile ? "20px" : "15rem",
      backgroundColor: "#000",
      border: "2px solid #959595",
      padding: "5px 10px",
      zIndex: 20,
      width: isMobile ? "calc(100% - 40px)" : "60%",
    },
    searchInput: {
      background: "#000",
      color: "#959595",
      border: "none",
      outline: "none",
      fontSize: "16px",
      fontFamily: "monospace",
      width: "100%",
      caretColor: "#959595",
    },
    menuButton: {
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
      zIndex: 10,
    },
    menu: {
      position: "absolute",
      top: "100px",
      right: "20px",
      backgroundColor: "black",
      border: "2px solid #959595",
      color: "#959595",
      padding: "10px 20px",
      zIndex: 9,
      width: "300px",
    },
    bodyContainer: {
      position: "relative",
      width: "100%",
      marginTop: "100vh",
      zIndex: 20,
    },
    newContainer: {
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "black",
      position: "relative",
      zIndex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `
        linear-gradient(rgba(38, 38, 38, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(38, 38, 38, 0.3) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
      backgroundPosition: 'center center',
    },
    textContainer: {
      padding: '2rem',
      marginTop: '30rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      alignItems: 'center',
      width: '100%',
      maxWidth: '800px'
    },
    text: {
      color: '#959595',
      fontSize: '2rem',
      fontFamily: "'Bruno Ace SC', cursive",
      textAlign: 'center',
      width: '100%'
    },
    imageContainer: {
      width: '100vw',
      position: 'relative',
      left: '0',
      marginTop: '14rem',
      overflow: 'hidden',
    },
    fullWidthImageWrapper: {
      width: '100%',
      height: 'auto',
      display: 'flex',
    },
    projectImage: {
      width: '100%',
      height: 'auto',
      display: 'block',
    },
    footer: {
      width: '100%',
      backgroundColor: 'black',
      borderTop: '1px solid #959595',
      padding: '2rem 0',
      marginTop: 'auto',
      zIndex: 2,
      display: 'flex',
      justifyContent: 'center'
    },
    footerContent: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      position: 'relative',
      paddingRight: '2rem',
    },
    footerText: {
      color: '#959595',
      fontFamily: 'monospace',
      margin: 0,
    },
    footerLinks: {
      display: 'flex',
      gap: '2rem',
    },
    footerLink: {
      color: '#4CAF50',
      textDecoration: 'none',
      fontFamily: 'monospace',
      transition: 'opacity 0.2s',
      },
    footerTitle: {
      color: '#262626',
      fontFamily: "'Bruno Ace SC', cursive",
      fontSize: '7rem',
      margin: '0 0 1rem 0',
      textAlign: 'left',
      letterSpacing: '0.05em',
    },
    availableStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '1rem',
      marginBottom: '1rem',
    },
    statusDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#28C840',
      borderRadius: '50%',
    },
    availableText: {
      color: '#262626',
      fontFamily: 'monospace',
      fontSize: '1rem',
    },
    lineContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
      marginTop: '2rem',
    },
    line: {
      height: '1px',
      backgroundColor: '#262626',
      width: '100%',
      marginBottom: '1rem',
    },
    lineGap: {
      width: '50px',
    },
    columnContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    columnTitle: {
      color: '#262626',
      fontFamily: 'monospace',
      fontSize: '1.2rem',
      margin: '0.2rem 0',
    },
    columnLinks: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    columnLink: {
      color: '#262626',
      textDecoration: 'none',
      fontFamily: 'monospace',
      fontSize: '1rem',
      transition: 'opacity 0.2s',
      cursor: 'pointer',
    },
    ctaButton: {
      backgroundColor: 'transparent',
      border: '1px solid #666666',
      color: '#666666',
      padding: '1rem 2rem',
      fontSize: '1.2rem',
      fontFamily: "'Bruno Ace SC', cursive",
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '2rem',
      position: 'relative',
      overflow: 'hidden',
    },
    textWithImage: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.2rem',
      width: '100%',
      justifyContent: 'flex-start',
      paddingLeft: '10%'
    },
    inlineImage: {
      width: '75px',
      height: '75px',
      objectFit: 'cover',
      borderRadius: '50%'
    },
    scrollTopButton: {
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
      overflow: 'hidden',
    },
    rotatingArrow: {
      animation: 'flyAround 2s infinite ease-in-out',
      transformOrigin: 'center',
    },
    menuIcon: {
      width: 30,
      height: 20,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    line: {
      display: 'block',
      width: '100%',
      height: 2,
      backgroundColor: 'white',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
    },
    lineFirstChildOpen: {
      transform: 'translateY(9px) rotate(45deg)',
    },
    lineLastChildOpen: {
      transform: 'translateY(-9px) rotate(-45deg)',
    },
  };

  return (
    <>
      <div 
        className="cursor-dot hide-on-mobile" 
        style={{ 
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) scale(${isHovering ? 1.5 : 1})`
        }}
      />
      <div style={styles.container}>
        <div className="statusLights" onClick={handleStatusLightClick} style={{ cursor: 'pointer' }}>
          <div style={styles.lightRed}></div>
          <div style={styles.lightYellow}></div>
          <div style={styles.lightGreen}></div>
        </div>

      <div style={styles.alwaysVisibleText}>
        {isStatusHacking ? statusText : displayText}
      </div>

      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Enter command..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.searchInput}
        />
      </div>

        <video 
          className="video-container" 
          autoPlay 
          muted 
          loop 
          playsInline
          onClick={handleVideoClick}
          style={{ cursor: isMobile ? 'default' : 'none' }}
        >
          <source src="/afbeeldingen/luc3.mp4" type="video/mp4" />
        </video>

        {showNameOverlay && !isMobile && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            transition: 'opacity 0.3s ease'
          }}>
            <h1 style={{
              color: '#959595',
              fontFamily: "'Bruno Ace SC', cursive",
              fontSize: 'clamp(2rem, 8vw, 6rem)',
              textAlign: 'center',
              margin: 0,
              letterSpacing: '0.1em'
            }}>
              {overlayHackText}
            </h1>
          </div>
        )}

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
      </div>
      
      <div style={styles.newContainer}>
        <div style={styles.textContainer} className="text-container">
          <p
            className={`fade-in-text ${visibleLines[0] ? 'visible' : ''}`}
            style={{
              ...styles.text,
              transitionDelay: '0s',
              color: '#959595'
            }}
          >
            Luc van Casteren is a dutch,
          </p>
          
          <p
            className={`fade-in-text ${visibleLines[1] ? 'visible' : ''}`}
            style={{
              ...styles.text,
              transitionDelay: '0.15s',
              color: '#959595'
            }}
          >
            Full-stack Developer & UX Designer
          </p>
          
          <p
            className={`fade-in-text ${visibleLines[2] ? 'visible' : ''}`}
            style={{
              ...styles.text,
              transitionDelay: '0.3s',
              color: '#959595'
            }}
          >
            Specialized in React & Next.js
          </p>
          
          <button 
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #959595',
              color: '#959595',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontFamily: "'Bruno Ace SC', cursive",
              cursor: 'pointer',
              marginTop: '2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}
            className="get-in-touch-btn"
            onClick={() => window.location.href = '/contact'}
          >
            Get in touch
          </button>
          
          <div style={styles.imageContainer}>
          </div>
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
            style={{
              color: '#959595',
              fontFamily: "'Bruno Ace SC', cursive",
              fontSize: window.innerWidth <= 768 ? '3rem' : '7rem',
              margin: '0 0 1rem 0',
              textAlign: 'left',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease'
            }} 
            className="footer-title-mobile"
            onMouseEnter={startFooterHack}
            onMouseLeave={stopFooterHack}
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
                  ...styles.scrollTopButton,
                  position: 'relative',
                  right: 'auto',
                  left: 'auto',
                  bottom: 'auto',
                  marginLeft: '-50px',
                  border: '2px solid #959595',
                }}
              >
                <ArrowUp 
                  size={24} 
                  color="#959595"
                  className="rotating-arrow"
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
                ...styles.scrollTopButton,
                right: '1rem',
                left: 'auto',
                display: isMobile ? 'none' : 'flex'
              }}
            >
              <ArrowUp 
                size={24} 
                color="#959595"
                className="rotating-arrow"
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

      <style jsx>{`
        .get-in-touch-btn:hover {
          background-color: #959595 !important;
          color: black !important;
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

        @media (max-width: 768px) {
          .scroll-top-button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}




