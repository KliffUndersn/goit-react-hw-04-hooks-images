import React, { Component } from 'react'


export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown',this.closeModals)
     }
     componentWillUnmount() {
        window.removeEventListener('keydown',this.closeModals)
     }
     
    closeModals = (e) => {
           if (e.code === "Escape") {
              this.props.modalClose();
            }
        }
     
     render(){
        const { children } = this.props;
    return (
        
        <div className="Overlay" onClick={this.props.modalClose}>
        <div className="Modal">
            {children}
        </div>
        </div>
    )}
}