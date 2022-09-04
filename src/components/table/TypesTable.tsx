import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from '@mui/material';
import { NamedAPIResource, PokemonType, Type } from 'pokenode-ts';
import { useTranslation } from 'react-i18next';
import { TypeList } from '../list/TypeList';

interface TypesTableProps {
  type: Type;
}

const TypesTable = ({ type }: TypesTableProps) => {
  const { i18n } = useTranslation();
  const { t } = i18n;

  const toPokemonType = (value: NamedAPIResource[]): PokemonType[] => {
    return value.map((val, i) => ({
      slot: i,
      type: val,
    }));
  };

  const styles = {
    title: {
      fontSize: '1.6rem',
      padding: '10px',
      margin: '10px',
    },
    table: {
      marginTop: '10px',
    },
    head: {
      fontSize: '1.2rem',
      border: ' 1px solid',
      borderColor: (theme: Theme) => theme.palette.background.default,
    },
    cell: {
      border: ' 1px solid',
      borderColor: (theme: Theme) => theme.palette.background.default,
    },
  };

  return (
    <>
      <Table sx={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3} sx={styles.title}>
              {t<string>('types.defence.value')}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={styles.head}>
              {t<string>('types.defence.weak')}
            </TableCell>
            <TableCell align="center" sx={styles.head}>
              {t<string>('types.defence.resist')}
            </TableCell>
            <TableCell align="center" sx={styles.head}>
              {t<string>('types.defence.immune')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.cell}>
              <TypeList
                types={toPokemonType(type.damage_relations.double_damage_from)}
              />
            </TableCell>
            <TableCell sx={styles.cell}>
              <TypeList
                types={toPokemonType(type.damage_relations.half_damage_from)}
              />
            </TableCell>
            <TableCell sx={styles.cell}>
              <TypeList
                types={toPokemonType(type.damage_relations.no_damage_from)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table sx={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3} sx={styles.title}>
              {t<string>('types.attack.value')}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={styles.head}>
              {t<string>('types.attack.efficient')}
            </TableCell>
            <TableCell align="center" sx={styles.head}>
              {t<string>('types.attack.notVeryEfficient')}
            </TableCell>
            <TableCell align="center" sx={styles.head}>
              {t<string>('types.attack.inefficient')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.cell}>
              <TypeList
                types={toPokemonType(type.damage_relations.double_damage_to)}
              />
            </TableCell>
            <TableCell sx={styles.cell}>
              <TypeList
                types={toPokemonType(type.damage_relations.half_damage_to)}
              />
            </TableCell>
            <TableCell sx={styles.cell}>
              <TypeList
                types={toPokemonType(type.damage_relations.no_damage_to)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export { TypesTable };
