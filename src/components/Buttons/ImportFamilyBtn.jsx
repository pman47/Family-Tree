import React, { useState,useRef} from 'react'
import { Button } from '@mui/material'

import { useTreeState,useSelectedNodeState } from '../../contexts';
import {style} from './Button';

// export const ImportFamilyBtn = () => {

//   const [open, setOpen] = useState(false)

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const inputRef = useRef(null);

//   const [data,setData]=useTreeState();
  
//   const upload=(e)=>{
//     var fr = new FileReader();
//     fr.onload = function(e) { 
      
//           var result = JSON.parse(e.target.result);
//           var formatted = JSON.stringify(result, null, 2);
//           result.value = formatted;

//           console.log(result);
//           setData(result);
         
          
//         }

//     fr.readAsText(e.target.files.item(0));
    
//  }
 
//   return (
//     <>
//         <input id="upload" ref={inputRef} type="file" style={{display: 'none'}} onChange={upload}/> 
        
//         <Button   sx={style}   onClick={(e)=> inputRef.current.click()} variant="contained">Import Json</Button>    
       
//       {/* <Button variant="contained" component="label" onClick={e =>upload}>
//         Export Json
//       </Button> */}
      
//     </>
//   )

// }


//vishnu
//1. added check if it is json
//2. added drag and drop for easy to users
//3. button text changes dynamically for users to know whether uploadig or ot
//4. on the code earlier state updation was taking place on eveytime the user select a file so it has changed now it will only change when the file is sucessfully updated

export const ImportFamilyBtn = () => {
  // const [setOpen] = useState(false)
  const [selectedNode,setSelectedNode] = useSelectedNodeState()
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef(null)
  const [data,setData] = useTreeState()

  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  const handleFileUpload = (file) => {
    const fr = new FileReader()
    fr.onload = function (e) {
      try {
        const result = JSON.parse(e.target.result)
        const formatted = JSON.stringify(result, null, 2)
        result.value = formatted

        // console.log(result)
        setData(result)
        setSelectedNode(result)
      } catch (error) {
        // console.error('Error parsing JSON:', error)
        alert('Invalid JSON file')
      } finally {
        setIsUploading(false)
      }
    };

    fr.readAsText(file)
  }

  const handleUploadClick = () => {
    inputRef.current.click()
  }

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      handleFileUpload(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setIsUploading(true)
      handleFileUpload(file)
    }
  };

  return (
    
       <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
       >
          <input
            id="upload"
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleInputChange}
          />
          <Button sx={style} onClick={handleUploadClick}  disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Import JSON'}
          </Button>
        </div>
  );
};

