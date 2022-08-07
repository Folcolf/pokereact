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
  TableRow
} from "@mui/material"
import { PokemonStat } from "pokenode-ts"

import { STAT_COLOR } from "../../utils/colors"

interface ListStatsProps {
  stats: PokemonStat[]
}

const MIN = 0
const MAX = 255

const StatsList = ({ stats }: ListStatsProps) => {
  const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN)

  const getColor = (type: string): string => {
    const idx = Object.keys(STAT_COLOR).indexOf(type)
    return Object.values(STAT_COLOR)[idx]
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.paper
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0
    }
  }))

  const styles = {
    progress: (color: string) => {
      return {
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: "#ddd"
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: color
        } as SxProps
      }
    }
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Stat</StyledTableCell>
          <StyledTableCell colSpan={2}>Base Stat</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stats.map((stat) => (
          <StyledTableRow key={stat.stat.name}>
            <StyledTableCell>
              {capitalize(stat.stat.name).replace("-", " ")}
            </StyledTableCell>
            <StyledTableCell>{stat.base_stat}</StyledTableCell>
            <StyledTableCell width={256}>
              <LinearProgress
                variant="determinate"
                value={normalise(stat.base_stat)}
                sx={styles.progress(getColor(stat.stat.name))}
              />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { StatsList }
