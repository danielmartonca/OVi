import {ServerResponse} from "http";
import {StatusCodes} from "http-status-codes";
import {AuthenticationService} from "../services/AuthenticationService";
import {Register} from "../services/enum/RegisterResponse";
import {HttpMethod} from "../model/enum/HttpMethod";
import {AbstractController} from "./AbstractController";
import {InvalidControllerEndpointError} from "../errors/InvalidControllerEndpointError";
import {ResponseProcessor} from "../http-processor/ResponseProcessor";
import {RegistrationDataDTO} from "../model/client/RegistrationDataDTO";

export class AuthenticationController extends AbstractController {
    private authenticationService: AuthenticationService = new AuthenticationService();

    async mapEndpoints(method: HttpMethod.Type, url: string, body: string | null, response: ServerResponse) {
        switch (method) {
            case HttpMethod.Type.POST:
                switch (url) {
                    case '/api/auth/register':
                        return await this.register(new RegistrationDataDTO(body!), response);
                }
        }
        throw new InvalidControllerEndpointError(method, url);
    }

    async register(dto: RegistrationDataDTO, response: ServerResponse) {
        const registrationResponse = await this.authenticationService.register(dto);
        const responseMessage = Register.mapResponseToMessage(registrationResponse);

        if (registrationResponse == Register.Response.SUCCESS)
            return ResponseProcessor.end(response, StatusCodes.CREATED, responseMessage);

        return ResponseProcessor.end(response, StatusCodes.OK, responseMessage);
    }
}