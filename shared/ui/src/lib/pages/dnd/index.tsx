// import React, { Component } from 'react'
// import { WritableOptions } from 'stream'

// // eslint-disable-next-line @typescript-eslint/ban-types
// export class Dnd extends Component<{value:string},{}> {
//   constructor()
//   {
//     super(this.props)
//     this.state = {
//       inputValue:'',
//       empList:[
//         {
//           empNames:'--select--'
//         }
//       ]
//     }
//   }
//   txtEmp=(e: { target: { value: any } })=>{
//     this.setState({inputValue:e.target.value})
//   }
//   override render() {
//     return (
//       <div className='flex flex-col w-1/4 gap-4'>

//       <input type="text" placeholder='enter' className='border'
//       onChange={this.txtEmp}
//       value={this.state.inputValue} />
//       <button className='border'>add</button>
//       <select className='border'>
//         {empRecord}
//       </select>
//     </div>
//     )
//   }
// }

// export default Dnd




















































/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { useState,useRef } from 'react';
import { DndContext } from '@dnd-kit/core';

import { Droppable } from '../../component/dropable';
import { Draggable } from '../../component/draggable';
import Input from '../Input'
function Dnd() {
    const [formValues, setFormValues] = useState([
      {
        label: "Name",
        type: "text",
        value: "",
      },
    ]);
    const [toggle,setToggle] =useState(false)

    const inputRef = useRef()
    const selectRef = useRef()

    const handleChange = (e: { target: { value: string; }; }, index: string | number) => {
      const values = [...formValues];
      values[index].value = e.target.value;
      setFormValues(values);
    };

    const handleAddField = (e:any) => {
      e.preventDefault();
      const values = [...formValues];
      // values.push({
      //   // label: inputRef.current.value || "label",
      //   // type: selectRef.current.value || "text",
      //   // value: "",
      // });
      setFormValues(values);
      setToggle(false);
    };
  
    const addBtnClick = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setToggle(true);
    };
    return (
      <div className="App">
        <form>
          {formValues.map((obj, index) => (
            <Input
              key={index}
              objValue={obj}
              onChange={handleChange}
              index={index}
            />
          ))}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    );
  }
export default Dnd;

