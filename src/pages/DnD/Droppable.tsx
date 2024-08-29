
'use client'
import { useDroppable } from '@dnd-kit/core'
import React,{ReactNode} from 'react'

interface DroppableProps {
    children: ReactNode;
  }
  

const Droppable: React.FC<DroppableProps> = (props) => {

    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
      });
   
      const style = {
        color: isOver ? 'green' : undefined,
      };
   
    
  return (
<div ref={setNodeRef} style={style}>
    {props.children}
  </div>
  )
}

export default Droppable