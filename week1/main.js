const $ = (selector) => document.querySelector(selector);

let cartList = [];

function parsePriceToNumber(price) {
    const removedComma = price.slice(0, -1)
        .replace(/\D/g, "");

    return +removedComma;
};

function addMenuInCart(cart, contents) {
    const menuBox = cart.querySelector(".menu__box");
    const totalPrice = cart.querySelector(".cart__container-total > strong");

    const menuName = contents[0];
    const menuPrice = parsePriceToNumber(contents[1]);

    if (cartList.includes(menuName)) {//이미 장바구니에 넣었다면 개수만 증가
        const newMenus = document.querySelectorAll(".menu__info-list");
        for (let newMenu of newMenus) {
            const newMenuName = newMenu.querySelector(".menu__name").innerText;
            const newMenuInput = newMenu.querySelector("input");
            if (newMenuName === menuName) {
                newMenuInput.value = +newMenuInput.value + 1;
                console.log(newMenuInput);
            }
        }
        // menuCount.value = +menuCount.value + 1;
    } else {
        cartList.push(contents[0]); //장바구니에 메뉴이름 추가

        const menuInfo = document.createElement("ul");
        menuInfo.classList.add("menu__info-lists");
        menuInfo.innerHTML = `
        <li class="menu__info-list">
                <strong class="menu__name">${menuName}</strong> 
                <input type="number" value="1"/>
                <strong class="menu__price">${menuPrice}원</strong>
                <button class="menu__btn-delete">X</button>
            </li>
    `;
        menuBox.appendChild(menuInfo);
    }

    totalPrice.innerText = +totalPrice.innerText + menuPrice;
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
};
