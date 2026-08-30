// Projekt rezerwacji biletów
import {rl} from '../readlineconfig'
import {Users} from './mockData'
import {
    AuthValidator,
    addUsers,
    filterEvents,
    ask,
    createReservation,
    showReservations,
    deleteReservation,
} from "./functions";
import {Reservation, type User} from "./types";

async function main():Promise<void> {
    addUsers()
    console.log(`Witamy w menadżerze rezerwacji !\n  `);
    let running = true;
    let loggedUser: User | null = null;
    while(running) {
        try {

            if(!loggedUser) {

                const startChoice = await ask(`Wybierz Opcje :\n1.Zaloguj się\n2.Zarejestruj się : `);
                switch(startChoice.trim()) {
                    case '1' :
                        const loginIn = await ask(`Podaj swoją nazwe : `);
                        const searchedUser = Users.get(loginIn.trim());
                        if(searchedUser) {
                            const passwordIn = await ask(`Podaj hasło : `);
                            if (passwordIn.trim() !== searchedUser.password) {
                                throw new Error(`Podane hasło jest błędne`)
                            }
                            loggedUser = searchedUser;
                            console.log(`Pomyślnie zalogowano jako :`);
                            console.log(loggedUser);
                        }
                        break;
                    case '2' :
                        const nameIn = await ask(`Podaj swoją nazwe (4-20 znaków bez znaków specjalnych) : `);
                        const name = nameIn.trim();
                        const names: string[] = [];
                        Users.forEach(user => names.push(user.name))
                        if(names.includes(name)){
                            throw new Error("Twoja nazwa musi być unikalna");
                        }
                        const userNameCheck = AuthValidator.validateUsername(name);
                        if(!userNameCheck.success) {
                            throw new Error(userNameCheck.message);
                        }
                        console.log(userNameCheck.message);

                        const passwordIn = await ask(`Podaj swoje hasło\n(minimum 8 znaków, 1 mała litera, 1 duża litera oraz znak specjalny) : `)
                        const password = passwordIn.trim();
                        const passwordCheck = AuthValidator.validatePassword(password);
                        if(!passwordCheck.success) {
                            throw new Error(passwordCheck.message);
                        }
                        console.log(passwordCheck.message);
                        const doublePass = await ask(`Powtorz hasło : `)
                        if (doublePass.trim() !== password) {
                            throw new Error(`Hasła nie są taki same !`)
                        }
                        const emailIn = await ask(`Podaj swoj email : `);
                        const email = emailIn.trim();
                        const emailCheck = AuthValidator.validateEmail(email);
                        if(!emailCheck.success) {
                            throw new Error(emailCheck.message);
                        }
                        console.log(emailCheck.message);
                        const maxDate = new Date("2011-01-01")
                        const birthDateIn = await ask(`Podaj Date urodzenia (YYYY-MM-DD) : `);
                        const birthDate = new Date(birthDateIn.trim());
                        if(birthDate > maxDate) {
                            throw new Error(`Twoja data urodzenia musi być większa niż 2011-01-01`)
                        }
                        const newUser = {email: email, name: name, password: password, birthdate: birthDate, reservations: new Map<string,Reservation>()}
                        Users.set(email, newUser);
                        console.log(`Witamy ${name} !\nPomyślnie stworzono kąto !`);
                        loggedUser = newUser;
                        break;
                    default:
                        throw new Error(`Nieprawidłowa wartość !`)
                }

            }
            else {
                console.log(`Wybierz akcje (numer) : `)
                const choice = await ask(
            `1. Wyszukaj wydarzenie\n2. Moje rezerwacje\n3. Stwórz rezerwacje\n4. Usuń rezerwacje\n5. Wyloguj się \n6.Wyjście `
                )

                switch(choice) {
                    case '1' :
                        await filterEvents();
                        break;
                    case '2' :
                        showReservations(loggedUser);
                        break;
                    case '3' :

                        await createReservation(loggedUser);
                        break;
                    case '4' :
                        await deleteReservation(loggedUser);
                        break;

                    case '5' :
                        console.log(`Pomyślnie wylogowano .`)
                        loggedUser = null;
                        break;
                    case '6' :
                        running = false;
                        break;
                    default:
                        console.log(`Nie ma takiej opcji.`)
                        break;
                }

            }

        }
        catch(err) {
            console.log(err);
        }

    }
    rl.close()
}
main();