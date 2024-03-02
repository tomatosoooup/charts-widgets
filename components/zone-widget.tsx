import { DonutChart } from "./widgets/donut-chart";
import { HorizontalChart } from "./widgets/horizontal-chart";
import { PieChart } from "./widgets/pie-chart";
import React from "react";

interface ZoneWidgetProps {
  type: string;
  onDelete: () => void;
}

const typeMap: {
  [key: string]: JSX.Element;
} = {
  donut: <DonutChart />,
  horizontal: <HorizontalChart />,
  pie: <PieChart />,
};

export const ZoneWidget = ({ onDelete, type }: ZoneWidgetProps) => {
  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div
      className="border bg-white rounded-xl text-black px-4 py-2 flex flex-col cursor-pointer"
      draggable
    >
      <button
        type="button"
        className="text-black/80 bg-red-500/80 hover:bg-red-600 w-[60px] self-end rounded-lg"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
      {typeMap[type]}
    </div>
  );
};
