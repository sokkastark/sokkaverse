import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- DATA: Structured Project Hierarchy (remains the same) ---
const projectData = [
  { id: 'readme', name: '📄 Readme.md', type: 'file', hasViewport: false }, // Readme doesn't need a viewport
  { id: 'case-studies', name: '📁 Case-Studies', type: 'folder' },
  { id: 'case1', name: '├── Comprehensive_Kreedo.md', type: 'file', parent: 'case-studies', hasViewport: true }, 
  
  { id: 'ui-ux', name: '📁 UI-UX-Design', type: 'folder' },
  { id: 'ui1', name: '├── Kreedo_6T_Parent_App.tsx', type: 'file', parent: 'ui-ux', hasViewport: true }, 
  { id: 'ui2', name: '├── Practico_Games_App.jsx', type: 'file', parent: 'ui-ux', hasViewport: true }, 
  
  { id: 'visual', name: '📁 Visual-Asset-Design', type: 'folder' },
  { id: 'vis1', name: '├── Game_Visualizations.glb', type: 'file', parent: 'visual', hasViewport: true }, 
  { id: 'vis2', name: '└── Visual_Style_Guide.css', type: 'file', parent: 'visual', hasViewport: true }, 
  
  { id: 'graphic', name: '📁 Graphic-Print-Media', type: 'folder' },
  { id: 'graph1', name: '├── Curriculum_Book_Design.pdf', type: 'file', parent: 'graphic', hasViewport: false }, // Print files might not need viewport
  { id: 'graph2', name: '└── Social_Media_Creatives.jpg', type: 'file', parent: 'graphic', hasViewport: true },

  { id: 'team', name: '📁 Team-Leadership', type: 'folder' },
  { id: 'team1', name: '├── Functional_Lead_Process.md', type: 'file', parent: 'team', hasViewport: false },
  { id: 'team2', name: '└── Vendor_Management_Log.txt', type: 'file', parent: 'team', hasViewport: false },
];

const DesignStudio = () => {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState('readme');
  const [openFolders, setOpenFolders] = useState({ 
    'case-studies': false, 
    'ui-ux': false,
    'visual': false, 
    'graphic': false, 
    'team': false 
  }); 

  // Toggles the open/closed state of a folder
  const toggleFolder = (id) => {
    setOpenFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Handles clicking any item in the sidebar
  const handleItemClick = (project) => {
    if (project.type === 'folder') {
      toggleFolder(project.id);
    } else {
      setActiveProject(project.id);
    }
  };
  
  const getProjectName = (id) => projectData.find(p => p.id === id)?.name || 'Welcome';
  const getActiveProjectData = () => projectData.find(p => p.id === activeProject);

  // --- CONTENT RENDERING ---

  const renderProjectContent = () => {
    if (activeProject === 'readme') {
      return (
        <div className="readme-content">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{color: '#569cd6'}}
          >
            // Welcome to the Design Studio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="code-comment"
          >
            As a designer entering the modern interface era, I'm showcasing my projects through this VS Code-style interface. This structure reflects a commitment to organization, logic, and production-ready design thinking.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Explore my design projects and technical categories in the **EXPLORER MENU** on the left. Click on any file to view its design rationale or preview.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{color: '#6a9955', marginTop: '20px'}}
          >
            // Design Categories: Case Studies, UI-UX-Design, Visual-Asset-Design, Graphic-Print-Media, Team-Leadership.
          </motion.p>
        </div>
      );
    }
    
    // Default placeholder for other files
    return (
      <div className="editor-content-area">
        <h2 style={{color: '#569cd6'}}>{getProjectName(activeProject)}</h2>
        <p>This is the rationale/code view for the selected project. </p>
        <p className="code-comment">// Here will be the detailed case study, user flow, or technical specifications for this design.</p>
      </div>
    );
  };

  const renderViewportContent = () => {
    return (
      <div className="viewport-panel">
        <div className="viewport-header">
            VIEWPORT
        </div>
        <div className="design-preview-box">
           <p> [Image/Design Preview of {getProjectName(activeProject)} goes here] </p>
        </div>
      </div>
    );
  };

  // --- MAIN RENDER ---
  const activeData = getActiveProjectData();
  const showViewport = activeData?.hasViewport || false;

  return (
    <motion.div 
      className="design-studio-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 1. Sidebar */}
      <div className="vs-sidebar">
        <div className="sidebar-header">
          PROJECT EXPLORER
        </div>
        <div className="project-list">
          {projectData.map((project) => {
            if (project.parent && !openFolders[project.parent]) {
              return null;
            }
            return (
              <motion.div
                key={project.id}
                className={`project-item ${activeProject === project.id ? 'active' : ''} ${project.type === 'folder' ? 'folder' : 'file'}`}
                onClick={() => handleItemClick(project)}
                whileHover={{ backgroundColor: '#333' }}
              >
                {project.type === 'folder' && (
                  <span className={`folder-icon ${openFolders[project.id] ? 'open' : ''}`}>
                    ▶ 
                  </span>
                )}
                {project.name}
              </motion.div>
            );
          })}
        </div>
        <div className="sidebar-footer">
          <button className="back-to-galaxy-btn" onClick={() => navigate('/')}>
            ← Back to Galaxy
          </button>
        </div>
      </div>

      {/* 2. Main Area (Editor + Terminal) */}
      <div className="vs-main">
        <div className="vs-editor">
          {/* Tabs Bar */}
          <div className="editor-tabs">
            <div className="editor-tab active-tab">
              {getProjectName(activeProject)}
            </div>
            {/* Removed Viewport Tab as it's now a split panel */}
          </div>
          
          {/* Split Content Area */}
          <div className={`editor-split-content ${showViewport ? 'split' : 'full'}`}>
            {/* Left Panel: Content Rationale */}
            <div className="rationale-panel">
                {renderProjectContent()}
            </div>
            
            {/* Right Panel: Viewport (Only rendered if needed) */}
            {showViewport && renderViewportContent()}
          </div>
        </div>

        {/* 3. Bottom Terminal Panel */}
        <div className="vs-terminal">
          <p className="terminal-prompt">
            <span style={{color: '#569cd6'}}>$ </span>
            Sokka's Design Manifesto
          </p>
          <p className="terminal-output">
            <span style={{color: '#6a9955'}}>const designPhilosophy = </span>
            <span style={{color: '#ce9178'}}>("Yeah, I don’t know the language — but hey, that doesn’t mean I’m an idiot!");</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DesignStudio;