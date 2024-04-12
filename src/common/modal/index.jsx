import './styles.css';

export const Modal = ({ isOpen, onClose, children, title }) => {
    return (
        <div className={`modal__container ${isOpen ? 'show' : ''}`}>
            <div className="modal__body">
                <div className="modal__header">
                    <div className="modal__title">
                        <b>{title}</b>
                    </div>
                    <div className="modal__close" onClick={onClose}>X</div>
                </div>
                <hr />
                {children}
            </div>
        </div>
    );
};