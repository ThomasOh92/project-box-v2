import * as React from 'react';
const { useState } = React;
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';
import {Box, SpeedDial, SpeedDialIcon, SpeedDialAction, TextareaAutosize, ButtonBase, Typography, Link}  from '@mui/material';
import { Card, CardHeader, CardContent } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { GlobalStyles } from '@mui/system';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import GridOnIcon from '@mui/icons-material/GridOn';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { OverridableComponent } from '@mui/material/OverridableComponent';


const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface LinkProps {
  url: string;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  key: string;
}

const DraggableLinkCard: React.FC<LinkProps> = ({ title, icon: Icon, url, key }) => {
  return (
    <Card key={key} variant='outlined'>
      <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200' }}/>
      <CardContent>
        <ButtonBase sx={{flexDirection: 'column' }}>
          <Icon />
          <Link href={url} underline="none">
            <Typography>{title}</Typography>
          </Link>
        </ButtonBase>
      </CardContent>
    </Card>
  );
};




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
    { i: "exampleStickyNote", x: 0, y: 0, w: 7, h: 2, minW: 2, minH: 0, resizeHandles: ['se']},
    { i: "exampleDocLink1", x: 8, y: 0, w: 2, h: 2, },
    { i: "exampleDocLink2", x: 12, y: 0, w: 2, h: 2 },
    { i: "exampleSlideLink", x: 16, y: 0, w: 2, h: 2 },
    { i: "exampleSheetLink", x: 20, y: 0, w: 2, h: 2 },
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
          <Card key='exampleStickyNote' variant='outlined' sx={{ display: 'flex', flexDirection: 'column' }}>
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
          <DraggableLinkCard key='exampleDocLink1' title='Google Doc 1' icon={DescriptionIcon} url='https://docs.google.com/document/d/your-doc-id' />
          <DraggableLinkCard key='exampleDocLink2' title='Google Doc 2' icon={DescriptionIcon} url='https://docs.google.com/presentation/d/your-slide-id' />
          <DraggableLinkCard key='exampleSlideLink' title='Google Slide' icon={SlideshowIcon} url='https://docs.google.com/spreadsheets/d/your-sheet-id' />
          <DraggableLinkCard key='exampleSheetLink' title='Google Sheet' icon={GridOnIcon} url='https://docs.google.com/spreadsheets/d/your-sheet-id' />

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
