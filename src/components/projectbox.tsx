import * as React from 'react';
import { db } from '../firebaseconfig'; // Assuming this is your Firestore instance
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';
import {Box, TextareaAutosize, Button, TextField, Modal}  from '@mui/material';
import { Card, CardHeader, Link } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { GlobalStyles } from '@mui/system';

const { useState } = React;

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ProjectBox: React.FC = () => {
  
  // State to open modal to add documents
  const [modalDocOpen, setModalDocOpen] = React.useState(false);
  const handleModalOpenDoc = () => {
    setModalDocOpen(true);
    handleCloseRightClick();
  };
  const handleModalCloseDoc = () => setModalDocOpen(false);

  // State to open modal to add links
  const [modalLinkOpen, setModalLinkOpen] = React.useState(false);
  const handleModalOpenLink = () => {
    setModalLinkOpen(true);
    handleCloseRightClick();
  }
  const handleModalCloseLink = () => setModalLinkOpen(false);

  // State to open modal for bulk load
  const [modalBulkLoadOpen, setModalBulkLoadOpen] = React.useState(false);
  const handleModalOpenBulkLoad = () => {
    setModalBulkLoadOpen(true);
    handleCloseRightClick();
  }
  const handleModalCloseBulkLoad = () => setModalLinkOpen(false);

  // State to open menu on right click
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);


  // State to trigger delete buttons visibility
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  
  // States for adding new docs, links or sticky note
  //Initial layout with state
  const layout: Layout[] = [];
  const [layouts, setLayouts] = useState({
    lg: layout,
    md: layout
  });
  const [docLinks, setDocLinks] = useState<Record<string, string>>({});
  const [webLinks, setWebLinks] = useState<Record<string, string>>({});
  const [stickyNotes, setStickyNotes] = useState<Record<string, string>>({});

  // Modal Style to import
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',

  };

  // Functions

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("Right-clicked"); // Debugging line
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
    });
    console.log(contextMenu)
  };

  const handleCloseRightClick = () => {
    setContextMenu(null);
  };

  const truncateURL = (url: string): string => {
    // Remove the http:// or https:// part
    const cleanedUrl = url.replace(/(^\w+:|^)\/\//, '');

    // Truncate to 12 characters
    if (cleanedUrl.length <= 12) {
      return cleanedUrl;
    }

    // Extract the domain and the rest of the URL
    const domainMatch = cleanedUrl.match(/[^\/?#]+(?=\/|$|\?|#)/);
    const domain = domainMatch ? domainMatch[0] : '';
    const rest = cleanedUrl.substring(domain.length);

    if (domain.length >= 12) {
      return domain.substring(0, 12); // If the domain itself is too long, truncate it
    }

    // Try to include as much as possible from the rest of the URL
    return domain + rest.substring(0, 12 - domain.length);
  };
  
  const addDoctoLayOut = (link: string) => {
    const newKey = `doc${Object.keys(docLinks).length + 1}`;
    const newLayoutItem = { i: newKey, x: 0, y: 0, w: 2, h: 0.4, minH: 0 };
  
    // Clone the current layouts and add the new item
    const newLayouts = {
      lg: [...layouts.lg, newLayoutItem],
      md: [...layouts.md, newLayoutItem]
    };
  
    // Clone the current links and add the new link
    const newLinks = { ...docLinks, [newKey]: link };
  
    setLayouts(newLayouts);
    setDocLinks(newLinks);
    handleModalCloseDoc();
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
    handleCloseRightClick();
    console.log("adding sticky note")
  
  }

  const deleteStickyNote = (keyToDelete: string) => {
    // Create a copy of the current sticky notes state
    const updatedStickyNotes = { ...stickyNotes };

    // Delete the sticky note with the specified key
    delete updatedStickyNotes[keyToDelete];

    // Update the sticky notes state
    setStickyNotes(updatedStickyNotes);

    // Update the layouts to remove the deleted item's layout
    const updatedLayouts = {
      lg: layouts.lg.filter((item) => item.i !== keyToDelete),
      md: layouts.md.filter((item) => item.i !== keyToDelete),
    };
    setLayouts(updatedLayouts);
  };

  const deleteWebLink = (keyToDelete: string) => {
    // Create a copy of the current sticky notes state
    const updatedWebLinks = { ...webLinks };

    // Delete the sticky note with the specified key
    delete updatedWebLinks[keyToDelete];

    // Update the sticky notes state
    setWebLinks(updatedWebLinks);

    // Update the layouts to remove the deleted item's layout
    const updatedLayouts = {
      lg: layouts.lg.filter((item) => item.i !== keyToDelete),
      md: layouts.md.filter((item) => item.i !== keyToDelete),
    };
    setLayouts(updatedLayouts);
  };

  const boardId = "thom-first-board";

  const saveLayoutToFirestore = async () => {
    const layoutData = {
      layouts,
      docLinks,
      webLinks,
      stickyNotes,
    };
    try {
      await setDoc(doc(db, "thomas", boardId), layoutData); 
      console.log("Document written with ID: ", boardId);
    } catch (error) {
      console.error('Error saving layout: ', error);
    }
  };
  
  React.useEffect(() => {
    const loadLayoutFromFirestore = async () => {
      const docRef = doc(db, 'thomas', boardId);
      const docSnap = await getDoc(docRef); // Get the document snapshot
  
      if (docSnap.exists()) {
        const data = docSnap.data(); // Extract data from the document snapshot
        setLayouts(data.layouts);
        setDocLinks(data.docLinks);
        setWebLinks(data.webLinks);
        setStickyNotes(data.stickyNotes);
      } else {
        console.log('No such document!');
      }
    };
  
  
    loadLayoutFromFirestore();
  }, []);
  





  // Render begins here
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
          background: 'rgba(0, 0, 0, 0.54)',
          opacity: 0.2,
          borderRadius: '5px',
          transitionDuration: '250ms',
          zIndex: 2,
        }
        
      }}/>

      <Box onContextMenu={handleRightClick} sx={{height: '500px', transform: 'translateZ(0px)', flexGrow: 1,
       backgroundColor: "white"}}>
        {/* Handling Right Clicks */}
        <Menu
          open={contextMenu !== null}
          onClose={handleCloseRightClick}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={addStickyNote}>Sticky Note</MenuItem>
          <MenuItem onClick={handleModalOpenDoc}>Document</MenuItem>
          <MenuItem onClick={handleModalOpenLink}>Link</MenuItem>
          <MenuItem onClick={handleModalOpenBulkLoad}>Bulk Load (beta)</MenuItem>
        </Menu>

        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <IconButton aria-label="delete" size="medium" color="error"  onClick={() => setShowDeleteButtons(!showDeleteButtons)}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box sx={{ position: 'absolute', top: 0, right: 40 }}>
          <IconButton aria-label="save" size="medium" color="primary"  onClick={() => saveLayoutToFirestore()}>
            <SaveIcon />
          </IconButton>
        </Box>


        {/* Central Layout */}
        <ResponsiveReactGridLayout 
          className="layout" 
          layouts={layouts} 
          breakpoints={{lg: 1200, md:600}} 
          cols={{lg: 40, md: 20}} 
          compactType={null} 
          draggableHandle=".dragHandle"
          isBounded={true} 
          >
          
          {/*  Doc components */}
          {layouts.lg.map(layoutItem => {
            // Check if the layout item key is in googleDocLinks
            if (docLinks[layoutItem.i]) {
              return (
                <Box key={layoutItem.i} 
                className="dragHandle" 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px'}
                }}
                >
                {showDeleteButtons && (
                  <IconButton aria-label="delete" size="small" color="error" onClick={() => deleteWebLink(layoutItem.i)} sx={{position: 'absolute', top: '0', right: '0'}}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
                  <DescriptionIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
                  <Link sx={{fontSize: 12, textAlign:'center'}} href={docLinks[layoutItem.i]} underline="hover" target="_blank">{truncateURL(docLinks[layoutItem.i])}</Link>
                </Box>
              );
            } else {
              // Return null or some other component for non-Google Doc layout items
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
                  alignItems: 'center',
                  '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px'}
                }}
                >
                {showDeleteButtons && (
                  <IconButton aria-label="delete" size="small" color="error" onClick={() => deleteWebLink(layoutItem.i)} sx={{position: 'absolute', top: '0', right: '0'}}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
                  <LinkIcon sx={{fontSize: 40, paddingBottom: '5px'}}/>
                  <Link sx={{fontSize: 12, textAlign:'center'}} href={webLinks[layoutItem.i]} underline="hover" target="_blank">{truncateURL(webLinks[layoutItem.i])}</Link>
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
              <Card key={key} className="stickyNote" variant='outlined' sx={{ display: 'flex', flexDirection: 'column', '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px'}}}>
                {showDeleteButtons && (
                  <IconButton aria-label="delete" size="small" color="error" onClick={() => deleteStickyNote(key)} sx={{position: 'absolute', top: '0', right: '0'}}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                )}
                <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '13px' }}/>
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

        {/* Modal for adding docs and weblinks */}
        <Modal
          open={modalDocOpen}
          onClose={handleModalCloseDoc}
          aria-labelledby="add doc"
          aria-describedby="modal for adding a doc to the layout"
        >
          <Box sx={modalStyle}>
            <TextField id="doclink" label="File Path or Link" rows={2} multiline />
            <Button sx={{marginTop: '10px', width: '10%',  alignSelf: 'center'}} variant='contained' onClick={() => addDoctoLayOut(document.getElementById('doclink').value)}>
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
            <TextField id="weblink" label="URL" rows={2} multiline  />
            <Button sx={{marginTop: '10px', width: '10%',  alignSelf: 'center'}} variant='contained' onClick={() => addWebLinkToLayout(document.getElementById('weblink').value)}>
              Add
            </Button>
          </Box>
        </Modal>
        <Modal
          open={modalBulkLoadOpen}
          onClose={handleModalCloseBulkLoad}
          aria-labelledby="Bulk Load"
          aria-describedby="modal for displaying bulk load progress"
        >
          <Box sx={modalStyle}>
            <CircularProgress sx={{alignSelf: 'center'}}/>
          </Box>
        </Modal>
        
    </Box>
  </>
  );
  
};

export default ProjectBox;
