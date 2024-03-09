function isValidAge(dateOfBirth) {
    const currentDate = new Date();
    const userAge = new Date(dateOfBirth);

    // Calculate age in years
    const differenceInMilliseconds = currentDate - userAge;
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const ageInYears = differenceInMilliseconds / millisecondsInYear;

    // Check if age is greater than 12
    return ageInYears > 12;
}

function test() {
    console.log(isValidAge("2000-01-01")); // true (older than 12 years)
    console.log(isValidAge("2005-12-31")); // true (older than 12 years)
    console.log(isValidAge("2010-05-20")); // true (older than 12 years)
    console.log(isValidAge("2011-03-12")); // true (Today - older than 12 years)
    console.log(isValidAge("2011-12-03")); // true (Today - exactly 12 years old)
    console.log(isValidAge("2012-01-01")); // true (Tomorrow - less than 12 years old)
    console.log(isValidAge("2019-06-15")); // false (More recent date - less than 12 years old)
    console.log(isValidAge("2025-11-30")); // false (Future date - less than 12 years old)
}
module.exports = {
    isValidAge
}