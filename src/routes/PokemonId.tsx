import { StatsTable } from '@/components/table/StatsTable';
import { PokemonCard } from '@components/card/PokemonCard';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Button, styled, SxProps, Typography } from '@mui/material';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const PokemonId = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [previous, setPrevious] = useState<number | null>(null);
  const [next, setNext] = useState<number | null>(null);

  const client = new PokemonClient();
  const { i18n } = useTranslation();

  useEffect(() => {
    const idNumber = parseInt(id ?? '');
    if (!id || isNaN(idNumber)) {
      navigate('/');
      return;
    }
    client.getPokemonById(idNumber).then((p) => setPokemon(p));

    client
      .getPokemonById(idNumber - 1)
      .then((p) => setPrevious(p.id))
      .catch(() => setPrevious(null));
    client
      .getPokemonById(idNumber + 1)
      .then((p) => {
        if (p.sprites.front_default) {
          setNext(p.id);
        } else {
          setNext(null);
        }
      })
      .catch(() => setNext(null));
  }, [id, i18n.language]);

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const styles = {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '100%',
    } as SxProps,
    container: {
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    } as SxProps,
    link: {
      height: '-webkit-fill-available',
    },
  };

  return (
    <Box sx={styles.root}>
      {previous !== null ? (
        <Link to={`/pokemon/${previous}`}>
          <StyledButton sx={styles.link}>
            <ArrowBack />
          </StyledButton>
        </Link>
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
              <StatsTable stats={pokemon.stats} />
            </Box>
          </>
        ) : (
          <Typography variant="h4">Loading...</Typography>
        )}
      </Box>
      {next !== null ? (
        <Link to={`/pokemon/${next}`}>
          <StyledButton sx={styles.link}>
            <ArrowForward />
          </StyledButton>
        </Link>
      ) : (
        <Button disabled>
          <ArrowForward />
        </Button>
      )}
    </Box>
  );
};

export { PokemonId };
