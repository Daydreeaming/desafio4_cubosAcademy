const bcrypt = require('bcryptjs');

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash('amigo123.', salt, (err2, hash) => {
	});
});

const check = async (password, hash) => {
	const comparison = await bcrypt.compare(password, hash);
	return comparison;
};

const encrypt = async (password) => {
	const hash = await bcrypt.hash(password, 10);
	return hash;
};

module.exports = { check, encrypt };
