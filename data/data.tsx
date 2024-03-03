import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { DataItem } from "@/types";

import { DonutChart } from "@/components/widgets/donut-chart";
import { HorizontalChart } from "@/components/widgets/horizontal-chart";
import { PieChart } from "@/components/widgets/pie-chart";

export const initialData = [
  { id: uuidv4(), label: "Donut Chart", component: <DonutChart /> },
  { id: uuidv4(), label: "Pie Chart", component: <PieChart /> },
  { id: uuidv4(), label: "Horizontal Chart", component: <HorizontalChart /> },
];

export const generateFakeData = (count: number): DataItem[] => {
  const fakeDataArray: DataItem[] = [];

  for (let i = 0; i < count; i++) {
    const id = uuidv4();
    const authorName = faker.person.fullName();
    const loremText = faker.lorem.words({ min: 2, max: 6 });
    const date = new Date();
    const avatar = faker.image.avatar();

    const dataObject = {
      id: id,
      author: authorName,
      text: loremText,
      date: date,
      avatar: avatar,
    };

    fakeDataArray.push(dataObject);
  }

  return fakeDataArray;
};
