var playing = false;
var score;
var trialsLeft;
var fruits = ['apple', 'coin', 'dynia'];
//, 'blueberry', 'cherry', 'coconut', 'grapes', 'mango', 'orange', 'pear', 'plum', 'strawberry', 'watermelon'
var step;
var action;

$(function(){
	//click on start / reset button
	$("#startreset").click(function(){
		//are we playing?
		//yes
		if(playing == true){
			//reload page
			location.reload();
		}
		else{
		//no
		playing = true;
		score = 0;
		$("#scorevalue").html(score);
	
		//show trials left
		$("#trialsLeft").show();
		trialsLeft = 3;
		addHearts();

		$("#gameover").hide();
		
		//change button text to reset game
		$("#startreset").html("Reset Game");
		
		startAction();
}		
});


$("#fruit1").mouseover(function(){
    if(z=='apple'){
        score+=1;
        document.getElementById("slicesound").play();
        $("#scorevalue").html(score);
    
    //stop fruit
    clearInterval(action);
    
    $("#fruit1").hide("explode", 500);
    
    //send new fruit
    setTimeout(startAction, 500);
    }
    else if(z=='coin'){
        score+=10;
        document.getElementById("slicesound").play();
        $("#scorevalue").html(score);
    
    //stop fruit
    clearInterval(action);
    
    $("#fruit1").hide("explode", 500);
    
    //send new fruit
    setTimeout(startAction, 500);
    }
    else{
        score=score;
        trialsLeft --;
        addHearts();
        document.getElementById("fail").play();
        if(trialsLeft<1){


            playing = false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html('<p>Game Over</p><p>Your score is '+ score +'</p>')
                $("#trialsLeft").hide();
            stopAction();
            
        $("#scorevalue").html(score);
    
   

        }
        else{
             $("#scorevalue").html(score);
    
    //stop fruit
    clearInterval(action);
    
    $("#fruit1").hide("explode", 500);
    
    //send new fruit
    setTimeout(startAction, 500);
        }
    }
            
   
})
        
    
   

function addHearts(){
	$("#trialsLeft").empty();
	for(i = 0; i < trialsLeft; i++){
		$("#trialsLeft").append('<img src="images/heart.png" class="life">');
	}
}

function startAction(){
	//1. create a random fruit
	$("#fruit1").show();
	chooseFruit();
	$("#fruit1").css({'left':Math.round(750*Math.random()), 'top':-50});

	//define a random step
	step = 1+Math.round(5*Math.random());

	//2. move fruit down one step every 10ms

	action = setInterval(function(){
		$("#fruit1").css('top',$("#fruit1").position().top + step);

        
    if(z=='apple'){
        //is fruit too low?
        if($("#fruit1").position().top > $("#fruitsContainer").height()){

            //yes -> any trials left?
            if(trialsLeft > 1){
                $("#fruit1").show();
            chooseFruit();
            $("#fruit1").css({'left':Math.round(750*Math.random()), 'top':-50});

            //define a random step
            step = 2+Math.round(5*Math.random());

            //reduce trials by one               

            trialsLeft --;
            addHearts();
            }
            else{
                //game over
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html('<p>Game Over</p><p>Your score is '+ score +'</p>')
                $("#trialsLeft").hide();

                stopAction();
            }
        }
    }
    else{
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
	
            //yes -> any trials left?
            if(trialsLeft > 0){
                $("#fruit1").show();
            chooseFruit();
            $("#fruit1").css({'left':Math.round(750*Math.random()), 'top':-50});

            //define a random step
            step = 2+Math.round(5*Math.random());

            //reduce trials by one               

            
            addHearts();
            }
            
              
            }
            }
        

}, 10);

}

function chooseFruit(){
    z = fruits[Math.round(2*(Math.random()))]
	$("#fruit1").attr('src', 'images/'+z+'.png');
}

//stop dropping fruits
function stopAction(){
	clearInterval(action);
	$("#fruit1").hide();

}
});