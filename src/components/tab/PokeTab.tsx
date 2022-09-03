import { SxProps, Tab, Tabs, Theme } from '@mui/material';
import { GameClient, Generation } from 'pokenode-ts';
import { SyntheticEvent, useEffect, useState } from 'react';

interface PokeTabProps {
  region: number;
  updateValue: (newValue: number) => void;
}

const PokeTab = ({ region, updateValue }: PokeTabProps) => {
  const client = new GameClient();

  const [value, setValue] = useState(region);
  const [versions, setVersions] = useState<Generation[]>([]);

  useEffect(() => {
    client
      .listGenerations()
      .then((data) => data.results)
      .then((results) => {
        results.forEach((data) => {
          client.getGenerationByName(data.name).then((generation) => {
            setVersions((prev) =>
              [...prev, generation].sort((a, b) => a.id - b.id),
            );
          });
        });
      });
  }, []);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    updateValue(newValue);
  };

  if (isNaN(value)) {
    return <div>Loading...</div>;
  }

  const styles = {
    root: {
      ['&:hover']: {
        backgroundColor: (theme: Theme) => theme.palette.action.hover,
      },
    } as SxProps,
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab label="National" value={1} sx={styles.root} />
      {versions.map((vrs) => (
        <Tab
          key={vrs.id + 1}
          label={vrs.main_region.name}
          value={vrs.id + 1}
          sx={styles.root}
        />
      ))}
    </Tabs>
  );
};

export { PokeTab };
