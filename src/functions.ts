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