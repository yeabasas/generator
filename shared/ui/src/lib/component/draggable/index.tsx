/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {Input} from '../../models/input';

export function Draggable(props:any) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    data:{
      type:(Object.keys(Input) as Array<keyof typeof Input>).map((type) => {
          if(type === props.text){
            return Input.TEXT
          }else if(props === Input.CHECKBOX){
            return props.checkbox
          }
      })
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}