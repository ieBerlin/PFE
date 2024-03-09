 function isValidPhoneNumber(phoneNumber) {
     console.log(phoneNumber)
     const regex = /^(?:\+213|0)(5|6|7)([0-9]{8})$/;
     return regex.test(phoneNumber);
 }

 function test() {
     console.log(isValidPhoneNumber("+2130534443434")); // false (too long)
     console.log(isValidPhoneNumber("00213555123456")); // true
     console.log(isValidPhoneNumber("+213555123456")); // true
     console.log(isValidPhoneNumber("0555123456")); // true
     console.log(isValidPhoneNumber("0655123456")); // true
     console.log(isValidPhoneNumber("0755123456")); // true
     console.log(isValidPhoneNumber("0855123456")); // false (invalid prefix)
     console.log(isValidPhoneNumber("00212755123456")); // false (invalid prefix)
     console.log(isValidPhoneNumber("+2135551234567")); // false (too long)
     console.log(isValidPhoneNumber("05123456")); // false (invalid prefix)
 }

 module.exports = {
     isValidPhoneNumber
 }