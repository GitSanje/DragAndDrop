//https://github.com/clauderic/dnd-kit/discussions/809
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import Icon from "@/widgets/icons/icon";

import DroppableContainer from "./DroppableContainer";
import SortableItem from "./SortableItem";
import MyDrag from "../MyDrag";
import OverLayItem from "./OverLayItem";

const iconsData = [
  { id: 1, icon: "chrome", color: "#4285F4" },
  { id: 2, icon: "fileExplorer", color: "#FFD700" },
  { id: 3, icon: "spotify", color: "#1DB954" },
  { id: 4, icon: "vscode", color: "#007ACC" },
];

const defaultAnnouncements = {
  onDragStart(id:any) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  }
};



const Sortable = () => {
  const [items, setItems] = useState({
    container1: ["1", "2", "3"],
    container2: ["4", "5", "6"]
  })

  const [activeId, setActiveId] = useState();
  const [overId, setOverId] = useState();

  const [icons, setIcons] = useState(iconsData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );


  const handleDragEndIcon = (event: any) => {
    const { active, over } = event;
    if (active.id && over && active.id !== over.id) {
      setIcons((icons) => {
        const oldIndex = icons.findIndex((icon) => icon.id === active.id);
        const newIndex = icons.findIndex((icon) => icon.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(icons, oldIndex, newIndex);
        }
        return icons;
      });
    }
  };

  function findContainer(id:any) {
      // Check if the id directly matches a container (key in the 'items' object)
    if( id in items){
      return id;
    }
      // If id is not a container, search through the containers to see if any contain this item
    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event:any){
    const { active} = event
    setActiveId(active.id)
  }


  function handleDragOver(event:any){
    const { active, over, draggingRect } = event;
    console.log(event);
    setOverId(over.id)
    
    const { id } = active;
    const { id: overId } = over
   
     // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev:any) => {

      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

       // Find the indexes for the items
       const activeIndex = activeItems.indexOf(id);
       const overIndex = overItems.indexOf(overId);

       let newIndex;

       if(overId in prev){
        // We're at the root droppable of a container
        newIndex = overItems.lenght +1;
       }
       else{
        //If the dragged item is below the last item, it is inserted after the last item.
         const isBelowLastItem =
           over && 
           overIndex === overItems.length - 1 //&& 
           //draggingRect.offsetTop > over.react.offsetTop + over.rect.height;
           
           const modifier = isBelowLastItem ? 1 : 0;
           //If the dragged item is not below the last item, it is inserted at the position of the item it's hovering over.
           newIndex = overIndex >=0 ? overIndex + modifier : overItems.length + 1;
          //  console.log("Over:", over);
          //  console.log("Over React:", over.react);
          //  console.log("Over Rect:", over.rect.offsetTop);
          //  console.log("Dragging Rect:", draggingRect);
           
       }

       return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) =>item !== active.id)
        ],

        [overContainer]: [
          ...prev[overContainer].slice(0,newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)


        ]
       }

    })

  }


  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if(activeIndex !== overIndex){
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer],activeIndex,overIndex)
      }))
    }

  }


  

  return (
    <>
      <DndContext
        announcements={defaultAnnouncements}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col md:flex-row ">
         <DroppableContainer
         id="container1"
         items={items.container1}
         />
         <DroppableContainer
         id="container2"
         items={items.container2}
         />
                  <DragOverlay>
                    {activeId ? <MyDrag id={activeId} /> : null}
                 
                  </DragOverlay>
         
        </div>
      </DndContext>




      <h2 className="mx-7 pb-3 text-xl font-bold mt-16 ">
        {" "}
        Horizontal drag drop like in window bar
      </h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEndIcon}
      >
        <SortableContext items={icons} strategy={horizontalListSortingStrategy}>
          <div className="mx-7 flex gap-5 rounded-md  bg-gray-700 px-4 py-1">
            {icons.map((iconObj) => (
              <SortableItem key={iconObj.id} id={iconObj.id}>
                <Icon
                  key={iconObj.id}
                  icon={iconObj.icon}
                  color={iconObj.color}
                />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default Sortable;


