const userAuthWindow = document.getElementById('userAuthWindow') as HTMLDialogElement;
const logInButton = document.getElementById('nav__show_log_in') as HTMLButtonElement;

export function openUserAuthWindow():void {
    userAuthWindow.showModal()
}

logInButton.addEventListener('click', () => openUserAuthWindow())