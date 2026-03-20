const userAuthWindow = document.getElementById('userAuthWindow');
const form = document.getElementById('modal__form');
const input = document.getElementById('modal__password');
const answerHolder = document.getElementById('modal__answer');
form.addEventListener("submit", async (b) => {
    b.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/auth/", {
            method: 'POST',
            body: JSON.stringify({ 'password': input.value }),
            headers: { "Content-type": "application/json" }
        });
        if (response.ok) {
            userAuthWindow.close();
        }
        else {
            answerHolder.innerText = "Incorrect password";
        }
    }
    catch (e) {
        console.log(e);
    }
});
export {};
//# sourceMappingURL=userAuth.js.map