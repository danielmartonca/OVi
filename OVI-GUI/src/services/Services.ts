import {NotificationService} from "./NotificationService";

export class Services {
    private static instance: Services = null;

    public readonly notificationsService: NotificationService;

    private constructor() {
        this.notificationsService = new NotificationService();
    }

    public static getInstance(): Services {
        if (this.instance == null) this.instance = new Services();
        return this.instance;
    }
}
