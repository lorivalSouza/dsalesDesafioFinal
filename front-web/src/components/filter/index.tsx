import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { FilterStore, Store } from '../../types';
import { buildFilterParams, makeRequest } from '../utils/request';
import './style.css';

type Props = {
  onFilterChange: (filter: FilterStore) => void;
};
function Filter({ onFilterChange }: Props) {
  const [filterStore, setFilterStore] = useState<FilterStore>();
  const [selectStores, setSelectStores] = useState<Store[]>([]);
  const [store, setStore] = useState<Store>();
  const params = useMemo(() => buildFilterParams(filterStore), [filterStore]);

  const onChangeStore = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStore = event.target.value;

    console.log(selectedStore);
    //setStore(selectedStore);
    //onFilterChange({ store: selectStores });
  };

  useEffect(() => {
    makeRequest.get('/stores').then((response) => {
      console.log('terter' + response.data);
      setSelectStores(response.data);
    });
  }, []);

  useEffect(() => {
    makeRequest.get('/sales-by-gender').then((response) => {
      console.log('terter' + response.data);
      setSelectStores(response.data);
    });
  }, [params]);

  return (
    <>
      <div className="base-card filter-container">
        <Select
          //value={store}
          //onChange={onChangeStore}
          options={selectStores}
          classNamePrefix="filter-select"
          getOptionLabel={(store: Store) => store.name}
          getOptionValue={(store: Store) => String(store.id)}
          isClearable
        />
      </div>
    </>
  );
}

export default Filter;
