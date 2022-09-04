import { TypeList } from '@components/list/TypeList';
import {
  Box,
  capitalize,
  Card,
  Grid,
  SxProps,
  Typography,
} from '@mui/material';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const styles: SxProps = {
  margin: '1rem',
  padding: '1rem',
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { id, types, height, weight, sprites } = pokemon;
  const { i18n } = useTranslation();
  const { language } = i18n;

  const client = new PokemonClient();

  const [name, setName] = useState<string>('');

  useEffect(() => {
    client.getPokemonSpeciesById(id).then((species) => {
      setName(
        species.names.find((n) => n.language.name === language)?.name ?? '',
      );
    });
  }, [pokemon]);

  return (
    <Card sx={styles} key={id}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <img
            src={sprites.other?.['official-artwork']?.front_default ?? ''}
            width="100%"
            alt={name}
          />
        </Grid>
        <Grid item xs={6} md={8}>
          <Typography variant="h2">{capitalize(name)}</Typography>
          <Box m={2}>
            <Typography variant="h6">{height / 10} M</Typography>
            <Typography variant="h6">{weight / 10} KG</Typography>
          </Box>
          <TypeList types={types} />
        </Grid>
      </Grid>
    </Card>
  );
};

export { PokemonCard };
