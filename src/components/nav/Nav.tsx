import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  IconButton,
  SxProps,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavMenu } from './NavMenu';
import { useTranslation } from 'react-i18next';

const toolbarHeight = 64;

const Nav = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (value: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(value);
    };

  const styles = {
    appbar: {
      zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
      background: (theme: Theme) => theme.palette.primary.main,
    } as SxProps,
    toolbar: { marginTop: `${toolbarHeight}px`, flexGrow: 1 },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'text.primary',
    } as SxProps,
  };

  return (
    <AppBar position="sticky" sx={styles.appbar}>
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
              {t<string>('home.value')}
            </Typography>
          </Link>
        </Box>
      </Toolbar>
      <NavMenu open={open} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
};

export { Nav };
