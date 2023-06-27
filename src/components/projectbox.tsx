import * as React from 'react';
const { useState } = React;
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';
import {Box, SpeedDial, SpeedDialIcon, SpeedDialAction, TextareaAutosize, Button, TextField, Modal}  from '@mui/material';
import { Card, CardHeader, Link } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import GridOnIcon from '@mui/icons-material/GridOn';
import LinkIcon from '@mui/icons-material/Link';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { GlobalStyles } from '@mui/system';


const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ProjectBox: React.FC = () => {
  
  const [noteContent, setNoteContent] = useState('Content...');

  const [modalGoogleDocOpen, setModalGoogleDocOpen] = React.useState(false);
  const handleModalOpenGoogleDoc = () => setModalGoogleDocOpen(true);
  const handleModalCloseGoogleDoc = () => setModalGoogleDocOpen(false);

  const [modalGoogleSlideOpen, setModalGoogleSlideOpen] = React.useState(false);
  const handleModalOpenGoogleSlide = () => setModalGoogleSlideOpen(true);
  const handleModalCloseGoogleSlide = () => setModalGoogleSlideOpen(false);

  const [modalGoogleSheetOpen, setModalGoogleSheetOpen] = React.useState(false);
  const handleModalOpenGoogleSheet = () => setModalGoogleSheetOpen(true);
  const handleModalCloseGoogleSheet = () => setModalGoogleSheetOpen(false);

  const [modalLinkOpen, setModalLinkOpen] = React.useState(false);
  const handleModalOpenLink = () => setModalLinkOpen(true);
  const handleModalCloseLink = () => setModalLinkOpen(false);

  const [modalStickyNoteOpen, setModalStickyNoteOpen] = React.useState(false);
  const handleModalOpenStickyNote = () => setModalStickyNoteOpen(true);
  const handleModalCloseStickyNote = () => setModalStickyNoteOpen(false);

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',

  };
  

  const actions = [
    { icon: <DescriptionIcon />, name: 'Google Doc', click: handleModalOpenGoogleDoc},
    { icon: <CoPresentIcon />, name: 'Google Slides', click: handleModalOpenGoogleSlide },
    { icon: <GridOnIcon />, name: 'Google Sheet', click: handleModalOpenGoogleSheet },
    { icon: <LinkIcon />, name: 'Link', click: handleModalOpenLink },
    { icon: <StickyNote2Icon />, name: 'Sticky Note', click: handleModalOpenStickyNote }
  ];
  const layout: Layout[] = [
    { i: "addButton", x: 37.5, y: 0.7, w: 2, h: 3, static: true, minW: 2, minH: 2},
    { i: "exampleStickyNote", x: 0, y: 0, w: 7, h: 2, minW: 2, minH: 0, resizeHandles: ['se']},
    { i: "exampleDocLink1", x: 8, y: 0, w: 2, h: 0.5, minH: 0},
    { i: "exampleDocLink2", x: 11, y: 0, w: 2, h: 0.5, minH: 0},
    { i: "exampleSlideLink", x: 14, y: 0, w: 2, h: 0.5, minH: 0 },
    { i: "exampleSheetLink", x: 17, y: 0, w: 2, h: 0.5, minH: 0},
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
        },
        '.react-grid-item' : {
          zIndex: 3,
          transition: 'all 400ms ease',
        },
        '.react-grid-placeholder': {
          background: 'red',
          opacity: 0.2,
          transitionDuration: '250ms',
          zIndex: 2,
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
                fontSize: '10',
                outline: 'none',
                resize: 'none'
                 }} 
              />
            </Box>
          </Card>
          <Box key='exampleDocLink1' 
          className="dragHandle" 
          sx={{ 
            border: '1px dashed grey',     
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <DescriptionIcon sx={{fontSize: 40}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover" target="_blank">Google Doc Link</Link>
          </Box>
          <Box key='exampleDocLink2' 
          className="dragHandle" 
          sx={{ 
            border: '1px dashed grey',     
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <DescriptionIcon sx={{fontSize: 40}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover" target="_blank">Other Google Doc</Link>
          </Box>
          <Box key='exampleSlideLink' 
          className="dragHandle" 
          sx={{ 
            border: '1px dashed grey',     
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <CoPresentIcon sx={{fontSize: 40}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover" target="_blank">Presentation</Link>
          </Box>
          <Box key='exampleSheetLink' 
          className="dragHandle" 
          sx={{ 
            border: '1px dashed grey',     
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <GridOnIcon sx={{fontSize: 40}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover" target="_blank">Finances</Link>
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
                onClick={action.click}
              />
            ))}
          </SpeedDial>
        </ResponsiveReactGridLayout>
        <Modal
          open={modalGoogleDocOpen}
          onClose={handleModalCloseGoogleDoc}
          aria-labelledby="add google doc"
          aria-describedby="modal for adding google doc to the layout"
        >
          <Box sx={modalStyle}>
            <TextField id="googledoclink" label="Link to Google Doc" variant="standard" />
            <Button sx={{marginTop: '10px', width: '50%',  alignSelf: 'center'}} variant='contained'>
              Add
            </Button>
          </Box>
        </Modal>
    </Box>
  </>
  );
  
};

export default ProjectBox;
