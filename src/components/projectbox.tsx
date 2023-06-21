import * as React from 'react';
const { useState } = React;
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';
import {Box, SpeedDial, SpeedDialIcon, SpeedDialAction, TextareaAutosize}  from '@mui/material';
import { Card, CardHeader, CardContent } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { GlobalStyles } from '@mui/system';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ProjectBox: React.FC = () => {
  
  const [noteContent, setNoteContent] = useState('Content...');
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <FileCopyIcon />, name: 'Copy2' },
    { icon: <FileCopyIcon />, name: 'Copy3' },
    { icon: <FileCopyIcon />, name: 'Copy4' },
  ];
  const layout: Layout[] = [
    { i: "addButton", x: 40, y: 1.75, w: 2, h: 2, static: true, minW: 2, minH: 2},
    { i: "stickyNote", x: 0, y: 0, w: 7, h: 2, minW: 2, minH: 0, resizeHandles: ['se']},
  ];

    
  return (
    <>
      <GlobalStyles styles={{
        '.react-resizable-handle': {
          backgroundImage: 'none',
          padding: '0',
        },
        '.react-grid-item > .react-resizable-handle.react-resizable-handle-n, .react-grid-item > .react-resizable-handle.react-resizable-handle-e, .react-grid-item > .react-resizable-handle.react-resizable-handle-s, .react-grid-item > .react-resizable-handle.react-resizable-handle-w, .react-grid-item > .react-resizable-handle.react-resizable-handle-ne, .react-grid-item > .react-resizable-handle.react-resizable-handle-nw, .react-grid-item > .react-resizable-handle.react-resizable-handle-se, .react-grid-item > .react-resizable-handle.react-resizable-handle-sw': {
          transform: 'none',
          margin: '0',
          position: 'absolute',
          width: '20px',
          height: '20px',
          right: '3px',
          bottom: '3px',
        },
        '.react-grid-item > .react-resizable-handle::after': {
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
          <Card key='stickyNote' variant='outlined' sx={{ display: 'flex', flexDirection: 'column' }}>
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
