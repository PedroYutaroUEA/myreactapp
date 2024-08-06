import React, { useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll';
import { VoidContainer } from './VoidContainer';

export function Body() {
  return (
    <div className="border-blue-400 border-2 h-screen w-screen m-5 flex flex-row items-center justify-center">
      <VoidContainer />
    </div>
  )
}
