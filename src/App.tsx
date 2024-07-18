import { ChangeEvent, useState } from "react";
import Modal from "./components/Modal/Modal";
import { NotepadTextDashed, Plus } from "lucide-react";
import { useCardsContext } from "./contexts/CardsContext";
import Card from "./components/Card/Card";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [title, setTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [credits, setCredits] = useState(0);
  const [theme, setTheme] = useState<"emerald" | "sky">("emerald");

  const onColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value as "emerald" | "sky");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cards, createCard } = useCardsContext();

  const onCreateCard = () => {
    createCard({
      id: uuidv4(),
      title,
      professor,
      credits,
      theme: theme,
      absences: 0,
    });

    setIsModalOpen(false);

    setTitle("");
    setProfessor("");
    setCredits(0);
  };

  return (
    <main className="min-h-screen bg-zinc-800 flex overflow-auto py-10">
      <div className="flex flex-col max-w-[700px] px-12 mx-auto gap-8">
        {cards?.length! > 0 ? (
          cards.map((card) => <Card key={card.id} cardData={card} />)
        ) : (
          <div className="mt-32 px-4">
            <p className="text-zinc-500 text-xl text-center">
              Ainda não há matérias registradas!
            </p>
            <NotepadTextDashed className="mx-auto text-zinc-500 mt-5" />
          </div>
        )}
      </div>

      <button
        className="flex itecems-center justify-center bg-violet-800 rounded-full fixed bottom-5 right-5 p-3 shadow-md"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <p className="mb-8 text-2xl">Criar nova matéria</p>

        <fieldset className="flex flex-col gap-5">
          <input
            type="text"
            className="px-3 py-2 bg-[#222427] rounded-lg border border-zinc-600 placeholder:text-zinc-300 focus:outline focus:outline-violet-500 focus:outline-2 focus:outline-offset-2"
            name="Matéria"
            placeholder="Nome da matéria"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="text"
            className="px-3 py-2 bg-[#222427] rounded-lg border border-zinc-600 placeholder:text-zinc-300 focus:outline focus:outline-violet-500 focus:outline-2 focus:outline-offset-2"
            name="Professor"
            placeholder="Professor"
            onChange={(e) => setProfessor(e.target.value)}
            value={professor}
          />
          <input
            type="number"
            className="px-3 py-2 bg-[#222427] rounded-lg border border-zinc-600 placeholder:text-zinc-300 focus:outline focus:outline-violet-500 focus:outline-2 focus:outline-offset-2"
            name="Créditos"
            placeholder="Créditos"
            onChange={(e) => setCredits(Number(e.target.value))}
            value={credits}
          />
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <input
                id="emerald-radio"
                type="radio"
                value="emerald"
                name="colored-radio"
                className="w-4 h-4 bg-gray-100 border-gray-300 hidden"
                checked={theme === "emerald"}
                onChange={(e) => onColorChange(e)}
              />
              <label
                htmlFor="emerald-radio"
                className={`flex items-center gap-1.5 ms-2 text-sm font-medium ${
                  theme === "emerald" && "border-2 border-sky-500"
                }`}
              >
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />{" "}
                <span>Verde</span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="sky-radio"
                type="radio"
                value="sky"
                name="colored-radio"
                className="w-4 h-4 bg-gray-100 border-gray-300 hidden"
                checked={theme === "sky"}
                onChange={(e) => onColorChange(e)}
              />
              <label
                htmlFor="sky-radio"
                className={`flex items-center gap-1.5 ms-2 text-sm font-medium ${
                  theme === "sky" && "border-2 border-sky-500"
                }`}
              >
                <div className="w-3 h-3 bg-sky-500 rounded-full" />{" "}
                <span>Azul</span>
              </label>
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => setIsModalOpen(false)}
            className="border-2 border-violet-700 text-violet-500 font-semibold rounded-md px-4 py-2"
          >
            Cancelar
          </button>
          <button
            onClick={onCreateCard}
            className="ml-4 bg-violet-700 px-4 py-2 rounded-md tracking-wider"
          >
            Criar
          </button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
