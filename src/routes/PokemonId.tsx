import { ArrowBack, ArrowForward } from "@mui/icons-material"
import { Box, Button, styled, SxProps, Typography } from "@mui/material"
import { Pokemon, PokemonClient } from "pokenode-ts"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { PokemonCard } from "../components/card/PokemonCard"

import { StatsList } from "../components/list/StatsList"

const PokemonId = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [previous, setPrevious] = useState<number | null>(null)
  const [next, setNext] = useState<number | null>(null)

  const client = new PokemonClient()

  useEffect(() => {
    const idNumber = parseInt(id ?? "")
    if (!id || isNaN(idNumber)) {
      navigate("/")
      return
    }
    client.getPokemonById(idNumber).then((p) => setPokemon(p))

    client
      .getPokemonById(idNumber - 1)
      .then((p) => setPrevious(p.id))
      .catch(() => setPrevious(null))
    client
      .getPokemonById(idNumber + 1)
      .then((p) => {
        if (p.sprites.front_default) {
          setNext(p.id)
        } else {
          setNext(null)
        }
      })
      .catch(() => setNext(null))
  }, [id])

  const handleClick = (pokeId: number) => {
    navigate(`/pokemon/${pokeId}`)
  }

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
  }))

  const styles = {
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "100%"
    } as SxProps,
    container: {
      overflowY: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    } as SxProps
  }

  return (
    <Box sx={styles.root}>
      {previous !== null ? (
        <StyledButton onClick={() => handleClick(previous)}>
          <ArrowBack />
        </StyledButton>
      ) : (
        <Button disabled>
          <ArrowBack />
        </Button>
      )}
      <Box sx={styles.container}>
        {pokemon ? (
          <>
            <PokemonCard pokemon={pokemon} />
            <Box>
              <Typography variant="h4" align="center">
                Stats
              </Typography>
              <StatsList stats={pokemon.stats} />
            </Box>
          </>
        ) : (
          <Typography variant="h4">Loading...</Typography>
        )}
      </Box>
      {next !== null ? (
        <StyledButton onClick={() => handleClick(next)}>
          <ArrowForward />
        </StyledButton>
      ) : (
        <Button disabled>
          <ArrowForward />
        </Button>
      )}
    </Box>
  )
}

export { PokemonId }
