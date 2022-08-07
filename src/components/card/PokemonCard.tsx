import { Box, capitalize, Card, Grid, SxProps, Typography } from "@mui/material"
import { Pokemon } from "pokenode-ts"

import { TypeList } from "../list/TypeList"

interface PokemonCardProps {
  pokemon: Pokemon
}
const styles: SxProps = {
  margin: "1rem",
  padding: "1rem"
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card sx={styles}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default ?? ""}
            width="100%"
            alt={pokemon.name}
          />
        </Grid>
        <Grid item xs={6} md={8}>
          <Typography variant="h2">
            {capitalize(pokemon.name.split("-")[0])}
          </Typography>
          <Box m={2}>
            <Typography variant="h6">{pokemon.height / 10} M</Typography>
            <Typography variant="h6">{pokemon.weight / 10} KG</Typography>
          </Box>
          <TypeList types={pokemon.types} />
        </Grid>
      </Grid>
    </Card>
  )
}

export { PokemonCard }
