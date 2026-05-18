export type SocialLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  href?: string;
  repo?: string;
  image?: string;
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  summary: string;
  highlights?: string[];
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
};

export const siteConfig = {
  name: "Kirubel Eshetu",
  role: "Computer Programmer",
  location: "Addis Ababa, Ethiopia",
  email: "kirubelwinner@gmail.com",
  avatar: "/anime-hacker.jpg",
  description:
    "👨🏾‍💻 Aspiring programmer, currently working as a Database Engineer. \n 🖥️ Trying to learn, build and grow by solving micro problems in daily routine through coding.",
  keywords: [
    "Computer Programmer",
    "Web Developer",
    "Frontend",
    "Backend",
    "Node.js",
    "Express",
    "React",
    "Next.js",
  ],

  socials: <SocialLink[]>[
    { label: "Email", href: "mailto: kirubelwinner@gmail.com" },
    { label: "GitHub", href: "https://github.com/KryptonScript" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kirubel-eshetu" },
    { label: "Telegram", href: "https://t.me/KrytonScript" },
    { label: "X/Twitter", href: "https://x.com/@KryptonScript" },
    { label: "Youtube", href: "https://www.youtube.com/@KryptonScript" },
  ],

  skills: [
    "HTML",
    "CSS",
    "MySQL",
    "JavaScript",
    "PHP",
    "Node.js",
    "Express.js",
    "EJS",
    "Git",
    "React",
    "MongoDB",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
  ],

  projects: <Project[]>[
    {
      title: "JZPIS",
      description:
        "Developed for final year project defense, Jimma Zone Prisoner Information System (JZPIS) securely stores prisoner information through a database system.",
      technologies: [
        "HTML",
        "CSS",
        "Bootstrap",
        "JS",
        "PHP",
        "MySQL",
        "Python",
      ],
      href: "https://jzpis.netlify.app/",
      repo: "https://github.com/KryptonScript/JZPIS",
    },
    {
      title: "CV Kirubel",
      description:
        "Made my CV as a webpage and made it accessible on the internet for recruiters. This was my first website deployment experience.",
      technologies: ["HTML", "CSS", "React"],
      href: "https://cv-kirubel-eshetu.vercel.app/", 
      repo: "https://github.com/KryptonScript/CV-Kirubel-Eshetu",
    },
    {
      title: "Mihiret Bonda",
      description: 
      "Website made for Mihiret Bonda retail shop using React.",
      technologies: ["HTML", "CSS", "JS", "React"],
      href: "https://mihiret-bonda.vercel.app/",
      repo: "https://github.com/KryptonScript/Mihiret-Bonda", 
    },
    {
      title: "Classic Stopwatch",
      description:
        "A stopwatch web application made with HTML, CSS and JavaScript. It helps track time in HH:MM:SS:CC format implying Hours:Minutes:Second:Centiseconds. You can also take laps",
      technologies: ["HTML", "CSS", "JS"],
      href: "https://classic-stopwatch.netlify.app/",
      repo: "https://github.com/KryptonScript/prodigy-internship/tree/main/web-dev-internship/task-2-stopwatch-web-application",
    },
    {
      title: "Weather App",
      description:
        "This weather app informs the weather condition of a city you want or based on your current location.",
      technologies: ["HTML", "CSS", "JS"],
      href: "https://weathercheckkr.netlify.app/",
      repo: "https://github.com/KryptonScript/prodigy-internship/tree/main/web-dev-internship/task-5-weather-app",
    },
    {
      title: "QuoLand",
      description: "Land of Bible Verses and Inspirational Quotes",
      technologies: ["HTML", "CSS", "JS", "JSON"],
      href: "https://quoland.netlify.app/",
      repo: "https://github.com/KryptonScript/QuoLand",
    },
  ],

  experience: <Experience[]>[
    {
      company: "CBE",
      role: "Database Engineer",
      start: "Jan 2026",
      end: "Present",
      summary: "Working as Database engineer on CBE's different databases.",
      highlights: ["MSSQL Monitoring.", "Oracle RDBMS and grid installation."],
    },
    {
      company: "INSA",
      role: "Software Developer",
      start: "Mar 2025",
      end: "Mar 2026",
      summary:
        "Worked on bill aggregation platforms for understanding the Derash Bill Aggregator System.",
      highlights: [
        "Code update from legacy Angular 5 to Angular 18.",
        "Project on Derash biller and agent systems.",
      ],
    },
    {
      company: "iSON Xperiences",
      role: "Customer Service Representative",
      start: "Aug 2024",
      end: "Dec 2024",
      summary:
        "Provided technical support and assistanct for Safaricom Ethiopia customers",
      highlights: [
        "Addressed customers inquiries related to network usage and M-Pesa.",
        "Provided information on new Safaricom services.",
      ],
    },
    {
      company: "Addis Media Network",
      role: "IT technician and Network Administrator Intern",
      start: "Jul 2023",
      end: "Aug 2023",
      summary:
        "Worked on maintenance of major Hardware parts and introduced myself to major networking apparatus.",
      highlights: [
        "Network installation project",
        "Hardware maintenance and troubleshooting",
      ],
    },
  ],

  education: <Education[]>[
    {
      school: "Jimma University Institute of Technology",
      degree: "BSc. in Computer Science",
      start: "2021",
      end: "2024",
    },
    {
      school: "Cisterican Monastery Mariam Tsion",
      degree: "Highschool completion",
      start: "2016",
      end: "2020",
    },
    {
      school: "Cisterican Monastery Mariam Tsion",
      degree: "Elementary Education",
      start: "2013",
      end: "2016",
    },
    {
      school: "Alemaya Primary School",
      degree: "5th Grade",
      start: "2012",
      end: "2013",
    },
    {
      school: "Eyosias Primary School",
      degree: "Kg - 4th Grade",
      start: "2004",
      end: "2012",
    },
  ],
  baseUrl: "https://kirubel-eshetu-portfolio.vercel.app/",
} as const;

export type SiteConfig = typeof siteConfig;
