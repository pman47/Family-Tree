import './App.css';
import { FamilyDetailsContainer, SidePanel } from './components';
import { SelectionContext, TreeStateContext,FilteredIDs } from './contexts';
import { SearchText } from './contexts/SearchText';
import Switch from '@mui/material/Switch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';


const label = { inputProps: { 'aria-label': 'Switch demo' } };



function App() {
  const[darkMode,setDarkMode] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark':'light',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div id='App' >
      <TreeStateContext>
        <SelectionContext>
          <FilteredIDs>
            <SearchText>
            <Switch {...label}  defaultChecked onChange={()=>setDarkMode(!darkMode)} />
              <SidePanel/>
              <FamilyDetailsContainer/>
            </SearchText>
          </FilteredIDs>
        </SelectionContext>
      </TreeStateContext>
    </div>
    </ThemeProvider>
  );
}

export default App;