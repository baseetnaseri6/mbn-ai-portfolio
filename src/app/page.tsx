"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaChartBar,
  FaCloud,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaNetworkWired,
  FaPython,
  FaRobot,
} from "react-icons/fa";
import { MdAutoGraph, MdOutlineDataObject } from "react-icons/md";
import { SiNextdotjs, SiOpenai, SiTensorflow, SiTypescript } from "react-icons/si";

type Theme = {
  name: string;
  bg: string;
  text: string;
  panel: string;
  accent: string;
  soft: string;
};

type Message = {
  role: "ai" | "user";
  text: string;
  action?: "contact" | "skills" | "career" | "blogs" | "about" | "projects" | "testimonials" | "skillsGraph" | "projectOS" | "command";
};

const themes: Theme[] = [
  { name: "Indigo", bg: "#f4f1e8", text: "#111111", panel: "#111111", accent: "#4f46e5", soft: "#a5b4fc" },
  { name: "Forest", bg: "#f1f5ef", text: "#111111", panel: "#102015", accent: "#15803d", soft: "#86efac" },
  { name: "Ruby", bg: "#f7f1f1", text: "#111111", panel: "#1a0b0b", accent: "#be123c", soft: "#fda4af" },
  { name: "Slate", bg: "#eef2f5", text: "#111111", panel: "#0f172a", accent: "#0f766e", soft: "#5eead4" },
];

const skills = [
  { name: "Python", icon: "python", level: 94, group: "Data" },
  { name: "Machine Learning", icon: "ml", level: 90, group: "AI" },
  { name: "Data Analysis", icon: "analysis", level: 91, group: "Data" },
  { name: "AI Engineering", icon: "ai", level: 88, group: "AI" },
  { name: "TypeScript", icon: "typescript", level: 84, group: "Web" },
  { name: "Next.js", icon: "next", level: 82, group: "Web" },
  { name: "Azure / Cloud", icon: "cloud", level: 86, group: "Cloud" },
  { name: "Networking", icon: "network", level: 89, group: "Network" },
  { name: "Automation", icon: "automation", level: 87, group: "Systems" },
  { name: "Computer Vision", icon: "vision", level: 80, group: "AI" },
  { name: "SQL / Databases", icon: "database", level: 83, group: "Data" },
  { name: "Power BI", icon: "powerbi", level: 79, group: "Analytics" },
];

const skillIconMap: Record<string, IconType> = {
  python: FaPython,
  ml: SiTensorflow,
  analysis: MdAutoGraph,
  ai: SiOpenai,
  typescript: SiTypescript,
  next: SiNextdotjs,
  cloud: FaCloud,
  network: FaNetworkWired,
  automation: FaRobot,
  vision: MdOutlineDataObject,
  database: FaDatabase,
  powerbi: FaChartBar,
};

function SkillIcon({ icon }: { icon: string }) {
  const Icon = skillIconMap[icon] ?? FaRobot;
  return <Icon className="h-5 w-5" />;
}

const projects = [
  {
    title: "AI Resume Analyzer",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    text: "AI platform that reviews CVs, scores quality, detects weak points, and gives professional improvement suggestions.",
    problem: "Many job seekers send weak CVs without knowing why they are rejected.",
    solution: "An AI assistant analyzes resume structure, keywords, clarity, experience quality and gives improvement suggestions.",
    architecture: "Upload CV → Extract text → AI analysis → Scoring engine → Recommendation report.",
    aiLogic: "Uses NLP, scoring rules, keyword matching and improvement generation.",
    stack: ["Python", "NLP", "Next.js", "TypeScript", "Tailwind", "AI API"],
    impact: "Helps users improve job applications and understand their CV weaknesses.",
    next: "Add PDF export, ATS score, job matching and multilingual resume feedback."
  },
  {
    title: "Smart Beton Mixing AI",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    text: "Industrial AI that predicts concrete mix adjustments using humidity, temperature, weather, and production history.",
    problem: "Concrete quality can change because of weather, humidity, temperature and material variation.",
    solution: "AI predicts the best water/cement adjustment before production starts.",
    architecture: "Weather data → Factory history → Mix formula → Prediction model → Operator recommendation.",
    aiLogic: "Regression model learns from historical batches and environmental conditions.",
    stack: ["Python", "Machine Learning", "Sensor Data", "Weather API", "Dashboard"],
    impact: "Improves quality, reduces waste and supports smarter industrial production.",
    next: "Connect live sensors, build operator dashboard and add predictive quality alerts."
  },
  {
    title: "ConcreteVision AI",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    text: "Computer vision concept for detecting concrete cracks, surface defects, and quality problems during production.",
    problem: "Manual defect detection is slow and can miss small cracks or surface problems.",
    solution: "Camera-based AI detects visual defects in real time during production.",
    architecture: "Camera feed → Image preprocessing → Vision model → Defect detection → Alert dashboard.",
    aiLogic: "Computer vision model identifies cracks, surface damage and abnormal patterns.",
    stack: ["Python", "OpenCV", "Computer Vision", "Detection Model", "Dashboard"],
    impact: "Supports faster quality control and reduces defective products reaching customers.",
    next: "Train with real factory images and build live camera monitoring."
  },
];

const blogs = [
  {
    title: "How AI Is Changing Modern Portfolios",
    category: "AI Product Design",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    text: "A modern portfolio should behave like an intelligent product that guides the visitor.",
    details: "Future portfolios will become interactive systems. Instead of scrolling through long pages, visitors will ask questions and receive personalized answers. This creates a stronger first impression and makes the portfolio feel like a real AI product.",
  },
  {
    title: "Data Science Meets Real Infrastructure",
    category: "Data Science",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    text: "The strongest AI systems need data pipelines, infrastructure, monitoring and automation.",
    details: "A Data Scientist with infrastructure knowledge can design systems that are practical, scalable, and reliable. This combination connects machine learning with real production environments.",
  },
];

const testimonials = [
  { name: "Project Partner", role: "AI Concept Review", image: "https://i.pravatar.cc/120?img=12", text: "Mohammad has a strong ability to turn technical ideas into real AI product concepts." },
  { name: "Technical Mentor", role: "Cloud & Network", image: "https://i.pravatar.cc/120?img=32", text: "His combination of networking, cloud, and AI thinking makes his profile very strong." },
];

const career = [
  {
    year: "2026",
    title: "Data Scientist & AI Engineer",
    type: "Current Direction",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    tools: ["Python", "Machine Learning", "AI Systems", "Automation"],
    impact: "Building intelligent systems that combine data, automation, AI reasoning and product thinking.",
    details: "Building intelligent systems, automation workflows, AI products, portfolio assistants, and data-driven digital experiences.",
  },
  {
    year: "2025",
    title: "Azure / Cloud / AI Portfolio Projects",
    type: "Professional Development",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    tools: ["Azure", "Cloud", "Networking", "AI Concepts"],
    impact: "Designed practical AI project ideas connected to cloud, data, industry and infrastructure.",
    details: "Worked on AI Resume Analyzer, Smart Beton Mixing AI, ConcreteVision AI, and Network Intelligence Lab concepts.",
  },
  {
    year: "2023 - 2025",
    title: "Amazon Germany",
    type: "Operations & Technical Environment",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    tools: ["Operations", "Problem Solving", "Process Flow", "Systems Thinking"],
    impact: "Gained real-world operational discipline, structured troubleshooting and production environment understanding.",
    details: "Experience in operational systems, troubleshooting, process thinking, production flow, and structured problem solving.",
  },
  {
    year: "Earlier",
    title: "IT Network Administration",
    type: "Infrastructure Experience",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    tools: ["Cisco", "Windows Server", "Firewalls", "Infrastructure"],
    impact: "Built a strong technical foundation in real networking, infrastructure, security and system administration.",
    details: "Hands-on networking, Cisco concepts, infrastructure support, firewall/security thinking, Windows Server and cloud/network labs.",
  },
];

const education = [
  {
    year: "Master Level",
    title: "Digital Business & AI",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    tools: ["AI Strategy", "Digital Products", "Business AI", "Automation"],
    impact: "Connects artificial intelligence with business transformation and intelligent product design.",
    details: "Focus on artificial intelligence, digital products, business transformation, data-driven systems and intelligent automation.",
  },
  {
    year: "Bachelor",
    title: "Computer Science",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    tools: ["Software Engineering", "Databases", "Networking", "Programming"],
    impact: "Created the technical foundation for AI engineering, systems thinking and data-driven development.",
    details: "Foundation in software engineering, databases, networking, systems, programming and IT infrastructure.",
  },
  {
    year: "Certifications",
    title: "Cisco ENCOR + Azure Network Engineer",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    tools: ["Cisco", "Azure", "Routing", "Cloud Networking"],
    impact: "Strengthens the bridge between cloud, network infrastructure and intelligent system design.",
    details: "Strong technical background in networking, cloud connectivity, routing, switching, Azure virtual networks and security concepts.",
  },
];


function getRecommendations(text: string) {
  const q = text.toLowerCase();

  if (
    q.includes("ai") ||
    q.includes("machine learning") ||
    q.includes("project")
  ) {
    return [
      "AI Resume Analyzer",
      "Smart Beton Mixing AI",
      "ConcreteVision AI",
    ];
  }

  if (
    q.includes("data") ||
    q.includes("analytics") ||
    q.includes("science")
  ) {
    return [
      "Professional Timeline",
      "Data Analysis Skills Matrix",
      "AI Resume Analyzer",
    ];
  }

  if (
    q.includes("career") ||
    q.includes("experience") ||
    q.includes("education")
  ) {
    return [
      "Education Timeline",
      "Professional Experience",
      "Certifications",
    ];
  }

  return [
    "AI Resume Analyzer",
    "Professional Timeline",
    "Skills Matrix",
  ];
}


function getAnswer(question: string): Message {
  const q = question.toLowerCase();

  if (q.includes("hire")) {
    return {
      role: "ai",
      action: "contact",
      text: "Hiring request detected. Mohammad is available for AI engineering, data science, automation, portfolio systems and intelligent web product work. Open the contact form below.",
    };
  }

  if (q.includes("education") || q.includes("experience") || q.includes("career")) {
    return {
      role: "ai",
      action: "career",
      text: "Profile timeline ready. Mohammad combines Computer Science, Digital Business & AI, Cisco/Azure certifications, IT infrastructure experience, data science and AI engineering direction. Open the professional timeline below.",
    };
  }

  if (q.includes("about") || q.includes("who is mohammad") || q.includes("profile")) {
    return {
      role: "ai",
      action: "about",
      text: "About module ready. Open Mohammad's professional AI profile card with image, rating, focus areas, social channels and detailed summary.",
    };
  }

  if (q.includes("skill")) {
    return {
      role: "ai",
      action: "skills",
      text: "Top skills detected: Python, Machine Learning and Data Analysis.",
    };
  }

  if (q.includes("project")) {
    return {
      role: "ai",
      action: "projects",
      text: "Best projects detected: AI Resume Analyzer, Smart Beton Mixing AI and ConcreteVision AI.",
    };
  }

  if (q.includes("blog") || q.includes("article")) {
    return {
      role: "ai",
      action: "blogs",
      text: "Blog module available: AI product design, data science and intelligent portfolio systems.",
    };
  }

  if (q.includes("testimonial") || q.includes("review") || q.includes("feedback")) {
    return {
      role: "ai",
      action: "testimonials",
      text: "Trust records available: professional feedback, rating and collaboration signals.",
    };
  }

  if (q.includes("contact") || q.includes("email")) {
    return {
      role: "ai",
      action: "contact",
      text: "Contact channel ready for AI, data, automation and web product requests.",
    };
  }

  return {
    role: "ai",
    text: "Ask about skills, projects, blogs, education, experience, contact, or type hire me.",
  };
}

function AvailabilityStatus({ theme }: { theme: Theme }) {
  const statuses = [
    "CURRENTLY BUILDING AI SYSTEMS",
    "AVAILABLE FOR AI PROJECTS",
    "DESIGNING DATA PRODUCTS",
    "AUTOMATING INTELLIGENT WORKFLOWS",
    "OPEN FOR COLLABORATION",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % statuses.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-5 flex max-w-md items-center gap-3 border border-black px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em]">
      <motion.span
        key={index}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [1, 1.35, 1], opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: theme.accent }}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={statuses[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {statuses[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}


function DynamicBackground({ theme }: { theme: Theme }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -left-32 top-20 h-96 w-96 rounded-full blur-3xl"
        style={{ background: `${theme.accent}18` }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 35, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: `${theme.accent}14` }}
      />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)] [background-size:42px_42px]" />
    </div>
  );
}

function SkillsGraphModal({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: Theme }) {
  const nodes = [
    { name: "AI", level: 92, x: "50%", y: "12%" },
    { name: "Data", level: 91, x: "18%", y: "36%" },
    { name: "ML", level: 90, x: "82%", y: "36%" },
    { name: "Cloud", level: 86, x: "22%", y: "72%" },
    { name: "Automation", level: 87, x: "78%", y: "72%" },
    { name: "Web", level: 84, x: "50%", y: "86%" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[220] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="w-full max-w-6xl border border-black p-8 shadow-[28px_28px_0_#111]"
            style={{ background: theme.bg, color: theme.text }}
          >
            <div className="mb-8 flex items-center justify-between border-b border-black pb-4 font-mono text-xs uppercase tracking-[0.3em]">
              <span>live ai skills graph</span>
              <button onClick={onClose} className="hover:line-through">close</button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative h-[560px] overflow-hidden border border-black" style={{ background: `${theme.accent}08` }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 34, ease: "linear" }}
                  className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 44, ease: "linear" }}
                  className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20"
                />

                <svg className="absolute inset-0 h-full w-full">
                  {nodes.map((node) => (
                    <line
                      key={node.name}
                      x1="50%"
                      y1="50%"
                      x2={node.x}
                      y2={node.y}
                      stroke={theme.accent}
                      strokeWidth="2"
                      opacity="0.65"
                    />
                  ))}
                  <circle cx="50%" cy="50%" r="84" fill="none" stroke={theme.accent} strokeWidth="2" opacity="0.4" />
                  <circle cx="50%" cy="50%" r="148" fill="none" stroke={theme.accent} strokeWidth="1" opacity="0.25" />
                </svg>

                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2.4 }}
                  className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black text-center"
                  style={{ background: theme.panel, color: theme.bg }}
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: theme.soft }}>
                      core
                    </p>
                    <h3 className="text-4xl font-black">MBN</h3>
                  </div>
                </motion.div>

                {nodes.map((node, i) => (
                  <motion.div
                    key={node.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
                    transition={{ delay: i * 0.12, y: { duration: 3 + i * 0.3, repeat: Infinity } }}
                    className="absolute flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-black text-center"
                    style={{
                      left: node.x,
                      top: node.y,
                      background: i % 2 === 0 ? theme.bg : theme.panel,
                      color: i % 2 === 0 ? theme.text : theme.bg,
                    }}
                  >
                    <span className="text-2xl font-black">{node.name}</span>
                    <span className="mt-1 font-mono text-[10px]" style={{ color: i % 2 === 0 ? theme.accent : theme.soft }}>
                      {node.level}%
                    </span>
                  </motion.div>
                ))}
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                  intelligence map
                </p>

                <h2 className="mt-5 text-5xl font-black leading-tight">
                  Skill network, not boring bars.
                </h2>

                <p className="mt-6 leading-8">
                  This graph shows Mohammad's strongest professional direction:
                  AI, data, machine learning, cloud, automation and web systems
                  working together as one intelligent product layer.
                </p>

                <div className="mt-8 grid gap-3">
                  {nodes.map((node) => (
                    <div key={node.name} className="border border-black p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-black">{node.name}</span>
                        <span className="font-mono text-xs" style={{ color: theme.accent }}>{node.level}%</span>
                      </div>
                      <div className="h-2 rounded-full border border-black">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${node.level}%` }}
                          transition={{ duration: 1 }}
                          className="h-full rounded-full"
                          style={{ background: theme.accent }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectOSModal({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: Theme }) {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} className="grid max-h-[92vh] w-full max-w-6xl overflow-y-auto border border-black shadow-[28px_28px_0_#111] lg:grid-cols-[0.8fr_1.2fr]" style={{ background: theme.bg, color: theme.text }}>
            <div className="border-b border-black p-6 lg:border-b-0 lg:border-r">
              <div className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em]">
                <span>project os</span>
                <button onClick={onClose}>close</button>
              </div>

              <div className="grid gap-3">
                {projects.map((p, i) => (
                  <button key={p.title} onClick={() => setActive(i)} className="border border-black p-4 text-left transition hover:bg-black hover:text-white" style={{ background: active === i ? theme.panel : "transparent", color: active === i ? theme.bg : theme.text }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em]">status: online</p>
                    <h3 className="mt-2 text-xl font-black">{p.title}</h3>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[92vh] overflow-y-auto p-8">
              <img src={project.image} alt={project.title} className="mb-8 h-72 w-full border border-black object-cover" />
              <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>ai project record</p>
              <h2 className="mt-5 text-5xl font-black">{project.title}</h2>
              <p className="mt-6 text-lg leading-8">{project.text}</p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ["Category", "AI System"],
                  ["Status", "Concept Online"],
                  ["Impact", "High"],
                ].map(([a,b]) => (
                  <div key={a} className="border border-black p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">{a}</p>
                    <p className="mt-3 text-xl font-black">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CommandConsole({
  open,
  onClose,
  theme,
  runCommand,
}: {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  runCommand: (cmd: string) => void;
}) {
  const [cmd, setCmd] = useState("");

  function execute(value?: string) {
    const command = (value ?? cmd).trim();
    if (!command) return;
    runCommand(command);
    setCmd("");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[230] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} className="w-full max-w-3xl border border-black p-7 shadow-[24px_24px_0_#111]" style={{ background: theme.panel, color: theme.bg }}>
            <div className="mb-6 flex items-center justify-between border-b pb-4 font-mono text-xs uppercase tracking-[0.3em]" style={{ borderColor: `${theme.bg}44` }}>
              <span>command console</span>
              <button onClick={onClose}>close</button>
            </div>

            <p className="font-mono text-sm leading-8" style={{ color: theme.soft }}>
              commands: about / skills / graph / projects / project os / timeline / blogs / contact / hire me
            </p>

            <div className="mt-6 flex border" style={{ borderColor: theme.bg }}>
              <input value={cmd} onChange={(e) => setCmd(e.target.value)} onKeyDown={(e) => e.key === "Enter" && execute()} placeholder="type command..." className="flex-1 bg-transparent p-4 font-mono outline-none" />
              <button onClick={() => execute()} className="border-l px-5 font-mono text-xs uppercase tracking-[0.25em]" style={{ borderColor: theme.bg }}>run</button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["skills", "graph", "project os", "timeline", "contact"].map((c) => (
                <button key={c} onClick={() => execute(c)} className="border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: theme.soft, color: theme.soft }}>
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function Loader({ theme }: { theme: Theme }) {
  return (
    <main
      className="flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: theme.bg, color: theme.text }}
    >
      <div className="w-full max-w-xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs uppercase tracking-[0.45em]"
          style={{ color: theme.accent }}
        >
          MBN_OS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 text-4xl font-black md:text-6xl"
        >
          Mohammad Baseet Naseri
        </motion.h1>

        <div className="mx-auto mt-10 h-[2px] max-w-md overflow-hidden bg-black/20">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="h-full"
            style={{ background: theme.accent }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8 }}
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em]"
          style={{ color: theme.accent }}
        >
          Preparing Intelligence...
        </motion.p>
      </div>
    </main>
  );
}

function ThemeDock({ themes, theme, setTheme }: { themes: Theme[]; theme: Theme; setTheme: (theme: Theme) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="fixed right-0 top-1/2 z-[150] -translate-y-1/2" animate={{ x: open ? 0 : 128 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}>
      <div className="relative w-32 border border-black bg-[#111] p-4 text-[#f4f1e8] shadow-[10px_10px_0_rgba(0,0,0,0.25)]">
        <button onClick={() => setOpen(!open)} className="absolute -left-16 top-1/2 -translate-y-1/2 border border-black bg-[#111] px-3 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4f1e8] [writing-mode:vertical-rl]">
          {open ? "hide" : "colors"}
        </button>

        <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.25em]">palette</p>

        <div className="grid grid-cols-2 gap-3">
          {themes.map((t) => (
            <button key={t.name} onClick={() => setTheme(t)} className="relative h-10 w-10 rounded-full border border-[#f4f1e8] transition hover:scale-110" style={{ background: t.accent }} title={t.name}>
              {theme.name === t.name && <span className="absolute inset-2 rounded-full bg-[#f4f1e8]" />}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CVModal({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: Theme }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="h-[90vh] w-full max-w-5xl border border-black p-5 shadow-[24px_24px_0_#111]" style={{ background: theme.bg, color: theme.text }}>
            <div className="mb-4 flex items-center justify-between border-b border-black pb-4 font-mono text-xs uppercase tracking-[0.3em]">
              <span>cv preview</span>
              <button onClick={onClose}>close</button>
            </div>
            <iframe src="/Mohammad-Baseet-Naseri-CV.pdf" className="h-[calc(90vh-90px)] w-full border border-black" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CareerDetailModal({
  open,
  onClose,
  item,
  theme,
}: {
  open: boolean;
  onClose: () => void;
  item: any;
  theme: Theme;
}) {
  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[230] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60 }}
            className="grid h-[92vh] w-full max-w-6xl overflow-hidden border border-black shadow-[28px_28px_0_#111] lg:grid-cols-[0.95fr_1.05fr]"
            style={{ background: theme.bg, color: theme.text }}
          >
            <div className="relative min-h-[420px] border-b border-black lg:border-b-0 lg:border-r">
              <img
                src={item.image}
                alt={item.title}
                className="h-full min-h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-mono text-xs uppercase tracking-[0.3em]">
                  {item.year}
                </p>
                <h2 className="mt-4 text-5xl font-black leading-tight">
                  {item.title}
                </h2>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8 flex items-center justify-between border-b border-black pb-4 font-mono text-xs uppercase tracking-[0.3em]">
                <span>expanded profile record</span>
                <button onClick={onClose} className="hover:line-through">
                  close
                </button>
              </div>

              <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                {item.type ?? "education record"}
              </p>

              <h3
                className="mt-5 bg-clip-text text-5xl font-black leading-tight text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.text}, ${theme.accent})`,
                }}
              >
                {item.title}
              </h3>

              <p className="mt-6 text-lg leading-9">{item.details}</p>

              <div className="mt-8 border-l-4 pl-6 text-lg leading-9" style={{ borderColor: theme.accent }}>
                {item.impact}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="border border-black p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">
                    year
                  </p>
                  <p className="mt-3 text-xl font-black">{item.year}</p>
                </div>
                <div className="border border-black p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">
                    category
                  </p>
                  <p className="mt-3 text-xl font-black">{item.type ?? "Education"}</p>
                </div>
                <div className="border border-black p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">
                    status
                  </p>
                  <p className="mt-3 text-xl font-black">Verified</p>
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                  related tools
                </p>

                <div className="flex flex-wrap gap-3">
                  {item.tools?.map((tool: string) => (
                    <span
                      key={tool}
                      className="border border-black px-4 py-2 font-mono text-xs uppercase tracking-[0.18em]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CareerModal({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: Theme }) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  function runConsoleCommand(command: string) {
    const c = command.toLowerCase();
    if (c.includes("graph")) setSkillsGraphOpen(true);
    else if (c.includes("project os")) setProjectOSOpen(true);
    else if (c.includes("project")) setSlider("projects");
    else if (c.includes("skill")) setSkillsOpen(true);
    else if (c.includes("timeline") || c.includes("experience") || c.includes("education")) setCareerOpen(true);
    else if (c.includes("blog")) setSlider("blogs");
    else if (c.includes("contact") || c.includes("hire")) setContact(true);
    else send(command);
  }

  function startVoice() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((p) => [...p, { role: "ai", text: "Voice recognition is not supported in this browser. Please use Chrome or type your question." }]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      send(transcript);
    };
    recognition.start();
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[210] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 55, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 55, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-6xl overflow-y-auto border border-black p-8 shadow-[28px_28px_0_#111]"
              style={{ background: theme.bg, color: theme.text }}
            >
              <div className="mb-8 flex items-center justify-between border-b border-black pb-4 font-mono text-xs uppercase tracking-[0.3em]">
                <span>professional intelligence timeline</span>
                <button onClick={onClose} className="hover:line-through">
                  close
                </button>
              </div>

              <div className="mb-10 grid gap-5 md:grid-cols-3">
                {[
                  ["AI", "Current Focus"],
                  ["Data", "Core Direction"],
                  ["Cloud", "Technical Layer"],
                ].map(([big, small]) => (
                  <div key={big} className="border border-black p-6">
                    <h3 className="text-5xl font-black" style={{ color: theme.accent }}>
                      {big}
                    </h3>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-[#64748b]">
                      {small}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                    experience system
                  </p>

                  <div className="relative border-l border-black pl-8">
                    {career.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="relative mb-6 border border-black p-5"
                        style={{ background: i === 0 ? `${theme.accent}12` : "transparent" }}
                      >
                        <span
                          className="absolute -left-[43px] top-6 h-5 w-5 rounded-full border border-black"
                          style={{ background: theme.accent }}
                        />

                        <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: theme.accent }}>
                          {item.year}
                        </p>
                        <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
                        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[#64748b]">
                          {item.type}
                        </p>
                        <p className="mt-4 leading-7">{item.details}</p>

                        <button
                          onClick={() => setSelectedItem(item)}
                          className="mt-5 border border-black px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] transition hover:bg-black hover:text-white"
                        >
                          read more
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                    education system
                  </p>

                  <div className="grid gap-5">
                    {education.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="group border border-black p-6 transition hover:-translate-y-1 hover:shadow-[10px_10px_0_#111]"
                        style={{ background: i === 0 ? theme.panel : theme.bg, color: i === 0 ? theme.bg : theme.text }}
                      >
                        <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: i === 0 ? theme.soft : theme.accent }}>
                          {item.year}
                        </p>
                        <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
                        <p className="mt-4 leading-7">{item.details}</p>

                        <button
                          onClick={() => setSelectedItem(item)}
                          className="mt-5 border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] transition"
                          style={{
                            borderColor: i === 0 ? theme.bg : theme.text,
                            color: i === 0 ? theme.bg : theme.text,
                          }}
                        >
                          read more
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 border border-black p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: theme.accent }}>
                      profile summary
                    </p>
                    <p className="mt-4 leading-8">
                      Mohammad connects Data Science, AI Engineering, Cloud thinking,
                      infrastructure knowledge and automation into one professional
                      direction: building intelligent systems that are useful in the
                      real world.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CareerDetailModal
        open={!!selectedItem}
        item={selectedItem}
        theme={theme}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}

function AboutModal({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: Theme }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[225] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60 }}
            className="grid h-[92vh] w-full max-w-6xl overflow-hidden border border-black shadow-[28px_28px_0_#111] lg:grid-cols-[0.9fr_1.1fr]"
            style={{ background: theme.bg, color: theme.text }}
          >
            <div
              className="relative flex min-h-[560px] flex-col items-center justify-center border-b border-black p-8 text-center lg:border-b-0 lg:border-r"
              style={{ background: theme.panel, color: theme.bg }}
            >
              <button
                onClick={onClose}
                className="absolute right-6 top-6 border px-4 py-2 font-mono text-xs uppercase tracking-[0.25em]"
                style={{ borderColor: theme.bg }}
              >
                close
              </button>

              <img
                src="/profile.jpg"
                alt="Mohammad Baseet Naseri"
                className="h-56 w-56 rounded-full border object-cover"
                style={{ borderColor: theme.bg }}
              />

              <p className="mt-8 font-mono text-xs uppercase tracking-[0.35em]" style={{ color: theme.soft }}>
                verified ai profile
              </p>

              <h2
                className="mt-5 bg-clip-text text-5xl font-black leading-tight text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${theme.bg}, ${theme.soft})` }}
              >
                Mohammad<br />Baseet<br />Naseri
              </h2>

              <p className="mt-5 text-2xl" style={{ color: theme.soft }}>★★★★★</p>
            </div>

            <div className="h-[92vh] overflow-y-auto p-8">
              <div className="mb-8 border-b border-black pb-4">
                <p className="font-mono text-xs uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
                  about intelligence record
                </p>
                <h3 className="mt-5 text-5xl font-black leading-tight">
                  Data Scientist & AI Engineer
                </h3>
              </div>

              <p className="text-lg leading-9">
                Mohammad Baseet Naseri builds intelligent systems that connect data, machine learning, automation and modern product design.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  ["Core Role", "Data Scientist & AI Engineer"],
                  ["Focus", "AI Systems, ML, Automation"],
                  ["Product Style", "Minimal AI OS Interfaces"],
                  ["Strength", "Data + AI + Infrastructure Thinking"],
                ].map(([label, value]) => (
                  <div key={label} className="border border-black p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">{label}</p>
                    <p className="mt-3 text-xl font-black">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-l-4 pl-6 leading-8" style={{ borderColor: theme.accent }}>
                Mohammad's profile is built around one direction: combining practical infrastructure knowledge with modern AI engineering. This makes the portfolio feel like an intelligent system, not a normal CV page.
              </div>

              <div className="mt-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                  professional signals
                </p>

                <div className="flex flex-wrap gap-3">
                  {["AI Engineering", "Data Science", "Machine Learning", "Automation", "Cloud Thinking", "Networking", "Portfolio OS", "Digital Products"].map((tag) => (
                    <span key={tag} className="border border-black px-4 py-2 font-mono text-xs uppercase tracking-[0.18em]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ["2035", "Interface Vision"],
                  ["AI", "Core Direction"],
                  ["Data", "Decision Layer"],
                ].map(([big, small]) => (
                  <div key={big} className="border border-black p-5 text-center">
                    <h4 className="text-4xl font-black" style={{ color: theme.accent }}>{big}</h4>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b]">{small}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function SkillsModal({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: Theme }) {
  const featured = skills.slice(0, 4);
  const rest = skills.slice(4);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="grid h-[92vh] w-full max-w-6xl overflow-hidden border border-black shadow-[28px_28px_0_#111] lg:grid-cols-[0.85fr_1.15fr]"
            style={{ background: theme.bg, color: theme.text }}
          >
            <div
              className="h-[92vh] overflow-hidden border-b border-black p-8 lg:border-b-0 lg:border-r"
              style={{ background: theme.panel, color: theme.bg }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute -right-28 -top-28 h-80 w-80 rounded-full border opacity-30"
                style={{ borderColor: theme.soft }}
              />

              <p className="font-mono text-xs uppercase tracking-[0.35em]" style={{ color: theme.soft }}>
                professional skill intelligence
              </p>

              <h2
                className="mt-8 bg-clip-text text-6xl font-black leading-none text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${theme.bg}, ${theme.soft})` }}
              >
                Skills<br />Matrix
              </h2>

              <p className="mt-8 max-w-md leading-8 opacity-80">
                A modern overview of Mohammad's technical profile across AI,
                data, automation, cloud, networking and product engineering.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  ["12+", "Core Skills"],
                  ["90%", "AI/Data Focus"],
                  ["4", "Main Domains"],
                  ["2035", "Portfolio OS"],
                ].map(([big, small]) => (
                  <div key={small} className="border p-5 text-center" style={{ borderColor: theme.bg }}>
                    <h3 className="text-4xl font-black" style={{ color: theme.soft }}>{big}</h3>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em]">{small}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[92vh] overflow-y-auto overscroll-contain p-8">
              <div className="mb-8 flex items-center justify-between border-b border-black pb-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                  live capability system
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="border border-black px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] transition hover:bg-black hover:text-white"
                >
                  close
                </button>
              </div>

              <div className="mb-8 grid gap-4 md:grid-cols-2">
                {featured.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-3xl border border-black p-6"
                    style={{ background: i === 0 ? `${theme.accent}14` : "transparent" }}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-full"
                          style={{ background: theme.panel, color: theme.bg }}
                        >
                          <SkillIcon icon={skill.icon} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black">{skill.name}</h3>
                          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">{skill.group}</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm" style={{ color: theme.accent }}>{skill.level}%</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full border border-black">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full"
                        style={{ background: theme.accent }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid gap-3">
                {rest.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group flex items-center justify-between rounded-2xl border border-black p-4 transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#111]"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-full"
                        style={{ background: `${theme.accent}18`, color: theme.accent }}
                      >
                        <SkillIcon icon={skill.icon} />
                      </div>
                      <div>
                        <h4 className="font-black">{skill.name}</h4>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b]">{skill.group}</p>
                      </div>
                    </div>

                    <div className="flex w-36 items-center gap-3">
                      <div className="h-2 flex-1 rounded-full border border-black">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1 }}
                          className="h-full rounded-full"
                          style={{ background: theme.accent }}
                        />
                      </div>
                      <span className="font-mono text-xs" style={{ color: theme.accent }}>{skill.level}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactModal({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: Theme }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="grid max-h-[92vh] w-full max-w-6xl overflow-y-auto border border-black shadow-[28px_28px_0_#111] lg:grid-cols-[1.1fr_.9fr]" style={{ background: theme.bg, color: theme.text }}>
            <div className="p-8">
              <div className="mb-8 flex items-center justify-between border-b border-black pb-4 font-mono text-xs uppercase tracking-[0.3em]">
                <span>contact interface</span>
                <button onClick={onClose}>close</button>
              </div>
              <h2 className="text-5xl font-black leading-none">Start a serious project.</h2>
              <form className="mt-8 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input className="border border-black bg-transparent p-4 outline-none" placeholder="Your name" />
                  <input className="border border-black bg-transparent p-4 outline-none" placeholder="Your email" />
                </div>
                <input className="border border-black bg-transparent p-4 outline-none" placeholder="Project type" />
                <textarea className="min-h-40 border border-black bg-transparent p-4 outline-none" placeholder="Tell me what you want to build..." />
                <button type="button" className="p-4 font-mono text-xs uppercase tracking-[0.25em]" style={{ background: theme.panel, color: theme.bg }}>send request</button>
              </form>
            </div>
            <div className="border-t border-black p-8 lg:border-l lg:border-t-0" style={{ background: theme.panel, color: theme.bg }}>
              <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.soft }}>Mohammad Baseet Naseri</p>
              <h3 className="mt-6 text-4xl font-black">Data Scientist & AI Engineer</h3>
              <div className="mt-8 grid gap-4 font-mono text-xs uppercase tracking-[0.2em]">
                <div className="border p-4" style={{ borderColor: theme.bg }}>Germany / Remote</div>
                <div className="border p-4" style={{ borderColor: theme.bg }}>AI • Data • Automation</div>
                <div className="border p-4" style={{ borderColor: theme.bg }}>Response: 24-48h</div>
              </div>
              <div className="mt-8 h-64 border p-5" style={{ borderColor: theme.bg }}>
                <div className="flex h-full items-center justify-center text-center font-mono text-xs uppercase tracking-[0.35em]">Map Preview<br />Germany / Remote / On-site</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BlogDetailModal({
  open,
  onClose,
  blog,
  theme,
}: {
  open: boolean;
  onClose: () => void;
  blog: any;
  theme: Theme;
}) {
  return (
    <AnimatePresence>
      {open && blog && (
        <motion.div
          className="fixed inset-0 z-[260] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60 }}
            className="grid h-[92vh] w-full max-w-6xl overflow-hidden border border-black shadow-[28px_28px_0_#111] lg:grid-cols-[0.95fr_1.05fr]"
            style={{ background: theme.bg, color: theme.text }}
          >
            <div className="relative h-[92vh] overflow-hidden border-b border-black lg:border-b-0 lg:border-r">
              <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-mono text-xs uppercase tracking-[0.3em]">{blog.category}</p>
                <h2 className="mt-5 text-5xl font-black leading-tight">{blog.title}</h2>
              </div>
            </div>

            <div className="overflow-y-auto p-8">
              <div className="mb-8 flex items-center justify-between border-b border-black pb-4 font-mono text-xs uppercase tracking-[0.3em]">
                <span>full blog intelligence record</span>
                <button onClick={onClose} className="hover:line-through">close</button>
              </div>

              <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                {blog.category} / {blog.readTime}
              </p>

              <h3
                className="mt-5 bg-clip-text text-5xl font-black leading-tight text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${theme.text}, ${theme.accent})` }}
              >
                {blog.title}
              </h3>

              <p className="mt-8 text-xl leading-9">{blog.text}</p>

              <div className="mt-8 border-l-4 pl-6 text-lg leading-9" style={{ borderColor: theme.accent }}>
                {blog.details}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ["Topic", blog.category],
                  ["Read Time", blog.readTime],
                  ["Format", "AI Insight"],
                ].map(([label, value]) => (
                  <div key={label} className="border border-black p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">{label}</p>
                    <p className="mt-3 text-xl font-black">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                  key ideas
                </p>
                <div className="flex flex-wrap gap-3">
                  {["AI Portfolio", "Data Products", "Automation", "2035 Interface", "Product Thinking"].map((tag) => (
                    <span key={tag} className="border border-black px-4 py-2 font-mono text-xs uppercase tracking-[0.18em]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 h-2 overflow-hidden rounded-full border border-black">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1 }}
                  className="h-full"
                  style={{ background: theme.accent }}
                />
              </div>

              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">
                reading intelligence score: 82%
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SimpleSlider({ open, type, onClose, theme }: { open: boolean; type: "projects" | "blogs" | "testimonials"; onClose: () => void; theme: Theme }) {
  const [index, setIndex] = useState(0);
  const [caseMode, setCaseMode] = useState(false);
  const [blogDetailOpen, setBlogDetailOpen] = useState(false);
  const list = type === "projects" ? projects : type === "blogs" ? blogs : testimonials;
  const project = projects[index];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[205] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 55, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 55, opacity: 0 }}
              className="max-h-[92vh] w-full max-w-6xl overflow-y-auto border border-black p-7 shadow-[24px_24px_0_#111]"
              style={{ background: theme.bg, color: theme.text }}
            >
              <div className="mb-8 flex items-center justify-between border-b border-black pb-4 font-mono text-xs uppercase tracking-[0.3em]">
                <span>
                  {type === "projects" ? "ai project operating record" : type === "blogs" ? "blog intelligence system" : "trust intelligence system"}
                </span>
                <button onClick={onClose} className="hover:line-through">close</button>
              </div>

              {type === "projects" && caseMode ? (
                <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="relative overflow-hidden border border-black" style={{ background: theme.panel, color: theme.bg }}>
                      <img src={project.image} alt={project.title} className="h-[520px] w-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-black/35" />

                      <div className="absolute left-6 right-6 top-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white">
                        <span>case study mode</span>
                        <span>status: online</span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="font-mono text-xs uppercase tracking-[0.3em]">AI product case study</p>
                        <h2 className="mt-5 text-5xl font-black leading-tight">{project.title}</h2>
                        <p className="mt-5 max-w-lg leading-8">{project.text}</p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-6 grid gap-4 md:grid-cols-3">
                        {[
                          ["Impact", "High"],
                          ["Status", "Concept"],
                          ["System", "AI"],
                        ].map(([a, b]) => (
                          <div key={a} className="border border-black p-5 text-center">
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">{a}</p>
                            <p className="mt-3 text-2xl font-black" style={{ color: theme.accent }}>{b}</p>
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-4">
                        {[
                          ["Problem", project.problem],
                          ["Solution", project.solution],
                          ["Architecture", project.architecture],
                          ["AI Logic", project.aiLogic],
                          ["Impact", project.impact],
                          ["Next Improvements", project.next],
                        ].map(([title, value], i) => (
                          <motion.div
                            key={title}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="group border border-black p-5 transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#111]"
                            style={{ background: i === 1 ? `${theme.accent}12` : "transparent" }}
                          >
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: theme.accent }}>
                              {String(i + 1).padStart(2, "0")} / {title}
                            </p>
                            <p className="mt-3 leading-7">{value}</p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-5 border border-black p-5">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: theme.accent }}>
                          tech stack
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {project.stack?.map((item: string) => (
                            <span key={item} className="rounded-full border border-black px-4 py-2 font-mono text-xs uppercase tracking-[0.18em]">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setCaseMode(false)}
                        className="mt-5 w-full border border-black px-6 py-4 font-mono text-xs uppercase tracking-[0.25em] transition hover:bg-black hover:text-white"
                      >
                        back to project overview
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : type === "projects" ? (
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="relative overflow-hidden border border-black">
                    <img src={project.image} alt={project.title} className="h-[520px] w-full object-cover transition duration-700 hover:scale-105" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur">
                      status online
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                        0{index + 1} / 0{projects.length} / ai project
                      </p>

                      <h2
                        className="mt-8 bg-clip-text text-6xl font-black leading-none text-transparent"
                        style={{ backgroundImage: `linear-gradient(90deg, ${theme.text}, ${theme.accent})` }}
                      >
                        {project.title}
                      </h2>

                      <p className="mt-6 max-w-2xl text-lg leading-8">{project.text}</p>

                      <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {[
                          ["Category", "AI System"],
                          ["Difficulty", "High"],
                          ["Use Case", "Real World"],
                        ].map(([a, b]) => (
                          <div key={a} className="border border-black p-5">
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748b]">{a}</p>
                            <p className="mt-3 font-black">{b}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <button
                        onClick={() => setCaseMode(true)}
                        className="border border-black px-6 py-4 font-mono text-xs uppercase tracking-[0.25em] transition hover:bg-black hover:text-white"
                      >
                        open case study mode
                      </button>

                      <button
                        onClick={() => setIndex((index + 1) % projects.length)}
                        className="px-6 py-4 font-mono text-xs uppercase tracking-[0.25em] transition hover:scale-105"
                        style={{ background: theme.panel, color: theme.bg }}
                      >
                        next project
                      </button>
                    </div>
                  </div>
                </div>
              ) : type === "blogs" ? (
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                  <button onClick={() => setBlogDetailOpen(true)} className="group relative min-h-[460px] overflow-hidden border border-black text-left">
                    <img src={blogs[index].image} alt={blogs[index].title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/45 transition group-hover:bg-black/30" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="font-mono text-xs uppercase tracking-[0.3em]">{blogs[index].category} / {blogs[index].readTime}</p>
                      <h2 className="mt-5 text-5xl font-black leading-tight">{blogs[index].title}</h2>
                      <p className="mt-5 max-w-lg leading-7">{blogs[index].text}</p>
                    </div>
                  </button>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>0{index + 1} / 0{blogs.length}</p>
                    <h3 className="mt-6 text-5xl font-black leading-tight">Blog record ready.</h3>
                    <p className="mt-6 text-lg leading-8">Open this blog to see the full article details, key ideas, reading score and professional AI-style article layout.</p>
                    <button onClick={() => setBlogDetailOpen(true)} className="mt-8 border border-black px-6 py-4 font-mono text-xs uppercase tracking-[0.25em] transition hover:bg-black hover:text-white">
                      read more
                    </button>
                  </div>

                  <div className="lg:col-span-2 mt-2 flex justify-between">
                    <button onClick={() => setIndex((index - 1 + blogs.length) % blogs.length)} className="border border-black px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white">prev</button>
                    <button onClick={() => setIndex((index + 1) % blogs.length)} className="border border-black px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white">next</button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="relative overflow-hidden border border-black p-8" style={{ background: theme.panel, color: theme.bg }}>
                    <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.soft }}>testimonial signal</p>
                    <h2 className="mt-6 text-5xl font-black leading-tight">Human feedback.<br />AI-era identity.</h2>
                    <p className="mt-6 leading-8 opacity-80">Professional trust records designed for a 2035 portfolio system.</p>
                  </div>

                  <div>
                    <motion.div key={index} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2rem] border border-black p-8" style={{ background: `${theme.accent}10` }}>
                      <div className="flex items-center gap-6">
                        <img src={testimonials[index].image} alt={testimonials[index].name} className="h-24 w-24 rounded-full border border-black object-cover" />
                        <div>
                          <h3 className="text-4xl font-black">{testimonials[index].name}</h3>
                          <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[#64748b]">{testimonials[index].role}</p>
                        </div>
                      </div>
                      <p className="mt-8 text-3xl" style={{ color: theme.accent }}>★★★★★</p>
                      <p className="mt-8 text-3xl font-black leading-tight">“{testimonials[index].text}”</p>
                    </motion.div>

                    <div className="mt-6 flex justify-between">
                      <button onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)} className="border border-black px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white">prev</button>
                      <button onClick={() => setIndex((index + 1) % testimonials.length)} className="border border-black px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white">next</button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BlogDetailModal open={blogDetailOpen} onClose={() => setBlogDetailOpen(false)} blog={blogs[index]} theme={theme} />
    </>
  );
}

function SocialLinks({ theme }: { theme: Theme }) {
  const links = [
    { name: "LinkedIn", icon: FaLinkedin, href: "#" },
    { name: "GitHub", icon: FaGithub, href: "#" },
    { name: "Gmail", icon: FaEnvelope, href: "mailto:your-email@gmail.com" },
  ];

  return (
    <div className="mt-6">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#64748b]">
        connect channels
      </p>

      <div className="flex gap-4">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ y: -8, rotate: -2, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-black"
              title={item.name}
            >
              <span
                className="absolute inset-0 translate-y-full transition duration-300 group-hover:translate-y-0"
                style={{ background: theme.accent }}
              />
              <Icon
                className="relative z-10 h-6 w-6 transition duration-300 group-hover:text-white"
                style={{ color: theme.text }}
              />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
function VoiceModal({
  open,
  onClose,
  onSend,
  theme,
}: {
  open: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
  theme: Theme;
}) {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  function startListening() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setTranscript("Voice recognition is not supported in this browser. Please use Chrome or type your question.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  function pauseListening() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  function deleteTranscript() {
    setTranscript("");
  }

  function sendTranscript() {
    if (!transcript.trim()) return;
    onSend(transcript.trim());
    setTranscript("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[260] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60 }}
            className="w-full max-w-3xl border border-black p-8 shadow-[28px_28px_0_#111]"
            style={{ background: theme.bg, color: theme.text }}
          >
            <div className="mb-8 flex items-center justify-between border-b border-black pb-4 font-mono text-xs uppercase tracking-[0.3em]">
              <span>ai voice interface</span>
              <button onClick={onClose} className="hover:line-through">close</button>
            </div>

            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={listening ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ repeat: listening ? Infinity : 0, duration: 1.4 }}
                className="relative flex h-40 w-40 items-center justify-center rounded-full border border-black"
                style={{ background: listening ? theme.panel : theme.bg, color: listening ? theme.bg : theme.text }}
              >
                <span className="text-4xl font-black">MBN</span>
                <span
                  className="absolute -right-2 top-10 h-6 w-6 rounded-full border border-black"
                  style={{ background: listening ? theme.accent : theme.bg }}
                />
              </motion.div>

              <div className="mt-8 flex h-20 items-end gap-2">
                {Array.from({ length: 18 }).map((_, i) => (
                  <motion.span
                    key={i}
                    animate={listening ? { height: [12, 50 + (i % 5) * 8, 18] } : { height: 14 }}
                    transition={{ repeat: listening ? Infinity : 0, duration: 0.8 + i * 0.03 }}
                    className="w-2"
                    style={{ background: theme.accent }}
                  />
                ))}
              </div>

              <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                {listening ? "listening..." : "voice standby"}
              </p>

              <div className="mt-8 min-h-28 w-full border border-black p-5 text-left leading-7">
                {transcript || "Your voice text will appear here..."}
              </div>

              <div className="mt-6 grid w-full gap-3 md:grid-cols-4">
                <button onClick={startListening} className="border border-black px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white">
                  record
                </button>
                <button onClick={pauseListening} className="border border-black px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white">
                  pause
                </button>
                <button onClick={deleteTranscript} className="border border-black px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white">
                  delete
                </button>
                <button onClick={sendTranscript} className="px-4 py-3 font-mono text-xs uppercase tracking-[0.2em]" style={{ background: theme.panel, color: theme.bg }}>
                  send
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function ChatPanel({ theme, hireSignal }: { theme: Theme; hireSignal: number }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "MBN_AI online. Ask everything about Mohammad Baseet Naseri.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [contact, setContact] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [slider, setSlider] = useState<null | "projects" | "blogs" | "testimonials">(null);
  const [skillsGraphOpen, setSkillsGraphOpen] = useState(false);
  const [projectOSOpen, setProjectOSOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [memoryTopics, setMemoryTopics] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  function send(value?: string) {
    const question = (value ?? input).trim();
    if (!question || typing) return;

    const qLower = question.toLowerCase();

    setMemoryTopics((prev) => {
      const next = [...prev];
      ["profile", "skills", "projects", "education", "experience", "blogs", "contact"].forEach((topic) => {
        if (qLower.includes(topic) && !next.includes(topic)) next.push(topic);
      });
      return next.slice(-4);
    });

    setMessages((p) => [...p, { role: "user", text: question }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const res = getAnswer(question);
      setMessages((p) => [...p, res]);
      setTyping(false);
      if (qLower.includes("hire")) setContact(true);
    }, 900);
  }

  function runConsoleCommand(command: string) {
    const c = command.toLowerCase();
    if (c.includes("graph")) setSkillsGraphOpen(true);
    else if (c.includes("project os")) setProjectOSOpen(true);
    else if (c.includes("project")) setSlider("projects");
    else if (c.includes("skill")) setSkillsOpen(true);
    else if (c.includes("timeline") || c.includes("experience") || c.includes("education")) setCareerOpen(true);
    else if (c.includes("blog")) setSlider("blogs");
    else if (c.includes("testimonial")) setSlider("testimonials");
    else if (c.includes("profile") || c.includes("about")) setAboutOpen(true);
    else if (c.includes("contact") || c.includes("hire")) setContact(true);
    else send(command);
  }

  useEffect(() => {
    if (hireSignal > 0) send("hire me");
  }, [hireSignal]);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, typing]);

  return (
    <>
      <motion.div
        className="flex h-[76vh] min-h-[590px] flex-col border border-black shadow-[18px_18px_0_var(--accent)]"
        style={{ background: theme.panel, color: theme.bg, ["--accent" as string]: theme.accent }}
        initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      >
        <div className="flex items-center justify-between border-b p-5" style={{ borderColor: `${theme.bg}33` }}>
          <div className="flex items-center gap-4">
            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="flex h-12 w-12 items-center justify-center rounded-full font-black" style={{ background: theme.bg, color: theme.text }}>
              AI
            </motion.div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em]">MBN_AI Assistant</p>
              <p className="mt-1 text-xs" style={{ color: theme.soft }}>portfolio intelligence online</p>
            </div>
          </div>
          <span className="font-mono text-xs" style={{ color: theme.soft }}>live</span>
        </div>

        <div className="border-b px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: `${theme.bg}22`, color: theme.soft }}>
          Memory: {memoryTopics.length ? memoryTopics.join(" / ") : "waiting for visitor intent"}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-5 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl border px-5 py-4 text-sm leading-7 ${msg.role === "user" ? "rounded-br-none" : "rounded-bl-none"}`}
                style={{
                  background: msg.role === "user" ? theme.bg : "transparent",
                  color: msg.role === "user" ? theme.text : theme.bg,
                  borderColor: msg.role === "user" ? theme.bg : `${theme.bg}44`,
                }}
              >
                {msg.role === "ai" && (
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: theme.soft }}>
                    MBN_AI
                  </p>
                )}

                <p>{msg.text}</p>

                {msg.action === "contact" && <button onClick={() => setContact(true)} className="mt-4 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: theme.soft, color: theme.soft }}>open contact form</button>}
                {msg.action === "skills" && <button onClick={() => setSkillsOpen(true)} className="mt-4 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: theme.soft, color: theme.soft }}>read more skills</button>}
                {msg.action === "career" && <button onClick={() => setCareerOpen(true)} className="mt-4 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: theme.soft, color: theme.soft }}>open timeline</button>}
                {msg.action === "projects" && <button onClick={() => setSlider("projects")} className="mt-4 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: theme.soft, color: theme.soft }}>read more projects</button>}
                {msg.action === "blogs" && <button onClick={() => setSlider("blogs")} className="mt-4 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: theme.soft, color: theme.soft }}>read more blogs</button>}
                {msg.action === "testimonials" && <button onClick={() => setSlider("testimonials")} className="mt-4 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: theme.soft, color: theme.soft }}>read more testimonials</button>}
                {msg.action === "about" && <button onClick={() => setAboutOpen(true)} className="mt-4 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: theme.soft, color: theme.soft }}>open profile</button>}
              </div>
            </motion.div>
          ))}

          {typing && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex items-end gap-3">
              <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} className="flex h-10 w-10 items-center justify-center rounded-full font-black" style={{ background: theme.bg, color: theme.text }}>
                AI
              </motion.div>

              <div className="rounded-2xl rounded-bl-none border px-4 py-3" style={{ borderColor: `${theme.bg}44`, color: theme.bg }}>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: theme.soft }}>
                  MBN_AI is typing
                </p>
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((dot) => (
                    <motion.span key={dot} animate={{ y: [0, -6, 0], opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 0.8, delay: dot * 0.15 }} className="h-2 w-2 rounded-full" style={{ background: theme.soft }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="border-t p-4" style={{ borderColor: `${theme.bg}33` }}>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <button onClick={() => setAboutOpen(true)} className="border px-3 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition hover:scale-[1.02]" style={{ borderColor: `${theme.bg}44` }}>profile</button>
            <button onClick={() => setSlider("testimonials")} className="border px-3 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition hover:scale-[1.02]" style={{ borderColor: `${theme.bg}44` }}>testimonials</button>
          </div>

          <div className="flex border" style={{ borderColor: theme.bg }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask everything about me..." className="flex-1 bg-transparent p-4 font-mono text-sm outline-none" />
            <button onClick={() => setVoiceOpen(true)} className="border-l px-4 font-mono text-xs uppercase tracking-[0.25em]" style={{ borderColor: theme.bg }}>voice</button>
            <button onClick={() => send()} className="border-l px-5 font-mono text-xs uppercase tracking-[0.25em]" style={{ borderColor: theme.bg }}>send</button>
          </div>
        </div>
      </motion.div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} theme={theme} />
      <SkillsModal open={skillsOpen} onClose={() => setSkillsOpen(false)} theme={theme} />
      <CareerModal open={careerOpen} onClose={() => setCareerOpen(false)} theme={theme} />
      <ContactModal open={contact} onClose={() => setContact(false)} theme={theme} />
      <SimpleSlider open={slider === "projects"} type="projects" onClose={() => setSlider(null)} theme={theme} />
      <SimpleSlider open={slider === "blogs"} type="blogs" onClose={() => setSlider(null)} theme={theme} />
      <SimpleSlider open={slider === "testimonials"} type="testimonials" onClose={() => setSlider(null)} theme={theme} />
      <SkillsGraphModal open={skillsGraphOpen} onClose={() => setSkillsGraphOpen(false)} theme={theme} />
      <ProjectOSModal open={projectOSOpen} onClose={() => setProjectOSOpen(false)} theme={theme} />
      <CommandConsole open={consoleOpen} onClose={() => setConsoleOpen(false)} theme={theme} runCommand={runConsoleCommand} />
      <VoiceModal open={voiceOpen} onClose={() => setVoiceOpen(false)} onSend={send} theme={theme} />
    </>
  );
}

export default function Home() {
  const [bootDone, setBootDone] = useState(false);
  const [theme, setTheme] = useState(themes[0]);
  const [cvOpen, setCvOpen] = useState(false);
  const [hireSignal, setHireSignal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setBootDone(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!bootDone) return <Loader theme={theme} />;

  return (
    <main className="h-screen overflow-hidden" style={{ background: theme.bg, color: theme.text }}>
      <ThemeDock themes={themes} theme={theme} setTheme={setTheme} />

      <header className="fixed left-8 right-8 top-8 z-40 flex items-center justify-between font-mono text-xs uppercase tracking-[0.35em]">
        <span className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: theme.accent }} />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${theme.text}, ${theme.accent})` }}
          >
            MBN_OS
          </span>
        </span>
        <span>2035 / ONLINE</span>
      </header>

      <section className="mx-auto grid h-screen max-w-7xl items-center gap-12 px-6 py-8 pt-28 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div className="flex flex-col justify-center" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}>
          <p
            className="mb-10 font-mono text-xs uppercase tracking-[0.4em]"
            style={{ color: "#64748b" }}
          >
            PRIVATE INTELLIGENCE SYSTEM
          </p>
          

          <h1 className="relative text-5xl font-black leading-[0.9] md:text-6xl xl:text-7xl">
            <span className="block">Mohammad</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${theme.text}, ${theme.accent})`,
              }}
            >
              Baseet
            </span>
            <span className="block">Naseri</span>
            <span
              className="mt-5 block h-2 w-32"
              style={{ background: theme.accent }}
            />
          </h1>

          <p className="mt-5 max-w-md text-base leading-7">
            Data Scientist and AI Engineer building intelligent systems, automation workflows, AI products, and data-driven digital experiences.
          </p>

          <AvailabilityStatus theme={theme} />

          <div className="mt-10 flex max-w-md flex-wrap gap-4">
            <button onClick={() => setCvOpen(true)} className="border border-black px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition hover:bg-black hover:text-white">
              Download CV
            </button>
            <button onClick={() => setHireSignal((n) => n + 1)} className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition hover:scale-105" style={{ background: theme.panel, color: theme.bg }}>
              Hire Me
            </button>
          </div>

          

          <SocialLinks theme={theme} />
        </motion.div>

        <ChatPanel theme={theme} hireSignal={hireSignal} />
      </section>

      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} theme={theme} />
    </main>
  );
}
