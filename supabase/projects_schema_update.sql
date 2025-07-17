-- Enhanced Projects Schema Update
-- Run this in your Supabase SQL Editor

-- 1. Add new columns to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS overview TEXT,
ADD COLUMN IF NOT EXISTS domain TEXT,
ADD COLUMN IF NOT EXISTS tech_stack JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
ADD COLUMN IF NOT EXISTS demo_video_url TEXT,
ADD COLUMN IF NOT EXISTS show_on_index BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT 'featured' CHECK (project_type IN ('featured', 'course', 'mini', 'personal'));

-- 2. Update existing projects to have the new structure
UPDATE projects SET 
  domain = COALESCE(domain, category, 'General'),
  overview = COALESCE(overview, SUBSTRING(description, 1, 100)),
  tech_stack = COALESCE(tech_stack, skills, '{}'),
  cover_image_url = COALESCE(cover_image_url, image_url)
WHERE domain IS NULL OR overview IS NULL OR tech_stack IS NULL;

-- 3. Create index for show_on_index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_show_on_index ON projects(show_on_index);
CREATE INDEX IF NOT EXISTS idx_projects_project_type ON projects(project_type);

-- 4. Create function to enforce 4-project limit for index page
CREATE OR REPLACE FUNCTION enforce_index_project_limit()
RETURNS TRIGGER AS $$
BEGIN
  -- If trying to set show_on_index to true
  IF NEW.show_on_index = true AND (OLD.show_on_index IS NULL OR OLD.show_on_index = false) THEN
    -- Check if we already have 4 projects on index
    IF (SELECT COUNT(*) FROM projects WHERE show_on_index = true AND id != NEW.id) >= 4 THEN
      RAISE EXCEPTION 'Cannot add more than 4 projects to index page. Please remove one first.';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create trigger to enforce the limit
DROP TRIGGER IF EXISTS enforce_index_limit_trigger ON projects;
CREATE TRIGGER enforce_index_limit_trigger
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION enforce_index_project_limit();

-- 6. Sample enhanced project data
INSERT INTO projects (
  title, 
  category,  -- Keep category for backward compatibility
  domain, 
  timeline, 
  role, 
  overview, 
  description,
  achievements, 
  tags, 
  skills,  -- Keep skills for backward compatibility
  tech_stack, 
  links, 
  images,
  image_url,  -- Keep image_url for backward compatibility
  cover_image_url,
  demo_video_url,
  featured, 
  published,
  project_type,
  show_on_index
) VALUES
(
  'Smart Agriculture IoT System',
  'IoT/Agriculture',  -- category
  'IoT/Agriculture',  -- domain
  'Mar 2024 - May 2024',
  'Full Stack IoT Developer',
  'An intelligent farming system using IoT sensors to monitor soil conditions, weather patterns, and automate irrigation.',
  'Comprehensive IoT solution for modern agriculture with real-time monitoring, predictive analytics, and automated control systems.',
  'Increased crop yield by 25%, Reduced water consumption by 40%, Won Best Innovation Award at AgriTech Summit 2024',
  ARRAY['IoT', 'Agriculture', 'Sensors', 'Machine Learning', 'React'],
  '{
    "Hardware": ["Arduino", "Soil Sensors", "Weather Station", "Irrigation Control"],
    "Backend": ["Node.js", "Express", "MongoDB", "MQTT"],
    "Frontend": ["React", "TypeScript", "Tailwind CSS"],
    "AI/ML": ["TensorFlow", "Python", "Predictive Analytics"],
    "Cloud": ["AWS IoT Core", "Lambda", "S3"]
  }',  -- skills (for backward compatibility)
  '{
    "Hardware": ["Arduino", "Soil Sensors", "Weather Station", "Irrigation Control"],
    "Backend": ["Node.js", "Express", "MongoDB", "MQTT"],
    "Frontend": ["React", "TypeScript", "Tailwind CSS"],
    "AI/ML": ["TensorFlow", "Python", "Predictive Analytics"],
    "Cloud": ["AWS IoT Core", "Lambda", "S3"]
  }',  -- tech_stack
  '{
    "demo": "https://smart-agri-demo.com",
    "github": "https://github.com/frankmathewsajan/smart-agriculture",
    "caseStudy": "/case-studies/smart-agriculture",
    "documentation": "https://docs.smart-agri.com"
  }',
  '[
    {"url": "/images/agri/dashboard.png", "caption": "Main Dashboard"},
    {"url": "/images/agri/sensors.png", "caption": "Sensor Network"},
    {"url": "/images/agri/analytics.png", "caption": "Analytics View"},
    {"url": "/images/agri/mobile.png", "caption": "Mobile App"}
  ]',
  '/images/agri/cover.png',  -- image_url (for backward compatibility)
  '/images/agri/cover.png',  -- cover_image_url
  'https://youtube.com/watch?v=demo-video-id',
  true,
  true,
  'featured',
  true
),
(
  'E-Learning Platform with AI',
  'EdTech/AI',  -- category
  'EdTech/AI',  -- domain
  'Jan 2024 - Apr 2024',
  'Lead Developer & AI Engineer',
  'Personalized learning platform using AI to adapt content based on student performance and learning patterns.',
  'Advanced e-learning system with AI-driven personalization, real-time progress tracking, and interactive content delivery.',
  'Improved learning outcomes by 35%, Served 1000+ students, Featured in EdTech Magazine',
  ARRAY['AI', 'Education', 'React', 'Machine Learning', 'NLP'],
  '{
    "Frontend": ["React", "Next.js", "TypeScript", "Chakra UI"],
    "Backend": ["Python", "FastAPI", "PostgreSQL", "Redis"],
    "AI/ML": ["TensorFlow", "scikit-learn", "NLP", "Recommendation Systems"],
    "DevOps": ["Docker", "AWS", "GitHub Actions"]
  }',  -- skills
  '{
    "Frontend": ["React", "Next.js", "TypeScript", "Chakra UI"],
    "Backend": ["Python", "FastAPI", "PostgreSQL", "Redis"],
    "AI/ML": ["TensorFlow", "scikit-learn", "NLP", "Recommendation Systems"],
    "DevOps": ["Docker", "AWS", "GitHub Actions"]
  }',  -- tech_stack
  '{
    "demo": "https://ai-learn-platform.com",
    "github": "https://github.com/frankmathewsajan/ai-learning",
    "caseStudy": "/case-studies/ai-learning-platform",
    "live": "https://learn.aiplatform.com"
  }',
  '[
    {"url": "/images/elearn/home.png", "caption": "Homepage"},
    {"url": "/images/elearn/courses.png", "caption": "Course Catalog"},
    {"url": "/images/elearn/ai-recommendations.png", "caption": "AI Recommendations"},
    {"url": "/images/elearn/progress.png", "caption": "Progress Tracking"}
  ]',
  '/images/elearn/cover.png',  -- image_url
  '/images/elearn/cover.png',  -- cover_image_url
  'https://youtube.com/watch?v=elearn-demo',
  true,
  true,
  'featured',
  true
),
(
  'Blockchain Voting System',
  'Blockchain/Security',  -- category
  'Blockchain/Security',  -- domain
  'Oct 2023 - Dec 2023',
  'Blockchain Developer',
  'Secure and transparent voting system built on blockchain technology ensuring vote integrity and privacy.',
  'Decentralized voting application using smart contracts for transparency, security, and immutable vote recording.',
  'Zero vote tampering incidents, 99.9% uptime, Implemented in 3 pilot elections',
  ARRAY['Blockchain', 'Solidity', 'Security', 'Web3', 'React'],
  '{
    "Blockchain": ["Solidity", "Ethereum", "Web3.js", "Truffle"],
    "Frontend": ["React", "Web3 Integration", "MetaMask"],
    "Backend": ["Node.js", "Express", "IPFS"],
    "Security": ["Cryptography", "Smart Contract Auditing"]
  }',  -- skills
  '{
    "Blockchain": ["Solidity", "Ethereum", "Web3.js", "Truffle"],
    "Frontend": ["React", "Web3 Integration", "MetaMask"],
    "Backend": ["Node.js", "Express", "IPFS"],
    "Security": ["Cryptography", "Smart Contract Auditing"]
  }',  -- tech_stack
  '{
    "demo": "https://blockchain-voting-demo.com",
    "github": "https://github.com/frankmathewsajan/blockchain-voting",
    "whitepaper": "/docs/voting-whitepaper.pdf",
    "caseStudy": "/case-studies/blockchain-voting"
  }',
  '[
    {"url": "/images/blockchain/vote-interface.png", "caption": "Voting Interface"},
    {"url": "/images/blockchain/results.png", "caption": "Real-time Results"},
    {"url": "/images/blockchain/admin.png", "caption": "Admin Dashboard"},
    {"url": "/images/blockchain/security.png", "caption": "Security Features"}
  ]',
  '/images/blockchain/cover.png',  -- image_url
  '/images/blockchain/cover.png',  -- cover_image_url
  null,
  true,
  true,
  'featured',
  true
),
(
  'React E-Commerce Course Project',
  'Web Development',  -- category
  'Web Development',  -- domain
  'Sep 2023 - Oct 2023',
  'Student Developer',
  'Full-featured e-commerce website built as part of React development course with payment integration.',
  'Course project demonstrating React best practices, state management, and integration with payment systems.',
  'Completed with 95% score, Implemented advanced React patterns, Payment gateway integration',
  ARRAY['React', 'JavaScript', 'Course Project', 'E-commerce'],
  '{
    "Frontend": ["React", "Redux", "CSS3", "Bootstrap"],
    "Backend": ["Node.js", "Express", "MongoDB"],
    "Payment": ["Stripe API", "PayPal Integration"],
    "Tools": ["Git", "Webpack", "Babel"]
  }',  -- skills
  '{
    "Frontend": ["React", "Redux", "CSS3", "Bootstrap"],
    "Backend": ["Node.js", "Express", "MongoDB"],
    "Payment": ["Stripe API", "PayPal Integration"],
    "Tools": ["Git", "Webpack", "Babel"]
  }',  -- tech_stack
  '{
    "github": "https://github.com/frankmathewsajan/react-ecommerce-course",
    "demo": "https://react-shop-demo.netlify.app",
    "course": "https://course-link.com"
  }',
  '[
    {"url": "/images/course/shop-home.png", "caption": "Shop Homepage"},
    {"url": "/images/course/products.png", "caption": "Product Catalog"},
    {"url": "/images/course/cart.png", "caption": "Shopping Cart"},
    {"url": "/images/course/checkout.png", "caption": "Checkout Process"}
  ]',
  '/images/course/react-shop-cover.png',  -- image_url
  '/images/course/react-shop-cover.png',  -- cover_image_url
  null,
  false,
  true,
  'course',
  true
)
ON CONFLICT (id) DO NOTHING;

-- 7. Verification
SELECT 'Enhanced projects schema updated successfully!' as status;
SELECT title, category, domain, project_type, show_on_index, featured FROM projects ORDER BY created_at DESC;
