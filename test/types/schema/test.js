var xpath = require('./../../../api/xpath');
var expect = require('chai').expect;

describe("schema", function() {
    describe("xs:anyAtomicType", function() {
        it('', function() {
            expect(function(){xpath.evaluate('xs:anyAtomicType("try")')})
                .to.throw(xpath.classes.Exception, 'Unknown type constructor function: {http://www.w3.org/2001/XMLSchema}anyAtomicType()');
        });
    });

    describe("xs:string", function() {
        it('', function() {
            expect(xpath.evaluate('xs:string("true")'))
                .to.have.ordered.members(["true"]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:string("")'))
                .to.have.ordered.members([""]);
        });
    });

    describe("xs:boolean", function() {
        it('', function() {
            expect(xpath.evaluate('xs:boolean("true")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:boolean("false")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:boolean("1")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:boolean("0")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:boolean("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:boolean("2")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:boolean("maybe")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:decimal", function() {
        it('', function() {
            expect(xpath.evaluate('xs:decimal("0")'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:decimal("1")'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:decimal("1.2")'))
                .to.have.ordered.members([1.2]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:decimal("1.2e5")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:decimal("NaN")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:decimal("INF")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:decimal("-INF")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:decimal("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:decimal("1f5")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:integer", function() {
        it('', function() {
            expect(xpath.evaluate('xs:integer("0")'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:integer("1")'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:integer("-1")'))
                .to.have.ordered.members([-1]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:integer("1.2")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:integer("NaN")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:integer("INF")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:integer("-INF")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:integer("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:integer("1f5")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:integer("f15")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:integer("15f")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:float", function() {
        it('', function() {
            expect(xpath.evaluate('xs:float("0")'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:float("1")'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:float("1.2")'))
                .to.have.ordered.members([1.2]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:float("1.2e5")'))
                .to.have.ordered.members([1.2e5]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:float("-1.2e5")'))
                .to.have.ordered.members([-1.2e5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:float("NaN"))'))
                .to.have.ordered.members(["NaN"]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:float("INF")'))
                .to.have.ordered.members([Infinity]);
        });
        it('', function() {
            expect(xpath.evaluate('xs:float("-INF")'))
                .to.have.ordered.members([-Infinity]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:float("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:float("1f5")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:date", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2012-10-30"))'))
                .to.have.ordered.members(["2012-10-30"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2012-10-30Z"))'))
                .to.have.ordered.members(["2012-10-30Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2012-10-30+00:00"))'))
                .to.have.ordered.members(["2012-10-30Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2012-10-30-00:00"))'))
                .to.have.ordered.members(["2012-10-30Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2012-10-30+02:00"))'))
                .to.have.ordered.members(["2012-10-30+02:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("2012-10-30-02:00"))'))
                .to.have.ordered.members(["2012-10-30-02:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:date("-2012-10-30"))'))
                .to.have.ordered.members(["-2012-10-30"]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:date("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:date("DATE")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:time", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("09:17:23"))'))
                .to.have.ordered.members(["09:17:23"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("09:17:23.025"))'))
                .to.have.ordered.members(["09:17:23.025"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("09:17:23.250"))'))
                .to.have.ordered.members(["09:17:23.25"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("09:17:23Z"))'))
                .to.have.ordered.members(["09:17:23Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("09:17:23+00:00"))'))
                .to.have.ordered.members(["09:17:23Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("09:17:23-00:00"))'))
                .to.have.ordered.members(["09:17:23Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("09:17:23+02:00"))'))
                .to.have.ordered.members(["09:17:23+02:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("09:17:23-02:00"))'))
                .to.have.ordered.members(["09:17:23-02:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("24:00:00.000"))'))
                .to.have.ordered.members(["00:00:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:time("24:00:00.000+02:00"))'))
                .to.have.ordered.members(["00:00:00+02:00"]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:time("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:time("TIME")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:time("-09:17:23")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:dateTime", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T09:17:23"))'))
                .to.have.ordered.members(["2012-10-30T09:17:23"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T09:17:23.025"))'))
                .to.have.ordered.members(["2012-10-30T09:17:23.025"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T09:17:23.250"))'))
                .to.have.ordered.members(["2012-10-30T09:17:23.25"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T09:17:23Z"))'))
                .to.have.ordered.members(["2012-10-30T09:17:23Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T09:17:23+00:00"))'))
                .to.have.ordered.members(["2012-10-30T09:17:23Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T09:17:23-00:00"))'))
                .to.have.ordered.members(["2012-10-30T09:17:23Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T09:17:23+02:00"))'))
                .to.have.ordered.members(["2012-10-30T09:17:23+02:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T09:17:23-02:00"))'))
                .to.have.ordered.members(["2012-10-30T09:17:23-02:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("-2012-10-30T09:17:23-02:00"))'))
                .to.have.ordered.members(["-2012-10-30T09:17:23-02:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T24:00:00.000"))'))
                .to.have.ordered.members(["2012-10-31T00:00:00"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dateTime("2012-10-30T24:00:00.000+02:00"))'))
                .to.have.ordered.members(["2012-10-31T00:00:00+02:00"]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dateTime("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dateTime("NOW")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dateTime("2012-10-30")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dateTime("2012-10-30T")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dateTime("09:17:23")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dateTime("T09:17:23")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:gYearMonth", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gYearMonth("1976-02"))'))
                .to.have.ordered.members(["1976-02"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gYearMonth("1976-02Z"))'))
                .to.have.ordered.members(["1976-02Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gYearMonth("1976-02+02:00"))'))
                .to.have.ordered.members(["1976-02+02:00"]);
        });
    });

    describe("xs:gYear", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gYear("1976"))'))
                .to.have.ordered.members(["1976"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gYear("1976Z"))'))
                .to.have.ordered.members(["1976Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gYear("1976+02:00"))'))
                .to.have.ordered.members(["1976+02:00"]);
        });
    });

    describe("xs:gMonthDay", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gMonthDay("--12-25"))'))
                .to.have.ordered.members(["--12-25"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gMonthDay("--12-25Z"))'))
                .to.have.ordered.members(["--12-25Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gMonthDay("--12-25+02:00"))'))
                .to.have.ordered.members(["--12-25+02:00"]);
        });
    });

    describe("xs:gMonth", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gMonth("--12"))'))
                .to.have.ordered.members(["--12"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gMonth("--12Z"))'))
                .to.have.ordered.members(["--12Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gMonth("--12+02:00"))'))
                .to.have.ordered.members(["--12+02:00"]);
        });
    });

    describe("xs:gDay", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gDay("---12"))'))
                .to.have.ordered.members(["---12"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gDay("---12Z"))'))
                .to.have.ordered.members(["---12Z"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:gDay("---12+02:00"))'))
                .to.have.ordered.members(["---12+02:00"]);
        });
    });

    describe("xs:yearMonthDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("P2Y3M"))'))
                .to.have.ordered.members(["P2Y3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("-P2Y3M"))'))
                .to.have.ordered.members(["-P2Y3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("P2Y3M"))'))
                .to.have.ordered.members(["P2Y3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("P2Y"))'))
                .to.have.ordered.members(["P2Y"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("P3M"))'))
                .to.have.ordered.members(["P3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:yearMonthDuration("P0Y0M"))'))
                .to.have.ordered.members(["P0M"]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:yearMonthDuration("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:yearMonthDuration("DECADE")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:yearMonthDuration("1Y2M")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:yearMonthDuration("--P1Y2M")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:yearMonthDuration("P1Y2.5M")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:dayTimeDuration", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("P1DT2H3M4S"))'))
                .to.have.ordered.members(["P1DT2H3M4S"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("-P1DT2H3M4S"))'))
                .to.have.ordered.members(["-P1DT2H3M4S"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("P1DT2H3M"))'))
                .to.have.ordered.members(["P1DT2H3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("P1DT2H"))'))
                .to.have.ordered.members(["P1DT2H"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("PT2M"))'))
                .to.have.ordered.members(["PT2M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("P1D"))'))
                .to.have.ordered.members(["P1D"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("P0DT0H0M0S"))'))
                .to.have.ordered.members(["PT0S"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:dayTimeDuration("PT23.5S"))'))
                .to.have.ordered.members(["PT23.5S"]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dayTimeDuration("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dayTimeDuration("DAY")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dayTimeDuration("1D")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dayTimeDuration("--P1D")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dayTimeDuration("P1.5D")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:dayTimeDuration("P1D5H")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:duration", function() {
        // YearMonth
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P2Y3M"))'))
                .to.have.ordered.members(["P2Y3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("-P2Y3M"))'))
                .to.have.ordered.members(["-P2Y3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P2Y3M"))'))
                .to.have.ordered.members(["P2Y3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P2Y"))'))
                .to.have.ordered.members(["P2Y"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P3M"))'))
                .to.have.ordered.members(["P3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P0Y0M"))'))
                .to.have.ordered.members(["PT0S"]);
        });
        // DayTime
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P1DT2H3M4S"))'))
                .to.have.ordered.members(["P1DT2H3M4S"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("-P1DT2H3M4S"))'))
                .to.have.ordered.members(["-P1DT2H3M4S"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P1DT2H3M"))'))
                .to.have.ordered.members(["P1DT2H3M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P1DT2H"))'))
                .to.have.ordered.members(["P1DT2H"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("PT2M"))'))
                .to.have.ordered.members(["PT2M"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P1D"))'))
                .to.have.ordered.members(["P1D"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P0DT0H0M0S"))'))
                .to.have.ordered.members(["PT0S"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("PT23.5S"))'))
                .to.have.ordered.members(["PT23.5S"]);
        });
        // YearMonth+DayTime
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P1Y2M3DT4H5M6S"))'))
                .to.have.ordered.members(["P1Y2M3DT4H5M6S"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("-P1Y2M3DT4H5M6S"))'))
                .to.have.ordered.members(["-P1Y2M3DT4H5M6S"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:duration("P0Y0M0DT0H0M0S"))'))
                .to.have.ordered.members(["PT0S"]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("YEAR")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("1D")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("--P1D")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("P1.5D")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("P1D5H")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("DECADE")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("1Y2M")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("--P1Y2M")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('xs:duration("P1Y2.5M")')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:QName", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:QName("pref:name"))'))
                .to.have.ordered.members(["pref:name"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:QName("name"))'))
                .to.have.ordered.members(["name"]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:string(xs:QName(""))')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:string(xs:QName("pref/name"))')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:string(xs:QName("*:name"))')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:string(xs:QName("pref:*"))')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:string(xs:QName("*:*"))')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:hexBinary", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:hexBinary("aa"))'))
                .to.have.ordered.members(["AA"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:hexBinary(""))'))
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:string(xs:hexBinary("a"))')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:string(xs:hexBinary("w"))')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

    describe("xs:base64Binary", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:base64Binary("qg=="))'))
                .to.have.ordered.members(["qg=="]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(xs:base64Binary(""))'))
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:string(xs:hexBinary("qg=="))')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:string(xs:hexBinary("qg=0"))')})
                .to.throw(xpath.classes.Exception, 'Invalid value for cast/constructor.');
        });
    });

});