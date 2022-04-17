import * as echarts from './node_modules/echarts/dist/echarts.esm.js';
import {log,sleep} from './utils.js'
const chartDom = document.getElementById('main');
const myChart = echarts.init(chartDom);
let option;



// 数据
let x = 50,y=30
const data = []
const dataCount = 7;
for (let i = 0; i < dataCount; i++) {
    data.push([
        echarts.number.round(Math.random() * 100),
        echarts.number.round(Math.random() * 400),
        echarts.number.round(Math.random() * 400)
    ]);
}

// 自定义图形
const renderItem = function (params, api){
  //api.value 拿到data中的数据默认
  var categoryIndex = api.value(0);
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);
  var height = api.size([0, 1])[1]
  var rectShape = echarts.graphic.clipRectByRect({
    x: start[0],
    y: start[1] - height / 2,
    width: end[0] - start[0],
    height: height
  }, {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
  });
    return {
      type: 'rect',
      shape: rectShape,
      style: api.style()
    }
}
option = {
   grid: {
      top: "10%",
      bottom:"10%",
      left: "10%",
      right: "10%"
   },
  xAxis: {
    // 一定要有设置这两个属性
    // show:false,
     max: 200,
     min:0,
    type: 'value',
  },
  yAxis: {
     max: 200,
     min: 0,
     type: 'value',
    // show:falseaads
  },
  series: [
    { 
      name:"hero",
      symbolSize: 100,
      symbol:"image://./assets/hero.png",
      data: [
        [x,y]
      ],
      type: 'scatter',
      animation: false
    },
    {
      name:"障碍物",
      type:"custom",
      data:data,
      encode: {
          x: [1, 2],
          y: 0
      },
      renderItem:renderItem
    }
  ]
};
//测试
function animation(){
  let  vh = 0,vw = 0.5
  setInterval(()=>{
      // 更新x
      option.series[0].data[0][0] +=vw
      option.series[0].data[0][1] +=vh
      // 坐标系范围调整
      option.xAxis.min += vw;
      option.xAxis.max += vw;
      myChart.setOption(option);
  },125)
}

let  vh = 0,vw = 5

let keys = {}
//idle、walk、jump
let status = 'idle'
window.addEventListener('keydown',(e)=>{
  keys[e.keyCode] = true
})
window.addEventListener('keyup',(e)=>{
  keys[e.keyCode] = false
})

function keyFunction(){
  if(keys[87]){
    // w
    // log("w")
    // option.series[0].data[0][1] +=vw
  }else if(keys[83]){
    //s 
    // log('s')
    // option.series[0].data[0][1] -=vw
  }else if(keys[65]){
    //a 
    log('a')
    status = 'walk'
    x =  option.series[0].data[0][0]
    option.series[0].data[0][0] -=vw
  }else if(keys[68]){
    //d 
    log('d')
    status = 'walk'
    x =  option.series[0].data[0][0]
    option.series[0].data[0][0] +=vw
   }
   else if(keys[32]&&status != 'jump_up'){
    
    //d 
    log('空格')
    if(option.series[0].data[0][1]>=60){
      status = 'jump_up'
      y =  option.series[0].data[0][1]
    }else{
      option.series[0].data[0][1] +=vw
    }
   
   }
   if(keys[87]||keys[83]||keys[65]||keys[68]){
    log(`当前坐标:{x:${option.series[0].data[0][0]},y:${option.series[0].data[0][1]}}`)
   }
}


function main(){
  setInterval(async ()=>{
    
     keyFunction()
     if(status=='jump_up'){
       console.log(1)
      if(y <= option.series[0].data[0][1]){
        status = 'jump_down'
      }else{
        // 重力下降
        option.series[0].data[0][1] -=vw/2
      }
     }
     myChart.setOption(option);
  },1000/60)
}
main()

option && myChart.setOption(option);
