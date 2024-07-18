import { Trash } from "lucide-react";
import { useCardsContext } from "../../contexts/CardsContext";
import type { CardType } from "../../types/CardType";
import { useState } from "react";
import Modal from "../Modal/Modal";

function Card({
  cardData: { absences, maxPermittedAbsences, id, professor, title, theme },
}: {
  cardData: CardType;
}) {
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

  const { deleteCard, increaseCardAbsence, decreaseCardAbsence } =
    useCardsContext();

  const getFontColor = () => {
    switch (theme) {
      case "emerald":
        return "text-emerald-500";

      case "sky":
        return "text-sky-500";

      case "yellow":
        return "text-yellow-500";

      case "lime":
        return "text-lime-500";

      case "fuchsia":
        return "text-fuchsia-500";

      case "pink":
        return "text-pink-500";

      case "red":
        return "text-red-500";
    }
  };

  const getBorderColor = () => {
    switch (theme) {
      case "emerald":
        return "border-emerald-500";

      case "sky":
        return "border-sky-500";

      case "yellow":
        return "border-yellow-500";

      case "lime":
        return "border-lime-500";

      case "fuchsia":
        return "border-fuchsia-500";

      case "pink":
        return "border-pink-500";

      case "red":
        return "border-red-500";
    }
  };

  const getPrimaryButtonStyle = () => {
    switch (theme) {
      case "emerald":
        return "bg-emerald-900";

      case "sky":
        return "bg-sky-900";

      case "yellow":
        return "bg-yellow-900";

      case "lime":
        return "bg-lime-900";

      case "fuchsia":
        return "bg-fuchsia-900";

      case "pink":
        return "bg-pink-900";

      case "red":
        return "bg-red-900";
    }
  };

  const getSecondaryButtonStyle = () => {
    switch (theme) {
      case "emerald":
        return "border-emerald-900 text-emerald-800";

      case "sky":
        return "border-sky-900 text-sky-800";

      case "yellow":
        return "border-yellow-900 text-yellow-800";

      case "lime":
        return "border-lime-900 text-lime-800";

      case "fuchsia":
        return "border-fuchsia-900 text-fuchsia-800";

      case "pink":
        return "border-pink-900 text-pink-800";

      case "red":
        return "border-red-900 text-red-800";
    }
  };

  const getDeleteButtonStyle = () => {
    switch (theme) {
      case "emerald":
        return "bg-emerald-700";

      case "sky":
        return "bg-sky-700";

      case "yellow":
        return "bg-yellow-700";

      case "lime":
        return "bg-lime-700";

      case "fuchsia":
        return "bg-fuchsia-700";

      case "pink":
        return "bg-pink-700";

      case "red":
        return "bg-red-700";
    }
  };

  return (
    <article
      className={`flex justify-between bg-zinc-900 rounded-md px-6 py-4 border-2 shadow-lg relative ${getBorderColor()}`}
    >
      <section>
        <p className={`text-xl tracking-wide font-semibold ${getFontColor()}`}>
          {title}
        </p>

        <button
          className={`absolute right-4 top-4 rounded-md p-1 pb-1.5 ${getDeleteButtonStyle()} cursor-pointer`}
          onClick={() => setIsDeletionModalOpen(true)}
        >
          <Trash size={14} />
        </button>

        <div className="mt-6">
          <p>Professor: {professor}</p>

          <div className="flex gap-3 mt-4 xs:flex-col">
            <button
              className={`rounded-md px-2 py-1 shadow-sm border ${getSecondaryButtonStyle()}`}
              onClick={() => decreaseCardAbsence(id)}
            >
              Remover falta
            </button>
            <button
              className={`rounded-md px-2 py-1 shadow-sm ${getPrimaryButtonStyle()}`}
              onClick={() => increaseCardAbsence(id)}
            >
              Adicionar falta
            </button>
          </div>
        </div>
      </section>
      <section className="flex items-center">
        <RadialProgressBar
          absences={absences}
          maxPermittedAbsences={maxPermittedAbsences}
          theme={theme}
        />
      </section>

      <Modal isOpen={isDeletionModalOpen} setIsOpen={setIsDeletionModalOpen}>
        <h3>
          Tem certeza que deseja excluir a matéria{" "}
          <span className="italic">{title}</span>?
        </h3>

        <div className="flex w-fit gap-4 mt-10 ml-auto">
          <button
            onClick={() => setIsDeletionModalOpen(false)}
            className="border-2 border-violet-700 text-violet-500 font-semibold rounded-md px-4 py-2"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              deleteCard(id);
              setIsDeletionModalOpen(false);
            }}
            className="bg-violet-700 px-4 py-2 rounded-md tracking-wider"
          >
            Excluir
          </button>
        </div>
      </Modal>
    </article>
  );
}

export default Card;

// ! ==================================================================================
interface RadialProgressBarProps {
  absences: number;
  maxPermittedAbsences: number;
  theme: CardType["theme"];
}

const RadialProgressBar = ({
  absences,
  maxPermittedAbsences,
  theme,
}: RadialProgressBarProps) => {
  const circleRadius = 40;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    circleCircumference -
    (absences / maxPermittedAbsences) * circleCircumference;

  const getProgressColor = () => {
    switch (theme) {
      case "emerald":
        return "stroke-emerald-500";

      case "sky":
        return "stroke-sky-500";

      case "yellow":
        return "stroke-yellow-500";

      case "lime":
        return "stroke-lime-500";

      case "fuchsia":
        return "stroke-fuchsia-500";

      case "pink":
        return "stroke-pink-500";

      case "red":
        return "stroke-red-500";
    }
  };

  return (
    <div className="flex items-center justify-center relative">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          stroke="gray"
          strokeWidth="5"
          fill="transparent"
        />
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={circleCircumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-stroke-dashoffset duration-500 ease-out ${getProgressColor()}`}
        />
      </svg>
      <div className="absolute text-xl font-medium">
        {absences}/{maxPermittedAbsences}
      </div>
    </div>
  );
};
