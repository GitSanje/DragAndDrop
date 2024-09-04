import PlusIcon from "@/widgets/icons/PlusIcon";
import React, { useMemo, useState } from "react";
import type { Column, Id } from "types/types";
import { v4 as uuid } from "uuid";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import {
    arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanBanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeCol, setActiveCol] = useState<Column | null>(null);

 
  console.log(activeCol);
  
  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: uuid(),
      title: `Column ${columns.length}`,
    };

    setColumns((prev) => [...prev, columnToAdd]);
  };

  const deleteColumn = (id: Id) => {

    setColumns((prev) => prev.filter((col) => col.id !== id));
    console.log(id);
    
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveCol(event.active.data.current.column);
      return;
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over} = event
    if (!over || active.id === over.id)  return;

    setColumns((items) => {
        const activeIdx = items.findIndex((item) => item.id === active.id);
        const overIdx = items.findIndex((item) => item.id === over.id);
    
        return arrayMove(items, activeIdx, overIdx); 
      });
  }

  return (
    <div
      className="m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]"
    >
      <DndContext onDragStart={handleDragStart}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext
              items={columnsId}
              id={columnsId}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map((column) => (
                <>
                  <ColumnContainer
                    key={column.id}
                    column={column}
                    deleteColumn={deleteColumn}
                  />
                </>
              ))}
            </SortableContext>
          </div>

          <button
            onClick={() => {
              createNewColumn();
            }}
            className="
                flex
                h-[60px]
                w-[350px]
                min-w-[350px]
                cursor-pointer
                gap-2
                rounded-lg
                border-2
                border-columnBackgroundColor
                bg-mainBackgroundColor
                p-4
                text-lg
                text-white
                ring-rose-500
                hover:ring-2
                "
          >
            <PlusIcon />
            Add column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeCol ? (
              <ColumnContainer column={activeCol} deleteColumn={deleteColumn} />
            ) : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default KanBanBoard;
