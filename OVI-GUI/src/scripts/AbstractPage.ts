import {Services} from "../services/Services";

export abstract class AbstractPage {
    protected static readonly services: Services = Services.getInstance();
}
