export class SideMenu {

    static get body() {
        return document.querySelector("body");
    }

    static injectHtml() {
        const html = `
            <div class="area"></div>
            <nav class="main-menu">
                <ul>
                    <li>
                        <a href="../../home/home.html">
                            <i class="fa fa-home fa-2x"></i>
                            <span class="nav-text">Home</span>
                        </a>                      
                    </li>   
                     <li>
                        <a href="../../login/login.html">
                            <i class="fa fa-sign-in fa-2x"></i>
                            <span class="nav-text">Login</span>
                        </a>
                    </li>
                </ul>
            
                <ul class="logout">
                    <li>
                         <a href="../../login/login.html">
                            <i class="fa fa-power-off fa-2x"></i>
                            <span class="nav-text">Logout</span>
                        </a>
                    </li>
                </ul>
            </nav>        
        `;

        SideMenu.body.insertAdjacentHTML('afterbegin', html);
    }
}

window.onload = function () {
    SideMenu.injectHtml();
}
