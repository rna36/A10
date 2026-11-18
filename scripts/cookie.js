// Save a cookie with a name, value, and number of days before it expires
function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	const expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

// Look through all the page's cookies and return the value for cname
function getCookie(cname) {
	const name = cname + "=";
	const parts = document.cookie.split(";");
	for (let c of parts) {
		c = c.trim();
		if (c.indexOf(name) === 0) {
			return decodeURIComponent(c.substring(name.length));
		}
	}
	return "";
}

// First visit: show a pop-up box and save the answer as a cookie.
// After a refresh: show the saved cookie value with no pop-up box.
function checkCookie() {
	const message = document.getElementById("message");
	const details = document.getElementById("details");
	const user = getCookie("username");
	if (user !== "") {
		message.textContent = "Welcome back, " + user + "!";
		details.textContent = "This name was read from a cookie saved on your computer: username=" + user;
	} else {
		const entry = prompt("Please enter your name:", "");
		if (entry !== null && entry.trim() !== "") {
			setCookie("username", entry.trim(), 30);
			message.textContent = "Thanks, " + entry.trim() + "! Your name was saved in a cookie.";
			details.textContent = "Refresh the page to see the cookie value displayed without the pop-up box.";
		} else {
			message.textContent = "No cookie was saved.";
			details.textContent = "Refresh the page and type a name in the pop-up box.";
		}
	}
}

// Button that deletes the cookie so the pop-up shows again
document.getElementById("clear").addEventListener("click", function () {
	setCookie("username", "", -1);
	location.reload();
});

checkCookie();
