import { Clock, NPC } from "./genericHelper";

export interface Faction {
  name: string;
  description: string;
  tier: number;
  hold: "weak" | "moderate" | "strong";
  turf: string[];
  NPCs: NPC[];
  assets: string[];
  quirks: string;
  allies: string[];
  enemies: string[];
  situation: string;
  clocks: Clock[];
  aiDescription?: string;
}

export default class FactionHelper {
  public static factions: Faction[] = [
    {
      name: "The Billhooks",
      description:
        "A tough gang of thugs who prefer hatchets, meat hooks and polearms.",
      tier: 2,
      hold: "weak",
      turf: [
        "A butcher shop (HQ), stockyard and slaughterhouse.",
        "Animal fight pits and gambling dens.",
        "Several terrified merchants and businesses who they extort.",
      ],
      NPCs: [
        {
          name: "Tarvul",
          role: "leader, serving life in prison",
          traits: ["savage", "arrogant", "family man"],
        },
        {
          name: "Erin",
          role: "captain, Tarvul's sister",
          traits: ["confident", "deadly", "ambitious"],
        },
        {
          name: "Coran",
          role: "thug, Tarvul's son",
          traits: ["fierce", "loyal", "quiet"],
        },
      ],
      assets: [
        "A large gang of bloodthirsty butchers",
        "A pack of death-dogs.",
      ],
      quirks:
        "The Billhooks have a bloody reputation, often leaving the butchered corpses of their victims strewn about in a grisly display. Many wonder why the Bluecoats turn a blind eye to their savagery.",
      allies: ["The Bluecoats", "Ministry of Preservation"],
      enemies: [
        "Ulf Ironborn",
        "The Lost",
        "Citizenry of Crow's Foot and the Docks",
      ],
      situation:
        "Erin and Coran both want to take control of the Billhooks gang, either when Tarvul gets too old (which will be soon) or by taking the position by force. There is no love lost between Erin and Corran and they'll have no qualms about fighting a family member for leadership. Meanwhile, the rest of the gang wants to continue their reign of terror to pressure a magistrate to pardon Tarvul and other gang members and release them from Ironhook.",
      clocks: [
        {
          name: "Terrorize magistrates to pardon members in prison",
          description:
            "The Billhooks are terrorizing magistrates to pardon their members in prison. When the clock is filled, the Billhooks will have their members released from Ironhook and their tier and hold will increase by 1.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Billhooks are a ruthless gang known for their brutal violence, favoring hatchets, meat hooks, and polearms. They leave behind grisly scenes, with butchered bodies as their signature. Despite their savagery, the Bluecoats suspiciously ignore their crimes. With leadership is in flux, Erin and Coran vie to replace the imprisoned Tarvul, with both willing to kill for control. Meanwhile, the gang intensifies their terror campaign, hoping to coerce a magistrate into pardoning Tarvul and their imprisoned members from Ironhook.",
    },
    {
      name: "The Bluecoats",
      description:
        "The City Watch of Duskwall. Known as the meanest gang in the city. Corrupt, violent and cruel.",
      tier: 3,
      hold: "strong",
      turf: [
        "The Bluecoats claim the whole ciy as their turf, but find their influence severely limited in Whitecrown where the Imperial Military garrison holds sway under command of the Lord Governer.",
      ],
      NPCs: [
        {
          name: "Commander Clelland",
          role: "chief commissioner of the City Watch",
          traits: ["corrupt", "cruel", "arrogant"],
        },
        {
          name: "Captain Michter",
          role: "chief instructor",
          traits: ["ambitious", "fierce", "confident"],
        },
        {
          name: "Captain Vale",
          role: "quartermaster",
          traits: ["loyal", "insightful", "quiet"],
        },
      ],
      assets: [
        "Many large gangs of vicious thugs in uniform",
        "Armored coaches and canal patrol boat",
        "Public punishment sites (pillories, stocks, hanging cages).",
      ],
      quirks:
        "The Bluecoats are divided into companies by district and they have fierce rivalries, encouraged by their superiors - often good-natured, but sometimes violent. ",
      allies: [
        "City Council",
        "The Billhooks",
        "The Crows",
        "Ironhook Prison",
        "Lord Scurlock",
        "The Unseen",
      ],
      enemies: ["Imperial Military", "Many criminal organizations"],
      situation:
        "The Bluecoats have become jealous of the elite hardware and vehicles used by the Imperial Military. They want to refit their watch-guards in heavy armor and weapons, to better strike fear into those they prey upon.",
      clocks: [
        {
          name: "Procure bigger budget, military arms and equipment",
          description:
            "The Bluecoats are trying to procure a bigger budget and military arms and equipment. When the clock is filled, the Bluecoats will have the equipment they need to strike fear into the hearts of the citizens of Duskwall and their tier will incerase by 1.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Bluecoats are Duskwall's corrupt and brutal City Watch, infamous as the city's meanest gang. Divided into district-based companies with fierce rivalries, their internal competition can turn violent. Jealous of the Imperial Military's elite gear, the Bluecoats aspire to refit themselves with heavy armor and advanced weaponry, aiming to enhance their intimidation and control over the city. Their ambitions reflect a desire for more power, making them even more dangerous to those they already oppress and exploit.",
    },
    {
      name: "The Church of Ecstasy",
      description:
        "The 'State Religion' honors the life of the body and abhors the corrupted spirit world. Essentially a secret society.",
      tier: 4,
      hold: "strong",
      turf: [
        "The Sanctorium grand cathedral in Brightstone",
        "Many smaller temples across the city.",
      ],
      NPCs: [
        {
          name: "Elder Rowan",
          role: "leader",
          traits: ["devout", "resolute", "visionary"],
        },
        {
          name: "Preceptor Dunvil",
          role: "arcane researcher",
          traits: ["unorthodox", "obsessive", "enigmatic"],
        },
      ],
      assets: [
        "A large treasury of tithes from citizens.",
        "Extensive arcane and occult libraries, workspaces and artifacts.",
        "Many cohorts of acolytes and hollows who enforce the will of the church's leadership.",
      ],
      quirks:
        "Zealous believers volunteer to be hollowed to 'become purified'. This was once common among the ancient cult of the Empty Vessel, which preceded the Church.",
      allies: ["City Council", "Leviathan Hunters", "Spirit Wardens"],
      enemies: ["The Path of Echoes", "The Reconciled"],
      situation:
        "The purest beings (according to secret teachings of the Church), are those entirely without spirits: the demons. Demons are immortal, but never fade into madness or lustful hungers as rogue human spirits and vampires do. They are perfect; and the most devout of the Church seek to become as they are, to unlock the secret of ascension. Many dark experiments and rituals with hulls, hollows, vampires-and the rare demon-are conducted in the labyrinthine dungeons below the Church's chief cathedral in Brightstone.",
      clocks: [
        {
          name: "Unlock the secret of ascension",
          description:
            "The Church of Ecstasy is trying to unlock the secret of ascension. When the clock is filled, the Church will have unlocked the secret of ascension and will be able to transform into Demons.",
          totalSegments: 12,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Eliminate the Reconciled",
          description:
            "The Church of Ecstasy is trying to eliminate the Reconciled. When the clock is filled, the Church will have eliminated the Reconciled. The Reconciled faction disappears.",
          totalSegments: 12,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Church of Ecstasy, Duskwall’s state religion, reveres the body while despising the corrupted spirit world. Secretly, they believe demons, free from spirits and immortal, are the purest beings. The most devout seek to emulate demons through dark rituals, experiments, and hollowing practices, aiming for ascension. In the hidden dungeons beneath their cathedral in Brightstone, the Church conducts gruesome experiments on hulls, hollows, vampires, and even demons, continuing the ancient practices of the Empty Vessel cult that preceded them, all in pursuit of their twisted vision of purity.",
    },
    {
      name: "The Circle of Flame",
      description:
        "A refined secret society of antiquarians and scholars; cover for extortion, graft, vice and murder.",
      tier: 3,
      hold: "strong",
      turf: ["The Centuralia club, Six Towers (HQ)"],
      NPCs: [
        { name: "The Seven", role: "leadership", traits: [] },
        {
          name: "Elstera Avrathi",
          role: "Iruvian diplomat",
          traits: ["secretive", "gracious"],
        },
        {
          name: "Lady Drake",
          role: "magistrate",
          traits: ["cunning", "ruthless"],
        },
        {
          name: "Raffello",
          role: "painter",
          traits: ["visionary", "obsessive"],
        },
        {
          name: "Lord Mora",
          role: "noble",
          traits: ["cold", "suspicious"],
        },
        {
          name: "Lady Penderyn",
          role: "noble",
          traits: ["charming", "patient"],
        },
        {
          name: "Madame Tesslyn",
          role: "vice purveyor",
          traits: ["sophisticated", "subtle"],
        },
        {
          name: "Harvale Brogan",
          role: "vice purveyor",
          traits: ["shrewd", "quiet"],
        },
      ],
      assets: [
        "A vast treasury provided by wealthy membership.",
        "An impressive collection of ancient arifacts, maps and ephemera.",
        "Highly trained and discreet security force.",
      ],
      quirks: "One of The Seven is actually a demon in disguise.",
      allies: [
        "The Forgotten Gods",
        "The Path of Echoes",
        "City Council",
        "The Foundation",
      ],
      enemies: ["The Hive", "The Silver Nails"],
      situation:
        "The Circle has an extensive library of scholarly works that catalog many of the arcane artifacts and valuable treasures that disappeared when the Lost District was abandoned outside the lightning barrier. Of special interest are the remains of Kotar, a legendary sorcerer, demon, or hero who was mummified before the cataclysm. The Eye, Hand, and Heart of Kotar are said to possess great power for those bold enough to risk their use.",
      clocks: [
        {
          name: "Acquire all the ancient artifacts of Kotar",
          description:
            "The Circle of Flame is trying to acquire all the ancient artifacts of Kotar. When the clock is filled, the Circle will have acquired all the ancient artifacts of Kotar.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Circle of Flame is a secret society of refined antiquarians and scholars, serving as a front for extortion, graft, vice, and murder. One of its seven members is secretly a demon. They possess an extensive library documenting arcane artifacts from the Lost District, particularly the remains of Kotar - a legendary figure mummified before the cataclysm. The Eye, Hand, and Heart of Kotar are rumored to hold immense power, drawing the Circle's interest as they seek to harness these dangerous relics.",
    },
    {
      name: "City Council",
      description:
        "The elite nobility who run the city government, its treasury, magistrates and public works.",
      tier: 5,
      hold: "strong",
      turf: [
        "The city council chambers are in Charterhall, along with the attendant government offices and impregnable treasury vaults.",
        "The council holds ownershp of all public spaces in the city, including streets, docks and waterways.",
      ],
      NPCs: [
        {
          name: "The scion of house Bowmore",
          role: "",
          traits: [],
        },
        {
          name: "The scion of house Clelland",
          role: "",
          traits: [],
        },
        {
          name: "The scion of house Dunvil",
          role: "",
          traits: [],
        },
        {
          name: "The scion of house Penderyn",
          role: "",
          traits: [],
        },
        {
          name: "The scion of house Rowan",
          role: "",
          traits: [],
        },
        {
          name: "The scion of house Strangford",
          role: "",
          traits: [],
        },
      ],
      assets: [
        "A massive trasury of coin and valuable goods.",
        "Manyofficials, barristers and clerks.",
        "The public coaches operated by the Cabbies.",
      ],
      quirks:
        "The members of the Council are all high-ranking adepts in the Church of the Ecstacy of the Flesh. Some of them are also secretly initiates in the Path of Echoes.",
      allies: [
        "The Bluecoats",
        "The Church of Ecstasy",
        "The Circle of Flame",
        "Lord Scurlock",
        "The Brigade",
        "Cabbies",
        "Sparkwrights",
        "The Foundation",
      ],
      enemies: [
        "Imperial Military",
        "Inspectors",
        "Ministry of Preservation",
        "The Recociled",
      ],
      situation:
        "Three of the councillors (Bowmore, Clelland, Rowan) have aligned against Strangford and are manoeuvring to remove the house from the council. Dunvil and Penderyn have not taken sides so far. Can the conspirators arrange for the necessary scandal, framed crime, or assassinations to remove Strangford? Or can Strangford House stand against them and eliminate the threats?",
      clocks: [
        {
          name: "Strangford is removed from council",
          description:
            "The City Council is trying to remove Strangford from the council. When the clock is filled, Strangford will have been removed from the council.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Strangford eliminates the threats",
          description:
            "Strangford is trying to eliminate the threats. When the clock is filled, Strangford will have eliminated the threats.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The City Council is the elite nobility governing Duskwall's treasury, magistrates, and public works, all high-ranking adepts in the Church of Ecstasy, with some secretly following the Path of Echoes. A power struggle is brewing as Councillors Bowmore, Clelland, and Rowan conspire to remove House Strangford from the council. Dunvil and Penderyn remain neutral, but the conspirators are plotting scandals, framed crimes, or assassinations to achieve their goal. Strangford must either fend off these threats or face elimination in this dangerous political game.",
    },
    {
      name: "The Crows",
      description:
        "An old gang with new leadership. Known for running illegal games of chance and extortion rackets.",
      tier: 2,
      hold: "weak",
      turf: [
        "Claim all of Crow's Foot as their turf. Everyone in the district pays ip the chain to them.",
        "HQ in an abandoned City Watch tower.",
        "Operates gambling dens in Crow's Foot and extortion rackets at the Docks.",
      ],
      NPCs: [
        {
          name: "Lyssa",
          role: "leader",
          traits: ["brash", "killer", "noble family"],
        },
        {
          name: "Bell",
          role: "second-in-command",
          traits: ["loyal"],
        },
      ],
      assets: [
        "A veteran gang of thugs and killers.",
        "A small number of boats.",
        "A fortified HQ.",
      ],
      quirks:
        "Roric's body was lost during his murder (it fell into a canal). His vengeful ghost is now at large in the city.",
      allies: [
        "The Bluecoats",
        "Sailors",
        "The Lost",
        "Citizens of Crow's Foot",
      ],
      enemies: ["The Hive", "Inspectors", "Dockers"],
      situation:
        "Lyssa murdered the former boss of the Crows, Roric. She is a fearsome killer, and few want to cross her, but her position as leader of the Crows is uncertain. Some were very loyal to Roric. As the power-play continues, the Crows' hold on the district just might slip away.",
      clocks: [
        {
          name: "Reestablish control of Crow's Foot",
          description:
            "Lyssa is trying to reestablish control of Crow's Foot. Once the clock is filled, Crow's Foot will be firmly under her thumb. Hold is increased by 2.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Rise in tier",
          description:
            "The Crows are trying to build up their gang. Each time the clock fills, their tier increases by 1.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: true,
        },
      ],
      aiDescription:
        "The Crows are an old gang known for illegal gambling and extortion, now under the ruthless leadership of Lyssa, who murdered the former boss, Roric. However, Roric's vengeful ghost haunts the city, and Lyssa's grip on the gang is tenuous, as some members remain loyal to Roric. As internal tensions rise and loyalties waver, the Crows risk losing their control over the district, leaving their future uncertain amidst the power struggle.",
    },
    {
      name: "Deathlands Scavengers",
      description:
        "Convicts from Ironhook and desperate freelancers who roam the wasteland beyond the lightning barriers.",
      tier: 2,
      hold: "weak",
      turf: [
        "A few precious hold-fasts in the deathlands, secured by ancient rites against spirit",
        "Hunting grounds to feed on the few strange animals that survived the cataclysm.",
      ],
      NPCs: [
        {
          name: "Lady Thorn",
          role: "leader",
          traits: ["haunted", "brave", "caring"],
        },
        {
          name: "Richter",
          role: "hunter",
          traits: ["patient", "quiet", "deadly"],
        },
      ],
      assets: [
        "Generators, lightning hooks, gas-masks, air tanks and other essentials of deathlands survival.",
        "A secret ancient book of ritual sorcery.",
      ],
      quirks:
        "Possession is a common hazard, and scavengers either learn to deal with it, or go mad and vanish into the darkness of the wastes. Those still in Lady Thorn's company have adapted well and suffer only minimal effects from possession",
      allies: ["Forgotten Gods", "Gondoliers", "Spirit Wardens"],
      enemies: ["Ironhook Prison"],
      situation:
        'Condemned prisoners are sometimes given "mercy" and sent into the deathlands rather than being executed at Ironhook. A few survive, thanks to Lady Thorn and her deathlands scavengers, who take them in and train them in the ways of deathlands hunting and survival. The scavengers hunt for lost artifacts and treasures in the wastes, to sell or trade in the city, sometimes for enough to buy a pardon and return to life within the barriers once again.',
      clocks: [
        {
          name: "Obtain pardons",
          description:
            "The Deathlands Scavengers are trying to obtain pardons. When the clock is filled, the Deathlands Scavengers will have obtained pardons for some of their members and their tier increases by 1.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: true,
        },
      ],
      aiDescription:
        "The Deathlands Scavengers are a group of convicts and freelancers who brave the deadly wastelands beyond Duskwall's lightning barriers. Led by Lady Thorn, they’ve adapted to the constant threat of possession, which drives many to madness. Condemned prisoners are sometimes spared execution and sent into the deathlands, where Lady Thorn trains them in survival and scavenging. These scavengers hunt for lost artifacts and treasures in the wastes, hoping to sell or trade them in the city for a chance to buy a pardon and return to life within the barriers.",
    },
    {
      name: "The Dimmer Sisters",
      description: "House-bound recluses with an occult reputation.",
      tier: 2,
      hold: "strong",
      turf: [
        "Fine old manor house and grounds (HQ), as well as the ancient temple ruin and subterranean canal beneath.",
        "Apothecaries and witches in their service.",
      ],
      NPCs: [
        {
          name: "Roslyn",
          role: "servant, deals with contacts outside the house",
          traits: ["patient", "loyal", "arcane"],
        },
        {
          name: "Irelen",
          role: "sparkcraft tinkerer",
          traits: ["loyal", "enigmatic", "obsessive"],
        },
      ],
      assets: [
        "A private electroplasmic generator, lightning barriers and spirit containment vessels.",
        "Many spirits bound to their service.",
      ],
      quirks:
        "The precise number of sisters is unknown. Some say they are an ancient family of possessing spirits. Others say they are vampires. Everyone knows that if you go into their house, you never come out again.",
      allies: ["The Forgotten Gods", "The Foundation"],
      enemies: ["Spirit Wardens", "The Reconciled"],
      situation:
        "The Sisters have been slowly and secretly consolidating the trade of captured spirits and spirit essences in Doskvol for several decades. Only a few remaining rivals stand between them and domination of the market. Do they have an ulterior motive for acquiring so many spirits and essences, or is this purely a matter of wealth and power?",
      clocks: [
        {
          name: "Dominate the spirit trade.",
          description:
            "The Dimmer Sisters are trying to dominate the spirit trade. When the clock is filled, the Dimmer Sisters will have dominated the spirit trade, pushing out almost all competitors.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Obtain arcane secrets.",
          description:
            "The Dimmer Sisters are trying to obtain arcane secrets. When the clock is filled, the Dimmer Sisters will have obtained an arcane secret.",
          totalSegments: 4,
          filledSegments: 0,
          repeating: true,
        },
      ],
      aiDescription:
        "The Dimmer Sisters are mysterious, house-bound recluses with a dark occult reputation. Their true nature is unknown—some believe they are possessing spirits or vampires. It’s widely feared that entering their house means never returning. For decades, the Sisters have secretly consolidated control over the trade of captured spirits and spirit essences in Doskvol, with only a few rivals left in their path. Their ultimate motive remains unclear—whether it's driven by wealth, power, or something more sinister.",
    },
    {
      name: "The Fog Hounds",
      description: "A crew of rough smugglers looking for a patron.",
      tier: 1,
      hold: "weak",
      turf: [
        "Underground canal dock (HQ).",
        "North and East city canal routes.",
        "Northern Void Sea routes.",
        "Old North Port supply caches.",
      ],
      NPCs: [
        {
          name: "Margette Vale",
          role: "leader",
          traits: ["quiet", "cold", "fearless"],
        },
        {
          name: "Bear",
          role: "second",
          traits: ["fierce", "moody", "brash"],
        },
        {
          name: "Goldie",
          role: "navigator",
          traits: ["calculating", "patient", "confident"],
        },
      ],
      assets: [
        "The Fog Hound, a medium-sized steamship",
        "A crew of hard-bitten, tough, expert sailors - all former Void Sea transport haulers put out of work by the new cargo rail lines, well-worn by years of harrowing work.",
        "A wide array of Imperial transport and cargo documents, some forged, some legit.",
      ],
      quirks:
        "As veterans of many cruises on the Void Sea, Vale and her crew can be insular and clannish and have a low initial opinion of anyone who hasn't proven themselves in a similar way. Once won, however, their loyalty is rock-solid and fierce.",
      allies: ["Dockers", "The Lampblacks"],
      enemies: ["Bluecoats", "The Vultures"],
      situation:
        "Vale and her crew have mastered the Northern smuggling routes in and out of Duskwall. They're currently attempting to absorb or eliminate the few remaining rivals on their territory and then establish reliable, regular work with a patron who needs a steady stream of contraband.",
      clocks: [
        {
          name: "Eliminate rival smugglers",
          description:
            "The Fog Hounds are trying to eliminate rival smugglers. When the clock is filled, the Fog Hounds will have eliminated some rival smugglers. Their hold increases by 1.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: true,
        },
        {
          name: "Obtain a regular patron",
          description:
            "The Fog Hounds are trying to find a patron. When the clock is filled, the Fog Hounds will have found a patron. Their tier increases by 1.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Fog Hounds are a tight-knit crew of experienced smugglers, led by Vale, with deep knowledge of the Northern smuggling routes in and out of Duskwall. Insular and clannish, they initially distrust outsiders, but once earned, their loyalty is unwavering. Vale and her crew are focused on absorbing or eliminating their remaining rivals to secure their territory. Their goal is to find a patron who requires a consistent flow of contraband, establishing steady, reliable work to cement their dominance in the smuggling trade.",
    },
    {
      name: "Gondoliers",
      description:
        "The canal boat operators. Venerated by ancient tradition. Said to know occult secrets (many things are submerged in the Dusk).",
      tier: 3,
      hold: "strong",
      turf: [
        "The canals of Doskvol. Even the Bluecoats' canal patrols pay respect to them",
      ],
      NPCs: [
        {
          name: "Eisele",
          role: "leader",
          traits: ["serene", "knowledgable", "fearless"],
        },
        {
          name: "Griggs",
          role: "chief Whisper",
          traits: ["strange", "ruthless", "haunted"],
        },
      ],
      assets: [
        "A fleet of gondolas and other watercraft.",
        "Map of known spirit wells and arcane sites across the city.",
        "A dedicated cohort of Adepts.",
      ],
      quirks:
        "Initiation into the Gondoliers grants the Whisper's Compel special ability.",
      allies: ["The Lampblacks", "Citizenry in all ditricts"],
      enemies: ["The Red Sashes", "Spirit Wardens"],
      situation:
        'Killers have disposed of bodies in the canals of Doskvol for centuries. The vengeful ghosts that rise from the corpses are a serious threat-a threat dealt with by the Gondoliers since ancient times. Before the Spirit Wardens were created by the Emperor, the Gondoliers protected citizens from rogue spirits and supernatural dangers of all kinds. The Gondoliers are beloved by most citizens, who prefer to go to them with "weird problems" rather that relying on the ruthless and indiscriminate judgment of the Spirit Wardens. A sudden influx of ritually disfigured hollows dumped in the canals has sparked investigation by the Gondoliers (the Spirit Wardens are pointedly ignoring the situation).',
      clocks: [
        {
          name: "Investigate desecrated hollows",
          description:
            "The Gondoliers are trying to investigate the desecrated hollows. When the clock is filled, the Gondoliers will have investigated the desecrated hollows.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Destroy spirit wells",
          description:
            "The Gondoliers are trying to destroy rogue spirit wells. When the clock is filled, the Gondoliers will have destroyed a rogue spirit well.",
          totalSegments: 4,
          filledSegments: 0,
          repeating: true,
        },
      ],
      aiDescription:
        "The Gondoliers are revered canal boat operators in Doskvol, known for their ancient traditions and occult knowledge. Initiation grants the Whisper's Compel ability, linking them deeply to the city's supernatural undercurrents. For centuries, they've protected citizens from vengeful ghosts and other supernatural threats, a role they held before the Spirit Wardens existed. Beloved by locals, they are often sought for help with \"weird problems.\" Recently, a surge of ritually disfigured hollows dumped in the canals has drawn their attention, as the Spirit Wardens conspicuously ignore the situation, prompting the Gondoliers to investigate.",
    },
    {
      name: "The Gray Cloaks",
      description:
        "A crew of former Bluecoats turned to crime after being framed and expelled from the City Watch.",
      tier: 2,
      hold: "strong",
      turf: [
        "The basement of a burned-down City Watch station (HQ).",
        "Several apartments above a tobacconist in Six Towers.",
        "A pit-fighting arena and gambling den.",
      ],
      NPCs: [
        {
          name: "Nessa",
          role: "leader",
          traits: ["scrupulous", "daring"],
        },
        {
          name: "Hutch",
          role: "second",
          traits: ["brash", "fearless"],
        },
      ],
      assets: [
        "The Gray Cloaks have attracted other former Bluecoats to their crew, amassing a sizeable gang of trained enforcers.",
        "They have their old uniforms and badges and often use them to pass as the City Watch.",
      ],
      quirks: "",
      allies: ["Inspectors"],
      enemies: ["The Bluecoats", "Lord Strangford"],
      situation:
        "The Gray Cloaks are all former Bluecoats who were framed for a crime committed by their Watch station commander. Sure, they were skimming from the city coffers and taking bribes like everyone else, but they didn't burn down the Watch station and destroy the evidence in the case against Lord Strangford (of the Leviathan Hunters). Several inspectors who were working the case know the truth but can't prove anything - yet. Lord Strangford would pay well to have these loose ends removed permanently.",
      clocks: [
        {
          name: "Secure Six Towers as their turf.",
          description:
            "The Gray Cloaks are trying to secure Six Towers as their turf. When the clock is filled, Six Towers will be firmly under their control.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Avenge their expulsion",
          description:
            "The Gray Cloaks are trying to avenge their expulsion. When the clock is filled, the Gray Cloaks will have avenged their expulsion and submitted evidence against Lord Strangford.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Gray Cloaks are a crew of ex-Bluecoats turned criminals after being framed and expelled from the City Watch. Though guilty of skimming and taking bribes, they didn't burn down their Watch station or destroy evidence against Lord Strangford, as they were accused. Now, they seek revenge and survival, knowing the truth behind the crime. Several inspectors are aware of their innocence but lack proof. Meanwhile, Lord Strangford, fearing exposure, is willing to pay handsomely to have these loose ends eliminated permanently.",
    },
    {
      name: "The Grinders",
      description:
        "A vicious gang of former dockers and leviathan blood refinery workers.",
      tier: 2,
      hold: "weak",
      turf: ["Abandoned dock warehouse (HQ) and underground canal dock."],
      NPCs: [
        {
          name: "Hutton",
          role: "leader",
          traits: ["confident", "volatile"],
        },
        {
          name: "Sercy",
          role: "second",
          traits: ["crippled", "defiant"],
        },
        {
          name: "Derret",
          role: "toughest gang member",
          traits: ["huge", "shrewd"],
        },
      ],
      assets: ["A few small canal boats.", "Wrecking tools and explosives."],
      quirks:
        "Many Grinders have been mutated by the toxic rain that plagues Lockport.",
      allies: ["Ulf Ironborn", "Dockers"],
      enemies: [
        "Bluecoats",
        "Imperial Military",
        "Leviathan Hunters",
        "Sailors",
        "The Silver Nails",
      ],
      situation:
        'The city of Lockport, to the North in Skovlan, processes 90% of the demon blood siphoned by the leviathan hunter ships of Doskvol (the hunters drop their raw cargo at Lockport before filling their holds with refined blood and returning to Doskvol for repairs and replacement crew for those lost to the Void Sea). The huge, churning refineries in Lockport have poisoned the city under a stinking cloud of toxic fumes and acid rain. A group of dockers and refinery workers from Lockport have come to Doskvol to raise an army and secure a warship with which to seize control of Lockport and destroy the Empire\'s refineries. They call themselves "the Grinders." To raise funds for their mission, the Grinders have turned to criminal endeavors, especially smash & grab looting and hijacking of cargo barges across the city.',
      clocks: [
        {
          name: "Raise a crew, steal a war ship",
          description:
            "The Grinders are trying to raise a crew and steal a war ship. When the clock is filled, the Grinders will have raised a crew and stolen a war ship. Their tier increases by 2.",
          totalSegments: 12,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Fill war treasury",
          description:
            "The Grinders are trying to fill their war treasury. When the clock is filled, the Grinders will have filled their war treasury and will be able to launch their attack on Lockport.",
          totalSegments: 12,
          filledSegments: 0,
          repeating: true,
        },
      ],
      aiDescription:
        "The Grinders are a ruthless gang of former dockers and leviathan blood refinery workers from Lockport, where toxic rain and fumes have mutated many of them. Disgusted by the poisoned conditions of their city, they’ve come to Doskvol with the goal of raising an army and securing a warship to seize control of Lockport and destroy the Empire’s refineries. To fund their rebellion, the Grinders have turned to crime, specializing in smash-and-grab heists and hijacking cargo barges across Doskvol. Their mission is fueled by vengeance and a desire to cripple the Empire’s industry.",
    },
    {
      name: "The Hive",
      description:
        "A guild of legitimate merchants who secretly trade in contraband. Named for their symbol, a golden bee.",
      tier: 4,
      hold: "strong",
      turf: [
        "Many shops, taverns, cafes, warehouses and other mercantile establishments across the city.",
        "No centralized HQ.",
      ],
      NPCs: [
        {
          name: "Djera Maha",
          role: "leader",
          traits: ["bold", "strategic", "confident"],
        },
        {
          name: "Karth Orris",
          role: "mercenary commander",
          traits: ["ruthless", "insightful", "jealous"],
        },
      ],
      assets: [
        "A massive treasury.",
        "Elite mercenaries on retainer.",
        "A fleet of transport ships, carriages, wagons and private trains.",
      ],
      quirks:
        "The Hive is known to avoid doing business with any occult or arcane groups. The Church of Ecstasy is popular among Hive members, who reject the superstitions and weird practices of the past.",
      allies: ["Ministry of Preservation", "Dagger Isles Consulate"],
      enemies: [
        "The Circle of Flame",
        "The Unseen",
        "The Crows",
        "The Wraiths",
      ],
      situation:
        "Djera Maha grew up as an urchin in the Dagger Isles. She learned all the secrets of vice and smuggling as she worked her way up the ranks of every gang along the trade routes to Doskvol. Having built up her acquisition and distribution network in the city (as well as within the Ministry of Preservation) she is poised to take over all of the contraband markets. Maha had a close relationship (some say romantic) with the leader of the Crows, Roric, who was recently murdered by his second-in-command.",
      clocks: [
        {
          name: "Dominate the contraband market",
          description:
            "The Hive is trying to dominate the contraband market. When the clock is filled, the Hive will have dominated the contraband market, pushing out almost all competitors.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Avenge Roric's murder",
          description:
            "The Hive is trying to avenge Roric's murder. When the clock is filled, Lyssa will have been killed in retaliation.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Hive is a guild of legitimate merchants who secretly deal in contraband, symbolized by a golden bee. They avoid any dealings with occult or arcane groups, aligning instead with the Church of Ecstasy. Led by Djera Maha, a former urchin from the Dagger Isles, the Hive has built a vast smuggling network in Doskvol and within the Ministry of Preservation. Maha, poised to dominate the city's contraband markets, had a close relationship with Roric, the murdered leader of the Crows, adding intrigue to her rise to power.",
    },
    {
      name: "The Lampblacks",
      description:
        "The former lamp-lighter guild, turned to crime when their services were replaced by electric lights.",
      tier: 2,
      hold: "weak",
      turf: [
        "HQ in the office of a coal warehouse.",
        "Operates a handful of brothels and cheap drug dens across Crow's Foot.",
      ],
      NPCs: [
        {
          name: "Baszo Baz",
          role: "leader",
          traits: ["charming", "open", "ruthless", "whiskey connoisseur"],
        },
        {
          name: "Pickett",
          role: "second",
          traits: ["shrewd", "conniving", "suspicious"],
        },
        {
          name: "Henner",
          role: "thug",
          traits: ["loyal", "reckless"],
        },
      ],
      assets: [
        "A fearsome gang of leg-breakers and mayhem-makers.",
        "A number of smugglers on the payroll who run their drugs.",
      ],
      quirks:
        "Baszo Baz is a member of a secret society (forgotten gods cult, 'The Empty Vessel') and sometimes puts the needs of that group ahead of the well-being of his gang.",
      allies: ["The Fog Hounds", "Gondoliers", "Ironhook Prison"],
      enemies: ["The Red Sashes", "The Bluecoats", "Cabbies"],
      situation:
        "The Lampblacks and the Red Sashes are at war over turf and vengeance for deaths on both sides. Bazso Baz is recruiting every free blade in the district for extra muscle and doesn't take no for an answer. You're either with them or against them. The Lampblacks are not particularly well-connected politically, but are akin to folk-heroes among the working class, who see them as \"lovable rogues\" standing up to the powers-that-be.",
      clocks: [
        {
          name: "Destroy the Red Sashes",
          description:
            "The Lampblacks are trying to destroy the Red Sashes. When the clock is filled, the Red Sashes will have been destroyed.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Become the ward boss of Crow's Foot",
          description:
            "Baszo Baz is trying to become the ward boss of Crow's Foot. When the clock is filled, the he will have become the ward boss of Crow's Foot. Inherit the Red Sashes turf.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        'The Lampblacks, once a lamp-lighter guild, turned to crime after being replaced by electric lights. Led by Baszo Baz, a member of the secret "Empty Vessel" cult, their gang is currently at war with the Red Sashes over turf and revenge. Baszo is aggressively recruiting muscle, leaving no room for neutrality—you’re either with them or against them. Though lacking political connections, the Lampblacks are seen as "lovable rogues" by the working class, who view them as champions against the oppressive powers-that-be.',
    },
    {
      name: "Leviathan Hunters",
      description:
        "The captains and crews that grapple with titanic demons of the Void Sea to drain the blood for processing into electroplasm.",
      tier: 5,
      hold: "strong",
      turf: [
        "The massive metal docks for the huge hunter ships and the associated construction and repair facilities.",
        "Several small private leviathan blood processing refineries for the captain's personal share.",
      ],
      NPCs: [
        {
          name: "Lord Strangford",
          role: "captain",
          traits: ["arrogant", "ruthless", "tainted"],
        },
        {
          name: "Lady Clave",
          role: "captain",
          traits: ["daring", "cruel", "accomplished"],
        },
        {
          name: "Lady Ankhayat",
          role: "Iruvian captain",
          traits: ["confident", "charming", "scoundrel"],
        },
      ],
      assets: [
        "The leviathan hunter fleet (each vessel is owned by the noble house who built and commands it).",
        "Many cohort of expert sailors, as well as spack-craft technicians, demonologist Whispers and void-toughed navigators.",
        "Companies of marines to protect the vessels and their valuable cargo at sea and in port.",
      ],
      quirks: "",
      allies: [
        "City Council",
        "The Church of Ecstacy",
        "Sailors",
        "Dockers",
        "Sparkwrights",
      ],
      enemies: [
        "The Grinders",
        "Ministry of Preservation",
        "The Path of Echoes",
      ],
      situation:
        "The captains have a horrible secret: the known hunting grounds for leviathans are coming up barren. The immortal creatures, once so reliable in their movements in the Void Sea, have begun to migrate elsewhere. New hunting grounds must be found before the surplus of leviathan blood disappears, and with it, the lightning barriers and the survival of the human race.",
      clocks: [
        {
          name: "Doscover new hunting grounds",
          description:
            "The Leviathan Hunters are trying to discover new hunting grounds. When the clock is filled, the Leviathan Hunters will have discovered new hunting grounds and the surplus clock  will stop.",
          totalSegments: 12,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Surplus runs dry",
          description:
            "The surplus of leviathan blood runs dry. When the clock is filled, the surplus of leviathan blood runs dry and ghosts flood the streets of Duckvol in unprecedented numbers.",
          totalSegments: 12,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Leviathan Hunters are the daring captains and crews who battle titanic demons in the Void Sea, extracting their blood for processing into electroplasm. However, they face a dire crisis: the once-reliable leviathan hunting grounds are coming up barren as the immortal creatures mysteriously migrate elsewhere. The captains keep this horrifying secret tightly guarded, knowing that without new hunting grounds, the supply of leviathan blood will dwindle, threatening the lightning barriers that protect the cities—and the survival of humanity itself.",
    },
    {
      name: "The Lost",
      description:
        "A group of street-toughs and ex-soldiers dedicated to protecting the downtrodden and the hopeless.",
      tier: 1,
      hold: "weak",
      turf: [
        "Converted rail car (HQ).",
        "The peverty-stricken streets of Coalridge and Dunslough.",
      ],
      NPCs: [
        {
          name: "Cortland",
          role: "leader",
          traits: ["idealist", "candid", "cavalier"],
        },
      ],
      assets: [
        "A very experienced gang of formerly vicious thugs, killers and Imperial soldiers.",
      ],
      quirks:
        "The Lost have all done horrible things in their former lives and they believe they must atone for these 'sins'. Each member keeps a pile of stones under their bed - one for each sin they balanced with a just deed.",
      allies: [
        "Workhouse Laborers",
        "Citizens of Coalridge and Dunslough",
        "The Crows",
      ],
      enemies: ["The Bluecoats", "Workhouse Foremen", "The Billhooks"],
      situation:
        "The Lost are currently focusing their efforts in Coalridge, running a campaign of sabotage, terror, and savage beatings against the most notoriously cruel workhouse foremen. The already-brewing union organizing efforts in that district are emboldened by the Lost's attacks, and the local Bluecoat patrols are starting to complain to their commanders for support of extra Watch guards from other districts. Meanwhile, the Coalridge foremen are making it known that they'll pay top dollar to anyone who will take the Lost out of the picture.",
      clocks: [
        {
          name: "Destroy cruel workhouses",
          description:
            "The Lost are trying to destroy cruel workhouses. When the clock is filled, the Lost will have destroyed a cruel workhouse.",
          totalSegments: 4,
          filledSegments: 0,
          repeating: true,
        },
      ],
      aiDescription:
        "The Lost are a group of street-toughs and ex-soldiers who dedicate themselves to protecting the downtrodden, seeking redemption for past sins by balancing each with a just deed, symbolized by stones under their beds. Currently, they focus on Coalridge, targeting cruel workhouse foremen with sabotage, terror, and beatings, which embolden union efforts in the district. As Bluecoats request reinforcements, the foremen are offering high bounties to eliminate the Lost, escalating the tension and putting the group in even greater danger.",
    },
    {
      name: "Ministry of Preservation",
      description:
        "Oversees transportation between cities and he disbursement of food and other vital resources.",
      tier: 5,
      hold: "strong",
      turf: [
        "The eclectro-rail train lines ofthe Imperium.",
        "Radiant energy farms, eeleries, and other food-growing enterprises throughout the city.",
      ],
      NPCs: [
        {
          name: "Lord Dalmore",
          role: "executive officer in Doskvol",
          traits: ["commanding", "intelligent"],
        },
        {
          name: "Lady Slane",
          role: "chief of operations",
          traits: ["insightful", "subtle", "effective"],
        },
        {
          name: "Captain Lannock",
          role: "mercenary commander",
          traits: ["shrewd", "ruthless"],
        },
      ],
      assets: [
        "A fleet of cargo ships and their armed escorts.",
        "A significant treasury from taxation and transportation licensing.",
        "The Rail Jacks who work the train lines.",
        "A private mercenary company that answers only to the ministry itself.",
      ],
      quirks: "",
      allies: [
        "The Billhooks",
        "Imperial Military",
        "Rail Jacks",
        "Sparkwrights",
      ],
      enemies: ["Leviathan Hunters"],
      situation:
        "The Ministry leadership believes that the leviathan hunters are too vital to the public well-being to be controlled by the bickering noble houses, vulnerable to their petty rivalries and vendettas. Agents within the ministry have been tasked with a variety of espionage, sabotage, and political actions to ultimately seize control of the hunters and bring them into Ministry control.",
      clocks: [
        {
          name: "Seize control of the Leviathan Hunters",
          description:
            "The Ministry of Preservation is trying to seize control of the Leviathan Hunters. When the clock is filled, the Ministry will have seized control of the Leviathan Hunters, who will cease to exist.",
          totalSegments: 12,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Ministry of Preservation oversees transportation and the distribution of essential resources across cities. Concerned that the vital leviathan hunters are too important to be left in the hands of feuding noble houses, the Ministry has initiated covert operations. Agents are engaged in espionage, sabotage, and political maneuvers to wrest control of the hunters and bring them under Ministry authority, ensuring stability and security in the face of potential noble conflicts.",
    },
    {
      name: "The Reconciled",
      description:
        "An association of ancient spirits who have not gone feral with the passage of time.",
      tier: 3,
      hold: "strong",
      turf: ["None"],
      NPCs: [
        {
          name: "The Reconciled have possessed several important citizens of Doskvol. Their exact membership is unknown",
          role: "",
          traits: [],
        },
      ],
      assets: [
        "Several secret and hidden spirit wells across the city and deathlands, which give the Reconciled the arcane energy they need to survive.",
      ],
      quirks:
        "The spirits of the Reconciled do not lose their minds or become obsessed with vengeance the way other spirits do. They can possess a victim indefinitely without any adverse effects.",
      allies: ["City Council", "Gondoliers"],
      enemies: ["The Church of Ecstacy", "Spirit Wardens", "Sparkwrights"],
      situation:
        "The Reconciled are very ancient and wise; they see themselves as the rightful and just rulers that Duskwall needs. A few of the City Council members have become initiates in the Path of Echoes and will soon be vulnerable to possession by the Reconciled. These councillors are also high-ranking members of the Church of the Ecstasy of the Flesh, which will give the Reconciled an opportunity for infiltration into that organization as well.",
      clocks: [
        {
          name: "Infiltrate the City Council",
          description:
            "The Reconciled are trying to infiltrate the City Council. When the clock is filled, the Reconciled will have infiltrated the City Council - their turfs will be shared.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Infiltrate the Church of Ecstacy",
          description:
            "The Reconciled are trying to infiltrate the Church of Ecstacy. When the clock is filled, the Reconciled will have infiltrated the Church of Ecstacy - their turfs will be shared.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Reconciled are an ancient group of spirits who have retained their sanity over time. Unlike other spirits, they can possess individuals indefinitely without harm. Believing themselves to be Duskwall's rightful rulers, they are quietly maneuvering to seize power. Some City Council members, who are also key figures in the Church of the Ecstasy of the Flesh, have joined the Path of Echoes, making them susceptible to possession. The Reconciled aim to infiltrate both the Council and the Church, positioning themselves for a potential takeover of the city's leadership.",
    },
    {
      name: "The Red Sashes",
      description:
        "Originally a school of ancient Iruvian sword arts, since expanded into criminal endeavors.",
      tier: 2,
      hold: "weak",
      turf: [
        "HQ in their sword-fighting school/temple.",
        "Operates a handful of high-end drug dens across Crow's Foot and the Docks.",
      ],
      NPCs: [
        {
          name: "Mylera Klev",
          role: "leader",
          traits: ["shrewd", "educated", "ruthless", "art collector"],
        },
      ],
      assets: [
        "Small contingent of master sword-fighters.",
        "Master alchemist; many potent potions and essences.",
      ],
      quirks:
        "Several members of the Red Sashes are the sons and daughters of Iruvian nobility and diplomats in Doskvol. They train in swordplay at the school and sometimes participate in gang activities. Their families are powerful and will commit significant resources to punishing anyone who harms their children.",
      allies: [
        "Iruvian Consulate",
        "The Path of Echoes",
        "Dockers",
        "Cabbies",
        "Inspectors",
      ],
      enemies: ["The Lampblacks", "The Bluecoats", "Gondoliers"],
      situation:
        "The Red Sashes and the Lampblacks are at war over turf and vengeance for deaths on both sides. Mylera is recruiting every free blade in the district for extra muscle and doesn't take no for an answer. You're either with them or against them. The Red Sashes are very well-connected, with former sword students placed at the Iruvian Consulate, in the Path of Echoes, and among the Inspectors.",
      clocks: [
        {
          name: "Destroy the Lampblacks",
          description:
            "The Red Sashes are trying to destroy the Lampblacks. When the clock is filled, the Lampblacks will have been destroyed.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Become the ward boss of Crow's Foot",
          description:
            "Mylera Klev is trying to become the ward boss of Crow's Foot. When the clock is filled, the she will have become the ward boss of Crow's Foot. Inheri the Lampblacks turfs.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Red Sashes, once a prestigious Iruvian sword school, have expanded into organized crime in Doskvol. Several members hail from Iruvian nobility, with powerful families ready to avenge any harm done to their children. The Red Sashes are currently locked in a brutal turf war with the Lampblacks, leading Mylera to aggressively recruit fighters. Their deep connections, including allies in the Iruvian Consulate, the Path of Echoes, and the Inspectors, make them a formidable force in the city’s underworld. With the backing of influential families and skilled swordsmen, they are a significant power in Doskvol’s criminal landscape.",
    },
    {
      name: "Lord Scurlock",
      description:
        "An ancient noble, said to be immortal like the Emperor. Possibly a vampire or sorcerer. Obsessed with the occult.",
      tier: 3,
      hold: "strong",
      turf: [
        "A secret lair outside the city.",
        "A dilapidated manor house in Six Towers and the catacombs beneath.",
        "An array of business holdings and cult shrines across the city, collected for some united purpose known only to Scurlock",
      ],
      NPCs: [
        {
          name: "Lord Scurlock is so powerfu he ocunts as a faction. If engaged, he is tier 3 n scale and counts as a gang of 20 people.",
          role: "noble",
          traits: ["enigmatic", "cold", "arcane", "old-fashioned"],
        },
      ],
      assets: [
        "An impressive collection of occult and arcane curios, books and ephemera.",
        "An ancien demonic temple.",
      ],
      quirks:
        "Scurock is immune to spirits. Ghosts cannot see, hear or harm him. He makes no sound when he moves and is sometimes difficult to look at directly.",
      allies: [
        "City Council",
        "The Bluecoats",
        "Inspectors",
        "The Forgotten Gods",
      ],
      enemies: ["Spirit Wardens", "The Immortal Emperor"],
      situation:
        "Lord Scurlock is bound by ancient magic to the demon Setarra. Who is the master and who is the servant? Their roles have changed many times over the centuries. Now, Lord Scurlock must fulfill a debt. Setarra has found a nest of sea demons in the harbor, encased in stone, chained by magic from the cataclysm. She seeks to free them to see their wrath loosed on the world of men. Scurlock will aid her in this or suffer a dark doom.",
      clocks: [
        {
          name: "Fulfil debt to Setarra",
          description:
            "Lord Scurlock is trying to fulfil his debt to Setarra. When the clock is filled, Lord Scurlock will have fulfilled his debt to Setarra and the sea demons wll be freed.",
          totalSegments: 12,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Obtain arcane secrets",
          description:
            "Lord Scurlock is trying to obtain arcane secrets. When the clock is filled, Lord Scurlock will have obtained an arcane secret.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: true,
        },
      ],
      aiDescription:
        "Lord Scurlock, an ancient and possibly immortal noble, is a figure of dark legend in Doskvol, rumored to be a vampire or powerful sorcerer. Immune to spirits and unsettlingly elusive, he is deeply entrenched in the occult. Bound by ancient magic to the demon Setarra, Scurlock's relationship with her has fluctuated between master and servant over the centuries. Now, under a debt to Setarra, Scurlock must assist in freeing a nest of sea demons trapped since the cataclysm or face a dire fate. His involvement in this dark ritual could unleash untold horrors upon the city.",
    },
    {
      name: "The Silver Nails",
      description:
        "A company of Severosi mercenaries who fought for the Empire in the Unity War. Renowned ghost killers.",
      tier: 3,
      hold: "strong",
      turf: ["A large inn (The Mustang) and it's fine stables (HQ)."],
      NPCs: [
        {
          name: "Seresh.",
          role: "leader",
          traits: ["bold", "brash", "defiant"],
        },
        {
          name: "Tuhan",
          role: "lead scout",
          traits: ["bold", "cunning", "charming"],
        },
      ],
      assets: [
        "A contingent of exquisite Severosian cavalry horses - fearless, swift and trained to hunt and battle spirits.",
        "Arcane lances.",
      ],
      quirks:
        "Each member wears a ring fashioned from a silver nail, which protects against possession. They're trained in the GHOST FIGHTER special ability (Cutter).",
      allies: ["Imperial Military", "Sailors", "Severosan Consulate"],
      enemies: [
        "The Circle of Flame",
        "The Grinders",
        "Skovlan Consulate",
        "Skovlander Refugees",
        "Spirit Wardens",
      ],
      situation:
        "Thanks to their expertise from riding in the deathlands of Severos, the Silver Nails are perfectly suited to explore the forbidden Lost District outside the lightning barrier of the city. Once the fiercest ghosts are driven out or destroyed, the Silver Nails can seize control and plunder the forgotten treasures and artifacts hidden within. (The Spirit Wardens currently control access to the Lost District and do everything in their power to keep the Silver Nails-and everyone else-out.)",
      clocks: [
        {
          name: "Destroy spirits in the Lost District",
          description:
            "The Silver Nails are trying to destroy spirits in the Lost District. When the clock is filled, the Silver Nails will have destroyed all spirits in the Lost District - it is added to their turf but their hold is weak.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Control the Lost District",
          description:
            "The Silver Nails are trying to control the Lost District. When the clock is filled, the Silver Nails will control the Lost District - their hold is increased to Strong.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Silver Nails are a seasoned company of Severosi mercenaries, famed for their ghost-killing prowess and their silver nail rings that ward off possession. Trained in the deadly GHOST FIGHTER ability, they fought for the Empire during the Unity War. Now, they seek to explore and conquer the Lost District beyond Doskvol’s lightning barriers, using their deathlands expertise to drive out or destroy the fiercest spirits. Their goal is to plunder the district’s forgotten treasures, but the Spirit Wardens, who control access to the area, are determined to keep the Silver Nails—and everyone else—out.",
    },
    {
      name: "Sparkwrights",
      description:
        "The engineers who maintain the lightning barriers. Also pioneers of spark-craft technology, indulging in dangerous research.",
      tier: 4,
      hold: "strong",
      turf: ["Massive workshop, factory and design facility in Coalridge."],
      NPCs: [
        {
          name: "Una Farros",
          role: "instructor at Charterhall University",
          traits: ["curious", "vain", "famous"],
        },
      ],
      assets: [
        "The electroplasmic generators, city lights, lightning barriers and associated facilities and systems across the city.",
      ],
      quirks: "",
      allies: ["City Council", "Leviathan Hunters", "Ministry of Preservation"],
      enemies: ["The Path of Echoes", "The Reconciled", "The Foundation"],
      situation:
        'For centuries, the Sparkwrights have worked in secret to develop an alternative fuel that could replace the leviathan blood that powers the lightning barriers of the Imperium. A few researchers have gotten close, but "accidents" have inevitably killed them and destroyed their work (certainly arranged by the nobility who rule because of their stranglehold on leviathan hunting). But there is always a daring visionary willing to try to pick up the pieces and complete the work-even at the risk of their own life. Will one of them manage it this time, or will they, too, fall victim to the deadly agents of the elite?',
      clocks: [
        {
          name: "Develop alternative fuel",
          description:
            "The Sparkwrights are trying to develop an alternative fuel. When the clock is filled, the Sparkwrights will have developed an alternative fuel and the Leviathan Hunters tier will reduce to 2.",
          totalSegments: 12,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Sparkwrights are the brilliant engineers responsible for maintaining Doskvol's lightning barriers and advancing spark-craft technology. For centuries, they've secretly pursued the development of an alternative fuel to replace the leviathan blood that powers the barriers. Every breakthrough has been met with \"accidents\"—likely orchestrated by the ruling nobility, who rely on their monopoly over leviathan hunting to maintain power. Despite the dangers, visionary researchers continue to pursue this goal, risking their lives in the hope of finally succeeding. The question remains: will one of them break through, or will they fall like those before them?",
    },
    {
      name: "The Spirit Wardens",
      description:
        "The bronze-masked hunters who destroy rogue spirits. Also run Bellweather Crematorium to properly dispose of corpses.",
      tier: 4,
      hold: "strong",
      turf: [
        "Bellweather Crematorium.",
        "The Master Warden's estate in Whitecrown.",
      ],
      NPCs: [
        {
          name: "There are no known Spirit Wardens - they maintain an anonymous membership of people not native to Doskvol, using code names. A warden known as Bakoros (who may be several individuals) sometimes lectures at the College of Immortal Studies at Doskvol University.",
          role: "",
          traits: [],
        },
      ],
      assets: [
        "The death bells that ring whenever someone dies in the city, and the deathseeker crows hat fly to find the body (ancient, arcane).",
        "Many cohorts of expert Whispers.",
        "The most advanced spectrological and spark-craft equipment, including several spirit-huneter hulls.",
      ],
      quirks:
        "The Spirit Wardens membership is utterly anonymous. They cut all ties and have no families or close relationships, save their fellow wardens.",
      allies: ["The Church of Ecstacy", "Deathlands Scavengers"],
      enemies: [
        "The Dimmer sisters",
        "Gondoliers",
        "Lord Scurlock",
        "The Silver Nails",
        "The Unseen",
        "The Path of Echoes",
        "The Reconciled",
      ],
      situation:
        "The Spirit Wardens know that an enemy is attempting to infiltrate their ranks (they don't yet know that it's the Unseen). The Wardens are laying a trap for this enemy, to uncover their identity and eliminate them.",
      clocks: [
        {
          name: "Uncover the infiltrators",
          description:
            "The Spirit Wardens are trying to uncover the infiltrators. When the clock is filled, the Spirit Wardens will have uncovered the infiltrators, the Unseen.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Spirit Wardens are the anonymous, bronze-masked enforcers who hunt rogue spirits and manage Bellweather Crematorium to ensure proper disposal of corpses. Their identities are a closely guarded secret, with members severing all personal ties. Recently, they've discovered that an enemy is attempting to infiltrate their ranks, though they have yet to identify the culprit as the Unseen. To counter this threat, the Wardens are setting a trap to unmask and eliminate the infiltrators before their sacred duty is compromised.",
    },
    {
      name: "Ulf Ironborn",
      description:
        "A brutal Skovlander, newly arrived in Doskvol and fighting everyone for turf.",
      tier: 1,
      hold: "weak",
      turf: [
        "Rooms, workshop and stable at The Old Forge tavern (HQ).",
        "A gambling den.",
      ],
      NPCs: [
        {
          name: "Ulf Ironborn",
          role: "leader",
          traits: ["ruthless", "savage", "bold"],
        },
        {
          name: "Havid",
          role: "second",
          traits: ["ruthless", "volatile", "shrewd"],
        },
      ],
      assets: ["A small but powerfully savage gang of thugs."],
      quirks:
        "As a refugee of the Unity War, Ulf does not trust the local Akorosi, or anyone who proclaims a strong allegiance to the Imperial government. Those of Skovlander blood find it easy to win his trust, however.",
      allies: ["The Grinders"],
      enemies: ["Citizens of Coalridge", "The Billhooks"],
      situation:
        'Ulf is newly arrived in Doskvol, seeking his fortune on the streets. His gang has had recent success with savage smash & grab operations, leading into a potential "protection" racket. As more Skovlander war refugees swell the city population, the bigotry of some locals is starting to surface, with "NO SKOVS" signs appearing at public houses and shops. Ulf\'s blind rage will be sparked off when he encounters this, surely leading his gang into war with any "true Duskers" brave enough to stand up to him.',
      clocks: [
        {
          name: "Carve out gang territory",
          description:
            "Ulf Ironborn is trying to carve out gang territory. When the clock is filled, Ulf Ironborn will have carved out gang territory and will gain a new turf.",
          totalSegments: 4,
          filledSegments: 0,
          repeating: true,
        },
        {
          name: "Rise in tier",
          description:
            "Ulf Ironborn is trying to rise in tier. When the clock is filled, Ulf Ironborn will have risen in tier and his tier will gain +1.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: true,
        },
      ],
      aiDescription:
        "Ulf Ironborn is a ruthless Skovlander war refugee, recently arrived in Doskvol, and fiercely battling for territory. Distrustful of the local Akorosi and those loyal to the Empire, he easily allies with fellow Skovlanders. Ulf's gang has seen early success with violent smash-and-grab operations, hinting at a budding protection racket. As anti-Skovlander sentiment rises in the city, with discriminatory signs appearing in public places, Ulf's temper is set to explode. This will likely propel his gang into open conflict with any \"true Duskers\" who dare to oppose him.",
    },
    {
      name: "The Unseen",
      description:
        "An insidious criminal enterprise with secret membership. Thought to pull the strings of the entire underworld.",
      tier: 4,
      hold: "strong",
      turf: [
        "A multitude f vice dens and extortion racets across the city - virtually none realize that they pay up to the Unseen.",
        "Several opulent town houses used as safe houses.",
      ],
      NPCs: [
        {
          name: "The Tower.",
          role: "leader",
          traits: [],
        },
        { name: "The Star", role: "captain", traits: [] },
        {
          name: "Grull",
          role: "mid-level thug with big ambitions, undercover as a coach driver",
          traits: [],
        },
      ],
      assets: [
        "A legion of thugs, thieves and killers on-call to their secret masters.",
      ],
      quirks:
        "The perfect secrecy of the Unseen is the result of arcane rituals. Core members can recognize each other with attuned second sight. Any non-member who learns the identity of a member falls victim to a ritual that removes that memory from their mind after a few moments.",
      allies: [
        "The Bluecoats",
        "Ironhook Prison",
        "The Forgotten Gods",
        "Cyphers",
      ],
      enemies: ["Ink Rakes", "The Hive", "Spirit Wardens"],
      situation:
        "The Unseen crave the power and authority of the Spirit Wardens, whose own secret membership has so far resisted infiltration. The Tower and The Star plot to place their own spies and operatives among the Wardens and seize it from within.",
      clocks: [
        {
          name: "Infiltrate the Spirit Wardens",
          description:
            "The Unseen are trying to infiltrate the Spirit Wardens. When the clock is filled, the Unseen will have infiltrated the Spirit Wardens.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Expand into other cities",
          description:
            "The Unseen are trying to expand into other cities. When the clock is filled, the Unseen will have expanded into other cities.",
          totalSegments: 8,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Unseen is a shadowy criminal organization rumored to control the entire underworld of Doskvol. Its members are hidden by arcane rituals, allowing them to recognize each other with second sight, while any outsider who learns their identity quickly forgets it. The Unseen now aim to infiltrate the Spirit Wardens, a secretive group that has so far resisted their influence. The leaders, known as The Tower and The Star, are plotting to insert spies into the Wardens' ranks, hoping to seize control of this powerful organization from within.",
    },
    {
      name: "The Wraiths",
      description: "A mysterious crew of masked thieves and spies.",
      tier: 2,
      hold: "weak",
      turf: [
        "Silkshore and Nightmarket are their primary hunting grounds. They specialize in the theft of luzury items and intelligence gathering for clients to use as blackmail.",
      ],
      NPCs: [
        {
          name: "Slate",
          role: "leader",
          traits: ["sophisticated", "daring", "secretive"],
        },
        {
          name: "Loop",
          role: "appraisal expert",
          traits: ["obsessive", "moody", "secretive"],
        },
      ],
      assets: [
        "A scattered collection of secret rooftop shelters.",
        "A secret lair in a tower in Silkshore.",
        "All manner of thieves gear for burglary.",
      ],
      quirks:
        "Each member wears a mask and conceals their true identity with an alias. They communicate with a private sign language.",
      allies: ["Cabbies"],
      enemies: ["Bluecoats", "Inspectors", "The Hive"],
      situation:
        "The Wraiths recently completed a heist at a luxury brothel in Nightmarket and happened to grab the private map book of a leviathan hunter in the process. The map book shows the secret hunting grounds of augured leviathan sites that will be used by the ship Storm Palace during the next season. Such a map is useless to the Wraiths, but is worth a small fortune to another leviathan hunter. The Wraiths are currently reaching out to contacts in the underworld to quietly arrange a sale.",
      clocks: [
        {
          name: "Recruit expert thieves",
          description:
            "The Wraiths are trying to recruit expert thieves. When the clock is filled, the Wraiths will have recruited some expert thieves.",
          totalSegments: 4,
          filledSegments: 0,
          repeating: true,
        },
        {
          name: "Sell the map book",
          description:
            "The Wraiths are trying to sell the map book. When the clock is filled, the Wraiths will have sold the map book. Their tier will increase by 1.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: false,
        },
        {
          name: "Secure an arcane ally",
          description:
            "The Wraiths are trying to secure an arcane ally. When the clock is filled, the Wraiths will have secured an arcane ally.",
          totalSegments: 6,
          filledSegments: 0,
          repeating: false,
        },
      ],
      aiDescription:
        "The Wraiths are a secretive crew of masked thieves and spies, known for their anonymity and use of a private sign language. Recently, they pulled off a heist at a luxury brothel in Nightmarket and accidentally acquired a map book detailing secret leviathan hunting grounds planned for the ship *Storm Palace*. While the map holds little value to them, it’s worth a fortune to rival leviathan hunters. The Wraiths are now discreetly reaching out to underworld contacts to arrange a profitable sale, navigating the delicate balance between secrecy and the high stakes of the leviathan hunting industry.",
    },
  ];
}
