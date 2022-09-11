import { Box, capitalize, Chip, SxProps } from '@mui/material';
import { TYPE_COLOR } from '@utils/colors';
import { PokemonClient, PokemonType } from 'pokenode-ts';
import { CSSProperties, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ListTypeProps {
  types: PokemonType[];
}

interface TypeName {
  name: string;
  locale: string;
}

const TypeList = ({ types }: ListTypeProps) => {
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

  const getColor = (type: string): string => {
    const idx = Object.keys(TYPE_COLOR).indexOf(type);
    return Object.values(TYPE_COLOR)[idx];
  };

  const containerStyle: SxProps = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    gridColumnGap: '10px',
    gridRowGap: '10px',
  };

  const linkStyle: CSSProperties = {
    minWidth: '25%',
  };

  return (
    <Box sx={containerStyle}>
      {typesName.map(({ name, locale }: TypeName) => (
        <Link to={`/type/${name}`} key={name} style={linkStyle}>
          <Chip
            label={capitalize(locale)}
            sx={{
              backgroundColor: getColor(name),
              width: '100%',
              cursor: 'pointer',
            }}
          />
        </Link>
      ))}
    </Box>
  );
};

export { TypeList };
