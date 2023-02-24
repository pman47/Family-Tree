import React, { useState } from 'react'
import { Button ,Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useTreeState } from '../../contexts'
import {style} from './Button';

// export const ExportFamilyBtn = () => {

//   const [open, setOpen] = useState(false)

//   const handleOpen = () => setOpen(true)
//   const handleClose = () => setOpen(false)
 
//   const [data,setData]=useTreeState();
  
//   const printToPdf = () => {
//     handleOpen()
//   };
//   function download(content, fileName, contentType) {
//     const a = document.createElement("a");
//     const file = new Blob([content], { type: contentType });
//     a.href = URL.createObjectURL(file);
//     a.download = fileName;
//     a.click();
//     }   

//     function onDownload(){
//         download(JSON.stringify(data), "FamilyTree.json", "text/plain");
//     }
//   return (
//     <>
//       <Button sx={style}  variant="contained" component="label" onClick={e =>onDownload()}>
//         Export Json
//       </Button>
      
//     </>
//   )

// }

//vishnu
//1. add error hadling incase of failure
//2. added a confirmation dialog ui improvement
//3. on downloading file date is added on each file for ui improvement

export const ExportFamilyBtn = () => {

  const [open, setOpen] = useState(false)
  const [data] = useTreeState()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], {type: 'text/plain'})
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  const handleExport = () => {
    handleClose()
    const timestamp = new Date().toLocaleDateString("de-DE")
    const filename = `family_tree_export_${timestamp}.json`
    // let cleanData = {...data}
    // delete cleanData.value
    const content = JSON.stringify(data, null, 2)
    try {
      downloadFile(filename, content)
    } catch (error) {
      // console.error(error)
      alert('cannot download file')
    }
  }

  return (
    <>
      <Button sx={style}  component="label" onClick={handleOpen}>
        Export JSON
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Export Family Tree?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to export your family tree as a JSON file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
          <Button  variant="contained" color="success" onClick={handleExport}>Export</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
