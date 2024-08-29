
'use client'
import React,{ReactElement} from 'react'

import {useDraggable} from '@dnd-kit/core';

import {CSS} from '@dnd-kit/utilities';
import MyDrag from './MyDrag';

interface DroppableProps {
    children: ReactElement;
    styles: React.CSSProperties,
    id: number
  }

const Draggable: React.FC<DroppableProps> = ({id, styles, children}) => {
    const {attributes,listeners, setNodeRef, transform} = useDraggable({
        id: id,
      });

      const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }: {};

   
      const childWithProps = React.cloneElement(children, {
        listeners,
       attributes,
      })
     
      
  return (
    <div ref={setNodeRef} style={{...style, ...styles}} 
    >
       
        {childWithProps}

    </div>
  )
}

export default Draggable