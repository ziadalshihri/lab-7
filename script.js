let btnxhr=document.getElementById("searchbtn")
let btnfetch=document.getElementById("searchbtnfetch")
let btnasync=document.getElementById("searchbtnasync")
let input = document.getElementsByTagName("input")[0]
let pics= document.getElementById("images")
const apikey = "inYjd7Y4WC3Q1s7zgv5bKJJk13pmLnnS";

btnxhr.addEventListener("click",function (){
   let q = input.value
   getImagesUsingXHR(q)

})


btnfetch.addEventListener("click",function(){
let q =input.value
getImagesUsingFetch(q)


})
btnasync.addEventListener("click",function(){
    let q =input.value
    getImagesUsingasync(q)
    



})

function getImagesUsingXHR(q){

    let images = [];
    //send a http get using api
    let xhr = new XMLHttpRequest();
    let url = "https://api.giphy.com/v1/gifs/search?api_key="+apikey+"&q="+q;
    
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState=== 4 && xhr.status ===200){
    let respText = xhr.responseText;
    let respOBJ = JSON.parse(respText)
    
    
    for(let item of respOBJ.data){
        images.push(item.images.downsized_medium.url)
    }
    generateImgElements(images)

}
    }
    
    
    xhr.open("GET",url,true)
    xhr.send();

}
async function  getImagesUsingasync(q){
    images=[];
    let url = "https://api.giphy.com/v1/gifs/search?api_key="+apikey+"&q="+q;
    let response = await  fetch(url)
    let responseOBJ = await response.json()

    for(let item of responseOBJ.data){
        images.push(item.images.downsized_medium.url)
    }
    generateImgElements(images)

}

//fetch with promises
function getImagesUsingFetch(q){
   
   images=[];
    let url = "https://api.giphy.com/v1/gifs/search?api_key="+apikey+"&q="+q;


    fetch(url)
    .then((response)=>{
      return  response.json();
    })
    .then((respOBJ)=>{
        for(let item of respOBJ.data){
            images.push(item.images.downsized_medium.url)
        }
        generateImgElements(images)


    })
    .catch((e)=>{
        console.log("error",e)
    })
}


function generateImgElements(imageURLS){
   for(let imageUrl of imageURLS){
        let imgElement = document.createElement("img")
        imgElement.src=imageUrl
        pics.appendChild(imgElement)
}}

