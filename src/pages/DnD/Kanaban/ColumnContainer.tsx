import { useSortable } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { Column, Id } from "types/types";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "@/widgets/icons/PlusIcon";
interface Pros {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

const ColumnContainer: React.FC<Pros> = (props) => {
  const { column, deleteColumn,updateColumn } = props;
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
      
    },
    disabled: editMode
  });


  
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
     
          flex
          h-[500px]
          max-h-[500px]
          w-[350px]
     
          flex-col
          gap-2
          rounded-md
          border-2
          border-columnBackgroundColor
          border-rose-500
          bg-columnBackgroundColor
          opacity-40
          
      "
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    flex
        flex
        h-[500px]
        max-h-[500px]
        w-[350px]
        cursor-pointer
        flex-col
        gap-2
        rounded-md
        border-2
        border-columnBackgroundColor
        bg-columnBackgroundColor
        
    "
    >
      <div
     onClick={() => {
            
              setEditMode(true);
            
          }}
        {...listeners}
        {...attributes}
       
        className="text-md flex justify-between items-center h-[60px] cursor-grab  gap-4 rounded-md rounded-b-none border-4 border-columnBackgroundColor bg-mainBackgroundColor p-3 font-bold"
      >
        {/* Draggable Area */}
        <div className="flex  gap-4">
          <div className="">0</div>
          {!editMode && (
            <div
              className="cursor-text"
            //   onClick={() => setEditMode(true)} 
            >
              {column.title}
            </div>
          )}
          {editMode && (
            <input
            className="bg-black 
            focus:border-rose-500
             border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if(e.key !== "Enter") return;
                setEditMode(false)
              }}
            />
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={() =>{
             deleteColumn(column.id)
            }}
          className="stroke-gray-500 hover:stroke-white
          px-1
          py-2 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow">content</div>

      {/* Column footer */}
      <div className="
      flex gap-2 items-center border-columnBackgroundColor
      border-2 rounded-md p-4 border-x-columnBackgroundColor 
      hover:bg-mainBackgroundColor hover:text-rose-500
      ">
        <PlusIcon/>
        Add Task

      </div>
    </div>
  );
};

export default ColumnContainer;
