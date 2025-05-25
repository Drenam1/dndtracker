import * as RollHelper from "./RollHelper";

export interface Person {
  wealth: string;
  gender: string;
  heritage: { placeName: string; description: string };
  looks: string;
  goals: string;
  methods: string;
  profession: string;
  style: string;
  trait: string;
  interest: string;
  quirk: string;
  firstName: string;
  surname: string;
  alias: string;
}

export default class PersonHelper {
  public static formatDescription(person: Person) {
    return `<strong>Wealth:</strong> ${person.wealth}<br><strong>Gender and Look:</strong> ${person.looks} <span title="${person.heritage.description}">${person.heritage.placeName}</span> ${person.gender}<br><strong>Goals: </strong>${person.goals}<br><strong>Methods:</strong> ${person.methods}<br><strong>Profession:</strong> ${person.profession}<br><strong>Clothing Style:</strong> ${person.style}<br><strong>Trait:</strong> ${person.trait}<br><strong>Interest:</strong> ${person.interest}<br><strong>Quirk:</strong> ${person.quirk}`;
  }
  public static generatePerson(wealthLevel: number) {
    const professionArray =
      wealthLevel === 1
        ? this.professonCommon
        : wealthLevel === 2
        ? parseInt(RollHelper.rollDice("<1d2>")) === 1
          ? this.professonCommon
          : this.professonRare
        : this.professonRare;

    const wealth =
      wealthLevel === 1 ? "Poor" : wealthLevel === 2 ? "Moderate" : "Wealthy";
    const heritage = RollHelper.rollArray(this.heritage);
    const gender = RollHelper.rollArray(this.gender);
    const looks = RollHelper.rollArray(
      RollHelper.rollArray(this.looks).split(",")
    );
    const goals = RollHelper.rollArray(
      RollHelper.rollArray(this.goals).split(",")
    );
    const methods = RollHelper.rollArray(
      RollHelper.rollArray(this.method).split(",")
    );
    const profession = RollHelper.rollArray(
      RollHelper.rollArray(professionArray).split(",")
    );
    const style = RollHelper.rollArray(
      RollHelper.rollArray(this.style).split(",")
    );
    const trait = RollHelper.rollArray(
      RollHelper.rollArray(this.trait).split(",")
    );
    let interest = RollHelper.rollArray(
      RollHelper.rollArray(this.interests).split(",")
    );
    if (wealthLevel === 1) {
      interest = interest.replace("Fine ", "");
    }
    const quirk = RollHelper.rollArray(
      RollHelper.rollArray(this.quirks).split(",")
    );
    const firstName = RollHelper.rollArray(
      RollHelper.rollArray(this.firstName).split(",")
    );
    const surname = RollHelper.rollArray(
      RollHelper.rollArray(this.surname).split(",")
    );
    const alias = RollHelper.rollArray(
      RollHelper.rollArray(this.alias).split(",")
    );

    return {
      wealth,
      gender,
      heritage,
      looks,
      goals,
      methods,
      profession,
      style,
      trait,
      interest,
      quirk,
      firstName,
      surname,
      alias,
    } as Person;

    /*openai.chat.completions
      .create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "I will give you details about a person, and you will name that person for me in Duskvol, a dark steampunk Victorian setting where the sun has been extinguished and occasionally roam the streets. Give me a name, and a one-or-two sentence evocative description of person. Give only the name and description, seperated by a semicolon.",
          },
          {
            role: "user",
            content: `Here is a person - Wealth: ${wealth}, Gender: ${gender}, Heritage: ${heritage.placeName}, Heritage Description: ${heritage.description}, Looks: ${looks}, Goals: ${goals}, Methods: ${methods}, Profession: ${profession}, Clothing: ${style}`,
          },
        ],
      })
      .then((response) => {
        items.push(
          `<div><h3>Person: ${response.choices[0].message.content
            ?.split(";")[0]
            .replaceAll(
              "*",
              ""
            )}</h3>${personDescription}<br><strong>Short Description:</strong> ${
            response.choices[0].message.content?.split(";")[1]
          }</div>`
        );
        setGeneratedItems(items);
      });*/
  }

  public static readonly gender = [
    "Man",
    "Man",
    "Woman",
    "Woman",
    "Ambiguous or Concealed",
  ];

  public static readonly heritage = [
    {
      placeName: "Akorosi",
      description:
        "Akoros is the largest and most industrialized land in the Imperium. They're known as a diverse conglomeration of cultures that have grown together in close proximity.",
    },
    {
      placeName: "Akorosi",
      description:
        "Akoros is the largest and most industrialized land in the Imperium. They're known as a diverse conglomeration of cultures that have grown together in close proximity.",
    },
    {
      placeName: "Akorosi",
      description:
        "Akoros is the largest and most industrialized land in the Imperium. They're known as a diverse conglomeration of cultures that have grown together in close proximity.",
    },
    {
      placeName: "Dagger Islander",
      description:
        "People from the Dagger Isles are rootless wanderers. People from here often grow up on ships and travel a lot before settling down. They're known as corsairs and merchants.",
    },
    {
      placeName: "Iruvian",
      description:
        "Iruvia is a rich and powerful desert kingdom far to the south. It's a diverse land of varying cultures.",
    },
    {
      placeName: "Severosi",
      description:
        "Outside of a few Imperial settlements, most Severosi live in nomadic horse-tribes scattered across the blasted deathlands.",
    },
    {
      placeName: "Skovlander",
      description:
        "An island city from just outside of Duskvol. Was recently brought under Imperial rule, and there are many refugees and indentured laborers in the city.",
    },
    {
      placeName: "Skovlander",
      description:
        "Skovlan is an island city from just outside of Duskvol. Was recently brought under Imperial rule, and there are many refugees and indentured laborers in the city.",
    },
    {
      placeName: "Tycheros",
      description:
        "A semi-mythical place, far beyond the northern Void Sea. People say that they are part-demon. People from this land have a demonic telltale (such as black shark eyes, feathers instead of hair, or other similar features).",
    },
  ];

  public static readonly looks = [
    "Large",
    "Lovely",
    "Weathered",
    "Chiseled",
    "Handsome",
    "Athletic",
    "Slim",
    "Dark",
    "Fair",
    "Stout",
    "Delicate",
    "Scarred",
    "Bony",
    "Worn",
    "Rough",
    "Plump",
    "Wiry",
    "Striking",
    "Short",
    "Tall",
    "Sexy",
    "Wild",
    "Elegant",
    "Stooped",
    "Cute",
    "Plain",
    "Old",
    "Young",
    "Stylish",
    "Strange",
    "Disfigured, Maimed",
    "Crippled",
    "Long Haired, Bearded",
    "Shorn, Bald",
    "Tattooed",
  ];

  public static readonly goals = [
    "Wealth",
    "Power",
    "Authority",
    "Prestige, Fame",
    "Control",
    "Knowledge",
    "Pleasure",
    "Revenge",
    "Freedom",
    "Achievement",
    "Happiness",
    "Infamy, Fear",
    "Respect",
    "Love",
    "Change",
    "Chaos, Destruction",
    "Justice",
    "Cooperation",
  ];

  public static readonly method = [
    "Violence",
    "Threats",
    "Negotiaton",
    "Study",
    "Manipulation",
    "Strategy",
    "Theft",
    "Arcane",
    "Commerce",
    "Hard Work",
    "Law, Politics",
    "Sabotage",
    "Subterfuge",
    "Alchemy",
    "Blackmail",
    "Teamwork",
    "Espionage",
    "Chaos",
  ];

  public static readonly professonCommon = [
    "Baker",
    "Barber",
    "Blacksmith",
    "Brewer",
    "Butcher",
    "Carpenter",
    "Cartwright",
    "Chandler",
    "Clerk",
    "Cobbler",
    "Cooper",
    "Cultivator",
    "Carriage Driver",
    "Dyer",
    "Embroiderer",
    "Fishmonger",
    "Gondolier",
    "Guard",
    "Leatherworker",
    "Mason",
    "Merchant",
    "Roofer",
    "Ropemaker",
    "Rug Maker",
    "Servant",
    "Shipwright",
    "Criminal",
    "Tailor",
    "Tanner",
    "Tinkerer",
    "Vendor",
    "Weaver",
    "Woodworker",
    "Goat Herd",
    "Messenger",
    "Sailor",
  ];

  public static readonly professonRare = [
    "Advocate",
    "Architect",
    "Artist",
    "Author",
    "Bailiff",
    "Apiarist",
    "Banker",
    "Bounty Hunter",
    "Clockmaker",
    "Courtesan",
    "Furrier",
    "Glass Blower",
    "Diplomat",
    "Jailer",
    "Jeweler",
    "Leech",
    "Locksmith",
    "Magistrate",
    "Musician",
    "Physicker",
    "Plumber",
    "Printer",
    "Scholar",
    "Scribe",
    "Sparkwright",
    "Tax Collector",
    "Treasurer",
    "Whisper",
    "Composer",
    "Steward",
    "Captain",
    "Spirit Warden",
    "Journalist",
    "Explorer",
    "Rail Jack",
    "Soldier",
  ];

  public static readonly style = [
    "Tricorn Hat",
    "Long Coat",
    "Hood & Veil",
    "Short Cloak",
    "Knit Cap ",
    "Slim Jacket ",
    "Hooded Coat",
    "Tall Boots",
    "Work Boots",
    "Mask & Robes",
    "Suit & Vest ",
    "Collared Shirt ",
    "Suspenders",
    "Rough Tunic ",
    "Skirt & Blouse ",
    "Wide Belt",
    "Fitted Dress",
    "Heavy Cloak ",
    "Thick Greatcoat ",
    "Soft Boots",
    "Loose Silks",
    "Sharp Trousers ",
    "Waxed Coat",
    "Long Scarf ",
    "Leathers",
    "Eelskin Bodysuit",
    "Hide & Furs",
    "Uniform",
    "Tatters",
    "Fitted Leggings",
    "Apron",
    "Heavy Gloves",
    "Face Mask",
    "Tool Belt",
    "Crutches",
    "Cane",
    "Wheelchair",
  ];

  public static readonly trait = [
    "Charming",
    "Cold",
    "Cavalier",
    "Brash",
    "Suspicious",
    "Obsessive",
    "Shrewd",
    "Quiet",
    "Moody",
    "Fierce",
    "Careless",
    "Secretive",
    "Ruthless",
    "Calculating",
    "Defiant",
    "Gracious",
    "Insightful",
    "Dishonest",
    "Patient",
    "Vicious",
    "Sophisticated",
    "Paranoid",
    "Enthusiastic",
    "Elitist",
    "Savage",
    "Cooperative",
    "Arrogant",
    "Confident",
    "Vain",
    "Daring",
    "Volatile",
    "Candid",
    "Subtle",
    "Melancholy",
    "Enigmatic",
    "Calm",
  ];

  public static readonly interests = [
    "Fine Whiskey, Fine Wine, Fine Beer",
    "Fine Food, Fine Restaurants",
    "Fine Clothes, Fine Jewelry, Fine Furs",
    "Fine Arts, Fine Opera, Fine Theatre",
    "Painting, Drawing, Sculpture",
    "History, Legends",
    "Architecture, Furnishings",
    "Poetry, Novels, Writing",
    "Pit-Fighting, Duels",
    "Forgotten Gods",
    "Church of Ecstasy",
    "The Path of Echoes",
    "Weeping Lady",
    "Charity",
    "Antiques, Artifacts, Curios",
    "Horses, Riding",
    "Gadgets, New Technology",
    "Weapons",
    "Music, Instruments, Dance",
    "Hunting, Shooting",
    "Cooking, Gardening",
    "Gambling, Cards, Dice",
    "Natural Philosophy",
    "Drugs, Essences, Tobacco",
    "Lovers, Romance, Trysts",
    "Parties, Social Events",
    "Exploration, Adventure",
    "Birds, Dogs, Cats",
    "Leatherwork",
    "Ships, Boating",
    "Politics, Journalism",
    "Arcane Books, Rituals",
    "Spectrology, Electroplasm",
    "Alchemy, Medicine",
    "Essences, Alchemy",
    "Demon Lore, Legends",
    "Pre-Cataclysm Legends",
  ];

  public static readonly quirks = [
    "Superstitious - Believes in signs, magic numbers, etc.",
    "Devoted to their family.",
    "Married into important/powerful family.",
    "Holds their position to spy for another faction.",
    "Reclusive; Prefers to interact via messengers.",
    "Massive debts (to banks/criminals/family).",
    "Blind to flaws in friends/allies/family.",
    "Once hollowed, then restored. Immune to spirits.",
    "Has chronic illness that requires frequent care.",
    "Secretly (Openly?) controlled by a possessing spirit.",
    "Serves a demon's agenda (knowingly or not).",
    "Proud of heritage, traditions, native language.",
    "Concerned with appearances, gossip, peers.",
    "Drug/alcohol abuser. Often impaired by their vice.",
    "Holds their position due to blackmail.",
    "Relies on council to make decisions.",
    "Involved in war crimes from the Unity War.",
    "Leads a double life using cover identity.",
    "Black sheep/outcast from family or organization.",
    "I prison or under nobles house arrest.",
    "Well-travelled. Connections outside Duskvol.",
    "Revolutionary. Plots against the Imperium.",
    "Inherited their position. May not deserve/want it.",
    "Celebrity. Popularized in print/song/theatre.",
    "Scandalous reputation (warranted or not).",
    "Surrounded by sycophants, supplicants, toadies.",
    "Spotless reputation. Highly regarded.",
    "Bigoted against culture/belief/social class.",
    "Visionary. Holds radical views for the future.",
    "Cursed, haunted, harassed by spirits or demon.",
    "Intensive, unreasonable phobia or loathing.",
    "Extensive education on every scholarly subject.",
    "Keeps detailed journals, notes, records, ledgers.",
    "Is blindly faithful to an ideal, group or tradition.",
    "Deeply traditional. Opposed to new ideas.",
    "A fraud. Some important aspect is fabricated.",
  ];
  public static readonly firstName = [
    "Aldric",
    "Aldo",
    "Amosen",
    "Andrel",
    "Arden",
    "Arlyn",
    "Arquo",
    "Arvus",
    "Ashlyn",
    "Branon",
    "Brace",
    "Brance",
    "Brena",
    "Bricks",
    "Candra",
    "Carissa",
    "Carro",
    "Casslyn",
    "Cavelle",
    "Clave",
    "Corille",
    "Cross",
    "Crowl",
    "Cyrene",
    "Daphnia",
    "Drav",
    "Edlun",
    "Emeline",
    "Grine",
    "Helles",
    "Hix",
    "Holtz",
    "Kamelin",
    "Kelyr",
    "Kobb",
    "Kristov",
    "Laudius",
    "Lauria",
    "Lenia",
    "Lizete",
    "Lorette",
    "Lucella",
    "Lynthia",
    "Mara",
    "Milos",
    "Morlan",
    "Myre",
    "Narcus",
    "Naria",
    "Noggs",
    "Odrienne",
    "Orlan",
    "Phin",
    "Polonia",
    "Quess",
    "Remira",
    "Ring",
    "Roethe",
    "Sesereth",
    "Sethla",
    "Skannon",
    "Stavrul",
    "Stev",
    "Syra",
    "Talitha",
    "Tesslyn",
    "Thena",
    "Timoth",
    "Tocker",
    "Una",
    "Vaurin",
    "Veleris",
    "Veretta",
    "Vestine",
    "Vey",
    "Volette",
    "Vond",
    "Weaver",
    "Wester",
    "Zamira",
  ];

  public static readonly surname = [
    "Ankhayat",
    "Arran",
    "Athanoch",
    "Basran",
    "Boden",
    "Booker",
    "Bowman",
    "Breakiron",
    "Brogan",
    "Clelland",
    "Clermont",
    "Coleburn",
    "Comber",
    "Daava",
    "Dalmore",
    "Danfield",
    "Dunvil",
    "Farros",
    "Grine",
    "Haig",
    "Helker",
    "Helles",
    "Hellyers",
    "Jayan",
    "Jeduin",
    "Kardera",
    "Karstas",
    "Keel",
    "Kessarin",
    "Kinclaith",
    "Lomond",
    "Maroden",
    "Michter",
    "Morriston",
    "Penderyn",
    "Prichard",
    "Rowan",
    "Sevoy",
    "Skelkallan",
    "Skora",
    "Slane",
    "Strangford",
    "Strathmill",
    "Templeton",
    "Tyrconnell",
    "Vale",
    "Walund",
    "Welker",
  ];

  public static readonly alias = [
    "Bell",
    "Birch",
    "Bricks",
    "Bug",
    "Chime",
    "Coil",
    "Cricket",
    "Cross",
    "Crow",
    "Echo",
    "Flint",
    "Frog",
    "Frost",
    "Grip",
    "Gunner",
    "Hammer",
    "Hook",
    "Junker",
    "Mist",
    "Moon",
    "Nail",
    "Needle",
    "Ogre",
    "Pool",
    "Ring",
    "Ruby",
    "Silver",
    "Skinner",
    "Song",
    "Spur",
    "Tackle",
    "Thistle",
    "Thorn",
    "Tick-Tock",
    "Twelves",
    "Vixen",
    "Whip",
    "Wicker",
  ];
}
