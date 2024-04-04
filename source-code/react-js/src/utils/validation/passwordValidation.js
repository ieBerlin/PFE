export default function isValidPassword(password) {
    const minLength = 8;
    const maxLength = 20;
    let regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/;
    /*
          At least one lowercase alphabet i.e. [a-z]
          At least one uppercase alphabet i.e. [A-Z]
          At least one Numeric digit i.e. [0-9]
          At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
          Also, the total length must be in the range [8-20]
         */
    if (password < minLength || password > maxLength) {
        // Password length is invalid
        return false;
    }
    if (!regex.test(password)) {
        // Password does not match the regex pattern
        return false;
    }
    return true;
}

function test() {
    console.log(isValidPassword("Password123@")); // true
    console.log(isValidPassword("Password 123@")); // false
    console.log(isValidPassword("Password123")); // false
    console.log(isValidPassword("password")); // false (no uppercase letter)
    console.log(isValidPassword("PASSWORD")); // false (no lowercase letter)
    console.log(isValidPassword("password123")); // false (no uppercase letter)
    console.log(isValidPassword("passwordPASSWORD")); // false (no digit)
    console.log(isValidPassword("short")); // false (too short)
    console.log(isValidPassword("thisisaverylongpassword")); // false (too long)
}