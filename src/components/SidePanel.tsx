export const SidePanel = () => {
  return (
    <div
      className="font-bold w-56 px-6 py-3 rounded-lg text-center h-fit"
      style={{
        backgroundColor: "#1e2328ee",
        border: "2px solid #af9767",
      }}
    >
      <div>Jour n° {new Date().getDate()}</div>
      <div>Trouvé par 1000 personnes</div>
      <div className="flex flex-row gap-2 justify-center mt-4">
        <div className="">N°</div>
        <div className="">Mot</div>
      </div>
    </div>
  );
};
