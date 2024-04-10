import { useState } from 'react';
import './styles.css';
export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="header__container">
            <button>Today's Purchase</button>
            <button onClick={() => {
                setIsOpen(!isOpen);
            }}>Add Customer</button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(!isOpen);
                }}
                title={"Add Customer"}
            >
                <p>hello</p>
            </Modal>
        </div>
    )
}

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