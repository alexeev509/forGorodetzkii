
var maxCountOfCars=6;
var minCountOfCars=1;
var maxdeltaBetweenCars=130;
var mindeltaBetweenCars=80;
var deltaLenBetweenCars=0;
var countOfCars=0;
var stateOfTrafficLights=0;
//0 - green
//1 - yellow
//2 - red
var massOfFirsBandCars=[];
var massOfSecondBandCars=[];
var massOfThirdBandCars=[];

var currentId=0;
//0-forward

//1-right
//2-left

var massOfDirections=[];

function createCars() {
    createCarsForEveryBand("startPositionFirst");
    createCarsForEveryBand("startPositionSecond");
 createCarsForEveryBand("startPositionThird");

}

function directionOfCars(e) {
    var punktOfList=document.getElementById("directionList");
    var list=document.getElementById("directionList");
    list.style.visibility="visible";
    currentId=e.target.id;
    if(massOfDirections[currentId]==0 || massOfDirections[currentId]==1 ||massOfDirections[currentId]==2 ) {
        punktOfList.options[massOfDirections[currentId]].selected =true ;
    }

}
function createCarsForEveryBand(nameOfClass) {
    countOfCarsForThirdBand=Math.floor(Math.random()*(maxCountOfCars-minCountOfCars)+minCountOfCars);
    for(var i=0;i<countOfCarsForThirdBand;i++) {
        var createCar = document.createElement("div");
        createCar.className = "circle "+nameOfClass;
        createCar.id=countOfCars;
        if(i!=0) {
            createCar.style.left = parseInt(deltaLenBetweenCars.left)+Math.floor(Math.random() * (maxdeltaBetweenCars - mindeltaBetweenCars) + mindeltaBetweenCars) + "px";
        }
         deltaLenBetweenCars=window.getComputedStyle(createCar,null);
        document.body.appendChild(createCar);
        if(nameOfClass=="startPositionFirst") {
            massOfFirsBandCars[i] = createCar;
        }
        else if(nameOfClass=="startPositionSecond"){
            massOfSecondBandCars[i]=createCar;
        }
        else {
            massOfThirdBandCars[i]=createCar;
        }
        countOfCars++;
    }
    stateOfTrafficLights=Math.floor(Math.random()*(2-0)+0);
    changeColorOfTrafficLight();
    var massOfCars=document.getElementsByClassName("circle");
    for(var i=0;i<massOfCars.length;i++){
        massOfCars[i].addEventListener("click",directionOfCars);
        massOfCars[i].style.textAlign="center";
        massOfCars[i].innerHTML=massOfCars[i].id;
    }
    //All car go forward if we dont choose direction
    for(var i=0;i<massOfCars.length;i++){
        massOfDirections[i]=0;
    }
}

function start() {
    window.setInterval(changeColorOfTrafficLight,2000);
    for(var i=0; i<countOfCars; i++) {
        var timerMulti = window.setInterval( function(j)
        {
            return function() { run(j); };
        }(i), 100);
   }
}

function run(carId){
    var carExamplar=document.getElementById(carId);
    console.log(carExamplar.className)
    var direction=window.getComputedStyle(carExamplar,null);
    if(carExamplar.className=="circle startPositionSecond" && parseInt(direction.left)>=687 && massOfDirections[carId]==2){
        if(lengthAnotherCarsToCentre()) {
            carExamplar.style.top = parseInt(direction.top) - 15 + 'px';
        }
    }else {
        if(lenghtBetweenCars(carExamplar) && colorOfTrafficLight(carExamplar)) {
            carExamplar.style.left = parseInt(direction.left) + 10 + 'px';
        }
    }
}

function changeColorOfTrafficLight(){
    var green=document.getElementsByClassName("trafficLight trafficLightFirst");
    var yellow=document.getElementsByClassName("trafficLight trafficLightSecond");
    var red=document.getElementsByClassName("trafficLight trafficLightThird");
    if(stateOfTrafficLights==0){
        green[0].style.backgroundColor="green";
        yellow[0].style.backgroundColor="white";
        red[0].style.backgroundColor="white";
        stateOfTrafficLights=1;

    }else if(stateOfTrafficLights==1){
        green[0].style.backgroundColor="white";
        yellow[0].style.backgroundColor="yellow";
        red[0].style.backgroundColor="white";
        stateOfTrafficLights=2;
    }else {
        green[0].style.backgroundColor="white";
        yellow[0].style.backgroundColor="white";
        red[0].style.backgroundColor="red";
        stateOfTrafficLights=0;
    }
}

function lengthAnotherCarsToCentre() {
    var bb=true;
    for(var i=0;i<massOfFirsBandCars.length;i++){
        var direction=window.getComputedStyle(massOfFirsBandCars[i],null);
        if(parseInt(direction.left)>430 && parseInt(direction.left)<760){
            bb=false;
        }
    }
    return bb;
}

function lenghtBetweenCars(targetCar) {
    var lenghtLess60=true;
    var directionOfTarget=window.getComputedStyle(targetCar,null);
    if(targetCar.className=="circle startPositionFirst"){
        if(parseInt(targetCar.id)!=massOfFirsBandCars.length-1){
            //расстояние до впереди стоящей машины
            directionOfAnotherCar=window.getComputedStyle(massOfFirsBandCars[parseInt(targetCar.id)+1],null);
            if(Math.abs(parseInt(directionOfTarget.left)-parseInt(directionOfAnotherCar.left))<80){
                lenghtLess60=false;
            }
        }
    }
    else if(targetCar.className=="circle startPositionSecond"){

        if(parseInt(targetCar.id)!=massOfFirsBandCars.length+massOfSecondBandCars.length-1){
            //расстояние до впереди стоящей машины
            directionOfAnotherCar=window.getComputedStyle(massOfSecondBandCars[parseInt(targetCar.id)-massOfFirsBandCars.length+1],null);
            if(Math.abs(parseInt(directionOfTarget.left)-parseInt(directionOfAnotherCar.left))<80
                && Math.abs(parseInt(directionOfTarget.top)-Math.abs(parseInt(directionOfAnotherCar.top)))<5
                ){
                        lenghtLess60=false;
            }
        }
    }else {
        if(parseInt(targetCar.id)!=massOfFirsBandCars.length+massOfSecondBandCars.length+massOfThirdBandCars.length-1){
            //расстояние до впереди стоящей машины
            directionOfAnotherCar=window.getComputedStyle(massOfThirdBandCars[parseInt(targetCar.id)-massOfFirsBandCars.length-massOfSecondBandCars.length+1],null);
            if(Math.abs(parseInt(directionOfTarget.left)-parseInt(directionOfAnotherCar.left))<80){
                lenghtLess60=false;
            }
        }
    }

    return lenghtLess60;
}

function colorOfTrafficLight(targetCar) {
    bb=true;
    var direction=window.getComputedStyle(targetCar,null);
    if(stateOfTrafficLights==0 && parseInt(direction.left)>560 && parseInt(direction.left)<600 && parseInt(direction.top)>320 ){
        bb=false
    }
    return bb;
}


function onSelectList() {
    var punktOfList=document.getElementById("directionList");
    if(punktOfList.selectedIndex==0){
        massOfDirections[currentId]=0;
    }
    else if(punktOfList.selectedIndex==1){
        massOfDirections[currentId]=1;
    }else {
        massOfDirections[currentId]=2;
    }
   // alert(massOfDirections[currentId])
 }