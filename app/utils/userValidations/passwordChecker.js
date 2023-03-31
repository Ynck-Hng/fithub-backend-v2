const passwordChecker = (inputPassword) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[&@!$#*])(?=.*[0-9]).{1,50}$/;
    return regex.test(inputPassword);
};

module.exports = passwordChecker;