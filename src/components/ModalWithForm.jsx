import "../blocks/ModalWithForm.css";

function ModalWithForm({ 
    children, 
    buttonText, 
    title,
    activeModal,
    handleCloseClick,
 }) {
    return (
        <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
            <div className="modal__content">
                <h2 className="modal__title">{title}</h2>
                <button 
                    onClick={handleCloseClick}
                    className="modal__close" 
                    type="button"
                >
                </button>
                <form action="" className="modal__form">
                    {children}
                    <button type="submit" className="modal__submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default ModalWithForm;