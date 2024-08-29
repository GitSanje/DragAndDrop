
import React, {ReactElement} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import MyDrag from '../MyDrag';

interface Props{
    id: number,
    children: ReactElement;
}

const SortableItem : React.FC<Props> = (props) => {

     const {attributes,listeners,setNodeRef,transform,transition } = 
     useSortable({ id: props.id})

     const style = {
        transform: CSS.Transform.toString(transform),
        transition,
     }

    //  const childWithProps = React.cloneElement(props.children, {

    //  })
  return (
    <div ref={setNodeRef} style={style} >
         <MyDrag attributes={attributes} listeners={listeners} id={props.id}/>
    </div>
  )
}

export default SortableItem