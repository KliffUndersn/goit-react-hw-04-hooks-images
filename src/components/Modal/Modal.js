import React, { useEffect } from 'react'


export default function Modal ({children, modalClose}) {

    useEffect(() => {
        window.addEventListener('keydown',closeModals)
            return () =>{
        window.removeEventListener('keydown',closeModals)
     }})
     
    const closeModals = (e) => {
           if (e.code === "Escape") {
              modalClose();
            }
        }

    return (
        
        <div className="Overlay" onClick={modalClose}>
        <div className="Modal">
            {children}
        </div>
        </div>
    )
}