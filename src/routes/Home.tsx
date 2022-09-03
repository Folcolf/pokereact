import { Box, Link, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

const Home = () => {
  const styles = {
    container: {
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    text: {
      marginTop: '2rem',
    },
  };

  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      <Typography variant="h2" align="center" sx={styles.text}>
        {t<string>('home.title')}
      </Typography>

      <Typography variant="body1" textAlign={'justify'} sx={styles.text} />

      <img src="/pokeapi.png" alt="pokemon" />
      <Typography variant="body1" textAlign={'justify'}>
        <Trans i18nKey="home.secondaryDescription">
          The Poke-node API is a REST API that allows you to retrieve data from
          the Pokemon database. It is a free service, so you can use it for your
          own purposes.
          <Link href="https://pokeapi.co/">https://pokeapi.co/</Link>
        </Trans>
      </Typography>

      <Typography variant="body1" textAlign={'justify'}>
        <Trans i18nKey="home.link">
          Go to the <Link href="/pokedex">Pokedex</Link> page to see the list of
          Pokemon.
        </Trans>
      </Typography>
    </Box>
  );
};

export { Home };
