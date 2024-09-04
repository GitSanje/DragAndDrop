
import React, {ReactElement} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import MyDrag from '../MyDrag';
import OverLayItem from './OverLayItem';

interface Props{
    id: any,
    children: ReactElement;
}

const SortableItem : React.FC<Props> = (props) => {

     const {attributes,listeners,setNodeRef,transform,transition, isDragging } = 
     useSortable({ id: props.id,
     
     })

     const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

     const childWithProps = React.cloneElement(props.children, {
      listeners,
     attributes,
    })
    if(isDragging){
      return (<div
          ref={setNodeRef}
          style={style}
          className='
          
           bg-white rounded-md shadow-md mx-8 lg:mx-16 my-5 px-2 py-7
          opacity-40
          border-rose-500
          rounded-md
          border-2
          border-columnBackgroundColor
          bg-columnBackgroundColor
          '
         
        >
          

          
          </div>)
    }
   
  return (
    <div ref={setNodeRef} style={style} >
         {/* <MyDrag attributes={attributes} listeners={listeners} id={props.id}/> */}

         {childWithProps}
    </div>
  )
}

export default SortableItem