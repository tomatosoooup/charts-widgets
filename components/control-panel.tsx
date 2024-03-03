"use client";
import { v4 as uuidv4 } from "uuid";

import { Suspense, useCallback, useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { Skeletron } from "./skeletron";

import { initialData } from "@/data/data";
import { cn, reorder } from "@/lib/utils";

interface ComponentItem {
  id: string;
  label: string;
  component: JSX.Element;
}

export const ControlPanel = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [zoneData, setZoneData] = useState<ComponentItem[]>([]);

  // Підгрузка даних з data. Зробив сам так, щоб униткнути з проблемою генерації uuidv4() в client component
  const onLoad = useCallback(() => {
    setComponents(initialData);
  }, []);

  useEffect(() => onLoad(), [onLoad]);
  //

  // Обробник для початку Dnd. Нічого окрім console.log()
  const handleDragStart = () => {
    console.log("Dragged!");
  };

  // Обробка перестановки чартів
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || result.combine) return;

    const { source, destination } = result;
    const { index: sourceIndex } = source;
    const { index: destinationIndex, droppableId: destinationId } = destination;

    if (destinationId === "droppable") {
      const newData = reorder(components, sourceIndex, destinationIndex);
      setComponents(newData);
    } else if (destinationId === "droppable-2") {
      if (source.droppableId === "droppable-2") {
        const newZoneData = [...zoneData];
        const [removed] = newZoneData.splice(sourceIndex, 1);
        newZoneData.splice(destinationIndex, 0, removed);
        setZoneData(newZoneData);
      } else {
        const itemToMove = components[sourceIndex];
        const newItem = {
          id: uuidv4(),
          label: itemToMove.label,
          component: itemToMove.component,
        };
        setZoneData((prev) => [...prev, newItem]);
      }
    }
  };

  // Видалення з масиву
  const handleDeleteItem = (index: number) => {
    setZoneData((prevZoneData) => {
      const newZoneData = [...prevZoneData];
      newZoneData.splice(index, 1);
      return newZoneData;
    });
  };

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <h2 className="text-center uppercase font-semibold text-3xl">
        Choose a widget from list:
      </h2>
      <Suspense fallback={<Skeletron />}>
        <DragDropContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Droppable droppableId="droppable">
            {(droppableProvided) => (
              <ul
                className="flex flex-col gap-y-5 justify-center items-center select-none"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {components.map((data, index) => (
                  <Draggable draggableId={data.id} index={index} key={data.id}>
                    {(draggableProvided) => (
                      <li
                        className="flex items-center justify-center gap-4 rounded-md bg-default-50 p-4 border hover:bg-slate-200/40 w-[450px]"
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        {data.label}
                      </li>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </ul>
            )}
          </Droppable>

          <Droppable droppableId="droppable-2">
            {(droppableProvided) => (
              <div
                className={cn(
                  "border-2 border-dashed min-h-fit grid gap-5 p-5",
                  {
                    "sm:grid-cols-1 lg:grid-cols-3": zoneData.length > 0,
                  }
                )}
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {zoneData.length ? (
                  ""
                ) : (
                  <h1 className="text-gray-800 text-2xl text-center">
                    Drag widgets in this zone!
                  </h1>
                )}

                {zoneData.map((data, index) => (
                  <Draggable draggableId={data.id} index={index} key={data.id}>
                    {(draggableProvided) => (
                      <div
                        key={data.id}
                        className="flex flex-col gap-4 rounded-md p-4 border border-sky-300 relative"
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        {data.component}
                        <RiDeleteBin2Fill
                          onClick={() => handleDeleteItem(index)}
                          className="absolute top-2 right-2 w-8 h-8 text-red-500/90 hover:text-red-500 cursor-pointer"
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Suspense>
    </div>
  );
};
