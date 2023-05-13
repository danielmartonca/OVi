export namespace Notification {
    export enum Location {
        topCenter, topRight
    }

    export enum Color {
        default, warn, error

    }

    export function getBackgroundStyling(color: Color): string {
        switch (color) {
            case Color.error:
                return "linear-gradient(to right, rgb(176 0 0), rgb(201 61 61))";
            case Color.warn:
                return "rgb(176 126 0)";
            case Color.default:
            default:
                return "linear-gradient(to right, #00b09b, #96c93d)";
        }
    }
}
