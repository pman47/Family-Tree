import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { AddFamilyModalView } from '../AddFamilyModalView';
import {style} from './Button';
export const AddFamilyBtn = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
 
  return (
    <>
      <Button sx={style}  component="label" onClick={handleOpen} >
        Add Family
      </Button>
      
      <AddFamilyModalView open={open} setOpen={setOpen} />
      
    </>
  )
}
