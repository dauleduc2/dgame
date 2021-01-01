import * as dataBase from "./constants/dataBase";

const { getList, postList } = require("./api/apis");
const { apiLink } = require("./constants/api");

var ID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};
// dataBase.map((data) => {
//   postList(`${apiLink}/Data`, {
//     productId: ID(),
//     alt: data.alt,
//     src: data.src,
//     background: data.background,
//     content: data.content,
//     price: data.price,
//     sale: data.sale,
//     status: data.status,
//   });
// });

// postList("Data", {
//   src:
//     "https://gamek.mediacdn.vn/133514250583805952/2020/1/24/photo-1-1579860343680811618040.jpg",
//   alt: "dead-by-daylight",
//   background:
//     "https://www.gamewallpapers.com/img_script/wallpaper_dir/img.php?src=wallpaper_dead_by_daylight_01_2560x1080.jpg&height=506&sharpen",
//   content: {
//     name: "Dead By Daylight",
//     type: ["Horror", "Survial", "Online"],
//     detail:
//       "Dead by Daylight is a multiplayer (4vs1) horror game where one player takes on the role of the savage Killer, and the other four players play as Survivors, trying to escape the Killer and avoid being caught and killed.",
//   },
//   price: 9.99,
//   sale: 80,
//   status: true,
//   productId: ID(),
// });

dataBase.dataBase3.forEach((data) => {
  postList("Data", {
    productId: ID(),
    alt: data.alt,
    src: data.src,
    background: data.background,
    content: data.content,
    price: data.price,
    sale: data.sale,
    status: data.status,
  });
});
