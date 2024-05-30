function phoneNumberFormatter(phoneNum) {
    if (phoneNum.startsWith('+213')) {
        return 0 + phoneNum.slice(3)
    }
    return phoneNum;

}

function test() {
    console.log(phoneNumberFormatter("+213555123456")); // true
    console.log(phoneNumberFormatter("0555123456")); // true
    console.log(phoneNumberFormatter("0655123456")); // true
    console.log(phoneNumberFormatter("0755123456")); // true
}

module.exports = {
    phoneNumberFormatter
}