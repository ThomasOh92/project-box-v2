import * as React from 'react';
const { useState } = React;
import { WidthProvider, Responsive } from 'react-grid-layout';
import {Box, SpeedDial, SpeedDialIcon, SpeedDialAction, TextField}  from '@mui/material';
import { Card, CardHeader, CardContent } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { grey } from '@mui/material/colors';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ProjectBox: React.FC = () => {
  
  const [noteContent, setNoteContent] = useState('Content...');
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <FileCopyIcon />, name: 'Copy2' },
    { icon: <FileCopyIcon />, name: 'Copy3' },
    { icon: <FileCopyIcon />, name: 'Copy4' },
  ];
  const layout = [
    { i: "addButton", x: 40, y: 1.75, w: 2, h: 2, static: true, minW: 2, minH: 2},
    { i: "stickyNote", x: 0, y: 0, w: 7, h: 2, minW: 2, minH: 0},
  ];

    
  return (
    <Box sx={{height:'620px', transform: 'translateZ(0px)', flexGrow: 1, border: '1px solid grey', borderRadius: 5}}>
      <ResponsiveReactGridLayout 
        className="layout" 
        layouts={{lg: layout}} 
        breakpoints={{lg: 1200}} 
        cols={{lg: 40}} 
        compactType={null} 
        draggableHandle=".dragHandle">
        <Card key='stickyNote' variant='outlined'>
          <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200' }}/>
          <CardContent>
            <TextField
              value={noteContent}
              onChange={(event) => setNoteContent(event.target.value)}
              fullWidth
              multiline
              rows="10"
              variant='standard'
            />
          </CardContent>
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

  );
  
};

export default ProjectBox;
