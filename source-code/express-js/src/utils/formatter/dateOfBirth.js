const dateOfBirthFormatter = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function test() {
    console.log(dateOfBirthFormatter('Sun May 11, 2014')); // Should output: 2014-05-11
    console.log(dateOfBirthFormatter('2014-10-21')); // Should output: 2014-10-21
    console.log(dateOfBirthFormatter('February 5, 1998')); // Should output: 1998-02-05
    console.log(dateOfBirthFormatter('2023-12-01')); // Should output: 2023-12-01
    console.log(dateOfBirthFormatter('Thu Mar 08 2024')); // Should output: 2024-03-08
    console.log(dateOfBirthFormatter('03/08/2024')); // Should output: 2024-03-08
    console.log(dateOfBirthFormatter('08-03-2024')); // Should output: 2024-08-03
}

module.exports = {
    dateOfBirthFormatter
}