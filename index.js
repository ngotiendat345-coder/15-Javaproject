const images=document.querySelectorAll('.carousel-images img');
const prev=document.querySelector('.prev');
const next=document.querySelector('.next');
const carousel_images=document.querySelector('.carousel-images');
const btn_icon=document.querySelectorAll('.btn-icon');
let index=0;
let width=images[0].offsetWidth;

next.addEventListener('click',()=>{
   _move('next');
})
prev.addEventListener('click',()=>{
  _move('prev');
})

_move=(type)=>{
    width=images[0].offsetWidth;
    switch(type){
        case 'prev':
            index--;
           
            if(index>=0){
            images.forEach((image)=>{
                image.style.transition=`all 0.5s linear`;
                image.style.transform=`translate(${-index*width}px)`;
             });
            }
            else{
                images.forEach((image)=>{
                   // image.style.transition=`none`;
                   image.style.transition=`all 0.3s linear`;
                    index=2;
                    image.style.transform=`translate(${-index*width}px)`;
                })
            }
            activeIcon(index);
        break;
        case 'next':
            index++;
            if(index<=images.length-1){
             images.forEach((image)=>{
                 image.style.transition=`all 0.5s linear`;
                 image.style.transform=`translate(${-index*width}px)`;
             })
            }
            else{
             images.forEach((image)=>{
                image.style.transition=`all 0.3s linear`;
                 index=0;
                 image.style.transform=`translate(${-index*width}px)`;
             })
            }
            activeIcon(index);
        break;
        case '0':
            images.forEach((image)=>{
                image.style.transition=`all 0.5s linear`;
                image.style.transform=`translate(${-0*width}px)`;
            });
            btn_icon[0].classList.add('active')
            break;
        case '1':
            images.forEach((image)=>{
                image.style.transition=`all 0.5s linear`;
                image.style.transform=`translate(${-width}px)`;
            });
          
            break;
        case '2':
            images.forEach((image)=>{
                image.style.transition=`all 0.5s linear`;
                image.style.transform=`translate(${-2*width}px)`;
            });
            break;
    }
}
function activeIcon(numberStr){
    btn_icon[numberStr].classList.add('active');
    btn_icon.forEach((item,index)=>{
        if(index!==numberStr){
            item.classList.remove('active');
        }
    })
}
btn_icon.forEach((btn)=>{
    btn.addEventListener('mouseover',function(e){
        let str=e.target.dataset.image;
        let number=str.split("-");;
        _move(number[1]);
        btn_icon.forEach((item)=>{
            if(item!==btn){
                item.classList.remove('active');
            }
        })
        btn.classList.add('active');
    })
})
const carousel=document.querySelector('.carousel');
const body=document.querySelector('body');
let autoCarousel=setInterval(()=>{
    _move('next')
},2000);

carousel.addEventListener('mouseover',function(e){
    clearInterval(autoCarousel);
    carousel.onmouseleave = function(){
        autoCarousel=setInterval(()=>{
            _move('next')
        },2000);
    }
 });

// di chuyen feedback 
const feedbacks=document.querySelectorAll('.feedBack-content_inf');
const fb_next=document.querySelector('.fb_next');
const fb_prev=document.querySelector('.fb_prev');

fb_prev.addEventListener('click',transitionPrevious);
fb_next.addEventListener('click',transitionNext);

feedbacks.forEach((feedback,index)=>{
    feedback.style.transform=`translateX(${index*100}%)`;
});
function transitionNext(){
    feedbacks.forEach((feedback,index)=>{
        feedback.style.transition=`all 0.5s linear`;
        feedback.style.transform=`translateX(${(index*100)-100}%)`;
    });
    fb_next.classList.add('btn-active');
    fb_prev.classList.remove('btn-active');
}

function transitionPrevious(){
    feedbacks.forEach((feedback,index)=>{
        feedback.style.transition=`all 0.5s linear`;
        feedback.style.transform=`translateX(${(index*100)}%)`;
    });
    fb_prev.classList.add('btn-active');
    fb_next.classList.remove('btn-active');
}
const feedbackContainer=document.querySelector('.feedBack-container');

feedbackContainer.addEventListener('mousedown',(e)=>{
    let currentX=e.clientX;
    feedbackContainer.style.cursor=`all-scroll`;
    feedbackContainer.onmouseup = function(e){
        let nextX=e.clientX;
        if((nextX-currentX)>0){
            transitionPrevious();
        }
        if((nextX-currentX)<0){
            transitionNext();
        }
        feedbackContainer.style.cursor=`pointer`;
    }
})
let _index=1;
function loopFeedback(){
    
    switch(_index){
        case 0:
            transitionNext();
            _index=1;
            break;
        case 1:
            transitionPrevious();
            _index=0;
            break;
    }

}
let _loop=setInterval(loopFeedback,2000);

// goi modal ra 

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

// hien thi totop
let toTop=document.querySelector('.toTOP');
const overview=document.querySelector('.overview');
let test=true;
window.addEventListener('scroll',function(e){
    const innerHeight=window.innerHeight;
    if(window.pageYOffset>200){
        toTop.classList.add('hide-toTop');
    }
    else{
        toTop.classList.remove('hide-toTop');
    }
    // tim vi tri de tang so
    let target=overview.getBoundingClientRect().top;
    //console.log(target);
    if(target<innerHeight && test){
        // tang so 
        test=false;
        
        const numbers=document.querySelectorAll('.item_inf h3');
        numbers.forEach((number)=>{
            
            let last=number.dataset.target;
            let speed=Math.floor(last/200);
            let start=0;
            counting=()=>{
                start+=speed;
                number.innerHTML=start;
                if(start>=last){
                    test=true;
                    clearInterval(deadLine);
                    number.innerHTML=last;
                }
            }
            let deadLine=setInterval(counting,10);
        })
    }

})

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