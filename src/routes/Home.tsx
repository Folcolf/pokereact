import { Box, Link, Typography } from "@mui/material"

const Home = () => {
  const styles = {
    container: {
      overflowY: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    text: {
      marginTop: "2rem"
    }
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="h2" align="center" sx={styles.text}>
        Welcome to Pokereact!
      </Typography>

      <Typography variant="body1" textAlign={"justify"} sx={styles.text}>
        Pokereact is a React project that allows you to display a list of
        Pokémon. It is based on the Pokenode API.
      </Typography>

      <img src="/pokeapi.png" alt="pokemon" />
      <Typography variant="body1" textAlign={"justify"}>
        The Pokenode API is a REST API that allows you to retrieve data from the
        Pokémon database. It is a free service, so you can use it for your own
        purposes.
        <Link href="https://pokeapi.co/">https://pokeapi.co/</Link>
      </Typography>

      <Typography variant="body1" textAlign={"justify"}>
        Go to the <Link href="/list">Pokemon</Link> page to see the list of
        Pokémon.
      </Typography>
    </Box>
  )
}

export { Home }
