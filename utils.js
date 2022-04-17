export const log = function(v){console.log(v)}

export const sleep = function(timer=100){
  return new Promise((resolve,reject)=>{setTimeout(()=>{resolve()},timer)})
}