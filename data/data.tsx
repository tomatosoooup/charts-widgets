import { v4 as uuidv4 } from 'uuid';

import { DonutChart } from '@/components/widgets/donut-chart';
import { HorizontalChart } from '@/components/widgets/horizontal-chart';
import { PieChart } from '@/components/widgets/pie-chart';


export const fakeData = [
  { id: uuidv4(), label: "Donut Chart", component: <DonutChart/> },
  { id: uuidv4(), label: "Pie Chart", component: <PieChart /> },
  { id: uuidv4(), label: "Horizontal Chart", component: <HorizontalChart /> },
];
