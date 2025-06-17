export function getChampionValueForImage(champion: string): string {
  if (champion === "twistedfate") return "TwistedFate";
  if (champion === "aurelionsol") return "AurelionSol";
  if (champion === "kogmaw") return "KogMaw";
  if (champion === "wukong") return "MonkeyKing";
  if (champion === "ksante") return "KSante";
  if (champion === "missfortune") return "MissFortune";
  if (champion === "masteryi") return "MasterYi";
  if (champion === "reksai") return "RekSai";
  if (champion === "lee-sin") return "LeeSin";
  if (champion === "tahmkench") return "TahmKench";
  if (champion === "xinzhao") return "XinZhao";
  if (champion === "jarvaniv") return "JarvanIV";
  return champion.charAt(0).toUpperCase() + champion.slice(1);
}
