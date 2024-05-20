// 播放歌曲
let sing = document.getElementById("audio");
let play = document.getElementById("play");
let singTime = document.getElementById("singTime");
let range = document.getElementById("singRange");
let playing = false;//默认没有播放

range.value = 0;// 初始值为0
range.step = 1;

// 调整进度条
range.oninput = ()=>{
    // console.log(range.value/range.max);
    sing.currentTime = range.value;// 将进度条的值设置为当前播放时长
    singTime.innerText = timeToMinute(parseInt(sing.currentTime))+"/"+timeToMinute(parseInt(audio.duration));
    range.style.setProperty("--p",`${range.value/range.max*100}%`);// 改变进度条
}
sing.oncanplay = ()=>{// 歌曲能播放
    // duration属性要在歌曲能播放后才有值，否则为NaN
    // console.log(parseInt(audio.duration),timeToMinute(parseInt(audio.duration)));
    range.max = parseInt(audio.duration);// 将进度条绑定到歌曲时长
    singTime.innerText = timeToMinute(parseInt(sing.currentTime))+"/"+timeToMinute(parseInt(audio.duration));
    range.value = parseInt(sing.currentTime);
    range.style.setProperty("--p",`${range.value/range.max*100}%`);// 改变进度条
    if(playing){// 新歌曲载入后若原歌曲在播放，则新歌曲也播放
        playing = false;
        play.onclick();
    }
}

sing.ontimeupdate=()=>{// 当前播放时长变化
    if(!range.max){ 
        range.max = parseInt(audio.duration);// 将进度条绑定到歌曲时长
    }
    // console.log(parseInt(sing.currentTime),(range.value/range.max).toFixed(4)*100);//当前已经播放的时长
    singTime.innerText = timeToMinute(parseInt(sing.currentTime))+"/"+timeToMinute(parseInt(audio.duration));
    range.value = parseInt(sing.currentTime);
    range.style.setProperty("--p",`${range.value/range.max*100}%`);// 改变进度条
    if(range.value == range.max){// 歌曲播放完
        play.onclick();
        range.value = 0;
        singTime.innerText = timeToMinute(parseInt(sing.currentTime))+"/"+timeToMinute(parseInt(audio.duration));
        range.style.setProperty("--p",`${range.value/range.max*100}%`);// 改变进度条
    }
}

// 单机播放/暂停
play.onclick = ()=>{
    if(playing){
        sing.pause()
        playing = false;
        play.children[0].src = "meta/play.png";//更换按钮图片
        icon.classList.remove("animation");
    }else{
        sing.play();
        playing = true;
        play.children[0].src = "meta/out.png";
        icon.classList.add("animation");
    }
}

// 秒转换时分钟00:00:00时分秒格式：
function timeToMinute(times) {
    let t;
    if (times > -1) {
        let hour = Math.floor(times / 3600);
        let min = Math.floor(times / 60) % 60;
        let sec = times % 60;
        if (hour < 10) {
            t = '0' + hour + ":";
        } else {
            t = hour + ":";
        }

        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        if (sec < 10) {
            t += "0";
        }
        t += sec.toFixed(2);
    }
    t = t.substring(0 , t.length - 3);
    return t;
}

