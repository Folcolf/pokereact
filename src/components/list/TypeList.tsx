import { Box, capitalize, Chip, SxProps, Typography } from "@mui/material"
import { PokemonType } from "pokenode-ts"

import { TYPE_COLOR } from "../../utils/colors"

interface ListTypeProps {
  types: PokemonType[]
}

const TypeList = ({ types }: ListTypeProps) => {
  const getColor = (type: string): string => {
    const idx = Object.keys(TYPE_COLOR).indexOf(type)
    return Object.values(TYPE_COLOR)[idx]
  }

  const styles = {
    chip: {
      display: "grid",
      gridAutoFlow: "column",
      gridColumnGap: "10px"
    } as SxProps
  }
  return (
    <Typography variant="h5" sx={{ m: 1 }}>
      <Box sx={styles.chip}>
        {types.map((item) => (
          <Chip
            key={item.type.name}
            label={capitalize(item.type.name)}
            sx={{ backgroundColor: getColor(item.type.name) }}
          />
        ))}
      </Box>
    </Typography>
  )
}

export { TypeList }
