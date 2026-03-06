export const projectsData = [
  {
    id: 1,
    title: "Knowledge Base",
    description: [
      "Built a full-stack knowledge management web application inspired by Zettelkasten using Next.js, React, Tailwind, Prisma, and PostgreSQL",
      "Implemented CRUD operations for notes with support for multi-tag assignment and bidirectional note linking via self-referencing relations",
      "Designed a relational schema with many-to-many and graph relationships using Prisma join tables",
      "Developed search and tag-based filtering features to efficiently query and organize notes",
      "Built an analytics dashboard with 7-day and 30-day activity insights for note creation and updates",
      "Deployed the production application on Vercel with Neon PostgreSQL, using Docker for consistent local development"
    ],
    tech: ["NextJS", "Tailwind", "JS","Prisma","PostgreSQL","Docker","Vercel"],
    image: "/kb.png",
    github: "https://github.com/Soham13U/KnowledgeBase",
    live: "https://kb-rouge.vercel.app/",
    year: "2026"
  },
  
  {
    id: 2,
    title: "Smart Kitchen Assistant",
    description: [
      "A smart kitchen assistant in Python for individuals with subjective cognitive decline, specifically supporting oatmeal preparation",
      "Combined computer vision and Bluetooth IoT for real-time state visualization and item detection, boosting user interaction by 40%",
      "Implemented an adaptive text-to-speech prompting system that improved voice responsiveness by 30%",
      "Conducted rigorous Bluetooth testing (50+ trials on RSSI, distance, and obstructions) that reduced connection failures by 25%"
    ],
    tech: ["IoT", "HTML", "CSS", "JS", "Python"],
    image: "/img1.png",
    github: "https://github.com/Kai-WashU/CSE521S",
    live: "",
    year: "2023"
  },
 
  {
    id: 3,
    title: "Stock Market Analysis",
    description: [
      "Developed a web application to display stock prices and information for various Indian companies",
      "Utilized Django, Python, HTML, CSS, and JavaScript to create a dynamic user interface",
      "Integrated graph modules for enhanced data visualization and real-time stock tracking"
    ],
    tech: ["HTML", "CSS", "JS", "Python", "Django"],
    image: "/img3.png",
    github: "https://github.com/Soham13U/StockMarket_Analysis",
    live: "",
    year: "2021"
  }
];
