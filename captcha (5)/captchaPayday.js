let randomNumbers;
let rightNumbers;
let currentScore = 0;
let bestScore = 0;
let captchaButton = document.getElementById("captchaButtonId");
let captchaButtonClicked = false;
let noPayDay = 0;
let buyed = false;
let mainWindow = document.getElementById("mainId");
captchaButton.addEventListener("click", function()
{
    captchaButtonClicked = true;
    checker();
    currentScoreFunc();
    bestScoreFunc();
    bestScoreToTextFunc();
});
document.addEventListener("keydown",function(key)
{
    if(key.keyCode === 13 && canBeOpened === true)
    {
        checker();
        currentScoreFunc();
        bestScoreFunc();
        bestScoreToTextFunc();
        canBeOpened = false;
    }
});
let keyBindInput = document.getElementById("buttonSetValue");
$("#delayValue").keypress(function(event){
    event = event || window.event;
    if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
      return false;
  });

document.addEventListener("keydown",function(event)
{
    if (document.getElementById('buttonSetValue').focused)
    {
        document.getElementById("buttonSetValue").value = event.code
    }
    if(event.code == document.getElementById("buttonSetValue").value && canBeOpened === true)
    {
        openMainWindow();
        pauseWatch();
        resetWatch();
        startWatch();
        document.getElementById("captchaInputId").focus();
        document.getElementById("captchaInputId").value = '';
        inputMaxLength();
        autoEnter();
    }
});
document.addEventListener("keyup",function(event)
{
    if (document.getElementById('buttonSetValue').focused)
    {
        document.getElementById("buttonSetValue").value = event.code
    }
    if(event.code == document.getElementById("buttonSetValue").value && canBeOpened === false)
    {
        noPayDay++;
    }
    if(noPayDay == 10)
    {
        const chatMessage = document.createElement("p");
        chatMessage.innerText = "[Console]: Не флуди!";
        chatMessage.classList.add("chatMessage");
        classChat.append(chatMessage);
        noPayDay = 0;
    }
});
document.addEventListener("keydown",function(key){
    if(key.keyCode === 27 && canBeOpened === true)
    {
        var allChat = document.getElementById("chatClassId");
        var deleteElement = allChat.querySelectorAll('.chatMessage');
        for (let i = 0; i < deleteElement.length; i++) 
        {
            deleteElement[i].remove();
        }
        pauseWatch();
        resetWatch();
        getRandom();
        numbersToText();
        closeCaptcha();
        console.log("closeCaptcha();");
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
}
function closeMainWindow()
{
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
    var allChat = document.getElementById("chatClassId");
    let inputField = String(document.getElementById("captchaInputId").value);
    if(inputField == randomNumbers)
    {
        var deleteElement = allChat.querySelectorAll('.chatMessage');
        for (let i = 0; i < deleteElement.length; i++) 
        {
            deleteElement[i].remove();
        }
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
        closeCaptcha();
        console.log("closeCaptcha();");
        buyed = true;
    }
    else
    {
        var deleteElement = allChat.querySelectorAll('.chatMessage');
        for (let i = 0; i < deleteElement.length; i++) 
        {
            deleteElement[i].remove();
        }
        getRandom();
        numbersToText();
        captchaWrong();
        console.log("Не правильно");
        document.getElementById("captchaInputId").value = '';
        document.getElementById("captchaInputId").focus();
        currentScore = 0;
        resetWatch();
        startWatch();
        closeCaptcha();
        console.log("closeCaptcha();");
        buyed = true;
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
function bestScoreFunc()
{
    if(currentScore > bestScore)
    {
        bestScore = currentScore;
        localStorage.setItem("bc", bestScore);
    }
}
const bc = +localStorage.getItem('bc');
const bestScoreHtml = document.getElementById("bestScoreId");
bestScoreHtml.innerText = bc;
bestScore = bc
function bestScoreToTextFunc()
{
    const bestScoreHtml = document.getElementById("bestScoreId");
    bestScoreHtml.innerText = bestScore;
}
getRandom();
numbersToText();
// checker();
currentScoreFunc();

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
getChat();
let classChat = document.getElementById("chatClassId");
let canBeOpened = false;
function getChat()
{
    let randomPercent;
    randomPercent = Math.floor(Math.random() * 6) + 1;
    console.log(randomPercent);
    if(randomPercent == 1)
    {
        getChat1();
    }
    else if(randomPercent == 2){
        getChat2();
    }
    else if(randomPercent == 3)
    {
        getChat3();
    }
    else if(randomPercent == 4)
    {
        getChat4();
    }
    else if(randomPercent == 5)
    {
        getChat5();
    }
    else if(randomPercent == 6)
    {
        getChat6();
    }
}
function getChat1()
{
    let delayValue = String(document.getElementById("delayValue").value);
    delayValue = delayValue * 1000;
    let classChat = document.getElementById("chatClassId");

    
    const chatMessage = document.createElement("p");
    chatMessage.innerText = "[23:59:50] [Таксист] Fends_Sweet[192]: я непонимаю админам важко вытащить з води лудям наобордт лушде стане на глийне гулять";
    chatMessage.classList.add("chatMessage");
    classChat.prepend(chatMessage);
    // document.body.appendChild(chatMessage);

    // setTimeout("const chatMessage2 = document.createElement('p');", 1000);
    // setTimeout("chatMessage2.innerText = '[23:59:45] [PREMIUM] Drug_Faster[227]: куплю талон на смену ника';", 1000);
    // setTimeout("chatMessage2.classList.add('chatMessage');", 5000);
    // setTimeout("document.body.appendChild(chatMessage2);", 5000);

    // setTimeout("const chatMessage3 = document.createElement('p');", 3000);
    // setTimeout("chatMessage3.innerText = '[23:59:47]';", 3000);
    // setTimeout("chatMessage3.classList.add('chatMessage');", 3000);
    // setTimeout("document.body.appendChild(chatMessage3);", 3000);

    // setTimeout("const chatMessage4 = document.createElement('p');", 4000);
    // setTimeout("chatMessage4.innerText = '[23:59:50] [VIP] Mario_Genius[905]: Принимаю в фаму Genius звоните';", 4000);
    // setTimeout("chatMessage4.classList.add('chatMessage');", 40000);
    // setTimeout("document.body.appendChild(chatMessage4);", 4000);

    setTimeout("const chatMessage2 = document.createElement('p');", 5000);
    setTimeout("chatMessage2.innerText = '[23:59:55] [Пилот] Xorzu_Sakata[615]: Кто мне звонил перезвони';", 5000);
    setTimeout("chatMessage2.classList.add('chatMessage');", 5000);
    setTimeout("classChat.append(chatMessage2);", 5000);
    // setTimeout("document.body.appendChild(chatMessage5);", 5000);
    
    setTimeout("const chatMessage3 = document.createElement('p');", 6000);
    setTimeout("chatMessage3.innerText = '[23:59:56] Администратор Jizzy_John[48] заглушил игрока Evan_Cruz[253] на 60 минут. Причина: Нар. кд. /vr';", 6000);
    setTimeout("chatMessage3.classList.add('chatMessage');", 6000);
    setTimeout("classChat.append(chatMessage3);", 6000);
    // setTimeout("document.body.appendChild(chatMessage6);", 6000);

    setTimeout("const chatMessage4 = document.createElement('p');", 7000);
    setTimeout("chatMessage4.innerText = '[23:59:57] [VIP] Mario_Genius[905]: Принимаю в фаму Genius звоните';", 7000);
    setTimeout("chatMessage4.classList.add('chatMessage');", 7000);
    setTimeout("classChat.append(chatMessage4);", 7000);
    // setTimeout("document.body.appendChild(chatMessage7);", 7000);

    setTimeout("const chatMessage5 = document.createElement('p');", 8000);
    setTimeout("chatMessage5.innerText = '[23:59:58] Администратор Leonardo_Swag[48] забанил игрока Makar_Vialpado[188]. Причина: Чит // J.Crystal';", 8000);
    setTimeout("chatMessage5.classList.add('chatMessage');", 8000);
    setTimeout("classChat.append(chatMessage5);", 8000);
    // setTimeout("document.body.appendChild(chatMessage8);", 8000);

    setTimeout("const chatMessage6 = document.createElement('p');", 9000);
    setTimeout("chatMessage6.innerText = '[23:59:59] [PREMIUM] Drug_Faster[227]: куплю талон на смену ника';", 9000);
    setTimeout("chatMessage6.classList.add('chatMessage');", 9000);
    setTimeout("classChat.append(chatMessage6);", 9000);
    // setTimeout("document.body.appendChild(chatMessage9);", 9000);

    setTimeout("const chatMessage7 = document.createElement('p');", 10000);
    setTimeout("chatMessage7.innerText = '[00:00:00] [Ошибка] Для получения PayDay вы должны отыграть минимум 20 минут';", 10000);
    setTimeout("chatMessage7.classList.add('chatMessage');", 10000);
    setTimeout("classChat.append(chatMessage7);", 10000);
    // setTimeout("document.body.appendChild(chatMessage10);", 10000);

    setTimeout("canBeOpened = true", 10000);
    setTimeout(function() {
        if(buyed === false)
        {
            closeCaptcha();
            console.log("closeCaptcha();");
        }
    }, 10000 + delayValue);
}
function getChat2()
{
    let delayValue = String(document.getElementById("delayValue").value);
    delayValue = delayValue * 1000;

    let classChat = document.getElementById("chatClassId");

    const chatMessage = document.createElement("p");
    chatMessage.innerText = "[12:59:50] [Дальнобойщик] Egor_Gorgoshin[274]: Влад ты где не могут тебя найти";
    chatMessage.classList.add("chatMessage");
    classChat.prepend(chatMessage);
    // document.body.appendChild(chatMessage);

    setTimeout("const chatMessage2 = document.createElement('p');", 5000);
    setTimeout("chatMessage2.innerText = '[12:59:55] [Семья] Ассасин Leo_Seledka[189]: что ловите?';", 5000);
    setTimeout("chatMessage2.classList.add('chatMessage');", 5000);
    setTimeout("classChat.append(chatMessage2);", 5000);
    // setTimeout("document.body.appendChild(chatMessage5);", 5000);
    
    setTimeout("const chatMessage3 = document.createElement('p');", 6000);
    setTimeout("chatMessage3.innerText = '[12:59:56]  Javier_Depo[133] достал сигарету с зажигалкой и попытался закурить (Неудачно)';", 6000);
    setTimeout("chatMessage3.classList.add('chatMessage');", 6000);
    setTimeout("classChat.append(chatMessage3);", 6000);
    // setTimeout("document.body.appendChild(chatMessage6);", 6000);

    setTimeout("const chatMessage4 = document.createElement('p');", 7000);
    setTimeout("chatMessage4.innerText = '[12:59:57]  Ryo_Unlimited[17]: какие дома слетают?';", 7000);
    setTimeout("chatMessage4.classList.add('chatMessage');", 7000);
    setTimeout("classChat.append(chatMessage4);", 7000);
    // setTimeout("document.body.appendChild(chatMessage7);", 7000);

    setTimeout("const chatMessage5 = document.createElement('p');", 8000);
    setTimeout("chatMessage5.innerText = '[12:59:58] [Сервер Vice City] Внимание! На сервере Vice City действует акция Х3 PayDay.';", 8000);
    setTimeout("chatMessage5.classList.add('chatMessage');", 8000);
    setTimeout("classChat.append(chatMessage5);", 8000);
    // setTimeout("document.body.appendChild(chatMessage8);", 8000);

    setTimeout("const chatMessage6 = document.createElement('p');", 9000);
    setTimeout("chatMessage6.innerText = '[12:59:59] [Подсказка] Вы можете купить складское помещение /gps - складские помещения.';", 9000);
    setTimeout("chatMessage6.classList.add('chatMessage');", 9000);
    setTimeout("classChat.append(chatMessage6);", 9000);
    // setTimeout("document.body.appendChild(chatMessage9);", 9000);

    setTimeout("const chatMessage7 = document.createElement('p');", 10000);
    setTimeout("chatMessage7.innerText = '[13:00:00] [Ошибка] Для получения PayDay вы должны отыграть минимум 20 минут';", 10000);
    setTimeout("chatMessage7.classList.add('chatMessage');", 10000);
    setTimeout("classChat.append(chatMessage7);", 10000);
    // setTimeout("document.body.appendChild(chatMessage10);", 10000);

    setTimeout("canBeOpened = true", 10000);
    setTimeout(function() {
        if(buyed === false)
        {
            closeCaptcha();
            console.log("closeCaptcha();");
        }
    }, 10000 + delayValue);
}
function getChat3()
{
    let delayValue = String(document.getElementById("delayValue").value);
    delayValue = delayValue * 1000;

    let classChat = document.getElementById("chatClassId");

    const chatMessage = document.createElement("p");
    chatMessage.innerText = "[14:59:50] [PREMIUM] Miracle_White[187]: Продам белый шар +12";
    chatMessage.classList.add("chatMessage");
    classChat.prepend(chatMessage);
    // document.body.appendChild(chatMessage);

    setTimeout("const chatMessage2 = document.createElement('p');", 5000);
    setTimeout("chatMessage2.innerText = '[14:59:55] Объявление: Продам р/с `Смазки для Видео Карт` Цена:Договорная. Отправил: Conor_Moreno[74] Тел. 2424977';", 5000);
    setTimeout("chatMessage2.classList.add('chatMessage');", 5000);
    setTimeout("classChat.append(chatMessage2);", 5000);
    // setTimeout("document.body.appendChild(chatMessage5);", 5000);
    
    setTimeout("const chatMessage3 = document.createElement('p');", 6000);
    setTimeout("chatMessage3.innerText = '[14:59:56] [Пилот] Alon_Mercury[862]: А за что сняли меня? Кто в курсе';", 6000);
    setTimeout("chatMessage3.classList.add('chatMessage');", 6000);
    setTimeout("classChat.append(chatMessage3);", 6000);
    // setTimeout("document.body.appendChild(chatMessage6);", 6000);

    setTimeout("const chatMessage4 = document.createElement('p');", 7000);
    setTimeout("chatMessage4.innerText = '[14:59:57] [ News LS ] Директор Howard_Flow[779]: Добрый день штат! Хочу вам сообщить что в ТВ студию г.Лос-Сантос...';", 7000);
    setTimeout("chatMessage4.classList.add('chatMessage');", 7000);
    setTimeout("classChat.append(chatMessage4);", 7000);
    // setTimeout("document.body.appendChild(chatMessage7);", 7000);

    setTimeout("const chatMessage5 = document.createElement('p');", 8000);
    setTimeout("chatMessage5.innerText = '[14:59:58] [ News LS ] Директор Howard_Flow[779]: Сейчас проходит день открытых дверей! Ждём всех желающих! От 3х лет в штате...';", 8000);
    setTimeout("chatMessage5.classList.add('chatMessage');", 8000);
    setTimeout("classChat.append(chatMessage5);", 8000);
    // setTimeout("document.body.appendChild(chatMessage8);", 8000);

    setTimeout("const chatMessage6 = document.createElement('p');", 9000);
    setTimeout("chatMessage6.innerText = '[14:59:59] [VIP] Dark_Miracle[851]: Куплю дом в ЛС звоните паарни';", 9000);
    setTimeout("chatMessage6.classList.add('chatMessage');", 9000);
    setTimeout("classChat.append(chatMessage6);", 9000);
    // setTimeout("document.body.appendChild(chatMessage9);", 9000);

    setTimeout("const chatMessage7 = document.createElement('p');", 10000);
    setTimeout("chatMessage7.innerText = '[15:00:00]  PayDay [Банковский чек]';", 10000);
    setTimeout("chatMessage7.classList.add('chatMessage');", 10000);
    setTimeout("classChat.append(chatMessage7);", 10000);
    // setTimeout("document.body.appendChild(chatMessage10);", 10000);

    setTimeout("canBeOpened = true", 10000);
    setTimeout(function() {
        if(buyed === false)
        {
            closeCaptcha();
            console.log("closeCaptcha();");
        }
    }, 10000 + delayValue);
}
function getChat4()
{
    let delayValue = String(document.getElementById("delayValue").value);
    delayValue = delayValue * 1000;

    let classChat = document.getElementById("chatClassId");

    const chatMessage = document.createElement("p");
    chatMessage.innerText = "[17:59:50] [Пилот] Giorgi_Tensaid[982]: дм меня и дмэмят";
    chatMessage.classList.add("chatMessage");
    classChat.prepend(chatMessage);
    // document.body.appendChild(chatMessage);

    setTimeout("const chatMessage2 = document.createElement('p');", 5000);
    setTimeout("chatMessage2.innerText = '[17:59:55] [VIP] Macoto_Mitchell[249]: Продам скин ` Гринч ` с заточкой +9. Звоните 6563462';", 5000);
    setTimeout("chatMessage2.classList.add('chatMessage');", 5000);
    setTimeout("classChat.append(chatMessage2);", 5000);
    // setTimeout("document.body.appendChild(chatMessage5);", 5000);
    
    setTimeout("const chatMessage3 = document.createElement('p');", 6000);
    setTimeout("chatMessage3.innerText = '[17:59:56] Goro_Nakagawa[332] говорит: А если он будет играть , то и я буду тип , потому что одному нет особо такого желания';", 6000);
    setTimeout("chatMessage3.classList.add('chatMessage');", 6000);
    setTimeout("classChat.append(chatMessage3);", 6000);
    // setTimeout("document.body.appendChild(chatMessage6);", 6000);

    setTimeout("const chatMessage4 = document.createElement('p');", 7000);
    setTimeout("chatMessage4.innerText = '[17:59:57] Объявление: Проходит набор в семью `Diggers` Ждем на ЖДСФ. Отправил: Chris_Long[893] Тел. 2209009';", 7000);
    setTimeout("chatMessage4.classList.add('chatMessage');", 7000);
    setTimeout("classChat.append(chatMessage4);", 7000);
    // setTimeout("document.body.appendChild(chatMessage7);", 7000);

    setTimeout("const chatMessage5 = document.createElement('p');", 8000);
    setTimeout("chatMessage5.innerText = '[17:59:58] [Family Car] Член семьи Jack_Versace[985] взял `PCJ-600` с автопарка семьи.';", 8000);
    setTimeout("chatMessage5.classList.add('chatMessage');", 8000);
    setTimeout("classChat.append(chatMessage5);", 8000);
    // setTimeout("document.body.appendChild(chatMessage8);", 8000);

    setTimeout("const chatMessage6 = document.createElement('p');", 9000);
    setTimeout("chatMessage6.innerText = '[17:59:59] [Пилот] Giorgi_Tensaid[982]: а я иду бить рифу они офигели!';", 9000);
    setTimeout("chatMessage6.classList.add('chatMessage');", 9000);
    setTimeout("classChat.append(chatMessage6);", 9000);
    // setTimeout("document.body.appendChild(chatMessage9);", 9000);

    setTimeout("const chatMessage7 = document.createElement('p');", 10000);
    setTimeout("chatMessage7.innerText = '[18:00:00]  PayDay [Банковский чек]';", 10000);
    setTimeout("chatMessage7.classList.add('chatMessage');", 10000);
    setTimeout("classChat.append(chatMessage7);", 10000);
    // setTimeout("document.body.appendChild(chatMessage10);", 10000);

    setTimeout("canBeOpened = true", 10000);
    setTimeout(function() {
        if(buyed === false)
        {
            closeCaptcha();
            console.log("closeCaptcha();");
        }
    }, 10000 + delayValue);

}
function getChat5()
{
    let delayValue = String(document.getElementById("delayValue").value);
    delayValue = delayValue * 1000;

    let classChat = document.getElementById("chatClassId");

    const chatMessage = document.createElement("p");
    chatMessage.innerText = "[20:59:50] Администратор Vitaliy_Jackson[174] забанил игрока Bebra_Buster[254] на 30 дней. Причина: Чит";
    chatMessage.classList.add("chatMessage");
    classChat.prepend(chatMessage);
    // document.body.appendChild(chatMessage);

    setTimeout("const chatMessage2 = document.createElement('p');", 5000);
    setTimeout("chatMessage2.innerText = '[20:59:55] В данный момент проходит собеседование в организацию Больница СФ!';", 5000);
    setTimeout("chatMessage2.classList.add('chatMessage');", 5000);
    setTimeout("classChat.append(chatMessage2);", 5000);
    // setTimeout("document.body.appendChild(chatMessage5);", 5000);
    
    setTimeout("const chatMessage3 = document.createElement('p');", 6000);
    setTimeout("chatMessage3.innerText = '[20:59:56] [Пилот] Madara_Henry[997]: Бадабум или Дим Дырыч?';", 6000);
    setTimeout("chatMessage3.classList.add('chatMessage');", 6000);
    setTimeout("classChat.append(chatMessage3);", 6000);
    // setTimeout("document.body.appendChild(chatMessage6);", 6000);

    setTimeout("const chatMessage4 = document.createElement('p');", 7000);
    setTimeout("chatMessage4.innerText = '[20:59:57] [Пилот] Artem_Gelme[997]: я тупой че делать';", 7000);
    setTimeout("chatMessage4.classList.add('chatMessage');", 7000);
    setTimeout("classChat.append(chatMessage4);", 7000);
    // setTimeout("document.body.appendChild(chatMessage7);", 7000);

    setTimeout("const chatMessage5 = document.createElement('p');", 8000);
    setTimeout("chatMessage5.innerText = '[20:59:58] [PREMIUM] Egor_Narmalnov[250]: первый, кто приедет к дому 1047 получит его за 3кк';", 8000);
    setTimeout("chatMessage5.classList.add('chatMessage');", 8000);
    setTimeout("classChat.append(chatMessage5);", 8000);
    // setTimeout("document.body.appendChild(chatMessage8);", 8000);

    setTimeout("const chatMessage6 = document.createElement('p');", 9000);
    setTimeout("chatMessage6.innerText = '[20:59:59] Yamato_Tsukuyomi пытается завести двигатель';", 9000);
    setTimeout("chatMessage6.classList.add('chatMessage');", 9000);
    setTimeout("classChat.append(chatMessage6);", 9000);
    // setTimeout("document.body.appendChild(chatMessage9);", 9000);

    setTimeout("const chatMessage7 = document.createElement('p');", 10000);
    setTimeout("chatMessage7.innerText = '[21:00:00] [Ошибка] Для получения PayDay вы должны отыграть минимум 20 минут';", 10000);
    setTimeout("chatMessage7.classList.add('chatMessage');", 10000);
    setTimeout("classChat.append(chatMessage7);", 10000);
    // setTimeout("document.body.appendChild(chatMessage10);", 10000);

    setTimeout("canBeOpened = true", 10000);
    setTimeout(function() {
        if(buyed === false)
        {
            closeCaptcha();
            console.log("closeCaptcha();");
        }
    }, 10000 + delayValue);
}
function getChat6()
{
    let delayValue = String(document.getElementById("delayValue").value);
    delayValue = delayValue * 1000;

    let classChat = document.getElementById("chatClassId");

    const chatMessage = document.createElement("p");
    chatMessage.innerText = "[09:59:50]  Gamato_Xiamo[274] вытащил из заднего подсумка балаклаву и натянул её на лицо.";
    chatMessage.classList.add("chatMessage");
    classChat.prepend(chatMessage);
    // document.body.appendChild(chatMessage);

    setTimeout("const chatMessage2 = document.createElement('p');", 5000);
    setTimeout("chatMessage2.innerText = '[09:59:55] - Основные команды сервера: /menu /help /gps /settings';", 5000);
    setTimeout("chatMessage2.classList.add('chatMessage');", 5000);
    setTimeout("classChat.append(chatMessage2);", 5000);
    // setTimeout("document.body.appendChild(chatMessage5);", 5000);
    
    setTimeout("const chatMessage3 = document.createElement('p');", 6000);
    setTimeout("chatMessage3.innerText = '[09:59:56] [VIP] Hayk_Cornello[95]: а если я маленький игрок?';", 6000);
    setTimeout("chatMessage3.classList.add('chatMessage');", 6000);
    setTimeout("classChat.append(chatMessage3);", 6000);
    // setTimeout("document.body.appendChild(chatMessage6);", 6000);

    setTimeout("const chatMessage4 = document.createElement('p');", 7000);
    setTimeout("chatMessage4.innerText = '[09:59:57] [Дальнобойщик] Dias_Amantik: Што делать фура не идет адм не поможает';", 7000);
    setTimeout("chatMessage4.classList.add('chatMessage');", 7000);
    setTimeout("classChat.append(chatMessage4);", 7000);
    // setTimeout("document.body.appendChild(chatMessage7);", 7000);

    setTimeout("const chatMessage5 = document.createElement('p');", 8000);
    setTimeout("chatMessage5.innerText = '[09:59:58] Объявление: Продам дом . Отправил: Ikey_Kennette[120] Тел. 2257696';", 8000);
    setTimeout("chatMessage5.classList.add('chatMessage');", 8000);
    setTimeout("classChat.append(chatMessage5);", 8000);
    // setTimeout("document.body.appendChild(chatMessage8);", 8000);

    setTimeout("const chatMessage6 = document.createElement('p');", 9000);
    setTimeout("chatMessage6.innerText = '[09:59:59] [Дальнобойщик] Itachi_Genry[997]: бомжую с 66кк';", 9000);
    setTimeout("chatMessage6.classList.add('chatMessage');", 9000);
    setTimeout("classChat.append(chatMessage6);", 9000);
    // setTimeout("document.body.appendChild(chatMessage9);", 9000);

    setTimeout("const chatMessage7 = document.createElement('p');", 10000);
    setTimeout("chatMessage7.innerText = '[10:00:00] PayDay [Банковский чек]';", 10000);
    setTimeout("chatMessage7.classList.add('chatMessage');", 10000);
    setTimeout("classChat.append(chatMessage7);", 10000);
    // setTimeout("document.body.appendChild(chatMessage10);", 10000);

    setTimeout("canBeOpened = true", 10000);
    setTimeout(function() {
        if(buyed === false)
        {
            closeCaptcha();
            console.log("closeCaptcha();");
        }
    }, 10000 + delayValue);
    
}

function closeCaptcha()
{
    let classChat = document.getElementById("chatClassId");

    const chatMessage8 = document.createElement("p");
    chatMessage8.innerText = "[Console]: Дом был куплен";
    chatMessage8.classList.add("chatMessage");
    classChat.append(chatMessage8);

    closeMainWindow();
    getRandom();
    numbersToText();

    canBeOpened = false;

    var allChat = document.getElementById('chatClassId');
    var deleteElement = allChat.querySelectorAll('.chatMessage');
    for (let i = 0; i < deleteElement.length; i++)
    {
        (function(i) {
            setTimeout(function(){
                deleteElement[i].remove();
            }, 3000);
        })(i);
    }

    setTimeout("getChat();", 3000);
}
function inputMaxLength()
{
    const limit = document.getElementById("limitValueId");
    if(limit.checked === true)
    {
        $('#captchaInputId').attr('maxlength',  5);
    }
    else if(limit.checked === false)
    {
        $('#captchaInputId').attr('maxlength',  30);
    }
}
function autoEnter()
{
    var inputField = document.getElementById("captchaInputId");
    const autoEnter = document.getElementById("autoEnterValueId");
    if(autoEnter.checked === true)
    {
        inputField.addEventListener("input", autoEnt);

    }

}
function autoEnt()
{
    const inputField = document.getElementById("captchaInputId").value;
    if(inputField == randomNumbers)
    {
          
          document.dispatchEvent(new KeyboardEvent('keydown', {
            'keyCode': '13'
          }));
    }
}