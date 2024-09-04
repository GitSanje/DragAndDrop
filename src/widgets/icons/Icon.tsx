import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faChrome, faSpotify, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';



interface Props{
    color: string,
    icon: string,
    listeners:any,
    attributes: any
}

const iconMap: any = {
    chrome: faChrome,
    spotify: faSpotify,
    vscode: faMicrosoft,
    fileExplorer: faFolderOpen
  };
  

const Icon: React.FC<Props> = ({icon, color, listeners,attributes }) => {
  return (
    <div className='p-2 hover:bg-gray-600 rounded-md '{...listeners} {...attributes}>
        
        <FontAwesomeIcon
        icon={iconMap[icon]}
        style={{ color: color ,
            width: "40px", height:"40px"}}
       
        />
      
    </div>
  )
}

export default Icon