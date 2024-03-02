import { ZoneWidget } from "./zone-widget";
import { Chart } from "@/types";

interface DraggableZoneProps {
  widgets: { id: string; type: string }[];
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDeleteWidget: (index: number) => void;
}

export const DraggableZone = ({
  onDrop,
  onDragOver,
  widgets,
  onDeleteWidget,
}: DraggableZoneProps) => {
  const handleDragStart = (e: React.DragEvent, widgetType: string) => {
    e.dataTransfer.setData("widgetType", widgetType);
    console.log("widgetType", widgetType);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="h-fit min-h-[400px] border border-dashed px-10 py-5 grid grid-cols-4 gap-5"
    >
      {widgets.map((widget, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => {
            handleDragStart(e, `widget-${widget.id}`);
          }}
          // onDragOver={(e) => handleDragOver(e, index)}
          // onDrop={(e) => handleDrop(e, index)}
        >
          <ZoneWidget
            key={index}
            type={widget.type}
            onDelete={() => onDeleteWidget(index)}
          />
        </div>
      ))}
    </div>
  );
};
