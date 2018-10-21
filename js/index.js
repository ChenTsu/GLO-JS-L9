'use strict';

document.addEventListener('DOMContentLoaded', ()=>{

  let infoHeader  = document.body.getElementsByClassName('info-header')[0],
      headers     = document.body.getElementsByClassName('info-header-tab'),
      tabs        = document.body.getElementsByClassName('info-tabcontent');
  
  // выключаем все табы кроме нулевого
  for (let j=0; j<headers.length; j++){
    if (j>0){ // тутможно изменить номер таба который оставить видимым
      tabs[j].classList.add('hide');
      tabs[j].classList.remove('show');
    }
  }
  
  infoHeader.addEventListener('click', evt => { // клик на область заголовков
    if (evt.target.classList.contains('info-header-tab')){ // клик попал по одному из заголовков
      for (let j = 0; j < headers.length; j++) { // проверяем все заголовки
        if (headers[j] === evt.target){ // если это тот по которому ткнули - показываем его таб
          tabs[j].classList.add('show');
          tabs[j].classList.remove('hide');
        } else {  // остальные скрываем
          tabs[j].classList.add('hide');
          tabs[j].classList.remove('show');
        }
      }
    }
  });
  
  /////////////////  countdown timer  ///////////////////////
  const DEADLINE = '2019-10-22'.split('-'),
        COUNT_FROM_PAST = false; // true - считаем сколько прошло времени если DEADLINE уже прошла ;
  
  function getTimeRemaining(endMoment) {
    // через числовое объявление new Date() создаёт дату в том же часовом поясе что и Date.now(), в отличии от Date.parse
    let tmp = new Date(endMoment[0], endMoment[1]-1, endMoment[2]) - Date.now();
  
    if ( COUNT_FROM_PAST && (tmp < 0) ){
      tmp = Math.abs(tmp);
    }
    
    if (tmp<0){
      tmp = 0;
    }
    
    let moments = {
      'totalMs':      tmp.toString(),
      'totalSeconds': Math.floor((tmp / 1000)).toString(),
      'seconds':      Math.floor((tmp / 1000) % 60).toString(),
      'totalMinutes': Math.floor((tmp / 1000 / 60)).toString(),
      'minutes':      Math.floor((tmp / 1000 / 60) % 60).toString(),
      'totalHours':   Math.floor((tmp / 1000 / 60 / 60) ).toString(),
      'hours':        Math.floor((tmp / 1000 / 60 / 60) % 24).toString(),
      'totalDays':    Math.floor((tmp / 1000 / 60 / 60 / 24)).toString(),
      'days':         Math.floor((tmp / 1000 / 60 / 60 / 24) % 30.416).toString(),
      'totalMonths':  Math.floor((tmp / 1000 / 60 / 60 / 24 / 30.416) ).toString(),
      'months':       Math.floor((tmp / 1000 / 60 / 60 / 24 / 30.416) % 12).toString(),
      'years':        Math.floor((tmp/1000/60/60/24)/365 ).toString()
    };
    
    
    for (let k in moments){
      if (moments[k].length === 1){
        moments[k] =  '0' + moments[k];
      }
    }
    
    return moments;
  }
  // console.log(getTimeRemaining(DEADLINE));
  
  // мы не знаем разметку, пусть при подключении заботятся о выборке нужного DOM-элемента
  let timer = document.getElementById('timer');
  
  function setClock(node, endTime) {
    let seconds      = node.getElementsByClassName('seconds')[0],
        minutes      = node.getElementsByClassName('minutes')[0],
        hours        = node.getElementsByClassName('hours')[0];
        // days         = node.getElementsByClassName('days')[0],
        // months       = node.getElementsByClassName('months')[0],
        // years        = node.getElementsByClassName('years')[0],
        // milliseconds = node.getElementsByClassName('milliseconds')[0];
    
    let timerInterval = setInterval(updateClock, 1000);
    
    function updateClock() {
      let remains = getTimeRemaining(endTime);
      
      // milliseconds.textContent = remains.totalMs;
      seconds.textContent      = remains.seconds;
      minutes.textContent      = remains.minutes;
      hours.textContent        = remains.hours;
      // days.textContent         = remains.days;
      // months.textContent       = remains.months;
      // years.textContent        = remains.years;
      
      if (remains.totalMs <= 0){
        clearInterval(timerInterval);
      }
    }
  }
  
  setClock(timer, DEADLINE)
  
  
  /////////////////  modal popup  ///////////////////////
  let more            = document.body.getElementsByClassName('more')[0],
      overlay         = document.body.getElementsByClassName('overlay')[0],
      close           = document.body.getElementsByClassName('popup-close')[0],
      descriptionBtns = document.body.getElementsByClassName('description-btn');
  
  function showModalPopup (){
    overlay.style.display = 'block';
    more.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  }
  
  more.addEventListener('click', showModalPopup);
  
  for (let i=0; i<descriptionBtns.length; i++){
    descriptionBtns[i].addEventListener('click', showModalPopup);
  }
  
  close.addEventListener('click', evt => {
    overlay.style.display = 'none';
    more.classList.remove('more-spalsh');
    document.body.style.overflow = '';
  })
  
});