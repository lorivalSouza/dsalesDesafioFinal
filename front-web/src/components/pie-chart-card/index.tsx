import './style.css';
import './helpers.ts';
import ReactApexChart from 'react-apexcharts';
import { buildPieChartConfig } from './helpers';

type Props = {
  labels?: string[];
  name: string;
  series?: number[];
};

function PieChartCard({ labels = [], name, series = [] }: Props) {
  return (
    <div className="pie-chart-card">
      <ReactApexChart
        options={buildPieChartConfig(labels, name)}
        type="donut"
        with="700 "
        height="700"
        series={series}
      />
    </div>
  );
}

export default PieChartCard;
