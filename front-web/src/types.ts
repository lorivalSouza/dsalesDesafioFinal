export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type SalesByGender = {
  gender: string;
  sum: number;
};

export type Store = {
  id: number;
  name: string;
};

export type FilterStore = {
  store?: Store;
};

export type PieChartConfig = {
  labels: string[];
  series: number[];
};
