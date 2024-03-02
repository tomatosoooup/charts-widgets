"use client";

import { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";

import { Chart } from "@/types";

import {DragDropContext, Droppable, Draggable, DropResult} from "@hello-pangea/dnd"
import { reorder } from "@/lib/utils";
import { fakeData } from "@/data";



export const ControlPanel = () => {
  const [data, setData] = useState<Chart[]>(fakeData)

  const [zoneData, setZoneData] = useState<Chart[]>([])

  const handleDragStart = ()=> {
    if(window.navigator.vibrate) window.navigator.vibrate(100);
  }

  const handleDragEnd = (result: DropResult)=> {
    if (result.combine) {
      const newData: Chart[] = [...data];
      newData.splice(result.source.index, 1);
      setData(newData);
      setZoneData((prev) => [...prev, data[result.source.index]]);
      return;
    }
    
    if (!result.destination) return;
    
    if (result.destination.droppableId === "droppable-2") {
      const item = data[result.source.index];
      setZoneData((prev) => [...prev, item]);
    }
  }

  const handleDeleteItem = (index: number) => {
    setZoneData(prevZoneData => {
      const newZoneData = [...prevZoneData];
      newZoneData.splice(index, 1);
      return newZoneData;
    });
  };
  

  return (<><div className="flex flex-col gap-5 w-full">
  <DragDropContext 
  onDragStart={handleDragStart} 
  onDragEnd={handleDragEnd}>
    <Droppable droppableId="droppable">
    {(droppableProvided)=>(
      <ul className="grid grid-cols-3 gap-x-5" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
        {/* {data.map((data, index)=> (
          <Draggable draggableId={data.id} index={index} key={data.id}>
            {(draggableProvided)=> (
              <li className="flex items-center justify-center gap-4 rounded-md bg-default-50 p-4 border" {...draggableProvided.dragHandleProps} {...draggableProvided.draggableProps} ref={draggableProvided.innerRef}>
                {data.label}
              </li>
            )}
          </Draggable>
        ))} */}
        
        {droppableProvided.placeholder}
      </ul>
    )}</Droppable>
    <Droppable droppableId="droppable-2">
  {(droppableProvided)=> (
    <div className="border border-dashed h-[500px] grid grid-cols-3 gap-5 p-5" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>{zoneData.map((data, index)=> (
      <div className="flex flex-col gap-4 rounded-md bg-default-50 p-4 border h-[200px] relative" >
                <h3 className="uppercase font-semibold">{data.label}</h3>
                <RiDeleteBin2Fill onClick={() => handleDeleteItem(index)} className="absolute top-2 right-2 w-10 h-10 text-red-600/80 hover:text-red-600/90 cursor-pointer"></RiDeleteBin2Fill>
              </div>
    ))}{droppableProvided.placeholder}</div>
    
  )}
  
</Droppable>
    </DragDropContext>
</div>

</>)
  
  
};
