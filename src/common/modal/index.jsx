import './styles.css';

export const Modal = ({ isOpen, onClose, children, title, primaryButton }) => {
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
                {
                    primaryButton?.enable && <button className='button__destructive button__small' onClick={() => {
                        primaryButton?.onPrimaryButtonClicked &&
                            primaryButton?.onPrimaryButtonClicked();
                    }}>Confirm</button>
                }
            </div>
        </div>
    );
};