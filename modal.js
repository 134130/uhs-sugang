const _modal = document.createElement("div");
_modal.id = "modal";
_modal.classList.add("card");

document.body.appendChild(_modal);

const modal = {
    show(html) {
        _modal.innerHTML = html;
        _modal.style.display = "inline-block";

        let button = document.createElement("button");
        button.innerText = "확인";
        _modal.appendChild(button);

        button.addEventListener("click", () => { modal.close() });
    },
    close() {
        _modal.style.display = "none";
    }
}