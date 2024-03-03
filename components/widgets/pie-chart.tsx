import { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import { uk } from "date-fns/locale";
import { format } from "date-fns";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { generateFakeData } from "@/data/data";
import { DataItem } from "@/types";

export const PieChart = () => {
  const DATE_FORMAT = "d MMM yyyy, HH:mm";
  const [items, setItems] = useState<DataItem[]>([]);

  const onLoad = useCallback(() => {
    const array = generateFakeData(4);
    setItems(array);
  }, []);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  const handleDragStart = () => {
    console.log("Dragged!");
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="font-semibold text-2xl uppercase">Pie Chart</h1>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div
              className="flex-1 bg-emerald-500/80 rounded-xl flex flex-col items-center gap-y-2 p-2 z-10 select-none cursor-default"
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {items.map(({ id, date, avatar, text, author }, index) => (
                <Draggable draggableId={id} index={index} key={id}>
                  {(draggableProvided) => (
                    <div
                      className="border-[3px] border-white p-2 rounded-lg flex h-[100px] w-full items-start gap-x-5 relative"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <Image
                        src={avatar}
                        alt={`${id}`}
                        width={40}
                        height={40}
                        className="basis-[40px] rounded-full object-contain"
                      />
                      <div className="flex flex-col gap-0.5">
                        <p className="font-semibold">{text}</p>
                        <p className="text-sm">{author}</p>
                        <p className="text-xs text-gray-200/70">
                          {format(new Date(date), DATE_FORMAT, {
                            locale: uk,
                          })}
                        </p>
                      </div>
                      <span className="absolute text-xs text-gray-700 right-2 bottom-2">
                        ID:{id}
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
