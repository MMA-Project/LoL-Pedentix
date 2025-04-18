import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 flex flex-col items-center">
      <h1 className=" text-white text-xl mb-4">
        Devine des champions de League of Legends
      </h1>
      <div className="flex flex-col items-center mb-4 gap-4">
        <div
          className="relative flex flex-col clickable"
          onClick={() => navigate("daily")}
        >
          <img
            src="./src/assets/ButtonEmpty.webp"
            alt="select daily"
            className="h-20 "
          />
          <div className="absolute left-26 top-2 text-white text-3xl">
            Daily
          </div>
          <div className="absolute left-26 bottom-5 text-white text-sm">
            Trouver le champion avec son histoire
          </div>
        </div>
        <div
          className="relative flex flex-col clickable"
          onClick={() => navigate("1vs1")}
        >
          <img
            src="./src/assets/ButtonEmpty.webp"
            alt="select 1vs1"
            className="h-20 "
          />
          <div className="absolute left-26 top-2 text-white text-3xl">1vs1</div>
          <div className="absolute left-26 bottom-5 text-white text-sm">
            Affrontement avec un autre joueur
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
