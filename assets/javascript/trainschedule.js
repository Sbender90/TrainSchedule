$(function() {

var config = {
    apiKey: "AIzaSyDCpdF9ieNvE4_6NbRNIaTxPJkb0deVxIs",
    authDomain: "train-scheduler-1beb4.firebaseapp.com",
    databaseURL: "https://train-scheduler-1beb4.firebaseio.com",
    projectId: "train-scheduler-1beb4",
    storageBucket: "",
    messagingSenderId: "177098785101"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var inputName = "";
  var inputDestination = "";
  var inputTime = "";
  var inputFrequency = "";
  
$("#train-submit").on("click", function(event) {
  event.preventDefault();

  inputName = $("#train-name").val().trim();
  inputDestination = $("#train-destination").val().trim();
  inputTime = $("#train-depart").val().trim();
  inputFrequency = $("#train-freq").val().trim();

  database.ref().push({
    inputName: inputName,
    inputDestination: inputDestination,
    inputTime: inputTime,
    inputFrequency: inputFrequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  });

  $("#train-name").val("");
  $("#train-destination").val("");
  $("#train-depart").val("");
  $("#train-freq").val("");
});

  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().inputName);

  }, function(errorObject) {
    console.log("Errors: " + errorObject.code);
  });

database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
  var currentTime = moment().format("hh:mm");
  console.log("current Time: " + currentTime);
  
  var tr = $("<tr>");
  var nameTd = $("<td>").text(snapshot.val().inputName);
  var destinationTd = $("<td>").text(snapshot.val().inputDestination);
  var timeTd = $("<td>").text(snapshot.val().inputTime);
  var freqTd = $("<td>").text(snapshot.val().inputFrequency);
 
  // console.log(timeTd);
  
  // var inputConverted = moment(currentTime).format("LT");
  // console.log("inputConverted: " + inputConverted);

  // var diffTime = moment().diff(moment(inputTime), "minutes");
  // console.log("Time Difference: " + diffTime);
  // var timeRemaining = diffTime % freqTd;

  // var minTillTd = freqTd - timeRemaining;
  // console.log("minutes till: " + minTillTd);
  // var nextArrivalTd = moment().add(minTillTd, "minutes");

  // trying these two methods one above one below can't get it to work with currentTime
  
  
  var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(timeTd), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freqTd;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freqTd - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  

  tr.append(nameTd);
  tr.append(destinationTd);
  tr.append(freqTd);
  tr.append(nextTrain);
  tr.append(tMinutesTillTrain);
  
  

  $("#trainTable").append(tr);
  console.log(snapshot.val());
})
  //
});