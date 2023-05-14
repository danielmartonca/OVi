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

    static get invalidationText() {
        return document.getElementById('register-form-validation-text');
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
    }

    static get isFormValid(): boolean {
        if (RegistrationPage.extractPassword() == RegistrationPage.extractConfirmationPassword()) RegistrationPage.confirmPasswordInput.setCustomValidity("");

        return RegistrationPage.usernameInput.validity.valid
            && RegistrationPage.passwordInput.validity.valid
            && RegistrationPage.confirmPasswordInput.validity.valid
            && RegistrationPage.extractPassword() == RegistrationPage.extractConfirmationPassword();
    }

    static validateForm() {
        RegistrationPage.confirmPasswordInput.setCustomValidity("");

        RegistrationPage.invalidationText.innerText = "";
        RegistrationPage.invalidationText.setAttribute('display', 'none');

        RegistrationPage.registerButton.removeAttribute("disabled");
    }

    static invalidateForm() {
        RegistrationPage.registerButton.setAttribute("disabled", "disabled");

        if (!RegistrationPage.usernameInput.validity.valid) {
            if (RegistrationPage.usernameInput.value.length != 0)
                RegistrationPage.invalidationText.innerText = RegistrationPage.usernameInput.validationMessage;
            else
                RegistrationPage.invalidationText.innerText = "";

            return RegistrationPage.invalidationText.setAttribute('display', 'block');
        }

        if (!RegistrationPage.passwordInput.validity.valid) {
            if (RegistrationPage.passwordInput.value.length != 0)
                RegistrationPage.invalidationText.innerText = RegistrationPage.passwordInput.validationMessage;
            else
                RegistrationPage.invalidationText.innerText = "";

            return RegistrationPage.invalidationText.setAttribute('display', 'block');
        }

        if (!RegistrationPage.confirmPasswordInput.validity.valid) {
            if (RegistrationPage.confirmPasswordInput.value.length != 0)
                RegistrationPage.invalidationText.innerText = RegistrationPage.confirmPasswordInput.validationMessage;
            else
                RegistrationPage.invalidationText.innerText = "";

            return RegistrationPage.invalidationText.setAttribute('display', 'block');
        }

        if (RegistrationPage.extractPassword() != RegistrationPage.extractConfirmationPassword()) {
            RegistrationPage.confirmPasswordInput.setCustomValidity("Passwords do not match!");
            RegistrationPage.invalidationText.innerText = RegistrationPage.confirmPasswordInput.validationMessage;
            return RegistrationPage.invalidationText.setAttribute('display', 'block');
        }
    }

    static addAutomaticDisablingOfSubmitButtonOnValidation() {
        RegistrationPage.usernameInput.addEventListener("input",
            () => {
                if (RegistrationPage.isFormValid)
                    return RegistrationPage.validateForm();

                RegistrationPage.invalidateForm();
            }
        );

        RegistrationPage.passwordInput.addEventListener("input",
            () => {
                if (RegistrationPage.isFormValid)
                    return RegistrationPage.validateForm();

                RegistrationPage.invalidateForm();
            }
        );

        RegistrationPage.confirmPasswordInput.addEventListener("input",
            () => {
                if (RegistrationPage.isFormValid)
                    return RegistrationPage.validateForm();

                RegistrationPage.invalidateForm();
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