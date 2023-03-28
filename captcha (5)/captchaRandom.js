let randomNumbers;
let rightNumbers;
let currentScore = 0;
let bestScore = 0;
let captchaButton = document.getElementById("captchaButtonId");
let captchaButtonClicked = false;
let mainWindow = document.getElementById("mainId");

const watch = document.querySelector('#currentTimeId');
let watchTimer;
let milliseconds = 0;
let timer;
let watchControl;

const startWatch = () => {
	watch.classList.remove('paused');
	clearInterval(timer);
	timer = setInterval(()=>{
		milliseconds += 10;
		let dateTimer = new Date(milliseconds);
		watchTimer =
			('0'+dateTimer.getUTCSeconds()).slice(-2) + ':' +
			('0'+dateTimer.getUTCMilliseconds()).slice(-3,-1);
	},10);
};
const watchToText = () =>{
    watch.innerHTML = watchTimer;
}

const pauseWatch = () => {
  watch.classList.add('paused');
  clearInterval(timer);
  watchControl = watchTimer;
};

const resetWatch = () => {
	watch.classList.remove('paused');
	clearInterval(timer);
	milliseconds = 0;
	// watch.innerHTML = '00:00';
};

// document.addEventListener('click', (e) =>{
// 	const element = e.target;
// 	if (element.id === 'start') startWatch();
// 	if (element.id === 'pause') pauseWatch();
// 	if (element.id === 'reset') resetWatch();
// });
let bestWatchTimer = new Date(milliseconds);
let bestWatchTime = ('1'+bestWatchTimer.getUTCSeconds()).slice(-2) + ':' +
('10'+bestWatchTimer.getUTCMilliseconds()).slice(-3,-1);
function bestTimeFunc()
{
    if(watchTimer < bestWatchTime)
    {
        bestWatchTime = watchTimer;
        localStorage.setItem('bestCaptchaValue', rightNumbers);
        bestCaptchaToTextFunc();
        console.log(bestWatchTime);
        localStorage.setItem('bt', bestWatchTime);
        bestTimeToTextFunc();
    }
}
function bestTimeToTextFunc()
{
    let bt1 = localStorage.getItem('bt');
    if(bt1)
    {
        let bt = localStorage.getItem('bt');
        console.log(bt);
        const bestTimeHtml = document.getElementById("bestTimeId");
        bestTimeHtml.innerText = bt;
        bestWatchTime = bt;
        bestTimeHtml.innerHTML = bestWatchTime;
    }
}
function bestCaptchaToTextFunc()
{
    let bestCaptchaValue1 = localStorage.getItem('bestCaptchaValue');
    if(bestCaptchaValue1)
    {
        let bestCaptchaValue = localStorage.getItem('bestCaptchaValue');
        console.log(bestCaptchaValue);
        const bestCaptcha = document.getElementById("bestCaptchaId");
        bestCaptcha.innerText = bestCaptchaValue;
        rightNumbers = bestCaptchaValue;
        bestCaptcha.innerHTML = rightNumbers;
    }
}
bestTimeToTextFunc();
bestCaptchaToTextFunc();
captchaButton.addEventListener("click", function(){
    captchaButtonClicked = true;
    checker();
    currentScoreFunc();
    bestScoreFunc();
    bestScoreToTextFunc();
});
document.addEventListener("keydown",function(key){
    if(key.keyCode === 13)
    {
        checker();
        currentScoreFunc();
        bestScoreFunc();
        bestScoreToTextFunc();
    }
});
let opened = false;
let randomNum;
let timerId = setTimeout(function tick() {
    randomNum = (Math.floor((Math.random() * 100) + 1));
    randomAppear()
    timerId = setTimeout(tick, 2000); // (*)
  }, 2000);
function randomAppear()
{
    if(randomNum < 50 && opened == false)
    {
        canBeOpened = false;
        openMainWindow();
        pauseWatch();
        resetWatch();
        startWatch();
        document.getElementById("captchaInputId").focus();
        document.getElementById("captchaInputId").value = '';
    }
}
document.addEventListener("keydown",function(key){
    if(key.keyCode === 27)
    {
        closeMainWindow();
        pauseWatch();
        resetWatch();
        getRandom();
        numbersToText();
    }
});
$(".captchaInput").keypress(function(event){
    event = event || window.event;
    if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
      return false;
  });
function openMainWindow()
{
    mainWindow.classList.remove("main");
    opened = true;
}
function closeMainWindow()
{
    opened = false;
    mainWindow.classList.add("main");
}
function getRandom() 
{
    randomNumbers = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    // if(randomNumbers < 10000)
    // {
    //     if(randomNumbers < 10000)
    //     {
    //         if(randomNumbers < 10000)
    //         {
    //             randomNumbers = Math.ceil(Math.random() * 100000);
    //         }
    //     }
    // }
}
function numbersToText()
{
    const captcha = document.getElementById("captchaId");
    let a;
    a = Math.ceil(Math.random() * 10);
    if(a == 1 || a == 2 || a == 3 || a == 4 || a == 5 || a == 6 || a == 7 || a == 8)
    {
        let b;
        b = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        randomNumbers = b + "0";
        captcha.innerText = randomNumbers;
    }
    else
    {
        randomNumbers = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        captcha.innerText = randomNumbers;
    }
    // document.body.replaceChild(captcha);
}
function checker()
{
    let inputField = String(document.getElementById("captchaInputId").value);
    if(inputField == randomNumbers)
    {
        currentScore++;
        rightNumbers = inputField;
        getRandom();
        numbersToText();
        captchaRight();
        console.log("Правильно");
        console.log(currentScore);
        document.getElementById("captchaInputId").value = '';
        document.getElementById("captchaInputId").focus();
        pauseWatch();
        watchToText();
        resetWatch();
        startWatch();
        bestScoreFunc();
        bestTimeFunc();
        // bestTimeToTextFunc();
        closeMainWindow();
    }
    else
    {
        getRandom();
        numbersToText();
        captchaWrong();
        console.log("Не правильно");
        document.getElementById("captchaInputId").value = '';
        document.getElementById("captchaInputId").focus();
        currentScore = 0;
        resetWatch();
        startWatch();
        closeMainWindow();
    }
}
const captchaRightInput = document.getElementById("bestCaptchaClassId");
const captchaRightControlPanel = document.getElementById("controlPanelClassId");

function captchaRight()
{
    captchaRightInput.classList.add("bestCaptchaRight");
    captchaRightInput.classList.remove("bestCaptcha");
    setTimeout("captchaRightInput.classList.remove('bestCaptchaRight');", 500);
    setTimeout("captchaRightInput.classList.add('bestCaptcha');", 500);

    captchaRightControlPanel.classList.add("controlPanelRight");
    captchaRightControlPanel.classList.remove("controlPanel");
    setTimeout("captchaRightControlPanel.classList.remove('controlPanelRight');", 500);
    setTimeout("captchaRightControlPanel.classList.add('controlPanel');", 500);
}
function captchaWrong()
{
    captchaRightInput.classList.add("bestCaptchaWrong");
    captchaRightInput.classList.remove("bestCaptcha");
    setTimeout("captchaRightInput.classList.remove('bestCaptchaWrong');", 500);
    setTimeout("captchaRightInput.classList.add('bestCaptcha');", 500);

    captchaRightControlPanel.classList.add("controlPanelWrong");
    captchaRightControlPanel.classList.remove("controlPanel");
    setTimeout("captchaRightControlPanel.classList.remove('controlPanelWrong');", 500);
    setTimeout("captchaRightControlPanel.classList.add('controlPanel');", 500);
}
// const captchaClass = document.getElementById("captchaInputBlockId");
// function captchaWrong()
// {
//     captchaClass.classList.remove("captchaInputBlock");
//     captchaClass.classList.add("captchaWrongInputBlock");
//     setTimeout("captchaClass.classList.remove('captchaWrongInputBlock');", 1000);
//     setTimeout("captchaClass.classList.add('captchaInputBlock');", 1000);
// }
function currentScoreFunc()
{
    const currentScoreHtml = document.getElementById("currentScoreId");
    currentScoreHtml.innerText = currentScore;
}
const bc = +localStorage.getItem('bc');
const bestScoreHtml = document.getElementById("bestScoreId");
bestScoreHtml.innerText = bc;
bestScore = bc
function bestScoreFunc()
{
    if(currentScore > bestScore)
    {
        bestScore = currentScore;
        localStorage.setItem("bc", bestScore);
    }
}
function bestScoreToTextFunc()
{
    const bestScoreHtml = document.getElementById("bestScoreId");
    bestScoreHtml.innerText = bestScore;
}
getRandom();
numbersToText();
// checker();
currentScoreFunc();