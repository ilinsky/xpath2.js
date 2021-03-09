var xpath = require('./../../../api/xpath');
var expect = require('chai').expect;

describe("date", function() {
    describe("years-from-duration()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:years-from-duration(xs:yearMonthDuration("P20Y15M"))'))
                .to.have.ordered.members([21]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:years-from-duration(xs:yearMonthDuration("-P15M"))'))
                .to.have.ordered.members([-1]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:years-from-duration(xs:dayTimeDuration("-P2DT15H"))'))
                .to.have.ordered.members([0]);
        });
    });

    describe("months-from-duration()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:months-from-duration(xs:yearMonthDuration("P20Y15M"))'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:months-from-duration(xs:yearMonthDuration("-P20Y18M"))'))
                .to.have.ordered.members([-6]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:months-from-duration(xs:dayTimeDuration("-P2DT15H0M0S"))'))
                .to.have.ordered.members([0]);
        });
    });

    describe("days-from-duration()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:days-from-duration(xs:dayTimeDuration("P3DT10H"))'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:days-from-duration(xs:dayTimeDuration("P3DT55H"))'))
                .to.have.ordered.members([5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:days-from-duration(xs:yearMonthDuration("P3Y5M"))'))
                .to.have.ordered.members([0]);
        });
    });

    describe("hours-from-duration()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-duration(xs:dayTimeDuration("P3DT10H"))'))
                .to.have.ordered.members([10]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-duration(xs:dayTimeDuration("P3DT12H32M12S"))'))
                .to.have.ordered.members([12]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-duration(xs:dayTimeDuration("PT123H"))'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-duration(xs:dayTimeDuration("-P3DT10H"))'))
                .to.have.ordered.members([-10]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-duration(xs:yearMonthDuration("P3Y5M"))'))
                .to.have.ordered.members([0]);
        });
    });

    describe("minutes-from-duration()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:minutes-from-duration(xs:dayTimeDuration("P3DT10H"))'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:minutes-from-duration(xs:dayTimeDuration("-P5DT12H30M"))'))
                .to.have.ordered.members([-30]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:minutes-from-duration(xs:yearMonthDuration("P3Y5M"))'))
                .to.have.ordered.members([0]);
        });
    });

    describe("seconds-from-duration()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:seconds-from-duration(xs:dayTimeDuration("P3DT10H12.5S"))'))
                .to.have.ordered.members([12.5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:seconds-from-duration(xs:dayTimeDuration("-PT256S"))'))
                .to.have.ordered.members([-16]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:seconds-from-duration(xs:yearMonthDuration("P3Y5M"))'))
                .to.have.ordered.members([0]);
        });
    });

    describe("year-from-dateTime()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:year-from-dateTime(xs:dateTime("1999-05-31T13:20:00-05:00"))'))
                .to.have.ordered.members([1999]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:year-from-dateTime(xs:dateTime("1999-05-31T21:30:00-05:00"))'))
                .to.have.ordered.members([1999]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:year-from-dateTime(xs:dateTime("1999-12-31T19:20:00"))'))
                .to.have.ordered.members([1999]);
        });
        // edge case
        it('', function() {
            expect(xpath.evaluate('fn:year-from-dateTime(xs:dateTime("1999-12-31T24:00:00"))'))
                .to.have.ordered.members([2000]);
        });
    });

    describe("month-from-dateTime()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:month-from-dateTime(xs:dateTime("1999-05-31T13:20:00-05:00"))'))
                .to.have.ordered.members([5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:month-from-dateTime(xs:dateTime("1999-12-31T19:20:00-05:00"))'))
                .to.have.ordered.members([12]);
        });
        // Bad test as introduces dependency on fn:adjust-dateTime-to-timezone
        // TODO: check test
//        it('', function() {
//            expect(xpath.evaluate('fn:month-from-dateTime(fn:adjust-dateTime-to-timezone(xs:dateTime("1999-12-31T19:20:00-05:00"), xs:dayTimeDuration("PT0S")))'))
//                .to.have.ordered.members([1]);
//        });
    });

    describe("day-from-dateTime()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:day-from-dateTime(xs:dateTime("1999-05-31T13:20:00-05:00"))'))
                .to.have.ordered.members([31]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:day-from-dateTime(xs:dateTime("1999-12-31T20:00:00-05:00"))'))
                .to.have.ordered.members([31]);
        });
        // Bad test as introduces dependency on fn:adjust-dateTime-to-timezone
        // TODO: check test
//        it('', function() {
//            expect(xpath.evaluate('fn:day-from-dateTime(fn:adjust-dateTime-to-timezone(xs:dateTime("1999-12-31T19:20:00-05:00"), xs:dayTimeDuration("PT0S")))'))
//                .to.have.ordered.members([1]);
//        });
    });

    describe("hours-from-dateTime()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-dateTime(xs:dateTime("1999-05-31T08:20:00-05:00"))'))
                .to.have.ordered.members([8]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-dateTime(xs:dateTime("1999-12-31T21:20:00-05:00"))'))
                .to.have.ordered.members([21]);
        });
        // Bad test as introduces dependency on fn:adjust-dateTime-to-timezone
        // TODO: check test
//        it('', function() {
//            expect(xpath.evaluate('fn:hours-from-dateTime(fn:adjust-dateTime-to-timezone(xs:dateTime("1999-12-31T21:20:00-05:00"), xs:dayTimeDuration("PT0S")))'))
//                .to.have.ordered.members([2]);
//        });
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-dateTime(xs:dateTime("1999-12-31T12:00:00"))'))
                .to.have.ordered.members([12]);
        });
        // edge case
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-dateTime(xs:dateTime("1999-12-31T24:00:00"))'))
                .to.have.ordered.members([0]);
        });
    });

    describe("minutes-from-dateTime()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:minutes-from-dateTime(xs:dateTime("1999-05-31T13:20:00-05:00"))'))
                .to.have.ordered.members([20]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:minutes-from-dateTime(xs:dateTime("1999-05-31T13:30:00+05:30"))'))
                .to.have.ordered.members([30]);
        });
    });

    describe("seconds-from-dateTime()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:seconds-from-dateTime(xs:dateTime("1999-05-31T13:20:00-05:00"))'))
                .to.have.ordered.members([0]);
        });
        // Not W3C test
        it('', function() {
            expect(xpath.evaluate('fn:seconds-from-dateTime(xs:dateTime("1999-05-31T13:20:03.255-05:00"))'))
                .to.have.ordered.members([3.255]);
        });
    });

    describe("timezone-from-dateTime()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:timezone-from-dateTime(xs:dateTime("1999-05-31T13:20:00-05:00")))'))
                .to.have.ordered.members(['-PT5H']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:timezone-from-dateTime(xs:dateTime("2000-06-12T13:20:00Z")))'))
                .to.have.ordered.members(['PT0S']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:timezone-from-dateTime(xs:dateTime("2004-08-27T00:00:00"))'))
                .to.have.ordered.members([]);
        });
    });

    describe("year-from-date()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:year-from-date(xs:date("1999-05-31"))'))
                .to.have.ordered.members([1999]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:year-from-date(xs:date("2000-01-01+05:00"))'))
                .to.have.ordered.members([2000]);
        });
    });

    describe("month-from-date()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:month-from-date(xs:date("1999-05-31-05:00"))'))
                .to.have.ordered.members([5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:month-from-date(xs:date("2000-01-01+05:00"))'))
                .to.have.ordered.members([1]);
        });
    });

    describe("day-from-date()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:day-from-date(xs:date("1999-05-31-05:00"))'))
                .to.have.ordered.members([31]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:day-from-date(xs:date("2000-01-01+05:00"))'))
                .to.have.ordered.members([1]);
        });
    });

    describe("timezone-from-date()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:timezone-from-date(xs:date("1999-05-31-05:00")))'))
                .to.have.ordered.members(['-PT5H']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:timezone-from-date(xs:date("2000-06-12Z")))'))
                .to.have.ordered.members(['PT0S']);
        });
    });

    describe("hours-from-time()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-time(xs:time("11:23:00"))'))
                .to.have.ordered.members([11]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-time(xs:time("21:23:00"))'))
                .to.have.ordered.members([21]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-time(xs:time("01:23:00+05:00"))'))
                .to.have.ordered.members([1]);
        });
        // Bad test as introduces dependency on fn:adjust-dateTime-to-timezone
        // TODO: check test
//        it('', function() {
//            expect(xpath.evaluate('fn:hours-from-time(fn:adjust-time-to-timezone(xs:time("01:23:00+05:00"), xs:dayTimeDuration("PT0S")))'))
//                .to.have.ordered.members([20]);
//        });
        // edge case
        it('', function() {
            expect(xpath.evaluate('fn:hours-from-time(xs:time("24:00:00"))'))
                .to.have.ordered.members([0]);
        });
    });

    describe("minutes-from-time()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:minutes-from-time(xs:time("13:00:00Z"))'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:minutes-from-time(xs:time("13:10:00Z"))'))
                .to.have.ordered.members([10]);
        });
    });

    describe("seconds-from-time()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:seconds-from-time(xs:time("13:20:10.5"))'))
                .to.have.ordered.members([10.5]);
        });
    });

    describe("timezone-from-time()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:timezone-from-time(xs:time("13:20:00-05:00")))'))
                .to.have.ordered.members(['-PT5H']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:timezone-from-time(xs:time("13:20:00"))'))
                .to.have.ordered.members([]);
        });
        // Not W3C test
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:timezone-from-time(xs:time("13:20:00Z")))'))
                .to.have.ordered.members(['PT0S']);
        });
    });

    describe("adjust-dateTime-to-timezone()", function() {
        // TODO: check test
//        it('', function() {
//            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T10:00:00")))'))
//                .to.have.ordered.members(['2002-03-07T10:00:00-05:00']);
//        });
//        it('', function() {
//            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T10:00:00-07:00")))'))
//                .to.have.ordered.members(['2002-03-07T12:00:00-05:00']);
//        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T10:00:00"), xs:dayTimeDuration("-PT10H")))'))
                .to.have.ordered.members(['2002-03-07T10:00:00-10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T10:00:00-07:00"), xs:dayTimeDuration("PT10H")))'))
                .to.have.ordered.members(['2002-03-08T03:00:00+10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T00:00:00+01:00"), xs:dayTimeDuration("-PT8H")))'))
                .to.have.ordered.members(['2002-03-06T15:00:00-08:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T10:00:00"), ()))'))
                .to.have.ordered.members(['2002-03-07T10:00:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T10:00:00-07:00"), ()))'))
                .to.have.ordered.members(['2002-03-07T10:00:00']);
        });
    });

    describe("adjust-dateTime-to-timezone() Z", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T22:00:00+11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['2002-03-07T11:00:00Z']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T10:00:00+11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['2002-03-06T23:00:00Z']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T22:00:00-11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['2002-03-08T09:00:00Z']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-dateTime-to-timezone(xs:dateTime("2002-03-07T10:00:00-11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['2002-03-07T21:00:00Z']);
        });
    });

    describe("adjust-date-to-timezone()", function() {
//        it('', function() {
//            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07")))'))
//                .to.have.ordered.members(['2002-03-07-05:00']);
//        });
//        it('', function() {
//            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07-07:00")))'))
//                .to.have.ordered.members(['2002-03-07-05:00']);
//        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07"), xs:dayTimeDuration("-PT10H")))'))
                .to.have.ordered.members(['2002-03-07-10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07-07:00"), xs:dayTimeDuration("-PT10H")))'))
                .to.have.ordered.members(['2002-03-06-10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07"), ()))'))
                .to.have.ordered.members(['2002-03-07']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07-07:00"), ()))'))
                .to.have.ordered.members(['2002-03-07']);
        });
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07+11:00"), xs:dayTimeDuration("PT10H")))'))
                .to.have.ordered.members(['2002-03-06+10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07+11:00"), xs:dayTimeDuration("PT12H")))'))
                .to.have.ordered.members(['2002-03-07+12:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07-11:00"), xs:dayTimeDuration("PT10H")))'))
                .to.have.ordered.members(['2002-03-07+10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07-11:00"), xs:dayTimeDuration("PT12H")))'))
                .to.have.ordered.members(['2002-03-07+12:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07+11:00"), xs:dayTimeDuration("-PT10H")))'))
                .to.have.ordered.members(['2002-03-06-10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07+11:00"), xs:dayTimeDuration("-PT12H")))'))
                .to.have.ordered.members(['2002-03-06-12:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07-11:00"), xs:dayTimeDuration("-PT10H")))'))
                .to.have.ordered.members(['2002-03-07-10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07-11:00"), xs:dayTimeDuration("-PT12H")))'))
                .to.have.ordered.members(['2002-03-06-12:00']);
        });
    });

    describe("adjust-date-to-timezone() Z", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07+11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['2002-03-06Z']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-date-to-timezone(xs:date("2002-03-07-11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['2002-03-07Z']);
        });
    });

    describe("adjust-time-to-timezone()", function() {
//        it('', function() {
//            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("10:00:00")))'))
//                .to.have.ordered.members(['10:00:00-05:00']);
//        });
//        it('', function() {
//            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("10:00:00-07:00")))'))
//                .to.have.ordered.members(['12:00:00-05:00']);
//        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("10:00:00"), xs:dayTimeDuration("-PT10H")))'))
                .to.have.ordered.members(['10:00:00-10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"), xs:dayTimeDuration("-PT10H")))'))
                .to.have.ordered.members(['07:00:00-10:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("10:00:00"), ()))'))
                .to.have.ordered.members(['10:00:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"), ()))'))
                .to.have.ordered.members(['10:00:00']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"), xs:dayTimeDuration("PT10H")))'))
                .to.have.ordered.members(['03:00:00+10:00']);
        });
    });

    describe("adjust-time-to-timezone() Z", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("22:00:00+11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['11:00:00Z']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("10:00:00+11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['23:00:00Z']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("22:00:00-11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['09:00:00Z']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:adjust-time-to-timezone(xs:time("10:00:00-11:00"), xs:dayTimeDuration("PT0S")))'))
                .to.have.ordered.members(['21:00:00Z']);
        });
    });
});