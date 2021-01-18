window.onload = function()  {
  // Make video loop
  function addLoop() {
    this.play();
    this.setAttribute("loop", true);
  }

  // Remove video loop
  function removeLoop() {
    this.removeAttribute("loop");
  }

  // Handle video play on hover
  var eye1 = document.getElementById("eye1");
  var eye2 = document.getElementById("eye2");
  var zebra1 = document.getElementById("zebra1");
  var zebra2 = document.getElementById("zebra2");
  var meowster = document.getElementById("meowster");
  var wiggle = document.getElementById("wiggle");
  var bigGuy = document.getElementById("bigGuy");

  if (window.innerWidth <= 767) {
    eye1.poster = "assets/images/eye.svg";
    eye2.poster = "assets/images/eye.svg";
    wiggle.poster = "assets/images/wiggle.svg";
  }

  eye1.addEventListener("mouseover", addLoop);
  eye1.addEventListener("mouseout", removeLoop);

  eye2.addEventListener("mouseover", addLoop);
  eye2.addEventListener("mouseout", removeLoop);

  zebra1.addEventListener("mouseover", addLoop);
  zebra1.addEventListener("mouseout", removeLoop);

  zebra2.addEventListener("mouseover", addLoop);
  zebra2.addEventListener("mouseout", removeLoop);

  meowster.addEventListener("mouseover", addLoop);
  meowster.addEventListener("mouseout", removeLoop);

  wiggle.addEventListener("mouseover", addLoop);
  wiggle.addEventListener("mouseout", removeLoop);
  
  bigGuy.addEventListener("mouseover", addLoop);
  bigGuy.addEventListener("mouseout", removeLoop);

  for (let i = 0; i < document.getElementsByClassName("submit-btn").length; i++) {
    document.getElementsByClassName("submit-btn")[i].addEventListener("click", function() {
      submitForm();
    });
  };



  // Handle newsletter submission
  function submitForm() {
    const expression = /\S+@\S+/;
    var emailMobile = document.getElementById("mce-EMAIL-mobile").value;
    var email = document.getElementById("mce-EMAIL").value;
    
    if (emailMobile == "" && email == "") {
      alert("Please fill out the required field");
    } else if (!expression.test(String(emailMobile).toLowerCase()) && !expression.test(String(email).toLowerCase())) {
      alert("Please provide a valid email address");
    } else {
      var event = event || window.event;
      var source = event.target || event.srcElement;
      source.style.backgroundImage = "url(/assets/images/done.svg)";
    }
  }



  // Fades out text
  function eventMouseEnter(num) {
    document.querySelector("#event-" + num + " h3").classList.add("text-hover");
    document.querySelector("#event-" + num + " p").classList.add("text-hover");
  }



  // Fades in text
  function eventMouseLeave(num) {
    document.querySelector("#event-" + num + " h3").classList.remove("text-hover");
    document.querySelector("#event-" + num + " p").classList.remove("text-hover");
  }



  // Hides text
  function hideText(num) {
    document.querySelector("#event-" + num + " h3").classList.add("text-hidden");
    document.querySelector("#event-" + num + " p").classList.add("text-hidden");
  }



  // Un-hides text
  function displayText(num) {
    document.querySelector("#event-" + num + " h3").classList.remove("text-hidden");
    document.querySelector("#event-" + num + " p").classList.remove("text-hidden");
  }



  // Close all drawers except the one clicked on
  function collapseOtherDrawers(exception) {
    var drawersClosed = true;
    var drawers = document.querySelectorAll(".event-drawer");
    var overlays = document.querySelectorAll(".overlay");

    for (let i = 0; i < drawers.length; i++) {
      if (i != exception && drawers[i].classList.contains('drawer-expand')) {
        drawers[i].classList.remove("drawer-expand");
        overlays[i].classList.remove("overlay-expand");
        drawersClosed = false;

        document.querySelector("#event-" + (i + 1) + " h3").classList.remove("text-hidden");
        document.querySelector("#event-" + (i + 1) + " p").classList.remove("text-hidden");
      }
    }

    return drawersClosed;
  }



  // Handle drawer open/closed
  var drawerOpened;
  var events = document.querySelectorAll(".event");
  
  // Define event listener for every event
  for (let e = 0; e < events.length; e++) {
    var event = document.getElementById("event-" + (e + 1));
    
    event.addEventListener("click", function() {
      var timing = collapseOtherDrawers(e) ? 0 : 600;

      setTimeout(function() {
        document.getElementById("event-" + (e + 1) + "-overlay").classList.toggle("overlay-expand");
        document.getElementById("event-" + (e + 1) + "-drawer").classList.toggle("drawer-expand");
        drawerOpened = document.getElementById("event-" + (e + 1) + "-drawer").classList.contains("drawer-expand");
        
        // If drawer is expanded, then fade out text and remove mouseleave listener
        if (drawerOpened) {
          hideText(e + 1);

          // Scroll into view only if opening drawer
          setTimeout(function() {
            document.getElementById("event-" + (e + 1)).scrollIntoView({ behavior: "smooth" });
          }, 500);

        // If drawer is closed, then fade in text and add mouseleave listener
        } else {
          displayText(e + 1);
          eventMouseLeave(e + 1);
        }
      }, timing);
    });

    event.addEventListener("mouseenter", function() { eventMouseEnter(e + 1) });
    event.addEventListener("mouseleave", function() { eventMouseLeave(e + 1) });
  }
}



// Handle anchor links
function openEvent(eventNum) {
  var event = document.querySelector("#event-" + eventNum);
  event.click();
  
  setTimeout(function() {
    event.scrollIntoView({ behavior: "smooth" });
  }, 300);
}