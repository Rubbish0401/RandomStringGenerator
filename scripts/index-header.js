const CHARACTER_LIST_PATH = "https://rubbish0401.github.io/RandomStringGenerator/data/character-list.json";

const INITIAL_VALUES = {
	"add-chars": "",
	"count": 5,
	"length": 24,
};

var CHAR_LIST;

(function(){
	CHAR_LIST = getCharacterList();
})();

function getCharacterList(){	
	let result;

	let request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			result = JSON.parse(request.response);
		}
	};
	request.open("GET", CHARACTER_LIST_PATH, true);
	request.send("");

	return result;
}

function randomString(length, map){
	let result = "";
	for(let i = 0; i < length; i++) result += map.charAt(Math.floor(Math.random() * map.length));

	return result;
}

function fillChars(text = "", length = 0, char = "0", direction = 0) {
	text = text.toString();

	let filler = "";
	for (let i = 0; i < Math.max(0, length - text.length); i++) filler += char;

	return (direction == 0 ? filler : "") + text + (direction == 1 ? filler : "");
}

function initialise(){
	document.getElementById("add-chars").value = INITIAL_VALUES["add-chars"];
	document.getElementById("count").value = INITIAL_VALUES.count;
	document.getElementById("length").value = INITIAL_VALUES.length;;
}