import { useState } from "react";
import "./home.module.css";
export function Home() {
  const [state, setstate] = useState("initialState");
  return (
    <div>
      <h1>Welcome to Home!</h1>
      {state}
    </div>
  );
}
