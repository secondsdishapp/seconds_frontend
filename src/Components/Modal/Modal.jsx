//import the react library to use its features and functionalites
import React from 'react';

//import the css file for styling the modal component
import './Modal.css';


//define the functional component named 'Modal' that takes three props: 'isOpen'(a boolean indicating whether  the modal is open), 'onClose' (a function to be called when the modal should close), and 'children'(the content that will be rendered inside the modal, allowing flexibility to include any react elements). 
const Modal = ({ isOpen, onClose, children}) => {

    //check if the model should no tbe open; if so, return null to render nothing.
    if (!isOpen) return null;

    //return the jsx that will render the modal component when it is open
    return (

        //create a div element with a class name 'modal-overlay' to act as the background overlay; clicking it will close the modal.
        <div className="modal-overlay" onClick={onClose}>

            {/* create a div for the modal content; click it will not close the modal due to stopPropagation */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                {/* create a button to close the modal, which calls teh onClose function when clicked */}
                <button className="modal-close" onClick={onClose}>X</button>
                
                {/* render any children components or elements passed to the Modal component */}
                {children}
            </div>
        </div>
    );
};


//export the Modal component to make it available for use in other parts of the application.
export default Modal;