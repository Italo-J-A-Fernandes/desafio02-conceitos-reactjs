import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepo] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepo(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `ReactJS ${Date.now()}`,
    	url: "http://teste.com",
	    techs: ["ReactJS", "React Native", "VueJS"]
    });

    const repository = response.data;

    setRepo([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository()}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
