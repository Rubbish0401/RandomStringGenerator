var results = [];

window.addEventListener("load", function (event) {
	let selection = document.getElementById("char-selection")
	let resultList = document.getElementById("result-list");

	// Set Title Bar
	document.getElementById("title").innerText = document.title;

	// character list
	for (item of CHAR_LIST) {
		let container = document.createElement("div");
		container.classList.add("cheque-box");

		let cheque = document.createElement("input");
		cheque.type = "checkbox";
		cheque.id = `cheque-${item["name-eng"]}`;
		cheque.checked = item.default;

		let label = document.createElement("label");
		label.setAttribute("for", cheque.id);
		label.innerText = item.name;

		container.appendChild(cheque);
		container.appendChild(label);
		selection.appendChild(container);
	}

	// btn
	document.getElementById("btn-execute").addEventListener("click", function (event) {
		let map = "";
		let count = document.getElementById("count").value;
		let length = document.getElementById("length").value;

		for (let i = 0; i < selection.children.length; i++) {
			let chequebox = selection.children[i].children[0];
			if (chequebox.checked) map += CHAR_LIST[i].letters;
		}
		map += document.getElementById("add-chars").value;

		if (map.length > 0) for (let i = 0; i < count; i++) {
			let item = document.createElement("div");
			item.classList.add("result-item");

			let display = document.createElement("textarea");
			display.classList.add("result-display");
			display.rows = 1;
			display.value = randomString(length, map);
			display.addEventListener("keypress", function (event) {
				if (event.key == "Enter") event.preventDefault();
			});

			let copyBtn = document.createElement("img");
			copyBtn.classList.add("item-btn");
			copyBtn.src = "images/svg/copy.svg";
			copyBtn.addEventListener("click", function (event) {
				for (let i = 0; i < results.length; i++) if (results[i].container == item) {
					let text = results[i].text;

					navigator.permissions.query({ name: "clipboard-write" }).then(result => {
						if (result.state === "granted") {
							navigator.clipboard.writeText(text);
						} else if (result.state === "prompt") {
						}
					});

					break;
				}
			});

			let downloadBtn = document.createElement("img");
			downloadBtn.classList.add("item-btn");
			downloadBtn.src = "images/svg/download.svg";
			downloadBtn.addEventListener("click", function (event) {
				for (let i = 0; i < results.length; i++) if (results[i].container == item) {
					let text = results[i].text;

					let now = new Date();
					let filename = "randomstring_" + [
						fillChars(String(now.getFullYear()), 4, "0"),
						fillChars(String(now.getMonth() + 1), 2, "0"),
						fillChars(String(now.getDate()), 2, "0"),
						fillChars(String(now.getHours()), 2, "0"),
						fillChars(String(now.getMinutes()), 2, "0"),
						fillChars(String(now.getSeconds()), 2, "0"),
						fillChars(String(now.getMilliseconds()), 3, "0"),
					].join("") + ".txt";

					let blob = new Blob([text], { type: "text/plain" });
					let anchor = document.createElement("a");
					anchor.href = URL.createObjectURL(blob);
					anchor.download = filename;
					anchor.click();
					anchor.remove();

					break;
				}
			});

			item.appendChild(display);
			item.appendChild(copyBtn);
			item.appendChild(downloadBtn);

			resultList.insertBefore(item, resultList.children[0]);
			results.unshift({
				container: item,
				text: display.value,
			});
		}

		document.getElementById("container-download").addEventListener("click", function (event) {
			if(results.length > 0){
				let text = "";
				for (let i = 0; i < results.length; i++){
					text += (i > 0 ? "\n" : "") + results[i].text;
				}
				
				let now = new Date();
				let filename = "randomstring_all_" + [
					fillChars(String(now.getFullYear()), 4, "0"),
					fillChars(String(now.getMonth() + 1), 2, "0"),
					fillChars(String(now.getDate()), 2, "0"),
					fillChars(String(now.getHours()), 2, "0"),
					fillChars(String(now.getMinutes()), 2, "0"),
					fillChars(String(now.getSeconds()), 2, "0"),
					fillChars(String(now.getMilliseconds()), 3, "0"),
				].join("") + ".txt";

				let blob = new Blob([text], { type: "text/plain" });
				let anchor = document.createElement("a");
				anchor.href = URL.createObjectURL(blob);
				anchor.download = filename;
				anchor.click();
				anchor.remove();
			}
		});
	});

	document.getElementById("btn-initialise").addEventListener("click", function (event) {
		initialise();
	});

	this.document.getElementById("btn-clear").addEventListener("click", function (event) {
		for (item of results) item.container.remove();
		results = [];
	});

	initialise();
});