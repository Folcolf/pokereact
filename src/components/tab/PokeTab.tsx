import { isMobile, useWindowSize } from '@/utils/size';
import { Box, SxProps, Tab, Tabs, Theme } from '@mui/material';
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
  const [width, height] = useWindowSize();

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
      maxWidth: isMobile(width, height) ? '75%' : '50%',
      backgroundColor: (theme: Theme) => theme.palette.background.paper,
    },
    tab: {
      ['&:hover']: {
        backgroundColor: (theme: Theme) => theme.palette.action.hover,
      },
    } as SxProps,
  };

  return (
    <Box sx={styles.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="National" value={1} sx={styles.tab} />
        {versions.map((vrs) => (
          <Tab
            key={vrs.id + 1}
            label={vrs.main_region.name}
            value={vrs.id + 1}
            sx={styles.tab}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export { PokeTab };
