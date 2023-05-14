import {AbstractPage} from "../../configuration/AbstractPage";
import {NotificationService} from "../../services/NotificationService";
import {InvalidUsernameError} from "../../exceptions/InvalidUsernameError";
import {InvalidPasswordError} from "../../exceptions/InvalidPasswordError";
import {Config, Regex} from "../../configuration/Config";
import {MismatchingPasswordsError} from "../../exceptions/MismatchingPasswordsError";

export class RegistrationPage extends AbstractPage {
    static readonly notificationService: NotificationService = RegistrationPage.services.notificationsService;

    static get form() {
        return document.getElementById('register-form');
    }

    static get usernameInput() {
        return document.getElementById('username') as HTMLInputElement;
    }

    static get passwordInput() {
        return document.getElementById('password') as HTMLInputElement;
    }

    static get confirmPasswordInput() {
        return document.getElementById('password-confirmation') as HTMLInputElement;
    }

    static get registerButton() {
        return document.getElementById('register-button');
    }

    static preventDefaultFormSubmit() {
        RegistrationPage.form
            .addEventListener("click", (event: MouseEvent) => event.preventDefault());
    }

    static addFormValidationConstraints() {
        RegistrationPage.usernameInput.setAttribute('pattern', Regex.username.source);
        RegistrationPage.usernameInput.setAttribute('minlength', "5");
        RegistrationPage.usernameInput.setAttribute('maxlength', "15");

        RegistrationPage.passwordInput.setAttribute('pattern', Regex.password.source);
        RegistrationPage.passwordInput.setAttribute('minlength', "8");
        RegistrationPage.passwordInput.setAttribute('maxlength', "15");

        RegistrationPage.confirmPasswordInput.setAttribute('pattern', Regex.password.source);
        RegistrationPage.confirmPasswordInput.setAttribute('minlength', "8");
        RegistrationPage.confirmPasswordInput.setAttribute('maxlength', "15");
    }

    static get isFormValid(): boolean {
        return RegistrationPage.usernameInput.validity.valid
            && RegistrationPage.passwordInput.validity.valid
            && RegistrationPage.confirmPasswordInput.validity.valid;
    }

    static addAutomaticDisablingOfSubmitButtonOnValidation() {
        RegistrationPage.usernameInput.addEventListener("input",
            () => {
                if (this.isFormValid) {
                    RegistrationPage.registerButton.removeAttribute("disabled");
                } else
                    RegistrationPage.registerButton.setAttribute("disabled", "disabled");

            }
        );

        RegistrationPage.passwordInput.addEventListener("input",
            () => {
                if (this.isFormValid) {
                    RegistrationPage.registerButton.removeAttribute("disabled");
                    return;
                }

                if (RegistrationPage.extractPassword() != RegistrationPage.extractConfirmationPassword()) {
                    RegistrationPage.confirmPasswordInput.setCustomValidity("Mismatching passwords!");
                    RegistrationPage.registerButton.setAttribute("disabled", "disabled");
                    return;
                }

                RegistrationPage.confirmPasswordInput.setCustomValidity("");
                RegistrationPage.registerButton.removeAttribute("disabled");
            }
        );

        RegistrationPage.confirmPasswordInput.addEventListener("input",
            () => {
                if (RegistrationPage.extractPassword() != RegistrationPage.extractConfirmationPassword()) {
                    RegistrationPage.confirmPasswordInput.setCustomValidity("Mismatching passwords!");
                    RegistrationPage.registerButton.setAttribute("disabled", "disabled");
                    return;
                }
                RegistrationPage.confirmPasswordInput.setCustomValidity("");

                if (this.isFormValid) {
                    RegistrationPage.registerButton.removeAttribute("disabled");
                } else
                    RegistrationPage.registerButton.setAttribute("disabled", "disabled");
            }
        );
    }

    static extractUsername(): string {
        return RegistrationPage.usernameInput['value'].trim();
    }

    static extractPassword(): string {
        return RegistrationPage.passwordInput['value'].trim();
    }

    static extractConfirmationPassword(): string {
        return RegistrationPage.confirmPasswordInput['value'].trim();
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

    static validateConfirmationPassword(password: string, confirmationPassword: string) {
        if (password != confirmationPassword) throw new MismatchingPasswordsError('Passwords do not match!');
    }

    /**
     * TODO
     */
    static sendData(data: { username: string, password: string }) {
        console.log(`sending ${JSON.stringify(data)}...`);
    }

    static submitForm() {
        try {
            if (Config.debugNotifications) console.log("Submitting register form...");

            const username = this.extractUsername();
            const password = this.extractPassword();
            const confirmationPassword = this.extractConfirmationPassword();

            this.validateUsernameInput(username);
            this.validatePasswordInput(password);
            this.validateConfirmationPassword(password, confirmationPassword);

            this.sendData({username: username, password: password});

            if (Config.debugNotifications)
                this.notificationService.warn("Register form has been submitted.");
        } catch (e) {
            if (e instanceof InvalidUsernameError || e instanceof InvalidPasswordError || e instanceof MismatchingPasswordsError) {
                return RegistrationPage.notificationService.warn(e.message);
            }

            this.notificationService.error(e);
        }

    }

    static bindClicks() {
        RegistrationPage.registerButton.onclick = () => RegistrationPage.submitForm();
    }
}

window.onload = function () {
    if (Config.debugNotifications) console.log("Register page loaded. Running scripts...")

    RegistrationPage.preventDefaultFormSubmit();
    RegistrationPage.addFormValidationConstraints();
    RegistrationPage.addAutomaticDisablingOfSubmitButtonOnValidation();
    RegistrationPage.bindClicks();

    if (Config.debugNotifications) console.log("Register page scripts finished.")
}