import { FormatListBulleted, Home } from '@mui/icons-material';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
  TypographyProps,
} from '@mui/material';
import { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageSelect } from '../form/LanguageSelect';
import { ModeSwitch } from '../form/ModeSwitch';

interface Setting {
  value: string;
  path: string;
  icon?: ReactNode;
}

const settings: Setting[] = [
  {
    value: 'home',
    path: '/',
    icon: <Home />,
  },
  {
    value: 'pokedex',
    path: '/pokedex',
    icon: <FormatListBulleted />,
  },
];

interface NavMenuProps {
  open: boolean;
  toggleDrawer: (value: boolean) => (event: MouseEvent | KeyboardEvent) => void;
}

const drawerWidth = 240;
const toolbarHeight = 64;

const NavMenu = ({ open, toggleDrawer }: NavMenuProps) => {
  const { t } = useTranslation();

  const styles = {
    root: {
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    } as SxProps,
    toolbar: { marginTop: `${toolbarHeight}px`, flexGrow: 1 } as SxProps,
    navItem: {
      color: (theme: Theme) => theme.palette.primary.main,
      fontWeight: 'medium',
      variant: 'body2',
    } as TypographyProps,
  };

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
                    primary={t<string>(value + '.value')}
                    primaryTypographyProps={styles.navItem}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
      <Box m={'auto'} flexDirection={'column'} display="flex">
        <LanguageSelect />
        <ModeSwitch />
      </Box>
    </Drawer>
  );
};

export { NavMenu };
