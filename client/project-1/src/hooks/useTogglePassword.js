import { useState } from "react";

const useTogglePassword = () => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow((prev) => !prev);

  return {
    type: show ? "text" : "password",
    show,
    toggle,
  };
};

export default useTogglePassword;
