import { useState } from 'react'
import ProjectsSidebar from './Components/ProjectsSidebar'
import NewProject from './Components/NewProject'
import NoProjectSelected from './Components/NoProjectSelected'
import SelectedProject from './Components/SelectedProject'

const App = () => {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  const handleAddTask = (text) => {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ... prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  const handleDeleteTask = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const handleSelectProject = (id) => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

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

  const handleDeleteProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      };
    });
  }
  
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = (
    <SelectedProject 
      project={selectedProject} 
      onDelete={handleDeleteProject}
      onAddTask = {handleAddTask}
      onDeleteTask = {handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

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
      onSelectProject = {handleSelectProject}
      selectedProjectId={projectsState.selectedProjectId}
    />
    {content}
    </main>
  )
}

export default App