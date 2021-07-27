var level = 0;  //Level 0 implies start or game over state

var gamePattern = [];   //Stores Actual order of colours

var userClickedPattern = [];    //Stores Clicked order of colours

var buttonColours = ["red" , "blue" , "green" , "yellow"];

$(".btn").click(function (event) {

    if(level)
    {
        var userChosenColour = this.id;

        userClickedPattern.push(userChosenColour);
        
        playSound(userChosenColour);
        
        animatePress(userChosenColour);
        
        checkAnswer(level);
    }

});     //If a button clicked, add it to Clicked order of colours and check with Actual order

$(document).on("keypress", function(){
    
    if(!level)
    {
        gamePattern = [];

        userClickedPattern = [];

        nextSequence();
    }

});     //If on Gameover or Start key pressed, start from Level 1

function nextSequence()     //Blink some random colour and add it to Actual order, empty Clicked order and change Level
{
    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(4*Math.random());
    
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeToggle(100).fadeToggle();
    
    playSound(randomChosenColour);
    
    userClickedPattern = [];
}

function playSound(name)    //Play the input sound
{
    var audio = new Audio("sounds/"+ name +".mp3");

    audio.play();
}

function animatePress ( currentColour )     //Animate button when clicked/pressed
{
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        
        $("#" + currentColour).removeClass("pressed");

    }, 100);
}

function checkAnswer( currentLevel )    //To compare Clicked order so far with Actual order
{

    if(userClickedPattern.length === currentLevel && userClickedPattern.toString() === gamePattern.toString())  //If exact match
    {
        setTimeout(function(){

            nextSequence();

        }, 1000);
    }
    else if( userClickedPattern.toString() != gamePattern.slice(0,userClickedPattern.length).toString())    //If wrong at some point till now
    {
        playSound("wrong");
        
        $("body").addClass("game-over");
        
        $("h1").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function(){
        
            $("body").removeClass("game-over");
        
        }, 500);
        
        level = 0;
    }
    //Else wait for further click
}