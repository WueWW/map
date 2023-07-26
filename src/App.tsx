import "./App.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { Session } from "./model/Session";
import SessionPopup from "./SessionPopup";

function App() {
    const [data, setData] = useState<Session[]>();

    useEffect(() => {
        fetch("https://wueww.github.io/fahrplan-2022/sessions.json").then(async (res) => {
            const json = await res.json();
            setData(json.sessions);
        });
    }, [setData]);

    if (!data) {
        return <>Daten werden geladen ...</>;
    }

    return (
        <MapContainer center={{ lng: 9.9602, lat: 49.7879 }} zoom={14} style={{ width: "100%", height: "100%" }}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Made by Rolf, <a href="impressum.html">Impressum</a>.'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Object.values(
                data
                    .filter((session) => !session.cancelled)
                    .filter((session) => session.location && session.location.lat && session.location.lng)
                    .reduce(
                        (acc, session) => {
                            if (session.location?.lat === undefined || session.location?.lng === undefined) {
                                throw new Error("unreachable");
                            }

                            const key = [
                                Math.round(session.location.lat * 1000),
                                Math.round(session.location.lng * 1000),
                            ].join("#");
                            return { ...acc, [key]: [...(acc[key] || []), session] };
                        },
                        {} as { [key: string]: Session[] },
                    ),
            ).map((partitionedSessions: Session[]) => (
                <Marker
                    key={partitionedSessions[0].id}
                    position={{
                        lng: partitionedSessions[0].location!.lng!,
                        lat: partitionedSessions[0].location!.lat!,
                    }}
                >
                    <SessionPopup sessions={partitionedSessions} />
                </Marker>
            ))}
        </MapContainer>
    );
}

export default App;
