import { useState } from "react";

function useUserProvider() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return {
    name,
    setName,
    age,
    setAge,
  };
}

export default useUserProvider;
