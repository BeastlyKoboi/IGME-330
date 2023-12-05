import * as main from "./main";
import * as navbar from "./navbar";

window.onload = () => {
    console.log("window.onload called");
    console.log(window);
    // 1 - do preload here - load fonts, images, additional sounds, etc...

    navbar.addNavbarBehavior();

    if (window.location.href.indexOf('about') !== -1) {

    }
    else {
        // start up app
        main.init();
    }


}