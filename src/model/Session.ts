type HostLinkType = "host" | "jobs" | "facebook" | "youtube" | "instagram" | "linkedIn" | "xing" | "twitter";

export interface Host {
    id: number;
    name: string;
    infotext?: string;
    logo?: string;
    links?: {
        [Link in HostLinkType]?: string;
    };
}

export interface Location {
    name: string;
    streetNo: string;
    zipcode: string;
    city: string;
    lat?: number;
    lng?: number;
}
export interface Channel {
    id: number;
    name: string;
}

export interface Session {
    id: number;
    start: string;
    end: string;
    cancelled: boolean;
    highlight: boolean;
    onlineOnly: boolean;
    host: Host;
    title: string;
    location?: Location;
    description?: {
        short?: string;
        long?: string;
    };
    links?: {
        event: string;
    };
    channel?: Channel;
}
