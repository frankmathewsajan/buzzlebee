'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from '../../components/PortfolioMap';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

// Case study data
const caseStudiesData = {
  'gd-convent-school': {
    title: 'GD Convent School Management System',
    category: 'Education Technology',
    timeline: '6 months',
    readTime: '12 min read',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Authentication', 'Database Design'],
    objective: 'Create a comprehensive school management system for St. G. D. Convent School to streamline administrative tasks and improve communication.',
    aim: 'Digitize school operations including student records, fee management, attendance tracking, and parent-teacher communication.',
    history: 'St. G. D. Convent School was managing all operations manually, leading to inefficiencies and communication gaps between teachers, parents, and administration.',
    methodology: [
      {
        title: 'Research & Analysis',
        duration: '2 weeks',
        content: 'Conducted interviews with teachers, administrators, and parents to understand pain points and requirements. Analyzed existing workflows and identified areas for improvement.'
      },
      {
        title: 'System Design',
        duration: '3 weeks',
        content: 'Created comprehensive system architecture, database design, and user interface mockups. Defined user roles and permissions structure.'
      },
      {
        title: 'Development Phase',
        duration: '16 weeks',
        content: 'Built the complete system using React for frontend and Node.js/Express for backend. Implemented MongoDB for data storage and JWT for authentication.'
      },
      {
        title: 'Testing & Deployment',
        duration: '3 weeks',
        content: 'Conducted thorough testing with real users, gathered feedback, and made necessary adjustments. Deployed on cloud infrastructure with proper security measures.'
      }
    ],
    implementation: {
      architecture: 'Built using a modern MERN stack architecture with React frontend, Node.js/Express backend, and MongoDB database. Implemented JWT-based authentication and role-based access control.',
      technologies: [
        { name: 'React.js', purpose: 'Interactive user interface with component-based architecture' },
        { name: 'Node.js & Express', purpose: 'Backend API server for handling requests and business logic' },
        { name: 'MongoDB', purpose: 'NoSQL database for flexible data storage and retrieval' },
        { name: 'JWT Authentication', purpose: 'Secure user authentication and session management' },
        { name: 'Chart.js', purpose: 'Data visualization for analytics and reports' },
        { name: 'Socket.io', purpose: 'Real-time notifications and communication features' }
      ],
      features: [
        { feature: 'Student Management', description: 'Complete student profiles with academic records, attendance, and performance tracking' },
        { feature: 'Fee Management', description: 'Automated fee calculation, payment tracking, and receipt generation' },
        { feature: 'Teacher Portal', description: 'Grade entry, attendance marking, and parent communication tools' },
        { feature: 'Parent Dashboard', description: 'Real-time access to child\'s progress, fees, and school communications' },
        { feature: 'Administrative Tools', description: 'User management, report generation, and system configuration' },
        { feature: 'Mobile Responsive', description: 'Fully responsive design for access on all devices' }
      ],
      challenges: [
        {
          challenge: 'Data Migration from Legacy Systems',
          solution: 'Created custom scripts to migrate existing paper-based records to digital format, ensuring data integrity and validation.'
        },
        {
          challenge: 'User Adoption and Training',
          solution: 'Developed comprehensive training materials and conducted hands-on sessions for teachers and administrators.'
        },
        {
          challenge: 'Performance with Large Data Sets',
          solution: 'Implemented database indexing, pagination, and caching strategies to maintain fast response times.'
        }
      ]
    },
    results: {
      metrics: {
        'Users': '500+',
        'Time Saved': '80%',
        'Error Reduction': '95%',
        'Satisfaction': '4.8/5'
      },
      achievements: [
        'Reduced administrative workload by 80%',
        'Improved parent-teacher communication efficiency',
        'Eliminated manual record-keeping errors',
        'Increased fee collection rates by 30%',
        'Enhanced data security and backup systems',
        'Provided real-time analytics and insights'
      ],
      impact: 'The system transformed St. G. D. Convent School\'s operations, eliminating paper-based processes and providing real-time insights into student performance and school operations. Teachers can now focus more on education rather than administrative tasks, while parents have unprecedented visibility into their children\'s academic progress.'
    },
    conclusion: 'The GD Convent School Management System successfully modernized the school\'s operations and created a more efficient, transparent, and user-friendly environment for all stakeholders. The project demonstrated the power of technology in education and set a foundation for future digital initiatives.',
    futureWork: [
      'Integration with online learning platforms',
      'AI-powered performance analytics',
      'Mobile app development',
      'Advanced reporting features'
    ]
  },
  'portfolio-website': {
    title: 'Modern Portfolio Website',
    category: 'Web Development',
    timeline: '3 months',
    readTime: '8 min read',
    skills: ['Next.js', 'React', 'Framer Motion', 'Responsive Design', 'Performance Optimization'],
    objective: 'Create a modern, responsive portfolio website that showcases projects and skills effectively.',
    aim: 'Build a fast, accessible, and visually appealing portfolio that stands out to potential employers and clients.',
    history: 'Needed a professional online presence to showcase development skills and project portfolio to potential collaborators and employers.',
    methodology: [
      {
        title: 'Design & Planning',
        duration: '2 weeks',
        content: 'Researched modern design trends, created wireframes, and planned the overall user experience and navigation flow.'
      },
      {
        title: 'Development',
        duration: '8 weeks',
        content: 'Built the website using Next.js with focus on performance, SEO, and smooth animations using Framer Motion.'
      },
      {
        title: 'Optimization',
        duration: '2 weeks',
        content: 'Optimized for speed, accessibility, and search engines. Implemented lazy loading and code splitting.'
      }
    ],
    implementation: {
      architecture: 'Built with Next.js for optimal performance and SEO, using static generation where possible. Implemented smooth animations with Framer Motion and ensured full responsiveness.',
      technologies: [
        { name: 'Next.js', purpose: 'React framework with SSG/SSR capabilities for optimal performance' },
        { name: 'Framer Motion', purpose: 'Smooth animations and interactive elements' },
        { name: 'Tailwind CSS', purpose: 'Utility-first CSS framework for rapid styling' },
        { name: 'Vercel', purpose: 'Deployment platform with global CDN' }
      ],
      challenges: [
        {
          challenge: 'Performance Optimization',
          solution: 'Implemented image optimization, lazy loading, and code splitting to achieve 95+ PageSpeed scores.'
        },
        {
          challenge: 'Cross-browser Compatibility',
          solution: 'Extensive testing across different browsers and devices, with progressive enhancement approach.'
        }
      ]
    },
    results: {
      metrics: {
        'PageSpeed': '95+',
        'Load Time': '<2s',
        'Accessibility': '100%',
        'SEO Score': '100%'
      },
      achievements: [
        'Achieved 95+ PageSpeed score',
        'Fully accessible (WCAG 2.1 AA)',
        'Mobile-first responsive design',
        'SEO optimized for better visibility'
      ],
      impact: 'The portfolio website successfully showcases technical skills and projects, leading to increased professional opportunities and positive feedback from peers and potential employers.'
    },
    conclusion: 'The portfolio website demonstrates modern web development practices and serves as both a showcase of skills and a testament to attention to detail and performance optimization.',
    futureWork: [
      'Blog integration for sharing knowledge',
      'Interactive project demos',
      'Multi-language support',
      'Enhanced analytics integration'
    ]
  },
  'ai-trading-bot': {
    title: 'AI-Powered Trading Bot',
    category: 'Machine Learning',
    timeline: '4 months',
    readTime: '15 min read',
    skills: ['Python', 'TensorFlow', 'Pandas', 'API Integration', 'Algorithm Design', 'Data Analysis'],
    objective: 'Develop an intelligent trading bot that uses machine learning to make informed trading decisions.',
    aim: 'Create an automated system that analyzes market data and executes trades based on learned patterns and risk management.',
    history: 'Interest in combining machine learning with financial markets led to exploring algorithmic trading as a way to apply AI in a practical, measurable context.',
    methodology: [
      {
        title: 'Market Research',
        duration: '3 weeks',
        content: 'Studied financial markets, trading strategies, and existing algorithmic trading approaches. Analyzed market data patterns and volatility.'
      },
      {
        title: 'Algorithm Development',
        duration: '8 weeks',
        content: 'Developed machine learning models using historical data, implemented risk management strategies, and created the trading logic.'
      },
      {
        title: 'Backtesting',
        duration: '4 weeks',
        content: 'Extensive backtesting with historical data to validate strategies and optimize parameters for better performance.'
      },
      {
        title: 'Live Testing',
        duration: '1 week',
        content: 'Conducted paper trading to test the system in real market conditions before any actual deployment.'
      }
    ],
    implementation: {
      architecture: 'Python-based system using TensorFlow for machine learning models, pandas for data manipulation, and RESTful APIs for market data integration.',
      technologies: [
        { name: 'Python', purpose: 'Core programming language for algorithm development' },
        { name: 'TensorFlow', purpose: 'Machine learning framework for building predictive models' },
        { name: 'Pandas & NumPy', purpose: 'Data manipulation and numerical computations' },
        { name: 'Alpha Vantage API', purpose: 'Real-time and historical market data' },
        { name: 'PostgreSQL', purpose: 'Storage for historical data and trading records' },
        { name: 'Docker', purpose: 'Containerization for consistent deployment' }
      ],
      features: [
        { feature: 'Predictive Models', description: 'LSTM neural networks for price prediction based on technical indicators' },
        { feature: 'Risk Management', description: 'Stop-loss, take-profit, and position sizing based on volatility' },
        { feature: 'Real-time Analysis', description: 'Continuous market monitoring and opportunity identification' },
        { feature: 'Performance Tracking', description: 'Detailed analytics and performance metrics dashboard' }
      ],
      challenges: [
        {
          challenge: 'Market Volatility Handling',
          solution: 'Implemented dynamic risk management that adjusts position sizes based on current market volatility measures.'
        },
        {
          challenge: 'Data Quality and Latency',
          solution: 'Built robust data validation and implemented multiple data sources for redundancy and accuracy.'
        },
        {
          challenge: 'Overfitting Prevention',
          solution: 'Used cross-validation, regularization techniques, and walk-forward analysis to ensure model generalization.'
        }
      ]
    },
    results: {
      metrics: {
        'Win Rate': '68%',
        'Sharpe Ratio': '1.42',
        'Max Drawdown': '-8.5%',
        'Annual Return': '23%'
      },
      achievements: [
        'Achieved consistent positive returns in backtesting',
        'Implemented robust risk management system',
        'Successfully integrated multiple data sources',
        'Created comprehensive performance analytics'
      ],
      impact: 'The trading bot demonstrated the practical application of machine learning in financial markets and provided valuable insights into algorithmic trading strategies and risk management.'
    },
    conclusion: 'The AI trading bot project successfully combined machine learning with financial analysis to create an intelligent trading system. While primarily educational, it demonstrated the potential of AI in financial applications.',
    futureWork: [
      'Integration with cryptocurrency markets',
      'Advanced sentiment analysis from news',
      'Portfolio optimization algorithms',
      'Real-time dashboard improvements'
    ]
  },
  'task-management-app': {
    title: 'Collaborative Task Management',
    category: 'Productivity Software',
    timeline: '5 months',
    readTime: '10 min read',
    skills: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Real-time Features', 'Team Collaboration'],
    objective: 'Build a comprehensive task management application for teams with real-time collaboration features.',
    aim: 'Create an intuitive platform that enables teams to organize, track, and collaborate on projects efficiently.',
    history: 'Observed inefficiencies in existing project management tools and wanted to create a more streamlined solution focused on simplicity and real-time collaboration.',
    methodology: [
      {
        title: 'User Research',
        duration: '2 weeks',
        content: 'Conducted surveys and interviews with team leads and project managers to understand pain points in existing solutions.'
      },
      {
        title: 'Design & Prototyping',
        duration: '3 weeks',
        content: 'Created user personas, wireframes, and interactive prototypes focusing on user experience and workflow optimization.'
      },
      {
        title: 'Development',
        duration: '14 weeks',
        content: 'Built the full-stack application with emphasis on real-time features, intuitive UI, and robust backend architecture.'
      },
      {
        title: 'Testing & Refinement',
        duration: '3 weeks',
        content: 'Conducted user testing sessions, gathered feedback, and iteratively improved the application based on real usage patterns.'
      }
    ],
    implementation: {
      architecture: 'Full-stack application using React for the frontend, Node.js/Express for the backend, and MongoDB for data persistence. Socket.io enables real-time collaboration features.',
      technologies: [
        { name: 'React.js', purpose: 'Dynamic frontend with component-based architecture' },
        { name: 'Node.js & Express', purpose: 'RESTful API server for handling business logic' },
        { name: 'Socket.io', purpose: 'Real-time bidirectional communication for live updates' },
        { name: 'MongoDB', purpose: 'Flexible document database for storing project data' },
        { name: 'JWT', purpose: 'Secure authentication and authorization' },
        { name: 'Redis', purpose: 'Session management and caching for improved performance' }
      ],
      features: [
        { feature: 'Real-time Updates', description: 'Live synchronization of tasks, comments, and project changes across all team members' },
        { feature: 'Kanban Boards', description: 'Visual project management with drag-and-drop task organization' },
        { feature: 'Team Collaboration', description: 'Comments, mentions, and file sharing on tasks and projects' },
        { feature: 'Time Tracking', description: 'Built-in time tracking with reporting and analytics' },
        { feature: 'Custom Workflows', description: 'Configurable task statuses and project templates' },
        { feature: 'Notifications', description: 'Smart notifications for task assignments, deadlines, and updates' }
      ],
      challenges: [
        {
          challenge: 'Real-time Synchronization',
          solution: 'Implemented efficient event-driven architecture with Socket.io to handle concurrent users and maintain data consistency.'
        },
        {
          challenge: 'Scalability Concerns',
          solution: 'Used horizontal scaling strategies, database indexing, and connection pooling to handle growing user base.'
        },
        {
          challenge: 'Complex State Management',
          solution: 'Adopted Redux for predictable state management and implemented optimistic updates for better user experience.'
        }
      ]
    },
    results: {
      metrics: {
        'Active Users': '200+',
        'Task Completion': '+40%',
        'Team Efficiency': '+60%',
        'User Rating': '4.7/5'
      },
      achievements: [
        'Improved team productivity by 60%',
        'Reduced project planning time by 50%',
        'Achieved sub-second real-time updates',
        'Successfully onboarded 200+ active users'
      ],
      impact: 'The task management application significantly improved team collaboration and project visibility, leading to faster project completion and better resource allocation across organizations.'
    },
    conclusion: 'The collaborative task management app successfully addressed key pain points in team project management and demonstrated the value of real-time collaboration features in productivity software.',
    futureWork: [
      'Advanced analytics and reporting',
      'Mobile application development',
      'Integration with popular development tools',
      'AI-powered task prioritization'
    ]
  },
  'e-commerce-platform': {
    title: 'Modern E-commerce Platform',
    category: 'E-commerce',
    timeline: '6 months',
    readTime: '12 min read',
    skills: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'Microservices', 'Payment Integration'],
    objective: 'Develop a scalable e-commerce platform with modern features and seamless user experience.',
    aim: 'Create a complete online shopping solution with advanced features like real-time inventory, payment processing, and order management.',
    history: 'Local businesses needed a robust e-commerce solution that could compete with major platforms while offering customization and lower fees.',
    methodology: [
      {
        title: 'Market Analysis',
        duration: '2 weeks',
        content: 'Analyzed competitor platforms, studied user behavior patterns, and identified unique value propositions for local businesses.'
      },
      {
        title: 'Architecture Design',
        duration: '3 weeks',
        content: 'Designed scalable microservices architecture with focus on performance, security, and maintainability.'
      },
      {
        title: 'Core Development',
        duration: '18 weeks',
        content: 'Built the complete platform including user management, product catalog, cart system, payment processing, and admin dashboard.'
      },
      {
        title: 'Integration & Testing',
        duration: '3 weeks',
        content: 'Integrated payment gateways, implemented security measures, and conducted comprehensive testing across all features.'
      }
    ],
    implementation: {
      architecture: 'Microservices architecture using Next.js for the frontend, Node.js services for different business domains, PostgreSQL for transactional data, and Redis for caching and sessions.',
      technologies: [
        { name: 'Next.js', purpose: 'Server-side rendered React application for optimal SEO and performance' },
        { name: 'PostgreSQL', purpose: 'Reliable relational database for transactional data' },
        { name: 'Stripe API', purpose: 'Secure payment processing and subscription management' },
        { name: 'Redis', purpose: 'Caching layer and session storage for improved performance' },
        { name: 'Docker', purpose: 'Containerization for consistent deployment across environments' },
        { name: 'AWS S3', purpose: 'Scalable storage for product images and static assets' }
      ],
      features: [
        { feature: 'Product Management', description: 'Comprehensive product catalog with variants, inventory tracking, and bulk operations' },
        { feature: 'Shopping Cart', description: 'Persistent cart with real-time price updates and inventory validation' },
        { feature: 'Payment Processing', description: 'Secure payment handling with multiple payment methods and fraud protection' },
        { feature: 'Order Management', description: 'Complete order lifecycle from placement to fulfillment with tracking' },
        { feature: 'Admin Dashboard', description: 'Comprehensive analytics, inventory management, and customer service tools' },
        { feature: 'Search & Filtering', description: 'Advanced product search with filters, sorting, and recommendation engine' }
      ],
      challenges: [
        {
          challenge: 'Payment Security',
          solution: 'Implemented PCI DSS compliance measures and used Stripe for secure payment processing with tokenization.'
        },
        {
          challenge: 'Inventory Synchronization',
          solution: 'Built real-time inventory management system with automatic stock updates and low-stock alerts.'
        },
        {
          challenge: 'Performance at Scale',
          solution: 'Implemented caching strategies, database optimization, and CDN integration for fast loading times.'
        }
      ]
    },
    results: {
      metrics: {
        'Transaction Vol': '$50K+',
        'Page Load': '<3s',
        'Conversion': '3.2%',
        'Uptime': '99.9%'
      },
      achievements: [
        'Processed over $50K in transactions',
        'Achieved 99.9% uptime reliability',
        'Maintained sub-3-second page load times',
        'Successfully integrated multiple payment methods'
      ],
      impact: 'The e-commerce platform enabled local businesses to establish strong online presence, increase sales, and compete effectively in the digital marketplace while maintaining lower operational costs.'
    },
    conclusion: 'The e-commerce platform successfully provided businesses with a robust, scalable solution for online sales, demonstrating the importance of performance, security, and user experience in modern e-commerce.',
    futureWork: [
      'Machine learning recommendations',
      'Multi-vendor marketplace features',
      'Advanced analytics dashboard',
      'Mobile app development'
    ]
  }
};

export default function CaseStudyClient({ id }) {
  const [activeSection, setActiveSection] = useState('intro');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'methodology', 'implementation', 'results', 'conclusion'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const caseStudy = caseStudiesData[id];

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF5EE]">
        <div className="text-center">
          <h1 className={`${spaceGrotesk.className} text-4xl text-[#5D503A] mb-4`}>
            Case Study Not Found
          </h1>
          <Link href="/case-studies" className="text-[#5D503A] underline">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'results', label: 'Results' },
    { id: 'conclusion', label: 'Conclusion' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF5EE]">
      <PortfolioMap />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-1 bg-[#5D503A]/20 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      >
        <motion.div 
          className="h-full bg-[#5D503A] origin-left"
          style={{ height: progressBarHeight }}
        />
      </motion.div>

      {/* Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-[#5D503A] scale-125' 
                  : 'bg-[#5D503A]/30 hover:bg-[#5D503A]/60'
              }`}
              title={section.label}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section id="intro" className="min-h-screen flex items-center justify-center px-8 py-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className={`${inter.className} text-sm text-[#5D503A]/60`}>
                {caseStudy.category}
              </span>
              <span className="w-px h-4 bg-[#5D503A]/30" />
              <span className={`${inter.className} text-sm text-[#5D503A]/60`}>
                {caseStudy.timeline}
              </span>
              <span className="w-px h-4 bg-[#5D503A]/30" />
              <span className={`${inter.className} text-sm text-[#5D503A]/60`}>
                {caseStudy.readTime}
              </span>
            </div>
          </motion.div>

          <motion.h1 
            className={`${spaceGrotesk.className} text-4xl md:text-6xl lg:text-7xl text-[#5D503A] mb-8 leading-tight`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {caseStudy.title}
          </motion.h1>

          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {caseStudy.skills.map((skill, index) => (
              <span
                key={index}
                className={`${inter.className} px-4 py-2 bg-[#5D503A]/10 text-[#5D503A] rounded-full text-sm`}
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div>
              <h3 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-3`}>
                Objective
              </h3>
              <p className={`${inter.className} text-[#5D503A]/70 text-sm leading-relaxed`}>
                {caseStudy.objective}
              </p>
            </div>
            <div>
              <h3 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-3`}>
                Aim
              </h3>
              <p className={`${inter.className} text-[#5D503A]/70 text-sm leading-relaxed`}>
                {caseStudy.aim}
              </p>
            </div>
            <div>
              <h3 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-3`}>
                Background
              </h3>
              <p className={`${inter.className} text-[#5D503A]/70 text-sm leading-relaxed`}>
                {caseStudy.history}
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="flex justify-center">
              <button 
                onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
                className="animate-bounce"
              >
                <svg className="w-6 h-6 text-[#5D503A]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="min-h-screen flex items-center px-8 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-6`}>
              Methodology & Research
            </h2>
            <p className={`${inter.className} text-[#5D503A]/70 max-w-2xl mx-auto text-lg`}>
              A systematic approach to problem-solving and solution development
            </p>
          </motion.div>

          <div className="space-y-12">
            {caseStudy.methodology.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="md:w-1/2">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#5D503A] text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className={`${spaceGrotesk.className} text-xl text-[#5D503A]`}>
                          {phase.title}
                        </h3>
                        <span className={`${inter.className} text-sm text-[#5D503A]/60`}>
                          {phase.duration}
                        </span>
                      </div>
                    </div>
                    <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed`}>
                      {phase.content}
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="aspect-video bg-gradient-to-br from-[#5D503A]/10 to-[#5D503A]/20 rounded-2xl flex items-center justify-center">
                    <span className={`${inter.className} text-[#5D503A]/60`}>
                      Phase {index + 1} Illustration
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section id="implementation" className="min-h-screen flex items-center px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-6`}>
              Implementation
            </h2>
            <p className={`${inter.className} text-[#5D503A]/70 max-w-2xl mx-auto text-lg`}>
              Technical details and development process
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                System Architecture
              </h3>
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg`}>
                {caseStudy.implementation.architecture}
              </p>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Technologies Used
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.implementation.technologies.map((tech, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-2`}>
                      {tech.name}
                    </h4>
                    <p className={`${inter.className} text-[#5D503A]/70 text-sm`}>
                      {tech.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features or Challenges */}
            {caseStudy.implementation.features && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {caseStudy.implementation.features.map((feature, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                      <h4 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-3`}>
                        {feature.feature}
                      </h4>
                      <p className={`${inter.className} text-[#5D503A]/70 text-sm leading-relaxed`}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Challenges & Solutions
              </h3>
              <div className="space-y-6">
                {caseStudy.implementation.challenges.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className={`${spaceGrotesk.className} text-lg text-red-600 mb-2`}>
                          Challenge
                        </h4>
                        <p className={`${inter.className} text-[#5D503A]/80 text-sm`}>
                          {item.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className={`${spaceGrotesk.className} text-lg text-green-600 mb-2`}>
                          Solution
                        </h4>
                        <p className={`${inter.className} text-[#5D503A]/80 text-sm`}>
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="min-h-screen flex items-center px-8 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-6`}>
              Results & Impact
            </h2>
            <p className={`${inter.className} text-[#5D503A]/70 max-w-2xl mx-auto text-lg`}>
              Measurable outcomes and project achievements
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8 text-center`}>
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(caseStudy.results.metrics).map(([metric, value], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className={`${spaceGrotesk.className} text-3xl text-[#5D503A] mb-2`}>
                      {value}
                    </div>
                    <div className={`${inter.className} text-sm text-[#5D503A]/70`}>
                      {metric}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Key Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.results.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-white p-4 rounded-lg shadow"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className={`${inter.className} text-[#5D503A]/80`}>
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-4`}>
                Project Impact
              </h3>
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg`}>
                {caseStudy.results.impact}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" className="min-h-screen flex items-center px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-6`}>
              Conclusion
            </h2>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg`}>
                {caseStudy.conclusion}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Future Work
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.futureWork.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#5D503A]/10 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#5D503A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                      <span className={`${inter.className} text-[#5D503A]/80`}>
                        {item}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center pt-8"
            >
              <div className="flex justify-center gap-4">
                <Link
                  href="/case-studies"
                  className={`${inter.className} px-6 py-3 bg-[#5D503A] text-white rounded-full hover:bg-[#5D503A]/80 transition-colors duration-200`}
                >
                  Back to Case Studies
                </Link>
                <Link
                  href="/projects"
                  className={`${inter.className} px-6 py-3 border border-[#5D503A] text-[#5D503A] rounded-full hover:bg-[#5D503A]/10 transition-colors duration-200`}
                >
                  View Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
