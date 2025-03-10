import { configureStore, type Middleware } from "@reduxjs/toolkit";
import userReducer from "./users/slice";
import { toast } from "sonner";
import { rollbackUser } from "./users/slice";

const persistantMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);
  localStorage.setItem("_redux_users", JSON.stringify(store.getState().users));
};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action;
  const previousState = store.getState();
  next(action);

  if (type === "users/deleteUserById") {
    const userToRemove = previousState.users.find(
      (user) => user.id === payload
    );

    fetch(`https://jsonplaceholder.typicode.com/users/${userToRemove.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) toast.success(`Usuario ${userToRemove.id} eliminado`);
        // throw new Error("Error");
      })
      .catch(() => {
        if (userToRemove)
          store.dispatch(rollbackUser(userToRemove));
        toast.error("Error");
      });
  }
  console.log(store.getState());
};

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(persistantMiddleware)
      .concat(syncWithDatabase),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
