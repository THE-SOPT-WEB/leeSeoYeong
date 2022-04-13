const $ = (selector) => document.querySelector(selector);

function addMenuInCart(cart, contents) {
    console.log(contents);
}

function clickBurgerCard({ container, cart }) {
    const burgerInfoArray = container[0].children;
    for (let info in burgerInfoArray) {
        const card = burgerInfoArray[info];
        const burgerInfo = card.querySelectorAll(".burger__content > h2");

        card.addEventListener("click", () => {
            let str = "";
            for (let info of burgerInfo) {
                str += info.innerText + " ";
            }
            str = str.slice(0, str.length - 1); //맨 뒤 공백 제거
            const burgerContents = str.split(" ");
            addMenuInCart(cart, burgerContents);
        });
    }
}

function storeManager(info) {
    clickBurgerCard(info); //메뉴 클릭 시 장바구니에 담기.
}

window.onload = () => {
    storeManager({
        container: document.querySelectorAll(".burger__container"),
        cart: $(".cart__container"),

    });
}