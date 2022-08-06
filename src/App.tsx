import { createTheme, ThemeProvider } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./App.scss"

import { Nav } from "./components/nav/Nav"
import { Home } from "./routes/Home"
import { List } from "./routes/List"
import { NotFound } from "./routes/NotFound"

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00bcff"
      },
      secondary: {
        main: "#ff9800"
      },
      error: {
        main: "#f44336"
      },
      background: {
        default: "#fafafa",
        paper: "#eee"
      },
      text: {
        primary: "#212121",
        secondary: "#757575",
        disabled: "#9e9e9e"
      },
      action: {
        active: "#00bcd4",
        hover: "#00bcd4",
        selected: "#00bcd4",
        disabled: "#9e9e9e",
        disabledBackground: "#fafafa"
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export { App }
