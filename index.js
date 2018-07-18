#!/usr/bin/env node

let program = require('commander');

let redis = require("redis"),
	client = redis.createClient();

client.on("error", function(err) {
	console.log("Error " + err);
});


program
	.command('addInterview <company> <status> <deadline> [notes]')
	.alias('add')
	.action((company, status, deadline, notes) => {
		let companyDetails = {};
		companyDetails.status = status;
		companyDetails.deadline = deadline;
		companyDetails.notes = notes;

		client.hset("interviewDetails", company, JSON.stringify(companyDetails), redis.print);

	})
	.parse(process.argv)


program
	.command('getDetail <company>')
	.alias('get')
	.description('get the interview details of a company')
	.action((company) => {
		console.log(company);
		client.hget("interviewDetails", company, (err, res) => {
			console.log(res);
		})
	});

program.parse(process.argv);


program
	.command('getStatusBy <status>')
	.alias('getStatus')
	.description('get the list of interview details by status')
	.action((status) => {
		console.log(status);
		client.hgetall("interviewDetails", (err, res) => {
			for (let prop in res) {
				let gg = JSON.parse(res[prop]);
				if (gg.hasOwnProperty('status') && gg['status'].includes(status)) {
					console.log(prop);
					console.log(res[prop]);
				}
			}

		})
	});

program.parse(process.argv);