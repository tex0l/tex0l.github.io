# CLAUDE.md

Ce fichier fournit des instructions pour Claude Code lors du travail sur ce projet.

## Commandes de Build

```bash
npm run lint      # ESLint + astro check (lance prelint automatiquement)
npm run build     # Build de production statique
npm run dev       # Serveur de développement avec hot reload
npm run preview   # Prévisualisation du build
```

Le script `prestart` chiffre les assets avant le démarrage du serveur de dev.

## Architecture du Projet

### Stack Technique

- **Astro 5** - Générateur de site statique avec Island Architecture
- **Vue 3** - Composants interactifs côté client (suffixe `.client.vue`)
- **Alpine.js** - Interactions légères (sélecteur de langue, formatage de dates)
- **Tailwind CSS 4** - Styling utilitaire avec plugin typography
- **TypeScript** - Mode strict avec `strictNullChecks`

### Structure des Dossiers

```
src/
├── components/     # Composants Astro et Vue
│   ├── i18n/       # Composants de traduction
│   └── EncryptedItems/  # Système de chiffrement
├── content/blog/   # Articles de blog MDX (en/ et fr/)
├── i18n/           # Définitions et utilitaires i18n
├── layouts/        # Layouts Astro (BaseLayout, Layout)
├── pages/          # Routes Astro
│   ├── [lang]/     # Pages localisées
│   └── og/         # Génération d'images OG
├── utils/          # Utilitaires TypeScript
└── resources/      # Images et assets
integrations/       # Plugins remark personnalisés
```

### Conventions de Nommage

- `.client.vue` : composants Vue côté client uniquement
- `{number}.{slug}.mdx` : articles de blog (le numéro définit l'ordre)
- Les ID de collection incluent le préfixe de langue (`en/` ou `fr/`)

## Internationalisation (i18n)

### Langues Supportées

- **Anglais** (`en`) - Langue par défaut
- **Français** (`fr`)

### Utilisation des Traductions

```typescript
import { useTranslations, useTranslatedPath } from '~/i18n/utils'

const t = useTranslations(lang)
const translatePath = useTranslatedPath(lang)

// Accès aux traductions
t('about-me.title')
t('index.greeting', ['John'])  // Interpolation positionnelle {0}

// Génération de chemins localisés
translatePath('/blog')  // → /en/blog ou /fr/blog
```

### Structure des Traductions

Les traductions sont dans `src/i18n/index.ts` avec des clés hiérarchiques :
- `layout.*` : Navigation, footer
- `index.*` : Page d'accueil
- `about-me.*` : Page À propos
- `blog.*` : Liste et métadonnées du blog
- `rss.*` : Flux RSS

## Content Collections

### Blog

Les articles sont dans `src/content/blog/{lang}/` avec le schéma :

```typescript
{
  title: string,          // Requis
  date: Date,             // Défaut: maintenant
  description?: string,   // Optionnel
  image?: ImageMetadata,  // Optionnel
  alt: string,            // Défaut: "cover picture"
  tags: string[]          // Défaut: []
}
```

### Callout Boxes (Asides)

Syntaxe dans les fichiers MDX :

```mdx
:::note[Titre optionnel]
Contenu de la note
:::

:::tip
Astuce sans titre
:::

:::caution
Avertissement
:::

:::danger
Attention danger
:::
```

## Système de Chiffrement

### Architecture

Chiffrement bout-en-bout pour la carte de visite :
- **Algorithme** : AES-256-GCM
- **Dérivation de clé** : Scrypt (N=1024, r=8, p=1)
- **Distribution** : Mot de passe dans le hash de l'URL (non transmis au serveur)

### Build-time

`encryptAssets.js` chiffre les fichiers de `public_to_encrypt/` vers `public/encrypted/`.

Variable d'environnement `PASSWORD` requise, ou `DUMMY=true` pour la version de test.

### Runtime

Les composants Vue dans `src/components/EncryptedItems/` gèrent le déchiffrement côté client avec le mot de passe extrait du hash de l'URL.

## Génération d'Images OG

Les images Open Graph sont générées dynamiquement via `astro-og-canvas` dans `src/pages/og/[...route].ts`.

Route des images : `/og/{route}.png`

Nommage des routes :
- Blog : `blog-{lang}-{slug}` (ex: `blog-fr-hello-world`)
- Pages : `{lang}-{page}` (ex: `en-about-me`)

## Bonnes Pratiques

### TypeScript

- Toujours utiliser `validateLang()` pour valider les paramètres de langue
- Préférer les type guards et assertions pour la sécurité des types
- Utiliser l'alias `~/` pour les imports depuis `src/`

### Composants

- Préférer les composants Astro (`.astro`) pour le contenu statique
- Utiliser Vue (`.client.vue`) uniquement pour l'interactivité côté client
- Utiliser `client:only="vue"` pour les composants Vue sans SSR

### Styling

- Utiliser les classes utilitaires Tailwind directement
- Plugin `@tailwindcss/typography` pour le style prose dans les articles
- Éviter les CSS modules, préférer les utility classes

### Performance

- Build statique uniquement, pas de SSR
- Optimisation des images via le composant `Picture` d'Astro
- View Transitions via `ClientRouter` d'Astro

## Dépendances Notables

| Package | Usage |
|---------|-------|
| `astro-og-canvas` | Génération d'images OG |
| `astro-icon` | Système d'icônes |
| `@iconify-json/*` | Collections d'icônes (carbon, mdi, octicon, emojione, noto) |
| `luxon` | Formatage de dates avec support i18n |
| `scrypt-js` | Dérivation de clé côté client |
| `vcard-creator` | Génération de fichiers VCard |
| `unified` + `remark-*` | Pipeline de traitement MDX |

## Git

- Ne pas ajouter de ligne `Co-Authored-By` dans les messages de commit
- Séparer les changements en commits atomiques et cohérents (un commit par fonctionnalité, fix, ou changement logique)
- Rédiger des messages de commit explicatifs décrivant le "pourquoi" du changement

## Debugging

### Problèmes Courants

1. **Images OG non générées pour une langue** : Vérifier que l'ID de l'article inclut le bon préfixe de langue dans `src/pages/og/[...route].ts`

2. **Traductions manquantes** : Vérifier la console pour les warnings de clés i18n manquantes

3. **Erreurs de type après modification de contenu** : Lancer `npm run lint` (inclut `astro sync`)

4. **Chiffrement échoue** : Vérifier que `PASSWORD` est défini ou utiliser `DUMMY=true`
