const fs = require('fs');

class Passport {
	constructor(inputStr) {
		const kvPair = inputStr.split(/\s+/).map(pair => pair.split(':'));
		kvPair.forEach(([key, val]) => void(this[key] = val));
	}
	
	get isValid() {
		const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
		return requiredKeys.every(key => this[key] != undefined);
	}
}

const input = fs.readFileSync('input.txt').toString().trim();
const passports = input.split(/\s*\n\n\s*/).map(row => new Passport(row));
console.log(passports.filter(passport => passport.isValid).length);
