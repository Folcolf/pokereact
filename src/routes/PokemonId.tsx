import { StatsTable } from '@/components/table/StatsTable';
import { isMobile, useWindowSize } from '@/utils/size';
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
  const [width, height] = useWindowSize();

  const client = new PokemonClient();
  const { i18n } = useTranslation();

  useEffect(() => {
    const idNumber = parseInt(id ?? '');
    if (!id || isNaN(idNumber)) {
      navigate('/');
      return;
    }
    client.getPokemonById(idNumber).then((p) => setPokemon(p));

    if (idNumber > 1) {
      client
        .getPokemonById(idNumber - 1)
        .then((p) => setPrevious(p.id))
        .catch(() => setPrevious(null));
    } else {
      setPrevious(null);
    }

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
      height: 'inherit',
    } as SxProps,
    container: {
      display: 'flex',
      flexDirection: height > 600 ? 'column' : 'row',
      alignItems: 'center',
      margin: '1rem',
    } as SxProps,
    link: {
      height: '-webkit-fill-available',
      minWidth: '0',
      borderRadius: '0',
    },
    button: {
      minWidth: '40px',
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
        <Button disabled sx={styles.button}>
          <ArrowBack />
        </Button>
      )}
      {pokemon ? (
        <Box sx={styles.container}>
          <PokemonCard pokemon={pokemon} />
          <Box>
            <StatsTable
              stats={pokemon.stats}
              size={!isMobile(width, height) ? 'medium' : 'small'}
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
      {next !== null ? (
        <Link to={`/pokemon/${next}`}>
          <StyledButton sx={styles.link}>
            <ArrowForward />
          </StyledButton>
        </Link>
      ) : (
        <Button disabled sx={styles.button}>
          <ArrowForward />
        </Button>
      )}
    </Box>
  );
};

export { PokemonId };
