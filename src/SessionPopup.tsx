import { Popup } from "react-leaflet";
import { Session } from "./model/Session";
import { Fragment } from "react";
import { formatDate } from "./dateUtil";

export interface SessionPopupProps {
    sessions: Session[];
}

const SessionPopup = ({ sessions }: SessionPopupProps) => {
    const parts = sessions[0]
        .location!.name.split(/\n/)
        .map((x: string) => x.trim())
        .filter((x: string) => x);

    return (
        <Popup>
            <p className="session location name">{parts[0]}</p>
            <p className="session location address">{parts.slice(1).join(", ")}</p>
            <hr />
            {[...sessions]
                .sort((a, b) => a.start.localeCompare(b.start))
                .map((session, index) => (
                    <Fragment key={index}>
                        <h3 className="session title">{session.title}</h3>
                        <p className="session host">
                            {session.host.name} @ {formatDate(session.start)}
                        </p>
                    </Fragment>
                ))}
        </Popup>
    );
};

export default SessionPopup;
