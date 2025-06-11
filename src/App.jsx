import NewProject from "./Components/NewProject";
import ProjectsSidebar from "./Components/ProjectsSidebar";

function App() {
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      <NewProject />
      </main>
  );
}

export default App;
