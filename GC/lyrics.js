// 思路
// 1.分离标题，和歌词主体
// 2.分离[]中的时间和歌词部分

let lyric =`[ti:轨迹]
[ar:周杰伦]
[al:寻找周杰伦EP]
[by:]
[offset:0]
[00:00.00]轨迹 - 周杰伦 (Jay Chou)
[00:03.90]词：黄俊郎
[00:07.80]曲：周杰伦
[00:11.70]编曲：钟兴民
[00:15.61]制作人：周杰伦
[00:19.51]怎么隐藏我的悲伤失去你的地方
[00:32.08]你的发香散的匆忙我已经跟不上
[00:44.08]
[00:44.95]闭上眼睛还能看见你离去的痕迹
[00:56.83]
[00:57.58]在月光下一直找寻那想念的身影
[01:09.52]
[01:10.83]如果说分手是苦痛的起点
[01:16.34]那在终点之前我愿意再爱一遍
[01:23.46]想要对你说的不敢说的爱
[01:29.51]会不会有人可以明白
[01:35.74]我会发着呆然后忘记你
[01:42.19]接着紧紧闭上眼
[01:48.56]想着那一天会有人代替
[01:55.43]让我不再想念你
[02:00.81]
[02:01.38]我会发着呆然后微微笑
[02:07.79]接着紧紧闭上眼
[02:14.36]又想了一遍你温柔的脸
[02:20.98]在我忘记之前
[02:26.42]
[02:41.68]闭上眼睛还能看见你离去的痕迹
[02:53.25]
[02:54.15]在月光下一直找寻那想念的身影
[03:06.79]
[03:07.41]如果说分手是苦痛的起点
[03:12.78]那在终点之前我愿意再爱一遍
[03:20.03]想要对你说的不敢说的爱
[03:25.98]会不会有人可以明白
[03:32.31]我会发着呆然后忘记你
[03:38.75]接着紧紧闭上眼
[03:45.12]想着那一天会有人代替
[03:51.94]让我不再想念你
[03:57.13]
[04:01.95]我会发着呆然后忘记你
[04:08.42]接着紧紧闭上眼
[04:15.31]想着那一天会有人代替
[04:22.18]让我不再想念你
[04:28.20]我会发着呆然后微微笑
[04:34.53]接着紧紧闭上眼
[04:40.84]又想了一遍你温柔的脸
[04:47.08]
[04:47.78]在我忘记之前心里的眼泪
[04:56.97]模糊了视线你已快看不见`

// 处理歌词
const takeLrc = (lrc)=>{
  // 1.分离标题，和歌词主体
  let titleArr = lrc.split("[offset:0]");
  console.log(titleArr);
  
  let title = titleArr[0];// 标题
  let lrcMain = titleArr[1];

  // 2.分离[]中的时间和歌词部分
  const titleArray = title.match(/\[(.*?)\:(.*?)\]/g);// 正则式
  const titleObject = {};// 标题对象
  titleArray.forEach(item => {// 分离键值对，在放入对象
    let key = item.match(/\[(.*?)\:/)[1];
    let value = item.match(/\:(.*?)\]/)[1];
    titleObject[key] = value;
  });
  console.log(titleObject);

  
  // 匹配时间和文本的正则表达式
  const pattern =  /\[(\d{2}:\d{2}\.\d{2})\](.*)/g;
  // 匹配结果存储数组
  const matches = [...lrcMain.matchAll(pattern)];
  // 整理结果为对象数组
  const content = matches.map(match => ({ t: match[1], c: match[2].trim() }));
  // 输出结果
  console.log(matches,content);
  // 匹配时间和文本的正则表达式
  
  return {
    title: titleObject,
    content: content
  }
}

// 渲染歌词
const renderLrc = (title,lrcArr)=>{
  const top = document.createElement("div");
  const body = document.createElement("div");
  top.classList.add("top");
  body.classList.add("body");
  // for(let i in title){
  //   let p = document.createElement("p");
  //   p.innerText = `${title[i]}`;
  //   top.appendChild(p);
  // }
  top.innerHTML= `  <p>${title.ti}</p>
    <p>歌手:${title.ar}</p>
    <p>专辑:${title.al}</p>
  `;
  lrcArr.forEach(item => {
    let p = document.createElement("p");
    let span = document.createElement("span");
    p.classList.add('lrc');
    p.innerText = `${item.c}`;
    span.innerText = `${item.t}`;
    p.appendChild(span);
    body.appendChild(p);
    // 点击事件
    p.addEventListener('click',()=>{
      let playTime = timeToDecimal(item.t);
      // console.log(playTime);
      sing.currentTime = playTime;// 将歌词时间设置为当前播放时长
      range.style.setProperty("--p", `${range.value / range.max * 100}%`);// 改变进度条
    })
    if(item.c == ''){
      p.style.display = 'none';
    }
  })
  
  container.appendChild(top);
  container.appendChild(body);
}

//将字符串时间转成整数s
function timeToDecimal(time) {
  const [minutes, seconds] = time.split(':').map(parseFloat);
  return Math.floor(minutes * 60 + seconds);
}
// console.log(timeToDecimal('01:48.56'));

lrc =  takeLrc(lyric);
title = lrc.title;
lrcArr = lrc.content;
renderLrc(title,lrcArr);





