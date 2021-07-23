function eventSetter() {
    const options = document.getElementsByTagName("li");

    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", changeActivationStatus);
    }
}

function changeActivationStatus() {
    const parent_id = this.parentNode.parentNode.getAttribute("id");
    const parent_section = document.getElementById(parent_id);
    const options = parent_section.getElementsByTagName("li");
    let active_class = "active";
    let hidden_class = "hidden";

    if (this.className.indexOf(active_class) !== -1) {
        optionDeactivation(this, active_class, hidden_class, parent_id);
    } else {
        let active_index = indexOfActiveOption(options, active_class);
        if (active_index !== -1) {
            optionDeactivation(options[active_index], active_class, hidden_class, parent_id);
        }
        optionActivation(this, active_class, hidden_class, parent_id);
    }

    confirmationButtonChanger();
}

function optionActivation(option, active_class, hidden_class, section) {
    // Border activation
    option.classList.add(active_class);
    // Icon activation
    option.getElementsByClassName("icon")[0].classList.remove(hidden_class);
    let option_name = option.getElementsByClassName("option-name")[0].innerHTML
    let price = getPrice(option.getElementsByClassName("price")[0].innerHTML);
    bill[section] = [option_name, price];
}

function optionDeactivation(option, active_class, hidden_class, section) {
    // Border deactivation
    option.classList.remove(active_class);
    // Icon deactivation
    option.getElementsByClassName("icon")[0].classList.add(hidden_class);
    bill[section] = [];
}

function indexOfActiveOption(options, active_class) {
    let index = -1;
    for (let i = 0; i < options.length; i++) {
        if (options[i].classList.contains(active_class)) {
            return i;
        }
    }
    return index;
}

function getPrice(price_string) {
    // Getting only the number of the string
    price_string = price_string.slice(price_string.indexOf(" ") + 1);
    price_string = price_string.replace(",", ".")
    return Number(price_string)
}

function confirmationButtonChanger() {
    button_div = document.getElementsByClassName("bottom-button")[0];
    confirmation_button = button_div.getElementsByTagName("input")[0];

    if (bill.meal.length > 0 && bill.drink.length > 0 && bill.dessert.length > 0) {
        confirmation_button.className = "button-enabled";
        confirmation_button.value = "Fechar pedido";
    } else {
        confirmation_button.className = "button-disabled";
        confirmation_button.value = "Selecione os 3 itens para fechar o pedido";
    }
}

function openBillWindow() {
    // Infos refresh
    getBillCategoryInfos("meal");
    getBillCategoryInfos("drink");
    getBillCategoryInfos("dessert");
    document.getElementById("total-cost").innerHTML = brRealFormatter(bill.total_charge());

    // Bill display
    document.getElementsByClassName("bill-background")[0].classList.remove("hidden");
}

function closeBillWindow() {
    document.getElementsByClassName("bill-background")[0].classList.add("hidden");
}

function getBillCategoryInfos(category) {
    document.getElementById(category + "-name").innerHTML = bill[category][0];
    document.getElementById(category + "-price").innerHTML = moneyFormatter(bill[category][1]);
}

function moneyFormatter(number) {
    number = number.toFixed(2);
    let money_string = number.toString();
    money_string = money_string.replace(".", ",");
    return money_string;
}

function brRealFormatter(number) {
    let real = moneyFormatter(number);
    return "R$ " + real;
}

function nameRequest() {
    return prompt("Por favor, digite seu nome");
}

function adressRequest() {
    return prompt("Digite seu endereço");
}

function sendWhatsAppMessage() {
    const persons_name = nameRequest();
    const adress = adressRequest();
    const meal_name = bill.meal[0];
    const drink_name = bill.drink[0];
    const dessert_name = bill.dessert[0];
    const total_cost = brRealFormatter(bill.total_charge());

    let message = `Olá, gostaria de fazer o pedido:\n`
        + `- Prato: ${meal_name}\n`
        + `- Bebida: ${drink_name}\n`
        + `- Sobremesa: ${dessert_name}\n`
        + `Total: ${total_cost}\n\n`
        + `Nome: ${persons_name}\n`
        + `Endereço: ${adress}`;

    let link = "https://wa.me/5521999812307?text=" + encodeURIComponent(message);

    window.open(link, "_blank");
    window.location.reload();
}

const bill = {
    meal: [],
    drink: [],
    dessert: [],
    total_charge: function () {
        let sum = 0;

        if (this.meal.length > 0) {
            sum += this.meal[1];
        }
        if (this.drink.length > 0) {
            sum += this.drink[1];
        }
        if (this.dessert.length > 0) {
            sum += this.dessert[1];
        }
        return sum;
    }
};

eventSetter();
