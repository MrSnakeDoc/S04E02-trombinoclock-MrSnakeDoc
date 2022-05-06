const fs = require("fs");
const students = require("./studentsBase");

const tata = [];
students.forEach((element) => {
	tata.push({
		id: element.id,
		github_username: element.github_username,
		first_name: element.first_name,
		last_name: element.last_name,
		profile_picture_url: element.profile_picture_url,
		promo_id: element.promo,
	});
});

fs.writeFile("./data/students.js", JSON.stringify(tata), (err) => {
	console.log(err);
});
