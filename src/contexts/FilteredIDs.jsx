import React, { createContext, useContext } from 'react'
import { useState } from 'react'

const FilteredIDContext = createContext(null)

export const FilteredIDs = ({children}) => {

    
    const filteredIdState = useState(new Set())

    return (
        <FilteredIDContext.Provider value={filteredIdState} >
            {children}
        </FilteredIDContext.Provider>
    )
}

export const useFilteredIdState = () => {
    return useContext(FilteredIDContext)
}