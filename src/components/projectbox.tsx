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

  const layout = [
    { i: "addButton", x: 11.45, y: 1.1, w: 0.5, h: 0.5, static: true },
  ];

    
  return (
    <Box sx={{ height:500, transform: 'translateZ(0px)', flexGrow: 1, border: '1px solid grey', borderRadius: 5}}>
      <ResponsiveReactGridLayout className="layout" layouts={{lg: layout}} breakpoints={{lg: 1200}} cols={{lg: 12}}>
        <div key="addButton">
          <SpeedDial
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
        </div>
      </ResponsiveReactGridLayout>
  </Box>

  );
  
};

export default ProjectBox;
