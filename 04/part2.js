const fs = require('fs');

class Passport {
	constructor(inputStr) {
		const kvPair = inputStr.split(/\s+/).map(pair => pair.split(':'));
		kvPair.forEach(([key, val]) => void(this[key] = val));
	}
	
	get isValid() {
		return (
			this.byr && +this.byr >= 1920 && +this.byr <= 2002 &&
			this.iyr && +this.iyr >= 2010 && +this.iyr <= 2020 &&
			this.eyr && +this.eyr >= 2020 && +this.eyr <= 2030 &&
			this.hgt && ( // I have regrets
				(this.hgt.endsWith('cm') && +this.hgt.slice(0, -2) >= 150 && +this.hgt.slice(0, -2) <= 193) ||
				(this.hgt.endsWith('in') && +this.hgt.slice(0, -2) >= 59 && +this.hgt.slice(0, -2) <= 76)
			) &&
			this.hcl && this.hcl.match(/^#[0-9a-f]{6}$/) &&
			this.ecl && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(this.ecl) &&
			this.pid && this.pid.match(/^[0-9]{9}$/)
		);
	}
}

const input = fs.readFileSync('input.txt').toString().trim();
const passports = input.split(/\s*\n\n\s*/).map(row => new Passport(row));
console.log(passports.filter(passport => passport.isValid).length);
