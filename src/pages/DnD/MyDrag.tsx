
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

interface MyDragProps {
  listeners?: any;
  attributes?: any;
  id: any
}

const MyDrag : React.FC<MyDragProps> = ({listeners,attributes,id}) => {
  return (
    <>
    
    
    <div className=" relative bg-white rounded-md shadow-md mx-8 lg:mx-16 my-5 px-2 hover:border hover:border-gray-500 hover:shadow-lg">
        <div className="cursor-grab w-full absolute top-0 left-0 " {...listeners} {...attributes}>
        <FontAwesomeIcon 
            icon={faGripVertical} 
            className='text-gray-500'
            style={{ width: '15px', height: '15px' }} 
          />
        </div>
    <div className="flex items-center justify-between  p">
        <div className="cursor-grab ">
        
        </div>
        <div className="flex-grow p-5">
          Heloo {id}
        </div>
      </div>
    </div>
    </>
  );
};

export default MyDrag;
