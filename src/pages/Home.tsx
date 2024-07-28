import React from "react";
import HeaderComponent from "src/components/Header/Header";
import SongListComponent from "src/components/SongList/SongList";

export default function HomePage() {
    return (
        <React.Fragment>
            <HeaderComponent></HeaderComponent>
            <p>
                This is the home page!
            </p>
            <SongListComponent></SongListComponent>
        </React.Fragment>
    );
}
