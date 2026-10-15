const planets = [
  {name:'Меркурий',className:'mercury',factor:0.38},
  {name:'Венера',className:'venus',factor:0.90},
  {name:'Земля',className:'earth',factor:1},
  {name:'Марс',className:'mars',factor:0.38},
  {name:'Юпитер',className:'jupiter',factor:2.53},
  {name:'Сатурн',className:'saturn',factor:1.07},
  {name:'Уран',className:'uranus',factor:0.89},
  {name:'Нептун',className:'neptune',factor:1.14}
];
const grid = document.querySelector('#planets');
const input = document.querySelector('#mass');
const error = document.querySelector('#error');
const format = value => value.toLocaleString('ru-RU',{minimumFractionDigits:1,maximumFractionDigits:1});
const planetFacts = [
  {type:'Каменистая планета',atmosphere:'Почти без атмосферы',fact:'Вместо воздушной оболочки — крайне разреженная экзосфера из частиц, выбитых с поверхности.',gravity:'Слабая гравитация и близость к Солнцу затрудняют удержание газов. Сопротивление при падении практически отсутствует.',slug:'mercury'},
  {type:'Каменистая планета',atmosphere:'Плотная оболочка из CO₂',fact:'Облака содержат серную кислоту. У поверхности давление примерно в 92 раза выше земного.',gravity:'Притяжение близко к земному. Высокое давление не означает сильную гравитацию: плотный газ заметно тормозит падающие тела.',slug:'venus'},
  {type:'Каменистая планета',atmosphere:'Азот и кислород',fact:'Около 78% атмосферы составляет азот и 21% — кислород. Воздушная оболочка помогает сохранять жидкую воду.',gravity:'Гравитация удерживает воздух у планеты, а сопротивление воздуха замедляет падение. Поэтому перо падает медленнее мяча.',slug:'earth'},
  {type:'Каменистая планета',atmosphere:'Разреженный CO₂',fact:'Атмосфера в основном состоит из углекислого газа. Давление у поверхности — меньше 1% земного.',gravity:'Притяжение — около 38% земного. Разреженный газ слабо тормозит падение, поэтому посадочным аппаратам недостаточно одних парашютов.',slug:'mars'},
  {type:'Газовый гигант',atmosphere:'Водород и гелий',fact:'Знакомые полосы — облачные пояса. Под ними газ постепенно переходит в более плотные слои; твёрдой поверхности нет.',gravity:'Большая масса создаёт сильное притяжение. При погружении растут плотность газа и сопротивление; модель прыжка использует условный уровень.',slug:'jupiter'},
  {type:'Газовый гигант',atmosphere:'Водород и гелий',fact:'Средняя плотность Сатурна меньше плотности воды. Его атмосфера скрывает глубокие слои без твёрдой поверхности.',gravity:'Огромный радиус ослабляет притяжение на внешнем уровне: оно близко к земному, хотя масса планеты намного больше.',slug:'saturn'},
  {type:'Ледяной гигант',atmosphere:'Водород, гелий и метан',fact:'Метан поглощает красную часть солнечного света и придаёт атмосфере голубовато-зелёный оттенок.',gravity:'Условное притяжение немного слабее земного. Цвет атмосферы его не определяет: главные факторы — масса и расстояние до центра.',slug:'uranus'},
  {type:'Ледяной гигант',atmosphere:'Метан и быстрые ветры',fact:'В оболочке из водорода и гелия есть метан. Скорость ветров может превышать 2 000 км/ч.',gravity:'Притяжение немного сильнее земного. Ветры меняют траекторию движения, но не создают гравитацию. Твёрдой поверхности здесь нет.',slug:'neptune'}
];
grid.innerHTML = planets.map((p,i) => {
  const f=planetFacts[i];
  return `<article class="planet-card fact-card ${p.className === 'earth' ? 'earth' : ''}" aria-labelledby="fact-${p.className}"><div class="card-top"><span>0${i+1}</span><span>${f.type}</span></div><div class="planet-art ${p.className}" aria-hidden="true"></div><h3 id="fact-${p.className}">${p.name}</h3><div class="fact-atmosphere">${f.atmosphere}</div><p class="planet-fact">${f.fact}</p><div class="fact-gravity"><h4>А что с притяжением?</h4><p>${f.gravity}</p></div><div class="card-bottom"><span>≈ ${format(9.81*p.factor)} м/с²</span><a href="https://science.nasa.gov/${f.slug}/facts/" target="_blank" rel="noopener noreferrer" aria-label="${p.name}: факты NASA (в новой вкладке)">NASA ↗</a></div></article>`;
}).join('');
function updateResults(){
  const mass = input.valueAsNumber;
  const valid = Number.isFinite(mass) && mass > 0 && planets.every(p => Number.isFinite(mass*p.factor));
  error.textContent = valid ? '' : input.value === '' && !input.validity.badInput ? 'Введи свою массу в килограммах.' : 'Введи положительное число больше нуля.';
  input.setAttribute('aria-invalid', String(!valid));
}
input.addEventListener('input',updateResults);
updateResults();

// A fixed launch speed makes the effect of local gravity directly comparable.
const slider = document.querySelector('.gravity-slider');
const dots = slider.querySelector('.slide-dots');
const pauseButton = slider.querySelector('.slide-pause');
const descriptions = [
  'Слабое притяжение: мяч поднимается выше и дольше остаётся в воздухе.',
  'Почти земное притяжение. Прыжок лишь немного выше привычного.',
  'Наша точка отсчёта: привычная высота и знакомый ритм прыжка.',
  'Здесь гравитация как на Меркурии: тот же высокий, неторопливый прыжок.',
  'Самое сильное притяжение в этой подборке: короткий и быстрый прыжок.',
  'Чуть сильнее земного. Прыжок немного ниже и короче.',
  'Притяжение слабее земного: мяч взлетает чуть выше.',
  'Сильнее земного: мяч быстрее возвращается на условную поверхность.'
];
const colors=['#eee7e0','#f1e8d6','#e9e3f0','#f3dfd6','#eee0d2','#efe8d8','#deedef','#dfe6f2'];
const ballColors=['#8c7869','#a28245','#79618f','#b1664d','#a57853','#9e8d5b','#51818b','#4d6fa2'];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let activePlanet=2, userPaused=motionPreference.matches, visible=true, elapsed=0, jumpElapsed=0, previousTime=null;
const slideDuration=11000;
const jumpBackdrop=slider.querySelector('.jump-backdrop');
const jumpWave=jumpBackdrop.querySelector('path');
const jumpMorph=jumpBackdrop.querySelector('animate');
const waveShapes=[
'M90 0 H600 V600 H120 C110 480 10 450 25 300 C40 160 140 150 90 0 Z',
'M35 0 H600 V600 H90 C160 470 5 430 50 290 C100 160 10 110 35 0 Z',
'M125 0 H600 V600 H35 C5 470 125 400 65 280 C5 160 90 100 125 0 Z',
'M60 0 H600 V600 H140 C150 470 25 420 20 280 C15 150 110 100 60 0 Z'
];
let currentWave=waveShapes[0];
function transitionJumpScene(index,animate){
  const nextWave=waveShapes[index%waveShapes.length];
  jumpMorph.endElement();
  jumpWave.setAttribute('d',nextWave);
  if(animate&&!motionPreference.matches){
    jumpMorph.setAttribute('values',`${currentWave};M0 0 H600 V600 H0 C0 480 160 420 100 280 C40 140 0 100 0 0 Z;${nextWave}`);
    jumpMorph.beginElement();
  }
  currentWave=nextWave;
  slider.classList.remove('is-transitioning');
  if(animate&&!motionPreference.matches){void slider.offsetWidth;slider.classList.add('is-transitioning');}
}

dots.innerHTML=planets.map((p,i)=>`<button type="button" class="slide-dot" aria-label="${p.name}" data-index="${i}"><svg viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="14"/></svg></button>`).join('');
function updateSlideMass(){
  const mass=input.valueAsNumber;
  const factor=planets[activePlanet].factor;
  const valid=Number.isFinite(mass)&&mass>0&&Number.isFinite(mass*factor*9.81);
  slider.querySelector('#gravity-weight').textContent=valid?`${format(mass*factor)} кг`:'—';
  slider.querySelector('#gravity-force').textContent=valid?`${format(mass*factor*9.81)} Н`:'—';
}
function selectPlanet(index, animate=true){
  activePlanet=(index+planets.length)%planets.length;elapsed=0;jumpElapsed=0;
  const p=planets[activePlanet];const g=9.81*p.factor;
  slider.style.setProperty('--slide-color',colors[activePlanet]);
  slider.style.setProperty('--ball-color',ballColors[activePlanet]);
  const planetTitle=slider.querySelector('#gravity-name');
  planetTitle.setAttribute('aria-label',p.name);
  planetTitle.replaceChildren(...Array.from(p.name,(letter,index)=>{
    const character=document.createElement('span');
    character.className='planet-title-letter';
    character.textContent=letter;
    character.setAttribute('aria-hidden','true');
    character.style.setProperty('--letter-index',index);
    return character;
  }));
  slider.querySelector('#gravity-description').textContent=descriptions[activePlanet];
  slider.querySelector('.jump-planet').className=`jump-planet planet-art ${p.className}`;
  slider.querySelector('.jump-height').textContent=`g = ${format(g)} м/с²`;
  slider.querySelector('#jump-height-label').textContent=`Высота: ${format(25/(2*g))} м`;
  slider.querySelector('#jump-time-label').textContent=`Полёт: ${format(10/g)} с`;
  slider.querySelector('.slide-count').textContent=`0${activePlanet+1} / 08`;
  dots.querySelectorAll('button').forEach((b,i)=>{b.setAttribute('aria-current',String(i===activePlanet));b.style.setProperty('--progress',0);});
  updateSlideMass();
  const copy=slider.querySelector('.gravity-copy');copy.classList.remove('is-entering');
  if(animate&&!motionPreference.matches){void copy.offsetWidth;copy.classList.add('is-entering');}
  transitionJumpScene(activePlanet,animate);
  drawJump();
}
function drawJump(){
  const g=9.81*planets[activePlanet].factor, flight=10/g;
  const t=(jumpElapsed/1000)%(flight+.45);
  const height=t<=flight?Math.max(0,5*t-.5*g*t*t):0;
  const peak=25/(2*g);
  slider.querySelector('.jump-ball').style.transform=`translateY(${-height*57}px)`;
  slider.querySelector('.jump-shadow').style.transform=`scale(${1-.55*height/peak})`;
  slider.querySelector('.jump-shadow').style.opacity=String(1-.65*height/peak);
}
function syncPause(){pauseButton.textContent=userPaused?'▶':'Ⅱ';pauseButton.setAttribute('aria-label',userPaused?'Продолжить анимацию и автопереключение':'Приостановить анимацию и автопереключение');pauseButton.setAttribute('aria-pressed',String(userPaused));}
pauseButton.addEventListener('click',()=>{userPaused=!userPaused;syncPause();});
dots.addEventListener('click',event=>{const button=event.target.closest('button');if(button)selectPlanet(Number(button.dataset.index));});
slider.addEventListener('keydown',event=>{if(event.target.matches('input'))return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();selectPlanet(activePlanet+(event.key==='ArrowRight'?1:-1));dots.children[activePlanet].focus();}});
input.addEventListener('input',updateSlideMass);
let touchStart=null;
slider.addEventListener('touchstart',e=>{touchStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};},{passive:true});
slider.addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)selectPlanet(activePlanet+(dx<0?1:-1));touchStart=null;},{passive:true});
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:.15}).observe(slider);
motionPreference.addEventListener('change',()=>{if(motionPreference.matches){userPaused=true;jumpMorph.endElement();jumpWave.setAttribute('d',currentWave);slider.classList.remove('is-transitioning');syncPause();}});
function tick(time){
  const delta=previousTime===null?0:Math.min(time-previousTime,100);previousTime=time;
  if(!userPaused&&visible&&!document.hidden){
    elapsed+=delta;jumpElapsed+=delta;
    // A selected dot or pause button may retain focus; the timer still advances.
    if(elapsed>=slideDuration)selectPlanet(activePlanet+1);
    dots.children[activePlanet].style.setProperty('--progress',Math.min(elapsed/slideDuration,1));
    if(!motionPreference.matches)drawJump();
  }
  requestAnimationFrame(tick);
}
selectPlanet(2,false);syncPause();requestAnimationFrame(tick);

const themeToggle=document.querySelector('.theme-toggle');
function applyTheme(theme){
  document.documentElement.dataset.theme=theme;
  themeToggle.setAttribute('aria-label',theme==='dark'?'Включить светлую тему':'Включить тёмную тему');
  themeToggle.setAttribute('aria-pressed',String(theme==='dark'));
  document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#141218':'#faf9f6';
}
themeToggle.addEventListener('click',()=>{
  const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
  applyTheme(next);
  try{localStorage.setItem('cosmo-theme',next);}catch{}
});
applyTheme(document.documentElement.dataset.theme||'dark');

// Stylised elliptical orbits: compressed distances and periods keep all eight visible.
const solarSystem=document.querySelector('.solar-system');
const solarBodies=[...solarSystem.querySelectorAll('.solar-body')];
const orbitTilt=-28*Math.PI/180;
let solarTime=0, solarPrevious=null, solarVisible=true;
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{solarVisible=entries[0].isIntersecting;},{threshold:0}).observe(solarSystem);
function animateSolarSystem(time){
  const delta=solarPrevious===null?0:Math.min(time-solarPrevious,100);solarPrevious=time;
  if(solarVisible&&!document.hidden&&!motionPreference.matches){
    solarTime+=delta/1000;
    for(const body of solarBodies){
      const radius=Number(body.dataset.radius);
      const angle=Number(body.dataset.phase)+solarTime*2*Math.PI/Number(body.dataset.period);
      const x=radius*Math.cos(angle),y=radius*.63*Math.sin(angle);
      body.setAttribute('transform',`translate(${360+x*Math.cos(orbitTilt)-y*Math.sin(orbitTilt)} ${300+x*Math.sin(orbitTilt)+y*Math.cos(orbitTilt)})`);
    }
  }
  requestAnimationFrame(animateSolarSystem);
}
requestAnimationFrame(animateSolarSystem);
