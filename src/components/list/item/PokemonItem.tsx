import {
  Box,
  capitalize,
  ImageListItem,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import {
  NamedAPIResource,
  Pokemon,
  PokemonClient,
  PokemonSpecies,
} from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TypeList } from '../TypeList';

interface PokemonItemProps {
  entry: NamedAPIResource;
}

const client = new PokemonClient();

const PokemonItem = ({ entry }: PokemonItemProps) => {
  const { i18n } = useTranslation();

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokeSpecies, setPokeSpecies] = useState<PokemonSpecies>();
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const pokeId = entry.url.split('/')[6];
    client.getPokemonById(+pokeId).then(setPokemon);
    client.getPokemonSpeciesById(+pokeId).then((data) => {
      setPokeSpecies(data);
      setName(
        data.names.find((n) => n.language.name === i18n.language)?.name ?? '',
      );
    });
  }, [i18n.language]);

  if (!pokemon || !pokeSpecies) {
    return <Box>Loading...</Box>;
  }

  const { id, species, sprites, types } = pokemon;

  const getSprites = (): string => {
    if (sprites.other && sprites.other['official-artwork']) {
      return sprites.other['official-artwork'].front_default ?? '';
    }
    return sprites.front_default ?? '';
  };

  if (getSprites() === '') {
    return <></>;
  }

  const styles = {
    container: {
      textAlign: 'center',
      alignItems: 'center',
      width: 'min-content',
      minWidth: '256px',
      height: '128px',
      backgroundColor: 'background.paper',
      '&:hover': {
        backgroundColor: 'background.paper',
        cursor: 'pointer',
      },
    } as SxProps,
    text: {
      m: 1,
      color: (theme: Theme) => theme.palette.text.primary,
    } as SxProps,
  };

  return (
    <ImageListItem key={id} sx={styles.container}>
      <Link to={`/pokemon/${id}`}>
        <Typography variant="h4" sx={styles.text}>
          {capitalize(name)}
        </Typography>
        {getSprites() && (
          <img src={getSprites()} alt={species.name} width="70%" />
        )}
        <Typography variant="h5" sx={styles.text}>
          #{id}
        </Typography>
      </Link>
      <TypeList types={types} />
    </ImageListItem>
  );
};

export { PokemonItem };
