import {HttpMethod} from "../model/enum/HttpMethod";
import {ServerResponse} from "http";

export abstract class AbstractController {
    abstract mapEndpoints(method: HttpMethod.Type, url: string, body: any, response: ServerResponse): void;
}