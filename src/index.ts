// Projekt rezerwacji biletow
import {rl,ask} from '../readlineconfig'
import {Users} from './mockData'
import {AuthValidator} from "./functions";


async function main():Promise<void> {
    console.log(`Witamy w menadżerze rezerwacji !\n  `);
    let running = true;
    let logged = false;
    while(running) {
        try {

            if(!logged) {

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
                            logged = true;
                            console.log(`Pomyślnie zalogowano jako ${searchedUser.name}`);
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
                        Users.set(email, {email: email, name: name, password: password, birthdate: birthDate, reservations: []})
                        console.log(`Witamy ${name} !\nPomyślnie stworzono kąto !`)
                        console.log(Users.values())
                        logged = true;
                        break;
                    default:
                        throw new Error(`Nieprawidłowa wartość !`)
                }

            }
            else {
                console.log(`Wybierz akcje : `)
                const choice = await ask(
            `1. Sprawdz kalendarz\n2. Wyszukaj wydarzenie\n3. Twoje rezerwacje\n4. Stwórz rezerwacje\n5. Usuń rezerwacje `
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
                        running = false;
                        break;
                    case '5' :
                        running = false;
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