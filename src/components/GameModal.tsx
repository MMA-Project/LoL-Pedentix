import Modal from "react-modal";
import { useDailyPedantix } from "../context/DailyPedantixContext";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    type: "info" | "history" | "coop" | null;
};

export const GameModal = ({ isOpen, onClose, type }: ModalProps) => {
    const { history } = useDailyPedantix();
    // console.log("sss")
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
                        Un champion de <strong>League of Legends</strong> est à
                        deviner chaque jour.
                        <br />
                        Entrez le nom d’un champion : le jeu vous indiquera à
                        quel point votre proposition est proche de la{" "}
                        <strong>page wiki du bon champion</strong>.<br />
                        Inspirez-vous de la <strong>terminologie LoL</strong>,
                        des <strong>faits marquants</strong>, ou de{" "}
                        <strong>l’univers du champion</strong> pour affiner vos
                        recherches.
                    </p>
                    <p>
                        Il y a un nouveau champion à deviner chaque jour à{" "}
                        <strong>00h UTC</strong>, et vous pouvez jouer à tout
                        moment de la journée.
                    </p>
                    <p>
                        Plus vous êtes proche, plus la température augmente !{" "}
                        <br />À vous de retrouver le champion du jour en un
                        minimum d’essais.
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
                    {history.map((entry, index) => (
                        <div key={index} className="mb-2">
                            <strong>Jour {history.length - index} / </strong>{" "}
                            {entry.name} / {entry.findedCount}
                        </div>
                    ))}
                </div>
            )}
            {type === "coop" && (
                <div>
                    <h2>Coopération</h2>
                    <p>
                        Unissez vos forces avec vos amis pour gagner ensemble !
                    </p>
                </div>
            )}
        </Modal>
    );
};
