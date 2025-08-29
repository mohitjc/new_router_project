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