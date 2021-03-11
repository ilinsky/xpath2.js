var xpath = require('./../../src');
var expect = require('chai').expect;

describe("date", function() {
    describe("xs:yearMonthDuration lt xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P1Y") lt xs:yearMonthDuration("P13M")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P1Y") lt xs:yearMonthDuration("-P13M")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P1Y") lt xs:yearMonthDuration("P11M")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P1Y") lt xs:yearMonthDuration("P12M")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:yearMonthDuration gt xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P1Y") gt xs:yearMonthDuration("P13M")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P1Y") gt xs:yearMonthDuration("-P13M")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P1Y") gt xs:yearMonthDuration("P11M")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P1Y") gt xs:yearMonthDuration("P12M")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:dayTimeDuration lt xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('xs:dayTimeDuration("P1D") lt xs:dayTimeDuration("PT25H")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dayTimeDuration("P1D") lt xs:dayTimeDuration("-PT25H")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dayTimeDuration("P1D") lt xs:dayTimeDuration("PT23H")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dayTimeDuration("P1D") lt xs:dayTimeDuration("PT24H")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:dayTimeDuration gt xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('xs:dayTimeDuration("P1D") gt xs:dayTimeDuration("PT25H")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dayTimeDuration("P1D") gt xs:dayTimeDuration("-PT25H")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dayTimeDuration("P1D") gt xs:dayTimeDuration("PT23H")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dayTimeDuration("P1D") gt xs:dayTimeDuration("PT24H")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:duration eq xs:duration", function() {
        it('', function() {
            expect(xpath.evaluate('xs:duration("P1Y") eq xs:duration("P12M")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:duration("PT24H") eq xs:duration("P1D")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:duration("P1Y") eq xs:duration("P365D")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:duration("P2Y0M0DT0H0M0S") eq xs:yearMonthDuration("P24M")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:duration("P0Y0M10D") eq xs:dayTimeDuration("PT240H")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:yearMonthDuration eq xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P0Y") eq xs:dayTimeDuration("P0D")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P1Y") eq xs:dayTimeDuration("P365D")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P2Y") eq xs:yearMonthDuration("P24M")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:dayTimeDuration eq xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('xs:dayTimeDuration("P10D") eq xs:dayTimeDuration("PT240H")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:dateTime eq xs:dateTime", function() {
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2002-04-02T12:00:00-01:00") eq xs:dateTime("2002-04-02T17:00:00+04:00")'))
                .to.have.ordered.members([true]);
        });
//        it('', function() { // Requires specific implicit timezone
//            expect(xpath.evaluate('xs:dateTime("2002-04-02T12:00:00") eq xs:dateTime("2002-04-02T23:00:00+06:00")'))
//                .to.have.ordered.members([]);
//        });
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2002-04-02T12:00:00") eq xs:dateTime("2002-04-02T17:00:00")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2002-04-02T12:00:00") eq xs:dateTime("2002-04-02T12:00:00")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2002-04-02T23:00:00-04:00") eq xs:dateTime("2002-04-03T02:00:00-01:00")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("1999-12-31T24:00:00") eq xs:dateTime("2000-01-01T00:00:00")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2005-04-04T24:00:00") eq xs:dateTime("2005-04-04T00:00:00")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:dateTime lt xs:dateTime", function() {
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2004-12-25T12:00:00") lt xs:dateTime("2004-12-25T11:00:00")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2004-12-25T12:00:00") lt xs:dateTime("2004-12-25T12:00:00")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2004-12-25T12:00:00") lt xs:dateTime("2004-12-25T13:00:00")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:dateTime gt xs:dateTime", function() {
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2004-12-25T12:00:00") gt xs:dateTime("2004-12-25T11:00:00")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2004-12-25T12:00:00") gt xs:dateTime("2004-12-25T12:00:00")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:dateTime("2004-12-25T12:00:00") gt xs:dateTime("2004-12-25T13:00:00")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:date eq xs:date", function() {
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25Z") eq xs:date("2004-12-25+07:00")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:date eq xs:date (timezone 12h)", function() {
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25-12:00") eq xs:date("2004-12-26+12:00")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:date lt xs:date", function() {
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25Z") lt xs:date("2004-12-25-05:00")'))
                .to.have.ordered.members([true]);
        });
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25-04:00") lt xs:date("2004-12-25-05:00")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25-04:00") lt xs:date("2004-12-25-03:00")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:date lt xs:date (timezone 12h)", function() {
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25-12:00") lt xs:date("2004-12-26+12:00")'))
                .to.have.ordered.members([false]);
        });
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25-11:00") lt xs:date("2004-12-26+12:00")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:date gt xs:date", function() {
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25Z") gt xs:date("2004-12-25+07:00")'))
                .to.have.ordered.members([true]);
        });
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25-06:00") gt xs:date("2004-12-25-05:00")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25-06:00") gt xs:date("2004-12-25-07:00")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:date gt xs:date (timezone 12h)", function() {
        it('', function() {
            expect(xpath.evaluate('xs:date("2004-12-25-12:00") gt xs:date("2004-12-26+12:00")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:time gt xs:time", function() {
        it('', function() {
            expect(xpath.evaluate('xs:time("08:00:00+09:00") eq xs:time("17:00:00-06:00")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:time("21:30:00+10:30") eq xs:time("06:00:00-05:00")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:time("24:00:00+01:00") eq xs:time("00:00:00+01:00")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:time lt xs:time", function() {
//        it('', function() {
//            // Requires specific implicit timezone
//            expect(xpath.evaluate('xs:time("12:00:00") lt xs:time("23:00:00+06:00")'))
//                .to.have.ordered.members([false]);
//        });
//        it('', function() {
//            // Requires specific implicit timezone
//            expect(xpath.evaluate('xs:time("11:00:00") lt xs:time("17:00:00Z")'))
//                .to.have.ordered.members([true]);
//        });
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('xs:time("22:59:59") lt xs:time("22:59:59")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:time("22:59:59") lt xs:time("23:59:59")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:time("12:00:00Z") lt xs:time("11:00:00-02:00")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:time("23:59:59") lt xs:time("24:00:00")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:time gt xs:time", function() {
        it('', function() {
            expect(xpath.evaluate('xs:time("08:00:00+09:00") gt xs:time("17:00:00-06:00")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:time("23:59:59") gt xs:time("24:00:00")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:gYearMonth eq xs:gYearMonth", function() {
        it('', function() {
            expect(xpath.evaluate('xs:gYearMonth("1976-02") eq xs:gYearMonth("1976-03Z")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:gYearMonth("1976-03") eq xs:gYearMonth("1976-03Z")'))
                .to.have.ordered.members([false]);
        });
        // Not W3C test
        it('', function() {
            expect(xpath.evaluate('xs:gYearMonth("1976-03Z") eq xs:gYearMonth("1976-03Z")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:gYear eq xs:gYear", function() {
        it('', function() {
            expect(xpath.evaluate('xs:gYear("1976-05:00") eq xs:gYear("1976-05:00")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:gYear eq xs:gYear (timezone 12h)", function() {
        it('', function() {
            expect(xpath.evaluate('xs:gYear("2005-12:00") eq xs:gYear("2005+12:00")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:gMonthDay eq xs:gMonthDay", function() {
        it('', function() {
            expect(xpath.evaluate('xs:gMonthDay("--12-25-14:00") eq xs:gMonthDay("--12-26+10:00")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:gMonthDay("--12-25-05:00") eq xs:gMonthDay("--12-26Z")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:gMonth eq xs:gMonth", function() {
        it('', function() {
            expect(xpath.evaluate('xs:gMonth("--12-14:00") eq xs:gMonth("--12+10:00")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:gMonth("--12") eq xs:gMonth("--12Z")'))
                .to.have.ordered.members([false]);
        });
        // Not W3C tesr
        it('', function() {
            expect(xpath.evaluate('xs:gMonth("--12+00:00") eq xs:gMonth("--12Z")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:gDay eq xs:gDay", function() {
        it('', function() {
            expect(xpath.evaluate('xs:gDay("---25-14:00") eq xs:gDay("---25+10:00")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:gDay("---12") eq xs:gDay("---12Z")'))
                .to.have.ordered.members([false]);
        });
        // Not W3C tesr
        it('', function() {
            expect(xpath.evaluate('xs:gDay("---12+00:00") eq xs:gDay("---12Z")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("xs:yearMonthDuration + xs:yearMonthDuration", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("P3Y3M") + xs:yearMonthDuration("P2Y2M"))'))
                .to.have.ordered.members(["P5Y5M"]);
        });
    });

    describe("xs:yearMonthDuration - xs:yearMonthDuration", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("P3Y3M") - xs:yearMonthDuration("P2Y2M"))'))
                .to.have.ordered.members(["P1Y1M"]);
        });
    });

    describe("xs:yearMonthDuration * number", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("P2Y11M") * 2.3)'))
                .to.have.ordered.members(["P6Y9M"]);
        });
    });

    describe("xs:yearMonthDuration / number", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("P2Y11M") div 1.5)'))
                .to.have.ordered.members(["P1Y11M"]);
        });
    });

    describe("xs:yearMonthDuration / xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('xs:yearMonthDuration("P3Y4M") div xs:yearMonthDuration("-P1Y4M")'))
                .to.have.ordered.members([-2.5]);
        });
    });

    describe("xs:dayTimeDuration + xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("P2DT12H5M") + xs:dayTimeDuration("P5DT12H"))'))
                .to.have.ordered.members(["P8DT5M"]);
        });
    });

    describe("xs:dayTimeDuration - xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("P2DT12H") - xs:dayTimeDuration("P1DT10H30M"))'))
                .to.have.ordered.members(["P1DT1H30M"]);
        });
    });

    describe("xs:dayTimeDuration * number", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("PT2H10M") * 2.1)'))
                .to.have.ordered.members(["PT4H33M"]);
        });
    });

    describe("xs:dayTimeDuration / number", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("P1DT2H30M10.5S") div 1.5)'))
                .to.have.ordered.members(["PT17H40M7S"]);
        });
    });

    describe("xs:dayTimeDuration / xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:round(xs:dayTimeDuration("P2DT53M11S") div xs:dayTimeDuration("P1DT10H") * 1000)'))
                .to.have.ordered.members([1438]);
        });
    });

    describe("xs:dateTime - xs:dateTime", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2000-10-30T06:12:00Z") - xs:dateTime("1999-11-28T09:00:00Z"))'))
                .to.have.ordered.members(["P337DT21H12M"]);
        });
    });

    describe("xs:date - xs:date", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-10-15-05:00") - xs:date("2000-10-10+02:00"))'))
                .to.have.ordered.members(["P5DT7H"]);
        });
    });

    describe("xs:time - xs:time", function() {
//        it('', function() {
//            // Depends on implicit timezone
//            expect(xpath.evaluate('fn:string(xs:time("11:12:00Z") - xs:time("04:00:00"))'))
//                .to.have.ordered.members(["PT2H12M"]);
//        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("11:00:00-05:00") - xs:time("21:30:00+05:30"))'))
                .to.have.ordered.members(["PT0S"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("17:00:00-06:00") - xs:time("08:00:00+09:00"))'))
                .to.have.ordered.members(["P1D"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("24:00:00") - xs:time("23:59:59"))'))
                .to.have.ordered.members(["-PT23H59M59S"]);
        });
    });

    describe("xs:dateTime + xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2000-10-30T11:12:00") + xs:yearMonthDuration("P1Y2M"))'))
                .to.have.ordered.members(["2001-12-30T11:12:00"]);
        });
    });

    describe("xs:dateTime + xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2000-10-30T11:12:00") + xs:dayTimeDuration("P3DT1H15M"))'))
                .to.have.ordered.members(["2000-11-02T12:27:00"]);
        });
    });

    describe("xs:dateTime - xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2000-10-30T11:12:00") - xs:yearMonthDuration("P1Y2M"))'))
                .to.have.ordered.members(["1999-08-30T11:12:00"]);
        });
    });

    describe("xs:dateTime - xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2000-10-30T11:12:00") - xs:dayTimeDuration("P3DT1H15M"))'))
                .to.have.ordered.members(["2000-10-27T09:57:00"]);
        });
    });

    describe("xs:date + xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-10-30") + xs:yearMonthDuration("P1Y2M"))'))
                .to.have.ordered.members(["2001-12-30"]);
        });
    });

    describe("xs:date + xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-02-29Z") + xs:yearMonthDuration("P1Y"))'))
                .to.have.ordered.members(["2001-02-28Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-01-31Z") + xs:yearMonthDuration("P1M"))'))
                .to.have.ordered.members(["2000-02-29Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-01-30Z") + xs:yearMonthDuration("P1M"))'))
                .to.have.ordered.members(["2000-02-29Z"]);
        });
    });

    describe("xs:date + xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2004-10-30Z") + xs:dayTimeDuration("P2DT2H30M0S"))'))
                .to.have.ordered.members(["2004-11-01Z"]);
        });
    });

    describe("xs:date - xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-10-30") - xs:yearMonthDuration("P1Y2M"))'))
                .to.have.ordered.members(["1999-08-30"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-10-31-05:00") - xs:yearMonthDuration("P1Y1M"))'))
                .to.have.ordered.members(["1999-09-30-05:00"]);
        });
    });

    describe("xs:date (leap year) - xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-02-29Z") - xs:yearMonthDuration("P1Y"))'))
                .to.have.ordered.members(["1999-02-28Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-03-31Z") - xs:yearMonthDuration("P1M"))'))
                .to.have.ordered.members(["2000-02-29Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-03-30Z") - xs:yearMonthDuration("P1M"))'))
                .to.have.ordered.members(["2000-02-29Z"]);
        });
    });

    describe("xs:date - xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-10-30") - xs:dayTimeDuration("P3DT1H15M"))'))
                .to.have.ordered.members(["2000-10-26"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2000-10-30") - xs:dayTimeDuration("P3D"))'))
                .to.have.ordered.members(["2000-10-27"]);
        });
    });

    describe("xs:time + xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("11:12:00") + xs:dayTimeDuration("P3DT1H15M"))'))
                .to.have.ordered.members(["12:27:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("23:12:00+03:00") + xs:dayTimeDuration("P1DT3H15M"))'))
                .to.have.ordered.members(["02:27:00+03:00"]);
        });
    });

    describe("xs:time - xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("11:12:00") - xs:dayTimeDuration("P3DT1H15M"))'))
                .to.have.ordered.members(["09:57:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("08:20:00-05:00") - xs:dayTimeDuration("P23DT10H10M"))'))
                .to.have.ordered.members(["22:10:00-05:00"]);
        });
    });
});