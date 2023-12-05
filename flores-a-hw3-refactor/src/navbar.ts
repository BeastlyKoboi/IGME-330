// mobile menu
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

const addNavbarBehavior = () => {
    burgerIcon.addEventListener("click", () => {
        navbarMenu.classList.toggle("is-active");
    });
}

export { addNavbarBehavior }