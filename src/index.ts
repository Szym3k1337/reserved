// Projekt rezerwacji biletów
import {rl} from '../readlineconfig'
import {Users} from './mockData'
import {AuthValidator, addUsers, filterEvents, ask} from "./functions";
import {type User} from "./types";

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
                        const loginIn = await ask(`Podaj swoj email : `);
                        const searchedUser = Users.get(loginIn.trim());
                        if(searchedUser) {
                            const passwordIn = await ask(`Podaj hasło : `);
                            if (passwordIn.trim() !== searchedUser.password) {
                                throw new Error(`Podane hasło jest błędne`)
                            }
                            loggedUser = searchedUser;
                            console.log(`Pomyślnie zalogowano jako ${loggedUser}`);
                        }
                        break;
                    case '2' :
                        const nameIn = await ask(`Podaj swoją nazwe (4-20 znaków bez znaków specjalnych) : `);
                        const name = nameIn.trim();
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
                        const newUser = {email: email, name: name, password: password, birthdate: birthDate, reservations: []}
                        Users.set(email, newUser);
                        console.log(`Witamy ${name} !\nPomyślnie stworzono kąto !`);
                        loggedUser = newUser;
                        break;
                    default:
                        throw new Error(`Nieprawidłowa wartość !`)
                }

            }
            else {
                console.log(`Wybierz akcje : `)
                const choice = await ask(
            `1. Sprawdz kalendarz\n2. Wyszukaj wydarzenie\n3. Twoje rezerwacje\n4. Stwórz rezerwacje\n5. Usuń rezerwacje\n6. Wyloguj się `
                )

                switch(choice) {
                    case '1' :
                        running = false;
                        break;
                    case '2' :
                        running = false;
                        break;

                    case '3' :
                        running = false;
                        break;
                    case '4' :
                        console.log(`Wybierz typ wydarzenia :`)
                        const typeIn = await ask(`1. Samoloty\n2. Pociągi\n3. Autobusy\n4. Promy i rejsy\n5. Kina\n6. Teatry\n7. Koncerty\n8. Festiwale\n9. Wydarzenia sportowe\n10. Muzea\n11. Zabytki\n12. Parki rozrywki\n13. Atrakcje turystyczne`);

                        switch (typeIn.trim()) {
                            case '1' :
                                await filterEvents('Samoloty',loggedUser);

                                break;
                            case '2' :
                                await filterEvents('Pociągi',loggedUser);
                                break;
                            case '3' :
                                await filterEvents('Autobusy',loggedUser);
                                break;
                            case '4' :
                                await filterEvents('Promy i rejsy',loggedUser);
                                break;
                            case '5' :
                                await filterEvents('Kina',loggedUser);
                                break;
                            case '6' :
                                await filterEvents('Teatry',loggedUser);
                                break;
                            case '7' :
                                await filterEvents('Koncerty',loggedUser);
                                break;
                            case '8' :
                                await filterEvents('Festiwale',loggedUser);
                                break;
                            case '9' :
                                await filterEvents('Wydarzenia sportowe',loggedUser);
                                break;
                            case '10' :
                                await filterEvents('Muzea',loggedUser);
                                break;
                            case '11' :
                                await filterEvents('Zabytki',loggedUser);
                                break;
                            case '12' :
                                await filterEvents('Parki rozrywki',loggedUser);
                                break;
                            case '13' :
                                await filterEvents('Atrakcje turystyczne',loggedUser);
                                break;



                        }
                        break;
                    case '5' :
                        running = false;
                        break;
                    case '6' :
                        console.log(`pomyślnie wylogowano !`)
                        loggedUser = null;
                        break;
                    default:
                        running = false;
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