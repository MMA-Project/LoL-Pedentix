import { useNavigate } from "react-router";

export const Header = ({ larger = false }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <img
        src="./src/assets/logo.png"
        alt="Logo"
        className={`${larger ? "w-82" : "w-76"} clickable`}
        onClick={() => navigate("/")}
      />
    </div>
  );
};
