import './styles.css';

export const Modal = ({ isOpen, onClose, children, title }) => {
    return (
        isOpen && <div className="modal__container">
            <div className="modal__body">
                <div className="modal__header">
                    <div className="modal__title">
                        <b>{title}</b>
                    </div>
                    <div className="modal__close" onClick={() => { onClose() }}>X</div>
                </div>
                <hr />
                {children}
            </div>
        </div>
    )
}