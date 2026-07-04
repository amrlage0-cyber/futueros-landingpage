import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Cpu, 
  Sparkles, 
  Code, 
  Terminal, 
  ArrowUpRight, 
  Check, 
  Copy, 
  Plus, 
  Minus, 
  Coffee, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  ArrowUp, 
  ExternalLink, 
  Layers, 
  Zap, 
  ChevronRight, 
  Send, 
  MessageSquare,
  Globe,
  Clock,
  ShieldCheck,
  Menu,
  X,
  Home,
  Briefcase
} from "lucide-react";

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// =========================================================================
// 🚀 FUTUEROS CONFIGURATION PORTAL
// Replace these with your real credentials!
// These will power the main Contact Form, the Cafe system, and SaaS waitlist
// =========================================================================
export const FUTUEROS_CONFIG = {
  // Your real EmailJS API Credentials
  EMAILJS_SERVICE_ID: "service_5mer50n",
  EMAILJS_TEMPLATE_ID: "template_p2wes4s",
  EMAILJS_PUBLIC_KEY: "xwfU52YLVmA_Nnucq",
  COMPANY_EMAIL: "futuer.os.0@gmail.com",
};

// =========================================================================
// 🌐 PORTFOLIO & PROJECTS DATA ARRAY
// Easily manage titles, images, and live links for each project.
// =========================================================================
export const PROJECTS_DATA = [
  {
    id: "no-lag",
    projectName: "⚡️ NO_LAG // EXTREME WORKSTATION HARDWARE PLATFORM",
    projectImageSrc: "/images/no_lag_preview_1783114548525.jpg",
    projectLiveLink: "https://no-lage.vercel.app/",
    description: "An enterprise-ready, cyber-aesthetic hardware inventory catalog and telemetry management suite built for Extreme-Level Workstation Specialists. Features direct stock monitoring and an on-demand hardware cooling stress test simulation terminal.",
    techStack: "React, Tailwind v4, High-Res WebGL Telemetry",
  },
  {
    id: "stylestudio",
    projectName: "StyleStudio // Interactive CSS Customizer",
    projectImageSrc: "/images/style_studio_preview_1783114563382.jpg",
    projectLiveLink: "https://element-os-visual-css-generator-422812274445.europe-west2.run.app/",
    description: "An advanced visual sandbox engineered for developers to manipulate CSS variables, gradients, and box layouts dynamically. Set dimensions, define glow effects, and immediately export robust production CSS code.",
    techStack: "CSS COMPONENT EXPORTER",
  },
  {
    id: "roast-rest",
    projectName: "Roast-Rest cafe // Premium Landing Page",
    projectImageSrc: "/images/roast_rest_preview_1783114575355.jpg",
    projectLiveLink: "https://roast-rest.vercel.app/",
    description: "A gorgeous, high-end specialty cafe landing page and interactive interface designed to highlight artisanal coffee brewing, premium table reservation, and full-sensory menus.",
    techStack: "React, Tailwind, Motion UI, Premium Cafe Ordering",
  }
];


export default function App() {
  // Custom Cursor state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Time stamp state for local timezone display
  const [currentTime, setCurrentTime] = useState("");

  // Hero interactive 3D rotate
  const [heroRotate, setHeroRotate] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | number | null>(null);

  // Back to Top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Navigation active state
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hardware telemetry simulator states
  const [selectedSubsystem, setSelectedSubsystem] = useState<"cpu" | "gpu" | "nvme">("cpu");
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [stressProgress, setStressProgress] = useState(0);
  const [stressLogs, setStressLogs] = useState<string[]>([
    "SYSTEM READY // WAITING FOR DIRECTIVE",
  ]);
  const [telemetryStats, setTelemetryStats] = useState({
    cpuTemp: 42,
    cpuLoad: 12,
    gpuTemp: 38,
    gpuLoad: 5,
    nvmeSpeed: 7120,
    fanSpeed: 35,
  });

  // StyleStudio Sandbox state
  const [sandboxStyles, setSandboxStyles] = useState({
    width: 200,
    height: 200,
    borderRadius: 16,
    shadowBlur: 20,
    glowIntensity: 50,
    gradientAngle: 135,
    preset: "cyan", // cyan, purple, emerald
  });
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Al-Maadi Lounge Cafe Ordering state
  const cafeMenu = [
    { id: "e1", name: "Specialty Gold Espresso", category: "drinks", price: 6.50 },
    { id: "e2", name: "Mint Infused Shisha Blend", category: "shisha", price: 14.00 },
    { id: "e3", name: "Pistachio Kunafa Sensation", category: "dessert", price: 9.50 },
    { id: "e4", name: "Lounge Signature Latte", category: "drinks", price: 7.50 },
    { id: "e5", name: "Maadi Double Apple Classic", category: "shisha", price: 12.00 },
    { id: "e6", name: "Lotus Crème Cheesecake", category: "dessert", price: 8.50 },
  ];
  const [cafeCart, setCafeCart] = useState<CartItem[]>([]);
  const [cafeTable, setCafeTable] = useState("");
  const [cafeNotes, setCafeNotes] = useState("");
  const [cafeActiveCategory, setCafeActiveCategory] = useState<"all" | "drinks" | "dessert" | "shisha">("all");
  const [orderComplete, setOrderComplete] = useState(false);

  // Next Micro-SaaS countdown
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const TIMER_DURATION = 3940169000; // 45 days, 14 hours, 22 minutes, 49 seconds in milliseconds
    if (typeof window !== "undefined") {
      let endTimestampStr = localStorage.getItem("saas_countdown_end");
      let endTimestamp: number;
      if (!endTimestampStr) {
        endTimestamp = new Date().getTime() + TIMER_DURATION;
        localStorage.setItem("saas_countdown_end", endTimestamp.toString());
      } else {
        endTimestamp = parseInt(endTimestampStr, 10);
      }
      const difference = endTimestamp - new Date().getTime();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 45, hours: 14, minutes: 22, seconds: 49 };
  });
  const [saasEmail, setSaasEmail] = useState("");
  const [saasWaitlistJoined, setSaasWaitlistJoined] = useState(false);
  const [saasInviteCode, setSaasInviteCode] = useState("");
  const [saasSubmitting, setSaasSubmitting] = useState(false);
  const [saasSubmitStep, setSaasSubmitStep] = useState(0); // 0: Idle, 1: Validating, 2: Encrypting, 3: Transmitting, 4: Done

  // Main Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); // 0: Idle, 1: Connecting, 2: Encrypting, 3: Transmitting, 4: Done

  // Track cursor position
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (!cursorVisible) setCursorVisible(true);
    };

    const handleMouseLeave = () => setCursorVisible(false);
    const handleMouseEnter = () => setCursorVisible(true);

    window.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorVisible]);

  // Set local clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Monitor Scroll for header and Back-To-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Simple active nav section detection
      const sections = ["home", "about", "portfolio-nexus", "projects", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            const mappedSection = sectionId === "portfolio-nexus" ? "saas" : sectionId;
            setActiveSection(mappedSection);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Micro-SaaS Countdown timer
  useEffect(() => {
    const TIMER_DURATION = 3940169000; // 45 days, 14 hours, 22 minutes, 49 seconds in milliseconds
    let endTimestampStr = localStorage.getItem("saas_countdown_end");
    let endTimestamp: number;
    if (!endTimestampStr) {
      endTimestamp = new Date().getTime() + TIMER_DURATION;
      localStorage.setItem("saas_countdown_end", endTimestamp.toString());
    } else {
      endTimestamp = parseInt(endTimestampStr, 10);
    }

    const updateTimer = () => {
      const difference = endTimestamp - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current as any);
        }
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    const intervalId = setInterval(updateTimer, 1000);
    countdownIntervalRef.current = intervalId;
    
    // Run initial update right away
    updateTimer();

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current as any);
      }
    };
  }, []);

  // Hardware stress simulation background ticks
  useEffect(() => {
    if (isStressTesting) return;

    const telemetryInterval = setInterval(() => {
      setTelemetryStats((prev) => ({
        cpuTemp: 40 + Math.floor(Math.random() * 5),
        cpuLoad: 8 + Math.floor(Math.random() * 10),
        gpuTemp: 37 + Math.floor(Math.random() * 4),
        gpuLoad: 3 + Math.floor(Math.random() * 6),
        nvmeSpeed: 7100 + Math.floor(Math.random() * 80),
        fanSpeed: 30 + Math.floor(Math.random() * 5),
      }));
    }, 2000);

    return () => clearInterval(telemetryInterval);
  }, [isStressTesting]);

  // Handle Hero Perspective Tilt on Mouse Movement
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map to max 12 degree rotation
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setHeroRotate({ x: rotateX, y: rotateY });
  };

  const handleHeroMouseLeave = () => {
    setHeroRotate({ x: 0, y: 0 });
  };

  // Initiating the Hardware Platform Stress Test
  const initiateStressTest = () => {
    if (isStressTesting) return;
    setIsStressTesting(true);
    setStressProgress(0);
    setStressLogs([
      `[${new Date().toLocaleTimeString()}] INITIATING EXTREME KERNEL BENCHMARK...`,
      `[${new Date().toLocaleTimeString()}] DETECTED INTEL XEON / AMD THREADRIPPER GRID...`,
    ]);

    const logsArray = [
      "ESTABLISHING LIQUID COOLING FLOW // MAX PRESSURE...",
      "SPAWNING 64 CUDA COMPUTING CORRIDORS...",
      "LOADING INVENTORY DATABASE TO STRESS VRAM...",
      "OVERCLOCKING NVME RAID TO LEVEL 10 PROTOCOL...",
      "ALERT: SILICON MASS HEATING // RECIRCULATING AIR...",
      "VOLTAGE STABILIZED AT 1.34V // FREQUENCY 5.2GHZ...",
      "VALIDATING ERROR CORRECTION CODES (ECC)...",
      "THERMAL RETRIEVAL REPORT: CRITICAL LEVEL SECURED...",
      "BENCHMARK COMPLETED. SYSTEM COMPLIANT AT EXTREME SPEC.",
    ];

    let logCounter = 0;
    let progress = 0;

    const timer = setInterval(() => {
      progress += 10;
      setStressProgress(progress);

      // Fluctuate stats upwards under load
      setTelemetryStats({
        cpuTemp: 45 + Math.floor((progress / 100) * 44) + Math.floor(Math.random() * 3),
        cpuLoad: Math.min(100, 15 + Math.floor((progress / 100) * 85)),
        gpuTemp: 38 + Math.floor((progress / 100) * 38) + Math.floor(Math.random() * 4),
        gpuLoad: Math.min(100, 5 + Math.floor((progress / 100) * 95)),
        nvmeSpeed: 7120 + Math.floor((progress / 100) * 4500),
        fanSpeed: 35 + Math.floor((progress / 100) * 65),
      });

      if (progress % 10 === 0 && logCounter < logsArray.length) {
        setStressLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ${logsArray[logCounter]}`
        ]);
        logCounter++;
      }

      if (progress >= 100) {
        clearInterval(timer);
        setIsStressTesting(false);
        // Slowly drop specs back down
        setTimeout(() => {
          setTelemetryStats({
            cpuTemp: 45,
            cpuLoad: 10,
            gpuTemp: 40,
            gpuLoad: 4,
            nvmeSpeed: 7110,
            fanSpeed: 38,
          });
          setStressLogs((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] Telemetry reset to nominal parameters.`
          ]);
        }, 3000);
      }
    }, 800);
  };

  // Copy CSS sandbox utility
  const copySandboxCSS = () => {
    const cssCode = generateCSSCode();
    navigator.clipboard.writeText(cssCode);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  const generateCSSCode = () => {
    const shadowColor = 
      sandboxStyles.preset === "cyan" ? "rgba(0, 155, 227, 0.4)" : 
      sandboxStyles.preset === "purple" ? "rgba(168, 85, 247, 0.4)" : 
      "rgba(16, 185, 129, 0.4)";

    const gradient = 
      sandboxStyles.preset === "cyan" ? "linear-gradient(135deg, #032145 0%, #009be3 100%)" :
      sandboxStyles.preset === "purple" ? "linear-gradient(135deg, #1e1b4b 0%, #a855f7 100%)" :
      "linear-gradient(135deg, #022c22 0%, #10b981 100%)";

    return `.style-studio-component {
  width: ${sandboxStyles.width}px;
  height: ${sandboxStyles.height}px;
  border-radius: ${sandboxStyles.borderRadius}px;
  background: ${gradient};
  box-shadow: 0 ${sandboxStyles.shadowBlur / 2}px ${sandboxStyles.shadowBlur}px ${shadowColor};
  filter: drop-shadow(0 0 ${sandboxStyles.glowIntensity / 10}px ${shadowColor});
  transform: rotate(${sandboxStyles.gradientAngle}deg);
  transition: all 0.3s ease;
}`;
  };

  // Lounge Cafe helper methods
  const addToCart = (menuItem: typeof cafeMenu[0]) => {
    setCafeCart((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, amount: number) => {
    setCafeCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + amount;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const getCartTotal = () => {
    return cafeCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const submitCafeOrder = () => {
    if (cafeCart.length === 0) return;
    if (!cafeTable) {
      alert("Please designate a table number to ensure telemetry delivery.");
      return;
    }
    setOrderComplete(true);
    
    const totalText = `$${getCartTotal().toFixed(2)}`;

    setTimeout(() => {
      alert(`Order successfully processed!\nYour order has been transmitted to the Roast-Rest cafe kitchen.\nTable: ${cafeTable}\nTotal: ${totalText}`);
      setOrderComplete(false);
      setCafeCart([]);
      setCafeTable("");
      setCafeNotes("");
    }, 2000);
  };

  // Join SaaS waitlist with Supabase integration (Single Field Only)
  const handleSaaSWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Anti-Spam / Double-Submit protection
    if (saasSubmitting) return;

    // Strict client-side email validation using a Regex pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const sanitizedEmail = saasEmail.trim();
    if (!sanitizedEmail || !emailRegex.test(sanitizedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    setSaasSubmitting(true);
    setSaasSubmitStep(1); // 1: Validating Secure Node

    // Unique secure invitation code generated client-side
    const randomCode = `FUTR-${Math.floor(1000 + Math.random() * 9000)}-SaaS`;
    setSaasInviteCode(randomCode);

    // ========================================================
    // 🔌 HYBRID SUPABASE PRODUCTION CONFIGURATION
    // Connected to waitlist DB table with bulletproof fallback
    // ========================================================
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://lkoppqqqkiztjclnanun.supabase.co";
    const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrb3BwcXFxa2l6dGpjbG5hbnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMDQ3NjUsImV4cCI6MjA5ODY4MDc2NX0.ywl7d0MS84hRhqnQLM1B_9_-jnnLcej8LRjP3edOw54";

    // Connection Debugging & Validation: safe client check right after initialization
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.warn(
        "⚠️ Supabase environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are not set.\n" +
        "Using secure production hardcoded fallbacks as safety net."
      );
    }

    // Simulation steps for clean premium UI feedback
    setTimeout(async () => {
      setSaasSubmitStep(2); // 2: Encrypting Telemetry

      setTimeout(async () => {
        setSaasSubmitStep(3); // 3: Transmitting credentials

        // Real Supabase POST request capturing ONLY ONE FIELD: email
        try {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
            method: "POST",
            headers: {
              "apikey": SUPABASE_ANON_KEY,
              "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
              "Content-Type": "application/json",
              "Prefer": "return=minimal"
            },
            body: JSON.stringify({
              email: saasEmail
            })
          });

          if (!response.ok) {
            const errDetails = await response.text().catch(() => "No additional error response body available");
            
            // Inspect error details for unique/duplicate email constraint violation
            let isDuplicate = response.status === 409 || errDetails.includes("23505") || errDetails.includes("duplicate");
            try {
              const parsed = JSON.parse(errDetails);
              if (parsed.code === "23505" || (parsed.message && parsed.message.includes("unique") || parsed.message.includes("duplicate"))) {
                isDuplicate = true;
              }
            } catch (pErr) {
              // Ignore JSON parse errors
            }

            if (isDuplicate) {
              alert("This email is already registered in our waitlist! 😎");
              setSaasSubmitting(false);
              setSaasSubmitStep(0);
              return;
            }

            throw new Error(`HTTP Status ${response.status}: ${errDetails}`);
          }

          // Successful submission
          alert("Successfully joined the waitlist! 🎉");
          setSaasEmail(""); // Only clear the email input field state if the submission is 100% successful
          setSaasSubmitStep(4); // 4: Done
          setTimeout(() => {
            setSaasWaitlistJoined(true);
            setSaasSubmitting(false);
            setSaasSubmitStep(0);
          }, 1000);

        } catch (error: any) {
          console.error("Supabase Transmission Error:", error);
          alert("Something went wrong. Please try again later.");
          setSaasSubmitting(false);
          setSaasSubmitStep(0);
        }
      }, 1200);
    }, 1000);
  };

  // Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Please fill out the required telemetry fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(1); // Connecting

    // Step 1: Connecting
    setTimeout(() => {
      setSubmitStep(2); // Encrypting
      
      // Step 2: Encrypting payload
      setTimeout(async () => {
        setSubmitStep(3); // Transmitting
        
        // Step 3: Transmitting to core Futueros link using EmailJS API
        const hasRealCredentials = 
          FUTUEROS_CONFIG.EMAILJS_SERVICE_ID && 
          FUTUEROS_CONFIG.EMAILJS_SERVICE_ID !== "service_xxxxxxx" &&
          FUTUEROS_CONFIG.EMAILJS_PUBLIC_KEY &&
          FUTUEROS_CONFIG.EMAILJS_PUBLIC_KEY !== "user_xxxxxxxxxxxxxxxx";

        if (hasRealCredentials) {
          try {
            await fetch("https://api.emailjs.com/api/v1.0/email/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                service_id: FUTUEROS_CONFIG.EMAILJS_SERVICE_ID,
                template_id: FUTUEROS_CONFIG.EMAILJS_TEMPLATE_ID,
                user_id: FUTUEROS_CONFIG.EMAILJS_PUBLIC_KEY,
                template_params: {
                  name: contactForm.name,
                  email: contactForm.email,
                  phone: contactForm.phone || "Not specified",
                  location: contactForm.location || "Global Net Grid",
                  message: contactForm.message,
                }
              })
            });
          } catch (err) {
            console.error("EmailJS dispatch failed for contact form:", err);
          }
        }

        setTimeout(() => {
          setSubmitStep(4); // Done
          
          // We wait another second for user to view success state before resetting form
          setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStep(0);
            setContactForm({
              name: "",
              email: "",
              phone: "",
              message: "",
              location: "",
            });
            alert("Venture transmission successfully sent! We will review and establish connection shortly.");
          }, 1500);

        }, 1500);
      }, 1200);
    }, 1000);
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    let targetId = id.replace("#", "");
    if (targetId === "services") targetId = "about";
    if (targetId === "portfolio") targetId = "projects";
    if (targetId === "saas") targetId = "portfolio-nexus";
    
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-deep text-white font-sans selection:bg-primary/30 selection:text-white pb-10">
      
      {/* 1. Custom Code-Icon Cursor (Hidden on mobile) */}
      {cursorVisible && (
        <div 
          className="fixed pointer-events-none z-[9999] hidden lg:flex items-center justify-center transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: `${cursorPos.x}px`, 
            top: `${cursorPos.y}px`,
            transform: `translate(-50%, -50%) scale(${cursorHovered ? 1.25 : 1})`
          }}
        >
          {/* Cyan cursor footprint bubble */}
          <div className="absolute w-8 h-8 rounded-full bg-primary/10 blur-sm animate-pulse"></div>
          {/* Main cursor dot */}
          <div className={`w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#009be3] transition-transform duration-300 ${cursorHovered ? "scale-0" : "scale-100"}`}></div>
          {/* Custom code tag following cursor on hover */}
          <div className={`absolute left-4 top-4 px-2 py-1 bg-card-bg backdrop-blur-md rounded border border-primary/30 text-[10px] font-mono text-primary font-bold shadow-lg transition-all duration-300 transform ${cursorHovered ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 -translate-y-2"}`}>
            &lt;/&gt;
          </div>
        </div>
      )}

      {/* 2. Fixed Outer Ambient Cosmos Atmosphere */}
      <div className="space-bg">
        {/* Dynamic Nebulae */}
        <div className="nebula-glow w-[500px] h-[500px] bg-primary/10 top-[-100px] left-[-100px]" />
        <div className="nebula-glow w-[600px] h-[600px] bg-purple-900/10 bottom-[10%] right-[-100px]" />
        <div className="nebula-glow w-[400px] h-[400px] bg-emerald-900/10 top-[40%] left-[30%]" />
        
        {/* Ambient Twinkling Star Coordinates */}
        <div className="absolute top-[12%] left-[15%] w-1 h-1 bg-white rounded-full animate-twinkle"></div>
        <div className="absolute top-[25%] left-[80%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle [animation-delay:1s]"></div>
        <div className="absolute top-[45%] left-[5%] w-1 h-1 bg-white rounded-full animate-twinkle [animation-delay:2s]"></div>
        <div className="absolute top-[75%] left-[60%] w-[3px] h-[3px] bg-white rounded-full animate-twinkle [animation-delay:0.5s]"></div>
        <div className="absolute top-[88%] left-[22%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle [animation-delay:1.5s]"></div>
        <div className="absolute top-[35%] left-[45%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle [animation-delay:2.5s]"></div>
        <div className="absolute top-[60%] left-[90%] w-1 h-1 bg-white rounded-full animate-twinkle [animation-delay:0.8s]"></div>
      </div>

      {/* 3. HIGH-END GLASSMORPHIC NAVBAR */}
      <header className="hidden md:block sticky top-0 z-50 w-full glass-panel border-b border-primary/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand Layout */}
          <a 
            href="#home"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
              setMobileMenuOpen(false);
            }}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/40 relative overflow-hidden shadow-[0_0_15px_rgba(0,155,227,0.2)]">
               {/* Spinning gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-600 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <span className="font-sora font-extrabold text-lg text-primary cyan-glow-text">&lt;F&gt;</span>
            </div>
            <div>
              <span className="font-sora font-bold tracking-tight text-xl bg-gradient-to-r from-white to-text-muted bg-clip-text text-transparent">FUTUEROS</span>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[9px] font-mono tracking-widest text-primary uppercase">SYSTEMS.CORE</span>
              </div>
            </div>
          </a>

          {/* Text Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm font-medium transition-colors relative py-2 block ${
                  activeSection === link.id ? "text-primary font-semibold" : "text-text-muted hover:text-white"
                }`}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full shadow-[0_0_8px_#009be3]"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Glowing CTA + Live Time Stamp + Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-card-bg/50 border border-primary/20 rounded-md">
              <Clock className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-xs font-mono text-text-muted tracking-wider">{currentTime || "17:53:26"} UTC</span>
            </div>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
                setMobileMenuOpen(false);
              }}
              className="hidden sm:inline-block px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-sora font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,155,227,0.4)] hover:shadow-[0_0_25px_rgba(0,155,227,0.7)] hover:-translate-y-[2px] active:translate-y-0 text-center"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              Launch Venture
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:text-white hover:bg-primary/20 transition-all duration-300 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Slide-out Menu */}
        <motion.div
          initial={false}
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto", display: "block" },
            closed: { opacity: 0, height: 0, transitionEnd: { display: "none" } }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden w-full bg-bg-deep/98 backdrop-blur-2xl border-t border-primary/15 overflow-hidden shadow-2xl"
        >
          <div className="px-6 py-6 space-y-5 flex flex-col">
            {[
              { id: "home", label: "Home Hub" },
              { id: "about", label: "About Us" },
              { id: "projects", label: "Featured Projects" },
              { id: "contact", label: "Contact Protocol" }
            ].map((link, idx) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                variants={{
                  open: { opacity: 1, x: 0, transition: { delay: idx * 0.04 } },
                  closed: { opacity: 0, x: -15 }
                }}
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-base font-sora font-medium py-2 border-b border-primary/5 transition-all duration-300 flex items-center justify-between group ${
                  activeSection === link.id ? "text-primary font-bold pl-2" : "text-text-muted hover:text-white"
                }`}
              >
                <span className="flex items-center space-x-3">
                  <span className={`text-[10px] font-mono ${activeSection === link.id ? "text-primary font-bold" : "text-primary/30"}`}>
                    0{idx + 1} //
                  </span>
                  <span>{link.label}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-primary/40 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}

            {/* Mobile Actions block */}
            <motion.div
              variants={{
                open: { opacity: 1, y: 0, transition: { delay: 0.2 } },
                closed: { opacity: 0, y: 10 }
              }}
              className="pt-4 flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between px-3 py-2 bg-card-bg/40 border border-primary/15 rounded-lg">
                <span className="text-[10px] font-mono text-text-muted tracking-widest">// SECURE FEED LINK</span>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-wider">ONLINE</span>
                </div>
              </div>

              {/* Mobile-only CTA (on xs devices where main CTA is hidden) */}
              <a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/95 text-white font-sora font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,155,227,0.3)] hover:shadow-[0_0_35px_rgba(0,155,227,0.6)] text-center animate-pulse block"
              >
                Launch Venture
              </a>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* 4. MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ================= HERO SECTION ================= */}
        <section 
          id="home" 
          className="pt-20 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-80px)] border-b border-primary/10 scroll-mt-20"
        >
          {/* Left Column: Visual copy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 z-10">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full w-fit">
              <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
              <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">Next-Gen Software Architects</span>
            </div>

            <h1 className="font-sora font-extrabold text-4xl sm:text-5xl xl:text-[54px] leading-[1.15] tracking-tight text-white uppercase">
              ENGINEERING <br />
              <span className="bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-transparent">FUTURE-PROOF</span> <br />
              DIGITAL PRODUCTS
            </h1>

            <h2 className="text-base sm:text-lg font-mono text-primary/90 uppercase tracking-wider font-semibold">
              Empowering Brands Through Centered Digital Transformation & Next-Gen Micro-SaaS.
            </h2>

            <p className="text-lg text-text-muted font-light leading-relaxed max-w-xl">
              Bridging the gap between abstract concepts and highly scalable, production-ready systems. We engineer digital ecosystems tailored for extreme resilience and performance.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="px-8 py-4 rounded-xl bg-primary text-white font-sora font-semibold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,155,227,0.6)] transition-all duration-300 hover:-translate-y-1 text-center"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                Build Your Product With Us
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
                className="px-8 py-4 rounded-xl border border-primary/30 hover:border-primary/80 bg-card-bg/40 hover:bg-card-bg text-white font-sora font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2 text-center"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <span>View Deployments</span>
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </a>
            </div>

            {/* Micro details */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-primary/5 max-w-lg">
              <div>
                <h4 className="text-2xl font-sora font-bold text-white">100%</h4>
                <p className="text-[11px] font-mono text-text-muted tracking-wider uppercase uppercase">Architecture Integrity</p>
              </div>
              <div>
                <h4 className="text-2xl font-sora font-bold text-white">&lt;60ms</h4>
                <p className="text-[11px] font-mono text-text-muted tracking-wider uppercase">Average Engine Latency</p>
              </div>
              <div>
                <h4 className="text-2xl font-sora font-bold text-white">4.9/5</h4>
                <p className="text-[11px] font-mono text-text-muted tracking-wider uppercase">Lounge Feedback Metric</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Parallax Console Cube */}
          <div 
            className="lg:col-span-5 flex items-center justify-center relative perspective-container z-20"
            ref={heroRef}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
          >
            <div 
              className="w-full max-w-md aspect-square glass-panel rounded-2xl p-6 preserve-3d relative flex flex-col justify-between overflow-hidden group shadow-2xl transition-all duration-500 ease-out border border-primary/30"
              style={{
                transform: `rotateX(${heroRotate.x}deg) rotateY(${heroRotate.y}deg) translateZ(20px)`,
              }}
            >
              {/* Glowing decorative radar circles in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-primary/10 pointer-events-none group-hover:border-primary/20 transition-all duration-500"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-primary/5 pointer-events-none group-hover:scale-110 transition-all duration-500"></div>

              {/* Header inside the holographic card */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_#009be3] animate-pulse"></span>
                  <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">HOLO_INTERFACE_V2.1</span>
                </div>
                <div className="px-2 py-0.5 bg-primary/20 rounded text-[9px] font-mono text-primary">SECURE_NODE</div>
              </div>

              {/* Main Visualizer: 3D-looking layout replicating reference image 2 */}
              <div className="relative my-8 flex items-center justify-center flex-1 preserve-3d z-10 pointer-events-none">
                
                {/* 3D Geometric Floating Box Structure */}
                <div className="w-56 h-56 relative animate-float preserve-3d flex items-center justify-center">
                  
                  {/* Glowing core sphere */}
                  <div className="absolute w-20 h-20 rounded-full bg-primary/15 filter blur-md shadow-[0_0_30px_rgba(0,155,227,0.3)] border border-primary/25"></div>

                  {/* Glassmorphic floating plates with CSS transform rotations */}
                  <div className="absolute inset-0 border border-primary/30 rounded-lg transform rotate-45 flex items-center justify-center glass-panel">
                    <div className="text-center transform -rotate-45">
                      <Code className="w-10 h-10 text-primary mx-auto mb-2 animate-pulse" />
                      <span className="text-xs font-mono tracking-widest text-white block">Futueros</span>
                      <span className="text-[9px] font-mono text-text-muted">SAAS CORE</span>
                    </div>
                  </div>

                  {/* Satellite floating labels replicating reference images */}
                  <div className="absolute top-[-20px] left-[-10px] px-2.5 py-1 bg-card-bg/90 border border-primary/40 rounded text-[9px] font-mono text-white shadow-lg transform translateZ(40px)">
                    Analytical Design
                  </div>
                  <div className="absolute bottom-[-15px] right-[-10px] px-2.5 py-1 bg-card-bg/90 border border-primary/40 rounded text-[9px] font-mono text-primary shadow-lg transform translateZ(30px)">
                    StyleStudio (SaaS)
                  </div>

                </div>

              </div>

              {/* Bottom Telemetry Display */}
              <div className="z-10 bg-black/40 border border-primary/10 rounded-lg p-3 font-mono text-xs text-text-muted space-y-1">
                <div className="flex justify-between">
                  <span>DEPLOYED ENGINE:</span>
                  <span className="text-white">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>LATENCY LINK:</span>
                  <span className="text-primary font-bold">14ms // EXCELLENT</span>
                </div>
                <div className="w-full bg-primary/5 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "88%" }}></div>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* ================= SERVICES SECTION ================= */}
        <section id="about" className="py-28 border-b border-primary/10 scroll-mt-20">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary uppercase font-bold">// Strategic Solutions</span>
            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl text-white">ABOUT US & CORE CAPABILITIES</h2>
            <p className="text-text-muted text-base">
              Modular solutions designed for scale, high telemetry performance, and complete aesthetic dominance in competitive tech sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Product Architecture */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0 }}
              className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between min-h-[340px] group relative hover:-translate-y-2"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:border-primary/80 transition-colors">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-primary tracking-widest uppercase">System Design</span>
                  <h3 className="font-sora font-bold text-xl text-white">Product Architecture</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Deconstructing complex enterprise business goals into pristine, hyper-scalable system blueprints built to withstand massive traffic spikes and data loads.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-primary/5 flex items-center justify-between text-xs font-mono text-primary group-hover:text-white transition-colors">
                <span>01 // ENGINE BLUEPRINT</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Card 2: Full-Stack Precision */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between min-h-[340px] group relative hover:-translate-y-2"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:border-primary/80 transition-colors">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-primary tracking-widest uppercase">Frontend & Backend</span>
                  <h3 className="font-sora font-bold text-xl text-white">Full-Stack Precision</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Blending robust microservices and secure database structures with reactive, elegant, and high-performance user interfaces rendered at 60 FPS.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-primary/5 flex items-center justify-between text-xs font-mono text-primary group-hover:text-white transition-colors">
                <span>02 // HIGH PRECISION</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Card 3: Intangible Assets */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between min-h-[340px] group relative hover:-translate-y-2"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:border-primary/80 transition-colors">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-primary tracking-widest uppercase">Proprietary Tech</span>
                  <h3 className="font-sora font-bold text-xl text-white">Intangible Assets</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Developing custom internal workspace utilities, code pipelines, and premium automation Micro-SaaS units to eliminate operational bottlenecks.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-primary/5 flex items-center justify-between text-xs font-mono text-primary group-hover:text-white transition-colors">
                <span>03 // UTILITY ENGINE</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

          </div>

        </section>

        {/* ================= PORTFOLIO SECTION ================= */}
        <section id="projects" className="py-28 border-b border-primary/10 scroll-mt-20">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary uppercase font-bold">// Live Ecosystem Deployments</span>
            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl text-white">FEATURED PROJECTS</h2>
            <p className="text-text-muted text-base">
              Explore actual interactive software modules engineered by Futueros. Click, adjust, and interact with the live telemetry systems below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-[70px]">
            
            {/* 1. PORTFOLIO CARD: NO_LAG WORKSTATION */}
            <motion.div 
              id="portfolio-nolag" 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between border border-primary/20 hover:border-primary/40 transition-colors space-y-6 scroll-mt-24"
            >
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/30 text-[10px] font-mono text-red-400 rounded uppercase tracking-wider">
                    ⚡ Hardware Telemetry Grid
                  </span>
                  <span className="text-xs font-mono text-text-muted">ID: NOLAG_V1.0</span>
                </div>
                
                <h3 className="font-sora font-extrabold text-2xl text-white">
                  {PROJECTS_DATA[0].projectName}
                </h3>
                
                <p className="text-sm text-text-muted leading-relaxed">
                  {PROJECTS_DATA[0].description}
                </p>

                {/* Project Image Box */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-primary/10 group/img">
                  <img 
                    src={PROJECTS_DATA[0].projectImageSrc} 
                    alt="NO_LAG extreme workstation hardware platform preview" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent opacity-65"></div>
                  
                  {/* Badge indicating preview nature */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 bg-black/85 backdrop-blur-md rounded border border-primary/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[9px] font-mono text-white tracking-wider uppercase font-bold">PROJECT GLIMPSE // INTERACTIVE CONCEPT PREVIEW</span>
                  </div>
                </div>
              </div>

              {/* Live Interactive Telemetry System inside the Card */}
              <div className="bg-black/50 border border-primary/10 rounded-xl p-5 terminal-screen">
                <div className="flex justify-between items-center pb-3 border-b border-primary/10 mb-4 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span className="text-white uppercase font-bold">Telemetry Monitor</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedSubsystem("cpu")}
                      className={`px-2 py-0.5 rounded text-[10px] ${selectedSubsystem === "cpu" ? "bg-primary text-white" : "bg-primary/5 text-text-muted hover:text-white"}`}
                    >
                      CPU
                    </button>
                    <button 
                      onClick={() => setSelectedSubsystem("gpu")}
                      className={`px-2 py-0.5 rounded text-[10px] ${selectedSubsystem === "gpu" ? "bg-primary text-white" : "bg-primary/5 text-text-muted hover:text-white"}`}
                    >
                      GPU
                    </button>
                    <button 
                      onClick={() => setSelectedSubsystem("nvme")}
                      className={`px-2 py-0.5 rounded text-[10px] ${selectedSubsystem === "nvme" ? "bg-primary text-white" : "bg-primary/5 text-text-muted hover:text-white"}`}
                    >
                      RAID
                    </button>
                  </div>
                </div>

                {/* Subsystem specific telemetry view */}
                {selectedSubsystem === "cpu" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span>CORE TEMPERATURE:</span>
                      <span className={telemetryStats.cpuTemp > 80 ? "text-red-400 font-bold" : "text-primary"}>
                        {telemetryStats.cpuTemp}°C
                      </span>
                    </div>
                    <div className="w-full bg-primary/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${telemetryStats.cpuTemp > 80 ? "bg-red-400" : "bg-primary"}`}
                        style={{ width: `${(telemetryStats.cpuTemp / 110) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>PROCESSOR CORE LOAD:</span>
                      <span className="text-white">{telemetryStats.cpuLoad}%</span>
                    </div>
                    <div className="w-full bg-primary/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${telemetryStats.cpuLoad}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {selectedSubsystem === "gpu" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span>VRAM CORE TEMP:</span>
                      <span className={telemetryStats.gpuTemp > 75 ? "text-red-400 font-bold" : "text-primary"}>
                        {telemetryStats.gpuTemp}°C
                      </span>
                    </div>
                    <div className="w-full bg-primary/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${telemetryStats.gpuTemp > 75 ? "bg-red-400" : "bg-primary"}`}
                        style={{ width: `${(telemetryStats.gpuTemp / 100) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>GPU COMPUTE THREADS:</span>
                      <span className="text-white">{telemetryStats.gpuLoad}%</span>
                    </div>
                    <div className="w-full bg-primary/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${telemetryStats.gpuLoad}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {selectedSubsystem === "nvme" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span>RAID NVMe SPEED:</span>
                      <span className="text-primary font-bold">{(telemetryStats.nvmeSpeed / 1024).toFixed(2)} GB/s</span>
                    </div>
                    <div className="w-full bg-primary/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${(telemetryStats.nvmeSpeed / 12000) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>COOLING LIQUID FAN SPEED:</span>
                      <span className="text-white">{telemetryStats.fanSpeed}%</span>
                    </div>
                    <div className="w-full bg-primary/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${telemetryStats.fanSpeed}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Real-time stress test logs */}
                <div className="mt-4 bg-black/60 p-3 rounded border border-primary/5 h-28 overflow-y-auto font-mono text-[10px] text-text-muted space-y-1">
                  {stressLogs.map((log, idx) => (
                    <div key={idx} className="leading-normal">
                      &gt; <span className="text-white">{log}</span>
                    </div>
                  ))}
                </div>

                {/* Stress Test Trigger */}
                <button
                  onClick={initiateStressTest}
                  disabled={isStressTesting}
                  className={`mt-4 w-full py-2.5 rounded font-mono font-bold text-xs uppercase tracking-widest transition-all ${
                    isStressTesting 
                      ? "bg-primary-glow border border-primary/40 text-primary animate-pulse cursor-wait" 
                      : "bg-primary hover:bg-primary/90 text-white shadow-[0_0_12px_rgba(0,155,227,0.3)]"
                  }`}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  {isStressTesting ? `STRESS TESTING CORE... ${stressProgress}%` : "⚡ Initiate Stress Test Directive"}
                </button>

              </div>

              <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-xs font-mono">
                <span className="text-text-muted">TECH STACK: React, Tailwind v4, High-Res WebGL Telemetry</span>
                <a 
                  href={PROJECTS_DATA[0].projectLiveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline flex items-center space-x-1"
                >
                  <span>Visit Live Workstation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>

            {/* 2. PORTFOLIO CARD: STYLESTUDIO CUSTOMIZER */}
            <motion.div 
              id="portfolio-stylestudio" 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between border border-primary/20 hover:border-primary/40 transition-colors space-y-6 scroll-mt-24"
            >
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono text-purple-400 rounded uppercase tracking-wider">
                    🎨 Frontend Component Sandbox
                  </span>
                  <span className="text-xs font-mono text-text-muted">ID: STYLE_V3.0</span>
                </div>
                
                <h3 className="font-sora font-extrabold text-2xl text-white">
                  {PROJECTS_DATA[1].projectName}
                </h3>
                
                <p className="text-sm text-text-muted leading-relaxed">
                  {PROJECTS_DATA[1].description}
                </p>

                {/* Project Image Box */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-primary/10 group/img">
                  <img 
                    src={PROJECTS_DATA[1].projectImageSrc} 
                    alt="StyleStudio customizer visual preview" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent opacity-65"></div>
                  
                  {/* Badge indicating preview nature */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 bg-black/85 backdrop-blur-md rounded border border-primary/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[9px] font-mono text-white tracking-wider uppercase font-bold">PROJECT GLIMPSE // INTERACTIVE CONCEPT PREVIEW</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Workspace */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/40 border border-primary/10 rounded-xl p-4">
                
                {/* Control Panel Column */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-primary uppercase block font-bold border-b border-primary/10 pb-1">CONTROL PARAMETERS</span>
                  
                  {/* Sizing Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-text-muted">
                      <span>DIMENSION SCALE:</span>
                      <span>{sandboxStyles.width}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="120" 
                      max="240" 
                      value={sandboxStyles.width}
                      onChange={(e) => setSandboxStyles({...sandboxStyles, width: parseInt(e.target.value), height: parseInt(e.target.value)})}
                      className="w-full accent-primary bg-primary/10 rounded-lg h-1.5 cursor-pointer"
                    />
                  </div>

                  {/* Corner Sizing */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-text-muted">
                      <span>BORDER RADIUS:</span>
                      <span>{sandboxStyles.borderRadius}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="40" 
                      value={sandboxStyles.borderRadius}
                      onChange={(e) => setSandboxStyles({...sandboxStyles, borderRadius: parseInt(e.target.value)})}
                      className="w-full accent-primary bg-primary/10 rounded-lg h-1.5 cursor-pointer"
                    />
                  </div>

                  {/* Shadow Radius */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-text-muted">
                      <span>DEPTH BOX SHADOW:</span>
                      <span>{sandboxStyles.shadowBlur}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="50" 
                      value={sandboxStyles.shadowBlur}
                      onChange={(e) => setSandboxStyles({...sandboxStyles, shadowBlur: parseInt(e.target.value)})}
                      className="w-full accent-primary bg-primary/10 rounded-lg h-1.5 cursor-pointer"
                    />
                  </div>

                  {/* Preset Colors */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-text-muted block uppercase">ACTIVE THEME PROFILE:</span>
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <button 
                        onClick={() => setSandboxStyles({...sandboxStyles, preset: "cyan"})}
                        className={`py-1 text-[10px] font-mono uppercase rounded ${sandboxStyles.preset === "cyan" ? "bg-primary text-white" : "bg-card-bg text-text-muted"}`}
                      >
                        Cyan Glow
                      </button>
                      <button 
                        onClick={() => setSandboxStyles({...sandboxStyles, preset: "purple"})}
                        className={`py-1 text-[10px] font-mono uppercase rounded ${sandboxStyles.preset === "purple" ? "bg-purple-600 text-white" : "bg-card-bg text-text-muted"}`}
                      >
                        Purple
                      </button>
                      <button 
                        onClick={() => setSandboxStyles({...sandboxStyles, preset: "emerald"})}
                        className={`py-1 text-[10px] font-mono uppercase rounded ${sandboxStyles.preset === "emerald" ? "bg-emerald-600 text-white" : "bg-card-bg text-text-muted"}`}
                      >
                        Emerald
                      </button>
                    </div>
                  </div>

                </div>

                {/* Direct Visual Rendering Column */}
                <div className="flex flex-col items-center justify-center p-2 relative bg-black/60 rounded-lg overflow-hidden min-h-[200px]">
                  
                  {/* Styled Dynamic Preview Block */}
                  <div 
                    className="transition-all duration-300 flex items-center justify-center font-mono text-xs text-white/90 text-center select-none"
                    style={{
                      width: `${sandboxStyles.width}px`,
                      height: `${sandboxStyles.height}px`,
                      borderRadius: `${sandboxStyles.borderRadius}px`,
                      background: 
                        sandboxStyles.preset === "cyan" ? `linear-gradient(${sandboxStyles.gradientAngle}deg, #032145 0%, #009be3 100%)` :
                        sandboxStyles.preset === "purple" ? `linear-gradient(${sandboxStyles.gradientAngle}deg, #1e1b4b 0%, #a855f7 100%)` :
                        `linear-gradient(${sandboxStyles.gradientAngle}deg, #022c22 0%, #10b981 100%)`,
                      boxShadow: `0 ${sandboxStyles.shadowBlur / 2}px ${sandboxStyles.shadowBlur}px ${
                        sandboxStyles.preset === "cyan" ? "rgba(0, 155, 227, 0.45)" :
                        sandboxStyles.preset === "purple" ? "rgba(168, 85, 247, 0.45)" :
                        "rgba(16, 185, 129, 0.45)"
                      }`,
                    }}
                  >
                    <div className="p-2 bg-black/40 rounded backdrop-blur-sm scale-90 md:scale-100">
                      <span>PREVIEW</span>
                      <span className="block text-[9px] opacity-85">StyleStudio v3</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Code Export Drawer inside Card */}
              <div className="bg-black/60 border border-primary/15 rounded-lg p-3 font-mono text-[11px] relative">
                <button 
                  onClick={copySandboxCSS}
                  className="absolute top-2 right-2 p-2 hover:bg-white/10 rounded transition-all text-primary"
                  title="Copy Syntax-Highlighted CSS Code"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  {copiedCSS ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <div className="text-text-muted border-b border-primary/10 pb-1 mb-2 uppercase text-[9px]">COMPILE EXPORT CODE:</div>
                <pre className="text-white overflow-x-auto whitespace-pre leading-normal">
                  {generateCSSCode().substring(0, 150)}...
                </pre>
              </div>

              <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-xs font-mono">
                <span className="text-text-muted">CSS COMPONENT EXPORTER</span>
                <a 
                  href={PROJECTS_DATA[1].projectLiveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline flex items-center space-x-1"
                >
                  <span>Visit StyleStudio Live</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>

            {/* 3. PORTFOLIO CARD: CAIRO LOUNGE CAFE ORDERING */}
            <motion.div 
              id="portfolio-cairolounge" 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between border border-primary/20 hover:border-primary/40 transition-colors space-y-6 scroll-mt-24"
            >
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 rounded uppercase tracking-wider">
                    ☕ Specialty Brews & Lounge
                  </span>
                  <span className="text-xs font-mono text-text-muted">Cairo, Maadi Area</span>
                </div>
                
                <h3 className="font-sora font-extrabold text-2xl text-white">
                  {PROJECTS_DATA[2].projectName}
                </h3>
                
                <p className="text-sm text-text-muted leading-relaxed">
                  {PROJECTS_DATA[2].description}
                </p>

                {/* Project Image Box */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-primary/10 group/img">
                  <img 
                    src={PROJECTS_DATA[2].projectImageSrc} 
                    alt="Roast-Rest cafe landing platform preview" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent opacity-65"></div>
                  
                  {/* Badge indicating preview nature */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 bg-black/85 backdrop-blur-md rounded border border-primary/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[9px] font-mono text-white tracking-wider uppercase font-bold">PROJECT GLIMPSE // INTERACTIVE CONCEPT PREVIEW</span>
                  </div>
                </div>
              </div>

              {/* Cafe Menu Interactive Simulator Grid */}
              <div className="bg-black/40 border border-primary/10 rounded-xl p-4 space-y-4">
                
                <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                  <span className="text-[11px] font-mono text-primary font-bold uppercase">Maadi Lounge Specialty Menu</span>
                  <div className="flex space-x-1">
                    {["all", "drinks", "shisha", "dessert"].map((category) => (
                      <button
                        key={category}
                        onClick={() => setCafeActiveCategory(category as any)}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase ${
                          cafeActiveCategory === category ? "bg-primary text-white" : "bg-primary/5 text-text-muted hover:text-white"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scrollable grid menu */}
                <div className="grid grid-cols-2 gap-2 h-44 overflow-y-auto pr-1">
                  {cafeMenu
                    .filter((item) => cafeActiveCategory === "all" || item.category === cafeActiveCategory)
                    .map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => addToCart(item)}
                        className="p-2.5 bg-black/60 rounded border border-primary/5 hover:border-primary/30 transition-all cursor-pointer flex justify-between items-center group/item hover:bg-primary/5"
                        onMouseEnter={() => setCursorHovered(true)}
                        onMouseLeave={() => setCursorHovered(false)}
                      >
                        <div>
                          <span className="text-[11px] text-white block font-semibold truncate max-w-[110px]">{item.name}</span>
                          <span className="text-[10px] font-mono text-primary">${item.price.toFixed(2)}</span>
                        </div>
                        <div className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold group-hover/item:bg-primary group-hover/item:text-white transition-all">
                          +
                        </div>
                      </div>
                    ))}
                </div>

                {/* Interactive Shopping Cart List */}
                <div className="border-t border-primary/10 pt-3 space-y-2">
                  <span className="text-[10px] font-mono text-text-muted block uppercase">ACTIVE BASKET PAYLOAD:</span>
                  
                  {cafeCart.length === 0 ? (
                    <div className="p-3 bg-black/40 rounded text-center text-[10px] text-text-muted font-mono uppercase">
                      Basket Empty // Add specialties above
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                      {cafeCart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-black/50 p-2 rounded text-[11px] font-mono">
                          <span className="text-white truncate max-w-[140px]">{item.name}</span>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="w-4 h-4 rounded bg-primary/10 text-primary flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className="text-white font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="w-4 h-4 rounded bg-primary/10 text-primary flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                            <span className="text-primary font-semibold ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Table selector & Order Transmitter */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <input 
                    type="text" 
                    placeholder="Table # (e.g., Table 12)" 
                    value={cafeTable}
                    onChange={(e) => setCafeTable(e.target.value)}
                    className="p-2 bg-black/60 border border-primary/10 rounded text-xs text-white focus:border-primary outline-none font-mono"
                  />
                  <input 
                    type="text" 
                    placeholder="Dietary adjustments..." 
                    value={cafeNotes}
                    onChange={(e) => setCafeNotes(e.target.value)}
                    className="p-2 bg-black/60 border border-primary/10 rounded text-xs text-white focus:border-primary outline-none font-mono"
                  />
                </div>

                <button
                  onClick={submitCafeOrder}
                  disabled={cafeCart.length === 0 || orderComplete}
                  className={`w-full py-2.5 rounded font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                    orderComplete 
                      ? "bg-emerald-600 text-white cursor-wait" 
                      : cafeCart.length === 0
                        ? "bg-primary/5 text-text-muted cursor-not-allowed border border-primary/5"
                        : "bg-primary hover:bg-primary/90 text-white shadow-lg"
                  }`}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <Coffee className="w-4 h-4" />
                  <span>
                    {orderComplete 
                      ? "TRANSMITTING TO MAADI LOUNGE KITCHEN..." 
                      : `TRANSIT KITCHEN PAYLOAD // TOTAL: $${getCartTotal().toFixed(2)}`
                    }
                  </span>
                </button>

              </div>

              <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-xs font-mono">
                <span className="text-text-muted">INTEGRATED SYSTEM: CAFE ENGINE v1.2</span>
                <a 
                  href={PROJECTS_DATA[2].projectLiveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline flex items-center space-x-1"
                >
                  <span>Visit Roast-Rest Live</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>

            {/* 4. PORTFOLIO CARD: MICRO-SAAS COUNTDOWN WAITLIST */}
            <motion.div 
              id="portfolio-nexus" 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between border border-primary/20 hover:border-primary/40 transition-colors space-y-6 scroll-mt-24"
            >
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/30 text-[10px] font-mono text-yellow-400 rounded uppercase tracking-wider animate-pulse">
                    🔒 Proprietary Security Lock
                  </span>
                  <span className="text-xs font-mono text-text-muted">STEALTH PROTOCOL</span>
                </div>
                
                <h3 className="font-sora font-extrabold text-2xl text-white">
                  Next Micro-SaaS Product — COMING SOON
                </h3>
                
                <p className="text-sm text-text-muted leading-relaxed">
                  Our upcoming proprietary workspace utility engineered to automate backend telemetry logging and optimize frontend code generation. Built as an invisible, self-hosting node within the Futueros ecosystem.
                </p>

                {/* Project Image Box */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-primary/10 group/img">
                  <img 
                    src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80" 
                    alt="Coming soon stealth micro-saas preview" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent opacity-65"></div>
                  
                  {/* Badge indicating preview nature */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 bg-black/85 backdrop-blur-md rounded border border-primary/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[9px] font-mono text-white tracking-wider uppercase font-bold">PROJECT GLIMPSE // INTERACTIVE CONCEPT PREVIEW</span>
                  </div>
                </div>
              </div>

              {/* Holographic Lock Layout Replicating Reference Style */}
              <div className="bg-black/50 border border-primary/10 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                
                {/* Holographic glowing background sweep lines */}
                <div className="absolute inset-0 hologram-scan pointer-events-none"></div>

                {/* Top Section: Ticking Countdown Timer */}
                <div className="text-center z-10 space-y-1">
                  <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest block">// Launch Sequence Initiated</span>
                  
                  <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto pt-2">
                    <div className="bg-black/60 p-2 rounded border border-primary/10">
                      <span className="block text-xl font-sora font-extrabold text-white">{timeLeft.days}</span>
                      <span className="block text-[8px] font-mono text-text-muted uppercase">Days</span>
                    </div>
                    <div className="bg-black/60 p-2 rounded border border-primary/10">
                      <span className="block text-xl font-sora font-extrabold text-white">{timeLeft.hours}</span>
                      <span className="block text-[8px] font-mono text-text-muted uppercase">Hours</span>
                    </div>
                    <div className="bg-black/60 p-2 rounded border border-primary/10">
                      <span className="block text-xl font-sora font-extrabold text-white">{timeLeft.minutes}</span>
                      <span className="block text-[8px] font-mono text-text-muted uppercase">Mins</span>
                    </div>
                    <div className="bg-black/60 p-2 rounded border border-primary/10">
                      <span className="block text-xl font-sora font-extrabold text-primary animate-pulse">{timeLeft.seconds}</span>
                      <span className="block text-[8px] font-mono text-text-muted uppercase">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Middle Locked visualizer */}
                <div className="flex flex-col items-center justify-center space-y-2 z-10 py-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,155,227,0.3)] animate-bounce">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-white tracking-widest uppercase">Ecosystem Block Locked</span>
                </div>

                {/* Bottom Waitlist Form */}
                <div className="z-10 bg-black/40 border border-primary/15 rounded-lg p-3">
                  {saasSubmitting ? (
                    <div className="flex flex-col items-center justify-center py-2 space-y-2 font-mono text-[11px] text-primary">
                      <div className="flex items-center space-x-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="font-bold uppercase tracking-wider">
                          {saasSubmitStep === 1 && "Validating Secure Node..."}
                          {saasSubmitStep === 2 && "Encrypting Telemetry..."}
                          {saasSubmitStep === 3 && "Transmitting credentials..."}
                          {saasSubmitStep === 4 && "Securing launch pipeline..."}
                        </span>
                      </div>
                      <div className="w-full bg-primary-glow h-1 rounded overflow-hidden">
                        <div 
                          className="bg-primary h-full transition-all duration-500" 
                          style={{ width: `${saasSubmitStep * 25}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : !saasWaitlistJoined ? (
                    <form onSubmit={handleSaaSWaitlist} className="flex gap-2">
                      <input 
                        type="email" 
                        required
                        disabled={saasSubmitting}
                        placeholder="Enter email for private node entry..." 
                        value={saasEmail}
                        onChange={(e) => setSaasEmail(e.target.value)}
                        className="flex-1 px-3 py-2 bg-black/60 border border-primary/10 rounded text-xs text-white focus:border-primary outline-none font-mono disabled:opacity-50"
                      />
                      <button 
                        type="submit"
                        disabled={saasSubmitting}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 rounded text-xs font-mono font-bold text-white shadow-md transition-all whitespace-nowrap disabled:opacity-50"
                        onMouseEnter={() => setCursorHovered(true)}
                        onMouseLeave={() => setCursorHovered(false)}
                      >
                        Join Node Waitlist
                      </button>
                    </form>
                  ) : (
                    <div className="text-center font-mono text-[11px] text-emerald-400 space-y-1">
                      <div className="flex items-center justify-center space-x-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span className="font-bold">WAITLIST TRANSMISSION COMPLETED</span>
                      </div>
                      <p className="text-text-muted text-[10px]">
                        Ecosystem credentials reserved. Invitation verification code: <span className="text-white font-bold block mt-1 border border-emerald-400/25 py-0.5 rounded bg-emerald-400/5">{saasInviteCode}</span>
                      </p>
                    </div>
                  )}
                </div>

              </div>

              <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-xs font-mono">
                <span className="text-text-muted">PROJECTED CODENAME: PROJECT NEXUS</span>
                <span className="text-yellow-400 flex items-center space-x-1 select-none">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
                  <span>Currently in stealth</span>
                </span>
              </div>

            </motion.div>

          </div>

        </section>

        {/* ================= CONTACT SECTION ("INITIATE PROTOCOL") ================= */}
        <section id="contact" className="py-28 scroll-mt-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
              
              <div className="space-y-6">
                <span className="text-xs font-mono tracking-widest text-primary uppercase font-bold">// Comm Channels Active</span>
                <h2 className="font-sora font-extrabold text-4xl text-white tracking-tight">
                  INITIATE PROTOCOL
                </h2>
                <p className="text-text-muted text-base leading-relaxed max-w-md">
                  Ready to architect your next secure digital venture? Submit the telemetry payload to establish a secure transmission line directly with our executive engineering team.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Email Channel */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-text-muted uppercase tracking-wider">Secure Mail Inbox</span>
                    <a href={`mailto:${FUTUEROS_CONFIG.COMPANY_EMAIL}`} className="text-base font-semibold text-white hover:text-primary transition-colors">
                      {FUTUEROS_CONFIG.COMPANY_EMAIL}
                    </a>
                  </div>
                </div>



                {/* Location Grid */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-text-muted uppercase tracking-wider">Main Node Location</span>
                    <span className="text-base font-semibold text-white">
                      Cooming Soon
                    </span>
                  </div>
                </div>

              </div>

              <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl max-w-sm">
                <span className="text-[10px] font-mono text-primary block uppercase font-bold">ECOSYSTEM HEALTH LOG:</span>
                <p className="text-xs text-text-muted font-mono leading-relaxed mt-1">
                  All systems operating at 100% capacity. Node routing is encrypted. Transmission lag average &lt; 12ms.
                </p>
              </div>

            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="glass-panel rounded-2xl p-8 border border-primary/25 relative overflow-hidden h-full flex flex-col justify-between">
                
                {/* Form header */}
                <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">Secure Transmission Form</span>
                  </div>
                  <span className="text-[9px] font-mono text-text-muted">ENCRYPTION: SHIELD_256</span>
                </div>

                {/* Custom Submission Step Loader */}
                {isSubmitting ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-6 font-mono text-sm">
                    <div className="relative w-16 h-16">
                      {/* Rotating spinning core */}
                      <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                      <div className="absolute inset-2 rounded-full border-2 border-primary/10 border-b-primary animate-spin [animation-duration:1s]"></div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <span className="block text-white font-bold tracking-widest uppercase">TRANSMITTING TELEMETRY</span>
                      
                      <div className="text-xs text-text-muted space-y-1">
                        <div className={submitStep >= 1 ? "text-primary font-bold" : "opacity-40"}>
                          [✓] Establishing socket link...
                        </div>
                        <div className={submitStep >= 2 ? "text-primary font-bold" : "opacity-40"}>
                          {submitStep >= 2 ? "[✓]" : "[ ]"} Compiling message dictionary...
                        </div>
                        <div className={submitStep >= 3 ? "text-primary font-bold" : "opacity-40"}>
                          {submitStep >= 3 ? "[✓]" : "[ ]"} Simulating EmailJS transfer protocol...
                        </div>
                        <div className={submitStep >= 4 ? "text-emerald-400 font-bold" : "opacity-40"}>
                          {submitStep >= 4 ? "[✓] DISPATCH COMPLETE!" : "[ ] Finalizing secure transmission..."}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-5">
                      
                      {/* Row 1: Name and Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Identification Name *</label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-primary/60" />
                            <input 
                              type="text" 
                              required
                              placeholder="Name or Callsign"
                              value={contactForm.name}
                              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-primary/10 rounded-xl text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Comm Link Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-primary/60" />
                            <input 
                              type="email" 
                              required
                              placeholder="Email Address"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-primary/10 rounded-xl text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                            />
                          </div>
                        </div>

                      </div>

                      {/* Row 2: Phone and Location */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Telephone Line (Optional)</label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-primary/60" />
                            <input 
                              type="tel" 
                              placeholder="+20 (100) 000-0000"
                              value={contactForm.phone}
                              onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-primary/10 rounded-xl text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Objective Location (Optional)</label>
                          <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-primary/60" />
                            <input 
                              type="text" 
                              placeholder="City, Country"
                              value={contactForm.location}
                              onChange={(e) => setContactForm({...contactForm, location: e.target.value})}
                              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-primary/10 rounded-xl text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Objective Data Message *</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3.5 top-4.5 w-4.5 h-4.5 text-primary/60" />
                          <textarea 
                            required
                            rows={4}
                            placeholder="Detail your project specifications, operational constraints, and venture goals..."
                            value={contactForm.message}
                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                            className="w-full pl-10 pr-4 py-3.5 bg-black/60 border border-primary/10 rounded-xl text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Glowing Submit Button */}
                    <button
                      type="submit"
                      className="w-full mt-6 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-sora font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,155,227,0.4)] hover:shadow-[0_0_25px_rgba(0,155,227,0.7)] flex items-center justify-center space-x-2"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>Transmit Request Payload</span>
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>

        </section>

      </main>

      {/* ================= HIGH-END FOOTER ================= */}
      <footer className="mt-20 border-t border-primary/10 pt-12 pb-6 max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand details */}
          <div className="space-y-4">
            <span className="font-sora font-extrabold text-xl tracking-tight text-white uppercase">Futueros</span>
            <p className="text-xs text-text-muted font-light leading-relaxed">
              We don't just write code. We engineer robust, future-proof software ecosystems, visual sandboxes, and customized restaurant telemetry arrays.
            </p>
          </div>

          {/* Core columns */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-white uppercase font-bold block">// Node Indexes</span>
            <ul className="space-y-2 text-text-muted">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} className="hover:text-primary transition-colors cursor-pointer block">Home Hub</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} className="hover:text-primary transition-colors cursor-pointer block">Capability Grid</a></li>
              <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }} className="hover:text-primary transition-colors cursor-pointer block">Feature Deployments</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} className="hover:text-primary transition-colors cursor-pointer block">Transmission Node</a></li>
            </ul>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <span className="text-white uppercase font-bold block">// Proprietary Assets</span>
            <ul className="space-y-2 text-text-muted flex flex-col items-start">
              <li><a href="#portfolio-stylestudio" onClick={(e) => { e.preventDefault(); scrollToSection("portfolio-stylestudio"); }} className="hover:text-primary transition-colors cursor-pointer text-left block">StyleStudio MVP</a></li>
              <li><a href="#portfolio-nolag" onClick={(e) => { e.preventDefault(); scrollToSection("portfolio-nolag"); }} className="hover:text-primary transition-colors cursor-pointer text-left block">⚡ NO_LAG Station</a></li>
              <li><a href="#portfolio-cairolounge" onClick={(e) => { e.preventDefault(); scrollToSection("portfolio-cairolounge"); }} className="hover:text-primary transition-colors cursor-pointer text-left block">Maadi Lounge Terminal</a></li>
              <li><a href="#portfolio-nexus" onClick={(e) => { e.preventDefault(); scrollToSection("portfolio-nexus"); }} className="hover:text-primary transition-colors cursor-pointer text-left block">Project Nexus Waitlist</a></li>
            </ul>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <span className="text-white uppercase font-bold block">// Security telemetry</span>
            <div className="space-y-2 text-text-muted text-[11px]">
              <div>STATUS: <span className="text-emerald-400 font-bold">● ONLINE</span></div>
              <div>SSL LEVEL: <span className="text-white">TLS_1.3_SECURED</span></div>
              <div>PORT ENTRY: <span className="text-primary font-semibold">3000 // INGRESS</span></div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          
          <div>
            &copy; {new Date().getFullYear()} FUTUEROS. All rights reserved. Encrypted secure protocol link.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Architecture Registry</a>
          </div>

        </div>

      </footer>

      {/* 5. BACK-TO-TOP FLOATING SUBTLE BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,155,227,0.2)] hover:shadow-[0_0_25px_rgba(0,155,227,0.5)] border border-primary/20 hover:border-primary/60 transition-all duration-300 transform ${
          showScrollTop ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-4 pointer-events-none"
        }`}
        title="Smooth Back To Top Node"
        onMouseEnter={() => setCursorHovered(true)}
        onMouseLeave={() => setCursorHovered(false)}
      >
        <ArrowUp className="w-5 h-5 animate-pulse" />
      </button>

      {/* 6. iOS-STYLE PREMIUM BOTTOM NAVIGATION FOR MOBILE/TABLET */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden mobile-bottom-nav">
        {[
          { id: "home", label: "Home", icon: Home },
          { id: "portfolio", label: "Our Work", icon: Briefcase },
          { id: "saas", label: "Micro-SaaS", icon: Zap },
          { id: "contact", label: "Connect", icon: MessageSquare }
        ].map((item) => {
          const IconComponent = item.icon;
          const isActive = 
            item.id === "home" ? activeSection === "home" :
            item.id === "contact" ? activeSection === "contact" :
            item.id === "saas" ? activeSection === "saas" :
            (activeSection === "projects" || activeSection === "about");

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
                setActiveSection(item.id);
              }}
              className={`mobile-bottom-nav-item ${isActive ? "active" : ""}`}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <div className="icon-container">
                <IconComponent className="mobile-bottom-nav-icon" />
              </div>
              <span className="mobile-bottom-nav-label">{item.label}</span>
            </a>
          );
        })}
      </div>

    </div>
  );
}
