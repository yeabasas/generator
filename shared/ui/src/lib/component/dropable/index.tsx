/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React from 'react';
import {useDroppable} from '@dnd-kit/core';
export function Droppable(props:any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
    data:{
      accepts:['text','checkbox']
    }
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}