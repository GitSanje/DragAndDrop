import React, { useState } from 'react';

import { DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
 } from '@dnd-kit/core';

import { SortableContext ,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import MyDrag from '../MyDrag';


export function MultipleContainer(){

    const [items1, setItems1] = useState(['A', 'B', 'C']);
    const [items2, setItems2] = useState(['X', 'Y', 'Z']);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

   return (
    <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={}
    >
  <div className="flex gap-2">

    <SortableContext items={items1}
     strategy={verticalListSortingStrategy}>
         {items1.map((id) => (
            <SortableItem key={id} id={id}>
              <MyDrag id={id} />
            </SortableItem>
          ))}

     </SortableContext>
    <SortableContext items={items1}
     strategy={verticalListSortingStrategy}>
         {items1.map((id) => (
            <SortableItem key={id} id={id}>
              <MyDrag id={id} />
            </SortableItem>
          ))}

     </SortableContext>

  </div>
    </DndContext>
   )
}

 