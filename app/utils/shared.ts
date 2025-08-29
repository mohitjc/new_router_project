import envirnment from "~/envirnment";

export const loaderHtml = (p: boolean) => {
  const loaderEl = document.getElementById("loader");
  if (!loaderEl) return;
  if (p) {
    loaderEl.classList?.remove("hidden");
  } else {
    loaderEl.classList?.add("hidden");
  }
};

export const noImg = (img:any='', defaultImg = '/assets/img/placeholder.png') => {
  let value = defaultImg;
  if (img?.includes("https")) return img;
  if (img) value = `${envirnment.image_path}${img}`;
  return value;
};

export const isNumber = (e:any) => {
  let key = e.target;
  let maxlength = key.maxLength ? key.maxLength : 0;

  let max = Number(key.max ? key.max : key.value);
  if (Number(key.value) > max) key.value = max;

  // let min = key.min;
  // if (min && Number(key.value)<Number(min)) key.value = min;


  if (maxlength > 0) {
    if (key.value.length > maxlength) key.value = key.value.slice(0, maxlength);
  }

  key.value = key.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");

  return key.value;
};