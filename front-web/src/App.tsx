import './App.css';
import './responsive.css';
import Filter from './components/filter';
import Header from './components/header';
import SalesByGender from './components/sales-by-gender';
import { useState } from 'react';

function App() {
  const [filterStore, setFilterStore] = useState<number>(0);
  const onFilterChange = (filter: number) => {
    setFilterStore(filter);
    console.log('filter filter' + filter);
  };
  return (
    <>
      <div className="App">
        <Header />
        <div className="app-container">
          <Filter onFilterChange={onFilterChange} />
          <SalesByGender filterStore={filterStore} />
        </div>
      </div>
    </>
  );
}

export default App;
