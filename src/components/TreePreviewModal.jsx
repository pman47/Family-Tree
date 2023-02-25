import { Button } from '@mui/material';
import React, {useMemo, useRef } from 'react'
import { Tree } from 'react-organizational-chart';
import { useSelectedNodeState, useTreeState } from '../contexts';
import { TreeNode, ChartDiv } from './TreeNode';
import html2pdf from 'html2pdf.js'
import { Modal } from '@mui/material';
import './html2pdf.css'
import { Portal } from './Portal';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '4px',
    overflow : 'auto',
    maxHeight : '90vh',
    maxWidth: '60vw',
    color:'black'
  };
  const savebutton = {
    position: 'absolute' ,
    bottom: '20%',
    left: '46%',
  };
export const TreePreviewModal = ({open,handleClose}) => {

    const [treeState] = useTreeState()
    const [selectedNode] = useSelectedNodeState()

    const selectedLevelTree = useMemo(() => {
            const clone = {...treeState}
            let currentNode = clone
            selectedNode?.ancentors && selectedNode.ancentors.forEach((node, i)=> {
              if(i !== 0){
                currentNode = currentNode.children[node]
              }
            })
        return currentNode
    }, [treeState, selectedNode])

    const treeContainerEl = useRef()
    
    // const savePdf = () => {
    //     html2canvas(document.getElementById('tree-chart'),{ scrollY: -window.scrollY, scrollX: -window.scrollX }).then(canvas => {
    //     const data = canvas.toDataURL();
    //     console.log('canvad',canvas);
    //     console.log( treeContainerEl.current?.clientWidth);
    //     const pdfExportSetting = {
    //             content: [
    //                 {
    //                     image: data,
    //                     width: treeContainerEl.current?.clientWidth || 500,
    //                 }
    //             ],
    //             pageSize: 'A3',
    //             pageOrientation: 'landscape',
    //             margins: [20, 20, 20, 20]
    //         };
      
    //         pdfMake.createPdf(pdfExportSetting).download("family-tree.pdf");
    //     });
    // }


    //vishnu
    const savePdf = () =>{
      const element = document.getElementById('tree-chart')
      const opt = {
        margin:       1,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2,width:element.scrollWidth,height:element.scrollHeight },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' },
       
      }
      html2pdf().set(opt).from(element).save('family-tree.pdf')
    } 

    return (
        
        <Portal>
        <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <>
            <div style={style} >
                <div style={{height: '40vh', minWidth : '34vw'}} id='tree-chart'   ref={treeContainerEl}   >
                    <Tree label = {<ChartDiv>{selectedLevelTree?.Name}</ChartDiv>} >
                        {selectedLevelTree?.children && Object.values(selectedLevelTree.children).map(childNode => <TreeNode key={childNode.id} node ={childNode}/>)}
                    </Tree>
                </div>
                
          </div>
          <Button onClick={savePdf} style={savebutton} variant="contained" >Save PDF</Button>
          </>
        </Modal>
      </Portal>

        
    )
}
