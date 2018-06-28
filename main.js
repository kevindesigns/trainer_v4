$(function () {

  // Elements
  const $strategyText = $('#strategyText')
  const $blank = $('#blank')
  const $audio = $('audio');

  // Wavesurfer Instance
  const wavesurfer = WaveSurfer.create({
    container: '#wavesurfer',
    waveColor: 'red',
    progressColor: 'purple',
    cursorColor: 'transparent',
    cursorWidth: 0,
    barWidth: 5,
  });

  // Create Modal 
  var createModal = function (content) {
    document.getElementById('modal-container').innerHTML = '<div id="modal1" class="modal1">' + content + '</div>';
  };

  // Random Number Generator 
  function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Page Load Modal Window
  var modal1 = '<div class="modalcontent1"><h1></h1><p>Press the button below to begin testing your British accent.</p><button class="button" id = "button1">Start</button></div>'
  createModal(modal1);
  // document.getElementById('button1').onclick = function () {
  // document.getElementById('modal1').style.display = "none"
  // }; 

  var button = document.getElementsByClassName('button')[0].onclick = function () {
    var modal = document.getElementById('modal1');
    modal.classList.add('hide1');
    audio.play();
  }

  // Mic up 🎤
  const microphone = Object.create(WaveSurfer.Microphone);
  microphone.init({ wavesurfer });

  // Annyang
  annyang.setLanguage('en-GB');



  // Our things
  let timer = null;
  let currentPhrase = 0;
  let totalPhrases = 5


  const nextCmd = function () {
    // Cancel timer if its running
    if (timer) clearTimeout(timer);

    // Play sound & get new phrase
    audio.play();
    generateRandomStrategy();

    // Increment phrase
    currentPhrase = currentPhrase + 1;

    // Check if we're done.
    if (currentPhrase >= totalPhrases) {

      // We're done. Show modal
      showModal();


    } else {

      // Not done, let's set another timer
      timer = setTimeout(nextCmd, 5000);

    }
  }
  

  // Let's define our first command. First the text we expect, and then the function it should call
  const commands = {
    'okay': () => {
      currentPhrase = 0;
      $strategyText.css('display', 'block');
      $blank.css('display', 'none');

      nextCmd();
      microphone.start();
    },
    'Mind the gap': nextCmd,
    'Cheers mate': nextCmd,
    'Are you in the queue': nextCmd,
    'Cheeky': nextCmd,
    'Fancy a cup of tea': nextCmd,
    'Bloody hell': nextCmd,
    'Have you gone mad': nextCmd,
    'Rubbish': nextCmd,
    'Hang on a minute': nextCmd,
    'Wanker': nextCmd,
    'What a load of poppycock': nextCmd,
    'Unexpected item in the bagging area': nextCmd,
    'Brilliant': nextCmd,
    'Can I have a flat white': nextCmd,
    'Is you mental': nextCmd,
    'What are you on about': nextCmd,
    'Proper': nextCmd,
    'You alright mate': nextCmd,
    'Right yes of course': nextCmd,
    'Its bait man': nextCmd,

  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();

  const obliqueStrategy = [
    '"Mind the gap"',
    '"Unexpected item in the bagging area"',
    '"Are you in the queue?"',
    '"Cheeky"',
    '"Cheers mate!"',
    '"Fancy a cup of tea?"',
    '"Bloody hell!"',
    '"Have you gone mad?"',
    '"Rubbish!"',
    '"Hang on a minute!"',
    '"Wanker"',
    '"What a load of poppycock!"',
    '"Brilliant!"',
    '"Can I have a flat white?"',
    '"Is you mental?"',
    '"What are you on about?"',
    '"Proper"',
    '"You alright mate?"',
    '"Right, yes of course"',
    '"Its bait man"',
  ];

  function generateRandomStrategy() {
    const randomOffset = Math.floor(Math.random() * 100) % obliqueStrategy.length;
    $('#strategyText .highlight').html(obliqueStrategy[randomOffset]);
  }

  function showModal() {
    // Try Again Modal Window
    var modal1 = '<div class="modalcontent2"><p>You are <span id="random-number"></span>% British</p><button class="button" id = "button2">Try Again</button></div>'
    createModal(modal1);

    // Try Again Modal Random Score
    document.getElementById('random-number').innerHTML = randomNumberGenerator(38, 93);

    var button = document.getElementsByClassName('button')[0].onclick = function () {
      var modal = document.getElementById('modal1');
      modal.classList.add('hide1');
      location.reload();
      audio.play();
    }
  }

});
