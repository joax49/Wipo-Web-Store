const userAuthWindow = document.getElementById('userAuthWindow') as HTMLDialogElement;

const form = document.getElementById('modal__form') as HTMLFormElement;
const input = document.getElementById('modal__password') as HTMLInputElement;
const answerHolder = document.getElementById('modal__answer') as HTMLTitleElement;

form.addEventListener("submit", async (b) => {
    b.preventDefault();

    try {
        const response = await fetch("http://localhost:3000/auth/", {
            method: 'POST',
            body: JSON.stringify({'password': input.value}),
            headers: {"Content-type" : "application/json"}
        });

    if (response.ok) {
        userAuthWindow.close()
    }

    else {
        answerHolder.innerText = "Incorrect password"
    }


    } catch(e) {
        console.log(e)
    }
})