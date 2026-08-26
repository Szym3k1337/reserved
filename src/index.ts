// Projekt rezerwacji biletow
import {rl,ask} from '../readlineconfig'
import {Users} from './mockData'




async function main():Promise<void> {

    let running = true;
    let logged = false;
    while(running) {
        try {

            if(!logged) {
                console.log(`Witamy w menadżerze rezerwacji !\n  `);
                const startChoice = await ask(`Wybierz Opcje :\n1.Zaloguj się\n2.Zarejestruj się : `);
                console.log(`to tez`)
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
                        const nameIn = await ask(`Podaj swoją nazwe : `);
                        const name = nameIn.trim();
                        const passwordIn = await ask(`Podaj swoje hasło : `)
                        const password = passwordIn.trim();
                        const doublePass = await ask(`Powtorz haslo : `)
                        if (doublePass.trim() !== password) {
                            throw new Error(`Hasła nie są taki same !`)
                        }
                        const emailIn = await ask(`Podaj swoj email : `);
                        const email = emailIn.trim();

                        const birthDateIn = await ask(`Podaj Date urodzenia : `);
                        const birthDate = birthDateIn.trim();
                        Users.set(email, {email: email, name: name, password: password, birthdate: birthDate, reservations: []})
                        console.log(`Witamy ${name} !\nPomyślnie stworzono kąto !`)
                        logged = true;
                        break;
                    default:
                        throw new Error(`Nieprawidłowa wartość !`)
                }

            }
            else {
                console.log(`Wybierz akcje : `)
                const choice = await ask(
            `1. Sprawdz kalendarz
                    \n2. Wyszukaj wydarzenie
                    \n3. Twoje rezerwacje
                    \n4. Stwórz rezerwacje
                    \n5. Usuń rezerwacje `
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