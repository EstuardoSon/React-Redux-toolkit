import { useAppDispatch } from "./storeHook";

import { addNewUser, deleteUserById,  } from "../store/users/slice";
import { User } from "../models/user";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addUser = (user: User) => {
    dispatch(addNewUser(user));
  }

  const removeUser = (id: string) => {
    dispatch(deleteUserById(id));
  };

  return { removeUser, addUser };
};
