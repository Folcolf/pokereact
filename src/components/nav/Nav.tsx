import { FormatListBulleted, Home } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Toolbar,
  Typography,
  TypographyProps
} from "@mui/material"
import { KeyboardEvent, MouseEvent, ReactNode, useState } from "react"
import { Link } from "react-router-dom"

interface Setting {
  value: string
  path: string
  icon?: ReactNode
}

const settings: Setting[] = [
  {
    value: "Home",
    path: "/",
    icon: <Home />
  },
  {
    value: "List",
    path: "/list",
    icon: <FormatListBulleted />
  }
]

const drawerWidth = 240
const toolbarHeight = 64

const Nav = () => {
  const [open, setOpen] = useState(false)

  const toggleDrawer =
    (value: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setOpen(value)
    }

  const styles = {
    root: {
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: "border-box"
      }
    } as SxProps,
    toolbar: { width: 250, marginTop: `${toolbarHeight}px` } as SxProps,
    navItem: {
      color: "grey.700",
      fontWeight: "medium",
      variant: "body2"
    } as TypographyProps,
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "text.primary"
    } as SxProps
  }

  const NavMenu = () => {
    return (
      <Drawer open={open} onClose={toggleDrawer(false)} sx={styles.root}>
        <Box
          sx={styles.toolbar}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {settings.map(({ value, path, icon }) => (
              <ListItem key={value} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <Link to={path}>
                    <ListItemText
                      primary={value}
                      primaryTypographyProps={styles.navItem}
                    />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    )
  }

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Box component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Typography variant="h6" sx={styles.title}>
              Home
            </Typography>
          </Link>
        </Box>
      </Toolbar>
      <NavMenu />
    </AppBar>
  )
}

export { Nav }
