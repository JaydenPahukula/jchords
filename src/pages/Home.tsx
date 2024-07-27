import React from "react";
import HeaderComponent from "src/components/Header/Header";

function HomePage() {
    return (
        <React.Fragment>
            <HeaderComponent></HeaderComponent>
            <p>
                This is the home page!
            </p>
        </React.Fragment>
    );
}

export default HomePage
