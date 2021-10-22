import { useState } from "react";

function Counter() {
  const [contador, setContador] = useState(0);
  return (
    <button onClick={(e) => setContador((v) => v + 1)} className="Counter">
      {contador}
    </button>
  );
}

export default Counter;
