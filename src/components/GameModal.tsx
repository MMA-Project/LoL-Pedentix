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
      className="font-bold px-6 py-3 rounded-lg text-center h-fit"
      style={{
        overlay: {
          backgroundColor: "rgba(30, 35, 40, 0.8)",
          backdropFilter: "blur(2px)",
        },
        content: {
          backgroundColor: "#1e2328ee",
          border: "2px solid #af9767",
          color: "#af9767",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "500px",
          margin: "auto",
        },
      }}
      ariaHideApp={false}
    >
      <button
        className="modal-close"
        onClick={onClose}
        aria-label="Close modal"
      >
        &times;
      </button>
      {type === "info" && (
        <div>
          <h2>Information</h2>
          <p>
            Règle du Pédantix spécial champions LoL :<br />
            Devinez le champion League of Legends du jour en proposant des noms.
            Après chaque essai, vous recevrez des indices pour vous rapprocher
            de la bonne réponse. Utilisez vos connaissances sur les champions,
            leurs rôles, régions, et caractéristiques pour trouver la solution
            en un minimum de tentatives !
          </p>
        </div>
      )}
      {type === "history" && (
        <div>
          <h2>Historique</h2>
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              <strong>Jour {history.length - index} / </strong> {entry.name} /{" "}
              {entry.findedCount}
            </div>
          ))}
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
