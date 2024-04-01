export interface UsersLoginRequest{
    email: string;
    password: string;
}

export interface UsersRegisterRequest{
    userName: string;
    email: string;
    password: string;
}

export const loginUser = async (userRequest : UsersLoginRequest) => {
    const response = await fetch("https://localhost:7293/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userRequest),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}. Error text: ${errorText}`);
    }
    return response.json();
};

export const registerUser = async (userRequest : UsersRegisterRequest) => {
    const response = await fetch("https://localhost:7293/register", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userRequest),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}. Error text: ${errorText}`);
    }
    return "Ok";
};



