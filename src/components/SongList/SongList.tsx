import { useEffect, useState } from "react";
import SongListLoadingComponent from "./SongListLoading";
import DBManager from "src/db/DBManager";
import React from "react";
import SongInfo from "src/types/SongInfo";
import SongListEntryComponent from "./SongListEntry";
import "./SongList.css"

export default function SongListComponent() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ songList, setSongList ] = useState<SongInfo[]>([]);

    useEffect(() => {
        let mounted = true;
        DBManager.getSongs().then(list => {
            if (mounted) {
                setSongList(list);
                setIsLoading(false);
            }
        });
        return () => { mounted = false; };
    }, [])

    if (isLoading){
        return <SongListLoadingComponent></SongListLoadingComponent>   
    } else {
        return (
            <React.Fragment>
                <h3>Song List:</h3>
                {songList.map(song => <SongListEntryComponent info={song}></SongListEntryComponent>)}
            </React.Fragment>
        )
    }
}
