import {Users, emails, usernames, passwords, dates, mockEvents, mockSpots, mockEventsList, mockSpotsList} from "./mockData";
import {type Spot, type EventKind, type Event, type User} from "./types";
import {rl} from "../readlineconfig";

interface ValidationResult {
    success: boolean
    message: string;

}

export class AuthValidator {
    private static readonly NAME_REGEX = /^[a-zA-Z0-9_-]{4,20}$/

    private static readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-}]{2,}$/

    private static readonly PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*()_+\-=\[\]{};':"<>?,.\/|\\~`])[A-Za-z\d!@#$%^*()_+\-=\[\]{};':"<>?,.\/|\\~`]{8,}$/;


    public static validateUsername(name: string): ValidationResult {
        const isValid = this.NAME_REGEX.test(name)
        return {
            success : isValid,
            message : isValid ? "twoja nazwa jest poprawna" : "Twoja nazwa jest niepoprawna ! (4-20 znaków, bez znaków specjalnych)"
        }
    }

    public static validateEmail(email: string): ValidationResult {
        const isValid = this.EMAIL_REGEX.test(email)
        return {
            success: isValid,
            message: isValid ? "twój adres e-mail jest poprawny !" : "twój adres e-mail nie jest poprawny !"
        }
    }
    public static validatePassword(password: string): ValidationResult {
        const isValid = this.PASSWORD_REGEX.test(password)
        return {
            success : isValid,
            message : isValid ? "Twoje hasło jest poprawne !" : `Twoje hasło nie jest poprawne !\n(minimum 8 znaków, 1 mała litera, 1 duża litera oraz znak specjalny)`
        }
    }

}
export const ask = function(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer: string) => resolve(answer));
    });
}
export const addUsers = function():void {
    for (let i = 0; i < 10; i++) {
        Users.set(emails[i],{name : usernames[i], password : passwords[i], birthdate : dates[i], email : emails[i], reservations : []})
    }
}

export const availableSpots = function(eventId: string): Spot[] {
    const available = mockSpotsList.filter((s) => s.eventId === eventId && s.isAvailable);
    if(available !== undefined) {
        return available
    }
    else return []

}


export const filterEvents =async function(kind: EventKind, user:User): Promise<void>{
    const filtered = mockEventsList.filter((e) => e.kind === kind)
    if(filtered !== undefined) {
        console.log(`Dostępne wydarzenia typu ${kind} to :`)
        filtered.forEach((e) => {console.log(e)})

        const wantReserveIn = await ask(`Czy chcesz zarezerwować miejsce na któreś z podanych wydarzeń ?\n1. Tak\n2. Nie\n`)
        switch (wantReserveIn.trim()) {
            case "1":
                const eventChoiceIn = await ask(`Wpisz id wybranego wydarzenia : `);
                const choice = mockEvents.get(eventChoiceIn.trim());
                if(choice !== undefined) {
                    await reserveSpot(user,choice);
                    break;
                }
                else {
                    throw new Error(`Proszę podać poprawne Id wydarzenia`);
                }
            default:
                break;

        }
    }
    else return;
}

export const reserveSpot = async function(user: User, event: Event):Promise<void> {
    const available = availableSpots(event.id);
    console.log(available);

    const choiceIn = await ask(`Podaj ID Wybranego miejsca :`)

    const reserved = mockSpots.get(choiceIn.trim());
    if(reserved !== undefined) {
        reserved.isAvailable = false;
        console.log(`Twoje miejsce zostało pomyślnie zarezerwowane !\nInformacje o twoim miejscu :\n`);
        console.log(reserved);

        const availableAfterReservation = available.filter((s) => s.isAvailable)
        mockSpots.set(choiceIn.trim(),reserved)
        mockEvents.set(choiceIn.trim(),{...event, spots: [...availableAfterReservation , reserved]});
    }



}