import validateUrl from "./validateUrl";

describe("test url validation", () => {
    it("expect to be invalid url", () => {
        expect(validateUrl("ahmed")).toBe(false)
    })
    
    it("expect to be valid url", () => {
        expect(validateUrl("https://dev.to/")).toBe(true)
    })
});