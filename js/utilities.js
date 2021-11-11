'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/
function getRandomInteger(min,max)
{
    return Math.floor((max-min+1)*Math.random())+min
}
//console.log(getRandomInteger(1,6))
function throwDice(n,dice)
{
    let x=0;
    for(let i=0;i<n;i++)
    {
        x+=getRandomInteger(1,dice)
    }
    return x
}
//console.log(throwDice(4,8))

function getmode()
{
    let x
    do{
        x=prompt("choisissez le mode:facile ou normal ou difficile")
    }while(x!="facile" && x!="normal" && x!="difficile")
    return x
} 

