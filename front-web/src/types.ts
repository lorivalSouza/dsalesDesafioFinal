export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type SalesByGenderType = {
  gender: string;
  sum: number;
};

export type Store = {
  id: number;
  name: string;
};

export type FilterStore = {
  stores?: number | undefined;
};

export type PieChartConfig = {
  labels: string[];
  series: number[];
};

export type SalesSummaryData = {
  sum?: number;
  min: number;
  max: number;
  avg: number;
  count: number;
};
