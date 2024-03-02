interface WidgetCardProps {
  id: string;
  label: string;
  onDragStart: (e: React.DragEvent, widgetType: string) => void;
}

export const WidgetCard = ({ id, label, onDragStart }: WidgetCardProps) => {
  return (
    <div
      className="bg-cyan-800/80 flex items-center justify-center text-lg font-semibold uppercase hover:bg-cyan-700/80 cursor-pointer"
      draggable
      onDragStart={(e) => onDragStart(e, `widget-${id}`)}
    >
      {label}
    </div>
  );
};
