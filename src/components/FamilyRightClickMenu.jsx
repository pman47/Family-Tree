import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AddFamilyModalView } from './AddFamilyModalView';
import { DeleteFamilyModal } from './DeleteFamilyModal.jsx';
import { TreePreviewModal } from './TreePreviewModal';
import {EditFamilyModal} from './EditFamilyModal';

const style={
    //backgroundColor:'#e7f5ec',
    // color:'black',
    border:'0px',
    marginTop:'0px',
    marginBottom:'0',
    paddingTop:'0px',
    fontSize:11,
    
}
export function FamilyRightClickMenu({anchorEl,setAnchorEl,depth}) {
    
    
    const open = Boolean(anchorEl);

    const [AddFamilyToggle,setOpenToggle]=React.useState(false);

    const [EditFamilyToggle,setOpenEditToggle]=React.useState(false);

    const [DeleteFaimlyToggle,setDeleteToggle]=React.useState(false);

    const [TreeViewToggle,setTreeViewToggle]=React.useState(false);
    
    const handleCloseTreeView=()=>{
        setTreeViewToggle(false);
    }

  
    const handleClose = () => {
     
      setAnchorEl(null);
    };
    // console.log("THIS IS ANCHOR,",anchorEl)
    return (
        <>
      <div>
     
        
        <Menu
          sx={{
            marginLeft:`${15*(depth+1)}px`,
            paddingTop:'0',
            
          }}
          
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={
            handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem sx={style} onClick={(e)=>{handleClose();setOpenToggle(true)}}>Add Family Member</MenuItem>
          <MenuItem sx={style} onClick={(e)=>{handleClose();setOpenEditToggle(true)}}>Edit Family</MenuItem>{/*vishnu*/ }
          <MenuItem sx={style} onClick={(e)=>{handleClose();setDeleteToggle(true)}}>Delete Family Member</MenuItem>
          <MenuItem sx={style} onClick={(e)=>{handleClose();setTreeViewToggle(true)}}>Print Family Member</MenuItem>
        </Menu>
      </div>

      {<AddFamilyModalView open={AddFamilyToggle} setOpen={setOpenToggle}/>}
      {<EditFamilyModal open={EditFamilyToggle} setOpen={setOpenEditToggle} />}{/*vishnu*/ }
      {<DeleteFamilyModal open={DeleteFaimlyToggle} setOpen={setDeleteToggle} />}
      {<TreePreviewModal open={TreeViewToggle} handleClose={handleCloseTreeView}/>}
      </>
    );
}
