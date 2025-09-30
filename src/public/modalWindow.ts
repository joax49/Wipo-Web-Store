const modalWindow = document.querySelector("dialog") as HTMLDialogElement;

const form = document.getElementById('modal__form') as HTMLFormElement;
const input = document.getElementById('modal__password') as HTMLInputElement;
const submit = document.getElementById('modal__input') as HTMLInputElement;
const answerHolder = document.getElementById('modal__answer') as HTMLTitleElement;

form.addEventListener("submit", async (b) => {
    b.preventDefault();

    console.log("hola")
    console.log(input.value)

    try {
        const response = await fetch("http://localhost:3000/auth/", {
            method: 'POST',
            body: JSON.stringify({'password': input.value}),
            headers: {"Content-type" : "application/json"}
        });

    console.log(response);

    if (response.ok) {
        modalWindow.close()
    }

    else {
        answerHolder.innerText = "Incorrect password"
    }


    } catch(e) {
        console.log(e)
    }
})