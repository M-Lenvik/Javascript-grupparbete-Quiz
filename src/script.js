
//------------------------------------
//------------------------------------
//-----------------TIMER--------------
//----------Funkar bara inte i ts-----
//------------------------------------

const timer = document.querySelector('#timer'); 


//ALTERNATIV 1
function settime(){ //gjorde den till en funktion så det går att återställa
    let timestart = Math.floor(Date.now() / 1000); //sätter nuvarande tid i sekunder
    window.start = timestart; //gör variablen global så att man kan använda den i nästa funktion
}
settime(); //återkalla den här när du vill ställa om timern till 0


function starttimer(){ 
    let now = Math.floor(Date.now() / 1000); //kollar och sätter nuvarande tid
    let timediff = now - start; //kollar på skillnaden mellan start tid och nuvarande tid
    let _min = Math.floor(timediff / 60); //sätter in min och sec, om secunden når 60 återställs den till grunden och lägger in en 1'a i min
    let _sec = Math.floor(timediff % 60);
    
    
    
    if (_sec < 10) {        //Lägger till en 0'a framför min och sec innan den blir tio-tal
        _sec = "0" + _sec;
    }
    if (_min < 10) {
        _min = "0" + _min;
    }
    

    
    timer.innerHTML =` min:${_min} sec:${_sec}`;
    if (_min == 1 && _sec == 20){ //sätt if satsen till om man är klar med quizzen så stannar den då. just nu är den laggd på att stanna efter 1 min 20 sec
        console.log(_min, _sec);
        return;
    }
    var t = setTimeout(starttimer, 500); //timeout för att updatera funktionen så den fortsätter räkna

}

starttimer(); //kalla på den här när du vill att timern ska starta, glöm inte att kalla på settime först så att timen startar på 0



/* //ALTERNATIV 2
let second = 0;
let minute = 0;


starttimer()
function starttimer(){
  second++;
  minute = Math.floor(second / 60);
  second = Math.floor(second % 60);
  timer.innerHTML =` min:${minute} sec:${second}`;
  setTimeout( starttimer, 1000);
}
*/