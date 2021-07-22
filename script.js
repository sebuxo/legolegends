import $ from "jquery"

const btn = document.getElementById("Btn1")
const nme =document.getElementById("name")
const tit =document.getElementById("title")
const stat =document.getElementById("stats")
const imgz=document.getElementById("champimg")
let score=0;
let highscore=localStorage.getItem("Highscore") || 0;
let noclick=true;

let champidX;
let arrayX =[]
let arrayrand=[]
let kap=0;
let bdllon=5;
async function load(){
    const response = await fetch("http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json")
    const data = await response.json();
    return data;
}
async function load2(champid){
    let data1 = await load();
    let array1= Object.values(data1);
    const resp = await fetch(`http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion/${Object.values(array1[3])[champid].id}.json`)
    const dataz = await resp.json();
    return dataz
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function randomness(){
    let k=[]
    do{
        var x = getRandomInt(0,4)
        var y = getRandomInt(0,4)
        var z = getRandomInt(0,4)
        var f = getRandomInt(0,4)
    }while(x===y || x===z || y===z || f===y || f===x || f===z)
k.push(x,y,z,f)
    return k
}

document.addEventListener("DOMContentLoaded",async()=>{

    $('ul#stats').hide()
    $('#Score').html(score)
    $('#Hs').html(highscore)
    let data = await load();
    let array1 = Object.values((data))
    btn.addEventListener("click", async ()=>{   
        $('#Score').html(score)
        $('#Hs').html(highscore)
        let arrayT=[];
        let data1 = await load();   
        let array1= Object.values(data1);
        champidX=getRandomInt(0,Object.values(array1[3]).length)
        let dataX = await load2(champidX);
        arrayX= Object.values(dataX);
        let champid=champidX
        for(var i=0;i<4;i++){
        let data = await load2(champid);
        let array2= Object.values(data);
        arrayrand=randomness();
        arrayT.push(Object.values(array2[3])[0].spells[arrayrand[i]].name);
        champid=getRandomInt(0,Object.values(array1[3]).length)
        arrayT[i]=arrayT[i].split('/')[0]
        }
        let k=randomness();
        nme.innerHTML=(Object.values(arrayX[3])[0].name)
        tit.innerHTML=(Object.values(arrayX[3])[0].title)
        for(i=0;i<4;i++){
            stat.children.item(k[i]).innerHTML=`${arrayT[i]}`
        }

        imgz.src=(`http://ddragon.leagueoflegends.com/cdn/11.14.1/img/champion/${Object.values(arrayX[3])[0].id}.png`);
        $('ul#stats').show()
    
})
})
function end(){
    $('.answer').css({'background-color':'cyan'})
    $('.answer').css({color:'black'})
    kap=0;
    btn.click()
    noclick=true;

}
function Correct(i){
    noclick=false;
    console.log("answer numb"+i)
    $('.answer').css({'background-color':'red'})
    $(`#answer${i}`).css({'background-color':'green'})
    score++;
    if(score>highscore){
        highscore=score;
        localStorage.setItem("Highscore",highscore)
    }
    kap=1;
    bdllon=5;
}
function compare(x,y){
    let testtrue=0;
    for(var i=0;i<4;i++){
    if(x===y && y === Object.values(arrayX[3])[0].spells[i].name && noclick){
        testtrue=1;
    }
}
if(testtrue===1) return true
return false
}

function Wrong(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
    if(stat.children.item(i).innerHTML===Object.values(arrayX[3])[0].spells[j].name){
        $(`#answer${i}`).css({'background-color':'green'})
        bdllon=i;

    }else{
        $(`#answer${i}`).css({'background-color':'red'})
    }
}
}
return bdllon;
}

document.body.addEventListener("click",(e)=>{
if((e.target!=stat.children.item(0) && e.target !=stat.children.item(1) && e.target!=stat.children.item(2) && e.target!=stat.children.item(3)  ) || !noclick) return null

for(var i=0;i<4;i++){
    Object.values(arrayX[3])[0].spells[i].name=Object.values(arrayX[3])[0].spells[i].name.split('/')[0]
}

for(i=0;i<4;i++){
if(compare(e.target.innerHTML,stat.children.item(i).innerHTML)){
    Correct(i);
}
}

if(Wrong()!=5){
    $(`#answer${Wrong()}`).css({'background-color':'green'})
 }

setTimeout(()=>end(),1000)  
})




document.addEventListener("keyup",(e)=>{
    if(e.code != "Digit1" && e.code != "Digit2" && e.code != "Digit3" && e.code != "Digit4") return null
    for(var i=0;i<4;i++){
    if(e.code===`Digit${i+1}`){
       if(compare($(`#answer${i}`).html(),stat.children.item(i).innerHTML)){
           Correct(i);
       }
}   
     }   
console.log(kap!=1)
if(kap!=1){
     if(Wrong()!=5){
         score=0;
        $(`#answer${Wrong()}`).css({'background-color':'green'})
     }
    }
     setTimeout(()=>end(),1000) 

}

)
 
