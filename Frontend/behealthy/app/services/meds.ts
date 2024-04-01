export interface MedsRequest{
    userId: string
    title: string;
    description: string;
    count: number;
    takeType: number;
    countType: number;
    takeTime: Date[];
}

export const getAllMeds = async (userId : string) => {
    const response = await fetch(`https://localhost:7293/getMeds/${userId}`);

    return response.json();
}

export const createMed = async (medRequest : MedsRequest) => {
    const response = await fetch("https://localhost:7293/createMed/", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(medRequest),
    });
    return response.json();
};

export const updateMed = async (id : string, medRequest : MedsRequest) => {
    await fetch(`https://localhost:7293/updateMed/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(medRequest),
    });
}

export const deleteMed = async (id : string) => {
    await fetch(`https://localhost:7293/deleteMed/${id}`, {
        method: "DELETE",
    });
}