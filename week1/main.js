const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


let cartList = [];
let totalPrice = $(".cart__container > .cart__container-total > strong ");

function parsePriceToNumber(price) {
    const removedComma = price.slice(0, -1)
        .replace(/\D/g, "");

    return +removedComma;
};

function getTotalPrice() {
    const menuList = $$(".menu__info-list");
    let totalAmount = 0;

    menuList.forEach((menu) => {
        const price = parsePriceToNumber(menu.querySelector(".menu__price").innerText);
        const count = menu.querySelector("input").value;

        totalAmount += price * count;
    });
    totalPrice.innerText = totalAmount;
}

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
    const menuBox = cart.querySelector(".menu__box");
    const menuInfoBox = cart.querySelectorAll("ul");
    if (menuInfoBox !== undefined) {
        for (let item of menuInfoBox) {
            removeItemInCart(item);
            menuBox.removeChild(item);
        }
    }
    totalPrice.innerText = 0;
    amount = 0;
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
    orderButton.addEventListener("click", () => showModal());
    cancelButton.addEventListener("click", function () {
        resetCart(cart);
    });
}

function removeMenu(e) {
    const menuName = e.path[1].children[0].innerText;
    const menu = e.path[2]; //지울 메뉴 ul 태그.
    const menuBox = $(".menu__box");

    menuBox.removeChild(menu); //.menu__box에서 해당 ul태그를 지운다.
    let index = cartList.indexOf(menuName);//장바구니에서 해당 메뉴를 찾아서 삭제한다.
    cartList.splice(index, 1);

    getTotalPrice();
}

function addMenuInCart(cart, contents) {
    const menuBox = cart.querySelector(".menu__box");
    const menuName = contents[0];
    const menuPrice = parsePriceToNumber(contents[1]);

    if (cartList.includes(menuName)) {//이미 장바구니에 넣었던 메뉴라면 개수만 증가
        const newMenus = $$(".menu__info-list");
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
    getTotalPrice();

    cart.classList.add("add"); //장바구니 애니메이션 추가.
    setTimeout(() => {
        cart.classList.remove("add");
    }, 200);

    const removeButtons = $$(".menu__btn-delete"); // X버튼 클릭 시.
    for (let removeButton of removeButtons) {
        removeButton.addEventListener("click", removeMenu);
    }

    const inputValues = $$(".menu__info-list > input");
    for (let inputValue of inputValues) {

        inputValue.addEventListener("change", () => {
            getTotalPrice();
        });
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
        container: $$(".burger__container"),
        cart: $(".cart__container"),
    });
};
