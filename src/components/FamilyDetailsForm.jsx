import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material'
import { useAddFamily, initialFamilyInfoState } from '../utils';

import { useSelectedNodeState } from '../contexts';
import { type } from '@testing-library/user-event/dist/type';
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const FamilyDetailsForm = ({handleClose = () => {},from}) => {

  const {familyInfo, setFamilyInfoState, addFamily, onPicUpload,setFamilyInfo,updateDetails} = useAddFamily({initialFamilyInfoState, afterAdding: handleClose})
  
  const [selectedNode] = useSelectedNodeState();

  useEffect(()=>{
    let newObj = from ? {} : initialFamilyInfoState
    if(from){
      Object.keys(initialFamilyInfoState).forEach((key) => {
        if(selectedNode){
          newObj[key] = selectedNode[key]
        }
      })
    } 
  setFamilyInfo(newObj)
  },[from,selectedNode])

  return (
    <Box sx={style}>
        <form 
            onSubmit={from ? updateDetails : addFamily}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }} 
        >
            {Object.keys(familyInfo).map((fieldKey, i) => fieldKey !== "Family Photo" && <TextField  key={i} required name={fieldKey}  type={fieldKey === "Birth Year" ? 'number' : 'text'}  variant='outlined' label={fieldKey} value={familyInfo[fieldKey]} onChange={setFamilyInfoState} />)}
            <Button variant="contained" component="label" sx={{textTransform : 'capitalize'}} >
              Upload Pictures
              <input
                  type='file'
                  onChange={onPicUpload}
                  hidden
                  multiple
                  accept="image/*"
              />
            </Button>
            <div>
              {familyInfo["Family Photo"] && familyInfo["Family Photo"].map(src => <img style={{padding : '5px'}} src={src} alt='family' key={src} width = {100} />)}
            </div>
            <div style={{textAlign : 'center'}} >
              <Button variant="contained" type='submit'>{from ? 'update' : 'Add'}</Button>
            </div>
        </form>
    </Box>
  )
}
