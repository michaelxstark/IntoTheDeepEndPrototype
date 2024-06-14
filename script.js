// variables for screen 1

let state;
let line1Screen1 = "This is an informative, interactive online application for improvisational performances in electronic music.";
let line2Screen1 = "You will be presented with several impulse questions and statements.";
let line3Screen1 = "You can explore these by contmeplation and reflection.";
let line4Screen1 = "Alternatively, you can apply them in practice using the virtual instrument provided by this platform.";
let line5Screen1 = "Proceed to the next page and click and hold on one of the animations.";


let lines = [line1Screen1, line2Screen1, line3Screen1, line4Screen1, line5Screen1];
let liner = "";
let counter = 0;
let lineCount = 0;
let yStart;
let xStart;
let isRunning = true;
let isPlaying = false;


// functions for buttons

function what() {
  isRunning = true;
  cleanScreen();
  state = 0;
  liner = "";
  counter = 0;
  lineCount = 0;
  yStart = height*0.05;
  xStart = width*0.05;
}


function inspires() {
  cleanScreen();
  state = 1;
}


function practice(){
  cleanScreen();
  Tone.start();
  state = 2;
}


function cleanScreen(){
  background(255);
}



// variables for screen 2

let question1 = ["Get to know the instrument.",
                 "Move the sliders, explore the tonal range.",
                 "Think about the sounds you can produce.",
                 "Try to describe them.",
                 "Keep a diary."]

let question2 = ["Listen to these two improvisations:",
                 "Derek Bailey - Improvisation(1975)-M1",
                 "Suzanne Ciani - Improvisation on 4 Sequences",
                 "How are they different from each other?",
                 "Attempt to imitate them with the instrument.",
                 "What is possible? What changes?"]


let question3 = ["Find a partner.",
                 "Improvise for a minute using the instrument.",
                 "Reflect on the experience.",
                 "What were the dynamics?",
                 "Was there an implicit agreement on dramaturgy?",
                 "Take a breath. Try again."]


let question4 = ["Compare two approaches.",
                 "Begin with a simple rhythm using a few notes.",
                 "Gradually add small embellishments.",
                 "In contrast, play as freely as you can.",
                 "Reflect on the two states."]


// variables for screen 3
let yValAttack;
let yValDecay;
let yValFMA;
let yValDelT;


// Audio functions

let synth;
let del;
let rev;

// pentatonic scale

let pentaNotes = [0, 3, 5, 7, 10];
let pentaWholeScale = [];



// general P5.js stuff and functionality of the whole page

function preload(){
  font = loadFont('fonts/BasierSquareMono-Regular.otf');
}



function setup() {
  let canvas = createCanvas(windowWidth, windowHeight*0.8);
  canvas.id('canvas-container');
  canvas.style('display', 'block');
  canvas.style('margin', 'auto');
  canvas.parent('canvas-container');

  noFill();
  textFont(font);

  yStart = height * 0.05;
  xStart = width * 0.05;

  synth = new Tone.FMSynth({
                            oscillator: {type: "sine",},
                            polyphony: 8,
                            envelope: {
                                        attack: 0.005,
                                        decay: 0.2,
                                        sustain: 0.0,
                                        release: 0.5
                              },
                              modulationEnvelope: {
                                attack: 0.005,
                                decay: 0.2,
                                sustain: 0.0,
                                release: 0.5
                              },
                              harmonicity: 8,

                          });

  del = new Tone.PingPongDelay(0.5, 0.25);
  del.wet.value = 0.25;
  del.feedback.value = 0.25;
  rev = new Tone.Reverb(2).toDestination();
  rev.wet.value = 0.05;

  synth.connect(del);
  del.connect(rev);



  yValAttack = height*0.25;
  yValDecay = height*0.25;
  yValFMA = height*0.25;
  yValDelT = height*0.25;

  for (let i = 2; i < 9; i++){
    for (let p = 0; p < pentaNotes.length; p++){
      pentaWholeScale.push(pentaNotes[p]+12*i);
    }
  }

}



function draw() {

  if (state == 0 && isRunning){

    push();
    fill(0);
    liner += lines[lineCount][counter];
    text(liner, xStart, yStart);
    pop();

    counter += 1;

    if (counter >= lines[lineCount].length){
      counter = 0;
      lineCount += 1;
      yStart += height*0.0625;
      liner = "";
    }

    if (lineCount >= lines.length){
      lineCount = 0;
      isRunning = false;
    }

  }


  else if (state == 1){
    background(255, 10);

    // first quater
    circle(width/4, height/4, (frameCount * 0.5) % (width/4.25) + width*0.0015);

    // second quater

    for (let i = Math.floor(width*0.5); i < width; i++){
      if (i % 5 == 0){
        line(i, height*0.25, i, (height * 0.5)*abs(sin(radians(frameCount+i))));
      }
    }


    // third quater

    for (let x = 0; x < width /2; x+=20){
      for (let y = height / 2; y < height; y+=20){
        let checker = random(100);
        if (checker < 5) {
          push();
          strokeWeight(2);
          point(x, y);
          pop();
        }
      }
    }

    // fourth quater

    for (let x = 0; x < 7; x++){
      push();
      noStroke();
      fill(sin(frameCount * 0.05+x)*100+100, 100);
      square(cos(radians((360/7)*x+frameCount))*width*0.2+width*0.75,
  sin(radians((360/7)*x+noise(frameCount)))*width*0.1+height*0.75, height*0.035)
      pop();
      }



    if (mouseX >= 0 && mouseX < width*0.5 && mouseY >= 0 && mouseY < height*0.5 && mouseIsPressed){
      background(255);
      push();
      fill(0);
      for (let s = 0; s < question1.length; s++){
        text(question1[s], width*0.05, height*0.05+s*height*0.05);
      }
      pop();
    }

    else if (mouseX > width * 0.5 && mouseX < width && mouseY < height*0.5 && mouseY > 0 && mouseIsPressed){
      background(255);
      push();
      fill(0);
      for (let s = 0; s < question1.length; s++){
        text(question2[s], width*0.05.length, height*0.05+s*height*0.05);
      }
      pop();
    }

    else if (mouseX >= 0 && mouseX < width * 0.5 && mouseY >= height*0.5 && mouseY < height && mouseIsPressed){
      background(255);
      push();
      fill(0);
      for (let s = 0; s < question1.length; s++){
        text(question3[s], width*0.05.length, height*0.05+s*height*0.05);
      }
      pop();
    }

    else if (mouseX > width * 0.5 && mouseX < width && mouseY > height*0.5 && mouseY < height && mouseIsPressed){
      background(255);
      push();
      fill(0);
      for (let s = 0; s < question1.length; s++){
        text(question4[s], width*0.05.length, height*0.05+s*height*0.05);
      }
      pop();
    }

  }

  else if (state == 2){
    background(255)
    line(width*0.1, height*0.5, width*0.9, height*0.5);


    //delayTime Slider
    if(mouseX > width*0.1 && mouseX < width*0.3 && mouseY >= 0 && mouseY < height*0.5 && mouseIsPressed){
      yValDelT = mouseY;
    }


    push();
    fill(0);
    text("delay time", width*0.1, 10);
    pop();


    push();
    noStroke();
    fill(200, 100);
    rect(width*0.1, 0, width*0.2, yValDelT);
    pop();



    //fm amount Slider
    if(mouseX > width*0.3 && mouseX < width*0.5 && mouseY >= 0 && mouseY < height*0.5 && mouseIsPressed){
      yValFMA = mouseY;
    }


    push();
    fill(0);
    text("fm amount", width*0.3, 10);
    pop();


    push();
    noStroke();
    fill(150, 100);
    rect(width*0.3, 0, width*0.2, yValFMA);
    pop();



    //attackSlider
    if(mouseX > width*0.5 && mouseX < width*0.7 && mouseY >= 0 && mouseY < height*0.5 && mouseIsPressed){
      yValAttack = mouseY;
    }


    push();
    fill(0);
    text("attack", width*0.5, 10);
    pop();


    push();
    noStroke();
    fill(100, 100);
    rect(width*0.5, 0, width*0.2, yValAttack);
    pop();



    //decaySlider

    if (mouseX > width*0.7 && mouseX < width*0.9 && mouseY >= 0 && mouseY < height*0.5 && mouseIsPressed){
      yValDecay = mouseY;
    }

    push();
    fill(0);
    text("decay", width*0.7, 10);
    pop();


    push();
    noStroke();
    fill(50, 100);
    rect(width*0.7, 0, width*0.2, yValDecay);
    pop();
  }


}


function mousePressed(){
  if(state == 2 && mouseY > height*0.5 && mouseY <= height){

    let att = map(yValAttack, 0, height*0.5, 0.00001, 0.5);
    let dec = map(yValDecay, 0, height*0.5, 0.0001, 1);
    let delTime = map(yValDelT, 0, height*0.5, 0.0001, 1);
    let currentIndex = Math.floor(map(mouseX, 0, width, 0, pentaWholeScale.length));
    let currentNote = pentaWholeScale[currentIndex];
    let freq = Math.pow(2, (currentNote - 69) / 12) * 440;


    synth.envelope.attack = att;
    synth.envelope.decay = dec;
    synth.envelope.release = dec;
    synth.modulationEnvelope.attack = att;
    synth.modulationEnvelope.decay = dec;
    synth.modulationEnvelope.release = dec;
    synth.harmonicity.value = map(yValFMA, 0, height*0.5, 1, 10);

    let now = Tone.now();
    del.delayTime.rampTo(delTime, 0.25, now);

    synth.triggerAttackRelease(freq, att+dec);
  }

}
