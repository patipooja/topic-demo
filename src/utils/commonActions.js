export const getCookie = (name) =>
  document.cookie
    .split('; ')
    .filter((cookie) => cookie.split('=')[0] === name)
    .map((cookie) => cookie.match(new RegExp(`${name}=(.*)`))[1])[0];
