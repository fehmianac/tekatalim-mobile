/**
 * Created by fehmi on 30.03.2016.
 */
app.filter('showdate', function () {
    var days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return function (input) {
        var date = new Date(input);
        return date.ddmmyyyy() + " " + days[date.getDay()];
    };
});

app.filter('fulldate', function () {
    var days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return function (input) {
        var date = new Date(input);
        return date.ddmmyyyyhhmm() + " " + days[date.getDay()];
    };
});