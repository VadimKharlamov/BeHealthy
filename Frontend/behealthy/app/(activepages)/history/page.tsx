"use client"

import { useEffect, useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import '../../page.module.css'
import { deleteMedHistory, getMedHistory } from "@/app/services/medHistory";
import { deleteEventHistory, getEventHistory } from "@/app/services/eventHistory";
import { MedHistoryTable } from "@/app/components/MedHistoryTable";
import { EventHistoryTable } from "@/app/components/EventHistoryTable";
function parseJwt(token: string) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).userId;
}

export default function HistoryPage() {
    const [medHistory, setMedHistory] = useState<MedHistory[]>([]);
    const [eventHistory, setEventHistory] = useState<EventHistory[]>([]);

	useLayoutEffect(() => {
		if(localStorage.getItem("auth") != "true"){
		  redirect("/login")
		}
	  }, [])   
  
      useEffect(() => {
          const getUserMedHistory = async () => {
              const userId = parseJwt(localStorage.getItem("data") || '{}')
              const medHistory = await getMedHistory(userId);
              setMedHistory(medHistory);
          };
          const getUserEventHistory = async () => {
              const userId = parseJwt(localStorage.getItem("data") || '{}')
              const eventHistory = await getEventHistory(userId);
              setEventHistory(eventHistory);
          };
          getUserMedHistory();
          getUserEventHistory();
      }, []);

      const handleDeleteMedHistory = async (id: string) => {
        await deleteMedHistory(id);
        const userId = parseJwt(localStorage.getItem("data") || '{}')
        const medHistoryData = await getMedHistory(userId);
        setMedHistory(medHistoryData);
    };
    const handleDeleteEventHistory = async (id: string) => {
        await deleteEventHistory(id);
        const userId = parseJwt(localStorage.getItem("data") || '{}')
        const eventHistoryData = await getEventHistory(userId);
        setEventHistory(eventHistoryData);
    };
      return (
      <div className='historyPage'>
        <MedHistoryTable medHistory={medHistory} handleDelete={handleDeleteMedHistory}/>
        <EventHistoryTable eventHistory={eventHistory} handleDelete={handleDeleteEventHistory}/>
      </div>
      );
}
