'use-client'

import { FormEvent, useState, useTransition } from "react";
import { Input } from "./input";
import { Button } from "./button";

function Document({ id }: {
    id: string;
}) {
    const [input, setinput] = useState("");
    const [isupdating, setisupdating] = useTransition();
    const updateTitle = (e: FormEvent) => {
        e.preventDefault();
        
    }
  return (
      <div>
          <div className=" flex items-center justify-center mb-4" >
              <form className="flex w-2/3 items-center space-x-2" onSubmit={updateTitle}>
                  <Input
                      value={input}
                      onChange={(e) => {
                          setinput(e.target.value)
                      }}
                      className="text-xl rounded-3xl"
                  /> 
                  <Button disabled={isupdating} className="rounded-2xl">
                      {isupdating?"Updating ...":"Update"}
                  </Button>
              </form>
          </div>
          
      Document {id}
    </div>
  )
}

export default Document
