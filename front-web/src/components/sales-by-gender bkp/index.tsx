import { useEffect, useMemo, useState } from 'react';
import { FilterStore, PieChartConfig, SalesByGenderType } from '../../types';
import PieChartCard from '../pie-chart-card';
import { sumSalesByGender } from '../pie-chart-card/helpers';
import { formatPrice } from '../utils/formatters';
import { buildFilterParams, makeRequest } from '../utils/request';
import './style.css';

//export type FilterData = {
//story: Store | null;
//};

//type Props = {
// onFilterChange: (filter: number) => void;
//};

function SalesByGender() {
  const [filterStore, setFilterStore] = useState<FilterStore>();
  const onFilterChange = (filter: number) => {
    //setFilterStore(filter);
    console.log('Big filter filter' + filter);
  };
  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();
  const [totaSum, SetSumTotal] = useState(0);
  const params = useMemo(() => buildFilterParams(filterStore), [filterStore]);

  useEffect(() => {
    makeRequest
      .get<SalesByGenderType[]>('/sales/by-gender?storeId=', { params })
      .then((response) => {
        console.log(response.data);
        const newTotalSum = sumSalesByGender(response.data);
        SetSumTotal(newTotalSum);
      });
  }, [params]);

  return (
    <div className="base-card sales-by-gender-container">
      <div className="sales-by-gender-data">
        <div className="sales-by-gender-quantity-container">
          <h2 className="sales-by-gender-quantity">{formatPrice(totaSum)}</h2>
          <span className="sales-by-gender-quantity-layer">Total de vendas</span>
        </div>
        <div className="sales-by-gender-chart">
          <PieChartCard
            name="Lojas"
            labels={salesByGender?.labels}
            series={salesByGender?.series}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesByGender;
