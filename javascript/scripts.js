function eventSetter(){
    const options = document.getElementsByTagName("li");
    
    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", changeActivationStatus);
    }
}

function changeActivationStatus(){
    const parent_id = this.parentNode.parentNode.getAttribute("id");
    const parent_section = document.getElementById(parent_id);
    const options = parent_section.getElementsByTagName("li");
    let active_string = " active";
    
    if (this.className.indexOf(active_string) !== -1){
        optionDeactivation(this, active_string, parent_id);
    }else{
        let activated = indexOfActivetedOption(options, active_string);
        if (activated !== -1){
            optionDeactivation(options[activated], active_string, parent_id);
        }
        optionActivation(this, active_string, parent_id);
    }

    console.log(bill)
}

function optionActivation(option, active_string, section){
    option.className = option.className + active_string;
    option.getElementsByClassName("icon")[0].style.display = "initial";
    let option_name = option.getElementsByClassName("option-name")[0].innerHTML
    let price = getPrice(option.getElementsByClassName("price")[0].innerHTML);
    bill[section] = [option_name, price];
}

function optionDeactivation(option, active_string, section){
    let stop_index = option.className.indexOf(active_string)
    option.className = option.className.slice(0, stop_index);
    option.getElementsByClassName("icon")[0].style.display = "none";
    bill[section] = [];
}

function indexOfActivetedOption(options, active_string){
    let index = -1;
    for (let i = 0; i < options.length; i++){
        if (options[i].className.indexOf(active_string) !== -1){
            return i;
        }
    }
    return index;
}

function getPrice(price_string){
    // Getting only the number of the string
    price_string = price_string.slice(price_string.indexOf(" ") + 1);
    price_string = price_string.replace(",", ".")
    console.log(Number(price_string));
    return Number(price_string)
}

const bill = {
    meal: [], 
    drink: [], 
    dessert: [], 
    status: function (){
        return "meal: " + this.meal + ", drink: " + this.drink + ", dessert: " + this.dessert
    }
};

eventSetter();