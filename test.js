const s = "http.:\/\/www.instagram.com.*\/*"

let regex = new RegExp(s, "g");

console.log(regex)

console.log(regex.test("https://www.instagram.com/?hl=es-la"))
