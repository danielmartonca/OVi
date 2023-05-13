import {AbstractPage} from "../../configuration/AbstractPage";
import {NotificationService} from "../../services/NotificationService";
import {InvalidUsernameError} from "../../exceptions/InvalidUsernameError";
import {InvalidPasswordError} from "../../exceptions/InvalidPasswordError";
import {Config, Regex} from "../../configuration/Config";

export class LoginPage extends AbstractPage {
    static readonly notificationService: NotificationService = LoginPage.services.notificationsService;

    static get form() {
        return document.getElementById('login-form');
    }

    static get usernameInput() {
        return document.getElementById('username') as HTMLInputElement;
    }

    static get passwordInput() {
        return document.getElementById('password') as HTMLInputElement;
    }

    static get loginButton() {
        return document.getElementById('login-button');
    }

    static preventDefaultFormSubmit() {
        LoginPage.form
            .addEventListener("click", (event: MouseEvent) => event.preventDefault());
    }

    static addFormValidationConstraints() {
        LoginPage.usernameInput.setAttribute('pattern', Regex.username.source);
        LoginPage.usernameInput.setAttribute('minlength', "5");
        LoginPage.usernameInput.setAttribute('maxlength', "15");

        LoginPage.passwordInput.setAttribute('pattern', Regex.password.source);
        LoginPage.passwordInput.setAttribute('minlength', "8");
        LoginPage.passwordInput.setAttribute('maxlength', "15");
    }

    static addAutomaticDisablingOfSubmitButtonOnValidation() {
        LoginPage.usernameInput.addEventListener("input",
            () => {
                if (LoginPage.usernameInput.validity.valid && LoginPage.passwordInput.validity.valid) {
                    LoginPage.loginButton.removeAttribute("disabled");
                } else
                    LoginPage.loginButton.setAttribute("disabled", "disabled");

            }
        );
        LoginPage.passwordInput.addEventListener("input",
            () => {
                if (LoginPage.usernameInput.validity.valid && LoginPage.passwordInput.validity.valid) {
                    LoginPage.loginButton.removeAttribute("disabled");
                } else
                    LoginPage.loginButton.setAttribute("disabled", "disabled");
            }
        );
    }

    static extractUsername(): string {
        return LoginPage.usernameInput['value'].trim();
    }

    static extractPassword(): string {
        return LoginPage.passwordInput['value'].trim();
    }

    static validateUsernameInput(username: string) {
        if (username.length === 0) throw new InvalidUsernameError("Username cannot be empty!");
        if (username.length < 6) throw new InvalidUsernameError("Username not long enough!");
        if (!Regex.username.test(username)) throw new InvalidUsernameError("Username not valid!");
    }

    static validatePasswordInput(password: string) {
        if (password.length === 0) throw new InvalidPasswordError("Password cannot be empty!");
        if (password.length < 6) throw new InvalidUsernameError("Password not long enough!");
        if (!Regex.username.test(password)) throw new InvalidUsernameError("Password not valid!");
    }

    /**
     * TODO
     */
    static sendData(data: { username: string, password: string }) {
        console.log(`sending ${JSON.stringify(data)}...`);
    }

    static submitForm() {
        try {
            if (Config.debugNotifications) console.log("Submitting login form...");

            const username = this.extractUsername();
            const password = this.extractPassword();

            this.validateUsernameInput(username);
            this.validatePasswordInput(password);

            this.sendData({username: username, password: password});

            if (Config.debugNotifications)
                this.notificationService.warn("Login form has been submitted.");
        } catch (e) {
            if (e instanceof InvalidUsernameError || e instanceof InvalidPasswordError) {
                return LoginPage.notificationService.warn(e.message);
            }

            this.notificationService.error(e);
        }
    }

    static bindClicks() {
        LoginPage.loginButton.onclick = () => LoginPage.submitForm();
    }
}

window.onload = function () {
    if (Config.debugNotifications) console.log("Login page loaded. Running scripts...")

    LoginPage.preventDefaultFormSubmit();
    LoginPage.addFormValidationConstraints();
    LoginPage.addAutomaticDisablingOfSubmitButtonOnValidation();
    LoginPage.bindClicks();

    if (Config.debugNotifications) console.log("Login page scripts finished.")
}

