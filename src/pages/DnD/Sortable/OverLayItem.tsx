import React from 'react'

interface MyDragProps {
    id: any;
  }

const OverLayItem: React.FC<MyDragProps> = ({ id }) => {
  return (
    <>
    <div className="relative bg-blue-500 rounded-md shadow-md mx-8 lg:mx-16 my-5 px-2 py-2 hover:shadow-lg">
     
     
      <div className="flex items-center justify-between p-2">
        <div className="flex-grow p-5 text-white">
        {id}
        </div>
      </div>
    </div>
      
    </>
  )
}

export default OverLayItem
