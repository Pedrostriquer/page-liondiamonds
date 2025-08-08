import React from "react";
import './Body.css';
import MainBanner from "../MainBanner/MainBanner";

export default function Body({
    mainBannerData,
    mainBannerSpeed,
    mainBannerShowArrows,
    mainBannerWidth,
    mainBannerHeight
}){
    return (
        <div className="body">
            {/* O wrapper agora só adiciona o espaçamento superior */}
            <div className="body-banner-wrapper">
                <MainBanner
                    slides={mainBannerData}
                    speed={mainBannerSpeed}
                    showArrows={mainBannerShowArrows}
                    width={mainBannerWidth}
                    height={mainBannerHeight}
                />
            </div>
        </div>
    )
}