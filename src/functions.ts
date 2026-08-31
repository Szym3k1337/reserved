import {Users, emails, usernames, passwords, dates, mockEvents, mockSpots, mockEventsList, mockSpotsList} from "./mockData";
import {type Spot, type EventKind, type Event, type User, Reservation} from "./types";
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
            message : isValid ? "Twoja nazwa jest poprawna" : "Twoja nazwa jest niepoprawna  (4-20 znaków, bez znaków specjalnych)"
        }
    }

    public static validateEmail(email: string): ValidationResult {
        const isValid = this.EMAIL_REGEX.test(email)
        return {
            success: isValid,
            message: isValid ? "Twój adres e-mail jest poprawny " : "Twój adres e-mail nie jest poprawny"
        }
    }
    public static validatePassword(password: string): ValidationResult {
        const isValid = this.PASSWORD_REGEX.test(password)
        return {
            success : isValid,
            message : isValid ? "Twoje hasło jest poprawne" : `Twoje hasło nie jest poprawne \n(minimum 8 znaków, 1 mała litera, 1 duża litera oraz znak specjalny)`
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
        Users.set(usernames[i],{name : usernames[i], password : passwords[i], birthdate : dates[i], email : emails[i], reservations : new Map<string,Reservation>()});
    }
}

export const availableSpots = function(eventId: string): Spot[] | void {
    const available = mockSpotsList.filter((s) => s.eventId === eventId && s.isAvailable);
    if(available !== undefined) {
        return available
    }
    else return

}

export const availableEvents = function(kind:EventKind):Event[]{
    const filtered = mockEventsList.filter((e) => e.kind === kind);
    if(filtered.length > 0){
        console.log(`Dostępne wydarzenia typu ${kind} to :`)
        filtered.forEach((e) => {console.log(e)})
        return filtered
    }
    else return [];
}

export const filterEvents = async function():Promise<Event[]>{
    console.log(`Wybierz typ wydarzenia (numer) :`)
    const typeIn = await ask(`1. Samoloty\n2. Pociągi\n3. Autobusy\n4. Promy i rejsy\n5. Kina\n6. Teatry\n7. Koncerty\n8. Festiwale\n9. Wydarzenia sportowe\n10. Muzea\n11. Zabytki\n12. Parki rozrywki\n13. Atrakcje turystyczne`);

    switch(typeIn.trim()) {
        case '1' : {

            return availableEvents('Samoloty');
        }

        case '2' :  {
            return availableEvents('Pociągi');
        }

        case '3' : {

            return availableEvents('Autobusy');
        }
        case '4' : {

            return availableEvents('Promy i rejsy');
        }
        case '5' : {

            return availableEvents('Kina');
        }
        case '6' : {

            return availableEvents('Teatry');
        }
        case '7' : {

            return availableEvents('Koncerty');
        }
        case '8' : {

            return availableEvents('Festiwale');
        }
        case '9' : {

            return availableEvents('Wydarzenia sportowe');
        }
        case '10' : {

            return availableEvents('Muzea');
        }
        case '11' : {

            return availableEvents('Zabytki');
        }
        case '12' : {

            return availableEvents('Parki rozrywki');
        }
        case '13' : {
            return availableEvents('Atrakcje turystyczne');
        }
        default : {
            throw new Error(`Proszę wybrać poprawny typ wydarzenia`)
        }
    }


}

export const createReservation = async function(user:User): Promise<Reservation> {
    await filterEvents();
    const eventId = await ask(`Proszę podać id wybranego wydarzenia : `);
    const event = mockEvents.get(eventId.trim());

    if(event !== undefined){
        const spot = await reserveSpot(event);
        const newReservation: Reservation = {
            id: `${spot.id}-${user.name}`,
            event : event,
            price : spot.price,
            status : "pending",
            spots : spot,
        }
        user.reservations.set(`${spot.id}-${user.name}`,newReservation);
        console.log(`Pomyślnie utworzono rezerwacje.\nAby uzyskać więcej informacji proszę wybrać opcję "Moje rezerwacje" w menu`);
        return newReservation;
    }
    else throw new Error(`Nie ma wydarzenia o podanym id lub wydarzenie jest innego typu. Proszę sprawdzić wprowadzone dane`)

}

export const reserveSpot = async function(event: Event):Promise<Spot> {
    const available = availableSpots(event.id);
    if(available){
        console.log(available);
        const choiceIn = await ask(`Podaj id wybranego miejsca :`)

        const reserved = mockSpots.get(choiceIn.trim());
        if(reserved !== undefined && available.includes(reserved)) {
            reserved.isAvailable = false;
            console.log(`Twoje miejsce zostało pomyślnie zarezerwowane !\nInformacje o twoim miejscu :\n`);
            console.log(reserved);
            const availableAfterReservation = available.filter((s) => s.isAvailable)
            mockSpots.set(choiceIn.trim(),reserved)
            mockEvents.set(choiceIn.trim(),{...event, spots: [...availableAfterReservation , reserved]});
            return reserved;
        }
        else throw new Error(`Nie ma miejsca o podanym id lub miejsce zostało już zarezerwowane !`);
    }
    else throw new Error(`Niestety wydarzenie którego szukasz nie ma już dostępnych miejsc `);

}

export const showReservations = function(user:User): void{
    console.log(`Twoje rezerwacje to :`)
    let i = 0;
    user.reservations.forEach((reservation: Reservation) => {
        console.log(`
        ${++i} :
            id : ${reservation.id}
            event : ${reservation.event.id}
            price : ${reservation.price}
            status : ${reservation.status}\n`);
    });
}

export const deleteReservation = async function(user: User):Promise<void> {
    console.log(`Twoje rezerwacje to :`)
    showReservations(user);

    const choice = await ask(`Proszę podać id rezerwacji`);
    const deleted = user.reservations.get(choice);
    if (deleted !== undefined) {


        const delEvt = deleted.event;
        const spots = delEvt.spots;
        const reservedSpot = deleted.spots;
        reservedSpot.isAvailable = true;

        // const available = delEvt.spots.filter((s) => s.isAvailable)
        //
        // available.push(reservedSpot);
        // delSpots.forEach(spot => {
        //     spot.isAvailable = true;
        // })
        // delSpots.forEach((s) => {
        //     s.isAvailable = true;
        //     mockSpots.set(s.id,s);
        //     available.unshift(s);
        // });
        console.log(delEvt);
        mockEvents.set(delEvt.id,{...delEvt, spots: [...spots]});
        user.reservations.delete(choice);
        console.log(`Pomyslnie usunięto rezerwacje !`);
    }
    else throw new Error(`Nie posiadasz rezerwacji o podanym id`);
}
