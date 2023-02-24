import React, { createContext, useContext } from 'react'
import { useState } from 'react'

const SearchTextContext = createContext(null)

export const SearchText = ({children}) => {

    
    const searchText = useState()

    return (
        <SearchTextContext.Provider value={searchText} >
            {children}
        </SearchTextContext.Provider>
    )
}

export const useSearchTextState = () => {
    return useContext(SearchTextContext)
}