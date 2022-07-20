import { Box, Toolbar } from "@mui/material"
import { Navbar, Sidebar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display:'flex'}} className="animate__animated animate__fadeIn animate__faster"
    >
        {/* Navbar */}
        <Navbar drawerWidth={drawerWidth}/>
        {/* SideBar */}
        <Sidebar drawerWidth={drawerWidth}/>
        {/* Main */}
        <Box
            component='main'
            sx={{flexGrow:1, p:3}}
        >
        {/* Toolbar */}
            <Toolbar />
            {children}

        </Box>
    </Box>
  )
}