import React from 'react'
import { ButtonPanel } from './ButtonPanel'
import { FolderStructure } from './FolderStructure'
import SearchBar from './../SearchBar.jsx';

export const SidePanel = () => {

    return (
        <div 
            className='tree' 
            style={{
            
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                flexWrap: 'nowrap'
            }}
        >
            <SearchBar/>
            <FolderStructure/>
            <ButtonPanel/>
        </div>
    )
}
