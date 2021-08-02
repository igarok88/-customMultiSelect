let select = function () {
	// получаем все элементы с классом .select__header
	let selectHeader = document.querySelectorAll(".select__header");

	// получаем все элементы с классом .select__item
	let selectItem = document.querySelectorAll(".select__item");

	// вешаем каждому элементу массива событие 'click' и запускаем функцию selectToggle
	selectHeader.forEach((item) => {
		item.addEventListener("click", selectToggle);
	});

	// вешаем каждому элементу массива событие 'click' и запускаем функцию selectChoose
	selectItem.forEach((item) => {
		item.addEventListener("click", selectChoose);
	});

	// добавляем/убираем класс is-active родительскому элементу, в данном случае this = .select__header
	function selectToggle() {
		this.parentElement.classList.toggle("is-active");
	}

	function selectChoose() {
		let text = this.innerText, // получаем текст элемента .select__item и сохраняем в переменную text
			select = this.closest(".select"), // ищем первый элемент с классом .select (поиск начинается с своего элемента и дальше вверх по родителям)
			currentText = select.querySelector(".select__current"); // внутри элемента .select ищем элемент с классом .select__current
		currentText.innerText = text; // меняем информацию в элементе .select__current на информацию с элемента .select__item
		select.classList.remove("is-active"); // удалаяем класс is-active у элемента с классом .select
	}
};
select();

// закрываем выпадающий список если кликнуть не на него
document.documentElement.addEventListener("click", function (e) {
	let selects = document.querySelectorAll(".select");

	selects.forEach((select) => {
		if (!e.target.closest(".select")) {
			select.classList.remove("is-active");
		}
		if (!(e.target.closest(".select") == select)) {
			select.classList.remove("is-active");
		}
	});
});
