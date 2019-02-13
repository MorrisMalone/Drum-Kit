const boom = new Audio("sounds/boom.wav");          // make object sounds
const clap = new Audio("sounds/clap.wav");
const hiHat = new Audio("sounds/hihat.wav");
const kick = new Audio("sounds/kick.wav");
const openHat = new Audio('sounds/openhat.wav');
const ride = new Audio('sounds/ride.wav');
const snare = new Audio('sounds/snare.wav');
const tink = new Audio('sounds/tink.wav');
const tom = new Audio('sounds/tom.wav');

const drumInstruments = [                               //create each object
    {name: 'boom', inst: boom, assKey: 'a'},            // assKey == associated key ;)
    {name: 'clap', inst: clap, assKey: 's'},
    {name: 'hiHat', inst: hiHat, assKey: 'd'},
    {name: 'kick', inst: kick, assKey: 'f'},
    {name: 'openHat', inst: openHat, assKey: 'g'},
    {name: 'ride', inst: ride, assKey: 'h'},
    {name: 'snare', inst: snare, assKey: 'j'},
    {name: 'tink', inst: tink, assKey: 'k'},
    {name: 'tom', inst: tom, assKey: 'l'}
]

const keys = drumInstruments.map(elem => elem.assKey); // letters used

// create instrument-boxes to be played
const instrumentsContainer = document.getElementById('instruments-container');

function createInstrumentsBoxes() {

    drumInstruments.forEach(instrument => {
        let div = document.createElement('div');
        let hName = document.createElement('h2');
        let pKey = document.createElement('p');

        div.setAttribute('id', `${instrument.name}`);
        div.setAttribute('data-key', `${instrument.assKey}`);
        div.classList.add('instrument');
        div.addEventListener('transitionend', removeTransition);
        div.addEventListener('click', playMe);
        
        hName.textContent = instrument.assKey.toUpperCase();
        pKey.textContent = instrument.name.toUpperCase();

        div.appendChild(hName);
        div.appendChild(pKey);

        instrumentsContainer.appendChild(div);
    })
}

function playMe(e) {
    if (e.target.parentNode.classList.value == 'instrument') {
        playSound(e.target.parentNode.getAttribute('data-key'));
    } else playSound(e.target.getAttribute('data-key'));
}

createInstrumentsBoxes();

function playInstrument(e) {
    let keyPressed = e.key.toLowerCase();
    if (!keys.includes(keyPressed)) return; // no need to continue if the letter is not associated to a div/sound

    playSound(keyPressed);
}

function playSound(keyPressed) {
    const instrument = document.querySelector(`div[data-key=${keyPressed}]`);   // select the div
    const soundToPlay = drumInstruments.filter(elem => elem.name == instrument.id)[0];   // select the sound that corresponds to the div/instrument

    instrument.classList.add('playing');  // short animation each time the sound is played
    soundToPlay.inst.currentTime = 0;      // prevent default behavior that if a sound is playing it normally doesn't play it again
    soundToPlay.inst.play();
}

// we need to remove the playing animation once it is played
    // add an eventListener to all instrument/boxes


function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

window.addEventListener('keydown', playInstrument);

