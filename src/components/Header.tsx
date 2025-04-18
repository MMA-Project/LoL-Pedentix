import { useNavigate } from "react-router";
import logo from "../assets/logo.png";

export const Header = ({ larger = false }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <img
        src={logo}
        alt="Logo"
        className={`${larger ? "w-82" : "w-76"} clickable`}
        onClick={() => navigate("/")}
      />
    </div>
  );
};
