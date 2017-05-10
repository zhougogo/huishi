//count();
function count() {

	$('.page0').fadeOut(4000);

	$('.page1').fadeIn(4000);
	
	$('.page1 .answerBtm').click(function(){
		
		$('.page2').show().siblings().hide();
	})

	$('.page2 .errPopup').click(function() {

		$(this).hide();
	})

	var answerText = document.getElementsByClassName('subjectAll')[0];

	var answer = answerText.getElementsByTagName('p');

	for(var i = 0; i < answer.length; i++) {

		answer[i].addEventListener('touchstart', function() {

			for(var j = 0; j < answer.length; j++) {

				answer[j].style.backgroundColor = 'white';

			}
			this.style.backgroundColor = "#d7d7d6";

		})

	}
}

