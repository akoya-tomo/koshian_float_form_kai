const DEFAULT_FLOAT_HEIGHT = 100;
const DEFAULT_NO_HIDE_IF_TEXT = true;
const DEFAULT_DEFAULT_HIDE_PIXEL = 1000;
const DEFAULT_USE_MOUSE_CHECK = true;
const DEFAULT_RANGE_TYPE_PIXEL = true;
const DEFAULT_SHOW_RANGE_X_IN_PIXEL = 500;
const DEFAULT_HIDE_RANGE_X_IN_PIXEL = 550;
const DEFAULT_SHOW_RANGE_Y_IN_PIXEL = 500;
const DEFAULT_HIDE_RANGE_Y_IN_PIXEL = 550;
const DEFAULT_SHOW_RANGE_X_IN_PERCENT = 25;
const DEFAULT_HIDE_RANGE_X_IN_PERCENT = 30;
const DEFAULT_SHOW_RANGE_Y_IN_PERCENT = 50;
const DEFAULT_HIDE_RANGE_Y_IN_PERCENT = 60;
let float_height = DEFAULT_FLOAT_HEIGHT;
let no_hide_if_text = DEFAULT_NO_HIDE_IF_TEXT;
let default_hide_pixel = DEFAULT_DEFAULT_HIDE_PIXEL;
let use_mouse_check = DEFAULT_USE_MOUSE_CHECK;
let range_type_pixel = DEFAULT_RANGE_TYPE_PIXEL;
let show_range_x_in_pixel = DEFAULT_SHOW_RANGE_X_IN_PIXEL;
let hide_range_x_in_pixel = DEFAULT_HIDE_RANGE_X_IN_PIXEL;
let show_range_y_in_pixel = DEFAULT_SHOW_RANGE_Y_IN_PIXEL;
let hide_range_y_in_pixel = DEFAULT_HIDE_RANGE_Y_IN_PIXEL;
let show_range_x_in_percent = DEFAULT_SHOW_RANGE_X_IN_PERCENT;
let hide_range_x_in_percent = DEFAULT_HIDE_RANGE_X_IN_PERCENT;
let show_range_y_in_percent = DEFAULT_SHOW_RANGE_Y_IN_PERCENT;
let hide_range_y_in_percent = DEFAULT_HIDE_RANGE_Y_IN_PERCENT;
let form = null;
let textarea = null;
let toggle = null;
let have_focus = false;
let mx = 0;
let my = 0;
let locked = false;

function onMouseMove(e) {
    mx = e.clientX;
    my = e.clientY;

    if(locked){
        return;
    }

    if (isHide() && isShowable()) {
        show();
    } else if(isShow() && isHidable()){
        hide();
    }
}

function onFocus(e){
    have_focus = true;

    if(isHide() &&isShowable()){
        show();
    }
}

function onBlur(e){
    have_focus = false;

    // 数瞬後に別の入力欄にフォーカスが移るかも
    setTimeout(() => {
        if(isShow() && isHidable()){
            hide();
        }
    },10);
}

function isShow(){
    return form.style.display != "none";
}

function isHide(){
    return form.style.display == "none";
}

// must show:true
function isShowable() {
    let cw = document.documentElement.clientWidth;
    let ch = document.documentElement.clientHeight;

    if (range_type_pixel) {
        if ((cw - mx < show_range_x_in_pixel) && (ch - my < show_range_y_in_pixel)) {
            return true;
        } else {
            return false;
        }
    } else {
        let px = 100.0 * (cw - mx) / cw;
        let py = 100.0 * (ch - my) / ch;

        if ((px < show_range_x_in_percent) && (py < show_range_y_in_percent)) {
            return true;
        } else {
            return false;
        }
    }
}

// must hide:true
function isHidable() {
    let cw = document.documentElement.clientWidth;
    let ch = document.documentElement.clientHeight;

    if (no_hide_if_text) {
        if(have_focus){
            return false;
        }

        if (textarea.value.length != 0) {
            return false;
        }
    }

    if (range_type_pixel) {
        if ((cw - mx > hide_range_x_in_pixel) || (ch - my > hide_range_y_in_pixel)) {
            return true;
        } else {
            return false;
        }
    } else {
        let px = 100.0 * (cw - mx) / cw;
        let py = 100.0 * (ch - my) / ch;

        if ((px > hide_range_x_in_percent) || (py > hide_range_y_in_percent)) {
            return true;
        } else {
            return false;
        }
    }
}

function setFormStyle(form_display) {
    form.style = {};
    form.style.visibility = "visible";
    form.style.zIndex = 2;
    form.style.backgroundColor = "#FFFFEE";
    form.style.border = "solid 1px";
    form.style.position = "fixed";
    form.style.right = "2px";
    form.style.bottom = `${float_height + 30}px`;
    form.style.display = form_display;
}

function show() {
    setFormStyle("block");
    toggle.value = "隠す";
}

function hide() {
    setFormStyle("none");
    toggle.value = "表示";
}

function safeGetValue(value, default_value) {
    return value === undefined ? default_value : value;
}

function onError(error) {
    // 
}

function onLoadSetting(result) {
    float_height = Number(safeGetValue(result.float_height, DEFAULT_FLOAT_HEIGHT));
    no_hide_if_text = safeGetValue(result.no_hide_if_text, DEFAULT_NO_HIDE_IF_TEXT);
    default_hide_pixel = safeGetValue(result.default_hide_pixel, DEFAULT_DEFAULT_HIDE_PIXEL);
    use_mouse_check = safeGetValue(result.use_mouse_check, DEFAULT_USE_MOUSE_CHECK);
    range_type_pixel = safeGetValue(result.range_type_pixel, DEFAULT_RANGE_TYPE_PIXEL);
    show_range_x_in_pixel = safeGetValue(result.show_range_x_in_pixel, DEFAULT_SHOW_RANGE_X_IN_PIXEL);
    hide_range_x_in_pixel = safeGetValue(result.hide_range_x_in_pixel, DEFAULT_HIDE_RANGE_X_IN_PIXEL);
    show_range_y_in_pixel = safeGetValue(result.show_range_y_in_pixel, DEFAULT_SHOW_RANGE_Y_IN_PIXEL);
    hide_range_y_in_pixel = safeGetValue(result.hide_range_y_in_pixel, DEFAULT_HIDE_RANGE_Y_IN_PIXEL);
    show_range_x_in_percent = safeGetValue(result.show_range_x_in_percent, DEFAULT_SHOW_RANGE_X_IN_PERCENT);
    hide_range_x_in_percent = safeGetValue(result.hide_range_x_in_percent, DEFAULT_HIDE_RANGE_X_IN_PERCENT);
    show_range_y_in_percent = safeGetValue(result.show_range_y_in_percent, DEFAULT_SHOW_RANGE_Y_IN_PERCENT);
    hide_range_y_in_percent = safeGetValue(result.hide_range_y_in_percent, DEFAULT_HIDE_RANGE_Y_IN_PERCENT);

    main();
}

function onChangeSetting(changes, areaName) {
    if (areaName != "local") {
        return;
    }

    float_height = Number(safeGetValue(changes.float_height.newValue, float_height));
    no_hide_if_text = safeGetValue(changes.no_hide_if_text.newValue, no_hide_if_text);
    default_hide_pixel = safeGetValue(changes.default_hide_pixel.newValue, DEFAULT_DEFAULT_HIDE_PIXEL);
    range_type_pixel = safeGetValue(changes.range_type_pixel.newValue, range_type_pixel);
    show_range_x_in_pixel = safeGetValue(changes.show_range_x_in_pixel.newValue, show_range_x_in_pixel);
    hide_range_x_in_pixel = safeGetValue(changes.hide_range_x_in_pixel.newValue, hide_range_x_in_pixel);
    show_range_y_in_pixel = safeGetValue(changes.show_range_y_in_pixel.newValue, show_range_y_in_pixel);
    hide_range_y_in_pixel = safeGetValue(changes.hide_range_y_in_pixel.newValue, hide_range_y_in_pixel);
    show_range_x_in_percent = safeGetValue(changes.show_range_x_in_percent.newValue, show_range_x_in_percent);
    hide_range_x_in_percent = safeGetValue(changes.hide_range_x_in_percent.newValue, hide_range_x_in_percent);
    show_range_y_in_percent = safeGetValue(changes.show_range_y_in_percent.newValue, show_range_y_in_percent);
    hide_range_y_in_percent = safeGetValue(changes.hide_range_y_in_percent.newValue, hide_range_y_in_percent);

    form.style.bottom = `${float_height + 20}px`;
    toggle.style.bottom = `${float_height}px`;
}

function main() {
    form = document.getElementById("ftbl");
    textarea = document.getElementById("ftxa");
    toggle = document.createElement("input");
    let lock_button = document.createElement("div");
    lock_button.style.position = "fixed";
    lock_button.style.right = "2px";
    lock_button.style.bottom = `${float_height + 2}px`;
    lock_button.style.width = `24px`;
    lock_button.style.height = `24px`;
    let icon_unlock = document.createElement("img");
    icon_unlock.src = browser.extension.getURL("icons/key_unlock.png");
    icon_unlock.hidden = false;
    icon_unlock.style.width = "100%";
    let icon_lock = document.createElement("img");
    icon_lock.src = browser.extension.getURL("icons/key_lock.png");
    icon_lock.hidden = true;
    icon_lock.style.width = "100%";

    lock_button.onclick = (e) => {
        locked = !locked;
        icon_unlock.hidden = locked;
        icon_lock.hidden = !locked;
    }
    lock_button.appendChild(icon_unlock);
    lock_button.appendChild(icon_lock);
    document.body.appendChild(lock_button);


    if (form == null || textarea == null || toggle == null) {
        return;
    }

    if (document.documentElement.clientWidth > default_hide_pixel) {
        show();
    } else {
        hide();
    }

    toggle.style.position = "fixed";
    toggle.style.right = "28px";
    toggle.style.bottom = `${float_height}px`;
    toggle.style.display = "block";
    toggle.type = "button";
    toggle.onclick = (e) => {
        if (isHide()) {
            show();
        } else {
            hide();
        }
    };

    document.body.appendChild(toggle);

    window.addEventListener("resize", (e) => {
        setFormStyle(form.style.display);
    });

    // 
    let input_elems = form.getElementsByTagName("input");
    for(let i = 0; i < input_elems.length; ++i){
        input_elems[i].addEventListener("focus", onFocus);
        input_elems[i].addEventListener("blur", onBlur);
    }
    textarea.addEventListener("focus", onFocus);
    textarea.addEventListener("blur", onBlur);

    if (use_mouse_check) {
        window.addEventListener("mousemove", onMouseMove);
    }

    // フォーム位置切り替えを無効化
    let switch_form = document.getElementById("reszb");
    if (switch_form) {
        switch_form.onclick = (e) => { };
        switch_form.style.textDecoration = "line-through";
    }

    // cookieが効いてる場合フォームが移動するのでリセットを掛ける
    setTimeout(() => {
        if (document.documentElement.clientWidth > default_hide_pixel) {
            show();
        } else {
            hide();
        }
    }, 10);

    setTimeout(() => {
        if (document.documentElement.clientWidth > default_hide_pixel) {
            show();
        } else {
            hide();
        }
    }, 100);

    setTimeout(() => {
        if (document.documentElement.clientWidth > default_hide_pixel) {
            show();
        } else {
            hide();
        }
    }, 300);

    setTimeout(() => {
        if (document.documentElement.clientWidth > default_hide_pixel) {
            show();
        } else {
            hide();
        }
    }, 1000);
}

browser.storage.local.get().then(onLoadSetting, onError);
browser.storage.onChanged.addListener(onChangeSetting);