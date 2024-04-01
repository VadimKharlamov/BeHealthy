export interface MedHistoryRequest{
    id: string;
    userId: string
    title: string;
    description: string;
    count: number;
    countType: number;
    takeTime: Date[];
}

export const getMedHistory = async (userId : string) => {
    const response = await fetch(`https://localhost:7293/getMedHistory/${userId}`);

    return response.json();
}

export const createMedHistory = async (medHistoryRequest : MedHistoryRequest) => {
    await fetch("https://localhost:7293/createMedHistory/", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(medHistoryRequest),
    });
};

export const updateMedHistory = async (id : string, medHistoryRequest : MedHistoryRequest) => {
    await fetch(`https://localhost:7293/updateMedHistory/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(medHistoryRequest),
    });
}

export const deleteMedHistory = async (id : string) => {
    await fetch(`https://localhost:7293/deleteMedHistory/${id}`, {
        method: "DELETE",
    });
}