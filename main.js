window.addEventListener("DOMContentLoaded", () => {
	let getData = async () => {
		let response = await fetch("https://jsonplaceholder.typicode.com/users");
		let content = await response.json();
		content = content.splice(0, 10);

		let userName = document.querySelector(".seleсt__items.user-name");
		let website = document.querySelector(".seleсt__items.website");
		let city = document.querySelector(".seleсt__items.city");
		let key;

		for (key in content) {
			userName.innerHTML += `
			<div class="select__item">${content[key].name}</div>
			`;
			website.innerHTML += `
			<div class="select__item">${content[key].website}</div>
			`;
			city.innerHTML += `
			<div class="select__item">${content[key].address.city}</div>
			`;
		}

		// получаем все элементы с классом .select__header
		const selectHeader = document.querySelectorAll(".select__header");

		// получаем все элементы с классом .select__item
		const selectItems = document.querySelectorAll(".select__item");

		const searchBoxes = document.querySelectorAll(".search-box");

		let itemDisplayBlock = () => {
			selectItems.forEach((item) => {
				item.style.display = "block";
			});
		};

		let searchBoxValueNone = () => {
			searchBoxes.forEach((searchBox) => {
				searchBox.value = "";
			});
		};

		let select = function () {
			// вешаем каждому элементу массива событие 'click' и запускаем функцию selectToggle
			selectHeader.forEach((item) => {
				item.addEventListener("click", selectToggle);
			});

			// вешаем каждому элементу массива событие 'click' и запускаем функцию selectChoose
			selectItems.forEach((item) => {
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

				itemDisplayBlock();

				searchBoxValueNone();

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
					selectItems.forEach((item) => {
						if (item.innerText.toLowerCase().search(value) == -1) {
							item.style.display = "none";
						} else {
							item.style.display = "block";
						}
					});
				} else {
					itemDisplayBlock();
				}
			});
		});

		// закрываем выпадающий список если кликнуть не на него
		document.documentElement.addEventListener("click", function (e) {
			let selects = document.querySelectorAll(".select");

			selects.forEach((select) => {
				if (!e.target.closest(".select")) {
					select.classList.remove("is-active");
					itemDisplayBlock();
					searchBoxValueNone();
				}
				if (!(e.target.closest(".select") == select)) {
					select.classList.remove("is-active");
				}
			});
		});
	};

	getData();
});
