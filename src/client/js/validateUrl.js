// url regex from https://stackoverflow.com/questions/1410311/regular-expression-for-url-validation-in-javascript
let urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

export default function ValidateUrl(url) {
    return urlRegex.test(url);
}
