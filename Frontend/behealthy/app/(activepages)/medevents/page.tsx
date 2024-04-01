"use client"
import Button from "antd/es/button/button";
import { useEffect, useLayoutEffect, useState } from "react";
import {CreateUpdateMedEvent, Mode } from "../../components/CreateUpdateMedEvent";
import { redirect } from "next/navigation";
import { MedEventRequest, createMedEvent, deleteMedEvent, getAllMedEvents, updateMedEvent } from "../../services/medEvents";
import { MedEvents } from "@/app/components/MedEvents";
import { EventHistoryRequest, createEventHistory, updateEventHistory } from "@/app/services/eventHistory";

function parseJwt(token: string) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).userId;
}

export default function MedEventsPage() {
    useLayoutEffect(() => {
		if(localStorage.getItem("auth") != "true"){
		  redirect("/login")
		}
	  }, [])
    useEffect(() => {
        const getMedEvents = async () => {
            const userId = parseJwt(localStorage.getItem("data") || '{}')
            const medEvents = await getAllMedEvents(userId);
            setLoading(false);
            setMedEvents(medEvents);
        };

        getMedEvents();
    }, []);
    const defaultValues = {
        title: "",
        description: "",
        visitTime: new Date(),
        direction: "",
        doctorName: "",
        doctorPhone: "",
        clinicName: "",
        clinicPhone: "",
        address: ""
    } as MedEvent;
    const [values, setValues] = useState<MedEvent>(defaultValues);
    const [medEvents, setMedEvents] = useState<MedEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);


    const handleCreateMedEvent = async (eventRequest: MedEventRequest, historyRequest: EventHistoryRequest) => {
        const userId = parseJwt(localStorage.getItem("data") || '{}')
        eventRequest.userId = userId;
        historyRequest.userId = userId;
        const event = await createMedEvent(eventRequest);
        historyRequest.id = event.historyId;
        await createEventHistory(historyRequest)
        closeModal();
        const medEvents = await getAllMedEvents(userId);
        setMedEvents(medEvents);
    }

    const handleUpdateMedEvent = async (id: string, historyId: string, eventRequest: MedEventRequest, historyRequest: EventHistoryRequest) => {
        await updateMedEvent(id, eventRequest);
        await updateEventHistory(historyId, historyRequest);
        closeModal();
        const userId = parseJwt(localStorage.getItem("data") || '{}')
        const medEvents = await getAllMedEvents(userId);
        setMedEvents(medEvents);
    }

    const handleDeleteMedEvent = async (id: string) => {
        await deleteMedEvent(id);
        closeModal();
        const userId = parseJwt(localStorage.getItem("data") || '{}')
        const medEvents = await getAllMedEvents(userId);
        setMedEvents(medEvents);
    };

    const openModal = async () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (medEvent: MedEvent) => {
        setMode(Mode.Edit);
        setValues(medEvent);
        setIsModalOpen(true);
    };
    return (
        <div>
            <Button
            type="primary"
            style={{marginTop: "30px", marginBottom: "30px"}}
            size="large"
            onClick={openModal}
            > Добавить Событие </Button>

            <CreateUpdateMedEvent 
                mode={mode} 
                values={values} 
                isModalOpen={isModalOpen} 
                medEvents={medEvents}
                handleCreate={handleCreateMedEvent} 
                handleUpdate={handleUpdateMedEvent} 
                handleCancel={closeModal}
            />
            {loading ? <MedEvents medEvents={medEvents} handleOpen={openEditModal} handleDelete={handleDeleteMedEvent} status = {loading}/> : 
            <MedEvents medEvents={medEvents} handleOpen={openEditModal} handleDelete={handleDeleteMedEvent} status = {loading}/>}
        </div>
      );
}