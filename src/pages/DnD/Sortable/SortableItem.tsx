
import React, {ReactElement} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import MyDrag from '../MyDrag';

interface Props{
    id: any,
    children: ReactElement;
}

const SortableItem : React.FC<Props> = (props) => {

     const {attributes,listeners,setNodeRef,transform,transition } = 
     useSortable({ id: props.id,
      transition: {
        duration: 150, // milliseconds
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
     })

     const style = {
        transform: CSS.Transform.toString(transform),
        transition,
     }

     const childWithProps = React.cloneElement(props.children, {
      listeners,
     attributes,
    })
   
  return (
    <div ref={setNodeRef} style={style} >
         {/* <MyDrag attributes={attributes} listeners={listeners} id={props.id}/> */}

         {childWithProps}
    </div>
  )
}

export default SortableItem