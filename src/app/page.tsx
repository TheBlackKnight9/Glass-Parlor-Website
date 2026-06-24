"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { 
  Sparkles, 
  ShieldCheck, 
  Droplet, 
  Clock, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  ChevronRight, 
  Star, 
  Menu, 
  X,
  Lock,
  Layers,
  Heart,
  Calendar,
  Compass,
  ArrowRight
} from "lucide-react";

export default function Home() {
  // 1. Loading Screen State
  const [loading, setLoading] = useState(true);
  
  // 2. Navigation State & Scroll Progress
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("sanctuary");
  const [menuOpen, setMenuOpen] = useState(false);
  
  // 3. Spotlight Cursor Coordinate State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // 4. Parallax Scroll Ref
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Before/After Section Refs
  const comparisonRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // 5. Active Tab State for Artistry
  const [activeTab, setActiveTab] = useState(0);

  // 6. Booking Modal State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Simulated Loading Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Monitor Window Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active Section Highlight Algorithm
      const sections = ["sanctuary", "protocol", "transformations", "artistry", "case-studies", "mosaic", "location"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track Cursor Coordinate Updates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Before/After Drag Logic
  const handleDragMove = (clientX: number) => {
    if (!comparisonRef.current) return;
    const rect = comparisonRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  // Staggered Motion Configs
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const navItems = [
    { label: "Sanctuary", target: "sanctuary" },
    { label: "Protocol", target: "protocol" },
    { label: "Transformations", target: "transformations" },
    { label: "Artistry", target: "artistry" },
    { label: "Portfolio", target: "mosaic" },
    { label: "Client Stories", target: "case-studies" }
  ];

  return (
    <>
      {/* LUXURY LOADING SEQUENCE */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-luxury-plum z-[9999] flex flex-col items-center justify-center text-luxury-pearl"
            exit={{ 
              y: "-100%", 
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
            <div className="flex flex-col items-center max-w-md px-8 text-center">
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-serif text-3xl md:text-4xl font-light tracking-[0.3em] uppercase text-luxury-gold"
              >
                GLOSS STUDIO
              </motion.span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                className="h-[1px] bg-luxury-gold/40 my-6"
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="font-sans text-xs uppercase tracking-[0.2em] font-light text-luxury-platinum"
              >
                Atelier of Refinement • Shimla
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CURSOR SPOTLIGHT EFFECT */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full blur-[140px] bg-luxury-rose/30 mix-blend-multiply opacity-80 z-[1] hidden md:block"
      />

      {/* FLOATING AMBIENT PARTICLES */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
        <div className="absolute top-[15%] left-[10%] w-96 h-96 rounded-full bg-luxury-rose/10 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-luxury-gold/5 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* FLOATING GLASS NAVIGATION DOCK */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
        className={`fixed top-6 left-0 right-0 z-[1000] px-4 transition-all duration-500`}
      >
        <div className={`max-w-6xl mx-auto rounded-full border border-luxury-platinum/20 bg-luxury-pearl/70 backdrop-blur-xl transition-all duration-500 shadow-sm ${
          scrolled ? "py-3 px-5 lg:px-6 xl:px-8 shadow-md" : "py-4 px-6 lg:px-8 xl:px-10"
        }`}>
          <div className="flex items-center justify-between gap-6 lg:gap-8 w-full">
            {/* Elegant text logo */}
            <a href="#sanctuary" className="flex flex-col select-none shrink-0">
              <span className="font-serif text-base xl:text-lg tracking-[0.18em] font-medium text-luxury-plum">
                GLOSS STUDIO
              </span>
              <span className="text-[0.5rem] xl:text-[0.55rem] font-light tracking-[0.25em] text-luxury-gold uppercase leading-tight -mt-0.5">
                NEW SHIMLA
              </span>
            </a>

            {/* Desktop Navigation Links (Centered using mx-auto with optimized gaps) */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-7 mx-auto">
              {navItems.map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  className={`font-sans text-[10px] xl:text-xs tracking-[0.1em] xl:tracking-[0.18em] uppercase font-light relative py-1 transition-colors duration-300 ${
                    activeSection === item.target ? "text-luxury-plum font-normal" : "text-luxury-obsidian/60 hover:text-luxury-obsidian"
                  }`}
                >
                  {item.label}
                  {activeSection === item.target && (
                    <motion.span 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-luxury-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* CTA Reserve slot (Pushed to the right with vertical divider on desktop) */}
            <div className="hidden md:flex items-center lg:pl-4 xl:pl-6 lg:border-l lg:border-luxury-platinum/40 shrink-0">
              <button 
                onClick={() => setBookingOpen(true)}
                className="px-4 xl:px-6 py-2 xl:py-2.5 bg-luxury-plum hover:bg-luxury-gold text-luxury-pearl hover:text-luxury-obsidian text-[10px] xl:text-xs font-medium tracking-[0.12em] xl:tracking-[0.18em] uppercase rounded-full transition-all duration-500 shadow-sm"
              >
                RESERVE VISIT
              </button>
            </div>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-luxury-plum hover:text-luxury-gold transition-colors duration-300"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20 left-4 right-4 bg-luxury-pearl/95 backdrop-blur-2xl border border-luxury-platinum/25 rounded-3xl shadow-xl p-8 flex flex-col gap-6 lg:hidden"
            >
              <nav className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    key={item.target}
                    href={`#${item.target}`}
                    onClick={() => setMenuOpen(false)}
                    className={`font-sans text-xs tracking-[0.15em] uppercase font-light py-2 border-b border-luxury-platinum/10 transition-colors ${
                      activeSection === item.target ? "text-luxury-plum font-medium" : "text-luxury-obsidian/70"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  setBookingOpen(true);
                }}
                className="w-full py-3.5 bg-luxury-plum text-luxury-pearl text-xs font-semibold tracking-[0.18em] uppercase rounded-full"
              >
                RESERVE VISIT
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>


      {/* SECTION 01: THE SANCTUARY (HERO SECTION) */}
      <section 
        id="sanctuary" 
        ref={heroRef}
        className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden z-[2] bg-luxury-pearl"
      >
        <div className="max-w-7xl mx-auto w-full px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col z-[10]">
            <motion.div
              initial="hidden"
              animate={loading ? "hidden" : "visible"}
              variants={staggerContainer}
              className="space-y-8"
            >

              
              <motion.h1 
                variants={fadeInUp}
                className="font-serif text-5xl md:text-7xl font-light text-luxury-plum leading-[1.1] relative"
              >
                Beauty is not applied.<br />
                <span className="italic font-normal text-luxury-gold">It is revealed.</span>
              </motion.h1>

              <motion.div 
                variants={fadeInUp}
                className="w-16 h-[1px] bg-luxury-platinum/50"
              />

              <motion.p 
                variants={fadeInUp}
                className="font-sans text-[1.05rem] font-light leading-relaxed text-luxury-obsidian/75 max-w-xl text-justify"
              >
                Tucked into the majestic mountains of New Shimla, Gloss Studio reimagines beauty as a tranquil ritual. We reject the rushed, chemical-heavy salon model in favor of a patient, bespoke dialogue. Here, we honor your skin’s biological integrity, custom-sculpt nail architectures, and design editorial makeup that honors your organic geometry. This is your high-altitude wellness sanctuary.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap gap-6 pt-4"
              >
                <button 
                  onClick={() => setBookingOpen(true)}
                  className="px-8 py-3.5 bg-luxury-plum hover:bg-luxury-gold text-luxury-pearl hover:text-luxury-obsidian text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500 shadow-md"
                >
                  BOOK AN ARTISAN CONSULTATION
                </button>
                <a 
                  href="#artistry"
                  className="flex items-center gap-2 group text-xs font-semibold tracking-[0.2em] uppercase text-luxury-plum py-3.5"
                >
                  EXPLORE ARTISTRY 
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Cinematic Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end z-[5]">
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 1.2, ease: "easeOut" }}
              className="relative w-full max-w-[420px] aspect-[3/4] overflow-hidden group shadow-2xl border border-luxury-platinum/20 bg-luxury-rose"
            >
              {/* Soft overlay mask */}
              <div className="absolute inset-0 bg-luxury-plum/5 mix-blend-multiply z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-plum/20 via-transparent to-transparent z-10 pointer-events-none" />
              
              <img 
                src="assets/hero.png" 
                alt="Luxury beauty portrait - Gloss Studio editorial look" 
                className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out scale-102 group-hover:scale-108"
              />

              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-baseline text-white">
                <span className="font-serif italic text-sm tracking-[0.1em] opacity-90">Atelier Editorial No. 04</span>
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase opacity-70">New Shimla, IN</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Animated Scroll Indicator */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
          onClick={() => {
            document.getElementById("protocol")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-luxury-gold/80">DISCOVER STUDIO PROTOCOL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold/80 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-4 bg-luxury-plum"
            />
          </div>
        </motion.div>
      </section>


      {/* SECTION 02: THE SCIENCE OF BEAUTY (THE STUDIO PROTOCOL) */}
      <section 
        id="protocol" 
        className="py-32 relative z-[2] bg-luxury-rose/40 border-y border-luxury-platinum/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[0.75rem] font-bold tracking-[0.25em] text-luxury-gold uppercase">BIOLOGICAL STANDARDS</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-plum leading-tight">The Studio Protocol</h2>
            <div className="w-12 h-[1px] bg-luxury-platinum mx-auto" />
            <p className="font-sans text-sm font-light text-luxury-obsidian/70">
              We approach sanitization and chemical safety with the rigor of a luxury biological lab. Our non-toxic, skin-conscious systems represent our absolute commitment to your long-term cellular health.
            </p>
          </div>

          {/* Icon architecture & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            
            {/* Connecting line */}
            <div className="absolute top-[38px] left-[5%] right-[5%] h-[1px] bg-luxury-platinum/20 hidden lg:block z-0" />

            {/* Protocol 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-6 bg-luxury-pearl border border-luxury-platinum/10 shadow-sm relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-luxury-rose flex items-center justify-center text-luxury-plum mb-6 border border-luxury-platinum/10">
                <ShieldCheck size={24} strokeWidth={1.2} />
              </div>
              <span className="font-mono text-xs text-luxury-gold tracking-widest mb-2 font-medium">PROTOCOL 01</span>
              <h3 className="font-serif text-lg font-light text-luxury-plum mb-3">Medical-Grade Sterilization</h3>
              <p className="font-sans text-xs font-light text-luxury-obsidian/60 leading-relaxed">
                All metal implements undergo precise ultrasonic pre-cleansing, followed by medical-grade autoclave sterilization, sealed in sterile envelopes opened directly in front of you.
              </p>
            </motion.div>

            {/* Protocol 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-6 bg-luxury-pearl border border-luxury-platinum/10 shadow-sm relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-luxury-rose flex items-center justify-center text-luxury-plum mb-6 border border-luxury-platinum/10">
                <Lock size={24} strokeWidth={1.2} />
              </div>
              <span className="font-mono text-xs text-luxury-gold tracking-widest mb-2 font-medium">PROTOCOL 02</span>
              <h3 className="font-serif text-lg font-light text-luxury-plum mb-3">MMA-Free Nail Systems</h3>
              <p className="font-sans text-xs font-light text-luxury-obsidian/60 leading-relaxed">
                We strictly ban toxic Methyl Methacrylate (MMA) liquid monomers. We sculpt exclusively using odorless, biocompatible Japanese gel extensions and botanical base coats.
              </p>
            </motion.div>

            {/* Protocol 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-6 bg-luxury-pearl border border-luxury-platinum/10 shadow-sm relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-luxury-rose flex items-center justify-center text-luxury-plum mb-6 border border-luxury-platinum/10">
                <Layers size={24} strokeWidth={1.2} />
              </div>
              <span className="font-mono text-xs text-luxury-gold tracking-widest mb-2 font-medium">PROTOCOL 03</span>
              <h3 className="font-serif text-lg font-light text-luxury-plum mb-3">Dermatologist Conscious</h3>
              <p className="font-sans text-xs font-light text-luxury-obsidian/60 leading-relaxed">
                Our bespoke skin range relies on cold-pressed botanical oils, pure plant hydrosols, and clean cell-active humectants. Cruelty-free, vegan, and free of synthetic fillers.
              </p>
            </motion.div>

            {/* Protocol 4 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-6 bg-luxury-pearl border border-luxury-platinum/10 shadow-sm relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-luxury-rose flex items-center justify-center text-luxury-plum mb-6 border border-luxury-platinum/10">
                <Droplet size={24} strokeWidth={1.2} />
              </div>
              <span className="font-mono text-xs text-luxury-gold tracking-widest mb-2 font-medium">PROTOCOL 04</span>
              <h3 className="font-serif text-lg font-light text-luxury-plum mb-3">Non-Comedogenic Makeup</h3>
              <p className="font-sans text-xs font-light text-luxury-obsidian/60 leading-relaxed">
                Every skin base formulation in our makeup toolkit is hypoallergenic, breathing-friendly, and selected to maintain a clean barrier, even during high-altitude sun exposure.
              </p>
            </motion.div>

            {/* Protocol 5 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-6 bg-luxury-pearl border border-luxury-platinum/10 shadow-sm relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-luxury-rose flex items-center justify-center text-luxury-plum mb-6 border border-luxury-platinum/10">
                <Heart size={24} strokeWidth={1.2} />
              </div>
              <span className="font-mono text-xs text-luxury-gold tracking-widest mb-2 font-medium">PROTOCOL 05</span>
              <h3 className="font-serif text-lg font-light text-luxury-plum mb-3">Disposable Precision Tools</h3>
              <p className="font-sans text-xs font-light text-luxury-obsidian/60 leading-relaxed">
                Nail files, buffers, and orange wood applicators are used exactly once for your session, then gifted to you or responsibly recycled. Zero tool sharing, absolute integrity.
              </p>
            </motion.div>

          </div>

          <div className="mt-16 text-center">
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase">
              STUDIO SAFETY PARAMETER CHECKED: AUTOCLAVE DECONTAMINATION LOG V4.0
            </span>
          </div>

        </div>
      </section>


      {/* SECTION 03: TRANSFORMATION GALLERY (BEFORE/AFTER SLIDER) */}
      <section 
        id="transformations" 
        className="py-32 relative z-[2] bg-luxury-pearl"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <span className="text-[0.75rem] font-bold tracking-[0.25em] text-luxury-gold uppercase">INTEGRATIVE DIAGNOSTICS</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-plum leading-tight">The Texturing Canvas</h2>
            <div className="w-12 h-[1px] bg-luxury-platinum" />
            
            <p className="font-sans text-[0.95rem] font-light leading-relaxed text-luxury-obsidian/75 text-justify">
              Observe the immediate visual difference in epidermal cell moisture and botanical smoothness. Our cellular hydration skincare system infuses nutrient-dense botanicals and multi-weight hyaluronic compounds into dehydrated winter skin, producing an editorial, dew-finished radiance.
            </p>

            {/* Draggable Slider explanation */}
            <p className="font-sans text-xs italic text-luxury-gold">
              Drag the platinum handle on the image wrapper horizontally to reveal skin transition details in real-time.
            </p>

            {/* Floating Luxury Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-luxury-platinum/20">
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-light text-luxury-plum">98%</span>
                <span className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-luxury-gold">Retention Rate</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-light text-luxury-plum">1000+</span>
                <span className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-luxury-gold">Transformations</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-light text-luxury-plum">5-Star</span>
                <span className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-luxury-gold">Reputation</span>
              </div>
            </div>
          </div>

          {/* Right Comparison Slider */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div 
              ref={comparisonRef}
              onMouseMove={(e) => isDragging && handleDragMove(e.clientX)}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="relative w-full max-w-[620px] aspect-[4/3] overflow-hidden group select-none border border-luxury-platinum/25 shadow-xl cursor-ew-resize bg-luxury-rose"
            >
              {/* After Image (Background) */}
              <img 
                src="assets/after.png" 
                alt="Radiant Glowing Skin - After Gloss Studio Facial Treatment" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              
              {/* Before Image (Foreground overlay) */}
              <div 
                style={{ width: `${sliderPosition}%` }}
                className="absolute inset-y-0 left-0 overflow-hidden z-10 border-r border-luxury-gold/50"
              >
                <img 
                  src="assets/before.png" 
                  alt="Dehydrated Natural Skin - Before Gloss Studio Skincare Treatment" 
                  className="absolute inset-y-0 left-0 w-[620px] max-w-none h-full object-cover pointer-events-none"
                  style={{ width: comparisonRef.current?.getBoundingClientRect().width }}
                />
              </div>

              {/* Slider Draggable Platinum Handle Bar */}
              <div 
                style={{ left: `${sliderPosition}%` }}
                className="absolute inset-y-0 -ml-[2px] w-[4px] bg-luxury-gold z-20 pointer-events-none flex flex-col justify-center items-center"
              >
                <div className="w-10 h-10 rounded-full bg-luxury-pearl border border-luxury-gold flex items-center justify-center shadow-lg text-luxury-plum">
                  <div className="flex gap-[2px]">
                    <div className="w-[1px] h-3 bg-luxury-gold" />
                    <div className="w-[1px] h-3 bg-luxury-gold" />
                    <div className="w-[1px] h-3 bg-luxury-gold" />
                  </div>
                </div>
              </div>

              {/* Visual Labels */}
              <div className="absolute bottom-4 left-4 z-30 px-3 py-1.5 bg-luxury-pearl/80 backdrop-blur-sm border border-luxury-platinum/30 font-sans text-[0.6rem] tracking-[0.2em] text-luxury-plum uppercase">
                BEFORE PROTOCOL
              </div>
              <div className="absolute bottom-4 right-4 z-30 px-3 py-1.5 bg-luxury-pearl/80 backdrop-blur-sm border border-luxury-platinum/30 font-sans text-[0.6rem] tracking-[0.2em] text-luxury-plum uppercase">
                SIGNATURE DEW
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 04: THE ARTISTRY COLLECTION */}
      <section 
        id="artistry" 
        className="py-32 relative z-[2] bg-luxury-rose/30 border-y border-luxury-platinum/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
            <span className="text-[0.75rem] font-bold tracking-[0.25em] text-luxury-gold uppercase">OUR CRAFT DISCIPLINARY</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-plum leading-tight">The Artistry Collection</h2>
            <div className="w-12 h-[1px] bg-luxury-platinum mx-auto" />
          </div>

          {/* Animated Tab Architecture */}
          <div className="flex justify-center border-b border-luxury-platinum/20 mb-16 max-w-2xl mx-auto">
            <div className="flex gap-12 md:gap-16">
              {[
                "01 Nails Architecture",
                "02 Bespoke Skincare",
                "03 Editorial Makeup"
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`font-sans text-xs md:text-sm tracking-[0.15em] uppercase font-light pb-4 relative transition-colors duration-300 ${
                    activeTab === idx ? "text-luxury-plum font-semibold" : "text-luxury-obsidian/50 hover:text-luxury-obsidian"
                  }`}
                >
                  {tab}
                  {activeTab === idx && (
                    <motion.span 
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxury-gold"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Cards (Luxury Narrative, NO Prices) */}
          <div className="min-h-[480px]">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="nails"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  <div className="lg:col-span-6 space-y-6">
                    <span className="font-serif italic text-luxury-gold text-lg">Discipline No. 01 — Structural Geometry</span>
                    <h3 className="font-serif text-3xl font-light text-luxury-plum">Nails as Living Sculpture</h3>
                    <p className="font-sans text-sm font-light leading-relaxed text-luxury-obsidian/70 text-justify">
                      Our nail design starts with physical forms. We completely reject generic plastic tips and damaging acetone glues, sculpting lightweight extensions using premium Japanese liquid glass builders. Every nail base curvature is engineered to harmonize with the structural line of your fingers. 
                    </p>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-obsidian/75">Techniques: Russian Dry Cuticle Care, Sculpted Gel Extensions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-obsidian/75">Materials: Hypoallergenic Biocomp Gels, Chrome Glaze Pigments</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-obsidian/75">Finish: High-Reflection Glass Top Coat or Satin Mineral Matte</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => setBookingOpen(true)}
                        className="px-6 py-3 bg-luxury-plum hover:bg-luxury-gold text-luxury-pearl hover:text-luxury-obsidian text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300"
                      >
                        RESERVE SLOP SLIDE
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-6 flex justify-end">
                    <div className="w-full max-w-[480px] aspect-[4/3] bg-luxury-pearl border border-luxury-platinum/20 overflow-hidden shadow-lg relative group">
                      <div className="absolute inset-0 bg-luxury-plum/5 z-10 pointer-events-none" />
                      <img 
                        src="assets/hero.png" 
                        alt="Gloss Studio Nail sculpting illustration"
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  key="skincare"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  <div className="lg:col-span-6 space-y-6">
                    <span className="font-serif italic text-luxury-gold text-lg">Discipline No. 02 — Restoration Biology</span>
                    <h3 className="font-serif text-3xl font-light text-luxury-plum">Bespoke Cellular Skin Therapy</h3>
                    <p className="font-sans text-sm font-light leading-relaxed text-luxury-obsidian/70 text-justify">
                      Our skincare is a customized restoration cycle designed for Shimla’s high-altitude UV indices and crisp dry climate. We analyze your skin under soft daylight before curating botanically active solutions. We massage face structures with botanical concentrates to restore blood microcirculation, leaving skin calm, oxygenated, and plump.
                    </p>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-obsidian/75">Techniques: Lymphatic Face Contouring, Cryo-Cooling Infusion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-obsidian/75">Materials: Organic Wild Cedar Oil, Alpine Rose Hydrosols</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-obsidian/75">Standards: 100% Silicone-free, Paraben-free cell nutrients</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => setBookingOpen(true)}
                        className="px-6 py-3 bg-luxury-plum hover:bg-luxury-gold text-luxury-pearl hover:text-luxury-obsidian text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300"
                      >
                        RESERVE SLOP SLIDE
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-6 flex justify-end">
                    <div className="w-full max-w-[480px] aspect-[4/3] bg-luxury-pearl border border-luxury-platinum/20 overflow-hidden shadow-lg relative group">
                      <div className="absolute inset-0 bg-luxury-plum/5 z-10 pointer-events-none" />
                      <img 
                        src="assets/after.png" 
                        alt="Bespoke skincare facial restoration - Gloss Studio"
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div
                  key="makeup"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  <div className="lg:col-span-6 space-y-6">
                    <span className="font-serif italic text-luxury-gold text-lg">Discipline No. 03 — Haute Couture base</span>
                    <h3 className="font-serif text-3xl font-light text-luxury-plum">Luminous Editorial Makeup</h3>
                    <p className="font-sans text-sm font-light leading-relaxed text-luxury-obsidian/70 text-justify">
                      Our signature makeup focus is raw base simplicity. We craft breathable dewy bases, precise feathered eyebrows, and monochromatic facial color palettes. Designed for photography capture under variable outdoor sunset variables, we balance shadows and natural skin tones elegantly.
                    </p>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-obsidian/75">Techniques: Micro-feather Base Layering, Chromatic Eye Lining</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-obsidian/75">Materials: Mineral pigments, Botanical moisture foundation seal</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-obsidian/75">Finish: Soft satin focus, natural sun glow symmetry</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => setBookingOpen(true)}
                        className="px-6 py-3 bg-luxury-plum hover:bg-luxury-gold text-luxury-pearl hover:text-luxury-obsidian text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300"
                      >
                        RESERVE SLOP SLIDE
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-6 flex justify-end">
                    <div className="w-full max-w-[480px] aspect-[4/3] bg-luxury-pearl border border-luxury-platinum/20 overflow-hidden shadow-lg relative group">
                      <div className="absolute inset-0 bg-luxury-plum/5 z-10 pointer-events-none" />
                      <img 
                        src="assets/hero.png" 
                        alt="Editorial makeup application - Gloss Studio look"
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>


      {/* SECTION 05: CASE FILES */}
      <section 
        id="case-studies" 
        className="py-32 relative z-[2] bg-luxury-pearl"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
            <span className="text-[0.75rem] font-bold tracking-[0.25em] text-luxury-gold uppercase">CLIENT JOURNAL ARCHIVE</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-plum leading-tight">The Case Files</h2>
            <div className="w-12 h-[1px] bg-luxury-platinum mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Case 001 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="p-8 bg-luxury-rose/30 border border-luxury-platinum/15 relative flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-luxury-platinum/20 pb-4">
                  <span className="font-mono text-xs text-luxury-gold tracking-widest font-semibold">CASE FILE 001</span>
                  <div className="flex text-luxury-gold gap-[2px]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">CLIENT PROFILE</span>
                  <h3 className="font-serif text-xl font-light text-luxury-plum">Mansi P.</h3>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">OBJECTIVE</span>
                  <p className="font-sans text-xs text-luxury-obsidian/75 leading-relaxed">
                    Repair extreme cuticle cracking and build a clean, minimalist nail set for high-altitude weather conditions.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">SOLUTION</span>
                  <p className="font-sans text-xs text-luxury-obsidian/75 leading-relaxed">
                    Administered Russian dry cuticle restoration followed by biopolymer builder gel sculpting in translucent pearl.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-luxury-platinum/20 flex justify-between items-baseline">
                <span className="font-sans text-[0.6rem] tracking-[0.15em] text-luxury-gold uppercase">OUTCOME: 100% REPAIRED</span>
                <span className="font-serif italic text-xs text-luxury-plum">August 2025</span>
              </div>
            </motion.div>

            {/* Case 002 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="p-8 bg-luxury-rose/30 border border-luxury-platinum/15 relative flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-luxury-platinum/20 pb-4">
                  <span className="font-mono text-xs text-luxury-gold tracking-widest font-semibold">CASE FILE 002</span>
                  <div className="flex text-luxury-gold gap-[2px]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">CLIENT PROFILE</span>
                  <h3 className="font-serif text-xl font-light text-luxury-plum">Ananya S.</h3>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">OBJECTIVE</span>
                  <p className="font-sans text-xs text-luxury-obsidian/75 leading-relaxed">
                    Treat deep forehead dryness and dull cellular textures caused by high Shimla winter wind-chill forces.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">SOLUTION</span>
                  <p className="font-sans text-xs text-luxury-obsidian/75 leading-relaxed">
                    Bespoke cellular botanical steam facial mapping, including multi-tier cold-pressed wild cedar oil massage techniques.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-luxury-platinum/20 flex justify-between items-baseline">
                <span className="font-sans text-[0.6rem] tracking-[0.15em] text-luxury-gold uppercase">OUTCOME: CELL HYDRATION RESTORED</span>
                <span className="font-serif italic text-xs text-luxury-plum">November 2025</span>
              </div>
            </motion.div>

            {/* Case 003 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="p-8 bg-luxury-rose/30 border border-luxury-platinum/15 relative flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-luxury-platinum/20 pb-4">
                  <span className="font-mono text-xs text-luxury-gold tracking-widest font-semibold">CASE FILE 003</span>
                  <div className="flex text-luxury-gold gap-[2px]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">CLIENT PROFILE</span>
                  <h3 className="font-serif text-xl font-light text-luxury-plum">Priyanka V.</h3>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">OBJECTIVE</span>
                  <p className="font-sans text-xs text-luxury-obsidian/75 leading-relaxed">
                    Create clean, high-contrast, luminous outdoor bridal makeup for sunset mountain photo portraits.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">SOLUTION</span>
                  <p className="font-sans text-xs text-luxury-obsidian/75 leading-relaxed">
                    Micro-layer satin dewy base matching natural skin tones, paired with monochromatic earth tones on cheek and brow lines.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-luxury-platinum/20 flex justify-between items-baseline">
                <span className="font-sans text-[0.6rem] tracking-[0.15em] text-luxury-gold uppercase">OUTCOME: TIMELESS LUMINOUS Base</span>
                <span className="font-serif italic text-xs text-luxury-plum">December 2025</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>


      {/* SECTION 06: EDITORIAL MOSAIC (PORTFOLIO) */}
      <section 
        id="mosaic" 
        className="py-32 relative z-[2] bg-luxury-rose/25 border-y border-luxury-platinum/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
            <span className="text-[0.75rem] font-bold tracking-[0.25em] text-luxury-gold uppercase">PORTFOLIO DEPICTION</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-plum leading-tight">Editorial Mosaic</h2>
            <div className="w-12 h-[1px] bg-luxury-platinum mx-auto" />
            <p className="font-sans text-xs italic text-luxury-gold">
              Visual captures of sculpted form and textured details. Designed like a Vogue spread.
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Panel 1 */}
            <div className="md:col-span-4 flex flex-col space-y-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden bg-luxury-rose aspect-[3/4] border border-luxury-platinum/10 shadow-md group"
              >
                <img 
                  src="assets/hero.png" 
                  alt="Nail structure editorial view" 
                  className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-108"
                />
              </motion.div>
              <div className="flex justify-between font-mono text-[0.65rem] text-luxury-gold tracking-widest px-1">
                <span>01 / STRUCTURE EXTENSION</span>
                <span>SHIMLA ATELIER</span>
              </div>
            </div>

            {/* Panel 2 */}
            <div className="md:col-span-8 flex flex-col space-y-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden bg-luxury-rose aspect-[16/10] border border-luxury-platinum/10 shadow-md group"
              >
                <img 
                  src="assets/after.png" 
                  alt="Luminous skin facial aftershot" 
                  className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-108"
                />
              </motion.div>
              <div className="flex justify-between font-mono text-[0.65rem] text-luxury-gold tracking-widest px-1">
                <span>02 / CELLULAR RESTORATIVE GLOW</span>
                <span>AUTUMN ARCHIVE</span>
              </div>
            </div>

            {/* Panel 3 */}
            <div className="md:col-span-7 flex flex-col space-y-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden bg-luxury-rose aspect-[16/10] border border-luxury-platinum/10 shadow-md group"
              >
                <img 
                  src="assets/before.png" 
                  alt="Unpolished raw skin diagnostic base" 
                  className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-108"
                />
              </motion.div>
              <div className="flex justify-between font-mono text-[0.65rem] text-luxury-gold tracking-widest px-1">
                <span>03 / DIAGNOSTIC CELL STUDY</span>
                <span>LABORATORY ENTRY</span>
              </div>
            </div>

            {/* Panel 4 */}
            <div className="md:col-span-5 flex flex-col space-y-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden bg-luxury-rose aspect-[3/4] border border-luxury-platinum/10 shadow-md group"
              >
                <img 
                  src="assets/hero.png" 
                  alt="Editorial makeup application" 
                  className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-108"
                />
              </motion.div>
              <div className="flex justify-between font-mono text-[0.65rem] text-luxury-gold tracking-widest px-1">
                <span>04 / BR bridal edit Base</span>
                <span>WINTER COLL</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 07: VISIT THE STUDIO */}
      <section 
        id="location" 
        className="py-32 relative z-[2] bg-luxury-pearl"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left info */}
          <div className="lg:col-span-5 space-y-8">
            <span className="text-[0.75rem] font-bold tracking-[0.25em] text-luxury-gold uppercase">THE NEW SHIMLA SANCTUARY</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-plum leading-tight">Visit the Studio</h2>
            
            <div className="w-12 h-[1px] bg-luxury-platinum" />

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-luxury-gold shrink-0 mt-1" strokeWidth={1.5} />
                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">STUDIO LOCATION</span>
                  <address className="font-sans text-sm font-light text-luxury-obsidian/75 not-italic leading-relaxed">
                    GLOSS STUDIO<br />
                    Sunela Mata Mandir Building<br />
                    BCS Market, New Shimla<br />
                    Shimla, Himachal Pradesh 171009
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={20} className="text-luxury-gold shrink-0 mt-1" strokeWidth={1.5} />
                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">TELEPHONE DIRECTORY</span>
                  <p className="font-sans text-sm font-light text-luxury-obsidian/75">
                    <a href="tel:09588017171" className="hover:text-luxury-gold transition-colors underline decoration-luxury-gold/30 underline-offset-4">
                      095880 17171
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock size={20} className="text-luxury-gold shrink-0 mt-1" strokeWidth={1.5} />
                <div className="space-y-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold">STUDIO HOURS</span>
                  <p className="font-sans text-sm font-light text-luxury-obsidian/75">
                    Tuesday – Sunday: 10:00 AM – 07:00 PM<br />
                    <span className="text-xs text-luxury-gold font-light italic">Mondays reserved exclusively for laboratory sterilization resets.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Expectation Guide */}
            <div className="p-6 bg-luxury-rose/30 border border-luxury-platinum/10 rounded-lg space-y-3">
              <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold block">CONSULTATION PROTOCOL</span>
              <p className="font-sans text-xs font-light text-luxury-obsidian/70 leading-relaxed text-justify">
                To guarantee absolute calm and protected treatment schedules, we require all clients to submit booking reservation details. We do not accept drop-ins or walk-ins. We reserve a private dedicated space and single artisan coordinator for each slot.
              </p>
            </div>
          </div>

          {/* Right Map Placeholder */}
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/10] bg-luxury-rose border border-luxury-platinum/20 relative shadow-lg group overflow-hidden">
              {/* Minimalist interactive map simulation */}
              <div className="absolute inset-0 bg-[#F5F2EC] flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-luxury-pearl border border-luxury-gold flex items-center justify-center text-luxury-plum shadow-md animate-bounce">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1">
                  <span className="font-serif text-xl font-light text-luxury-plum">BCS Market Sanctuary</span>
                  <p className="font-sans text-xs text-luxury-obsidian/60 max-w-sm">
                    Located near the Sunela Mata Mandir, Level 1. Look for our brushed platinum nameplate.
                  </p>
                </div>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-luxury-plum text-luxury-pearl text-[0.65rem] font-semibold tracking-[0.2em] uppercase rounded-full shadow-sm hover:bg-luxury-gold transition-colors duration-300 flex items-center gap-2"
                >
                  GET DIRECTIONS <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* FOOTER EXPERIENCE */}
      <footer className="bg-luxury-plum text-luxury-pearl py-24 relative z-[2] border-t border-luxury-gold/15">
        <div className="max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mb-16">
          
          <div className="md:col-span-4 space-y-6">
            <a href="#sanctuary" className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.2em] font-light text-luxury-gold">GLOSS STUDIO</span>
              <span className="text-[0.6rem] font-light tracking-[0.3em] text-luxury-platinum uppercase mt-1">ATELIER • NEW SHIMLA</span>
            </a>
            <p className="font-sans text-xs font-light leading-relaxed text-luxury-pearl/60 max-w-sm text-justify">
              Crafting raw nail biology into sculptured art, hydrating high-altitude cellular skin lines, and defining base luminous makeup structure parameters.
            </p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold block">NAVIGATION</span>
            <ul className="space-y-2 text-xs font-light text-luxury-pearl/60">
              <li><a href="#sanctuary" className="hover:text-luxury-gold transition-colors">Sanctuary Hero</a></li>
              <li><a href="#protocol" className="hover:text-luxury-gold transition-colors">Safety Protocol</a></li>
              <li><a href="#transformations" className="hover:text-luxury-gold transition-colors">Before / After</a></li>
              <li><a href="#artistry" className="hover:text-luxury-gold transition-colors">Artistry Services</a></li>
              <li><a href="#case-studies" className="hover:text-luxury-gold transition-colors">Case Reviews</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold block">CONTACT DIRECTORY</span>
            <ul className="space-y-2 text-xs font-light text-luxury-pearl/60">
              <li>BCS Market, New Shimla</li>
              <li>Phone: 095880 17171</li>
              <li>Email: contact@glossstudio.in</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="font-sans text-[0.65rem] tracking-[0.2em] text-luxury-gold uppercase font-bold block">SOCIAL PRESENCE</span>
            <div className="flex gap-6 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-luxury-pearl/60 hover:text-luxury-gold transition-colors text-xs font-light uppercase tracking-widest border-b border-luxury-pearl/10 pb-0.5">
                INSTAGRAM
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-luxury-pearl/60 hover:text-luxury-gold transition-colors text-xs font-light uppercase tracking-widest border-b border-luxury-pearl/10 pb-0.5">
                PINTEREST
              </a>
            </div>
          </div>

        </div>

        {/* Footer Base divider and signature */}
        <div className="max-w-7xl mx-auto px-8 md:px-12 pt-8 border-t border-luxury-gold/15 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-sans text-[0.6rem] tracking-[0.15em] text-luxury-pearl/40 uppercase">
            © 2026 GLOSS STUDIO. ALL ARCHIVE RIGHTS PROTECTED.
          </span>
          <span className="font-serif italic text-sm text-luxury-gold tracking-wide">
            "Crafted for confidence. Designed for presence."
          </span>
        </div>
      </footer>


      {/* LUXURY RESERVATION BOOKING MODAL */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-luxury-plum/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl bg-luxury-pearl border border-luxury-gold/40 shadow-2xl p-8 md:p-12 relative max-h-[90vh] overflow-y-auto rounded-none"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setBookingOpen(false);
                  setBookingSubmitted(false);
                }}
                className="absolute top-6 right-6 text-luxury-obsidian/40 hover:text-luxury-plum transition-colors"
                aria-label="Close booking modal"
              >
                <X size={22} />
              </button>

              {!bookingSubmitted ? (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[0.65rem] font-bold tracking-[0.25em] text-luxury-gold uppercase block">RESERVATION CONCIERGE</span>
                    <h3 className="font-serif text-3xl font-light text-luxury-plum">Reserve an Experience</h3>
                    <p className="font-sans text-xs font-light text-luxury-obsidian/60 leading-relaxed">
                      Submit your reservation request. Our lead artisan will contact you on your telephone line within two business hours to confirm your private session allocation.
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingSubmitted(true);
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="font-sans text-[0.65rem] tracking-[0.15em] text-luxury-gold uppercase font-bold">FULL NAME</label>
                        <input 
                          type="text" 
                          id="name" 
                          required 
                          placeholder="Ananya Sharma"
                          className="w-full bg-white border border-luxury-platinum/30 px-4 py-3 text-sm font-sans text-luxury-obsidian placeholder:text-luxury-obsidian/30 focus:outline-none focus:border-luxury-gold transition-colors rounded-none"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="phone" className="font-sans text-[0.65rem] tracking-[0.15em] text-luxury-gold uppercase font-bold">PHONE LINE</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          required 
                          placeholder="095880 17171"
                          className="w-full bg-white border border-luxury-platinum/30 px-4 py-3 text-sm font-sans text-luxury-obsidian placeholder:text-luxury-obsidian/30 focus:outline-none focus:border-luxury-gold transition-colors rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="discipline" className="font-sans text-[0.65rem] tracking-[0.15em] text-luxury-gold uppercase font-bold">PRIMARY DISCIPLINE</label>
                        <select 
                          id="discipline" 
                          required
                          className="w-full bg-white border border-luxury-platinum/30 px-4 py-3 text-sm font-sans text-luxury-obsidian focus:outline-none focus:border-luxury-gold transition-colors rounded-none appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23D6C7AE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 16px center',
                            backgroundSize: '16px'
                          }}
                        >
                          <option value="">Select a discipline</option>
                          <option value="nails">Nails Architecture</option>
                          <option value="skincare">Bespoke Skincare</option>
                          <option value="makeup">Editorial Makeup</option>
                        </select>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="date" className="font-sans text-[0.65rem] tracking-[0.15em] text-luxury-gold uppercase font-bold">PREFERRED DATE</label>
                        <input 
                          type="date" 
                          id="date" 
                          required 
                          className="w-full bg-white border border-luxury-platinum/30 px-4 py-3 text-sm font-sans text-luxury-obsidian focus:outline-none focus:border-luxury-gold transition-colors rounded-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label htmlFor="notes" className="font-sans text-[0.65rem] tracking-[0.15em] text-luxury-gold uppercase font-bold">SPECIAL NOTE OR SPECIFIC PREFERENCES</label>
                      <textarea 
                        id="notes" 
                        rows={3}
                        placeholder="Skin sensitivities, custom designs, or bridal expectations..."
                        className="w-full bg-white border border-luxury-platinum/30 px-4 py-3 text-sm font-sans text-luxury-obsidian placeholder:text-luxury-obsidian/30 focus:outline-none focus:border-luxury-gold transition-colors rounded-none resize-none"
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit" 
                        className="w-full py-4 bg-luxury-plum hover:bg-luxury-gold text-luxury-pearl hover:text-luxury-obsidian text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-500 shadow-md"
                      >
                        REQUEST ARTISAN ALLOCATION
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-luxury-rose flex items-center justify-center text-luxury-gold mx-auto border border-luxury-platinum/10">
                    <Sparkles size={28} strokeWidth={1.2} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl font-light text-luxury-plum">Request Received</h3>
                    <p className="font-sans text-sm font-light text-luxury-obsidian/70 max-w-md mx-auto leading-relaxed">
                      Thank you for choosing Gloss Studio. An artisan concierge has locked your request profile and will call you on your phone line shortly to confirm your booking and match you with the ideal technician.
                    </p>
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={() => {
                        setBookingOpen(false);
                        setBookingSubmitted(false);
                      }}
                      className="px-8 py-3 bg-luxury-plum text-luxury-pearl text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-300"
                    >
                      RETURN TO ATELIER
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
