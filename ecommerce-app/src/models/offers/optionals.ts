import type { SelectCardItem } from "../../components/forms/SelectCardsGroup";


export const conditionItems: SelectCardItem[] = [
  {
    id: 'price',
    icon: '💰',
    title: 'Par prix',
    description: 'Remise basée sur le montant total de la commande. Plus le panier est élevé, plus la réduction est importante.',
    value: 'PRICE',
  },
  {
    id: 'quantity',
    icon: '📦',
    title: 'Par quantité',
    description: 'Remise basée sur le nombre d\'articles achetés. Plus vous achetez, plus vous économisez.',
    value: 'QUANTITY',
  },
];

export const discountItems: SelectCardItem[] = [
  {
    id: 'percentage',
    icon: '%',
    title: 'Pourcentage',
    description: 'Applique une réduction en pourcentage sur le prix total. Exemple : 20% de remise.',
    value: 'PERCENTAGE',
  },
  {
    id: 'fixed',
    icon: '💲',
    title: 'Montant fixe',
    description: 'Applique une réduction d\'un montant fixe en euros/dinars. Exemple : 10 € de remise.',
    value: 'FIXED',
  },
];