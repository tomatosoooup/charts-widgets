"use client";

import { useState } from "react";
import { DraggableZone } from "./draggable-zone";
import { WidgetCard } from "./widget-card";
import { Chart } from "@/types";

const data = [
  {
    id: "1",
    label: "Donut Chart",
    type: "donut",
  },
  {
    id: "2",
    label: "Horizontal Chart",
    type: "horizontal",
  },
  {
    id: "3",
    label: "Pie Chart",
    type: "pie",
  },
];

export const ControlPanel = () => {
  const [widgets, setWidgets] = useState<Chart[]>([]);

  const handleDragStart = (e: React.DragEvent, widgetType: string) => {
    e.dataTransfer.setData("widgetType", widgetType);
    console.log("widgetType", widgetType);
  };

  const handleDragUpdate = (e: React.DragEvent) => {
    const widgetType = e.dataTransfer.getData("widgetType") as string;
    const widget = data.find((item) => `widget-${item.id}` === widgetType);
    if (widget) {
      setWidgets((prevWidgets) => [...prevWidgets, widget]);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDeleteWidget = (chart_index: number) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((_, index) => index !== chart_index)
    );
  };

  return (
    <section className="flex flex-col w-full gap-y-10">
      <div className="h-[100px] bg-transparent grid grid-cols-3 gap-x-5">
        {data.map((data, index) => (
          <WidgetCard
            key={index}
            id={data.id}
            label={data.label}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
      <DraggableZone
        onDrop={handleDragUpdate}
        onDragOver={handleDragEnd}
        onDeleteWidget={handleDeleteWidget}
        widgets={widgets}
      />
    </section>
  );
};
