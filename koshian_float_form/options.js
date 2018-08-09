const DEFAULT_FORM_WIDTH = 0;
const DEFAULT_FLOAT_HEIGHT = 100;
const DEFAULT_FLOAT_WIDTH = 2;
const DEFAULT_DEFAULT_HIDE_PIXEL = 1000;
const DEFAULT_USE_MOUSE_CHECK = true;
const DEFAULT_RANGE_TYPE_PIXEL = true;
const DEFAULT_HIDE_AFTER_SUBMIT = false;
const DEFAULT_LOCK_FLOAT_FORM = false;
const DEFAULT_LEFT_TOP = false;
const DEFAULT_RIGHT_TOP = false;
const DEFAULT_LEFT_BOTTOM = false;
const DEFAULT_RIGHT_BOTTOM = true;
const DEFAULT_SHOW_RANGE_X_IN_PIXEL = 500;
const DEFAULT_HIDE_RANGE_X_IN_PIXEL = 550;
const DEFAULT_SHOW_RANGE_Y_IN_PIXEL = 500;
const DEFAULT_HIDE_RANGE_Y_IN_PIXEL = 550;
const DEFAULT_SHOW_RANGE_X_IN_PERCENT = 25;
const DEFAULT_HIDE_RANGE_X_IN_PERCENT = 30;
const DEFAULT_SHOW_RANGE_Y_IN_PERCENT = 50;
const DEFAULT_HIDE_RANGE_Y_IN_PERCENT = 60;
const DEFAULT_NO_HIDE_IF_TEXT = true;

function setDisable() {
  if (document.querySelector("#use_mouse_check").checked) {
    document.querySelector("#range_type_pixel").disabled = false;
    document.querySelector("#show_range_x_in_pixel").disabled = !document.querySelector("#range_type_pixel").checked;
    document.querySelector("#hide_range_x_in_pixel").disabled = !document.querySelector("#range_type_pixel").checked;
    document.querySelector("#show_range_y_in_pixel").disabled = !document.querySelector("#range_type_pixel").checked;
    document.querySelector("#hide_range_y_in_pixel").disabled = !document.querySelector("#range_type_pixel").checked;
    document.querySelector("#range_type_percent").disabled = false;
    document.querySelector("#show_range_x_in_percent").disabled = document.querySelector("#range_type_pixel").checked;
    document.querySelector("#hide_range_x_in_percent").disabled = document.querySelector("#range_type_pixel").checked;
    document.querySelector("#show_range_y_in_percent").disabled = document.querySelector("#range_type_pixel").checked;
    document.querySelector("#hide_range_y_in_percent").disabled = document.querySelector("#range_type_pixel").checked;
    //document.querySelector("#default_hide_pixel").disabled = true;
  } else {
    document.querySelector("#range_type_pixel").disabled = true;
    document.querySelector("#show_range_x_in_pixel").disabled = true;
    document.querySelector("#hide_range_x_in_pixel").disabled = true;
    document.querySelector("#show_range_y_in_pixel").disabled = true;
    document.querySelector("#hide_range_y_in_pixel").disabled = true;
    document.querySelector("#range_type_percent").disabled = true;
    document.querySelector("#show_range_x_in_percent").disabled = true;
    document.querySelector("#hide_range_x_in_percent").disabled = true;
    document.querySelector("#show_range_y_in_percent").disabled = true;
    document.querySelector("#hide_range_y_in_percent").disabled = true;
    //document.querySelector("#default_hide_pixel").disabled = false;
  }
}

function setText() {
  let show_range_x_text, hide_range_x_text, show_range_y_text, hide_range_y_text;
  if (document.getElementById("left_top").checked || document.getElementById("left_bottom").checked) {
    show_range_x_text = "左";
    hide_range_x_text = "右";
  } else {
    show_range_x_text = "右";
    hide_range_x_text = "左";
  }
  if (document.getElementById("left_top").checked || document.getElementById("right_top").checked) {
    show_range_y_text = "上";
    hide_range_y_text = "下";
  } else {
    show_range_y_text = "下";
    hide_range_y_text = "上";
  }

  setTextByClassName("show-range-x-text", show_range_x_text);
  setTextByClassName("hide-range-x-text", hide_range_x_text);
  setTextByClassName("show-range-y-text", show_range_y_text);
  setTextByClassName("hide-range-y-text", hide_range_y_text);

  /**
   * 指定したクラス名を持つ要素のテキストをセットする
   * @param {string} class_name テキストをセットする要素のクラス名
   * @param {string} text セットする文字列
   */
  function setTextByClassName(class_name, text) {
    let elms = document.getElementsByClassName(class_name);
    for (let elm of elms) {
      elm.textContent = text;
    }
  } 
}

function safeGetValue(value, default_value) {
  return value === undefined ? default_value : value;
}

function saveOptions() {
  browser.storage.local.set({
    form_width: document.querySelector("#form_width").value,
    float_height: document.querySelector("#float_height").value,
    float_width: document.querySelector("#float_width").value,
    no_hide_if_text: document.querySelector("#no_hide_if_text").checked,
    default_hide_pixel: document.querySelector("#default_hide_pixel").value,
    use_mouse_check: document.querySelector("#use_mouse_check").checked,
    range_type_pixel: document.querySelector("#range_type_pixel").checked,
    hide_after_submit: document.querySelector("#hide_after_submit").checked,
    lock_float_form: document.querySelector("#lock_float_form").checked,
    left_top: document.querySelector("#left_top").checked,
    right_top: document.querySelector("#right_top").checked,
    left_bottom: document.querySelector("#left_bottom").checked,
    right_bottom: document.querySelector("#right_bottom").checked,
    show_range_x_in_pixel: document.querySelector("#show_range_x_in_pixel").value,
    hide_range_x_in_pixel: document.querySelector("#hide_range_x_in_pixel").value,
    show_range_y_in_pixel: document.querySelector("#show_range_y_in_pixel").value,
    hide_range_y_in_pixel: document.querySelector("#hide_range_y_in_pixel").value,
    show_range_x_in_percent: document.querySelector("#show_range_x_in_percent").value,
    hide_range_x_in_percent: document.querySelector("#hide_range_x_in_percent").value,
    show_range_y_in_percent: document.querySelector("#show_range_y_in_percent").value,
    hide_range_y_in_percent: document.querySelector("#hide_range_y_in_percent").value
  });
}

function setCurrentChoice(result) {
  document.querySelector("#form_width").value = safeGetValue(result.form_width, DEFAULT_FORM_WIDTH);
  document.querySelector("#float_height").value = safeGetValue(result.float_height, DEFAULT_FLOAT_HEIGHT);
  document.querySelector("#float_width").value = safeGetValue(result.float_width, DEFAULT_FLOAT_WIDTH);
  document.querySelector("#no_hide_if_text").checked = safeGetValue(result.no_hide_if_text, DEFAULT_NO_HIDE_IF_TEXT);
  document.querySelector("#default_hide_pixel").value = safeGetValue(result.default_hide_pixel, DEFAULT_DEFAULT_HIDE_PIXEL);
  document.querySelector("#use_mouse_check").checked = safeGetValue(result.use_mouse_check, DEFAULT_USE_MOUSE_CHECK);
  document.querySelector("#range_type_pixel").checked = safeGetValue(result.range_type_pixel, DEFAULT_RANGE_TYPE_PIXEL);
  document.querySelector("#hide_after_submit").checked = safeGetValue(result.hide_after_submit, DEFAULT_HIDE_AFTER_SUBMIT);
  document.querySelector("#lock_float_form").checked = safeGetValue(result.lock_float_form, DEFAULT_LOCK_FLOAT_FORM);
  document.querySelector("#left_top").checked = safeGetValue(result.left_top, DEFAULT_LEFT_TOP);
  document.querySelector("#right_top").checked = safeGetValue(result.right_top, DEFAULT_RIGHT_TOP);
  document.querySelector("#left_bottom").checked = safeGetValue(result.left_bottom, DEFAULT_LEFT_BOTTOM);
  document.querySelector("#right_bottom").checked = safeGetValue(result.right_bottom, DEFAULT_RIGHT_BOTTOM);
  document.querySelector("#show_range_x_in_pixel").value = safeGetValue(result.show_range_x_in_pixel, DEFAULT_SHOW_RANGE_X_IN_PIXEL);
  document.querySelector("#hide_range_x_in_pixel").value = safeGetValue(result.hide_range_x_in_pixel, DEFAULT_HIDE_RANGE_X_IN_PIXEL);
  document.querySelector("#show_range_y_in_pixel").value = safeGetValue(result.show_range_y_in_pixel, DEFAULT_SHOW_RANGE_Y_IN_PIXEL);
  document.querySelector("#hide_range_y_in_pixel").value = safeGetValue(result.hide_range_y_in_pixel, DEFAULT_HIDE_RANGE_Y_IN_PIXEL);
  document.querySelector("#range_type_percent").checked = !safeGetValue(result.range_type_pixel, DEFAULT_RANGE_TYPE_PIXEL);
  document.querySelector("#show_range_x_in_percent").value = safeGetValue(result.show_range_x_in_percent, DEFAULT_SHOW_RANGE_X_IN_PERCENT);
  document.querySelector("#hide_range_x_in_percent").value = safeGetValue(result.hide_range_x_in_percent, DEFAULT_HIDE_RANGE_X_IN_PERCENT);
  document.querySelector("#show_range_y_in_percent").value = safeGetValue(result.show_range_y_in_percent, DEFAULT_SHOW_RANGE_Y_IN_PERCENT);
  document.querySelector("#hide_range_y_in_percent").value = safeGetValue(result.hide_range_y_in_percent, DEFAULT_HIDE_RANGE_Y_IN_PERCENT);
  setDisable();
  setText();
}

function onError(error) {
  //  console.log(`Error: ${error}`);
}

function restoreOptions() {
  browser.storage.local.get().then(setCurrentChoice, onError);

  let input_list = document.getElementsByTagName("input");
  for (let i = 0; i < input_list.length; ++i) {
    input_list[i].onchange = (e) => {
      setDisable();
      setText();
      saveOptions();
    };
  }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
