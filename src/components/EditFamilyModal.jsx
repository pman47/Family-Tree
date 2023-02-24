import { Modal } from '@mui/material'
import React from 'react'
import { FamilyDetailsForm } from './FamilyDetailsForm';

export const EditFamilyModal = ({open,setOpen}) => {
  
    const handleClose = () => setOpen(false)
  return (
    <>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <div>
            <FamilyDetailsForm handleClose={handleClose} from/>
          </div>
        </Modal>
  </>
  )
}

// export default EditFamilyModal
