import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bienvenue sur Pedantix</h1>
      <p>Choisissez votre mode de jeu :</p>
      <div className="button-container">
        <button onClick={() => navigate("daily")} className="home-button">
          Daily
        </button>
        <button onClick={() => navigate("/1v1")} className="home-button">
          1V1
        </button>
      </div>
    </div>
  );
};

export default Home;
