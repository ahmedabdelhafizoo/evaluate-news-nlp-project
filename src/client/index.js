import validateUrl from './js/validateUrl'
window.validateUrl = validateUrl;
// import main scss
import "./styles/main.scss";


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault()

        let formUrl = document.getElementById("form-url");
        let formResult = document.getElementById("form-result");

        if(formUrl.value && validateUrl(formUrl.value)) {
            formUrl.nextElementSibling.style.display = "none";
            let submitBtn = document.getElementById("submit-btn");
            submitBtn.classList.add("btn--loading");
            fetch(`http://localhost:8080/api/analyzeUrl?url=${formUrl.value}`)
                .then(response => {
                    console.log(response)
                    if (response.status == 200) {
                        formResult.previousElementSibling.style.display = "none";
                        formResult.style.display = "block";
                        response.json().then(res => {
                            console.log(res);
                            let HtmlResult = '';
                            for (let prop in res) {
                                HtmlResult += `
                            <tr>
                                <th>${prop}</th>
                                <td>${res[prop]}</td>
                            </tr>
                            `;
                            }
                            formResult.querySelector("table").innerHTML = HtmlResult;
                        })
                    } else {
                        response.json().then(res => {
                            console.log(res.message);
                            alert(res.message);
                        })
                    }
                })
                .catch(error => {
                    console.log('error', error);
                }).finally(() => {
                    submitBtn.classList.remove("btn--loading");
                });
        } else {
            formUrl.nextElementSibling.style.display = "block";
        }
    });

    document.getElementById("back-btn").addEventListener("click", function () {
        let formResult = document.getElementById("form-result");
        formResult.style.display = "none";
        formResult.previousElementSibling.style.display = "block";
    });
})