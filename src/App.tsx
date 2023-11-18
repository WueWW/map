import "./App.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import { Session } from "./model/Session";
import SessionPopup from "./SessionPopup";

interface SessionGroup {
    sessions: Session[];
    latSum: number;
    lngSum: number;
}

const snapThres = 0.00025;

function App() {
    const [data, setData] = useState<Session[]>();

    useEffect(() => {
        fetch("https://backend.timetable.wueww.de/export/session.json").then(async (res) => {
            const json = await res.json();
            setData(json.sessions);
        });
    }, [setData]);

    const groups = useMemo(() => {
        return data
            ?.filter((session) => !session.cancelled)
            .reduce((groups: SessionGroup[], session: Session): SessionGroup[] => {
                let { lat, lng } = session.location ?? {};
                if (!lat || !lng) return groups;

                lat %= 180;
                lng %= 180;

                const matchingGroup = groups.find((group) => {
                    if (lat === undefined || lng === undefined) {
                        throw new Error("unreachable, lat/lng cannot be undefined here");
                    }

                    return (
                        Math.abs(group.latSum / group.sessions.length - lat) < snapThres &&
                        Math.abs(group.lngSum / group.sessions.length - lng) < snapThres
                    );
                });

                if (matchingGroup) {
                    matchingGroup.sessions.push(session);
                    matchingGroup.latSum += lat;
                    matchingGroup.lngSum += lng;
                } else {
                    groups.push({
                        sessions: [session],
                        latSum: lat,
                        lngSum: lng,
                    });
                }

                return groups;
            }, []);
    }, [data]);

    if (!groups) {
        return <>Daten werden geladen ...</>;
    }

    return (
        <MapContainer center={{ lng: 9.9602, lat: 49.7879 }} zoom={14} style={{ width: "100%", height: "100%" }}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Made by Rolf, <a href="impressum.html">Impressum</a>.'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {groups.map((group) => (
                <Marker
                    key={group.sessions[0].id}
                    position={{
                        lng: group.lngSum / group.sessions.length,
                        lat: group.latSum / group.sessions.length,
                    }}
                >
                    <SessionPopup sessions={group.sessions} />
                </Marker>
            ))}
        </MapContainer>
    );
}

export default App;
