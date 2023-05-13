import {AbstractPage} from "./AbstractPage";
import {NotificationService} from "../services/NotificationService";
import {InvalidUsernameError} from "../exceptions/InvalidUsernameError";
import {InvalidPasswordError} from "../exceptions/InvalidPasswordError";
import {Config} from "../configuration/Config";

export class LoginPage extends AbstractPage {
    static readonly notificationService: NotificationService = LoginPage.services.notificationsService;

    static preventDefaultFormSubmit() {
        document
            .getElementById('login-form')
            .addEventListener("click", (event: MouseEvent) => event.preventDefault());
    }

    static extractUsername(): string {
        return document.getElementById('username').textContent.trim();
    }

    static validateUsername(username: string) {
        if (username.length === 0) throw new InvalidUsernameError("Username cannot be empty!");
    }

    static extractPassword(): string {
        return document.getElementById('password').textContent.trim();
    }

    static validatePassword(password: string) {
        if (password.length === 0) throw new InvalidPasswordError("Password cannot be empty!");
    }

    /**
     * TODO
     */
    static sendData(data: { username: string, password: string }) {
        console.log(`sending ${data}...`);
    }

    static submitForm() {
        try {
            if (Config.debug) console.log("Submitting login form...");

            const username = this.extractUsername();
            const password = this.extractPassword();

            this.validateUsername(username);
            this.validatePassword(password);

            this.sendData({username: username, password: password});

            if (Config.debug) console.log("Login form has been submitted.");
        } catch (e) {
            if (e instanceof InvalidUsernameError || e instanceof InvalidPasswordError) {
                return LoginPage.notificationService.warn(e.message);
            }

            this.notificationService.error(e);
        }
    }
}

window.onload = function () {
    if (Config.debug) console.log("Login page loaded. Running scripts...")

    LoginPage.preventDefaultFormSubmit();

    if (Config.debug) console.log("Login page scripts finished.")
}

document.getElementById('login-button').onclick = () => LoginPage.submitForm();