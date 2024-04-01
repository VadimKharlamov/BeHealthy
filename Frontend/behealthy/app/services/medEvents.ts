export interface MedEventRequest{
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

export const getAllMedEvents = async (userId : string) => {
    const response = await fetch(`https://localhost:7293/getEvents/${userId}`);

    return response.json();
}

export const createMedEvent = async (medEventRequest : MedEventRequest) => {
    const response = await fetch("https://localhost:7293/createEvent/", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(medEventRequest),
    });
    return response.json();
};

export const updateMedEvent = async (id : string, medEventRequest : MedEventRequest) => {
    await fetch(`https://localhost:7293/updateEvent/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(medEventRequest),
    });
}

export const deleteMedEvent = async (id : string) => {
    await fetch(`https://localhost:7293/deleteEvent/${id}`, {
        method: "DELETE",
    });
}