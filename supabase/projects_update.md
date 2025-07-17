### Project Display System Enhancement

**Current Implementation:**
- Projects are displayed on the `/projects` page
- The index page (`/`) displays the top 4 projects
- Currently, the `/projects` page contains:
  - Some mini-projects
  - 5 hardcoded projects (3 featured and 2 course projects)
  - A table of contents

**Requested Changes:**
Make this system dynamic by modifying the projects table in Supabase. Provide the hardcoded data as initial data (I'll paste the SQL into the Supabase SQL Editor).

**Project Attributes:**

Maintaining the current frontend style in /projects
Each project should have:
- Title
- Domain (e.g., IoT/Embedded Systems)
- Overview
- Achievement
- Buttons:
  - View Demo
  - GitHub
  - Case Study
- Role
- Timeline
- Techstack (with subtitles and tags structure)
  - Example:
    - AI/ML subtitle with tags: TensorFlow, NLP, scikit-learn
    - Backend subtitle with tags: Python, FastAPI, PostgreSQL
- Image gallery (ability to upload multiple images and select one as cover)

**Demo Modal:**
When the "View Demo" button is clicked, open a modal displaying:
- All project images
- An optional YouTube video link

**Admin Panel Requirements:**
1. CRUD functionality for projects
2. Ability to classify projects as:
   - Featured
   - Course projects
   - (For table of content organization)
3. Top project selection:
   - Checkbox to mark as "Show on index page"
   - Enforce 4-project maximum:
     - If selecting a 5th project, present options:
       1. Cancel
       2. Replace one existing top project (list titles of current top 4)
4. The selected cover image should serve as the thumbnail on the index page for top projects