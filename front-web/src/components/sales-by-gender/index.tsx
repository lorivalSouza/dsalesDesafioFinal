import { useEffect, useState } from 'react';
import { buildSalesByGenderChart } from '../../helpers';
import { PieChartConfig, SalesByGender } from '../../types';
import PieChartCard from '../pie-chart-card';
import { sumSalesByGender } from '../pie-chart-card/helpers';
import { formatPrice } from '../utils/formatters';
import { makeRequest } from '../utils/request';
import './style.css';

function SalesByDGender() {
  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();
  const [totaSum, SetSumTotal] = useState(0);

  useEffect(() => {
    makeRequest.get<SalesByGender[]>('/sales/by-gender?storeId=0').then((response) => {
      console.log(response.data);
      const newTotalSum = sumSalesByGender(response.data);
      SetSumTotal(newTotalSum);
    });
  }, []);

  useEffect(() => {
    makeRequest.get<SalesByGender[]>('/sales/by-gender?storeId=0').then((response) => {
      console.log(response);
      const newSalesByGender = buildSalesByGenderChart(response.data);
      setSalesByGender(newSalesByGender);
    });
  }, []);

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

export default SalesByDGender;
