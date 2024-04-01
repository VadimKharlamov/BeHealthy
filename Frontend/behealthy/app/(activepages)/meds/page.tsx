"use client"
import Button from "antd/es/button/button";
import { Meds } from "../../components/Meds";
import { useEffect, useLayoutEffect, useState } from "react";
import { MedsRequest, createMed, deleteMed, getAllMeds, updateMed } from "../../services/meds";
import { CreateUpdateMed, Mode } from "../../components/CreateUpdateMed";
import { redirect } from "next/navigation";
import { MedHistoryRequest, createMedHistory, getMedHistory, updateMedHistory } from "../../services/medHistory";

function parseJwt(token: string) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).userId;
}

export default function MedsPage() {
    useLayoutEffect(() => {
		if(localStorage.getItem("auth") != "true"){
		  redirect("/login")
		}
	  }, [])
    useEffect(() => {
        const getMeds = async () => {
            const userId = parseJwt(localStorage.getItem("data") || '{}')
            const meds = await getAllMeds(userId);
            setLoading(false);
            setMeds(meds);
        };

        getMeds();
    }, []);
    const defaultValues = {
        title: "",
        description: "",
        count: 1,
        takeType: 4,
        countType: 1,
        takeTime: new Array<Date>()
    } as Med;
    const [values, setValues] = useState<Med>(defaultValues);
    const [meds, setMeds] = useState<Med[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);


    const handleCreateMed = async (medRequest: MedsRequest, historyRequest: MedHistoryRequest) => {
        const userId = parseJwt(localStorage.getItem("data") || '{}')
        medRequest.userId = userId;
        historyRequest.userId = userId;
        const med = await createMed(medRequest);
        historyRequest.id = med.historyId;
        await createMedHistory(historyRequest);
        closeModal();
        const meds = await getAllMeds(userId);
        const test = await getMedHistory(userId);
        setMeds(meds);
    }

    const handleUpdateMed = async (id: string, historyId: string, medRequest: MedsRequest, historyRequest: MedHistoryRequest) => {
        await updateMed(id, medRequest);
        await updateMedHistory(historyId, historyRequest);
        closeModal();
        const userId = parseJwt(localStorage.getItem("data") || '{}')
        const meds = await getAllMeds(userId);
        const test = await getMedHistory(userId);
        setMeds(meds);
    }

    const handleDeleteMed = async (id: string) => {
        await deleteMed(id);
        closeModal();
        const userId = parseJwt(localStorage.getItem("data") || '{}')
        const meds = await getAllMeds(userId);
        setMeds(meds);
    };

    const openModal = async () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (med: Med) => {
        setMode(Mode.Edit);
        setValues(med);
        setIsModalOpen(true);
    };
    return (
        <div>
            <Button
            type="primary"
            style={{marginTop: "30px", marginBottom: "30px"}}
            size="large"
            onClick={openModal}
            > Добавить препарат </Button>

            <CreateUpdateMed 
                mode={mode} 
                values={values} 
                isModalOpen={isModalOpen} 
                handleCreate={handleCreateMed} 
                handleUpdate={handleUpdateMed} 
                handleCancel={closeModal}
            />

            {loading ? <Meds meds={meds} handleOpen={openEditModal} handleDelete={handleDeleteMed} status = {loading}/> : <Meds meds={meds} handleOpen={openEditModal} handleDelete={handleDeleteMed} status = {loading}/>}
        </div>
      );
}