import * as echarts from "./node_modules/echarts/dist/echarts.esm.js";
import { log } from "./utils.js";
import { createHero } from "./src/create.js";
import Timer from "./src/Timer.js";
import { setupKeyBoard } from "./src/input.js";
const chartDom = document.getElementById("main");
const myChart = echarts.init(chartDom);
let option;
let gravity = 2000;
let data = [];
let x = 50,
  y = 0;
// 自定义图形
const renderItem = function (params, api) {
  //api.value 拿到data中的数据默认
  var categoryIndex = api.value(0);
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);

  var height = 50;

  var rectShape = echarts.graphic.clipRectByRect(
    {
      x: start[0],
      y: start[1],
      width: end[0] - start[0],
      height: height,
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    }
  );
  return {
    type: "rect",
    shape: rectShape,
    style: api.style(),
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
    // 一定要有设置这两个属性
    // show: false,
    max: 2000,
    min: 0,
    type: "value",
  },
  yAxis: {
    max: 2000,
    min: 0,
    type: "value",
    // show: false,
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
      encode: {
        x: [1, 2],
        y: 0,
      },
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

//创建hero
const hero = createHero();
hero.pos.set(x, y);

// 绑定键盘事件
const input = setupKeyBoard(hero);
input.listenTo(window);
const loop = function (dt) {
  hero.update(dt);
  hero.pos.x += hero.vel.x * dt;
  hero.pos.y += hero.vel.y * dt;
  option.series[0].data[0][0] = hero.pos.x;
  option.series[0].data[0][1] = -hero.pos.y;
  hero.vel.y += gravity * dt;
};
const timer = new Timer(1 / 60);
timer.update = function (dt) {
  loop(dt);
  myChart.setOption(option);
};
timer.start();

option && myChart.setOption(option);
