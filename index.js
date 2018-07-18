#!/usr/bin/env node

let program = require('commander');

let redis = require("redis"),
    client = redis.createClient();

    client.on("error", function (err) {
    console.log("Error " + err);
});


// client.set('company' , 'amazon',redis.print);
// console.log('company',redis.print);
// client.quit();


// function addCompany(){

// }

// client.hset("test" , "amazon" ,"bakwas", redis.print);
// client.hset("test" , "google" ,"coding", redis.print);
// client.hkeys("test", (err , replies) => {
// 	replies.forEach((company) => {
// 		console.log(company)
// 	})
// })

program
     .arguments('<company>')
     .option('-s , --status [status]', 'status of the interview process')
     .option('-d , --deadline [deadline]', 'deadline of the company')
     .option('-n, --notes [notes]' , 'specific notes for the company')
     .action(function(req, opts){
     	console.log(req);
     	console.log(opts.deadline); 
     	let companyDetails = {};
     	companyDetails.status = opts.status;
     	companyDetails.deadline = opts.deadline;
     	companyDetails.notes = opts.notes;

     	client.hset("interviewDetails", req, JSON.stringify(companyDetails), redis.print);

     })
     .parse(process.argv)


   program
         .command('getDetail <company>')
         .alias('get')
         .description('get the interview details of a company')
         .action((company) => {
         	console.log(company);
         });

         program.parse(process.argv);

       //  client.quit();
