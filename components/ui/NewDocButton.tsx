"use client"
import { useRouter } from "next/navigation"
import { Button } from "./button"
import {useTransition} from "react"
import { createNewDoc } from "@/actions/actions"
function NewDocButton() {
  const [ispending, starttrans] = useTransition()
  const router = useRouter();
  const handleCreateNewDoc=() => {
    starttrans(async () => {
      const {docId} =await createNewDoc();
      router.push(`/doc/${docId}`)
      })
    };
  return (
    
    <div>
      <Button onClick={handleCreateNewDoc} disabled={ispending}>
        {ispending? "Creating ...":"New Document"};
      </Button>
    </div>
  )
}

export default NewDocButton
