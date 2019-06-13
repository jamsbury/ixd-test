var d = document.querySelectorAll("div"),
    isDown = false,
    isLong = false,
    target,                                         // which element was clicked
    longTID;                                        // so we can cancel timer


// add listener for elements
d[0].addEventListener("mousedown", handleMouseDown);

// mouseup need to be monitored on a "global" element or we might miss it if
// we move outside the original element.
window.addEventListener("mouseup", handleMouseUp);

function handleMouseDown() {
  this.innerHTML = "Currently Seated...";
  isDown = true;                                    // button status (any button here)
  isLong = false;                                   // longpress status reset
  target = this;                                    // store this as target element
  clearTimeout(longTID);                            // clear any running timers
  longTID = setTimeout(longPress.bind(this), 10000); // create a new timer for this click
};

function handleMouseUp(e) {
  if (isDown && isLong) {                           // if a long press, cancel
    isDown = false;                                 // clear in any case
    e.preventDefault();                             // and ignore this event
    return
  }
  
  if (isDown) {                                     // if we came from down status:
      clearTimeout(longTID);                        // clear timer to avoid false longpress
      isDown = false;
      target.innerHTML = "Where'd you go?";               // for clicked element
      target = null;
  }
};

function longPress() {
  isLong = true;
  this.innerHTML = "Stand up now.";
  // throw custom event or call code for long press
  document.getElementById("number").textContent="10 second";
}

console.log("No errors.")