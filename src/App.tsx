import { Nav } from '@/components/nav/Nav';
import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { useAppSelector } from './hooks';
import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';
import { Pokedex } from './routes/Pokedex';
import { PokemonId } from './routes/PokemonId';
import { TypeName } from './routes/TypeName';
import { Types } from './routes/Types';
import { RootState } from './stores';

const App = () => {
  const mode = useAppSelector((state: RootState) => state.dark.value);

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#00bcff',
        dark: '#004b65',
        light: '#76DBFF',
      },
      secondary: {
        main: '#ff9800',
      },
      error: {
        main: '#f44336',
      },
      background: {
        default: '#fafafa',
        paper: '#eee',
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
        disabled: '#9e9e9e',
      },
      action: {
        active: '#00bcd4',
        hover: '#76DBFF',
        selected: '#006D7A',
        disabled: '#9e9e9e',
        disabledBackground: '#fafafa',
      },
      divider: '#ddd',
    },
  });

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#00bcff',
        dark: '#004b65',
        light: '#76DBFF',
      },
      secondary: {
        main: '#ff9800',
      },
      error: {
        main: '#f44336',
      },
      background: {
        default: '#212121',
        paper: '#323232',
      },
      text: {
        primary: '#fafafa',
        secondary: '#b0b0b0',
        disabled: '#eee',
      },
      action: {
        active: '#00bcd4',
        hover: '#004b65',
        selected: '#006D7A',
        disabled: '#9e9e9e',
        disabledBackground: '#212121',
      },
      divider: '#111',
    },
  });

  const getDesignTokens = (darkMode: boolean): ThemeOptions => ({
    palette: {
      ...(darkMode ? darkTheme.palette : lightTheme.palette),
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const theme = createTheme(getDesignTokens(mode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonId />} />
            <Route path="/types" element={<Types />} />
            <Route path="/type/:id" element={<TypeName />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
};

export { App };
