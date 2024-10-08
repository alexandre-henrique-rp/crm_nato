import { createContext } from "react";

type UserRegisterType = {
    ContrutoraCX: number[],
    setContrutoraCX: (value: number[]) => void,
    EmpreedimentoCX: number[],
    setEmpreedimentoCX: (value: number[]) => void,
}

export const UserRegisterContext = createContext<UserRegisterType>({
    ContrutoraCX: [],
    setContrutoraCX: () => { },
    EmpreedimentoCX: [],
    setEmpreedimentoCX: () => { },
});