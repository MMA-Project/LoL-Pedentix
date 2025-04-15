export interface LeaguePedantixModel {
  name: string;
  image: string;
  text: string;
}

export class LeaguePedantix implements LeaguePedantixModel {
  constructor(public name: string, public image: string, public text: string) {}
}

export const exampleLeaguePedantix: LeaguePedantixModel = {
  name: "Mel",
  image: "example-image-url.png",
  text: `Mère,

Un soldat m'a offert ton masque aujourd'hui.

Sans réfléchir, j'en ai parcouru les fissures, capté chaque bosse, chaque cicatrice des innombrables combats dont tu es sortie victorieuse... et celle du combat dont tu ne t'es pas relevée.

Ce n'est que maintenant, alors que notre navire vogue en direction de Noxus, que la réalité s'impose à moi. Tu n'es plus là. Une fois encore. Mais cette fois, je ne peux plus espérer ton retour.

Je sais que tu ne voudrais pas que je m'attarde sur ta mort. Tu me dirais d'être fière. Je suis enfin devenue « le loup » que tu désirais si ardemment. Mais je ne peux m'empêcher de me demander si je suis devenue ce que tu espérais... ou simplement ce que tu avais besoin que je sois.

Tant de choses ont changé, et pourtant une part de moi est aussi perdue que je l'étais une décennie plus tôt. Quand j'y repense, le visage de cousin Jago à mon arrivée à Piltover était empreint de pitié. Tu m'avais bien fait comprendre que j'étais livrée en offrande et que tu ne reviendrais pas me chercher. Malgré tout, des années durant je m'endormais en désirant te revoir, comme n'importe quelle fille désirerait voir sa mère. Malgré tout ce que tu m'avais fait. Chaque matin, je m'éveillais aux côtés du vide que tu m'avais imposé. J'ai passé ma vie à tenter de remplir ce vide, à devenir digne de l'amour de ma propre mère.

J'ai vécu de la seule façon que je connais : en suivant la voie du Renard, aussi rapide que rusée. J'ai gagné la confiance du Conseil et ai failli tenir Piltover dans le creux de ma main. Si seulement tu avais pu me faire confiance, Mère. Je ne me serais pas retrouvée dans cette situation. Je n'aurais pas eu à

Non. Ce n'est pas si simple.

Je sais à présent que tu tentais de me protéger, à ta façon. Je n'aurais jamais pu imaginer qu'une telle magie sommeillait en moi. Mais il y a tant de choses de mon passé auxquelles je n'ai jamais pensé avant ton décès. Honnêtement, c'est insoutenable, et c'est une raison de plus pour laquelle j'aurais aimé pouvoir combattre à tes côtés. Je n'ose imaginer ce que tu as pu ressentir, à être pourchassée par la Rose noire pendant toutes ces années. Mais je sais que si tu as ressenti de la peur, ce ne fut jamais pour toi-même. Ce fut pour Kino et pour moi. Et en fin de compte, je t'ai menée à ta perte. Peut-être savais-tu tout du long que j'étais celle qu'il fallait craindre.

Je suis désolée, Mère, mais je ne regrette pas d'avoir protégé ma ville. Il faut faire des sacrifices pour devenir plus fort. N'est-ce pas là ce que tu répétais sans cesse ? Ton crédo, ton excuse face à n'importe quelle situation. T'es-tu jamais souciée de ce que ça m'a fait ? De ce que ça nous a fait ? Est-ce que ça en a valu la peine ? C'est désormais à moi de supporter le coût de tout cela.

Tu m'as caché tant de choses. La vérité sur mon père. Sur le meurtrier de Kino. Et plus important encore, sur cette vendetta que la Rose noire avait contre toi, et dans laquelle je suis désormais impliquée. Je suppose que cela ne fait qu'effleurer la surface de tes mensonges, et de ceux de cette « Manipulatrice ».

Je compte bien découvrir tout ce que tu m'as caché.

Je regrette que ces mots ne te parviennent jamais, mais j'espère que tu m'observes depuis Volrachnun. Je vais jeter cette lettre par-dessus bord, afin qu'elle puisse être entraînée jusqu'aux profondeurs et ne faire plus qu'un avec les eaux des côtes de Rokrund, où tu as autrefois vaincu la mort.

Je vais bientôt arriver en étrangère dans le pays où je suis née. Nos propres gardes ne me voient pas comme une véritable Medarda, bien qu'ils n'aient encore jamais osé exprimer à haute voix leur méfiance à mon égard. Une nation qui prône la force, mais qui prospère grâce aux effusions de sang n'est pas une nation que je peux fièrement appeler mienne. Et je ne resterai pas les bras croisés alors que ce chaos se poursuit. Tu m'as appris à survivre, Mère. J'ai appris par moi-même à vivre. Et bien que tu m'aies poussée à suivre la voie du Loup, je n'abandonnerai jamais celle du Renard.

Ce n'est peut-être pas ainsi que tu l'avais imaginé... mais je rentre à la maison, Mère.

Et je vais faire la différence.

Jusqu'à ce que mon cœur cesse de battre.

Ta fille, Mel`,
};
