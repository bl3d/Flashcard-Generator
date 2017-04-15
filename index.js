var CreateCard = require('./CreateCard'),
	fs = require('fs'),
	inquirer = require('inquirer');

var newCard = new CreateCard();

//
var cardGame = { 

	init: function() {

		inquirer.prompt([{
			type: "list",
			message: "What would you like to do?",
			choices: [
				"1) Create a card?",
				"2) Play the game?"
			],
			name: "action"
		}]).then(function(user) {

			//
			var choiceIndex = parseInt(user.action.split(')')) - 1;

			//
			if (choiceIndex === 0) {

				inquirer.prompt([{
					type: "list",
					message: "What type of card would you like to create?",
					choices: [
						"1) Basic Card?",
						"2) Cloze Card?"
					],
					name: "action"
				}]).then(function(user) {

					//
					var choiceIndex = parseInt(user.action.split(')')) - 1;

					//
					if (choiceIndex === 0) {
						//crate a basic card
						inquirer.prompt([{
							type: "input",
							message: "What is the card question (front of card)?",
							name: "front"
						}, {
							type: "input",
							message: "What is the card answer (back of card)?",
							name: "back"
						}]).then(function(card) {
							// 
							newCard.basic(card.front, card.back);

						});

					} else {
						//crate a cloze card
						inquirer.prompt([{
							type: "input",
							message: "What is the full text (question and answer as a one entry)?",
							name: "text"
						}, {
							type: "input",
							message: "What is the cloze deletion (answer part)?",
							name: "cloze"
						}]).then(function(card) {
							// 
							newCard.cloze(card.text, card.cloze);

						});
					}

				});

			} else {

				inquirer.prompt([{
					type: "list",
					message: "What type of card would you like play?",
					choices: [
						"1) A Random Basic Card?",
						"2) A Random Cloze Card?"
					],
					name: "action"
				}]).then(function(user) {

					//
					var choiceIndex = parseInt(user.action.split(')')) - 1;

					//		      
					if (choiceIndex === 0) {
						cardGame.play('basic');
					} else {
						cardGame.play('cloze');
					}

				});

			}

		});

	},

	play: function(type) {

		fs.readFile("cards.txt", "utf8", function(error, data) {
			if (!error) {
				// need to convert data into some workable object
				var dataArr = data.split("\n");
				var typeArr = [];
				var numResults = 0;

				if (dataArr.length > 0) {

					if (type == 'basic') {
						for (var i = 0; i < dataArr.length; i++) {
							if (!dataArr[i].indexOf('type: ' + type)) {
								typeArr.push(dataArr[i]);
								numResults++;
							};
						};
					} else {
						for (var i = 0; i < dataArr.length; i++) {
							if (!dataArr[i].indexOf('type: ' + type)) {
								typeArr.push(dataArr[i]);
								numResults++;
							};
						}; 
					}

					var rando = Math.floor(Math.random()*((numResults)-0)+0);
					var resultString = typeArr[rando].split(' || ');
					var text = resultString[1].replace('text: ', '');
					var answer = resultString[2].replace('answer: ', '');

					inquirer.prompt([{
						type: "list",
						message: "What type of card would you like play?",
						choices: [
							"1) A Random Basic Card?",
							"2) A Random Cloze Card?"
						],
						name: "action"
					}]).then(function(user) {

						//
						var choiceIndex = parseInt(user.action.split(')')) - 1;

						//		      
						if (choiceIndex === 0) {
							cardGame.play('basic');
						} else {
							cardGame.play('cloze');
						}

					});
					console.log('\n'+text);
					console.log('\n'+answer);

					process.exit();

				} else {
					console.log('Sorry, there are no cards yet! Please add some cards and then try again!');
				}

			} else {
				//log some issue
			}

		});

	}


};

cardGame.init();