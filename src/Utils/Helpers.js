const imageExt = [
  "png",
  "jpg",
  "jpeg",
  "tif",
  "tiff",
  "bmp",
  "gif",
  "eps",
  "heic",
];
const videoExt = ["mp4", "mov", "wmv", "flv", "avi", "avchd", "webm", "mkv"];

export const isImage = (pic) => {
  let x = pic.split(".");
  let extension = x[x.length - 1].toLowerCase();
  return imageExt.includes(extension);
};

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const capitalizeEach = (str) => {
  return str
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
};
