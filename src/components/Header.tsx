import { useNavigate } from "react-router";
import logo from "../assets/logo.png";

interface HeaderProps {
  larger?: boolean;
}

export const Header = ({ larger = false }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center z-20">
      <img
        src={logo}
        alt="Logo"
        className={`${larger ? "w-82" : "w-76"} clickable`}
        onClick={() => navigate("/")}
      />
    </div>
  );
};
