
let music = document.getElementsByClassName("music")[0];
let icon = document.getElementsByClassName("icon")[0];
let border = document.getElementsByClassName("border")[0];
let show = false;//默认不可见

icon.onclick = () => {
    if (show) {
        border.style.display = "none";
        show = false;
         // 控制在屏幕内
        if(music.offsetLeft<0){
            music.style.left = 0+"px";
        }
        if(music.offsetLeft+music.clientWidth>=window.innerWidth ){ // 右边极限距离
            music.style.left = (window.innerWidth - music.clientWidth)+"px";
        }
        if(music.offsetTop<0){
            music.style.top = 0+"px";
        }
        if(music.offsetTop + music.clientHeight >= window.innerHeight ){
            music.style.top = (window.innerHeight - music.clientHeight)+"px";
        }
    }else{
        border.style.display = "flex";
        show = true;
         // 控制在屏幕内
        if(music.offsetLeft<0){
            music.style.left = 0+"px";
        }
        if(music.offsetLeft+music.clientWidth>=window.innerWidth){ // 右边极限距离
            music.style.left = (window.innerWidth - music.clientWidth)+"px";
        }
        if(music.offsetTop<0){
            music.style.top = 0+"px";
        }
        if(music.offsetTop + music.clientHeight >= window.innerHeight ){
            music.style.top = (window.innerHeight - music.clientHeight)+"px";
        }
    }
}    
icon.addEventListener("drag",(e)=>{
    // e.preventDefault();//阻止默认行为
    music.style.top = (e.y - icon.clientHeight)+"px";
    music.style.left = (e.x - music.clientWidth/2)+"px";
});
icon.addEventListener("dragend",(e)=>{
    music.style.top = (e.y - icon.clientHeight)+"px";
    music.style.left = (e.x - music.clientWidth/2)+"px";
    // 控制在屏幕内
    if(music.offsetLeft<0 && show){// 左边极限距离
        music.style.left = 0+"px";
    }
    if(music.offsetLeft+music.clientWidth>=window.innerWidth && show){ // 右边极限距离
        music.style.left = (window.innerWidth - music.clientWidth)+"px";
    }
    if(music.offsetTop<0){
        music.style.top = 0+"px";
    }
    if(music.offsetTop + music.clientHeight >= window.innerHeight && show){
        music.style.top = (window.innerHeight - music.clientHeight)+"px";
    }
});
icon.addEventListener("dragover",(e)=>{
    e.preventDefault();//阻止默认行为
    // e.dataTransfer.dropEffect = 'all';//仅能在 dragover 事件中设置该属性值，其他事件中设置均无效
})
