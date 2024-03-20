 export default function isValidUsername(username) {
     const minLength = 6;
     const maxLength = 20;
     const regex = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

     return (
         username.length >= minLength &&
         username.length <= maxLength &&
         regex.test(username)
     );
 }

 function test() {
     console.log(isValidUsername("")); // false (empty)
     console.log(isValidUsername("user")); // false
     console.log(isValidUsername("user123")); // true
     console.log(isValidUsername("user-name")); // false (contains hyphen)
     console.log(isValidUsername("user_name")); // true
     console.log(isValidUsername("user.name")); // true
     console.log(isValidUsername("user.name.")); // false (ends with period)
     console.log(isValidUsername(".username")); // false (starts with period)
     console.log(isValidUsername("a".repeat(5))); // false (too short)
     console.log(isValidUsername("a".repeat(21))); // false (too long)
     console.log(isValidUsername("_user_name")); // false (starts with underscore)
     console.log(isValidUsername("user_name_")); // false (ends with underscore)
 }