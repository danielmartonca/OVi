import {NotificationService} from "./NotificationService";
import {AuthenticationService} from "./AuthenticationService";

export class Services {
    private static instance: Services = null;

    public readonly notificationsService: NotificationService;
    public readonly authenticationService: AuthenticationService;

    private constructor() {
        this.notificationsService = new NotificationService();
        this.authenticationService = new AuthenticationService();
    }

    public static getInstance(): Services {
        if (this.instance == null) this.instance = new Services();
        return this.instance;
    }
}
