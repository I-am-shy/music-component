
let searchSing = document.getElementById("searchSing");
let bt = document.getElementById("bt");
let WY_url = "https://www.hhlqilongzhu.cn/api/dg_wyymusic.php?type=json&num=60";
let QQ_url = "https://www.hhlqilongzhu.cn/api/dg_qqmusic.php?type=json&num=60";
let gm ;// 搜索关键字
let n ; // 歌曲的列表序号

bt.onclick = ()=>{
    console.log(searchSing.value);
    if(!searchSing.value){// 空输入
        let list = document.getElementById("list");
        if(list){// 已经有列表
            while(list.children[0]){
                list.children[0].remove();// 删除搜索的旧表
            }
        }
    }else{
        let url = WY_url;
        gm = searchSing.value;
        getSingList(url+`&gm=${gm}`);
    }
}
// 请求歌曲列表
async function getSingList(url){
    let response = await fetch(url,{"method":"get"});
    let list = document.getElementById("list");
    if(list){// 已经有列表
        while(list.children[0]){
            list.children[0].remove();// 删除搜索的旧表
        }
    }
    if(response.ok){
        let data = await response.json();// 获取的歌曲列表信息---对象
        console.log(data);
        let singList = data.data;// 拿到主要信息---数组
        // 将列表渲染到页面
        for(let i = 0;i<singList.length;i++){
            let item = document.createElement("div");
            item.classList.add("item");
            let title = document.createElement("span");
            title.classList.add("title");
            let singer = document.createElement("span");
            singer.classList.add("singer");
            title.innerText = singList[i].title;
            singer.innerText = singList[i].singer;
            item.appendChild(title);
            item.appendChild(singer);
            list.appendChild(item);
            item.onclick = ()=>{
                n=singList[i].n;
                getSing(url+`&gm=${gm}&n=${n}`); 
            }
        }
    }else{
        console.log("请求失败");
    }
}

// 获取歌曲和对应的信息
async function getSing(url){
    let response = await fetch(url,{"method":"get"});
    if(response.ok){
        let data = await response.json(); // 获取歌曲的数据
        // console.log(data);

        // 渲染到页面
        let singImg = document.getElementById("singImg");
        let singer = document.getElementById("singer");
        let singName = document.getElementById("singName");
        let audio = document.getElementById("audio");
        
        singImg.src = data.cover;
        singer.innerText = data.singer;
        singName.innerText = data.title;
        audio.src = data.music_url;
        
    }else{
        console.log("请求失败");
    }
}
