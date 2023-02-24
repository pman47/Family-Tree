import { Button, Modal, Typography, Box, ButtonGroup} from '@mui/material'

import React from 'react'

import { useDeleteFamily } from '../utils';
import {useSearchTextState } from "../contexts";
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius:"12px",
    bgcolor: 'background.paper',
    border: '2px solid #ff8a8a',
    boxShadow: 24,
    p: 4,
  };

export const DeleteFamilyModal = ({open,setOpen}) => {

    const [term,setTerm]=useSearchTextState();
    const handleClose = () => {
        setOpen(false);
        setTerm(term);
    }

  const {deleteFamily}=useDeleteFamily({afterAdding: handleClose});
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography >Are you sure you want to delete this family member and all of its children? </Typography>
            <ButtonGroup sx={{position: 'relative' ,left: '50%',transform: 'translate(-50%,30%)'}} variant="contained" size="small" aria-label="outlined primary button group">
                <Button variant="contained" onClick={deleteFamily}>Yes</Button>
                <Button variant="contained">No</Button>
            </ButtonGroup>
        </Box>
      </Modal>
    </>
  )
}
