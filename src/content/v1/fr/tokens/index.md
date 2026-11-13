---
title: "Tokens"
description: "Les variables CSS de Hodi : couleurs, polices, arrondis et mouvement, à utiliser dans les styles d'un plugin."
intro: "Les tokens sont les variables CSS de Hodi, comme `var(--text-2)`. Un plugin les utilise dans ses styles à la place d'une valeur écrite en dur : une couleur de token change avec le thème (Sombre, Clair, Poudré), une couleur en dur ne change pas. Les pastilles de cette page suivent le thème choisi en haut du site."
order: 5
icon: "palette"
---

## Utiliser un token

Un token s'utilise avec `var()`, dans le fichier CSS de la partie web. Hodi définit chaque token sur sa page : le plugin n'a rien à importer.

```css title="web/plugin.css"
.hello-world-answer {
  color: var(--text-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
}
```

Les composants de `hodi:sdk` utilisent déjà ces tokens. Un plugin n'en a besoin que pour ses propres classes.

## Les fonds

Du plus profond au plus haut : la page, puis les colonnes, puis les cartes, puis les contrôles posés sur les cartes.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--bg` | Le fond de la page. |
| `--column` | Le fond des colonnes, et de la page sur un téléphone. |
| `--card` | Le fond d'une carte, et de la ligne active d'une liste. |
| `--card-hover` | Le fond d'une carte survolée dans une liste. |
| `--control` | Le fond des boutons, des champs et des pastilles. |
| `--control-hover` | Le fond d'un bouton ou d'un champ survolé. |
| `--raised` | Le fond d'un élément posé au-dessus d'une carte. |
| `--tile` | Le fond du carré d'icône des états vides et des erreurs. |

## Les textes

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--text` | Le texte principal : les titres, les libellés, les valeurs. |
| `--text-strong` | Un texte un peu moins appuyé que `--text`. |
| `--text-2` | Le texte secondaire : les descriptions et les lignes d'aide. |
| `--text-3` | Le texte discret : les légendes, les icônes au repos. |
| `--text-faint` | Le texte le plus effacé : un état désactivé. |

## Les bordures

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--border` | La bordure de chaque contrôle et de chaque carte. |
| `--border-strong` | Une bordure plus marquée, au survol par exemple. |
| `--divider` | La ligne entre deux sections. |

## L'accent

L'accent est la couleur de la marque : le point du logo, l'onglet actif, les compteurs. Il vaut rouille dans Sombre et Clair, rose dans Poudré, ou la couleur d'accent qu'un profil a choisie dans ses réglages.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--rust` | La couleur d'accent elle-même. |
| `--rust-text` | Un texte dans la couleur d'accent. |
| `--rust-strong` | Un texte d'accent plus marqué que `--rust-text`. |
| `--rust-surface` | Un fond teinté d'accent. |
| `--rust-surface-2` | Un fond teinté d'accent, plus soutenu. |
| `--rust-border` | Une bordure dans la couleur d'accent. |
| `--link-hover` | Un lien survolé. |

## Les états

Le rouge dit qu'une chose a échoué ou va être supprimée. Le vert dit qu'une chose est acceptée. Le jaune avertit.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--danger` | Une erreur : son texte et son icône. |
| `--destructive` | Le fond d'un bouton de suppression (`look="danger"`). |
| `--destructive-border` | La bordure d'un bouton de suppression. |
| `--destructive-text` | Le texte d'un bouton de suppression. |
| `--approve` | Le fond d'une chose acceptée. |
| `--approve-border` | La bordure d'une chose acceptée. |
| `--approve-text` | Le texte d'une chose acceptée. |
| `--warning` | Un avertissement. |

## L'IA

Le violet marque un clic qui dépense des crédits d'IA, comme le bouton `AiButton`.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--ai` | La couleur de l'IA : une icône, un trait. |
| `--ai-surface` | Le fond d'une zone d'IA. |
| `--ai-border` | La bordure d'une zone d'IA. |
| `--ai-text` | Le texte principal d'une zone d'IA. |
| `--ai-text-2` | Le texte secondaire d'une zone d'IA. |

## L'information

Le bleu marque une note qui explique comment marche un écran.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--info-surface` | Le fond d'une note d'information. |
| `--info-border` | La bordure d'une note d'information. |
| `--info-icon` | L'icône d'une note d'information. |
| `--info-text` | Le texte d'une note d'information. |

## Les couleurs des thèmes de l'actu

Chaque thème de l'actu a sa couleur : Belgique, Monde, Tech… Un élément avec l'attribut `data-topic` reçoit les trois tokens de ce thème. Les pastilles ci-dessous montrent le thème `tech`.

```tsx title="web/index.tsx"
<span className="hello-world-topic" data-topic="tech">
  Tech
</span>
```

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--topic` | La couleur du thème. |
| `--topic-border` | Une bordure dans la couleur du thème, atténuée. |
| `--topic-surface` | Un fond très sombre dans la couleur du thème. |

## Les calques

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--glass` | Le fond d'un bouton flottant au-dessus d'une image. |
| `--scrim` | Le voile derrière une fenêtre ouverte. |
| `--shadow` | L'ombre d'un élément qui flotte. |

## Les polices

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--font-body` | Le texte courant (Geist). |
| `--font-mono` | Les légendes, les métadonnées et le code (Geist Mono). |
| `--font-display` | Les grands titres, en capitales (Bebas Neue). |

## Les arrondis

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--radius-thumb` | 10 px : une vignette, une image. |
| `--radius-card` | 16 px : une carte. |
| `--radius-panel` | 20 px : une fenêtre, un grand panneau. |
| `--radius-pill` | Une pilule : un bouton, une pastille. |

## Le mouvement

Chaque transition de Hodi est douce : rien ne saute. Une transition de plugin utilise les mêmes valeurs.

```css title="web/plugin.css"
.hello-world-card {
  transition: background var(--duration) var(--ease);
}
```

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--duration` | 160 ms : la durée d'une transition. |
| `--ease` | La courbe d'une transition, `cubic-bezier(0.2, 0, 0, 1)`. |
