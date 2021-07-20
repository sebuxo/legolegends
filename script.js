const btn = document.getElementById("Btn1")
const nme =document.getElementById("name")
const tit =document.getElementById("title")
const stat =document.getElementById("stats")
const imgz=document.getElementById("champimg")
let champidX;
let arrayX =[]
let arrayrand=[]
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
    console.log(f===y || f===x || f===y)
k.push(x,y,z,f)
    return k
}

document.addEventListener("DOMContentLoaded",async()=>{
    let data = await load();
    let array1 = Object.values((data))
    btn.addEventListener("click", async ()=>{   
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
        console.log(k)
        nme.innerHTML=(Object.values(arrayX[3])[0].name)
        tit.innerHTML=(Object.values(arrayX[3])[0].title)
        stat.children.item(k[0]).innerHTML=`${arrayT[3]}`
        stat.children.item(k[1]).innerHTML=`${arrayT[0]}`
        stat.children.item(k[2]).innerHTML=`${arrayT[1]}`
        stat.children.item(k[3]).innerHTML=`${arrayT[2]}` 
        imgz.src=(`http://ddragon.leagueoflegends.com/cdn/11.14.1/img/champion/${Object.values(arrayX[3])[0].id}.png`);
    
})
})

document.body.addEventListener("click",(e)=>{
if(e.target!=stat.children.item(0) && e.target !=stat.children.item(1) && e.target!=stat.children.item(2) && e.target!=stat.children.item(3)) return null
for(var i=0;i<4;i++){
    Object.values(arrayX[3])[0].spells[i].name=Object.values(arrayX[3])[0].spells[i].name.split('/')[0]
}
    for(var i=0;i<4;i++){
if(e.target.innerHTML===stat.children.item(0).innerHTML && stat.children.item(0).innerHTML === Object.values(arrayX[3])[0].spells[i].name){
       alert("true")
       kap=1;
}
}
for(var i=0;i<4;i++){
if(e.target.innerHTML===stat.children.item(1).innerHTML && stat.children.item(1).innerHTML === Object.values(arrayX[3])[0].spells[i].name){
    alert("true")
    kap=1;
}
}
for(var i=0;i<4;i++){
if(e.target.innerHTML===stat.children.item(2).innerHTML && stat.children.item(2).innerHTML === Object.values(arrayX[3])[0].spells[i].name){
    alert("true")
    kap=1;
}
}
for(var i=0;i<4;i++){
 if(e.target.innerHTML===stat.children.item(3).innerHTML && stat.children.item(3).innerHTML === Object.values(arrayX[3])[0].spells[i].name){
    alert("true")
    kap=1;
} 
}
if(kap!=1){
    alert(false)
}else{
    kap=0;
}

btn.click()
})

