'use client'
import NewDocButton from "./NewDocButton";

import {MenuIcon} from "lucide-react"

import {useCollection} from "react-firebase-hooks/firestore"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from "@clerk/nextjs";
import { DocumentData, collectionGroup,query,where } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect , useState} from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData{
  createdAt: string;
  role: "owner" | "editor"
  roomId: string;
  userId: string;
  
}

export default function Sidebar() {
  const { user } = useUser(); 
   const [groupedData, setGroupedData] = useState<{ owner: RoomDocument[]; editor: RoomDocument[] }>({
    owner: [],
    editor: []
  });
  const [data, loading, error] = useCollection(
    user && (
      query(collectionGroup(db, "rooms"),
        where('userId', '==', user.emailAddresses[0].toString())
      )
    )
  )
  useEffect(() => {
    if (!data) return;
    
    const grouped = data.docs.reduce<{ owner: RoomDocument[]; editor: RoomDocument[]; }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({ ...roomData, roomId: curr.id });
        }
        else {
          acc.editor.push({ ...roomData, roomId: curr.id }); // Add `roomId` to the object
        }
        return acc;
      }, {
      owner: [],
      editor: [],
    }
      
  );
  
    setGroupedData(grouped);
  },[data])
  const menuOptions = (
    <>
      <NewDocButton />
      
      {/* my documents */}
      <div>
         <h2 className="text-gray-600 font-sm font-semibold mt-6">My Documents</h2>
          {
        groupedData.owner.length === 0 ? (
          <h2 className="text-gray-600 font-sm font-semibold mt-6">No Docs Found</h2>
        ) : (
            <>
             
              <div className="mx-1 my-3 flex flex-col gap-y-3
              ">
                {
        groupedData.owner.map((doc) => (
          <SidebarOption key={doc.roomId} href={`/doc/${doc.roomId}`}  id={ doc.roomId}/>
              ))
              }
              </div>
            
              </>
          )
     }
      </div>
    
      

      {/* shared with me */}
      <div>
         <h2 className="text-gray-600 font-sm font-semibold mt-6">Shared With Me</h2>
          {
        groupedData.editor.length === 0 ? (
          <h2 className="text-gray-600 font-sm mx-1 mt-3">No Docs Found</h2>
        ) : (
            <>
             
              <div className="mx-1 my-3 flex flex-col gap-y-3
              ">
                {
        groupedData.editor.map((doc) => (
          <SidebarOption key={doc.roomId} href={`/doc/${doc.roomId}`}  id={ doc.roomId}/>
              ))
              }
              </div>
            
              </>
          )
     }
      </div>
      {/* list */}
    </>
  )
  return (
      <div className="p-2 md:p-5 bg-gray-200 relative">
          <div className="md:hidden">
              <Sheet>
              <SheetTrigger>
                  <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40}/> 
            </SheetTrigger>
            <SheetContent side='left'>
                <SheetHeader>
              <SheetTitle>Menu</SheetTitle>    
              
                      <div>
                {menuOptions}
                      </div>
             
                </SheetHeader>
            </SheetContent>
            </Sheet>
 
          </div>
         
          <div className="hidden md:inline">
              {menuOptions}
          </div>
      
    </div>
  )
}
