import { Trash } from "lucide-react";
import { useCardsContext } from "../../contexts/CardsContext";
import type { CardType } from "../../types/CardType";

function Card({
  cardData: { absences, credits, id, professor, title, theme },
}: {
  cardData: CardType;
}) {
  const { deleteCard, increaseCardAbsence, decreaseCardAbsence } =
    useCardsContext();

  return (
    <article
      className={`flex justify-between bg-zinc-900 rounded-md px-6 py-4 border-2 shadow-lg relative ${
        theme === "emerald" ? "border-emerald-500" : "border-sky-500"
      }`}
    >
      <section>
        <p
          className={`text-xl tracking-wide font-semibold ${
            theme === "emerald" ? "text-emerald-500" : "text-sky-500"
          }`}
        >
          {title}
        </p>

        <button
          className="absolute right-4 top-4 rounded-md p-1 pb-1.5 bg-red-500 cursor-pointer"
          onClick={() => deleteCard(id)}
        >
          <Trash size={14} />
        </button>

        <div className="mt-6">
          <p>Professor: {professor}</p>
          <p>Créditos: {credits}</p>

          <div className="flex gap-3 mt-4 xs:flex-col">
            <button
              className="rounded-md px-2 py-1 shadow-sm border border-sky-900 text-sky-800"
              onClick={() => decreaseCardAbsence(id)}
            >
              Remover falta
            </button>
            <button
              className="rounded-md px-2 py-1 shadow-sm bg-sky-900"
              onClick={() => increaseCardAbsence(id)}
            >
              Adicionar falta
            </button>
          </div>
        </div>
      </section>
      <section className="flex items-center">
        <RadialProgressBar progress={40} absences={absences} theme={theme} />
      </section>
    </article>
  );
}

export default Card;

// ! ==================================================================================
interface RadialProgressBarProps {
  progress: number;
  absences: number;
  theme: "sky" | "emerald";
}

const RadialProgressBar = ({ absences, theme }: RadialProgressBarProps) => {
  const circleRadius = 40;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    circleCircumference - (absences / 8) * circleCircumference;
  const progressColor =
    theme === "sky" ? "stroke-sky-500" : "stroke-emerald-500";

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
          className={`transition-stroke-dashoffset duration-500 ease-out ${progressColor}`}
        />
      </svg>
      <div className="absolute text-xl font-medium">{absences}/8</div>
    </div>
  );
};
