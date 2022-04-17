import * as echarts from "./node_modules/echarts/dist/echarts.esm.js";
import { log, sleep } from "./utils.js";
const chartDom = document.getElementById("main");
const myChart = echarts.init(chartDom);
let option;

// 数据
let x = 50,
  y = 30;
const data = [
  [0, 150, 50],
  [1, 150, 150],
];

function createMap() {
  let l = data.length;
  Array.from({ length: 2 }).forEach((item, index) => {
    data.push([l + index, (l + index) * 150, 50]);
  });
}
// 自定义图形
const renderItem = function (params, api) {
  //api.value 拿到data中的数据默认

  // data数据映射坐标系api.coord
  const [x, y] = api.coord([api.value(1), api.value(2)]);
  const bandWidth = api.size([0, 0])[0]; //每个区域的宽度

  var rectShape = echarts.graphic.clipRectByRect(
    {
      x: x,
      y: y,
      width: 100,
      height: 100,
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    }
  );
  // return {
  //   type: "rect",
  //   shape: rectShape,
  //   style: api.style({
  //     fill: "red",
  //   }),
  // };

  return {
    type: "image",
    style: api.style({
      x: x,
      y: y,
      width: 100,
      height: 100,
      image: "./assets/map-stone.png",
    }),
  };
};

option = {
  grid: {
    top: "10%",
    bottom: "10%",
    left: "10%",
    right: "10%",
  },
  xAxis: {
    show: false,
    // 一定要有设置这两个属性
    max: 200,
    min: 0,
    type: "value",
  },
  yAxis: {
    max: 200,
    min: 0,
    type: "value",
    show: false,
  },
  series: [
    {
      name: "hero",
      symbolSize: 100,
      symbol: "image://./assets/hero.png",
      data: [[x, y]],
      type: "scatter",
      animation: false,
    },
    {
      name: "障碍物",
      type: "custom",
      data: data,
      renderItem: renderItem,
    },
  ],
};
//测试
function animation() {
  let vh = 0,
    vw = 0.5;
  setInterval(() => {
    // 更新x
    option.series[0].data[0][0] += vw;
    option.series[0].data[0][1] += vh;
    // 坐标系范围调整
    option.xAxis.min += vw;
    option.xAxis.max += vw;
    myChart.setOption(option);
  }, 125);
}
let jumpDownSpeed = 5,
  jumpUpSpeed = 3;
let fps = 1000 / 60;
let vh = 0,
  vw = 5;
const jumpHeight = 100;
let keys = {};
//idle、walk、jump
let status = "idle";
window.addEventListener("keydown", (e) => {
  keys[e.keyCode] = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.keyCode] = false;
});
let spaceIsDown = false;

let timer = {};
//跳
function jump(obj = {}) {
  clearInterval(obj.timerID);
  y = !spaceIsDown ? option.series[0].data[0][1] : y;
  spaceIsDown = true;
  obj.timerID = setInterval(() => {
    if (option.series[0].data[0][1] >= jumpHeight) {
      status = "jump_up";
      clearInterval(obj.timerID);
    } else {
      option.series[0].data[0][1] += jumpUpSpeed;
    }
  }, fps);
}
function jumpListener() {
  if (status == "jump_up") {
    if (y > option.series[0].data[0][1]) {
      option.series[0].data[0][1] = y;
      status = "idle";
      spaceIsDown = false;
    } else {
      // 重力下降
      option.series[0].data[0][1] -= jumpDownSpeed;
    }
  }
}
function updateXAxis(dir) {
  option.xAxis.min = option.xAxis.min + dir * vw;
  option.xAxis.max = option.xAxis.max + dir * vw;
  if (option.xAxis.max % 200 == 0) {
    createMap();
  }
}
function updateHeroPosition(dir) {
  option.series[0].data[0][0] = option.series[0].data[0][0] + dir * vw;
}
function keyFunction() {
  if (keys[87]) {
    // log("w")
  } else if (keys[83]) {
    // log('s')
  } else if (keys[65]) {
    log("a");
    updateHeroPosition(-1);
    updateXAxis(-1);
  } else if (keys[68]) {
    log("d");
    updateHeroPosition(1);
    updateXAxis(1);
  } else if (keys[32] && status != "jump_up" && !spaceIsDown) {
    jump(timer);
    log("空格");
  }
  if (keys[87] || keys[83] || keys[65] || keys[68]) {
    log(
      `当前坐标:{x:${option.series[0].data[0][0]},y:${option.series[0].data[0][1]}}`
    );
  }
}

function main() {
  setInterval(async () => {
    keyFunction();
    jumpListener();
    myChart.setOption(option);
  }, fps);
}
main();

option && myChart.setOption(option);
