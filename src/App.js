import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  //LISTA OS REPOSITORIOS  
  useEffect(()=>{
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  //ADICIONA UM REPOSITORIO ESTATICO
  async function handleAddRepository() {
    const response = await api.post('/repositories', 
      {
        url: "https://github.com/Rocketseat/umbriel",
        title: `Umbriel ${Date.now()}`,
        techs: ["Node", "Express", "TypeScript"]         
      })
      
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);
    

  }

  return(
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map((repository, index) =>
          <li key={index}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
          </button>
          </li>
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
 );
}

export default App;
