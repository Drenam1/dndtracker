export default class RollHelper {
  public static rollArray = (array: any[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  public static rollDice = (string: string): string => {
    var regex = /<\w+>/g;
    var matches = string.match(regex);
    var mats = matches ? matches.map((match) => match.slice(1, -1)) : [];
    // eslint-disable-next-line array-callback-return
    mats.map((mat) => {
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
  };
  public static generate_uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var uuid = (Math.random() * 16) | 0;
        return uuid.toString(16);
      }
    );
  };
}
