

export interface FieldConfig {
    name: string;
    label: string;
    type: string;
    attention?: string;      
    gridCols?: number;       
}

export const baseFields: FieldConfig[] = [
    { name: 'title', label: 'Title Platform', type: 'text', attention: '' },
    { name: 'description', label: 'Description', type: 'text', attention: '' },
];

export const contactFields: FieldConfig[] = [
    { name: 'email', label: 'Email', type: 'email', attention: '' },
    { name: 'phone', label: 'Téléphone', type: 'tel', attention: '' },
    { name: 'website', label: 'Site web', type: 'url', attention: '' },
    { name: 'address', label: 'Adresse', type: 'text', attention: '' },
];

export const socialFields: FieldConfig[] = [
    { name: 'facebook_url', label: 'Facebook', type: 'url', attention: '' },
    { name: 'x_url', label: 'X (Twitter)', type: 'url', attention: '' },
    { name: 'instagram_url', label: 'Instagram', type: 'url', attention: '' },
    { name: 'whatsapp_url', label: 'WhatsApp', type: 'url', attention: '' },
    { name: 'tiktok_url', label: 'TikTok', type: 'url', attention: '' },
    { name: 'telegram_url', label: 'Telegram', type: 'url', attention: '' },
];

export const currencyFields: FieldConfig[] = [
    {
        name: 'currency_code',
        label: 'Code devise',
        type: 'text',
        attention: 'Code international officiel de la devise en 3 lettres (ex : MAD, EUR, USD). Il est utilisé pour les paiements, les factures et les conversions monétaires.'
    },
    {
        name: 'currency_symbol',
        label: 'Symbole devise',
        type: 'text',
        attention: 'Symbole affiché avec les prix sur le site (ex : د.م., €, $, £).'
    },
];

export const legalFields: FieldConfig[] = [
    {
        name: 'company_legal_status',
        label: 'Statut légal de l’entreprise',
        type: 'text',
        attention: ''
    },
    {
        name: 'ice_number',
        label: 'Identifiant Commun de l’Entreprise (ICE)',
        type: 'text',
        attention: 'Numéro unique composé de 15 chiffres attribué aux entreprises marocaines.'
    },
    {
        name: 'if_number',
        label: 'Identifiant Fiscal (IF)',
        type: 'text',
        attention: ''
    },
    {
        name: 'rc_number',
        label: 'Numéro du Registre de Commerce (RC)',
        type: 'text',
        attention: ''
    },
    {
        name: 'patente',
        label: 'Numéro de Taxe Professionnelle (Patente)',
        type: 'text',
        attention: 'Numéro utilisé dans certaines démarches administratives et fiscales.'
    },
];

export const seoFields: FieldConfig[] = [
    {
        name: 'meta_title',
        label: 'Meta title',
        type: 'text',
        attention: ''
        // attention: 'Titre affiché dans les résultats Google et dans l’onglet du navigateur. Il doit décrire clairement la page et contenir idéalement entre 50 et 60 caractères.'
    },
    {
        name: 'meta_description',
        label: 'Meta description',
        type: 'text',
        attention: ''
        // attention: 'Courte description affichée sous le titre dans Google. Elle doit résumer le contenu de la page et donner envie de cliquer (environ 150 à 160 caractères).'
    },
    {
        name: 'meta_keywords',
        label: 'Mots-clés',
        type: 'text',
        // attention: ''
        attention: 'Liste de mots-clés séparés par des virgules représentant les principaux sujets de votre activité ou de votre page.'
    },

    {
        name: 'facebook_pixel',
        label: 'Facebook Pixel ID',
        type: 'text',
        attention: ''
        // attention: 'Identifiant du pixel Meta permettant de mesurer les conversions, suivre les visiteurs et optimiser les campagnes publicitaires Facebook et Instagram.'
    },
    {
        name: 'tiktok_pixel',
        label: 'TikTok Pixel ID',
        type: 'text',
        attention: ''
        // attention: 'Identifiant du pixel TikTok utilisé pour suivre les actions des visiteurs et mesurer les performances des campagnes publicitaires.'
    },
    {
        name: 'google_analytics',
        label: 'Google Analytics',
        type: 'text',
        attention: 'Identifiant de mesure Google Analytics 4 commençant généralement par "G-". Il permet de suivre les statistiques et le comportement des visiteurs.'
    },
];