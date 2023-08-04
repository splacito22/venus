$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the user input (event description) from the corresponding textarea
    var eventDescription = $(this).siblings(".description").val();
    // Get the ID of the containing time-block (e.g., "hour-9")
    var timeBlockId = $(this).parent().attr("id");
    // Save the event description in local storage using the time block ID as the key
    localStorage.setItem(timeBlockId, eventDescription);
  });

  // Add code to apply the past, present, or future class to each time block
  var currentHour = dayjs().hour(); // Get the current hour in 24-hour format
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]); // Extract the hour from the time block ID
    if (timeBlockHour < currentHour) {
      // Time block is in the past
      $(this).addClass("past").removeClass("present future");
    } else if (timeBlockHour === currentHour) {
      // Time block is the current hour
      $(this).addClass("present").removeClass("past future");
    } else {
      // Time block is in the future
      $(this).addClass("future").removeClass("past present");
    }
  });

  // Add code to get user input from localStorage and set textarea values
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var eventDescription = localStorage.getItem(timeBlockId);
    if (eventDescription) {
      $(this).find(".description").val(eventDescription);
    }
  });

  // Add code to display the current date in the header
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
