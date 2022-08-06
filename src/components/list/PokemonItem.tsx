import {
  Box,
  capitalize,
  Chip,
  ImageListItem,
  SxProps,
  Typography
} from "@mui/material"
import {
  NamedAPIResource,
  Pokemon,
  PokemonClient,
  PokemonSpecies
} from "pokenode-ts"
import { useEffect, useState } from "react"

import { TYPE_COLOR } from "../../utils/types"

interface PokemonItemProps {
  entry: NamedAPIResource
}

const client = new PokemonClient()

const PokemonItem = ({ entry }: PokemonItemProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [pokeSpecies, setPokeSpecies] = useState<PokemonSpecies>()

  useEffect(() => {
    const pokeId = entry.url.split("/")[6]
    client.getPokemonById(+pokeId).then(setPokemon)
    client.getPokemonSpeciesById(+pokeId).then(setPokeSpecies)
  }, [])

  if (!pokemon || !pokeSpecies) {
    return <Box>Loading...</Box>
  }

  const { id, species, sprites, types } = pokemon
  const { names } = pokeSpecies

  const getSprites = (): string => {
    if (sprites.other && sprites.other["official-artwork"]) {
      return sprites.other["official-artwork"].front_default ?? ""
    }
    return sprites.front_default ?? ""
  }

  const getColor = (type: string): string => {
    const idx = Object.keys(TYPE_COLOR).indexOf(type)
    return Object.values(TYPE_COLOR)[idx] ?? ""
  }

  if (getSprites() === "") {
    return <></>
  }

  const styles: SxProps = {
    textAlign: "center",
    alignItems: "center",
    width: "min-content",
    minWidth: "256px",
    height: "128px",
    backgroundColor: "background.paper",
    "&:hover": {
      backgroundColor: "background.paper",
      cursor: "pointer"
    }
  }

  return (
    <ImageListItem key={id} sx={styles} className="pokemon-item">
      <Box>
        <Box className="nome">
          <Typography variant="h4" className="nomes" sx={{ mt: 1 }}>
            {capitalize(names[7].name)}
          </Typography>
        </Box>
        {getSprites() && (
          <Box className="image">
            <img src={getSprites()} alt={species.name} width="70%" />
          </Box>
        )}
        <Box className="tipo">
          <Typography variant="h5" sx={{ m: 1 }} className="nomes">
            #{id}
          </Typography>

          <Typography variant="h5" sx={{ m: 1 }} className="nomes">
            {types.map((item) => (
              <Chip
                key={item.type.name}
                label={capitalize(item.type.name)}
                sx={{ backgroundColor: getColor(item.type.name) }}
              />
            ))}
          </Typography>
        </Box>
      </Box>
    </ImageListItem>
  )
}

export { PokemonItem }
