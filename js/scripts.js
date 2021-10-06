// More Channnels Trigger
let intrests=["JavaScript",
"Computer Science",
"Website",
"Nouman Ali Khan",
"Podcasts",
"Electrical Engineering",
"Motivation",
"Conversation",
"Cricket",
"Graphic design",
"Cryptocurrency",
"Superhero movies",
"Public speaking"
];

let keys=[
    'AIzaSyDpVt3_o7yplumFGVg9-O_INkvTNDlTW7A',
    'AIzaSyCMnIcKuPnqrgpg5wizy_YyFIzYKt62gkk'
];

let key=keys[0];

let inrestsSection=document.getElementById("intrest-section");

intrests.forEach(function(item){
    var a=document.createElement('a');
    var text=document.createTextNode(item);
    a.href="javascript:void(0);";
    a.appendChild(text);
    inrestsSection.appendChild(a);
});

let inputSearch=document.getElementById('inputSearch');
let searchBtn=document.getElementById('searchTrigger');

searchTrigger.addEventListener('click',function(e){
    e.preventDefault();
    let searchTerm=inputSearch.value;
    if(searchTerm!=''){
        videos.innerHTML='';
        fetch("https://www.googleapis.com/youtube/v3/search?"+new URLSearchParams({
            key:key,
            part:'snippet',
            q:searchTerm,
            maxResults:60
        }))
        .then(res=>res.json())
        .then(results=>{
            results.items.forEach(item=>{
                searchChannelIcon(item);
            });
        });
    }

})

let navToggle=document.querySelector('.nav-toggle');
let sidebar=document.querySelector('sidebar');
let main=document.querySelector('main');
navToggle.addEventListener('click',function(){
    sidebar.classList.toggle('small');
    main.classList.toggle('large');
});


let showMore=document.getElementById('more-channel-trigger');
let showLess=document.getElementById('less-channel-trigger');
let moreChannelLi=document.querySelector('.more-channel-li');
let lessChannelLi=document.querySelector('.less-channel-li');
let moreChannels=document.querySelectorAll('.more-channels');

showMore.addEventListener("click",function(){
    moreChannels.forEach(function(channel){
        channel.style.display="block";
    });
    moreChannelLi.style.display="none";
});

showLess.addEventListener('click',function(){
    moreChannels.forEach(function(channel){
        channel.style.display="none";
    });
    moreChannelLi.style.display="block";
});


let videos=document.getElementById('videos');

fetch("https://www.googleapis.com/youtube/v3/videos?"+new URLSearchParams({
    key:key,
    part:'id,statistics,snippet',
    chart:'mostPopular',
    regionCode:'IN',
    maxResults:60
}))
  .then(res=>res.json())
  .then(results=>{
    results.items.forEach(item=>{
        channelIcon(item);
    });
});

const videoCard=(item)=>{
    videos.innerHTML+=`<section class="video">
    <a href="https://www.youtube.com/watch?v=${item.id}"><img src="${item.snippet.thumbnails.standard.url}" alt="" class="thumbnail"></a>
    <div class="video-info">
    <a href="https://www.youtube.com/channel/${item.snippet.channelId}"><img src="${item.channelIconUrl}" alt="" class="channel-icon"></a>
        <div class="video-meta">
            <p class="title"><a href="https://www.youtube.com/watch?v=${item.id}">${item.snippet.title}</a></p>
            <p class="channel-name"><a href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a></p>
            <!--<p class="other-info"><span class="views"> views</span><i class="seprator">•</i><span class="times">2 hours ago</span></p> -->
        </div>
    </div>
    </section>`;
}

const videoCardSearch=(item)=>{
    videos.innerHTML+=`<section class="video">
    <a href="https://www.youtube.com/watch?v=${item.id}"><img src="${item.snippet.thumbnails.high.url}" alt="" class="thumbnail"></a>
    <div class="video-info">
    <a href="https://www.youtube.com/channel/${item.snippet.channelId}"><img src="${item.channelIconUrl}" alt="" class="channel-icon"></a>
        <div class="video-meta">
            <p class="title"><a href="https://www.youtube.com/watch?v=${item.id}">${item.snippet.title}</a></p>
            <p class="channel-name"><a href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a></p>
            <!--<p class="other-info"><span class="views"> views</span><i class="seprator">•</i><span class="times">2 hours ago</span></p> -->
        </div>
    </div>
    </section>`;
}

const channelIcon=(videoData)=>{
    fetch("https://www.googleapis.com/youtube/v3/channels?"+new URLSearchParams({
    key:key,
    id:videoData.snippet.channelId,
    part:'snippet'
}))
   .then(res=>res.json())
  .then(result=>  {
    videoData.channelIconUrl=result.items[0].snippet.thumbnails.default.url;
    videoCard(videoData);
  }
    );
}

const searchChannelIcon=(videoData)=>{
    fetch("https://www.googleapis.com/youtube/v3/channels?"+new URLSearchParams({
    key:key,
    id:videoData.snippet.channelId,
    part:'snippet'
}))
   .then(res=>res.json())
  .then(result=>  {
    videoData.channelIconUrl=result.items[0].snippet.thumbnails.default.url;
    videoCardSearch(videoData);
  }
    );
}


if(window.innerWidth > 800 && window.innerWidth < 1325){
    sidebar.classList.add('small');
    main.classList.add('large');
}
