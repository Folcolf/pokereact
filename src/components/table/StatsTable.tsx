import {
  capitalize,
  LinearProgress,
  linearProgressClasses,
  styled,
  SxProps,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from '@mui/material';
import { STAT_COLOR } from '@utils/colors';
import { PokemonClient, PokemonStat } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ListStatsProps {
  stats: PokemonStat[];
}

interface StatName {
  name: string;
  locale: string;
}

const MIN = 0;
const MAX = 255;

const StatsTable = ({ stats }: ListStatsProps) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const client = new PokemonClient();

  const [statsName, setStatsName] = useState<StatName[]>([]);

  useEffect(() => {
    setStatsName([]);
    stats.forEach((pokeStat) => {
      client.getStatByName(pokeStat.stat.name).then((stat) => {
        const { name } =
          stat.names.find((n) => n.language.name === language) ?? {};
        setStatsName((prev) => [
          ...prev,
          { name: pokeStat.stat.name, locale: name } as StatName,
        ]);
      });
    });
  }, [language]);

  const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN);

  const getColor = (type: string): string => {
    const idx = Object.keys(STAT_COLOR).indexOf(type);
    return Object.values(STAT_COLOR)[idx];
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.paper,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const styles = {
    progress: (color: string) => {
      return {
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: '#ddd',
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: color,
        } as SxProps,
      };
    },
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>{t<string>('stats.title')}</StyledTableCell>
          <StyledTableCell colSpan={2}>
            {t<string>('stats.base')}
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {statsName.map(({ name, locale }) => {
          const stat = stats.find((s) => s.stat.name === name);

          return (
            <StyledTableRow key={name}>
              <StyledTableCell>
                {capitalize(locale).replace('-', ' ')}
              </StyledTableCell>
              <StyledTableCell>{stat?.base_stat}</StyledTableCell>
              <StyledTableCell width={256}>
                <LinearProgress
                  variant="determinate"
                  value={normalise(stat?.base_stat ?? 0)}
                  sx={styles.progress(getColor(name))}
                />
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { StatsTable };
