import "../blocks/ItemModal.css";

function ItemModal({ activeModal, handleCloseClick, card, handleDeleteCard }) {
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
            <button onClick={handleDeleteCard} className="modal__delete-btn">
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
