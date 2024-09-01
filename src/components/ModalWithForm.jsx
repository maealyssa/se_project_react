import "../blocks/ModalWithForm.css";

function ModalWithForm({ 
    children, 
    buttonText, 
    title,
    handleCloseClick,
    isOpen
 }) {
    return (
        <div className={`modal ${isOpen}`}>
            <div className="modal__content">
                <h2 className="modal__title">{title}</h2>
                <button 
                    onClick={handleCloseClick}
                    className="modal__close" 
                    type="button"
                />
                <form action="" className="modal__form">
                    {children}
                    <button type="submit" className="modal__submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default ModalWithForm;