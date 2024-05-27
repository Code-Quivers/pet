import { Bar } from "react-chartjs-2";
import { data, options } from "./OrderChartMonthly";

const ChartSection = () => {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default ChartSection;
