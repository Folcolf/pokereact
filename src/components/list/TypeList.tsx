import { Box, capitalize, Chip, SxProps, Typography } from '@mui/material';
import { TYPE_COLOR } from '@utils/colors';
import { PokemonClient, PokemonType } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

interface ListTypeProps {
  types: PokemonType[];
}

interface TypeName {
  name: string;
  locale: string;
}

const TypeList = ({ types }: ListTypeProps) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const client = new PokemonClient();

  const [typesName, setTypesName] = useState<TypeName[]>([]);
  useEffect(() => {
    setTypesName([]);
    types.forEach((pokeType) => {
      client.getTypeByName(pokeType.type.name).then((type) => {
        const { name } =
          type.names.find((n) => n.language.name === language) ?? {};
        setTypesName((prev) => [
          ...prev,
          { name: pokeType.type.name, locale: name } as TypeName,
        ]);
      });
    });
  }, [language]);

  const handleClick = (id: string) => {
    navigate(`/type/${id}`);
  };

  const getColor = (type: string): string => {
    const idx = Object.keys(TYPE_COLOR).indexOf(type);
    return Object.values(TYPE_COLOR)[idx];
  };

  const styles: SxProps = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridColumnGap: '10px',
  };

  return (
    <Typography variant="h5" sx={{ m: 1 }}>
      <Box sx={styles}>
        {typesName.map(({ name, locale }: TypeName) => (
          <Chip
            key={name}
            label={capitalize(locale)}
            sx={{ backgroundColor: getColor(name) }}
            onClick={() => handleClick(name)}
          />
        ))}
      </Box>
    </Typography>
  );
};

export { TypeList };
