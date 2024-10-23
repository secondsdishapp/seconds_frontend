// // ParentStateManager.jsx
// import React, { useState } from 'react';
// import SignInSignUp from "../../Pages/SignInSignUp";


// const ParentStateManager = () => {
//   const [currentForm, setCurrentForm] = useState('signIn');  // State for form toggle
//   const [showModal, setShowModal] = useState(false);         // State for modal visibility

//   const toggleForm = () => {
//     setCurrentForm(currentForm === 'signIn' ? 'signUp' : 'signIn');
//   };

//   return (
//     <div>
//       {/* Buttons to open the modal */}
//       <button onClick={() => setShowModal(true)}>Login / Sign Up</button>

//       {/* Modal component */}
//       {showModal && (
//         <SignInSignUp
//           currentForm={currentForm}
//           toggleForm={toggleForm}
//           setShowModal={setShowModal}
//         />
//       )}
//     </div>
//   );
// };

// export default ParentStateManager;
