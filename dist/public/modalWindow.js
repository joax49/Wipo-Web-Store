const modalWindow = document.querySelector("dialog");
const form = document.getElementById('modal__form');
const input = document.getElementById('modal__password');
const submit = document.getElementById('modal__input');
const answerHolder = document.getElementById('modal__answer');
form.addEventListener("submit", async (b) => {
    b.preventDefault();
    console.log("hola");
    console.log(input.value);
    try {
        const response = await fetch("http://localhost:3000/auth/", {
            method: 'POST',
            body: JSON.stringify({ 'password': input.value }),
            headers: { "Content-type": "application/json" }
        });
        console.log(response);
        if (response.ok) {
            modalWindow.close();
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
//# sourceMappingURL=modalWindow.js.map