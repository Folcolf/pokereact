import { Tab, Tabs } from "@mui/material"
import { GameClient, Generation } from "pokenode-ts"
import { SyntheticEvent, useEffect, useState } from "react"

interface PokeTabProps {
  region: number
  updateValue: (newValue: number) => void
}

const PokeTab = ({ region, updateValue }: PokeTabProps) => {
  const client = new GameClient()

  const [value, setValue] = useState(region)
  const [versions, setVersions] = useState<Generation[]>([])

  useEffect(() => {
    client
      .listGenerations()
      .then((data) => data.results)
      .then((results) => {
        results.forEach((data) => {
          client.getGenerationByName(data.name).then((generation) => {
            setVersions((prev) =>
              [...prev, generation].sort((a, b) => a.id - b.id)
            )
          })
        })
      })
  }, [])

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
    updateValue(newValue)
  }

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    }
  }

  if (isNaN(value)) {
    return <div>Loading...</div>
  }

  return (
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab label="National" value={1} {...a11yProps(1)} />
      {versions.map((vrs) => (
        <Tab
          key={vrs.id + 1}
          {...a11yProps(vrs.id + 1)}
          label={vrs.main_region.name}
          value={vrs.id + 1}
        />
      ))}
    </Tabs>
  )
}

export { PokeTab }
