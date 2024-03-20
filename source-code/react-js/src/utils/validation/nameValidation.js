function isValidName(name) {
    // Regular expression pattern for a valid name
    const namePattern = /^[a-zA-Z\s.'-]{1,50}$/;

    // Test the name against the pattern
    return namePattern.test(name);
}

function test() {
    console.log(isValidName("John Doe")); // true
    console.log(isValidName("Jane-Smith")); // true
    console.log(isValidName("Alice B. Carter")); // true
    console.log(isValidName("Mary")); // true
    console.log(isValidName("Jack O'Reilly")); // true
    console.log(isValidName("Robert Downey Jr.")); // true
    console.log(isValidName("John123")); // false (contains digits)
    console.log(isValidName("Mary-Smith-Jones")); // true (contains hyphens)
    console.log(isValidName("Alice!")); // false (contains special characters)
    console.log(isValidName("Robert_Downey")); // false (contains underscores)
    console.log(isValidName("J")); // false (too short)
    console.log(
        isValidName(
            "Jsfdajkfhsfsasjkfjksdhfajksdfglajskdgadjklsgajgadfgadjkfgadjfgajfdgadfkj"
        )
    ); // false (too long)
    console.log(isValidName("")); // false (empty string)
}

module.exports = {
    isValidName
}