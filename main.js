window.addEventListener("DOMContentLoaded", () => {
	// получаем все элементы с классом .select__header
	const selectHeader = document.querySelectorAll(".select__header");

	// получаем все элементы с классом .select__item
	const selectItem = document.querySelectorAll(".select__item");

	const searchBoxes = document.querySelectorAll(".search-box");

	let select = function () {
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

		function selectChoose(e) {
			let text = this.innerText, // получаем текст элемента .select__item и сохраняем в переменную text
				select = this.closest(".select"), // ищем первый элемент с классом .select (поиск начинается с своего элемента и дальше вверх по родителям)
				currentText = select.querySelector(".select__current"); // внутри элемента .select ищем элемент с классом .select__current
			currentText.innerText = text; // меняем информацию в элементе .select__current на информацию с элемента .select__item

			selectItem.forEach((item) => {
				item.style.display = "block";
			});

			searchBoxes.forEach((searchBox) => {
				searchBox.value = "";
			});

			if (!e.currentTarget.className.includes("search-box")) {
				select.classList.remove("is-active"); // удалаяем класс is-active у элемента с классом .select
			}
		}
	};
	select();

	//search-box
	searchBoxes.forEach((searchBox) => {
		searchBox.addEventListener("keyup", function (e) {
			let value = e.target.value.toLowerCase();
			if (value) {
				selectItem.forEach((item) => {
					if (item.innerText.toLowerCase().search(value) == -1) {
						item.style.display = "none";
					}
				});
			} else {
				selectItem.forEach((item) => {
					item.style.display = "block";
				});
			}
		});
	});

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
});
