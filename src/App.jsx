import { useState, useEffect } from 'react';
import axios from 'axios';
import img from './assets/imagem/git.svg';
import './App.css';

function App() {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState({
    name: '',
    login: '',
    rep: '',
    following: '',
    followers: '',
    local: ''
  });

  async function handleSearch() {
    try {
      const [userResponse, reposResponse] = await Promise.all([
        axios.get(`https://api.github.com/users/${user}`),
        axios.get(`https://api.github.com/users/${user}/repos`)
      ]);

      console.log(userResponse.data);
      console.log(reposResponse.data);

      getData(user);
    } catch (error) {
      console.error(error);
    }
  }

  async function getData(user) {
    try {
      const data = await fetch(`https://api.github.com/users/${user}`).then(response => response.json());
      dataList(data);
    } catch (error) {
      console.error(error);
    }
  }

  function dataList (data) {
    setUserData({
      name: data.name,
      login: data.login,
      rep: `https://github.com/${data.login}?tab=repositories`,
      following: `https://github.com/${data.login}?tab=following`,
      followers: `https://github.com/${data.login}?tab=followers`,
      local: data.location
    });
  }

  return (
    <>
      <div className="header">
        <label>Git Search</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder='Digite o nick de um usuário do github'
        />
        <button className="btn" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>

      <div className="info">
        <div className="inicio">
          <img src={img} alt="" id="foto" />
          <br></br>
        </div>
        <div className="caixa">
          <p className="user" id="login">
            Usuario: {userData.login}
          </p>
          <br></br>
          <p className="name" id="name">
            Nome: {userData.name}
          </p>
          <a href={userData.rep} target="_blank" rel="noopener noreferrer">
            <p className="rep">Repositorios</p>
          </a>
          <a href={userData.following} target="_blank" rel="noopener noreferrer">
            <p className="following">Seguindo</p>
          </a>
          <a href={userData.followers} target="_blank" rel="noopener noreferrer">
            <p className="followers">Seguidores</p>
          </a>
          <p className="local" id="local">
            Local: {userData.local}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
