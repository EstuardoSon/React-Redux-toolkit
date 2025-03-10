import { User } from "../models/user";
import { useUserActions } from "../hooks/useUserActions";
import { useState } from "react";

export default function CreateNewUser() {
  const { addUser } = useUserActions();
  const [result, setResult] = useState<"ok" | "error" | null>(null);

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const nombre = form.nombre.value;
    const email = form.email.value;
    const github = form.github.value;

    if (!nombre || !email || !github) {
      setResult("error");
      return;
    }

    const newUser: User = { name: nombre, email, github };
    addUser(newUser);
    setResult("ok");
    form.reset();
  };

  return (
    <form className="mt-8 flex flex-col items-center" onSubmit={handlerSubmit}>
      <h1 className="text-xl font-bold">Create New User</h1>
      <input name="nombre" className="block text-gray-900" type="text" placeholder="Name" />
      <input className="block text-gray-900" type="email" placeholder="Email" name="email" />
      <input className="block text-gray-900" type="text" placeholder="Github Username" name="github" />
      <button type="submit">Create</button>
      <span>
        {result === "ok" && "User created successfully"}
        {result === "error" && "Error creating user"}
      </span>
    </form>
  );
}
