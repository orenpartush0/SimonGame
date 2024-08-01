
var toGuess = [];
var userGuess = [];
var level = 1;
var userGuessCounter = 0;

disableButton();





function disableButton() 
{
    $('blue').disable = true;
    $('red').disable = true;
    $('yellow').disable = true;
    $('green').disable = true;
}



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.addEventListener('keydown', async function(event) {
    if (event.key === 'a' || event.key === 'A') {
        $('blue').disable = false;
        $('red').disable = false;
        $('yellow').disable = false;
        $('green').disable = false;
        $('h1').text('Level ' + level);
        await levelUp();
    }
});

async function pressButton(color)
{
    debugger;
    switch(color)
    {
        case 0:
            $('#blue').addClass('pressed');
            await new Audio('./sounds/blue.mp3').play();
            await delay(400);
            $('#blue').removeClass('pressed');
            break;
        case 1:
            $('#red').addClass('pressed');
            await new Audio('./sounds/red.mp3').play();
            await delay(400);
            $('#red').removeClass('pressed');
            break;
        case 2:
            $('#yellow').addClass('pressed');
            await new Audio('./sounds/yellow.mp3').play();
            await delay(400);
            $('#yellow').removeClass('pressed')
            break;
        case 3:
            $('#green').addClass('pressed');
            await new Audio('./sounds/green.mp3').play();
            await delay(400);
            $('#green').removeClass('pressed');
            break;
    }
}

async function levelUp() 
{
    $('h1').text('Level ' + level);

    for (var i = 0; i < level; i++) 
    {
        toGuess.push(Math.floor(Math.random() * 4));
        await pressButton(toGuess[i]);
    }
}

$('#blue').click(async () => 
    {
        userGuess.push(0);
        userGuessCounter ++;
        await pressButton(0);
        await check();
    });

$('#red').click(async() => 
    {
        userGuess.push(1);
        userGuessCounter ++;
        await pressButton(1);
        await check();
    });

$('#yellow').click(async() =>
    {
        userGuess.push(2);
        userGuessCounter ++;
        await pressButton(2);
        await check();
    });

$('#green').click(async() =>
    {
        userGuess.push(3);
        userGuessCounter ++;
        await pressButton(3);
        await check();
    });


async function check()
{
    if(userGuess[userGuessCounter - 1] != toGuess[userGuessCounter - 1])
    {
        toGuess = [];
        userGuess = [];
        level = 1;
        userGuessCounter = 0;
        $('h1').text('Game Over, Press A to Restart');
        await new Audio('./sounds/wrong.mp3').play();
        disableButton();
    }
    else if(userGuessCounter == level)
    {
        userGuess = [];
        toGuess = [];
        userGuessCounter = 0;
        level ++;
        await levelUp();
    }
}