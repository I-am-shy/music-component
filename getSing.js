const input = document.getElementById("singName");
const bt = document.getElementById("bt");
let url = "https://www.hhlqilongzhu.cn/api/dg_wyymusic.php?type=json&num=60";
let gm ;// 搜索关键字
let n ; // 歌曲的列表序号

bt.onclick = ()=>{
    console.log(input.value);
    if(!input.value){// 空输入
        alert("请输入正确的信息!");
    }else{
        gm = input.value;
        getSingList(url+`&gm=${gm}`);
    }
}


// 请求歌曲列表
async function getSingList(url){
    let response = await fetch(url,{"method":"get"});
    let oldList = document.getElementById("list");
    if(oldList){// 已经有列表
        list.remove();// 删除搜索的旧表
    }
    if(response.ok){
        let data = await response.json();// 获取的歌曲列表信息---对象
        console.log(data);
        let singList = data.data;// 拿到主要信息---数组
        // 将列表渲染到页面
        let list = document.createElement("div");
        list.id = "list";
        document.body.appendChild(list);
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
                // window.location.href = "./player.html?gm="+gm+"&n="+singList[i].n;// 跳转页面并传递参数,原窗口
                window.open("./player.html?gm="+gm+"&n="+singList[i].n);// 跳转页面并传递参数，新窗口
            }
        }
    }else{
        console.log("请求失败");
    }
}
