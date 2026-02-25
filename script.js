const buttonKeys = document.querySelectorAll(".box")
const startButton = document.querySelector(".startButt")

var level = 1;
var attempts = 3;

var randomPasscode = [];

const attemptsBox = document.querySelector(".atts");
const stats = document.querySelector(".statbar");
const lev = document.querySelector(".lev");

var onGame = false;

//Start the Game

startButton.addEventListener("click", function(){

if(!onGame){
    console.log("clicked!");
        
    PatternSystem();
    onGame = true;

    attemptsBox.style.display = "block";
    stats.style.display = "block";
    lev.style.display = "block";
} else {
    document.querySelector(".status").textContent = `Already in game!`;
}
})



function PatternSystem(){

    document.querySelector(".level").textContent = `${level}`;
    document.querySelector(".attempts").textContent = `${attempts}`;
    buttonKeys.forEach(key => {
    key.classList.add("beep");
    document.querySelector(".cont").classList.add("beep");

    setTimeout(() => {key.classList.remove("beep")
        document.querySelector(".cont").classList.remove("beep");      
    }, 1000);
    })
    document.querySelector(".status").textContent = "";
    document.querySelector(".status").textContent = `Please Watch the Following Passcode...!`;


    switch(level){
    case 1:
        ShowCode(1, 2000)
    break;
    case 2:
        ShowCode(3, 1000)
    break;
    case 3:
        ShowCode(5, 1000)
    break;
    case 4:
        ShowCode(5, 1000)
    break;
    case 5:
        ShowCode(6, 1000)
    break;
    case 6:
        ShowCode(7, 1000)
    break;
    case 7:
        ShowCode(8, 1000)
    break;
    case 8:
        ShowCode(14, 500)
    break;
    case 9:
        ShowCode(16, 300)
    break;
    case 10:
        ShowCode(16, 100)
    break;
    }

}

function ShowCode(difficulty, speed){

    randomPasscode.length = 0;
    // console.log(randomPasscode);

        const bitbybit = setInterval(() => {
        let randomVal = Math.floor(Math.random() * 8) + 1;
        // console.log(randomVal)
        randomPasscode.push(randomVal)
        RenderCode(randomVal, speed)

        if(randomPasscode.length === difficulty){
            clearInterval(bitbybit);
            setTimeout(() => {
                document.querySelector(".cont").classList.add("beep");
                document.querySelector(".status").textContent = `Please Enter the Passcode`;
                            GameMode()
                  }, speed);
            console.log(randomPasscode)
        }
        }, 1500)
        // console.log(randomPasscode)
}

function RenderCode(passKey, speed){
console.log(passKey)

buttonKeys.forEach(key => {
    if(Number(key.id) === passKey){
    key.classList.add("signal");
    setTimeout(() => {key.classList.remove("signal")
    }, speed);
    }
})
}

function GameMode(){

    var index = 0;

buttonKeys.forEach(key => {

key.onclick = function() {
    // console.log(key.id)
    key.classList.add("signal");
    setTimeout(() => {key.classList.remove("signal")
    }, 500);

    console.log("key.id", key.id)
    console.log("randomPasscode[index]", randomPasscode[index])

    if(Number(key.id) === randomPasscode[index]){
    key.classList.add("good");
    index++;
    console.log(index)

    } else {
        console.log("Try Again!")
        document.querySelector(".status").textContent = "Try Again!";

        index = 0;
        attempts--;
        console.log(`${attempts} Attempts Left!`)
        document.querySelector(".attempts").textContent = `${attempts}`;
        buttonKeys.forEach(key => {
           key.classList.remove("good");
           key.classList.add("bad");
           document.querySelector(".cont").classList.add("bad");

        setTimeout(() => {key.classList.remove("bad")  
            document.querySelector(".cont").classList.remove("bad"); 
    }, 500);
        })
        if(attempts <= 0){
            console.log("You lost the Passcode!")
            document.querySelector(".status").textContent = "You lost the passcode!";
            level = 1;
            attempts = 3;
            document.querySelector(".tryAgainmsg").style.display = "block";
            onGame = false;
            document.querySelector(".cont").classList.add("bad");

        buttonKeys.forEach(key => {
                    key.onclick = null;
        })
        }
    }

    if(index === randomPasscode.length){
        console.log("Wins!");
        document.querySelector(".status").textContent = "You Win!";
        level++;
        index = 0;
        attempts = 3;
        document.querySelector(".attempts").textContent = `${attempts}`;
        console.log("Next Level");
        NextRound();
    }

}
})
}

function NextRound(){
    let time = 3;
    console.log(time)
    let clock = setInterval(() => 
        {
           document.querySelector(".status").textContent = `Next Round in ${time}`;
            time--;
            if(time < 0){
                clearInterval(clock);
  
                document.querySelector(".status").textContent = ``;
                buttonKeys.forEach(key => {
                key.classList.remove("good");
                key.onclick = null;
                });
                              PatternSystem();
                console.log(randomPasscode);
            };
        }, 1000);
}
