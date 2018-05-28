
var maxCountOfCars=7;
var minCountOfCars=1;
var maxdeltaBetweenCars=130;
var mindeltaBetweenCars=80;
var deltaLenBetweenCars=0;
var countOfCars=0;
var timeOfTrafficLights;
var massOfFirsBandCars=[];
var massOfSecondBandCars=[];

function createCars() {
    createCarsForEveryBand("startPositionFirst");
    createCarsForEveryBand("startPositionSecond");
 createCarsForEveryBand("startPositionThird");

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
        if(nameOfClass=="startPositionSecond"){
            massOfSecondBandCars[i]=createCar;
        }
        countOfCars++;
    }
}

function start() {
    //window.setInterval(changeColorOfTrafficLight,1000);
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
    if(carExamplar.className=="circle startPositionSecond" && parseInt(direction.left)>=687){
        if(lengthAnotherCarsToCentre()) {
            carExamplar.style.top = parseInt(direction.top) - 15 + 'px';
        }
    }else {
        if(lenghtBetweenCars(carExamplar)) {
            carExamplar.style.left = parseInt(direction.left) + 10 + 'px';
        }
    }
}

// function changeColorOfTrafficLight(){
//     var w=document.getElementsByClassName("greenRectangles right circle trafficLight");
//     w.style.color="black";
//     w.style.backgroundColor="white";
//     w.innerHTML='50';
// }

function lengthAnotherCarsToCentre() {
    var bb=true;
    for(var i=0;i<massOfFirsBandCars.length;i++){
        var direction=window.getComputedStyle(massOfFirsBandCars[i],null);
        if(parseInt(direction.left)>400 && parseInt(direction.left)<760){
            bb=false;
        }
    }
    return bb;
}

function lenghtBetweenCars(targetCar) {
    var lenghtLess60=true;
    var directionOfTarget=window.getComputedStyle(targetCar,null);
    if(targetCar.className=="circle startPositionFirst"){
        
    }
    else if(targetCar.className=="circle startPositionSecond"){
        console.log("middle")
        // for(var j=0;j<massOfSecondBandCars.length;j++){
        //     directionOfAnotherCar=window.getComputedStyle(massOfSecondBandCars[j],null);
        //     if(Math.abs(parseInt(directionOfTarget.left)-parseInt(directionOfAnotherCar.left))<60 && targetCar.id!=massOfSecondBandCars[j].id){
        //         lenghtLess80=false;
        //         break;
        //     }
        // }

        if(parseInt(targetCar.id)!=massOfFirsBandCars.length+massOfSecondBandCars.length-1){
            //расстояние до впереди стоящей машины
            directionOfAnotherCar=window.getComputedStyle(massOfSecondBandCars[parseInt(targetCar.id)-massOfFirsBandCars.length+1],null);
            if(Math.abs(parseInt(directionOfTarget.left)-parseInt(directionOfAnotherCar.left))<60
                && Math.abs(parseInt(directionOfTarget.top)-Math.abs(parseInt(directionOfAnotherCar.top)))<5
                ){
                        lenghtLess60=false;
            }
        }
    }
    return lenghtLess60;
}