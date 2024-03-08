   function isValidPassword(password) {
       const minLength = 8;
       const maxLength = 20;
       const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

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
       console.log(isValidPassword("Password123")); // true
       console.log(isValidPassword("password")); // false (no uppercase letter)
       console.log(isValidPassword("PASSWORD")); // false (no lowercase letter)
       console.log(isValidPassword("password123")); // false (no uppercase letter)
       console.log(isValidPassword("passwordPASSWORD")); // false (no digit)
       console.log(isValidPassword("short")); // false (too short)
       console.log(isValidPassword("thisisaverylongpassword")); // false (too long)
   }
   module.exports = {
       isValidPassword
   }