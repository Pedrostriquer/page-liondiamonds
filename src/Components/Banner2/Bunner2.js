import React from "react";
import './Bunner2.css';

export default function Bunner2({ bunner2Img2Src }){ // Aceite a nova prop
    return (
        <div className="bunner2">
            <div className="bunner2-container-img1">
                <img src="./img/jewelry.png" alt="logo" className="bunner2-img-1"/>
            </div>
            <div className="bunner2-container-img2">
                {/* Use a nova prop para bunner2-img-2 */}
                <img src={bunner2Img2Src} alt="logo" className="bunner2-img-2"/>
            </div>
            <div className="bunner2-container-img3">
                <img src="./img/aneis-titulo.png" alt="logo" className="bunner2-img-3"/>
            </div>
        </div>
    )
}