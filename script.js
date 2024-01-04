const updateTime = () => {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  let otherampm = hours >= 12 ? "AM" : "PM";

  hours = hours % 12 || 12;
  hours = addTrailingZero(hours);
  minutes = addTrailingZero(minutes);
  seconds = addTrailingZero(seconds);

  $("#hour").html(hours);
  $("#min").html(minutes);
  $("#sec").html(seconds);
  $("#ampm").html(ampm);
  $("#other-ampm").html(otherampm);
};

updateTime();
setInterval(updateTime, 1000);

$("#stopwatch-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".stopwatch").slideDown();
  $(".type").html("Stopwatch");
});
$(".back-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".clock").slideDown();
  $(".type").html("Clock");
});

let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMiliSeconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

function stopwatch() {
  stopwatchMiliSeconds++;
  if (stopwatchMiliSeconds === 100) {
    stopwatchMiliSeconds = 0;
    stopwatchSeconds++;
  }
  if (stopwatchSeconds === 60) {
    stopwatchSeconds = 0;
    stopwatchMinutes++;
  }
  if (stopwatchMinutes === 60) {
    stopwatchMinutes = 0;
    stopwatchHours++;
  }

  $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
  $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
  $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
  $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
}

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMiliSeconds = 0;
  laps = 0;
  $("#stopwatch-hour").html("00");
  $("#stopwatch-min").html("00");
  $("#stopwatch-sec").html("00");
  $("#stopwatch-ms").html("00");
}

$(".start-stopwatch").click(function () {
  startStopwatch();
  $(".start-stopwatch").hide();
  $(".lap-stopwatch").show();
  $(".stop-stopwatch").show();
});

$(".lap-stopwatch").click(function () {
  laps++;
  $(".lap").removeClass("active");
  $(".laps").prepend(
    ` <div class="lap active">
      <p>Lap ${laps}</p>
      <p>
        ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(
      stopwatchMinutes
    )} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
      stopwatchMiliSeconds
    )}
      </p>
    </div>
   `
  );
});
$(".stop-stopwatch").click(function () {
  stopStopwatch();
  $(".start-stopwatch").show();
  $(".lap-stopwatch").show();
  $(".stop-stopwatch").hide();
});
$(".reset-stopwatch").click(function () {
  resetStopwatch();
  $(".start-stopwatch").show();
  $(".lap-stopwatch").hide();
  $(".stop-stopwatch").hide();
  $(".laps").html("");
});

function addTrailingZero(number) {
  return number < 10 ? "0" + number : number;
}
