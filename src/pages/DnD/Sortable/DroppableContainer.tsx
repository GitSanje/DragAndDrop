import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableItem from "./SortableItem"
import MyDrag from "../MyDrag"

const DroppableContainer = ({ id, items} : any) => {

    const { setNodeRef }= useDroppable({
      id,
    })
  
    return (
   
        <SortableContext
        items={items}
        id={id}
        strategy={verticalListSortingStrategy}>
            <div ref={setNodeRef} className={`flex flex-col w-full border p-2 `}>
                {
                    items.length > 0 ?

                    items.map((id :any) => (
                        <SortableItem key={id} id={id}>
                            <MyDrag id={id}/>
                        </SortableItem>
                    ))

                    :
                    ( <div className="empty-placeholder">Drop here</div>)
                }

            </div>

        </SortableContext>
  
 
    )
  
  }

export default DroppableContainer