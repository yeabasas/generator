/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { Droppable } from '../../component/dropable';
import { Draggable } from '../../component/draggable';

function Dnd() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <div className='flex border-2 w-1/2'>
      <Draggable id="text" type='text'>Text</Draggable>
      {/* <Draggable id="checkbox">checkbox</Draggable> */}
    </div>
  );

  return (
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

        {containers.map((type) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
        <div className='p- m-4 border-2 w-1/2'>
            <Droppable key={type} id={type}>
            {parent === type ? draggableMarkup : 'Drop here'}
            </Droppable>
        </div>
        ))}
        </DndContext>

  );

  function handleDragEnd(event: any) {
    const { active,over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    // if (over && over.data.current.accepts.includes(active.data.current.type)) {
        // do stuff
        setParent(over ? over.type : null);
    //   }
  }
}
export default Dnd;
