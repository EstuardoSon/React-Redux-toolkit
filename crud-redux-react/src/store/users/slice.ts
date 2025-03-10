import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserwithId } from "../../models/user";

const defaultUsers: UserwithId[] = [
  {
    id: "1",
    name: "John Doe",
    email: "example@crud.com",
    github: "johndoe",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "example1@crud.com",
    github: "janedoe",
  },
  {
    id: "3",
    name: "John Smith",
    email: "example2@crud.com",
    github: "johnsmith",
  },
];

const initialState: UserwithId[] = (() => {
  const usersFromLocalStorage = localStorage.getItem("_redux_users");
  if (usersFromLocalStorage) return JSON.parse(usersFromLocalStorage);
  return defaultUsers;
})();

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      console.log(action.payload);
      state.push({ id, ...action.payload });
    },
    deleteUserById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserwithId>) => {
      const isUserAlredyDefined  = state.some(user => user.id === action.payload.id);
      if (!isUserAlredyDefined) return [...state, action.payload];
    }
  },
});

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
