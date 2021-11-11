'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
const NORMAL="normal"
const EASY="facile"
const HARD="difficile"
var pvDragon,pvPlayer,level,attacker,round,PD,Dragon,Player,srcdragon,srcplayer,modePlayer
/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/

//initialisation
function calculPVplayer(level)
{
    let pv
    switch(level)
    {   case NORMAL:
        case EASY:
            pv=100+throwDice(10,10);
        break;
        case HARD:
            pv=100+throwDice(7,10);
        break;
    }
    return pv
}
function calculPVdragon(x)
{
    let pv
    switch(x)
    {   case NORMAL:
        case HARD:
            pv=100+throwDice(10,10);
        break;
        case EASY:
            pv=100+throwDice(5,10);
        break;
    }
    return pv
}
function getfaster()
{
    let player,dragon
    do{
    player=throwDice(10,6)
    dragon=throwDice(10,6)
    }while(player==dragon)

    if(modePlayer=="voleur")
    player+=player*throwDice(1,6)/100

    if(player>dragon)
     return "player"
    if(dragon>player)
     return "dragon"
}
function affichePV()
{
    if(pvDragon>0 && pvPlayer>0)
    document.write("<div class='game-state'><figure class='game-state_player'><img src='",srcplayer,"' alt='Chevalier'><figcaption>","<progress max=",Player," value=",pvPlayer,"></progress>",pvPlayer,"  PV</figcaption></figure><figure class='game-state_player'><img src='",srcdragon,"' alt='Dragon'><figcaption>","<progress max=",Dragon," value=",pvDragon,"></progress>",pvDragon,"  PV</figcaption></figure></div>")
    if(pvDragon>0 && pvPlayer<0)
    document.write("<div class='game-state'><figure class='game-state_player'><img src='",srcplayer,"' alt='Chevalier'><figcaption>","<h4>GAME OVER</h4>","</figcaption></figure><figure class='game-state_player'><img src='",srcdragon,"' alt='Dragon'><figcaption>","<progress max=",Dragon," value=",pvDragon,"></progress>",pvDragon,"  PV</figcaption></figure></div>")
    if(pvDragon<0 && pvPlayer>0)
    document.write("<div class='game-state'><figure class='game-state_player'><img src='",srcplayer,"' alt='Chevalier'><figcaption>","<progress max=",Player," value=",pvPlayer,"></progress>",pvPlayer,"  PV</figcaption></figure><figure class='game-state_player'><img src='",srcdragon,"' alt='Dragon'><figcaption>","<h4>GAME OVER</h4>","</figcaption></figure></div>")
}
function calculPD(getfast)
{
    let PD=throwDice(3,6)
    if(getfast=="dragon" && modePlayer=="chevalier")
    {
        PD-=PD*(throwDice(2,6)/100)*throwDice(1,10)/100
    }
    if(getfast=="player"  && modePlayer=="mage")
    {
        PD+=PD*(throwDice(2,6)/100)*throwDice(1,10)/100
    }
    if(getfast=="dragon" && level==EASY )
    {
        PD-=PD*throwDice(2,6)/100
    }
    if(getfast=="player" && level==EASY)
    {
        PD+=PD*throwDice(2,6)/100
    }
    if(getfast=="dragon" && level==HARD)
    {
        PD+=PD*throwDice(1,6)/100
    }
    if(getfast=="player" && level==HARD)
    {
        PD-=PD*throwDice(1,6)/100
    }
    return PD
}
function nouveauPV(attacker,PD)
{
    if(attacker=="dragon")
    {
        pvPlayer-=PD
    }
    if(attacker=="player")
    {
        pvDragon-=PD
    }
}
function END()
{
    if(pvDragon<0)
    {
        document.write("<footer><h3>Fin de la partie</h3><figure class='game-end'><figcaption>Vous avez gagné le combat,  vous avez carbonisé le dragon !</figcaption><img src='images/knight-winner.png' alt='Dragon vainqueur'></figure></footer>")
    }
    if(pvPlayer<0)
    {
        document.write("<footer><h3>Fin de la partie</h3><figure class='game-end'><figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption><img src='images/dragon-winner.png' alt='Dragon vainqueur'></figure></footer>")
    }
}
function affichetour(attacker)
{   document.write("<h3>Tour n°",round,"</h3>")
    PD=calculPD(attacker)
    if(attacker=="player")
    document.write("<figure class='game-round'><img src='images/knight-winner.png' alt='Chevalier vainqueur'><figcaption>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ",PD," points de dommage !</figcaption></figure>")
    if(attacker=="dragon")
    document.write("<figure class='game-round'><img src='images/dragon-winner.png' alt='Dragon vainqueur'><figcaption>Le dragon prend l'initiative, vous attaque et vous inflige ",PD," points de dommage !</figcaption></figure>")
    nouveauPV(attacker,PD)
    image()
    affichePV()
}
function image()
{
    if(pvPlayer<0.3*Player)   
    srcplayer="images/knight-wounded.png"
    else 
    srcplayer="images/knight.png"
    if(pvDragon<0.3*Dragon)
    srcdragon="images/dragon-wounded.png"
    else
    srcdragon="images/dragon.png"
}
function selectmode()
{
    do{
    modePlayer=prompt("donner le type de joueur : chevalier,voleur ou mage :")
    }
    while(modePlayer!="chevalier" && modePlayer!="voleur" && modePlayer!="mage")
    return modePlayer
}
/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
level=getmode()
modePlayer=selectmode()
pvDragon=calculPVdragon(level)
Dragon=pvDragon
pvPlayer=calculPVplayer(level)
Player=pvPlayer
image()
affichePV()
round=1
do{
    affichetour(getfaster())
    round++
}while(pvDragon>0 && pvPlayer>0)
END()
