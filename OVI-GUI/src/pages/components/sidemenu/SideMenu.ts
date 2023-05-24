import {AbstractComponent} from "../../../configuration/AbstractComponent";

export class SideMenu extends AbstractComponent {
    private static authenticationService = SideMenu.services.authenticationService;

    static get body() {
        return document.querySelector("body");
    }

    static get logoutButton() {
        return document.getElementById("logout-button");
    }

    static get html() {
        return `
            <nav class="main-menu">
                <ul>
                    <li>
                        <a href="../../home/home.html">
                            <i class="fa fa-home fa-2x"></i>
                            <span class="nav-text">Home</span>
                        </a>                      
                    </li>   
                    #login
                    #register
                    #admin
                     <li>
                        <a href="../../contact/contact.html">
                            <i class="fa fa-book fa-2x"></i>
                            <span class="nav-text">Contact</span>
                        </a>                      
                    </li>
                </ul>
            
                #logout
            </nav>        
        `;
    }

    static get loginButtonHTML() {
        return `
        <li>
            <a href="../../login/login.html">
                <i class="fa fa-sign-in fa-2x"></i>
                <span class="nav-text">Login</span>
            </a>
        </li>
        `;
    }
    static get registerButtonHTML() {
        return `
        <li>
            <a href="../../registration/registration.html">
                <i class="fa fa-user fa-2x"></i>
                <span class="nav-text">Register</span>
            </a>
        </li>
        `;
    }

    static get logoutButtonHTML() {
        return `
        <ul class="logout">
            <li>
                <div id="logout-button">
                    <i class="fa fa-power-off fa-2x"></i>
                    <span class="nav-text">Logout</span>
                </div>
            </li>
        </ul>
        `;
    }

    static get adminSectionHTML() {
        return `
        <li>
            <a href="../../administration/administration.html">
                <i class="fa-solid fa-user-secret fa-2x"></i>
                <span class="nav-text">Administration</span>
            </a>
        </li>
        `;
    }

    static injectHtml() {
        let html = SideMenu.html;

        if (SideMenu.authenticationService.isLogged) {
            html = html.replace('#login', '');
            html = html.replace('#register', '');
            html = html.replace('#logout', SideMenu.logoutButtonHTML);
            if (SideMenu.authenticationService.isAdmin)
                html = html.replace('#admin', SideMenu.adminSectionHTML);
        } else {
            html = html.replace('#login', SideMenu.loginButtonHTML);
            html = html.replace('#register', SideMenu.registerButtonHTML);
            html = html.replace('#logout', '');
            html = html.replace('#admin', '');
        }

        SideMenu.body.insertAdjacentHTML('afterbegin', html);
    }

    static bindClicks() {
        if (SideMenu.authenticationService.isLogged)
            SideMenu.logoutButton.onclick = () => SideMenu.authenticationService.logout();
    }
}

window.addEventListener('load', () => {
    SideMenu.injectHtml();
    SideMenu.bindClicks();
    console.log("Sidemenu loaded");
})
