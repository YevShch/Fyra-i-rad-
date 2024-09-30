// generate a random code with three capital letters followed by three digits
export default function generateCode() {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  while (code.length < 3) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  while (code.length < 6) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}