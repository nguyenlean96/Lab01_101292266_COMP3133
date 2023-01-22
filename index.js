const csv = require("csv-parser");
const fs = require("fs");

const country_filter = country => {
	var columns = ["country", "year", "population"];

	var writableStream = fs.createWriteStream(`${country}.txt`);
	writableStream.write(columns.join(",") + "\n");

	fs.createReadStream("input_countries.csv")
		.pipe(csv())
		.on("data", row => {
			const headers = Object.keys(row);
			if (row[headers[0]] === country) {
				writableStream.write(Object.values(row).join(",") + "\n");
			}
		})
		.on("end", () => {
			console.log(`Filtered ${country} successfully`);
			writableStream.end();
		});
};

country_filter("India");
country_filter("Canada");
country_filter("United States");
