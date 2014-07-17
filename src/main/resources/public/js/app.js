$(function(){
  $("#form").submit(function(ev){
    ev.preventDefault();
    var errorClass = "error";
    var $form = {
        'name': $("input[name='name']"),
        'email': $("input[name='email']"),
        'message': $("textarea[name='message']")
    }
    var $error_box = $("#error-box");

    for (var key in $form) {
        $form[key].removeClass(errorClass)
    }
    $error_box.html(""); // clear errors box

    var formData = {
      'name': $form['name'].val(),
      'email': $form['email'].val(),
      'message': $form['message'].val()
    }

    $.ajax({
      type: 'POST',
      url: '/orders',
      data: formData,
      dataType: 'json',
      success: function(res) {
        console.log(res);
        if (res) {
            if (res.error) {
                for (var i in res.message) {
                    if (res.message.hasOwnProperty(i)) {
                        console.log(i, res.message[i]);
                        $form[i].addClass(errorClass);
                        $error_box.append(["<p>", i, res.message[i], "</p>"].join(" "));
                    }
                }
            } else {
                console.log("<p>Form saved</p>");
            }
        } else {
            console.log("Something went wrong");
            $error_box.html("<p>Server error</p>");
        }
      }
    });
    console.log(formData);
  });
});