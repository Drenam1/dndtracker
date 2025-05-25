export function rollArray(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function rollDice(string: string): string {
  const regex = /<\w+>/g;
  const matches = string.match(regex);
  const mats = matches ? matches.map((match) => match.slice(1, -1)) : [];
  mats.forEach((mat) => {
    let split = mat.split("d");
    let dice = parseInt(split[0]);
    let sides = parseInt(split[1]);
    let result = 0;
    for (let i = 0; i < dice; i++) {
      result += Math.floor(Math.random() * sides) + 1;
    }
    string = string.replace("<" + mat + ">", result.toString());
  });
  return string;
}
export function generate_uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const uuid = (Math.random() * 16) | 0;
    return uuid.toString(16);
  });
}
