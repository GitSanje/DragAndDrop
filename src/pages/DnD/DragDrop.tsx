"use client";
import React, { useState } from "react";

import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import MyDrag from "./MyDrag";

const cardsData = [
  {
    id: "1",

    position: { x: 0, y: 0 },
  },
  {
    id: "2",

    position: { x: 0, y: 0 },
  },
];

const DragDrop = () => {
  const [cards, setCards] = useState(cardsData);

  // const draggableMarkup = (
  //     <Draggable >

  //     </Draggable>
  //   );

  // free moving
  function handleDragEnd(event) {
    const card = cards.find((x) => x.id === event.active.id);
    card.position.x += event.delta.x;
    card.position.y += event.delta.y;

    const updatedCards = cards.map((x) => {
      if (x.id === card.id) return card;
      return x;
    });
    setCards(updatedCards);
  }

  return (
    <div className=" text-black">
      <div className="free">

   
      <DndContext onDragEnd={handleDragEnd}>
        <Droppable>
          {cards.map((card) => [
            <Draggable
              key={card.id}
              id={card.id}
              styles={{
                position: "relative",
                left: `${card.position.x}px`,
                top: `${card.position.y}px`,
              }}
            >
             <MyDrag />
            </Draggable>,
          ])}
        </Droppable>
      </DndContext>
      </div>


    </div>
  );
};

export default DragDrop;



