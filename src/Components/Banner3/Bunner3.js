import React from "react";
import './Bunner3.css';

export default function Bunner3({ bunner3Img1Src }){ // Aceite a nova prop
    return (
        <div className="bunner3">
            <div className="bunner3-container-img1">
                {/* Use a nova prop para bunner3-img-1 */}
                {/* <img src={bunner3Img1Src} alt="logo" className="bunner3-img-1"/> */}
            </div>
        </div>
    )
}