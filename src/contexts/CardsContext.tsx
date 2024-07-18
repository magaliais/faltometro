import { createContext, useContext, useEffect, useState } from "react";
import { CardType } from "../types/CardType";

interface CardsContextType {
  cards: CardType[];
  setCards: (value: CardType[]) => void;
  createCard: (card: CardType) => void;
  deleteCard: (id: string) => void;
  increaseCardAbsence: (id: string) => void;
  decreaseCardAbsence: (id: string) => void;
}

interface CardsProviderProps {
  children: React.ReactNode;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider = ({ children }: CardsProviderProps) => {
  const [cards, setCards] = useState<CardType[]>(
    JSON.parse(localStorage.getItem("faltometro:cards")!) ?? []
  );

  useEffect(() => {
    localStorage.setItem("faltometro:cards", JSON.stringify(cards));
  }, [cards]);

  const createCard = (card: CardType) => {
    const newCard: CardType = {
      id: card.id,
      title: card.title,
      professor: card.professor,
      credits: card.credits,
      theme: card.theme,
      absences: 0,
    };

    setCards([...cards, newCard]);
  };

  const deleteCard = (id: string) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const increaseCardAbsence = (id: string) => {
    if (cards.filter((card) => card.id === id)[0].absences >= 8) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, absences: card.absences + 1 } : card
    );

    setCards(updatedCards);
  };

  const decreaseCardAbsence = (id: string) => {
    if (cards.filter((card) => card.id === id)[0].absences <= 0) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, absences: card.absences - 1 } : card
    );

    setCards(updatedCards);
  };

  return (
    <CardsContext.Provider
      value={{
        cards,
        setCards,
        createCard,
        deleteCard,
        increaseCardAbsence,
        decreaseCardAbsence,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export const useCardsContext = () => {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error("useCardsContext must be used within a CardsProvider");
  }
  return context;
};
