import {ServerResponse} from "http";
import {ResponseUtils} from "../utils/ResponseUtils";
import {StatusCodes} from "http-status-codes";
import {AuthenticationService} from "../services/AuthenticationService";
import {Register} from "../services/enum/RegisterResponse";
import {HttpMethod} from "../model/enum/HttpMethod";
import {AbstractController} from "./AbstractController";
import {InvalidControllerEndpointError} from "../errors/InvalidControllerEndpointError";

export class AuthenticationController extends AbstractController {
    private authenticationService: AuthenticationService = new AuthenticationService();

    mapEndpoints(method: HttpMethod.Type, url: string, body: any, response: ServerResponse): void {
        if (url == '/api/auth/register')
            return this.register(body, response);

        throw new InvalidControllerEndpointError(url);
    }

    register(body: any, response: ServerResponse) {
        const registrationResponse = this.authenticationService.register(body);
        const responseMessage = Register.mapResponseToMessage(registrationResponse);

        if (registrationResponse == Register.Response.SUCCESS)
            return ResponseUtils.writeResponse(response, StatusCodes.CREATED, responseMessage);

        return ResponseUtils.writeResponse(response, StatusCodes.OK, responseMessage);
    }
}