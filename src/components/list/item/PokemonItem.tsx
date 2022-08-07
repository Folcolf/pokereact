import {
  Box,
  capitalize,
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
import { useNavigate } from "react-router"

import { TypeList } from "../TypeList"

interface PokemonItemProps {
  entry: NamedAPIResource
}

const client = new PokemonClient()

const PokemonItem = ({ entry }: PokemonItemProps) => {
  const navigate = useNavigate()
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

  if (getSprites() === "") {
    return <></>
  }

  const handleClick = () => {
    navigate(`/pokemon/${id}`)
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
    <div onClick={handleClick}>
      <ImageListItem key={id} sx={styles}>
        <Box>
          <Typography variant="h4" sx={{ mt: 1 }}>
            {capitalize(names[7].name)}
          </Typography>
          {getSprites() && (
            <img src={getSprites()} alt={species.name} width="70%" />
          )}
          <Box className="tipo">
            <Typography variant="h5" sx={{ m: 1 }}>
              #{id}
            </Typography>

            <TypeList types={types} />
          </Box>
        </Box>
      </ImageListItem>
    </div>
  )
}

export { PokemonItem }