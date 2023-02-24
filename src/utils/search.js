import { selectClasses } from "@mui/material";
import { useState } from "react";
import { useSelectedNodeState, useTreeState } from "../contexts";


export const SearchFamily=({searchTerm})=>{
    // console.log(searchTerm,"THIS IS THESEARCH TERM");
   
    const [treeState, setTreeDataState] = useTreeState();

  
    const contains = (text, searchTerm) => {
        // console.log(text," ",searchTerm);
        return ( (text.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) || searchTerm===undefined);
    }
    
    const searchLogic=(searchTerm)=>{
      
         
        
            setTreeDataState((prev)=>{
           
            
            //recursion function to return a Set object with all the ID of family member which should not be rendered when searching by Name.
            const recur=(family)=>{
            if(!family)return;
            
            let acc={};
            if (contains(family.Name, searchTerm)) {
                acc={...acc,family};
            } else if (family?.children && family.children.length > 0) {
                let newItems = recur(family.children, searchTerm);
                if (newItems && newItems.length > 0) {
                acc=(acc,{ Name:family.Name, children:newItems});
                }
            }
            return acc;
            }
            const gg=recur(prev);
           
            return gg;

            
            
        });
        
    }
    return {searchLogic}

}