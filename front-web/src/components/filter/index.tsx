import React, { useEffect, useState } from 'react';
import { Store } from '../../types';
import { makeRequest } from '../utils/request';
import './style.css';

type Props = {
  onFilterChange: (filter: number) => void;
};
function Filter({ onFilterChange }: Props) {
  const [store, setStore] = useState<Store>();
  const [storeList, setStoreList] = useState<Store[]>();

  const onChangeStore = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStore = event.target.value;
    //setStore();
    onFilterChange(selectedStore as unknown as number);
    console.log('selectedStore :' + selectedStore);
  };

  useEffect(() => {
    makeRequest.get<Store[]>('/stores').then((response) => {
      console.log('terter' + response.data);
      setStoreList(response.data);
    });
  }, []);

  return (
    <>
      <div className="base-card filter-container">
        <select className="filter-input" value={store?.id} onChange={onChangeStore}>
          <option value="0">Selecione um cidade</option>
          {storeList?.map((store) => {
            return (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

export default Filter;
