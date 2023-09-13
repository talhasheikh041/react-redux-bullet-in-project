import { createSlice } from "@reduxjs/toolkit"
import { RootStateType } from "../../app/store"

type UserStateType = {
  id: string
  name: string
}

const initialState: UserStateType[] = [
  { id: "0", name: "Dude Lebowski" },
  { id: "1", name: "Neil Young" },
  { id: "2", name: "Dave Gray" },
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
})

export const selectAllUsers = (state: RootStateType) => state.users

export default usersSlice.reducer
