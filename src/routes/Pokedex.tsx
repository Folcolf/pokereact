import { isMobile, useWindowSize } from '@/utils/size';
import { PokemonList } from '@components/list/PokemonList';
import { PokeTab } from '@components/tab/PokeTab';
import { Box, SxProps, Typography } from '@mui/material';
import { GameClient, NamedAPIResource } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Pokedex = () => {
  const client = new GameClient();

  const [searchParams, setSearchParams] = useSearchParams();

  const [seed, setSeed] = useState(1);
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>();
  const [region, setRegion] = useState<number>(1);
  const [width, height] = useWindowSize();

  useEffect(() => {
    setRegion(Number(searchParams.get('region') || 1));
    setSearchParams({ region: '1' });
  }, []);

  useEffect(() => {
    if (region === 1) {
      client
        .getPokedexById(region)
        .then((pokedex) => pokedex.pokemon_entries)
        .then((entries) => entries.map((pokemon) => pokemon.pokemon_species))
        .then((species) => setPokemons(species))
        .then(() => setSeed(Math.random()));
    } else {
      client
        .getGenerationById(region - 1)
        .then((gen) => gen.pokemon_species)
        .then((species) =>
          [...species].sort(
            (a, b) => +a.url.split('/')[6] - +b.url.split('/')[6],
          ),
        )
        .then(setPokemons)
        .then(() => setSeed(Math.random()));
    }
  }, [region]);

  const handleChange = (newValue: unknown) => {
    setSearchParams({ region: newValue as string });
  };

  const styles = {
    container: {
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    } as SxProps,
  };

  return (
    <Box sx={styles.container}>
      <Typography
        variant={isMobile(width, height) ? 'h4' : 'h2'}
        align="center"
      >
        Pokedex
      </Typography>
      {region !== null && (
        <PokeTab region={region} updateValue={handleChange} />
      )}
      {pokemons && <PokemonList key={seed} pokemons={pokemons} />}
    </Box>
  );
};

export { Pokedex };
