'use client'

import React, { useState } from "react";

export default function Form({handleChange}:any) {
    const [name,setName] = useState('');
    return (

        <>
           <input type="text" onChange={(e)=>setName(e.target.value)}/>
           <button onClick={async () => {
                await handleChange(name)
                }}>
      store item
    </button>
        </>

    );
 


}