import * as React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import {Box, SpeedDial, SpeedDialIcon, SpeedDialAction}  from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ProjectBox: React.FC = () => {
  
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <FileCopyIcon />, name: 'Copy2' },
    { icon: <FileCopyIcon />, name: 'Copy3' },
    { icon: <FileCopyIcon />, name: 'Copy4' },
  ];
  
    
  return (
    <Box sx={{ height:500, transform: 'translateZ(0px)', flexGrow: 1, border: '1px solid grey', borderRadius: 5}}>
      <ResponsiveReactGridLayout>
      </ResponsiveReactGridLayout>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
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
  </Box>

  );
  
};

export default ProjectBox;
