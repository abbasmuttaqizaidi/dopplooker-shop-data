import { useState } from 'react';
import './styles.css';
import { Modal } from '../../common/modal';
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