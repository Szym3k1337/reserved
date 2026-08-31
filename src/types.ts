// Użytkownik
export interface User {
    name: string;
    password: string;
    email: string;
    birthdate: Date;
    reservations : Map<string,Reservation>
}
// Rezerwacja
export interface Reservation {
    id: string;
    event: Event;
    status: 'pending' | 'cancelled' | 'confirmed' | 'completed';
    price: number;
    spots: Spot;
}
// Wydarzenie
export interface Event {
    id: string;
    kind: EventKind;
    date: string;
    availableSpots: number;
    ageRestriction: boolean;
    onePersonLimit: boolean;
    spots: Spot[];
}
// Baza do miejsc
interface BaseSpot {
    id: string;
    eventId: string;
    currency : 'USD' | 'EUR' | 'PLN';
    isAccessibleForDisabled?: boolean;
    price: number;
    isAvailable: boolean;
}
// Typy wydarzeń
export type EventKind =
    "Samoloty"|
    "Pociągi"|
    "Autobusy"|
    "Promy i rejsy"|
    "Kina"|
    "Teatry"|
    "Koncerty"|
    "Festiwale"|
    "Wydarzenia sportowe"|
    "Muzea"|
    "Zabytki"|
    "Parki rozrywki"|
    "Atrakcje turystyczne";

// 1. Transport lotniczy
export interface FlightSpot extends BaseSpot {
    kind: "Samoloty";
    seatNumber: string;
    cabinClass: "Economy" | "Premium Economy" | "Business" | "First";
    position: "Window" | "Aisle" | "Middle";
    extraLegroom: boolean;
    hasLuggageIncluded: boolean;
}

// 2. Transport kolejowy
export interface TrainSpot extends BaseSpot {
    kind: "Pociągi";
    carNumber: number;
    seatNumber: number;
    class: "1st Class" | "2nd Class";
    type: "Compartment" | "OpenSpace";
    position: "Window" | "Aisle" | "Middle";
    hasPowerOutlet: boolean;
    quietZone: boolean;
}

// 3. Transport autobusowy
export interface BusSpot extends BaseSpot {
    kind: "Autobusy";
    seatNumber: number;
    deck?: "Lower" | "Upper";
    position: "Window" | "Aisle";
    hasExtraLegroom: boolean;
}

// 4. Promy i rejsy
export interface FerrySpot extends BaseSpot {
    kind: "Promy i rejsy";
    ticketType: "DeckPassenger" | "Cabin" | "VehicleSpace";
    cabinType?: "Inside" | "OceanView" | "Suite" | "Deluxe";
    deckNumber?: number;
    bedCount?: number;
}

// 5. Kina
export interface CinemaSpot extends BaseSpot {
    kind: "Kina";
    row: string | number;
    seatNumber: number;
    seatType: "Standard" | "VIP" | "Recliner" | "DoubleLoveSeat";
    screenDistance: "Front" | "Middle" | "Back";
}

// 6. Teatry
export interface TheatreSpot extends BaseSpot {
    kind: "Teatry";
    section: "Parter" | "Balkon" | "Loża" | "Jaskółka";
    row: number;
    seatNumber: number;
    visibility: "Full" | "Restricted";
}

// 7. Koncerty
export interface ConcertSpot extends BaseSpot {
    kind: "Koncerty";
    zoneType: "GA" | "GoldenCircle" | "EarlyEntrance" | "Seated" | "VIP";
    sector?: string;
    row?: number;
    seatNumber?: number;
}

// 8. Festiwale
export interface FestivalSpot extends BaseSpot {
    kind: "Festiwale";
    passType: "SingleDay" | "FullPass" | "VIPPass";
    includesCamping: boolean;
    campingZone?: "Standard" | "Quiet" | "Glamping";
}

// 9. Wydarzenia sportowe
export interface SportsSpot extends BaseSpot {
    kind: "Wydarzenia sportowe";
    stand: string;
    sector: string;
    row: number;
    seatNumber: number;
    category: "Category 1" | "Category 2" | "Category 3" | "VIP Skybox";
}

// 10. Muzea, Zabytki, Parki rozrywki, Atrakcje turystyczne (Bilety czasowe / Wejściówki)
export interface AttractionSpot extends BaseSpot {
    kind: "Muzea" | "Zabytki" | "Parki rozrywki" | "Atrakcje turystyczne";
    ticketCategory: "Normal" | "Reduced" | "Child" | "Senior" | "Family" | "VIP FastTrack";
    timeSlot?: string;
    audioGuideIncluded?: boolean;
}

export type Spot =
    | FlightSpot
    | TrainSpot
    | BusSpot
    | FerrySpot
    | CinemaSpot
    | TheatreSpot
    | ConcertSpot
    | FestivalSpot
    | SportsSpot
    | AttractionSpot;