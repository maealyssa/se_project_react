import "../blocks/ItemModal.css";

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemModal({ activeModal, handleCloseClick, card, handleDeleteCard }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "modal__delete-btn_visible" : "modal__delete-btn_hidden"
  }`;


  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          className="modal__close"
          type="button"
        ></button>
        <div className="modal__content_image">
          <img src={card.imageUrl} alt={card.name} className="modal__img" />
        </div>
        <div className="modal__footer">
          <div className="modal__description">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__delete">
            <button onClick={handleDeleteCard} className={itemDeleteButtonClassName}>
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
