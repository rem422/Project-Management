import { useState } from 'react'
import ProjectsSidebar from './Components/ProjectsSidebar'
import NewProject from './Components/NewProject'
import NoProjectSelected from './Components/NoProjectSelected'

const App = () => {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  const handleStartAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  const handleCancelAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  const handleAddProject = (projectData) => {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };

      return {
        ... prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }
  
  let content;

  if(projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
    <ProjectsSidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectsState.projects}
    />
    {content}
    </main>
  )
}

export default App