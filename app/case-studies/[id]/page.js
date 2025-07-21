import CaseStudyClient from './CaseStudyClient';

export async function generateStaticParams() {
  return [
    { id: 'helmet-system' },
    { id: 'st-gd-convent' },
    { id: 'monopoly-banking' },
    { id: 'library-management' },
    { id: 'hss-manager' }
  ];
}

// Case studies data
const caseStudiesData = {
  'helmet-system': {
    title: "Intelligent Safety Helmet System",
    category: "IoT/Industrial Safety",
    timeline: "Jan 2024 - Mar 2024",
    readTime: "8 min read",
    skills: ["IoT", "GPS", "Embedded Systems", "Arduino", "C++", "Real-time Monitoring"],
    objective: "To develop a comprehensive safety solution for industrial workers that provides real-time hazard detection, GPS tracking, and emergency communication capabilities.",
    aim: "Create a wearable device that enhances workplace safety by integrating multiple sensors and communication systems to prevent accidents and ensure rapid emergency response.",
    history: "Industrial safety remains a critical concern with thousands of workplace accidents occurring annually. Traditional safety equipment lacks intelligent monitoring capabilities, making it difficult to prevent accidents or respond quickly to emergencies.",
    methodology: [
      {
        title: "Research & Requirements Analysis",
        content: "Conducted extensive research on industrial safety standards, analyzed existing safety equipment limitations, and gathered requirements from safety professionals and workers.",
        duration: "2 weeks"
      },
      {
        title: "Hardware Design & Prototyping",
        content: "Selected appropriate sensors (accelerometer, gyroscope, gas sensors), designed circuit architecture, and created initial prototypes using Arduino platform.",
        duration: "3 weeks"
      },
      {
        title: "Software Development",
        content: "Developed embedded software for sensor data processing, implemented communication protocols, and created alert mechanisms.",
        duration: "4 weeks"
      },
      {
        title: "Testing & Validation",
        content: "Conducted rigorous testing in simulated industrial environments, validated sensor accuracy, and tested emergency response systems.",
        duration: "3 weeks"
      }
    ],
    implementation: {
      architecture: "The system consists of multiple sensors integrated into a standard safety helmet, connected to a central processing unit that monitors environmental conditions and worker movements.",
      technologies: [
        { name: "Arduino Uno", purpose: "Main microcontroller for sensor data processing" },
        { name: "GPS Module", purpose: "Location tracking and emergency positioning" },
        { name: "Accelerometer/Gyroscope", purpose: "Fall detection and movement monitoring" },
        { name: "Gas Sensors", purpose: "Hazardous gas detection" },
        { name: "GSM Module", purpose: "Emergency communication" },
        { name: "C++", purpose: "Embedded programming language" }
      ],
      challenges: [
        {
          challenge: "Power Management",
          solution: "Implemented sleep modes and optimized sensor polling to extend battery life to 8+ hours"
        },
        {
          challenge: "False Positive Alerts",
          solution: "Developed sophisticated algorithms to distinguish between normal movements and actual emergencies"
        },
        {
          challenge: "Environmental Durability",
          solution: "Used industrial-grade components and protective housing to ensure reliability in harsh conditions"
        }
      ]
    },
    results: {
      achievements: [
        "Secured S-Grade in Engineering Clinics",
        "Won 1st Prize at HackAP Transport and Logistics Hackathon",
        "Successfully detected falls with 95% accuracy",
        "Reduced emergency response time by 60%"
      ],
      impact: "The system demonstrated significant potential for improving workplace safety and was recognized by industry professionals for its innovative approach to worker protection.",
      metrics: {
        "Detection Accuracy": "95%",
        "Response Time": "<30 seconds",
        "Battery Life": "8+ hours",
        "Coverage Range": "500m radius"
      }
    },
    conclusion: "The Intelligent Safety Helmet System successfully addresses critical gaps in industrial safety equipment by providing real-time monitoring and emergency response capabilities. The project demonstrated the potential of IoT technology to save lives and improve workplace safety standards.",
    futureWork: [
      "Integration with existing safety management systems",
      "Addition of AI-powered predictive analytics",
      "Development of multi-helmet communication networks",
      "Enhanced sensor suite for chemical detection"
    ],
    images: [
      { src: "/images/helmet-prototype.jpg", alt: "Helmet prototype", caption: "Initial prototype with integrated sensors" },
      { src: "/images/helmet-circuit.jpg", alt: "Circuit design", caption: "Circuit architecture and sensor placement" },
      { src: "/images/helmet-testing.jpg", alt: "Testing phase", caption: "Field testing in industrial environment" }
    ]
  },
  'st-gd-convent': {
    title: "St. G. D. Convent School Platform",
    category: "Full-stack Development",
    timeline: "2024",
    readTime: "12 min read",
    skills: ["Next.js", "Supabase", "React", "PostgreSQL", "TailwindCSS", "Education Technology"],
    objective: "To develop a comprehensive digital platform for St. G. D. Convent School that streamlines administrative processes, enhances communication, and provides modern educational tools.",
    aim: "Create a scalable, user-friendly platform that serves students, teachers, and administrators while improving operational efficiency and educational outcomes.",
    history: "St. G. D. Convent School in Agra, UP required a modern digital solution to replace their manual administrative processes and improve communication between stakeholders.",
    methodology: [
      {
        title: "Stakeholder Analysis & Requirements Gathering",
        content: "Conducted interviews with administrators, teachers, students, and parents to understand current pain points and define system requirements.",
        duration: "2 weeks"
      },
      {
        title: "System Architecture Design",
        content: "Designed scalable architecture using modern web technologies, planned database schema, and created user experience wireframes.",
        duration: "1 week"
      },
      {
        title: "Development & Implementation",
        content: "Built the platform using Next.js and Supabase, implemented user authentication, created administrative dashboards, and developed communication features.",
        duration: "8 weeks"
      },
      {
        title: "Testing & Deployment",
        content: "Conducted comprehensive testing, user acceptance testing with school staff, and deployed to production environment.",
        duration: "2 weeks"
      }
    ],
    implementation: {
      architecture: "Built as a modern web application using Next.js for the frontend and Supabase for backend services, providing real-time data synchronization and secure user management.",
      technologies: [
        { name: "Next.js", purpose: "React framework for frontend and API routes" },
        { name: "Supabase", purpose: "Backend-as-a-Service for database and authentication" },
        { name: "PostgreSQL", purpose: "Relational database for data storage" },
        { name: "TailwindCSS", purpose: "Utility-first CSS framework for styling" },
        { name: "Vercel", purpose: "Deployment and hosting platform" },
        { name: "TypeScript", purpose: "Type-safe JavaScript development" }
      ],
      features: [
        {
          feature: "Student Management System",
          description: "Complete student profiles with academic records, attendance tracking, and performance analytics"
        },
        {
          feature: "Teacher Dashboard",
          description: "Grade management, assignment distribution, and class scheduling tools"
        },
        {
          feature: "Parent Portal",
          description: "Real-time access to student progress, school announcements, and communication tools"
        },
        {
          feature: "Administrative Tools",
          description: "Staff management, financial tracking, and institutional reporting capabilities"
        }
      ],
      challenges: [
        {
          challenge: "Data Migration",
          solution: "Developed custom scripts to migrate existing data from spreadsheets and manual records to the new system"
        },
        {
          challenge: "User Training",
          solution: "Created comprehensive training materials and conducted workshops for all user groups"
        },
        {
          challenge: "Performance Optimization",
          solution: "Implemented lazy loading, data caching, and optimized database queries for smooth user experience"
        }
      ]
    },
    results: {
      achievements: [
        "Successfully deployed and certified platform",
        "Reduced administrative workload by 70%",
        "Improved parent-school communication by 80%",
        "Achieved 99.9% uptime since deployment"
      ],
      impact: "The platform transformed the school's operations, making administrative tasks more efficient and improving communication between all stakeholders.",
      metrics: {
        "User Adoption": "100%",
        "Time Saved": "70%",
        "Communication Improvement": "80%",
        "System Uptime": "99.9%"
      }
    },
    conclusion: "The St. G. D. Convent School Platform successfully modernized the institution's operations, providing a scalable foundation for future growth and enhanced educational delivery.",
    futureWork: [
      "Mobile application development",
      "Integration with online learning platforms",
      "Advanced analytics and reporting",
      "AI-powered student performance insights"
    ],
    images: [
      { src: "/images/school-dashboard.jpg", alt: "Dashboard interface", caption: "Main administrative dashboard" },
      { src: "/images/school-mobile.jpg", alt: "Mobile interface", caption: "Responsive design for mobile devices" },
      { src: "/images/school-analytics.jpg", alt: "Analytics view", caption: "Student performance analytics" }
    ]
  },
  'monopoly-banking': {
    title: "Digital Banking Simulation System",
    category: "Financial Technology",
    timeline: "Sep 2023 - Oct 2023",
    readTime: "6 min read",
    skills: ["JavaScript", "HTML5", "CSS3", "Firebase", "UI/UX Design", "Real-time Systems"],
    objective: "To create an engaging digital banking simulation inspired by Monopoly's Ultimate Banking system that provides realistic transaction experiences.",
    aim: "Develop a user-friendly simulation that teaches financial literacy while providing entertainment through gamified banking interactions.",
    history: "Traditional board games like Monopoly often suffer from manual cash handling and transaction errors. Digital solutions can enhance gameplay while teaching valuable financial concepts.",
    methodology: [
      {
        title: "Game Mechanics Analysis",
        content: "Studied Monopoly Ultimate Banking rules, analyzed user interactions, and identified digital enhancement opportunities.",
        duration: "1 week"
      },
      {
        title: "UI/UX Design",
        content: "Created intuitive interface designs focused on ease of use and visual appeal, ensuring seamless transaction flows.",
        duration: "1 week"
      },
      {
        title: "Frontend Development",
        content: "Built responsive web application using vanilla JavaScript, HTML5, and CSS3 with real-time updates.",
        duration: "4 weeks"
      },
      {
        title: "Backend Integration",
        content: "Integrated Firebase for real-time data synchronization and implemented transaction logging.",
        duration: "2 weeks"
      }
    ],
    implementation: {
      architecture: "Client-side application with Firebase backend providing real-time synchronization across multiple devices and players.",
      technologies: [
        { name: "HTML5", purpose: "Structure and semantic markup" },
        { name: "CSS3", purpose: "Styling and animations" },
        { name: "JavaScript", purpose: "Core application logic and interactions" },
        { name: "Firebase", purpose: "Real-time database and hosting" },
        { name: "jQuery", purpose: "DOM manipulation and event handling" }
      ],
      challenges: [
        {
          challenge: "Real-time Synchronization",
          solution: "Implemented Firebase real-time database to ensure all players see updates immediately"
        },
        {
          challenge: "Transaction Validation",
          solution: "Created client-side validation with server-side verification to prevent cheating"
        },
        {
          challenge: "User Experience",
          solution: "Designed intuitive interface with clear visual feedback for all actions"
        }
      ]
    },
    results: {
      achievements: [
        "Successfully deployed live application",
        "Achieved smooth real-time gameplay",
        "Positive user feedback on interface design",
        "Zero transaction errors in testing"
      ],
      impact: "The simulation successfully digitized the Monopoly banking experience, making gameplay smoother and more engaging for players.",
      metrics: {
        "Transaction Speed": "<1 second",
        "User Satisfaction": "9/10",
        "Error Rate": "0%",
        "Load Time": "<2 seconds"
      }
    },
    conclusion: "The Digital Banking Simulation System successfully bridges traditional board gaming with modern technology, creating an engaging and educational experience.",
    futureWork: [
      "Mobile app development",
      "Multiplayer tournament features",
      "Advanced financial scenarios",
      "Educational content integration"
    ],
    images: [
      { src: "/images/banking-interface.jpg", alt: "Banking interface", caption: "Main banking simulation interface" },
      { src: "/images/banking-transactions.jpg", alt: "Transaction view", caption: "Real-time transaction processing" },
      { src: "/images/banking-mobile.jpg", alt: "Mobile view", caption: "Responsive mobile interface" }
    ]
  },
  'library-management': {
    title: "Library Management System",
    category: "Educational Software",
    timeline: "2023",
    readTime: "10 min read",
    skills: ["Python", "Tkinter", "SQLite", "GUI Design", "Database Management", "Software Architecture"],
    objective: "To develop a comprehensive Library Management System that automates library operations and improves efficiency for both librarians and patrons.",
    aim: "Create a user-friendly desktop application that handles all primary library functions including book management, member tracking, and automated fine calculations.",
    history: "Built as the final project for Harvard's CS50P course, addressing the need for efficient library management in educational institutions where manual processes often lead to errors and inefficiencies.",
    methodology: [
      {
        title: "Requirements Analysis",
        content: "Analyzed library management workflows, identified key functionalities, and defined user requirements for both librarians and system administrators.",
        duration: "1 week"
      },
      {
        title: "Database Design",
        content: "Designed normalized database schema for books, members, transactions, and fines using SQLite for local data storage.",
        duration: "1 week"
      },
      {
        title: "GUI Development",
        content: "Created intuitive desktop interface using Tkinter with separate modules for different library operations.",
        duration: "6 weeks"
      },
      {
        title: "Testing & Documentation",
        content: "Conducted comprehensive testing, created user manuals, and prepared project documentation for CS50P submission.",
        duration: "2 weeks"
      }
    ],
    implementation: {
      architecture: "Desktop application built with Python and Tkinter GUI framework, using SQLite for local database storage and file-based configuration management.",
      technologies: [
        { name: "Python", purpose: "Core programming language for application logic" },
        { name: "Tkinter", purpose: "GUI framework for desktop interface" },
        { name: "SQLite", purpose: "Embedded database for data storage" },
        { name: "CustomTkinter", purpose: "Enhanced UI components and styling" },
        { name: "Pillow", purpose: "Image processing for book covers" }
      ],
      features: [
        {
          feature: "Book Management",
          description: "Add, edit, delete, and search books with ISBN validation and category organization"
        },
        {
          feature: "Member Management",
          description: "Member registration, profile management, and borrowing history tracking"
        },
        {
          feature: "Circulation System",
          description: "Book checkout, return processing, and renewal management"
        },
        {
          feature: "Fine Calculator",
          description: "Automated fine calculation for overdue books with configurable rates"
        },
        {
          feature: "Reporting System",
          description: "Generate reports for inventory, member activity, and financial summaries"
        }
      ],
      challenges: [
        {
          challenge: "Data Validation",
          solution: "Implemented comprehensive input validation with custom error handling and user feedback"
        },
        {
          challenge: "Database Integrity",
          solution: "Used foreign key constraints and transaction management to ensure data consistency"
        },
        {
          challenge: "User Experience",
          solution: "Created intuitive workflows with clear navigation and informative status messages"
        }
      ]
    },
    results: {
      achievements: [
        "Perfect score in CS50P final project evaluation",
        "Comprehensive library operation automation",
        "Robust error handling and data validation",
        "Professional-quality documentation"
      ],
      impact: "The system demonstrated practical application of programming concepts learned in CS50P while solving real-world library management challenges.",
      metrics: {
        "Code Quality": "A+",
        "Feature Completeness": "100%",
        "Test Coverage": "95%",
        "Documentation Score": "Perfect"
      }
    },
    conclusion: "The Library Management System successfully showcased advanced Python programming skills while delivering a practical solution for library automation and management.",
    futureWork: [
      "Web-based interface development",
      "Barcode scanning integration",
      "Cloud database migration",
      "Mobile app companion"
    ],
    images: [
      { src: "/images/library-main.jpg", alt: "Main interface", caption: "Main library management dashboard" },
      { src: "/images/library-books.jpg", alt: "Book management", caption: "Book inventory management interface" },
      { src: "/images/library-reports.jpg", alt: "Reports", caption: "Automated reporting system" }
    ]
  },
  'hss-manager': {
    title: "HSSManager",
    category: "Education Management",
    timeline: "2023",
    readTime: "14 min read",
    skills: ["Django", "React", "PostgreSQL", "Docker", "TailwindCSS", "Web Development"],
    objective: "To modernize legacy school management software used across Kerala, India, creating a more efficient and user-friendly platform for educational institutions.",
    aim: "Develop a comprehensive web-based solution that replaces outdated desktop software with modern technologies and improved user experience.",
    history: "Built as the final project for Harvard's CS50W course, addressing the widespread use of outdated school management systems in Kerala's educational institutions that lack modern features and accessibility.",
    methodology: [
      {
        title: "Legacy System Analysis",
        content: "Studied existing software used in Kerala schools, identified limitations, and gathered requirements from educators and administrators.",
        duration: "2 weeks"
      },
      {
        title: "Technology Stack Selection",
        content: "Chose Django for robust backend development and React for modern frontend experience, with PostgreSQL for reliable data management.",
        duration: "1 week"
      },
      {
        title: "Full-Stack Development",
        content: "Built comprehensive web application with separate frontend and backend, implementing all major school management features.",
        duration: "10 weeks"
      },
      {
        title: "Pilot Deployment",
        content: "Deployed to three pilot schools for real-world testing and feedback collection.",
        duration: "3 weeks"
      }
    ],
    implementation: {
      architecture: "Modern web application with Django REST API backend and React frontend, containerized with Docker for easy deployment and scaling.",
      technologies: [
        { name: "Django", purpose: "Backend framework with ORM and admin interface" },
        { name: "React", purpose: "Frontend framework for interactive user interface" },
        { name: "PostgreSQL", purpose: "Relational database for complex data relationships" },
        { name: "TailwindCSS", purpose: "Utility-first CSS framework for responsive design" },
        { name: "Docker", purpose: "Containerization for deployment and development" },
        { name: "Nginx", purpose: "Web server and reverse proxy configuration" }
      ],
      features: [
        {
          feature: "Student Information System",
          description: "Comprehensive student profiles with academic records, attendance, and performance tracking"
        },
        {
          feature: "Staff Management",
          description: "Teacher profiles, subject assignments, and performance evaluation systems"
        },
        {
          feature: "Academic Management",
          description: "Course creation, timetable management, and examination scheduling"
        },
        {
          feature: "Communication Hub",
          description: "Messaging system for teachers, students, and parents with announcement broadcasting"
        },
        {
          feature: "Financial Management",
          description: "Fee collection, expense tracking, and financial reporting capabilities"
        }
      ],
      challenges: [
        {
          challenge: "Data Migration",
          solution: "Created automated migration tools to transfer data from legacy systems to new platform"
        },
        {
          challenge: "User Adoption",
          solution: "Designed familiar interface elements and provided comprehensive training materials"
        },
        {
          challenge: "Performance Optimization",
          solution: "Implemented caching strategies and database optimization for large datasets"
        },
        {
          challenge: "Multi-school Architecture",
          solution: "Built tenant-based system allowing multiple schools to use the same installation"
        }
      ]
    },
    results: {
      achievements: [
        "Successfully deployed in 3 pilot schools",
        "95% user satisfaction rate from pilot testing",
        "50% reduction in administrative processing time",
        "Improved data accuracy and accessibility"
      ],
      impact: "The platform demonstrated significant potential for modernizing educational administration across Kerala, with positive feedback from all stakeholder groups.",
      metrics: {
        "User Adoption": "95%",
        "Performance Improvement": "50%",
        "Data Accuracy": "99%",
        "System Uptime": "99.5%"
      }
    },
    conclusion: "HSSManager successfully modernized school management for Kerala's educational institutions, providing a scalable foundation for future educational technology initiatives.",
    futureWork: [
      "State-wide deployment strategy",
      "Mobile application development",
      "AI-powered analytics integration",
      "Integration with government education portals"
    ],
    images: [
      { src: "/images/hss-dashboard.jpg", alt: "HSS Dashboard", caption: "Main administrative dashboard interface" },
      { src: "/images/hss-student.jpg", alt: "Student management", caption: "Student information management system" },
      { src: "/images/hss-mobile.jpg", alt: "Mobile interface", caption: "Responsive mobile interface design" }
    ]
  }
};

export default function CaseStudyDetail({ params }) {
  const { id } = params;
  
  return <CaseStudyClient id={id} />;
}
