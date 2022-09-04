import { TypesTable } from '@/components/table/TypesTable';
import { TYPE_COLOR } from '@/utils/colors';
import { Box, Card, Chip, SxProps, Typography } from '@mui/material';
import { GameClient, Type } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

const TypeName = () => {
  const client = new GameClient();
  const { id } = useParams();

  const { i18n } = useTranslation();
  const { language } = i18n;

  const [type, setType] = useState<Type>();
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setType(undefined);
    client.api
      .get(`type/${id}`)
      .then((response) => response.data)
      .then((data: Type) => {
        setType(data);
        return (
          data.names.find((typeName) => typeName.language.name === language)
            ?.name ?? ''
        );
      })
      .then(setName);
  }, [id]);

  const getColor = (typeName: string): string => {
    const idx = Object.keys(TYPE_COLOR).indexOf(typeName);
    return Object.values(TYPE_COLOR)[idx];
  };

  const styles = {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    } as SxProps,
    container: {
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 'max-content',
      margin: 'auto',
    } as SxProps,
    title: (typeName: string) => {
      return {
        height: 'auto',
        fontSize: '2rem',
        backgroundColor: getColor(typeName),
      } as SxProps;
    },
  };

  return (
    <Box sx={styles.root}>
      {type ? (
        <Card sx={styles.container}>
          <Chip sx={styles.title(type.name)} label={name} />
          <TypesTable type={type} />
        </Card>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </Box>
  );
};

export { TypeName };
