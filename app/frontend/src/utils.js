
export const hideElement = (name) => {
    var x = document.getElementById(name);
    if (x != null) {
        x.style.display = "none";
    }
}

export const showElement = (name) => {
    var x = document.getElementById(name);
    if (x != null) {
        x.style.display = "block";
    }

}

export const blurElement = (name) => {
    var x = document.getElementById(name);
    if (x != null) {
        x.blur();
    }
}

export const focusElement = (name) => {
    var x = document.getElementById(name);
    if (x != null) {
        x.focus();
    }
}