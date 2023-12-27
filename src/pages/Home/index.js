import { Header } from "../../components/Header";
import fav from "../../assets/github-icon.png";
import "./style.css";
import ItemList from "../../components/ItemList";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      console.log(newUser);
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
   
      const newRepos = await reposData.json();
      
      if (newRepos.length){
        console.log("Ai achei o b.o")
        setRepos(newRepos);
      }
    }
  };
  
  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={fav} className="background" alt="background app" />
        <div className="info">
          <div>
            <input
              name="usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@username"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  className="profile"
                  alt="imagem de perfil"
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}

          {repos && repos.length ? (
            <>
              <div className="repository">
                <h4>Repositórios</h4>
                {repos.map((repo) => (
                  <ItemList title={repo.name} url_repo={repo.html_url} description={repo.description} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
