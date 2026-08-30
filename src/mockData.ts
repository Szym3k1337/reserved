import {User, Event, Spot} from "./types";
export const Users = new Map<string, User>();

export const usernames = [
    "AlphaRunner", "CyberKnight", "PixelWizard", "LunaEclipse", "StormChaser",
    "CodeBreaker", "NeoVanguard", "SilverFox", "QuantumTech", "ShadowEcho"
];

export const emails = [
    "user.one@example.com", "contact.alpha@domain.org", "test.mail2026@web.net", "info.service@portal.pl", "player.start@game.io",
    "admin.secure@cloud.com", "hello.world@dev.co", "eco.mind@nature.org", "data.stream@tech.net", "blue.sky@space.io"
];

export const passwords = [
    "P@ssw0rd2026!", "Secure#M1nd", "KniGhT$99*", "Luna_Sky77!", "Chas3r%St0rm",
    "C0de_Brak3r#", "VangUard!88", "Silv3r&Fox%", "Qu4ntum*Tech", "Shad0w$Ech0"
];

export const dates = [
    new Date("2010-12-15"),
    new Date("2009-05-20"),
    new Date("2008-11-03"),
    new Date("2007-02-14"),
    new Date("2005-08-30"),
    new Date("2003-04-12"),
    new Date("2000-01-01"),
    new Date("1998-10-25"),
    new Date("1995-07-07"),
    new Date("1992-03-19")
];



// =====================================================================================
// MOCK EVENTS (35 pozycji), każde z własnym `id` i zagnieżdżoną tablicą `spots`
// powiązaną przez `eventId`. Pokrywają wszystkie 13 rodzajów EventKind.
// =====================================================================================

export const mockEventsList: Event[] = [
    // --- Samoloty (3) ---
    {
        id: "EVT-001", kind: "Samoloty", date: "2026-09-10T06:30:00", availableSpots: 180,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Samoloty", id: "EVT-001-S1", eventId: "EVT-001", currency: "USD", price: 450.00, seatNumber: "12A", cabinClass: "Economy", position: "Window", extraLegroom: false, hasLuggageIncluded: true , isAvailable : true},
            { kind: "Samoloty", id: "EVT-001-S2", eventId: "EVT-001", currency: "USD", price: 1200.00, seatNumber: "2C", cabinClass: "Business", position: "Aisle", extraLegroom: true, hasLuggageIncluded: true, isAccessibleForDisabled: true , isAvailable : true},
        ],
    },
    {
        id: "EVT-002", kind: "Samoloty", date: "2026-09-12T14:15:00", availableSpots: 220,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Samoloty", id: "EVT-002-S1", eventId: "EVT-002", currency: "EUR", price: 89.99, seatNumber: "27E", cabinClass: "Economy", position: "Middle", extraLegroom: false, hasLuggageIncluded: false, isAvailable : true },
        ],
    },
    {
        id: "EVT-003", kind: "Samoloty", date: "2026-09-15T21:00:00", availableSpots: 160,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Samoloty", id: "EVT-003-S1", eventId: "EVT-003", currency: "PLN", price: 2100.00, seatNumber: "1A", cabinClass: "First", position: "Window", extraLegroom: true, hasLuggageIncluded: true, isAvailable : true },
        ],
    },

    // --- Pociągi (3) ---
    {
        id: "EVT-004", kind: "Pociągi", date: "2026-09-05T07:00:00", availableSpots: 320,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Pociągi", id: "EVT-004-S1", eventId: "EVT-004", currency: "PLN", price: 120.00, carNumber: 4, seatNumber: 23, class: "2nd Class", type: "OpenSpace", position: "Window", hasPowerOutlet: true, quietZone: false, isAvailable : true },
            { kind: "Pociągi", id: "EVT-004-S2", eventId: "EVT-004", currency: "PLN", price: 280.00, carNumber: 1, seatNumber: 5, class: "1st Class", type: "Compartment", position: "Aisle", hasPowerOutlet: true, quietZone: true, isAvailable : true },
        ],
    },
    {
        id: "EVT-005", kind: "Pociągi", date: "2026-09-06T15:45:00", availableSpots: 280,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Pociągi", id: "EVT-005-S1", eventId: "EVT-005", currency: "EUR", price: 45.50, carNumber: 7, seatNumber: 41, class: "2nd Class", type: "OpenSpace", position: "Middle", hasPowerOutlet: false, quietZone: false, isAvailable : true },
        ],
    },
    {
        id: "EVT-006", kind: "Pociągi", date: "2026-09-20T09:30:00", availableSpots: 300,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Pociągi", id: "EVT-006-S1", eventId: "EVT-006", currency: "PLN", price: 95.00, carNumber: 2, seatNumber: 12, class: "1st Class", type: "OpenSpace", position: "Window", hasPowerOutlet: true, quietZone: true, isAccessibleForDisabled: true, isAvailable : true },
        ],
    },

    // --- Autobusy (2) ---
    {
        id: "EVT-007", kind: "Autobusy", date: "2026-09-08T05:00:00", availableSpots: 50,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Autobusy", id: "EVT-007-S1", eventId: "EVT-007", currency: "PLN", price: 55.00, seatNumber: 14, position: "Window", hasExtraLegroom: false, deck: "Lower", isAvailable : true },
            { kind: "Autobusy", id: "EVT-007-S2", eventId: "EVT-007", currency: "PLN", price: 65.00, seatNumber: 3, position: "Aisle", hasExtraLegroom: true , isAvailable : true},
        ],
    },
    {
        id: "EVT-008", kind: "Autobusy", date: "2026-09-14T22:30:00", availableSpots: 45,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Autobusy", id: "EVT-008-S1", eventId: "EVT-008", currency: "EUR", price: 22.00, seatNumber: 29, position: "Window", hasExtraLegroom: false, deck: "Upper", isAvailable : true },
        ],
    },

    // --- Promy i rejsy (2) ---
    {
        id: "EVT-009", kind: "Promy i rejsy", date: "2026-09-18T11:00:00", availableSpots: 400,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Promy i rejsy", id: "EVT-009-S1", eventId: "EVT-009", currency: "EUR", price: 35.00, ticketType: "DeckPassenger", isAvailable : true },
            { kind: "Promy i rejsy", id: "EVT-009-S2", eventId: "EVT-009", currency: "EUR", price: 180.00, ticketType: "Cabin", cabinType: "OceanView", deckNumber: 6, bedCount: 2 , isAvailable : true},
        ],
    },
    {
        id: "EVT-010", kind: "Promy i rejsy", date: "2026-10-01T09:00:00", availableSpots: 350,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Promy i rejsy", id: "EVT-010-S1", eventId: "EVT-010", currency: "EUR", price: 420.00, ticketType: "Cabin", cabinType: "Suite", deckNumber: 8, bedCount: 4, isAccessibleForDisabled: true , isAvailable : true},
        ],
    },

    // --- Kina (4, w tym filmy z ograniczeniem wiekowym) ---
    {
        id: "EVT-011", kind: "Kina", date: "2026-09-01T18:00:00", availableSpots: 120,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Kina", id: "EVT-011-S1", eventId: "EVT-011", currency: "PLN", price: 25.00, row: "F", seatNumber: 12, seatType: "Standard", screenDistance: "Middle" , isAvailable : true},
            { kind: "Kina", id: "EVT-011-S2", eventId: "EVT-011", currency: "PLN", price: 30.00, row: "J", seatNumber: 20, seatType: "Recliner", screenDistance: "Front", isAccessibleForDisabled: true , isAvailable : true},
        ],
    },
    {
        id: "EVT-012", kind: "Kina", date: "2026-09-02T20:30:00", availableSpots: 100,
        ageRestriction: true, onePersonLimit: false,
        spots: [
            { kind: "Kina", id: "EVT-012-S1", eventId: "EVT-012", currency: "PLN", price: 45.00, row: "A", seatNumber: 3, seatType: "VIP", screenDistance: "Middle", isAvailable : true },
        ],
    },
    {
        id: "EVT-013", kind: "Kina", date: "2026-09-03T21:15:00", availableSpots: 90,
        ageRestriction: true, onePersonLimit: false,
        spots: [
            { kind: "Kina", id: "EVT-013-S1", eventId: "EVT-013", currency: "PLN", price: 60.00, row: 2, seatNumber: 1, seatType: "DoubleLoveSeat", screenDistance: "Back", isAvailable : true },
        ],
    },
    {
        id: "EVT-014", kind: "Kina", date: "2026-09-04T16:45:00", availableSpots: 130,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Kina", id: "EVT-014-S1", eventId: "EVT-014", currency: "PLN", price: 20.00, row: "D", seatNumber: 8, seatType: "Standard", screenDistance: "Front", isAvailable : true},
        ],
    },

    // --- Teatry (3) ---
    {
        id: "EVT-015", kind: "Teatry", date: "2026-09-09T19:00:00", availableSpots: 250,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Teatry", id: "EVT-015-S1", eventId: "EVT-015", currency: "PLN", price: 90.00, section: "Parter", row: 5, seatNumber: 14, visibility: "Full" , isAvailable : true},
            { kind: "Teatry", id: "EVT-015-S2", eventId: "EVT-015", currency: "PLN", price: 150.00, section: "Loża", row: 1, seatNumber: 2, visibility: "Full" , isAvailable : true},
        ],
    },
    {
        id: "EVT-016", kind: "Teatry", date: "2026-09-16T19:00:00", availableSpots: 250,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Teatry", id: "EVT-016-S1", eventId: "EVT-016", currency: "PLN", price: 60.00, section: "Jaskółka", row: 8, seatNumber: 33, visibility: "Restricted", isAvailable : true },
        ],
    },
    {
        id: "EVT-017", kind: "Teatry", date: "2026-09-23T19:00:00", availableSpots: 200,
        ageRestriction: true, onePersonLimit: false,
        spots: [
            { kind: "Teatry", id: "EVT-017-S1", eventId: "EVT-017", currency: "PLN", price: 110.00, section: "Balkon", row: 3, seatNumber: 9, visibility: "Full" , isAvailable : true},
        ],
    },

    // --- Koncerty (4) ---
    {
        id: "EVT-018", kind: "Koncerty", date: "2026-09-11T20:00:00", availableSpots: 5000,
        ageRestriction: false, onePersonLimit: true,
        spots: [
            { kind: "Koncerty", id: "EVT-018-S1", eventId: "EVT-018", currency: "PLN", price: 199.00, zoneType: "GA" , isAvailable : true},
            { kind: "Koncerty", id: "EVT-018-S2", eventId: "EVT-018", currency: "PLN", price: 350.00, zoneType: "GoldenCircle", isAvailable : true },
        ],
    },
    {
        id: "EVT-019", kind: "Koncerty", date: "2026-09-19T19:30:00", availableSpots: 3000,
        ageRestriction: false, onePersonLimit: true,
        spots: [
            { kind: "Koncerty", id: "EVT-019-S1", eventId: "EVT-019", currency: "PLN", price: 550.00, zoneType: "Seated", sector: "B", row: 3, seatNumber: 15, isAvailable : true },
        ],
    },
    {
        id: "EVT-020", kind: "Koncerty", date: "2026-09-25T20:00:00", availableSpots: 8000,
        ageRestriction: false, onePersonLimit: true,
        spots: [
            { kind: "Koncerty", id: "EVT-020-S1", eventId: "EVT-020", currency: "EUR", price: 899.00, zoneType: "VIP", sector: "VIP-1" , isAvailable : true},
        ],
    },
    {
        id: "EVT-021", kind: "Koncerty", date: "2026-10-03T21:00:00", availableSpots: 2500,
        ageRestriction: true, onePersonLimit: true,
        spots: [
            { kind: "Koncerty", id: "EVT-021-S1", eventId: "EVT-021", currency: "PLN", price: 280.00, zoneType: "EarlyEntrance" , isAvailable : true},
        ],
    },

    // --- Festiwale (2) ---
    {
        id: "EVT-022", kind: "Festiwale", date: "2026-09-26T12:00:00", availableSpots: 15000,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Festiwale", id: "EVT-022-S1", eventId: "EVT-022", currency: "PLN", price: 320.00, passType: "FullPass", includesCamping: true, campingZone: "Standard", isAvailable : true },
        ],
    },
    {
        id: "EVT-023", kind: "Festiwale", date: "2026-10-05T12:00:00", availableSpots: 12000,
        ageRestriction: true, onePersonLimit: false,
        spots: [
            { kind: "Festiwale", id: "EVT-023-S1", eventId: "EVT-023", currency: "EUR", price: 890.00, passType: "VIPPass", includesCamping: true, campingZone: "Glamping", isAvailable : true },
        ],
    },

    // --- Wydarzenia sportowe (3) ---
    {
        id: "EVT-024", kind: "Wydarzenia sportowe", date: "2026-09-13T17:30:00", availableSpots: 40000,
        ageRestriction: false, onePersonLimit: true,
        spots: [
            { kind: "Wydarzenia sportowe", id: "EVT-024-S1", eventId: "EVT-024", currency: "PLN", price: 89.00, stand: "Wschód", sector: "12", row: 20, seatNumber: 5, category: "Category 3" , isAvailable : true},
        ],
    },
    {
        id: "EVT-025", kind: "Wydarzenia sportowe", date: "2026-09-20T19:45:00", availableSpots: 25000,
        ageRestriction: false, onePersonLimit: true,
        spots: [
            { kind: "Wydarzenia sportowe", id: "EVT-025-S1", eventId: "EVT-025", currency: "PLN", price: 250.00, stand: "Zachód", sector: "3", row: 4, seatNumber: 18, category: "Category 1" , isAvailable : true},
        ],
    },
    {
        id: "EVT-026", kind: "Wydarzenia sportowe", date: "2026-10-02T15:00:00", availableSpots: 18000,
        ageRestriction: false, onePersonLimit: true,
        spots: [
            { kind: "Wydarzenia sportowe", id: "EVT-026-S1", eventId: "EVT-026", currency: "EUR", price: 1200.00, stand: "VIP", sector: "SB-2", row: 1, seatNumber: 1, category: "VIP Skybox", isAvailable : true },
        ],
    },

    // --- Muzea (3) ---
    {
        id: "EVT-027", kind: "Muzea", date: "2026-09-01T10:00:00", availableSpots: 500,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Muzea", id: "EVT-027-S1", eventId: "EVT-027", currency: "PLN", price: 30.00, ticketCategory: "Normal" , isAvailable : true},
        ],
    },
    {
        id: "EVT-028", kind: "Muzea", date: "2026-09-08T10:00:00", availableSpots: 500,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Muzea", id: "EVT-028-S1", eventId: "EVT-028", currency: "PLN", price: 15.00, ticketCategory: "Reduced", audioGuideIncluded: true , isAvailable : true},
        ],
    },
    {
        id: "EVT-029", kind: "Muzea", date: "2026-09-15T10:00:00", availableSpots: 500,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Muzea", id: "EVT-029-S1", eventId: "EVT-029", currency: "PLN", price: 0.00, ticketCategory: "Child", isAvailable : true },
        ],
    },

    // --- Zabytki (2) ---
    {
        id: "EVT-030", kind: "Zabytki", date: "2026-09-07T09:00:00", availableSpots: 300,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Zabytki", id: "EVT-030-S1", eventId: "EVT-030", currency: "PLN", price: 25.00, ticketCategory: "Normal", timeSlot: "12:00-13:00" , isAvailable : true},
        ],
    },
    {
        id: "EVT-031", kind: "Zabytki", date: "2026-09-14T09:00:00", availableSpots: 300,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Zabytki", id: "EVT-031-S1", eventId: "EVT-031", currency: "EUR", price: 12.00, ticketCategory: "Senior", isAccessibleForDisabled: true , isAvailable : true},
        ],
    },

    // --- Parki rozrywki (2) ---
    {
        id: "EVT-032", kind: "Parki rozrywki", date: "2026-09-05T09:00:00", availableSpots: 2000,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Parki rozrywki", id: "EVT-032-S1", eventId: "EVT-032", currency: "PLN", price: 180.00, ticketCategory: "Family" , isAvailable : true},
        ],
    },
    {
        id: "EVT-033", kind: "Parki rozrywki", date: "2026-09-12T09:00:00", availableSpots: 2000,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Parki rozrywki", id: "EVT-033-S1", eventId: "EVT-033", currency: "PLN", price: 350.00, ticketCategory: "VIP FastTrack", timeSlot: "09:00-10:00", isAvailable : true },
        ],
    },

    // --- Atrakcje turystyczne (2) ---
    {
        id: "EVT-034", kind: "Atrakcje turystyczne", date: "2026-09-06T08:00:00", availableSpots: 150,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Atrakcje turystyczne", id: "EVT-034-S1", eventId: "EVT-034", currency: "EUR", price: 45.00, ticketCategory: "Normal", audioGuideIncluded: true , isAvailable : true},
            { kind: "Atrakcje turystyczne", id: "EVT-034-S2", eventId: "EVT-034", currency: "EUR", price: 20.00, ticketCategory: "Reduced", isAvailable : true },
        ],
    },
    {
        id: "EVT-035", kind: "Atrakcje turystyczne", date: "2026-09-13T08:00:00", availableSpots: 150,
        ageRestriction: false, onePersonLimit: false,
        spots: [
            { kind: "Atrakcje turystyczne", id: "EVT-035-S1", eventId: "EVT-035", currency: "PLN", price: 60.00, ticketCategory: "Family", timeSlot: "14:00-16:00", isAccessibleForDisabled: true, isAvailable : true },
        ],
    },
];

export const mockEvents = new Map<string, Event>(mockEventsList.map((event: Event) => [event.id, event]));

// Pomocnicza, spłaszczona lista wszystkich Spotów

export const mockSpotsList: Spot[] = mockEventsList.flatMap((event) => event.spots);
export const mockSpots = new Map<string, Spot>(mockSpotsList.map(spot => [spot.id, spot]))

export const names: string[] = [];
Users.forEach(user => names.push(user.name))




