export interface EventHistoryRequest{
    id: string,
    userId: string
    title: string;
    description: string;
    visitTime: Date;
    direction: string;
    doctorName: string;
    doctorPhone: string;
    clinicName: string;
    clinicPhone: string;
    address: string;
}

export const getEventHistory = async (userId : string) => {
    const response = await fetch(`https://localhost:7293/getEventsHistory/${userId}`);

    return response.json();
}

export const createEventHistory = async (medEventRequest : EventHistoryRequest) => {
    await fetch("https://localhost:7293/createEventHistory/", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(medEventRequest),
    });
};

export const updateEventHistory = async (id : string, medEventRequest : EventHistoryRequest) => {
    await fetch(`https://localhost:7293/updateEventHistory/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(medEventRequest),
    });
}

export const deleteEventHistory = async (id : string) => {
    await fetch(`https://localhost:7293/deleteEventHistory/${id}`, {
        method: "DELETE",
    });
}