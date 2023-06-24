import * as React from 'react';
const { useState } = React;
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';
import {Box, SpeedDial, SpeedDialIcon, SpeedDialAction, TextareaAutosize}  from '@mui/material';
import { Card, CardHeader, Link } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DescriptionIcon from '@mui/icons-material/Description';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import GridOnIcon from '@mui/icons-material/GridOn';
import { GlobalStyles } from '@mui/system';


const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ProjectBox: React.FC = () => {
  
  const [noteContent, setNoteContent] = useState('Content...');
  const actions = [
    { icon: <DescriptionIcon />, name: 'Doc' },
    { icon: <CoPresentIcon />, name: 'Slides' },
    { icon: <GridOnIcon />, name: 'Spreadsheet' },
    { icon: <FileCopyIcon />, name: '??' },
  ];
  const layout: Layout[] = [
    { i: "addButton", x: 40, y: 1.75, w: 2, h: 2, static: true, minW: 2, minH: 2},
    { i: "exampleStickyNote", x: 0, y: 0, w: 7, h: 2, minW: 2, minH: 0, resizeHandles: ['se']},
    { i: "exampleDocLink1", x: 8, y: 0, w: 2, h: 0.5},
    { i: "exampleDocLink2", x: 11, y: 0, w: 2, h: 0.5 },
    { i: "exampleSlideLink", x: 14, y: 0, w: 2, h: 0.5 },
    { i: "exampleSheetLink", x: 17, y: 0, w: 2, h: 0.5 },
  ];
    
  return (
    <>
      <GlobalStyles styles={{

        '.stickyNote > .react-resizable-handle::after': {
          content: '""',
          position: 'absolute',
          right: '3px',
          bottom: '3px',
          width: '5px',
          height: '5px',
          borderRight: '2px solid rgba(0, 0, 0, 0.4)',
          borderBottom: '2px solid rgba(0, 0, 0, 0.4)',
        }
      }}/>

      <Box sx={{height:'620px', transform: 'translateZ(0px)', flexGrow: 1, border: '1px solid grey', borderRadius: 5}}>
        <ResponsiveReactGridLayout 
          className="layout" 
          layouts={{lg: layout}} 
          breakpoints={{lg: 1200}} 
          cols={{lg: 40}} 
          compactType={null} 
          draggableHandle=".dragHandle">
          <Card key='exampleStickyNote' className="stickyNote" variant='outlined' sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200' }}/>
            <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
              <TextareaAutosize
                value={noteContent}
                onChange={(event) => setNoteContent(event.target.value)}
                minRows={3} 
                style={{ width: '100%', height:'100%', border: 'none', 
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '1rem',
                outline: 'none',
                resize: 'none'
                 }} 
              />
            </Box>
          </Card>
          <Box key='exampleDocLink1' 
          className="dragHandle" 
          sx={{ p: 1, 
            border: '1px dashed grey',     
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <DescriptionIcon sx={{fontSize: 40}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover">Google Doc Link</Link>
          </Box>
          <Box key='exampleDocLink2' 
          className="dragHandle" 
          sx={{ p: 1, 
            border: '1px dashed grey',     
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <DescriptionIcon sx={{fontSize: 40}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover">Other Google Doc</Link>
          </Box>
          <Box key='exampleSlideLink' 
          className="dragHandle" 
          sx={{ p: 1, 
            border: '1px dashed grey',     
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <CoPresentIcon sx={{fontSize: 40}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover">Presentation</Link>
          </Box>
          <Box key='exampleSheetLink' 
          className="dragHandle" 
          sx={{ p: 1, 
            border: '1px dashed grey',     
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <GridOnIcon sx={{fontSize: 40}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover">Finances</Link>
          </Box>


          <SpeedDial
            key="addButton"
            ariaLabel="SpeedDial basic example"
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </ResponsiveReactGridLayout>
    </Box>
  </>
  );
  
};

export default ProjectBox;
