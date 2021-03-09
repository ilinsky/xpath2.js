var xpath = require('./../../../api/xpath.js');
var expect = require('chai').expect;

describe("string", function() {
    describe("codepoints-to-string()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:codepoints-to-string((2309, 2358, 2378, 2325))'))
                .to.have.ordered.members(['अशॊक']);
        });
    });

    describe("string-to-codepoints()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string-to-codepoints("Thérèse")'))
                .to.have.ordered.members([84, 104, 233, 114, 232, 115, 101]);
        });
    });

    describe("compare()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:compare("abc", "abc")'))
                .to.have.ordered.members([0]);
        });
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:compare("bbc", "abc")'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:compare("abc", "bbc")'))
                .to.have.ordered.members([-1]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:compare((), "test 1")'))
                .to.have.ordered.members([]);
        });
    });

    // TODO: Missing implementation
    xdescribe("compare() with collation", function() {
        it('', function() {
            expect(xpath.evaluate('fn:compare("Strasse", "Straße", "deutsch")'))
                .to.have.ordered.members([0]);
        });
    });

    describe("codepoint-equal()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:codepoint-equal("test 1", "test 2")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:codepoint-equal("test 1", "test 1")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:codepoint-equal((), "test 1")'))
                .to.have.ordered.members([]);
        });
    });

    describe("concat()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:concat("un", "grateful")'))
                .to.have.ordered.members(["ungrateful"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:concat("Ingratitude, ", "thou ", "marble-hearted", " fiend!")'))
                .to.have.ordered.members(["Ingratitude, thou marble-hearted fiend!"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:concat("Thy ", (), "old ", "groans", "", " ring", " yet", " in", " my", " ancient", " ears.")'))
                .to.have.ordered.members(["Thy old groans ring yet in my ancient ears."]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:concat("Ciao!", ())'))
                .to.have.ordered.members(["Ciao!"]);
        });
    });

    describe("string-join()", function() {
        it('', function() {
            expect(xpath.evaluate("fn:string-join(('Now', 'is', 'the', 'time', '...'), ' ')"))
                .to.have.ordered.members(["Now is the time ..."]);
        });
        it('', function() {
            expect(xpath.evaluate("fn:string-join(('Blow, ', 'blow, ', 'thou ', 'winter ', 'wind!'), '')"))
                .to.have.ordered.members(["Blow, blow, thou winter wind!"]);
        });
        it('', function() {
            expect(xpath.evaluate("fn:string-join((), 'separator')"))
                .to.have.ordered.members([""]);
        });
    });

    describe("substring()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:substring("motor car", 6)'))
                .to.have.ordered.members([" car"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring("metadata", 4, 3)'))
                .to.have.ordered.members(["ada"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring("12345", 1.5, 2.6)'))
                .to.have.ordered.members(["234"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring("12345", 0, 3)'))
                .to.have.ordered.members(["12"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring("12345", 5, -3)'))
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring("12345", -3, 5)'))
                .to.have.ordered.members(["1"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring("12345", 0 div 0E0, 3)'))
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring("12345", 1, 0 div 0E0)'))
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring((), 1, 3)'))
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring("12345", -42, 1 div 0E0)'))
                .to.have.ordered.members(["12345"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring("12345", -1 div 0E0, 1 div 0E0)'))
                .to.have.ordered.members([""]);
        });
    });

    describe("string-length()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string-length("Harp not on that string, madam; that is past.")'))
                .to.have.ordered.members([45]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string-length(())'))
                .to.have.ordered.members([0]);
        });
    });

    describe("normalize-space()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:normalize-space(" The  wealthy curled darlings of   our  nation. ")'))
                .to.have.ordered.members(["The wealthy curled darlings of our nation."]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:normalize-space(())'))
                .to.have.ordered.members([""]);
        });
    });

    // TODO: Implement
    xdescribe("normalize-unicode()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:normalize-unicode("A")'))
                .to.have.ordered.members(["A"]);
        });
    });

    describe("upper-case()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:upper-case("abCd0")'))
                .to.have.ordered.members(["ABCD0"]);
        });
    });

    describe("lower-case()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:lower-case("ABc!D")'))
                .to.have.ordered.members(["abc!d"]);
        });
    });

    describe("translate()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:translate("bar","abc","ABC")'))
                .to.have.ordered.members(["BAr"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:translate("--aaa--","abc-","ABC")'))
                .to.have.ordered.members(["AAA"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:translate("abcdabc", "abc", "AB")'))
                .to.have.ordered.members(["ABdAB"]);
        });
    });

    describe("encode-for-uri()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:encode-for-uri("http://www.example.com/00/Weather/CA/Los%20Angeles#ocean")'))
                .to.have.ordered.members(["http%3A%2F%2Fwww.example.com%2F00%2FWeather%2FCA%2FLos%2520Angeles%23ocean"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:concat("http://www.example.com/", fn:encode-for-uri("~bébé"))'))
                .to.have.ordered.members(["http://www.example.com/~b%C3%A9b%C3%A9"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:concat("http://www.example.com/", fn:encode-for-uri("100% organic"))'))
                .to.have.ordered.members(["http://www.example.com/100%25%20organic"]);
        });
    });

    describe("iri-to-uri()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:iri-to-uri("http://www.example.com/00/Weather/CA/Los%20Angeles#ocean")'))
                .to.have.ordered.members(["http://www.example.com/00/Weather/CA/Los%20Angeles#ocean"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:iri-to-uri("http://www.example.com/~bébé")'))
                .to.have.ordered.members(["http://www.example.com/~b%C3%A9b%C3%A9"]);
        });
    });

    describe("escape-html-uri()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:escape-html-uri("http://www.example.com/00/Weather/CA/Los Angeles#ocean")'))
                .to.have.ordered.members(["http://www.example.com/00/Weather/CA/Los Angeles#ocean"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:escape-html-uri("javascript:if (navigator.browserLanguage == \'fr\') window.open(\'http://www.example.com/~bébé\');")'))
                .to.have.ordered.members(["javascript:if (navigator.browserLanguage == 'fr') window.open('http://www.example.com/~b%C3%A9b%C3%A9');"]);
        });
    });

    describe("contains()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:contains("tattoo", "t")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:contains("tattoo", "ttt")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:contains("", ())'))
                .to.have.ordered.members([true]);
        });
    });

    // TODO: Implement
    xdescribe("contains() with collation", function() {
        it('', function() {
            expect(xpath.evaluate('fn:contains("abcdefghi", "-d-e-f-", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:contains("a*b*c*d*e*f*g*h*i*", "d-ef-", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:contains("abcd***e---f*--*ghi", "def", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:contains((), "--***-*---", "CollationA")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("starts-with()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:starts-with("tattoo", "tat")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:starts-with("tattoo", "att")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:starts-with((), ())'))
                .to.have.ordered.members([true]);
        });
    });

    // TODO: Implement
    xdescribe("starts-with() with collation", function() {
        it('', function() {
            expect(xpath.evaluate('fn:starts-with("abcdefghi", "-a-b-c-", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:starts-with("a*b*c*d*e*f*g*h*i*", "a-bc-", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:starts-with("abcd***e---f*--*ghi", "abcdef", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:starts-with((), "--***-*---", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:starts-with("-abcdefghi", "-abc", "CollationA")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("ends-with()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:ends-with("tattoo", "tattoo")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:ends-with("tattoo", "atto")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:ends-with((), ())'))
                .to.have.ordered.members([true]);
        });
    });

    // TODO: Implement
    xdescribe("ends-with() with collation", function() {
        it('', function() {
            expect(xpath.evaluate('fn:ends-with("abcdefghi", "-g-h-i-", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:ends-with("abcd***e---f*--*ghi", "defghi", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:ends-with("abcd***e---f*--*ghi", "defghi", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:ends-with((), "--***-*---", "CollationA")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:ends-with("abcdefghi", "ghi-", "CollationA")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("substring-before()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:substring-before("tattoo", "attoo")'))
                .to.have.ordered.members(["t"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-before("tattoo", "tatto")'))
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-before((), ())'))
                .to.have.ordered.members([""]);
        });
    });

    // TODO: Implement
    xdescribe("substring-before() with collation", function() {
        it('', function() {
            expect(xpath.evaluate('fn:substring-before("abcdefghi", "--d-e-", "CollationA")'))
                .to.have.ordered.members(["abc"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-before("abc--d-e-fghi", "--d-e-", "CollationA")'))
                .to.have.ordered.members(["abc--"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-before("a*b*c*d*e*f*g*h*i*", "***cde", "CollationA")'))
                .to.have.ordered.members(["a*b*"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-before("Eureka!", "--***-*---", "CollationA")'))
                .to.have.ordered.members([""]);
        });
    });

    describe("substring-after()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:substring-after("tattoo", "tat")'))
                .to.have.ordered.members(["too"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-after("tattoo", "tattoo")'))
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-after((), ())'))
                .to.have.ordered.members([""]);
        });
    });

    // FIXME: Not implemented
    xdescribe("substring-after() with collation", function() {
        it('', function() {
            expect(xpath.evaluate('fn:substring-after("abcdefghi", "--d-e-", "CollationA")'))
                .to.have.ordered.members(["fghi"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-after("abc--d-e-fghi", "--d-e-", "CollationA")'))
                .to.have.ordered.members(["-fghi "]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-after("a*b*c*d*e*f*g*h*i*", "***cde***", "CollationA")'))
                .to.have.ordered.members(["*f*g*h*i*"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:substring-after("Eureka!", "--***-*---", "CollationA")'))
                .to.have.ordered.members(["Eureka!"]);
        });
    });

    describe("matches() with flag x", function() {
        it('', function() {
            expect(xpath.evaluate('fn:matches("helloworld", "hello world", "x") '))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:matches("helloworld", "hello[ ]world", "x")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:matches("hello world", "hello\\ sworld", "x")'))  // Double back slash, not in original test!
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:matches("hello world", "hello world", "x")'))
                .to.have.ordered.members([false]);
        });
    });

    describe("matches() with flag s", function() {
        it('', function() {
            expect(xpath.evaluate('fn:matches("Kaum hat dies der Hahn gesehen,\nFängt er auch schon an zu krähen", "Kaum.*krähen")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:matches("Kaum hat dies der Hahn gesehen,\nFängt er auch schon an zu krähen", "Kaum.*krähen", "s")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("matches() with flag m", function() {
        it('', function() {
            expect(xpath.evaluate('fn:matches("Kaum hat dies der Hahn gesehen,\nFängt er auch schon an zu krähen", "^Kaum.*gesehen,$")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:matches("Kaum hat dies der Hahn gesehen,\nFängt er auch schon an zu krähen", "^Kaum.*gesehen,$", "m")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("matches() with flag i", function() {
        it('', function() {
            expect(xpath.evaluate('fn:matches("Kikeriki! Kikikerikih!!", "kiki")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:matches("Kikeriki! Kikikerikih!!", "kiki", "i")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("replace()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:replace("abracadabra", "bra", "*")'))
                .to.have.ordered.members(["a*cada*"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:replace("abracadabra", "a.*a", "*")'))
                .to.have.ordered.members(["*"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:replace("abracadabra", "a.*?a", "*")'))
                .to.have.ordered.members(["*c*bra"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:replace("abracadabra", "a", "")'))
                .to.have.ordered.members(["brcdbr"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:replace("abracadabra", "a(.)", "a$1$1")'))
                .to.have.ordered.members(["abbraccaddabbra"]);
        });
        // TODO: Check test
        xit('', function() {
            expect(xpath.evaluate('fn:replace("abracadabra", ".*?", "$1")')) // must raise an error, because the pattern matches the zero-length string
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:replace("AAAA", "A+", "b")'))
                .to.have.ordered.members(["b"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:replace("AAAA", "A+?", "b")'))
                .to.have.ordered.members(["bbbb"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:replace("darted", "^(.*?)d(.*)$", "$1c$2")'))
                .to.have.ordered.members(["carted"]);
        });
    });

    describe("tokenize()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:tokenize("The cat sat on the mat", "\\s+")')) // forced double escape
                .to.have.ordered.members(["The", "cat", "sat", "on", "the", "mat"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:tokenize("1, 15, 24, 50", ",\\s*")')) // forced double escape
                .to.have.ordered.members(["1", "15", "24", "50"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:tokenize("1,15,,24,50,", ",")'))
                .to.have.ordered.members(["1", "15", "", "24", "50", ""]);
        });
        // TODO: check test
        xit('', function() {
            expect(xpath.evaluate('fn:tokenize("abba", ".?")')) // must raise the error [err:FORX0003].
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:tokenize("Some unparsed <br> HTML <BR> text", "\\s*<br>\\s*", "i")'))
                .to.have.ordered.members(["Some unparsed", "HTML", "text"]);
        });
    });
});