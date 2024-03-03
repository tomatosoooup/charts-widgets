import { useCallback, useEffect, useState } from "react";

import { generateFakeData } from "@/data/data";
import { DataItem } from "@/types";

import { uk } from "date-fns/locale";
import { format } from "date-fns";
import Image from "next/image";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const HorizontalChart = () => {
  const DATE_FORMAT = "d MMM yyyy, HH:mm";
  const [items, setItems] = useState<DataItem[]>([]);

  const onLoad = useCallback(() => {
    const array = generateFakeData(5);
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
      <h1 className="font-semibold text-2xl uppercase">Horizontal Chart</h1>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <ScrollArea
              className="flex bg-purple-400/70 rounded-xl items-center gap-y-2 p-2"
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              <div className="flex w-max space-x-4 p-4">
                {items.map(({ id, date, avatar, text, author }, index) => (
                  <Draggable draggableId={id} index={index} key={id}>
                    {(draggableProvided) => (
                      <div
                        className="border-[3px] border-white p-2 rounded-lg flex h-[150px] w-full items-start gap-x-5 relative text-right z-10 select-none cursor-default"
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
                        <div className="flex flex-col gap-0.5 w-full">
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
              </div>
              <ScrollBar orientation="horizontal" />
              {droppableProvided.placeholder}
            </ScrollArea>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
