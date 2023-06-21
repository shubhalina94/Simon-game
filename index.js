var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var level=0;
var started=false;
$(document).keydown(function () {
    if(!started){
        $("level-title").text("Level "+level);
        nextSequence();
        started=true;
    }

});


$(".btn").click(function () {
    var userChosenColour=$(this).attr("id") ; //store the id of the button that got clicked
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
       
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
    }
        
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
           $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);

    var randomNumber=Math.floor (Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //to play the sound of the random color button
    //var audio=new Audio("sounds/"+randomChosenColour+".mp3");
    //audio.play();
    playSound(randomChosenColour);
    

}

function playSound(name){ //to play the sound for the button clicked by user
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    gamePattern=[];
    started=false;
    level=0;
}