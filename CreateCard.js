var fs = require('fs');


//contructor for basic card
var BasicCard = function(front, back){

	this.op1 = front;

	this.op2 = back;

	this.resolve = function(){  
		return ('type: basic || text: '+this.op1+' || answer: '+this.op2);
	}; 

}


//contructor for cloze deletion
var ClozeCard = function(text, cloze){

	this.op1 = text.toLowerCase();

	this.op2 = cloze.toLowerCase();

	this.partial = (this.op1.indexOf(this.op2) === -1 ) ? false : this.op1.replace(this.op2, '... ');

	this.resolve = function(){  
		if (!this.partial) {
			console.log('The word '+this.op2+' does not appear in '+this.op1);
			return false;
		}else{
			return ('type: cloze || text: '+this.partial+' || answer: '+this.op2);
		}
	}; 

}


//accessable entry point from index.js
var CreateCard = function(){

	this.basic = function(op1, op2){
		var newBasicCard = new BasicCard(op1, op2); 
		if (newBasicCard.resolve()) {
			this.storeData(newBasicCard.resolve());
		}; 
	};

	this.cloze = function(op1, op2){
		var newClozeCard = new ClozeCard(op1, op2); 
		if (newClozeCard.resolve()) {
			this.storeData(newClozeCard.resolve());
		}; 
	};	

	this.storeData = function(data){
	    fs.appendFile('cards.txt', data + '\n', function(err) {
	      if (!err) {
	        console.log('stored-- '+data);
	      };
	    });		
	};

}

module.exports = CreateCard;