import { SalesByGenderType } from './types';

export const buildSalesByGenderChart = (sales: SalesByGenderType[]) => {
  const labels = sales.map((sale) => sale.gender);
  const series = sales.map((sale) => sale.sum);

  return {
    labels,
    series
  };
};
