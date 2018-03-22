$(function() {

  var config = {
    apiKey: "AIzaSyC-3csDvbmP0HUN4DrrTCUcnCklW-OHXAk",
    authDomain: "train-scheduler-2-d9a8a.firebaseapp.com",
    databaseURL: "https://train-scheduler-2-d9a8a.firebaseio.com",
    projectId: "train-scheduler-2-d9a8a",
    storageBucket: "train-scheduler-2-d9a8a.appspot.com",
    messagingSenderId: "1011672945295"
    
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

  $("#train-submit").on("click", function() {
    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var firstTrain = moment($("#train-depart").val().trim(),"HH:mm").subtract(10, "years").format("X");
    var frequecny = $("#train-freq").val().trim();

    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequecny: frequecny
    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-depart").val("");
    $("#train-freq").val("");

    return false;
  })

  trainData.ref().on("child_added",function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequecny = snapshot.val().frequecny;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequecny;
    var minutes = frequecny - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);
    $("#trainTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequecny+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

  })

});


