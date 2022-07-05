import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export class User {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export interface UsersState {
    users: User[];
    status: 'authenticated' | "unauthenticated" | "error authentication" | "new user success" | "error new user";
}

const initialState: UsersState = {
    users: [
        new User("0", "Tianna Jenkins"),
        new User("1", "Kevin Grant"),
        new User("2", "Madison Price")
    ],
    status: "authenticated"
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})

export const initialUsers = (state: RootState) => state.users

export default usersSlice.reducer