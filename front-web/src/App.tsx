import './App.css';
import './responsive.css';
import Filter from './components/filter';
import Header from './components/header';
import SalesByDGender from './components/sales-by-gender';
import { useState } from 'react';
import { FilterStore } from './types';

function App() {
  const [filterStore, setFilterStore] = useState<FilterStore>();
  const onFilterChange = (filter: FilterStore) => {
    setFilterStore(filter);
  };
  return (
    <>
      <div className="App">
        <Header />
        <div className="app-container">
          <Filter onFilterChange={onFilterChange} />
          <SalesByDGender />
        </div>
      </div>
    </>
  );
}

export default App;
