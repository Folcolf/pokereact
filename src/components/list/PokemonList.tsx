import { ImageList, Pagination } from '@mui/material';
import { NamedAPIResource } from 'pokenode-ts';
import { ChangeEvent, useEffect, useState } from 'react';
import { PokemonItem } from './item/PokemonItem';

interface PokemonListProps {
  pokemons: NamedAPIResource[];
}

const itemsPerPage = 20;

const PokemonList = ({ pokemons }: PokemonListProps) => {
  const nbPages = Math.ceil(pokemons.length / itemsPerPage);

  const [items, setItems] = useState<NamedAPIResource[]>([]);
  const [pagination, setPagination] = useState<{
    limit: number;
    offset: number;
  }>({ limit: itemsPerPage, offset: 0 });

  useEffect(() => {
    setItems(
      pokemons.slice(pagination.offset, pagination.offset + pagination.limit),
    );
  }, [pagination]);

  useEffect(() => {
    setPagination({ limit: itemsPerPage, offset: 0 });
  }, [pokemons]);

  const handleChangePage = (_event: ChangeEvent<unknown>, page: number) => {
    setPagination({ ...pagination, offset: (page - 1) * itemsPerPage });
  };

  return (
    <>
      <ImageList
        cols={1}
        sx={{
          justifyItems: 'center',
          width: '100%',
        }}
      >
        {items.map((item) => (
          <PokemonItem key={item.name} entry={item} />
        ))}
      </ImageList>
      <Pagination
        count={nbPages}
        page={pagination.offset / itemsPerPage + 1}
        onChange={handleChangePage}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
        }}
        color="primary"
      />
    </>
  );
};

export { PokemonList };
