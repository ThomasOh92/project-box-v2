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
  
  // States
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

  const [googleDocLinks, setGoogleDocLinks] = useState<Record<string, string>>({});
  const [googleSlideLinks, setGoogleSlideLinks] = useState<Record<string, string>>({});
  const [googleSheetLinks, setGoogleSheetLinks] = useState<Record<string, string>>({});
  const [webLinks, setWebLinks] = useState<Record<string, string>>({});
  const [stickyNotes, setStickyNotes] = useState<Record<string, string>>({});


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

  const addGoogleDocLinkToLayout = (link: string) => {
    const newKey = `googleDoc${Object.keys(googleDocLinks).length + 1}`;
    const newLayoutItem = { i: newKey, x: 0, y: 0, w: 2, h: 0.4, minH: 0 };
  
    // Clone the current layouts and add the new item
    const newLayouts = {
      lg: [...layouts.lg, newLayoutItem],
      md: [...layouts.md, newLayoutItem]
    };
  
    // Clone the current links and add the new link
    const newLinks = { ...googleDocLinks, [newKey]: link };
  
    setLayouts(newLayouts);
    setGoogleDocLinks(newLinks);
    handleModalCloseGoogleDoc();
  };

  const addGoogleSlideLinkToLayout = (link: string) => {
    const newKey = `googleSlide${Object.keys(googleSlideLinks).length + 1}`;
    const newLayoutItem = { i: newKey, x: 11, y: 0, w: 2, h: 0.4, minH: 0 };
  
    // Clone the current layouts and add the new item
    const newLayouts = {
      lg: [...layouts.lg, newLayoutItem],
      md: [...layouts.md, newLayoutItem]
    };
  
    // Clone the current links and add the new link
    const newLinks = { ...googleSlideLinks, [newKey]: link };
  
    setLayouts(newLayouts);
    setGoogleSlideLinks(newLinks);
    handleModalCloseGoogleSlide();
  };

  const addGoogleSheetLinkToLayout = (link: string) => {
    const newKey = `googleSheet${Object.keys(googleSheetLinks).length + 1}`;
    const newLayoutItem = { i: newKey, x: 14, y: 0, w: 2, h: 0.4, minH: 0 };
  
    // Clone the current layouts and add the new item
    const newLayouts = {
      lg: [...layouts.lg, newLayoutItem],
      md: [...layouts.md, newLayoutItem]
    };
  
    // Clone the current links and add the new link
    const newLinks = { ...googleSheetLinks, [newKey]: link };
  
    setLayouts(newLayouts);
    setGoogleSheetLinks(newLinks);
    handleModalCloseGoogleSheet();
  };
   
  const addWebLinkToLayout = (link: string) => {
    const newKey = `webLink${Object.keys(webLinks).length + 1}`;
    const newLayoutItem = { i: newKey, x: 17, y: 0, w: 2, h: 0.4, minH: 0 };
  
    // Clone the current layouts and add the new item
    const newLayouts = {
      lg: [...layouts.lg, newLayoutItem],
      md: [...layouts.md, newLayoutItem]
    };
  
    // Clone the current links and add the new link
    const newLinks = { ...webLinks, [newKey]: link };
  
    setLayouts(newLayouts);
    setWebLinks(newLinks);
    handleModalCloseLink();
  };

  const addStickyNote = () => {
    const newKey = `stickyNote${Object.keys(stickyNotes).length + 1}`;
    const newLayoutItem = { i: newKey, x: 0, y: 0, w: 7, h: 1, minH: 0 };
  
    // Clone the current layouts and add the new item
    const newLayouts = {
      lg: [...layouts.lg, newLayoutItem],
      md: [...layouts.md, newLayoutItem]
    };
  
    // Clone the current sticky notes and add the new content
    const newStickyNotes = { ...stickyNotes, [newKey]:''};

    setLayouts(newLayouts);
    setStickyNotes(newStickyNotes);

    console.log("adding sticky note")
  
  }
  
  const actions = [
    { icon: <DescriptionIcon />, name: 'Google Doc', click: handleModalOpenGoogleDoc},
    { icon: <CoPresentIcon />, name: 'Google Slides', click: handleModalOpenGoogleSlide },
    { icon: <GridOnIcon />, name: 'Google Sheet', click: handleModalOpenGoogleSheet },
    { icon: <LinkIcon />, name: 'Link', click: handleModalOpenLink },
    { icon: <StickyNote2Icon />, name: 'Sticky Note', click: addStickyNote}
  ];

  const layout: Layout[] = [
    { i: "addButton", x: 37.5, y: 0.7, w: 2, h: 3, static: true, minW: 2, minH: 2},
    { i: "exampleStickyNote", x: 0, y: 0, w: 7, h: 1, minW: 2, minH: 0, resizeHandles: ['se']},
    { i: "exampleDocLink1", x: 7, y: 0, w: 2, h: 0.4, minH: 0},
    { i: "exampleDocLink2", x: 9, y: 0, w: 2, h: 0.4, minH: 0},
    { i: "exampleSlideLink", x: 11, y: 0, w: 2, h: 0.4, minH: 0 },
    { i: "exampleSheetLink", x: 13, y: 0, w: 2, h: 0.4, minH: 0},
  ];

  const [layouts, setLayouts] = useState({
    lg: layout,
    md: layout
  });

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
          transition: 'all 200ms ease',
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
          layouts={layouts} 
          breakpoints={{lg: 1200, md:600}} 
          cols={{lg: 40, md: 20}} 
          compactType={null} 
          draggableHandle=".dragHandle">

          {/* Example components */}
          <Card key='exampleStickyNote' className="stickyNote" variant='outlined' sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '10px' }}/>
            <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
              <TextareaAutosize
                defaultValue="Content..."
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <DescriptionIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover" target="_blank">Overall Plan</Link>
          </Box>
          <Box key='exampleDocLink2' 
          className="dragHandle" 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <DescriptionIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover" target="_blank">References</Link>
          </Box>
          <Box key='exampleSlideLink' 
          className="dragHandle" 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <CoPresentIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover" target="_blank">Presentation</Link>
          </Box>
          <Box key='exampleSheetLink' 
          className="dragHandle" 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
           }}
          >
            <GridOnIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
            <Link sx={{fontSize: 12, textAlign:'center'}} href="http://docs.google.com/" underline="hover" target="_blank">Finances</Link>
          </Box>

           {/* Components that can be added */}
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

          {/* Google Doc components */}
          {layouts.lg.map(layoutItem => {
            // Check if the layout item key is in googleDocLinks
            if (googleDocLinks[layoutItem.i]) {
              return (
                <Box key={layoutItem.i} 
                className="dragHandle" 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                >
                  <DescriptionIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
                  <Link sx={{fontSize: 12, textAlign:'center'}} href={googleDocLinks[layoutItem.i]} underline="hover" target="_blank">Google Doc Link</Link>
                </Box>
              );
            } else {
              // Return null or some other component for non-Google Doc layout items
              return null;
            }
          })}

          {/* Google Slide components */}
          {layouts.lg.map(layoutItem => {
            // Check if the layout item key is in googleDocLinks
            if (googleSlideLinks[layoutItem.i]) {
              return (
                <Box key={layoutItem.i} 
                className="dragHandle" 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                >
                  <CoPresentIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
                  <Link sx={{fontSize: 12, textAlign:'center'}} href={googleSlideLinks[layoutItem.i]} underline="hover" target="_blank">Google Slide Link</Link>
                </Box>
              );
            } else {
              // Return null or some other component for non-Google Slide layout items
              return null;
            }
          })}

          {/* Google Sheet components */}
          {layouts.lg.map(layoutItem => {
            // Check if the layout item key is in googleDocLinks
            if (googleSheetLinks[layoutItem.i]) {
              return (
                <Box key={layoutItem.i} 
                className="dragHandle" 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                >
                  <GridOnIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
                  <Link sx={{fontSize: 12, textAlign:'center'}} href={googleSheetLinks[layoutItem.i]} underline="hover" target="_blank">Google Sheet Link</Link>
                </Box>
              );
            } else {
              // Return null or some other component for non-Google Sheet layout items
              return null;
            }
          })}

          {/* Web link components */}
          {layouts.lg.map(layoutItem => {
            // Check if the layout item key is in googleDocLinks
            if (webLinks[layoutItem.i]) {
              return (
                <Box key={layoutItem.i} 
                className="dragHandle" 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                >
                  <LinkIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
                  <Link sx={{fontSize: 12, textAlign:'center'}} href={webLinks[layoutItem.i]} underline="hover" target="_blank">Web Link</Link>
                </Box>
              );
            } else {
              // Return null or some other component for non-Web link layout items
              return null;
            }
          })}

          {/* Sticky note components */}
          {Object.keys(stickyNotes).map((key) => {
            return (
              <Card key={key} className="stickyNote" variant='outlined' sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '10px' }}/>
                <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
                  <TextareaAutosize
                    defaultValue="Content..."
                    onChange={(event) => {
                      const updatedStickyNotes = { ...stickyNotes, [key]: event.target.value };
                      setStickyNotes(updatedStickyNotes);
                    }}
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
             );
          })}

        </ResponsiveReactGridLayout>

        {/* Modals that open up */}
        <Modal
          open={modalGoogleDocOpen}
          onClose={handleModalCloseGoogleDoc}
          aria-labelledby="add google doc"
          aria-describedby="modal for adding google doc to the layout"
        >
          <Box sx={modalStyle}>
            <TextField id="googledoclink" label="Link to Google Doc" variant="standard" />
            <Button sx={{marginTop: '10px', width: '50%',  alignSelf: 'center'}} variant='contained' onClick={() => addGoogleDocLinkToLayout(document.getElementById('googledoclink').value)}>
              Add
            </Button>
          </Box>
        </Modal>
        <Modal
          open={modalGoogleSlideOpen}
          onClose={handleModalCloseGoogleSlide}
          aria-labelledby="add google slide"
          aria-describedby="modal for adding google slide to the layout"
        >
          <Box sx={modalStyle}>
            <TextField id="googleslidelink" label="Link to Google Slide" variant="standard" />
            <Button sx={{marginTop: '10px', width: '50%',  alignSelf: 'center'}} variant='contained' onClick={() => addGoogleSlideLinkToLayout(document.getElementById('googleslidelink').value)}>
              Add
            </Button>
          </Box>
        </Modal>
        <Modal
          open={modalGoogleSheetOpen}
          onClose={handleModalCloseGoogleSheet}
          aria-labelledby="add google sheet"
          aria-describedby="modal for adding google sheet to the layout"
        >
          <Box sx={modalStyle}>
            <TextField id="googlesheetlink" label="Link to Google Sheet" variant="standard" />
            <Button sx={{marginTop: '10px', width: '50%',  alignSelf: 'center'}} variant='contained' onClick={() => addGoogleSheetLinkToLayout(document.getElementById('googlesheetlink').value)}>
              Add
            </Button>
          </Box>
        </Modal>
        <Modal
          open={modalLinkOpen}
          onClose={handleModalCloseLink}
          aria-labelledby="add web link"
          aria-describedby="modal for adding web link to the layout"
        >
          <Box sx={modalStyle}>
            <TextField id="weblink" label="Link" variant="standard" />
            <Button sx={{marginTop: '10px', width: '50%',  alignSelf: 'center'}} variant='contained' onClick={() => addWebLinkToLayout(document.getElementById('weblink').value)}>
              Add
            </Button>
          </Box>
        </Modal>
    </Box>
  </>
  );
  
};

export default ProjectBox;
