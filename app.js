const btn = document.querySelector('.talk')
const content = document.querySelector('.content')
const watch = document.querySelector('.watch')

// for hours 
function initClock(elt, opt_properties) {
    const defaultProperties = { color: ' #00bcd4', date: new Date(), glow: true, militaryTime: false, showMs: true };
    const c = Object.assign(defaultProperties, opt_properties);
    !c.dotColor ? c.dotColor = defaultProperties.color : false;
    const getSecondsPassed = (now = c.date, militaryTime = c.militaryTime) => {
        const s10 = Math.floor(now.getSeconds());
        const m10 = Math.floor(now.getMinutes() * 60 + s10);
        const h = Math.floor(now.getHours() * 3600 + m10);
        return { hour: h, minute10: m10, minute1: Math.floor((now.getMinutes() % 10) * 60 + s10), second10: s10, second1: Math.floor(now.getSeconds() % 10) };
    };
    let td = getSecondsPassed();
    let vxEnd = c.showMs ? 175 : 130;
    let showGlow = c.glow ? `<use href="#fullClock" filter="url(#glow)"/>` : '';
    let showGlowBlur = c.glow ? `<filter id="glow" x="-200%" y="-200%" width="1000%" height="1000%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.4" /></filter>` : '';
    let hrDur = c.militaryTime ? '86400' : '43200';
    let hr1Offsets = c.militaryTime ? `0 0; 0 -30; 0 -60; 0 -90; 0 -120; 0 -150; 0 -180; 0 -210; 0 -240; 0 -270; 0 0; 0 -30; 0 -60; 0 -90; 0 -120; 0 -150; 0 -180; 0 -210; 0 -240; 0 -270; 0 0; 0 -30; 0 -60; 0 -90` : `0 -60; 0 -30; 0 -60; 0 -90; 0 -120; 0 -150; 0 -180; 0 -210; 0 -240; 0 -270; 0 0; 0 -30`;
    let hr10Offsets = c.militaryTime ? `0 0; 0 0; 0 0; 0 0; 0 0; 0 0; 0 0; 0 0; 0 0; 0 0; 0 -30; 0 -30; 0 -30; 0 -30; 0 -30; 0 -30; 0 -30; 0 -30; 0 -30; 0 -30; 0 -60; 0 -60; 0 -60; 0 -60` : `0 -30; 0 0; 0 0; 0 0; 0 0; 0 0; 0 0; 0 0; 0 0; 0 0; 0 -30; 0 -30`;
    let msDots = c.showMs ? `M 132.5 10 v0 m0 10 v0` : '';
    let milliseconds = c.showMs ? `<g class="ms10"><use href="#nums" transform="translate(135)" /><animateTransform id="ms10" attributeName="transform" type="translate" values="0 0; 0 -30; 0 -60; 0 -90; 0 -120; 0 -150; 0 -180; 0 -210; 0 -240; 0 -270" dur="1s" begin="0s" repeatCount="indefinite" calcMode="discrete" /></g><g class="ms"><use href="#nums" transform="translate(155)" /><animateTransform id="ms" attributeName="transform" type="translate" values="0 0; 0 -30; 0 -60; 0 -90; 0 -120; 0 -150; 0 -180; 0 -210; 0 -240; 0 -270" dur=".1s" begin="0s" repeatCount="indefinite" calcMode="discrete" /></g>` : '';
    let svg = `<svg id="clockItToMe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vxEnd} 30"><defs>${showGlowBlur}<marker id="v" viewBox="0 0 10 10" refX="5" refY="2" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 2 l 2 -2 h 6 l 2 2 l -2 2 l -6 0 z" fill="${c.color}" /></marker><marker id="h" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="8" markerHeight="8" orient="rotate(90deg)"><path d="M 0 2 l 2 -2 h 6 l 2 2 l -2 2 l -6 0 z" fill="${c.color}" /></marker><g id="nums" stroke="none" fill="none"><path d="M5 0v 10 10 60 50 30 30 10 50 10 20 30" marker-mid="url(#v)" /><path d="M10 0v10 20 40 10 10 10 10 10 20 20 10 10 10 10 10 10 30 10 10 10 10 10 10" marker-mid="url(#h)" /><path d="M15 0v10 10 20 10 20 30 10 20 10 30 30 20 10 20 10 20 10 20" marker-mid="url(#v)" /></g></defs><g id="fullClock"><g class="hr10"><use href="#nums" /><animateTransform id="hr10" attributeName="transform" type="translate" values="${hr10Offsets}" dur="${hrDur}s" begin="-${td.hour}s" repeatCount="indefinite" calcMode="discrete" /></g><g class="hr"><use href="#nums" transform="translate(20)" /><animateTransform id="hr" attributeName="transform" type="translate" values="${hr1Offsets}" dur="${hrDur}s" begin="-${td.hour}s" repeatCount="indefinite" calcMode="discrete" /></g><g class="min10"><use href="#nums" transform="translate(45)" /><animateTransform id="min10" attributeName="transform" type="translate" values="0 0; 0 -30; 0 -60; 0 -90; 0 -120; 0 -150" dur="3600s" begin="-${td.minute10}s" repeatCount="indefinite" calcMode="discrete" /></g><g class="min"><use href="#nums" transform="translate(65)" /><animateTransform id="min" attributeName="transform" type="translate" values="0 0; 0 -30; 0 -60; 0 -90; 0 -120; 0 -150; 0 -180; 0 -210; 0 -240; 0 -270" dur="600s" begin="-${td.minute1}s" repeatCount="indefinite" calcMode="discrete" /></g><g class="sec10"><use href="#nums" transform="translate(90)" /><animateTransform id="sec10" attributeName="transform" type="translate" values="0 0; 0 -30; 0 -60; 0 -90; 0 -120; 0 -150" dur="60s" begin="-${td.second10}s" repeatCount="indefinite" calcMode="discrete" /></g><g class="sec"><use href="#nums" transform="translate(110)" /><animateTransform id="sec" attributeName="transform" type="translate" values="0 0; 0 -30; 0 -60; 0 -90; 0 -120; 0 -150; 0 -180; 0 -210; 0 -240; 0 -270" dur="10s" begin="-${td.second1}s" repeatCount="indefinite" calcMode="discrete" /></g>${milliseconds}<path d="M42.5 10 v0 m0 10 v0 M 87.5 10 v0 m0 10 v0${msDots}" stroke="${c.dotColor}" stroke-width="3" stroke-linecap="square" /></g>${showGlow}</svg>`;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = svg;
    const doc = wrapper.firstChild;
    elt.appendChild(doc);
}
initClock(document.querySelector("#clock"), { showMs: true });



function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = .7;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    text_speak.lang = 'eng';
    window.speechSynthesis.speak(text_speak);
}


function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...")
    }

    else if (hour > 12 && hour < 17) {
        speak("Good Afternoon Master...")
    }

    else {
        speak("Good Evenining Sir...")
    }
}

// window.addEventListener('load', ()=>{
//     speak("Initializing JARVIS..");
//     wishMe();
// });

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Master, How May I Help You?");
    }
   else if (message.includes('test')) {
        speak("Okey Sir ");
    }

    else if (message.includes("open google") || message.includes("open the google")) {
        window.open("https://www.google.com", "_blank");
        speak("Opening Google...")
    }
    else if (message.includes("open youtube") || message.includes("open the youtube")) {
        window.open("https://www.youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if (message.includes("open facebook") || message.includes("open the facebook")) {
        window.open("https://www.facebook.com", "_blank");
        speak("Opening Facebook...")
    }
    else if (message.includes("open instagram") || message.includes("open the instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("Opening Instagram...")
    }
    else if (message.includes("open your father") || message.includes("open the your father")) {
        window.open("https://chat.openai.com/", "_blank");
        speak("Opening My Father...")
    }

    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);
    }
    else if (message.includes("name")) {
        const finalText = "My name is Hydra or you can call it whatever you want"
        speak(finalText)
    }
    else if (message.includes("how old are you")) {
        const finalText = "i am created 2day ago"
        speak(finalText)
    }
    else if (message.includes("how are you")) {
        const finalText = "I am fine and you "
        speak(finalText)
    }

    else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }
    else if (message.includes('play chrome dino')) {
        window.open("https://chromedino.com/");
        const finalText = "Opening Chrome Dino played"
        speak(finalText);
    }
    else if (message.includes('chakra')) {
        window.open("https://chakra-ui.com/");
        const finalText = "Opening Chakra ui for react"
        speak(finalText);
    }
    else if (message.includes('material ui')) {
        window.open("https://mui.com/");
        const finalText = "Opening Material ui for react"
        speak(finalText);
    }

    else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric", second: "numeric" })
        const finalText = time;
        speak(finalText);
    }
    else if (message.includes('who are you created')) {
        const finalText = ('My founder Abdullayev Lazizbek Murodilovich and he nickname HydraCoder he is FullStack Cybersecurity and Artificial intelligence Developer');
        speak(finalText);
    }

    else if (message.includes('day')) {
        const date = new Date().toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric" })
        const finalText = date;
        speak(finalText);
    }

    else if (message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }

    else if (message.includes('telegram')) {
        window.open('https://t.me/Python_Strong')
        const finalText = "Opening telegram";
        speak(finalText);
    }
    else if (message.includes('play music')) {
        let audio = new Audio('boom.mp3')
        audio.play()
    }


    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}
