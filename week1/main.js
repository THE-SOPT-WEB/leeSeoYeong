const $ = (selector) => document.querySelector(selector);

let cartList = [];

function hideModal(modal) {
    modal.classList.add("hide");
}

function showModal() {
    const modal = $(".modal__container");
    modal.classList.remove("hide");

    const yesButton = modal.querySelector(".order__button");
    const noButton = modal.querySelector(".cancel__button");
    yesButton.addEventListener("click", () => {
        hideModal(modal);
    });
    noButton.addEventListener("click", () => {
        hideModal(modal);
    });
}

function resetCart(cart) {
    const totalPrice = $(".cart__container > .cart__container-total > strong ");
    const menuBox = cart.querySelector(".menu__box");
    const menuInfoBox = cart.querySelectorAll("ul");
    if (menuInfoBox !== undefined) {
        for (let item of menuInfoBox) {
            removeItemInCart(item);
            menuBox.removeChild(item);
        }
    }
    totalPrice.innerText = 0;
}

function removeItemInCart(menuInfoBox) {
    let menuName = menuInfoBox.querySelector(".menu__name");
    let index = cartList.indexOf(menuName);//장바구니에서 해당 메뉴를 찾아서 삭제한다.
    cartList.splice(index, 1);
}

function handleCartButtons({ container, cart }) {
    const buttons = cart.querySelectorAll(".cart__buttons > button");
    const orderButton = buttons[0];
    const cancelButton = buttons[1];
    console.log(cancelButton);
    orderButton.addEventListener("click", function () {
        showModal();
    });
    cancelButton.addEventListener("click", function () {
        resetCart(cart);
    });
}

function removeMenu(e) {
    const menuName = e.path[1].children[0].innerText;
    const menu = e.path[2]; //지울 메뉴 ul 태그.
    const menuPrice = parsePriceToNumber(e.path[1].children[2].innerText); //지울 메뉴의 가격.
    const menuCount = e.path[1].children[1].value;
    const menuBox = $(".menu__box");
    const totalPrice = $(".cart__container > .cart__container-total > strong ");

    menuBox.removeChild(menu); //.menu__box에서 해당 ul태그를 지운다.
    let index = cartList.indexOf(menuName);//장바구니에서 해당 메뉴를 찾아서 삭제한다.
    cartList.splice(index, 1);
    totalPrice.innerText = +totalPrice.innerText - menuPrice * menuCount;
}

function parsePriceToNumber(price) {
    const removedComma = price.slice(0, -1)
        .replace(/\D/g, "");

    return +removedComma;
};

function addMenuInCart(cart, contents) {
    const menuBox = cart.querySelector(".menu__box");
    const totalPrice = cart.querySelector(".cart__container-total > strong");

    const menuName = contents[0];
    const menuCount = 1;
    const menuPrice = parsePriceToNumber(contents[1]);

    if (cartList.includes(menuName)) {//이미 장바구니에 넣었던 메뉴라면 개수만 증가
        const newMenus = document.querySelectorAll(".menu__info-list");
        for (let newMenu of newMenus) {
            const newMenuName = newMenu.querySelector(".menu__name").innerText;
            const newMenuInput = newMenu.querySelector("input");
            if (newMenuName === menuName) {
                newMenuInput.value = +newMenuInput.value + 1;
            }
        }
    } else {//장바구니에 처음 넣는 메뉴인 경우.
        cartList.push(contents[0]); //장바구니에 메뉴이름 추가

        const menuInfo = document.createElement("ul");
        menuInfo.classList.add("menu__info-lists");
        menuInfo.innerHTML = `
        <li class="menu__info-list">
                <strong class="menu__name">${menuName}</strong> 
                <input type="number" value="1"/>
                <strong class="menu__price">${menuPrice}원</strong>
                <button type="button" class="menu__btn-delete">X</button>
            </li>
    `;
        menuBox.appendChild(menuInfo);
    }
    totalPrice.innerText = +totalPrice.innerText + menuPrice * menuCount; //누적금액을 메뉴가격만큼 증가시킨다.

    const removeButtons = document.querySelectorAll(".menu__btn-delete"); // X버튼 클릭 시.
    for (let removeButton of removeButtons) {
        removeButton.addEventListener("click", removeMenu);
    }
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
    handleCartButtons(info);
    clickBurgerCard(info); //메뉴 클릭 시 장바구니에 담기.
}

window.onload = () => {
    storeManager({
        container: document.querySelectorAll(".burger__container"),
        cart: $(".cart__container"),
    });
};
