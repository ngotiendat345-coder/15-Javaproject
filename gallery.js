const li_callModal=document.querySelectorAll('.latestNews-list li a');
const modal=document.querySelector('.modal');

li_callModal.forEach(li => {
        li.addEventListener('click',(e)=>{
            let target_id=li.getAttribute('href').split('#');
            let target=document.getElementById(target_id[1]);
            let children=target.firstElementChild;
            children.classList.add('show-modal');    
        });
});
modal.addEventListener('click',(e)=>{
    if(e.target.classList.contains('show-modal')||e.target.classList.contains('fa-times')){
        let children=modal.firstElementChild;
        children.classList.remove('show-modal');
    }
});

let links_img=[...document.querySelectorAll('.gellary-content a')];

let list_src=links_img.map((link)=>{
    return link.getAttribute('href');
})

links_img.forEach((link,index)=>{
    link.addEventListener('click',function(e){
        e.preventDefault();
        let newDiv=document.createElement('div');
        newDiv.innerHTML=`<div class="cards-images" data-start="${index}">
                    <div class="card">
                        <img src="${link.getAttribute('href')}" alt="">
                        <p>Donec sapien massa, placerat ac sodales ac, feugiat quis est</p>
                    </div>
                    <button type="button" class="btn-left">
                        <i class="fas fa-caret-left"></i>
                    </button>
                    <button type="button" class="btn-right">
                        <i class="fas fa-caret-right"></i>
                    </button>
                    <button type="button" class="btn-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>`
        let body=document.querySelector('body');
        body.appendChild(newDiv);
        let btn_left=newDiv.querySelector('.btn-left');
        btn_left.addEventListener('click',previousImages);
        let btn_right=newDiv.querySelector('.btn-right');
        btn_right.addEventListener('click',nextImages);

        let card_images=document.querySelector('.cards-images');
        card_images.addEventListener('mousedown',closeLink);

        let _img=document.querySelector('.card');
        _img.addEventListener('animationend',removeAnimation);
    })
});

function closeLink(e){
    console.log(e.target);
    let card_images=document.querySelector('.cards-images');
    let target=e.target;
    if(target.classList.contains('cards-images')||target.classList.contains('btn-close')){
        card_images.parentElement.remove();
    }
}
let start=0;
let count=0;
function nextImages(e){
    let index=e.target.parentElement.dataset.start;
    if(count=0){
        start=index;
    }
    start++;
    let img=document.querySelector('.card img');
    img.parentElement.classList.add('moving');
    if(start>list_src.length-1){
        start=0;
        console.log(list_src[start]);
        img.src=list_src[start];
    }
    img.src=list_src[start];
    
}

let countPre=0;
function previousImages(e){
    let index=e.target.parentElement.dataset.start;
    if(countPre=0){
        start=index;
    }
    let img=document.querySelector('.card img');
    img.parentElement.classList.add('moving');
    start--;
    
    if(start<0){
        start=list_src.length-1;
    }
    img.src=list_src[start];
}

function removeAnimation(e){
    console.log(e.target);
    e.target.classList.remove('moving');
}

let toTop=document.querySelector('.toTOP');
//const overview=document.querySelector('.overview');
window.addEventListener('scroll',function(e){
    const innerHeight=window.innerHeight;
    if(window.pageYOffset>200){
        toTop.classList.add('hide-toTop');
    }
    else{
        toTop.classList.remove('hide-toTop');
    }
}
);

toTop.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(e.target);
    let target_id=e.target.getAttribute('href').split('#');
    let target=document.getElementById(target_id[1]);
    let position=target.getBoundingClientRect().top;
    window.scrollBy(0, position); 
})

const shortCodes=document.querySelector('.li_short-codes a');
const childLi=document.querySelector('.childLi');

shortCodes.addEventListener('click',function(){
    childLi.classList.toggle('showLi');
})