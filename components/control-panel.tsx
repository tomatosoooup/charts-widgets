"use client"
import { v4 as uuidv4 } from 'uuid';

import { Suspense, useCallback, useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

import { Skeletron } from './skeletron';

import { fakeData } from "@/data/data";
import { reorder } from "@/lib/utils";

interface ComponentItem {
  id: string;
  label: string;
  component: JSX.Element;
}

export const ControlPanel = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [zoneData, setZoneData] = useState<ComponentItem[]>([]);

  const onLoad = useCallback(()=> {setComponents(fakeData)}, [fakeData])

  useEffect(()=> onLoad(), [onLoad])
  
  const handleDragStart = () => {
    // if (window.navigator.vibrate) window.navigator.vibrate(100);
    console.log("Dragged!")
  };

  const handleDragEnd = (result: DropResult) => {
    if (result.combine) return;
  
    if (!result.destination) return;

  const sourceIndex = result.source.index;
  const destinationIndex = result.destination.index;

  if (result.destination.droppableId === "droppable") {

    const newData = reorder(components, sourceIndex, destinationIndex);
    setComponents(newData);
  } else if (result.destination.droppableId === "droppable-2") {
    const itemToMove = components[sourceIndex];
    const newItem = { id: uuidv4(), label: itemToMove.label,component: itemToMove.component };
    setZoneData(prev => [...prev, newItem]);
    // console.log()
  }
};
  

  const handleDeleteItem = (index: number) => {
    setZoneData(prevZoneData => {
      const newZoneData = [...prevZoneData];
      newZoneData.splice(index, 1);
      return newZoneData;
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className='text-center uppercase font-semibold text-3xl'>Choose a widget from list:</h2>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Suspense fallback={<Skeletron/>}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <ul className="grid grid-cols-3 gap-x-5" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
              {components.map((data, index) => (
  <Draggable draggableId={data.id} index={index} key={data.id}>
    {(draggableProvided) => (
      <li
        className="flex items-center justify-center gap-4 rounded-md bg-default-50 p-4 border"
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
        </Suspense>
        <Droppable droppableId="droppable-2">
          {(droppableProvided) => (
            <div className="border border-dashed min-h-[500px] h-fit grid grid-cols-3 gap-5 p-5" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
              {zoneData.map((data, index) => (
                <div key={data.id} className="flex flex-col gap-4 rounded-md bg-default-50 p-4 border h-[200px] relative">
                  {data.component}
                  <RiDeleteBin2Fill onClick={() => handleDeleteItem(index)} className="absolute top-2 right-2 w-10 h-10 text-red-600/80 hover:text-red-600/90 cursor-pointer" />
                </div>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
