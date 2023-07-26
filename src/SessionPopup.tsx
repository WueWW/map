import { Popup } from "react-leaflet";
import { Session } from "./model/Session";
import { Fragment } from "react";
import { formatDate } from "./dateUtil";

export interface SessionPopupProps {
    sessions: Session[];
}

const SessionPopup = ({ sessions }: SessionPopupProps) => (
    <Popup>
        <p className="session location name">{sessions[0].location?.name}</p>
        <p className="session location address">
            {sessions[0].location?.streetNo}
            {sessions[0].location?.city !== "Würzburg" && (
                <>
                    , {sessions[0].location?.zipcode} {sessions[0].location?.city}
                </>
            )}
        </p>
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

export default SessionPopup;
