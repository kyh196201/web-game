window.addEventListener('DOMContentLoaded', e => {
	let count, question;
	const $result = document.getElementById('result');
	const $form = document.getElementById('form');
	const $input = document.getElementById('input');
	const $count = document.getElementById('count');



	// 숫자 뽑기
	function pickNumber() {
		const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		let result = [];
		let count = 0;

		while(count < 4) {
			const index = Math.floor(Math.random() * numbers.length);

			if(count === 0 && numbers[index] === 0) continue;

			result.push(numbers.splice(index, 1)[0]);
			count++;
		}

		return result.join('');
	}

	function checkAnswer(answer) {
		let strike = 0,
			ball = 0;
		
		for(let i = 0; i < answer.length; i++) {
			if(answer[i] === question[i]) {
				strike++;
			} else if(question.indexOf(answer[i]) > -1) {
				ball++;
			}
		}

		return {
			strike,
			ball,
		};
	}

	function bindEvents() {
		$form.addEventListener('submit', e => {
			e.preventDefault();

			const answer = $input.value;

			if(!answer || answer.length < 4) {
				alert('4글자 이상을 입력해주세요!');
				$input.value = '';
				$input.focus();
			}

			if(answer === question) {
				$result.innerHTML += '정답입니다.';
				setTimeout(() => {
					restartGame();
				}, 1500);
				return false;
			} else {
				count--;
				
				$count.innerHTML = count;
				if(count <= 0) {
					$result.innerHTML += `게임이 종료되었습니다. 정답은 ${question}입니다.`;
					setTimeout(() => {
						restartGame();
					}, 1500);
					return false;
				}
				
				const {strike, ball} = checkAnswer(answer);
				$result.innerHTML += `<p>${strike} 스트라이크 ${ball} 볼</p>`;
				$input.value = '';
				$input.focus();
			}
		});
	}

	function restartGame() {
		if(window.confirm('다시 도전하시겠습니까?')) {
			startGame();
		}
	}

	// 게임 초기화
	function startGame() {
		count = 10;
		$count.textContent = count;
		$result.innerHTML = '';
		$input.value = '';
		question = pickNumber();
		$input.focus();

		console.log(question);
	}

	function init() {
		bindEvents();
		startGame();
	}

	init();
});