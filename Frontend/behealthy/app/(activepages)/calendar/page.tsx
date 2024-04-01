"use client"

import { useEffect, useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Badge, ConfigProvider, Space } from "antd";
import '../../page.module.css'
import { DataCalendar } from "@/app/components/DataCalendar";
import { getAllMeds } from "@/app/services/meds";
import { getAllMedEvents } from "@/app/services/medEvents";
import { CalendarItem } from "@/app/components/CalendarItem";
function parseJwt(token: string) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).userId;
}

export default function CalendarPage() {
    const [meds, setMeds] = useState<Med[]>([]);
    const [medEvents, setMedEvents] = useState<MedEvent[]>([]);

	useLayoutEffect(() => {
		if(localStorage.getItem("auth") != "true"){
		  redirect("/login")
		}
	  }, [])   
  
      useEffect(() => {
          const getMeds = async () => {
              const userId = parseJwt(localStorage.getItem("data") || '{}')
              const meds = await getAllMeds(userId);
              setMeds(meds);
          };
          const getMedEvents = async () => {
              const userId = parseJwt(localStorage.getItem("data") || '{}')
              const medEvents = await getAllMedEvents(userId);
              setMedEvents(medEvents);
          };
          getMeds();
          getMedEvents();
      }, []);

    
      return (
      <div className='calendarPage'>
            <DataCalendar meds={meds} medEvents={medEvents} status={true}/>
            <Space direction='vertical'>
            <ConfigProvider theme={{components: {Badge: {fontSizeSM: 30, fontSize: 20}}}}>
            <Badge color='green' text='Прием лекарства' style={{padding: '20px 0 0 0'}}></Badge>
            <Badge color='cyan' text='Событие' style={{padding: '0 0 0 20px'}}></Badge>
            </ConfigProvider>
            </Space>
            <h1 style={{padding: '25px 0 25px'}}> Ближайшие события </h1>
            <CalendarItem meds={meds} medEvents={medEvents}/>
      </div>
      );
}
