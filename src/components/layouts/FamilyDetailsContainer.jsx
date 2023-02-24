import React from 'react'
import { useSelectedNodeState } from '../../contexts'
import { initialFamilyInfoState } from '../../utils'
import { LayoutHeader } from '../LayoutHeader'

const Label = ({label, value}) => {
  
  return(
    <div
      style={label !== "Family Photo"? {
        display: 'flex',
        alignItems : 'center',
        margin: '10px',
        width: '100%'
      }:{
        display: 'flex',
        flexDirection:'column',
        margin: '10px',
        width: '100%'
      }}
    >
      <div 
        style={{
          minWidth: '25%', 
          display : 'flex', 
          justifyContent : 'space-between', 
          alignItems : 'center'
        }} 
      >
      <p style={{fontSize: '1.2rem'}} >{label}</p> {label !== "Family Photo" && <span>:</span>}
      </div>
      {label !== "Family Photo" ? 
        <div style={{marginLeft : '8px'}}><p style={{fontSize: '1.2rem'}} >{value}</p></div>
         :
          <div
           style={{
            width: 'auto',
            height: '200px',
            border: '1px solid black'
           }}
          >
            {value?.map((src,i) =>  <img src={src} alt={"Family"} key={i} style={{width: '100%', height: '100%', objecFit: 'cover'}} />)}
          </div>}
    </div>
  )
}

const FamilyDetails = () => {
  
  const [selectedNode] = useSelectedNodeState()
 
  return(
    <>
      <div
        style={{
          display: 'flex',
          alignItems : 'center',
          gap: '10px',
          padding: '10px'
        }}
      >
        <div>
          {selectedNode && Object.keys(initialFamilyInfoState).map((key,index) => {
            return(
                selectedNode[key] && <Label key={key.id ? key.id : index } label={key} value={selectedNode[key]}/>     
            )
          })}
        </div>
      </div>
    </>
  )
}


export const FamilyDetailsContainer = () => {

  return (
    <div
        style={{
            flexGrow: '1',
            backgroundColor:'red',
            background: 'linear-gradient(#fdd835,rgb(33 29 29 / 0%))',
            border: '1px solid rgb(117, 117, 117)',
            borderRadius:'20px',
            padding:'10px',
            lineHeight: '1.5'
            
        }}
    >

        <LayoutHeader style={{marginTop:'12px'}}header={'Family Details'} />
        <hr style={{
            border:'none',
            marginTop:'15px',
            
            height: '0px',
            boxShadow:'0 1px 2px 1px #8789f3',
            width:'95%',
            margin:'auto auto'
         }}/>

        <FamilyDetails/>
    </div>
  )
}
