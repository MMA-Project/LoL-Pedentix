import Modal from "react-modal";
import { useDailyPedantix } from "../context/DailyPedantixContext";
import { useCoopRoom } from "../api/websocket";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "info" | "history" | "coop" | null;
};

export const GameModal = ({ isOpen, onClose, type }: ModalProps) => {
  const { history } = useDailyPedantix();
  const { createRoom, joinRoom } = useCoopRoom();
  const { data, roomId } = useDailyPedantix();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={type || "Modal"}
      className="font-bold px-6 py-3 rounded-lg text-justify h-fit"
      style={{
        overlay: {
          backgroundColor: "rgba(30, 35, 40, 0.8)",
          backdropFilter: "blur(2px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          backgroundColor: "#1e2328ee",
          border: "2px solid #af9767",
          color: "#af9767",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "500px",
          margin: "auto",
          position: "relative",
        },
      }}
      ariaHideApp={false}
    >
      <button
        className="modal-close"
        onClick={onClose}
        aria-label="Close modal"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "1.5rem",
          background: "none",
          border: "none",
          color: "#af9767",
          cursor: "pointer",
        }}
      >
        &times;
      </button>
      {type === "info" && (
        <div>
          <h2>Comment jouer au Pédantix spécial Champions LoL ?</h2>
          <p>
            Un champion de <strong>League of Legends</strong> est à deviner
            chaque jour.
            <br />
            Entrez le nom d’un champion : le jeu vous indiquera à quel point
            votre proposition est proche de la{" "}
            <strong>page wiki du bon champion</strong>.<br />
            Inspirez-vous de la <strong>terminologie LoL</strong>, des{" "}
            <strong>faits marquants</strong>, ou de{" "}
            <strong>l’univers du champion</strong> pour affiner vos recherches.
          </p>
          <p>
            Il y a un nouveau champion à deviner chaque jour à{" "}
            <strong>00h UTC</strong>, et vous pouvez jouer à tout moment de la
            journée.
          </p>
          <p>
            Plus vous êtes proche, plus la température augmente ! <br />À vous
            de retrouver le champion du jour en un minimum d’essais.
          </p>
          <h1>Indices : </h1>
          <p>
            🟩 : Mot trouvé
            <br />
            🟧 : Synonyme
            <br />
            🟦 : Mot partielement trouvé
            <br />
            🟥 : Mot incorrect
          </p>
        </div>
      )}
      {type === "history" && (
        <div>
          <h2>Historique</h2>
          <table className="w-full text-center border-separate border-spacing-y-1">
            <thead>
              <tr>
                <th className="pr-4">N°</th>
                <th className="pr-4">Champions</th>
                <th>Trouveurs</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td className="pr-4">{history.length - index}</td>
                  <td className="pr-4">{entry.name}</td>
                  <td>{entry.findedCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {type === "coop" && (
        <div>
          <h2>Coopération</h2>
          {data && !roomId ? (
            <div>
              <button
                onClick={() => createRoom(data.gameId)}
                className="btn-coop"
              >
                Créer une session
              </button>
              <p>Ou rejoignez une session existante :</p>
              <input
                type="text"
                placeholder="Entrez l'ID de la session"
                className=" px-2 py-1 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value.trim();
                    joinRoom(value, data.gameId);
                  }
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <p>Partagez ce code à vos amis pour jouer ensemble :</p>
              <a className="underline font-extrabold">{roomId}</a>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
