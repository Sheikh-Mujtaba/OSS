import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import useCheckSession from "../hooks/useCheckSession";


interface Msg{
  content :string ,
  isSent : boolean ,
}

const Chat : React.FC =()=>{

  const [msgList,setMsgList] = useState<Msg[]>([]);
  const [currentMsg,setCurrentMsg] = useState<string>('');
  // const [userName, setUserName] = useState<string | null>(null);

  const {isLoggedIn,setIsLoggedIn} = useCheckSession ();

  const socket = io ('http://localhost:8082');



 
  useEffect(() => {
    socket.on ('receive_message' , (data : string ) => {
      setMsgList ((prevMsg) => [...prevMsg ,
        {content :data , isSent :false }
      ]) ;
    });

    return () =>{
      socket.off('receive_message');
    }
  } ,[socket]);

  const sendMsg = () => {
    if (currentMsg.trim()) { // Ensure the message is not empty
      socket.emit("send_message", currentMsg); // Emit the message to the server
  
      setMsgList((prevMsg) => [...prevMsg, 
        {content :currentMsg , isSent :true}
      ]); // Add the message to the local list
      setCurrentMsg(''); // Clear the input field
    }
  };
  

    return (
        <>
         <div className="h-[90vh] " >
       
            <div className="h-[100%] flex flex-col gap-[1rem] justify-center items-center " >
        
              
               {isLoggedIn ? (
                 <div className="w-[80%] lg:w-[35%] h-[70%] bg-white border border-[#F29F58] rounded-lg px-2 py-4 flex  flex-col justify-end  gap-[2rem] ">
                      <h1 className="text-xl px-3 py-1 text-white bg-[#F29F58] rounded ">Topic : Kimura</h1>

                    <div className="overflow-y-auto  ">
                      
                 {msgList.map((msg,index)=>(
                     <div key={index} className={`flex items-center   ${msg.isSent ? ("justify-end") : ("justify-start")}`} >

                      <div className={`text-xl rounded-lg px-3 py-2 my-3  ${ msg.isSent ? ("bg-blue-500 text-white") : ("bg-green-500 text-white")}`}>
                      {msg.content}
                      </div>
                       
                       </div>
                 ))}
                      </div>

                 





                 <div className="flex gap-[1rem] w-[100%]">
                     
                     <input placeholder="Message" type="text" name="message" className="w-full rounded-md py-1 px-2 text-black border border-[#F29F58] " value={currentMsg} onChange={e => setCurrentMsg(e.target.value)}   />
                     <button className="bg-[#F29F58] text-white rounded-lg px-3 py-1" onClick={sendMsg}>Send</button>
                 </div>




             </div>
               ) : (<h1 className=" py-[1rem] px-[3rem] text-3xl bg-[#F29F58] text-white rounded">Please Log in to enter the room</h1>)}
            </div>
         </div>
        </>
    )
}
export default Chat ;