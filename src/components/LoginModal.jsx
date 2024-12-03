import { useState } from "react";

import ModalWithForm from "./ModalWithForm";

function LoginModal({ handleCloseClick, activeModal, onSignin }) {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignin(data.email, data.password);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={activeModal === "log-in" && "modal_opened"}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{""}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
