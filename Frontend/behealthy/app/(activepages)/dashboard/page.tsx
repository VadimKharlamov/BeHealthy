"use client"
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import { theme } from "antd";
import Card from "antd/es/card/Card";
import { DataCalendar } from "@/app/components/DataCalendar";
import { getAllMeds } from "@/app/services/meds";
import { getAllMedEvents } from "@/app/services/medEvents";
import Meta from "antd/es/card/Meta";
import {DashboardItem} from "@/app/components/DashboardData";
function parseJwt(token: string, type: string) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
	if (type == 'Id') {
		return JSON.parse(window.atob(base64)).userId;
	}
	if (type == "Name") {
		return JSON.parse(window.atob(base64)).userName;
	}
}

export default function Dashboard() {
	const { token } = theme.useToken();
	const [name, setValues] = useState<string>("data");
	const [meds, setMeds] = useState<Med[]>([]);
    const [medEvents, setMedEvents] = useState<MedEvent[]>([]);

	useLayoutEffect(() => {
		if(localStorage.getItem("auth") != "true"){
		  redirect("/login")
		}
		const name = (parseJwt(localStorage.getItem("data") || '{}', "Name"));
		setValues(name)
	  }, [])
	  
	useEffect(() => {
		const getMeds = async () => {
			const userId = parseJwt(localStorage.getItem("data") || '{}', "Id")
			const meds = await getAllMeds(userId);
			setMeds(meds);
		};
		const getMedEvents = async () => {
			const userId = parseJwt(localStorage.getItem("data") || '{}', 'Id')
			const medEvents = await getAllMedEvents(userId);
			setMedEvents(medEvents);
		};
		getMeds();
		getMedEvents();
	}, []);


  return (
	<div>
	<div style={{display: 'flex', alignItems: 'center'}}>
		<div style={{width: 800, margin:'0 100px 0 30px'}}>
			<Card> 
				<Meta 
				title={`Здравствуйте, ${name}!`}
				description={'Желаем вам хорошего и продуктивного дня!'}
				/>
			</Card>
		</div>
		<div style={{width: 400, height: 150, border: `1px solid ${token.colorBorderSecondary}`,borderRadius: 1}}>
			<DataCalendar meds={meds} medEvents={medEvents} status={false}/>
		</div>
	</div>
		<div style={{width: 800, margin:'0 100px 0 30px'}}>
			<Card> 
				<Meta 
				title={"Дела на сегодня"}
				/>
				<DashboardItem meds={meds} medEvents={medEvents} dataType="Today"/>
			</Card>
		</div>
		<div style={{width: 800, margin:'30px 100px 0 30px'}}>
			<Card> 
				<Meta 
				title={"Дела на завтра"}
				/>
				<DashboardItem meds={meds} medEvents={medEvents} dataType="Tomorrow"/>
			</Card>
		</div>
	</div>
	);
}
