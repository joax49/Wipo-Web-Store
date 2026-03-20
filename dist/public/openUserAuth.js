const userAuthWindow = document.getElementById('userAuthWindow');
const logInButton = document.getElementById('nav__show_log_in');
export function openUserAuthWindow() {
    userAuthWindow.showModal();
}
logInButton.addEventListener('click', () => openUserAuthWindow());
//# sourceMappingURL=openUserAuth.js.map