export const personal = {
  name: 'Harsh Tamakuwala',
  firstName: 'Harsh',
  lastName: 'Tamakuwala',
  initials: 'HT',
  role: 'Software Engineer',
  eyebrow: 'Backend · Cloud · IoT Systems',
  tagline: 'I build backend systems and cloud-native infrastructure that hold up under real-world load — from IoT telemetry pipelines on GCP to enterprise network automation at CBC News.',
  location: 'Oshawa, ON, Canada',
  email: 'Harsh_2003@hotmail.com',
  phone: '647-333-0353',
  github: 'https://github.com/harsh-0214',
  linkedin: 'https://www.linkedin.com/in/harshtamakuwala/',
  education: 'B.Eng. Software Eng. + IoT',
  school: 'Ontario Tech University',
  graduation: 'Expected Apr 2026',
  status: 'Open to New Grad Roles',
};

export const stats = [
  { value: '80%', label: 'Faster Deploys' },
  { value: '1000+', label: 'Devices Managed' },
  { value: '$8M+', label: 'Cost Identified' },
];

export const roles = [
  'Software Engineer',
  'Backend Developer',
  'Cloud Engineer',
  'IoT Systems Developer',
];

export const skillCategories = ['All', 'Languages', 'Backend', 'Cloud & DevOps', 'Databases', 'Tools'] as const;
export type SkillCategory = typeof skillCategories[number];

export const skills: Record<string, string[]> = {
  Languages:      ['Python', 'Java', 'JavaScript', 'SQL', 'C++', 'C', 'Kotlin', 'PHP', 'Bash'],
  Backend:        ['FastAPI', 'Django', 'Node.js', 'Spring Boot', 'REST APIs'],
  'Cloud & DevOps': ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'GitHub Actions'],
  Databases:      ['PostgreSQL', 'MySQL', 'MongoDB', 'BigQuery', 'Pub/Sub', 'Dataflow'],
  Tools:          ['Git', 'Linux', 'Postman', 'Jira', 'Figma', 'NetBox'],
};

export const allSkills = Object.values(skills).flat();

export const marqueeRow1 = ['Python', 'Java', 'JavaScript', 'FastAPI', 'Django', 'Node.js', 'Spring Boot', 'SQL', 'C++', 'Kotlin', 'REST APIs', 'Bash'];
export const marqueeRow2 = ['AWS', 'GCP', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'BigQuery', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Linux', 'Pub/Sub'];

export const experience = [
  {
    role: 'Network Engineering Intern',
    company: 'Canadian Broadcasting Corporation (CBC News)',
    period: '2024 — 2025',
    location: 'Toronto, ON',
    bullets: [
      'Developed a Python automation plugin for NetBox to dynamically allocate Unicast and Multicast IP addresses across enterprise infrastructure.',
      'Built a Django integration automating configuration deployment between internal systems, NetBox, and Cisco Catalyst Center for 200+ devices.',
      'Implemented Zero Touch Provisioning (ZTP) workflows using Python automation, reducing infrastructure deployment time by 80%.',
      'Designed automation scripts tracking inventory and deployment status for 1000+ network devices using internal APIs.',
      'Developed Python-based tooling to validate network configurations and automate error detection across large-scale infrastructure deployments.',
      'Performed procurement analysis for Arista infrastructure identifying $8M+ in cost savings on a $44M project.',
    ],
  },
  {
    role: 'Director of Web Operations',
    company: 'Ontario Tech Engineering Society',
    period: '2023 — 2024',
    location: 'Oshawa, ON',
    bullets: [
      'Led development and deployment of website features supporting engineering student engagement.',
      'Introduced structured development workflows improving feature delivery speed by 40%.',
      'Optimised SEO and technical performance resulting in a 20% increase in organic traffic.',
    ],
  },
];

export const certifications = [
  { name: 'Intro to Machine Learning on AWS', issuer: 'AWS Professional Certificate', year: '2024' },
];

export const projects = [
  {
    id: '001',
    year: '2026',
    title: 'Unified Energy Interface Cloud Platform',
    shortTitle: 'UEI Cloud Platform',
    description: 'Cloud-native telemetry platform for monitoring distributed battery management systems and solar PV infrastructure in real time. Designed a modular FastAPI ingestion service processing IoT telemetry into time-series PostgreSQL datasets, with fault-tolerant containerised workflows deployed to GCP and Grafana dashboards for live monitoring.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Grafana', 'GCP'],
    github: 'https://github.com/Harsh-0214/uei-cloud',
    demo: null,
    highlight: '$8M+ data visibility',
  },
  {
    id: '002',
    year: '2025',
    title: 'Cloud Data Pipeline for IoT Telemetry',
    shortTitle: 'IoT Telemetry Pipeline',
    description: 'Streaming data pipeline that ingests telemetry from distributed IoT devices and transforms it into analytics-ready cloud datasets. Events published to GCP Pub/Sub, processed through Dataflow for transformation, and stored in BigQuery for scalable querying and downstream analytics.',
    stack: ['Python', 'GCP Pub/Sub', 'Dataflow', 'BigQuery'],
    github: 'https://github.com/Harsh-0214/CC-Milestone-4',
    demo: null,
    highlight: 'Real-time streaming',
  },
  {
    id: '003',
    year: '2024',
    title: 'Enterprise Network Automation Suite',
    shortTitle: 'Network Automation',
    description: 'Internal Python + Django tooling built at CBC News to automate network configuration deployment across 200+ Cisco devices, track inventory for 1000+ endpoints via NetBox APIs, and implement ZTP workflows — cutting deployment time by 80% and identifying $8M+ in infrastructure cost savings.',
    stack: ['Python', 'Django', 'NetBox', 'Cisco APIs', 'REST APIs'],
    github: 'https://github.com/Harsh-0214',
    demo: null,
    highlight: '80% faster deploys',
  },
  {
    id: '004',
    year: '2025',
    title: 'Clutch — Life Organisation App',
    shortTitle: 'Clutch Mobile App',
    description: 'Dark-mode React Native app for people who struggle with motivation and consistency. Five integrated modules: a home dashboard with daily streaks and motivational quotes, body tracking (weight, calories, water, workouts), a markdown-lite notes editor with search and pinning, a calendar with local push-notification reminders, and a 30-day habit streak heatmap.',
    stack: ['React Native', 'Expo', 'TypeScript'],
    github: 'https://github.com/Harsh-0214/LockIn',
    demo: null,
    highlight: '5 integrated modules',
  },
  {
    id: '005',
    year: '2025',
    title: 'CodeLocked — Dev Knowledge Base',
    shortTitle: 'CodeLocked',
    description: 'Personal software engineering wiki built with Next.js 15 and Supabase. Lessons are captured automatically from Claude conversations and posted to a REST endpoint. Each entry stores title, difficulty level, category, tags, real-world examples, key takeaways, and conversation context — creating a searchable, living record of engineering knowledge.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/Harsh-0214/CodeLocked',
    demo: null,
    highlight: 'AI-powered knowledge capture',
  },
  {
    id: '006',
    year: '2024',
    title: 'Distributed Air Traffic Controller',
    shortTitle: 'Air Traffic Controller',
    description: 'Distributed systems simulation of an air traffic control environment built as a final-year capstone. Models concurrent aircraft coordination, communication between distributed nodes, and fault-tolerance patterns typical of real-time control systems.',
    stack: ['Java', 'Distributed Systems'],
    github: 'https://github.com/Harsh-0214/Air-Traffic-Controller',
    demo: null,
    highlight: 'Distributed architecture',
  },
  {
    id: '007',
    year: '2024',
    title: 'Airport Database Management System',
    shortTitle: 'Airport DB System',
    description: 'Full-stack airport management system with a normalised relational database backend and a JavaScript/HTML/CSS web frontend. Exposes a REST/JSON API for querying flight, gate, and passenger data, with web pages rendering live SQL views in tabular format — modelled after real airport data portals.',
    stack: ['JavaScript', 'SQL', 'REST APIs', 'HTML', 'CSS'],
    github: 'https://github.com/Harsh-0214/Data-Management-Final-Project',
    demo: null,
    highlight: 'Relational DB + REST API',
  },
  {
    id: '008',
    year: '2024',
    title: 'Ticket Booking Web App',
    shortTitle: 'Ticket Booking App',
    description: 'Spring Boot web application for end-to-end ticket booking, developed as a Software Quality final project with a focus on test-driven development and code quality practices. Includes booking flows, seat selection, and confirmation — served via an embedded Tomcat server.',
    stack: ['Java', 'Spring Boot', 'Maven'],
    github: 'https://github.com/Harsh-0214/TicketBookingApp',
    demo: null,
    highlight: 'Test-driven development',
  },
  {
    id: '009',
    year: '2024',
    title: 'Stock Analyzer',
    shortTitle: 'Stock Analyzer',
    description: 'JavaScript web application for analysing stock performance and market data. Fetches and visualises stock price history, trends, and key metrics to help users make sense of equity data through an interactive browser-based interface.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Harsh-0214/Stock-Analyzer',
    demo: null,
    highlight: 'Market data visualisation',
  },
];
