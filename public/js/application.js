var validateEmail = function(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

var displayMessage = function(message, error=true) {
  if (error) {
    $("#signup").append('<div class="c-alerts__alert c-alerts__alert--error animated zoomIn">'+ message +'</div>')
  } else {
    $("#email_form").hide();
    $("#signup").append('<div class="c-alerts__alert c-alerts__alert--success animated zoomIn">'+ message +'</div>')
  }
};

$(document).ready(function() {

  // Automatically trigger the loading animation on click
  var submitBtn = Ladda.create(document.querySelector('.ladda-button'));

  $("form").on("submit", function(event){
    event.preventDefault();

    var t = $(this),
        input = $("input[name='email']"),
        email = input.val();

    $(".c-alerts__alert").remove();
    submitBtn.start();

    if (validateEmail(email)) {
      $.ajax({
        method: "post",
        url: t.attr('action'),
        data: { "email": email },
        dataType: 'json'
      })
      .done(function(response) {
        console.log(response);
        displayMessage(response.msg, response.error)
        submitBtn.stop();
      });

    } else {
      displayMessage("Please enter a valid email");
      submitBtn.stop();
    }
  });

});