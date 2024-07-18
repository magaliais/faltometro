import { ChangeEvent, useState } from "react";
import Modal from "./components/Modal/Modal";
import { NotepadTextDashed, Plus } from "lucide-react";
import { useCardsContext } from "./contexts/CardsContext";
import Card from "./components/Card/Card";
import { v4 as uuidv4 } from "uuid";
import { CardType } from "./types/CardType";

function App() {
  const [title, setTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [maxPermittedAbsences, setMaxPermittedAbsences] = useState<number>(4);
  const [theme, setTheme] = useState<CardType["theme"]>("emerald");

  const onColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value as CardType["theme"]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cards, createCard } = useCardsContext();

  const onCreateCard = () => {
    createCard({
      id: uuidv4(),
      title,
      professor,
      maxPermittedAbsences,
      theme: theme,
      absences: 0,
    });

    setIsModalOpen(false);

    setTitle("");
    setProfessor("");
    setMaxPermittedAbsences(0);
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
        <p className="mb-6 text-2xl">Criar nova matéria</p>

        <fieldset className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="title" className="pb-2 pl-1">
              Matéria
            </label>
            <input
              type="text"
              className="px-3 py-2 bg-[#222427] rounded-lg border border-zinc-600 placeholder:text-zinc-300 focus:outline focus:outline-violet-500 focus:outline-2 focus:outline-offset-2"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="professor" className="pb-2 pl-1">
              Professor
            </label>
            <input
              type="text"
              className="px-3 py-2 bg-[#222427] rounded-lg border border-zinc-600 placeholder:text-zinc-300 focus:outline focus:outline-violet-500 focus:outline-2 focus:outline-offset-2"
              id="professor"
              onChange={(e) => setProfessor(e.target.value)}
              value={professor}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="max-permitted-absences" className="pb-2 pl-1">
              Máximo de faltas permitidas
            </label>
            <input
              type="string"
              className="px-3 py-2 bg-[#222427] rounded-lg border border-zinc-600 placeholder:text-zinc-300 focus:outline focus:outline-violet-500 focus:outline-2 focus:outline-offset-2"
              id="max-permitted-absences"
              onChange={(e) =>
                setMaxPermittedAbsences(
                  Number(e.target.value.replace(/[^0-9]/g, ""))
                )
              }
              value={maxPermittedAbsences}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Cor do card</p>
            <div className="flex gap-2">
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
                  className={`flex items-center gap-1.5 text-sm font-medium cursor-pointer p-1 ${
                    theme === "emerald" && "bg-violet-800 rounded"
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
                  className={`flex items-center gap-1.5 ms-2 text-sm font-medium cursor-pointer p-1 ${
                    theme === "sky" && "bg-violet-800 rounded"
                  }`}
                >
                  <div className="w-3 h-3 bg-sky-500 rounded-full" />{" "}
                  <span>Azul</span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="yellow-radio"
                  type="radio"
                  value="yellow"
                  name="colored-radio"
                  className="w-4 h-4 bg-gray-100 border-gray-300 hidden"
                  checked={theme === "yellow"}
                  onChange={(e) => onColorChange(e)}
                />
                <label
                  htmlFor="yellow-radio"
                  className={`flex items-center gap-1.5 ms-2 text-sm font-medium cursor-pointer p-1 ${
                    theme === "yellow" && "bg-violet-800 rounded"
                  }`}
                >
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />{" "}
                  <span>Amarelo</span>
                </label>
              </div>
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
