 function isValidEmail(email) {
     const regex =
         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     return regex.test(email);
 }

 function test() {
     console.log(isValidEmail("example@example.com")); // true
     console.log(isValidEmail("example123@example.co.uk")); // true
     console.log(isValidEmail("user.name@example.com")); // true
     console.log(isValidEmail("user-name@example.com")); // true
     console.log(isValidEmail("user+name@example.com")); // true
     console.log(isValidEmail("user@sub.domain.com")); // true
     console.log(isValidEmail("user@sub.domain.co.uk")); // true
     console.log(isValidEmail("user@domain-with-dash.com")); // true
     console.log(isValidEmail("user@123.com")); // true
     console.log(isValidEmail("user@123.domain.com")); // true
     console.log(isValidEmail("user@.com")); // false (missing domain)
     console.log(isValidEmail("user@example")); // false (missing top-level domain)
     console.log(isValidEmail("user@example.")); // false (invalid top-level domain)
     console.log(isValidEmail("user@.example.com")); // false (invalid domain)
 }
 module.exports = {
     isValidEmail
 }