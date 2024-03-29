import { useEffect, useState } from 'react';
import { buildSalesByGenderChart } from '../../helpers';
import { PieChartConfig, SalesByGender2, SalesByGenderType } from '../../types';
import PieChartCard from '../pie-chart-card';
import { sumSalesByGender } from '../pie-chart-card/helpers';
import { formatPrice } from '../utils/formatters';
import { makeRequest } from '../utils/request';
import './style.css';

//export type FilterData = {
//story: Store | null;
//};

type Props = {
  filterStore?: number;
};

function SalesByGender({ filterStore }: Props) {
  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();
  const [totaSum, setSumTotal] = useState(0);

  useEffect(() => {
    makeRequest
      .get<SalesByGenderType[]>(`/sales/by-gender?storeId=${filterStore}`)
      .then((response) => {
        console.log(response.data);
        const newTotalSum = sumSalesByGender(response.data);
        setSumTotal(newTotalSum);
      });
  }, [filterStore]);

  useEffect(() => {
    makeRequest
      .get<SalesByGender2[]>(`/sales/by-gender?storeId=${filterStore}`)
      .then((response) => {
        const newSalesByGender2 = buildSalesByGenderChart(response.data);
        setSalesByGender(newSalesByGender2);
      });
  }, [filterStore]);

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
