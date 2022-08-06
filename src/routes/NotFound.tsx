import { Home } from "@mui/icons-material"
import { Button, Container, SxProps, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {
  const styles: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "25vh"
  }

  return (
    <Container sx={styles}>
      <Typography variant="h1" align="center">
        Not Found
      </Typography>

      <Typography variant="body1" align="center">
        The page you are looking for does not exist.
        <br />
        Please check the URL for typos or try again later.
      </Typography>

      <Button component={Link} to="/">
        <Home />
        Go Home
      </Button>
    </Container>
  )
}

export { NotFound }
