import { useState } from "react";

import ModalWithForm from "./ModalWithForm";

function EditProfileModal({ handleCloseClick, activeModal, onAddItem }) {
      const [data, setData] = useState({
        name: "",
        avatar: "",
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
    onAddItem(name, avatar);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={activeModal === "edit-profile" && "modal_opened"}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar{""}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="avatar"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
