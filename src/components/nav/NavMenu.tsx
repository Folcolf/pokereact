import { FormatListBulleted, Home } from "@mui/icons-material"
import {
  Box,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  SxProps,
  Theme,
  TypographyProps
} from "@mui/material"
import { KeyboardEvent, MouseEvent, ReactNode } from "react"
import { Link } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { changeMode } from "../../stores/darkModeReducer"
import { RootState } from "../../stores/index"

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

interface NavMenuProps {
  open: boolean
  toggleDrawer: (value: boolean) => (event: MouseEvent | KeyboardEvent) => void
}

const drawerWidth = 240
const toolbarHeight = 64

const NavMenu = ({ open, toggleDrawer }: NavMenuProps) => {
  const mode = useAppSelector((state: RootState) => state.dark.value)
  const dispatch = useAppDispatch()

  const styles = {
    root: {
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: "border-box"
      }
    } as SxProps,
    toolbar: { marginTop: `${toolbarHeight}px`, flexGrow: 1 } as SxProps,
    navItem: {
      color: (theme: Theme) => theme.palette.primary.main,
      fontWeight: "medium",
      variant: "body2"
    } as TypographyProps
  }

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
            <Link key={value} to={path}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    primary={value}
                    primaryTypographyProps={styles.navItem}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
      <Box m={"auto"}>
        <FormControlLabel
          value="start"
          control={
            <Switch
              color="primary"
              value={mode}
              onChange={() => dispatch(changeMode(!mode))}
            />
          }
          label="Dark Mode"
          labelPlacement="end"
        />
      </Box>
    </Drawer>
  )
}

export { NavMenu }
