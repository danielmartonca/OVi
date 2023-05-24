import {Services} from "../services/Services";

export abstract class AbstractComponent {
    protected static readonly services: Services = Services.getInstance();
}
