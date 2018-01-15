// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener("DOMContentLoaded", function(e){
  var read_buttons = document.querySelectorAll('.read-btn')

  read_buttons.forEach(function(button){
    button.addEventListener("click", function(e){
      var reading_message = document.querySelector('.read-message');
      var book_title = document.querySelector('.book-title').innerText;

      if (e.target.value === "Want to Read") {
        reading_message.innerText = "You currently have '" + book_title + "' in your 'want to read' list";
      } else if (e.target.value === "Currently Reading") {
        reading_message.innerText = "You are currently reading '" + book_title + "'. Enjoy it!"
        read_buttons[0].style.visibility = 'hidden';
      } else if (e.target.value === "Finished Reading") {
        reading_message.innerText = "You finished reading '" + book_title + "'. Awesome!!"
        read_buttons[0].style.visibility = 'hidden';
        read_buttons[1].style.visibility = 'hidden';
      }
      e.target.style.visibility = 'hidden';
    });
  });


    var newReview = document.querySelector('#new_review');
    // ensures content is present
    if (newReview){
      newReview.addEventListener('submit',function(e){
        // 1. Prevent the browser from submitting the form
        e.preventDefault();
        //2. Make an AJAX call
        $.ajax({
          url: $(this).attr('action'),
          method: $(this).attr('method'),
          data: $(this).serialize(),
          dataType: 'json'
        }).done(function(responseData){
          // Create the list item with class
          var listItem = document.createElement('li')
          var completedInput = $('.post-list');
          listItem.class = 'list-review'
          listItem.innerText = responseData.comment

        // Add the is-complete class if there is a value for completed_at
        completedInput.append(listItem)
        // listItem.append(completedInput).append(label).appendTo('.list-review')

          // Clear out the text field
          $('#new_review').trigger("reset");

        });
      });
    // Make the stars light up on hover
      for (i = 0; i < 5 ; i++){
       handleStar(i);
       starReview(i);
      }
      function handleStar(i) {
        var star = document.querySelector(`[data-outer-value='${i}'`);
        var starValue = star.getAttribute(`data-outer-value`);
        var innerStar = document.querySelector(`[data-inner-value='${starValue}']`);
        star.addEventListener("mouseenter", function(){
          for (x = 0; x <= starValue ; x++){
            var currentStar = document.querySelector(`[data-inner-value='${x}']`);
            currentStar.style.width = "100%"
          }
        });
        star.addEventListener("mouseleave", function(){
          for (y = 0; y <= starValue; y++){
            var currentStar = document.querySelector(`[data-inner-value='${y}']`);
            currentStar.style.width = "0%";
          }
        });
      }

      function starReview(i) {

        var star = document.querySelector(`[data-inner-value='${i}'`);
        var starValue = parseInt(star.getAttribute(`data-inner-value`)) + 1;
        star.addEventListener('click', function(e){
          console.log(starValue);
          $('.edit_rating').submit()
        });
        $('.edit_rating').on("submit", function(e){
          e.preventDefault();
          $.ajax({
            url: this.action,
            method: "PATCH",
            dataType: "json",
            data: $(this).serialize() + '&stars=' + starValue
          }).done(function(data){
            for (star = data - 1; star === 0; star--) {
              var currentStar = document.querySelector(`[data-inner-value='${star}'`);
              currentStar.removeEventListener("mouseleave", function(){
                var currentStar = document.querySelector(`[data-inner-value='${y}']`);
                currentStar.style.width = "0%";
              });
            };
          });
        });
      };
    };
});
