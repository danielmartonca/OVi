import Toastify from 'toastify-js'
import {Config} from "../configuration/Config";
import {Notification} from "../configuration/NotificationConfig";
import Color = Notification.Color;
import Location = Notification.Location;

export class NotificationService {
    private notify(message, position: Location = Location.topRight, color: Color = Color.default) {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: position == Location.topCenter ? 'center' : 'right', // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {background: Notification.getBackgroundStyling(color)},
        }).showToast();
        if (Config.debugNotifications) console.log(`Notification: ${message}`);
    }

    info(message: string) {
        this.notify(message, Location.topRight, Color.default);
    }

    warn(message) {
        this.notify(message, Location.topCenter, Color.warn);
        console.warn(message);
    }

    error(e: Error) {
        this.notify('An unexpected error has occurred. Please try again', Location.topCenter, Color.error);
        console.error(e);
    }
}