const cardEl = [];
const img = ['itachi','kakashi','naruto','sasuke'];

for(let i=1;i<=8;i++){
    let el = document.createElement('div');
    el.classList.add('card');
    el.innerHTML = `<img class = "img" src='images/${img[i%4]}.png' width=100>`;
    el.style.overflow = 'hidden';
    el.children[0].classList.add('hide');
    cardEl.push(el);
}

cardEl.sort(()=>{
    return Math.random() - 0.5;
});

for(let card of cardEl){
    document.querySelector(".cards").appendChild(card);
}


let firstCardFlipped = null;
let secondCardFlipped = null;

function checkWin(){
    for(let card of cardEl){
        if(card.children[0].classList.contains('hide')){
            return false; 
        }   
    }
    return true;
}

for(let card of cardEl){

    card.addEventListener('click',async()=>{
        if(firstCardFlipped == null && secondCardFlipped == null){
            card.children[0].classList.remove('hide');
            firstCardFlipped = card;
        }
        else if(firstCardFlipped && secondCardFlipped==null){
            card.children[0].classList.remove('hide');
            secondCardFlipped = card;
            if(firstCardFlipped.children[0].src !== secondCardFlipped.children[0].src){

                await new Promise((r)=> setTimeout(r, 1000));
                firstCardFlipped.children[0].classList.add('hide');
                secondCardFlipped.children[0].classList.add('hide');
                firstCardFlipped = null;
                secondCardFlipped = null;
            }
            else{
                if(checkWin()){
                    document.querySelector(".win-screen").innerText = "YOU WON!";
                    await new Promise((r)=>setTimeout(r,4000));
                    document.location.href = 'index.html';
                }
                else{
                    firstCardFlipped = null;
                    secondCardFlipped = null;
                }
            }
        }
    });
}

