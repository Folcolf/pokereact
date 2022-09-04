import { TYPE_COLOR } from '@/utils/colors';
import { Box, capitalize, Chip } from '@mui/material';
import { GameClient, NamedAPIResource, Type } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const Types = () => {
  const navigate = useNavigate();
  const client = new GameClient();
  const [types, setTypes] = useState<Type[]>([]);

  const { i18n } = useTranslation();
  const { language } = i18n;

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      justifyContent: 'space-evenly',
      alignSelf: 'center',
      width: '50%',
      margin: '15% 0 15% 0',
    },
    list: (color: string) => {
      return {
        display: 'flex',
        gridAutoFlow: 'column',
        gridColumnGap: '10px',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: color,
        margin: '10px',
      };
    },
  };

  const getColor = (type: string): string => {
    const idx = Object.keys(TYPE_COLOR).indexOf(type);
    return Object.values(TYPE_COLOR)[idx];
  };

  const handleClick = (id: string) => {
    navigate(`/type/${id}`);
  };

  useEffect(() => {
    client.api
      .get('type')
      .then((response) => response.data.results)
      .then((data) => {
        data.forEach((type: NamedAPIResource) => {
          client.api
            .get(`type/${type.name}`)
            .then((response) => response.data)
            .then((pokeType) => {
              setTypes((prev) =>
                [...prev, pokeType].sort((a, b) => a.id - b.id),
              );
            });
        });
      });
  }, []);

  return (
    <Box sx={styles.container}>
      {types &&
        types.map(({ id, name, names }) => (
          <Chip
            key={id}
            sx={styles.list(getColor(name))}
            label={capitalize(
              names.find((n) => n.language.name === language)?.name ?? '',
            )}
            onClick={() => handleClick(name)}
          />
        ))}
    </Box>
  );
};

export { Types };
