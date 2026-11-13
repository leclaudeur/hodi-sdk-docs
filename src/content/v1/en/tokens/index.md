---
title: "Tokens"
description: "Hodi's CSS variables: colours, fonts, corners and motion, for a plugin's styles."
intro: "Tokens are Hodi's CSS variables, such as `var(--text-2)`. A plugin uses them in its styles instead of a hard-coded value: a token colour changes with the theme (Dark, Light, Poudré), a hard-coded colour doesn't. The samples on this page follow the theme picked at the top of the site."
order: 5
icon: "palette"
---

## Using a token

A token is used with `var()`, in the web part's CSS file. Hodi defines every token on its page: the plugin has nothing to import.

```css title="web/plugin.css"
.hello-world-answer {
  color: var(--text-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
}
```

The components of `hodi:sdk` already use these tokens. A plugin only needs them for its own classes.

## Backgrounds

From deepest to highest: the page, then the columns, then the cards, then the controls on the cards.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--bg` | The page's background. |
| `--column` | The columns' background, and the page's on a phone. |
| `--card` | A card's background, and the active row of a list. |
| `--card-hover` | A hovered card's background in a list. |
| `--control` | The background of buttons, fields and chips. |
| `--control-hover` | A hovered button or field's background. |
| `--raised` | The background of an element placed above a card. |
| `--tile` | The icon square's background in empty states and errors. |

## Texts

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--text` | The main text: titles, labels, values. |
| `--text-strong` | A text slightly softer than `--text`. |
| `--text-2` | The secondary text: descriptions and help lines. |
| `--text-3` | The discreet text: captions, icons at rest. |
| `--text-faint` | The faintest text: a disabled state. |

## Borders

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--border` | The border of every control and every card. |
| `--border-strong` | A stronger border, on hover for example. |
| `--divider` | The line between two sections. |

## Accent

The accent is the brand's colour: the logo's dot, the active tab, the counters. It is rust in Dark and Light, pink in Poudré, or the accent colour a profile picked in its settings.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--rust` | The accent colour itself. |
| `--rust-text` | A text in the accent colour. |
| `--rust-strong` | An accent text, stronger than `--rust-text`. |
| `--rust-surface` | A background tinted with the accent. |
| `--rust-surface-2` | A background tinted with the accent, deeper. |
| `--rust-border` | A border in the accent colour. |
| `--link-hover` | A hovered link. |

## States

Red says something failed or is about to be deleted. Green says something is accepted. Yellow warns.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--danger` | An error: its text and its icon. |
| `--destructive` | A delete button's background (`look="danger"`). |
| `--destructive-border` | A delete button's border. |
| `--destructive-text` | A delete button's text. |
| `--approve` | The background of something accepted. |
| `--approve-border` | The border of something accepted. |
| `--approve-text` | The text of something accepted. |
| `--warning` | A warning. |

## AI

Purple marks a click that spends AI credits, such as the `AiButton` button.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--ai` | The AI colour: an icon, a line. |
| `--ai-surface` | An AI area's background. |
| `--ai-border` | An AI area's border. |
| `--ai-text` | An AI area's main text. |
| `--ai-text-2` | An AI area's secondary text. |

## Information

Blue marks a note that explains how a screen works.

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--info-surface` | An information note's background. |
| `--info-border` | An information note's border. |
| `--info-icon` | An information note's icon. |
| `--info-text` | An information note's text. |

## News topic colours

Each news topic has its colour: Belgium, World, Tech… An element with the `data-topic` attribute gets that topic's three tokens. The samples below show the `tech` topic.

```tsx title="web/index.tsx"
<span className="hello-world-topic" data-topic="tech">
  Tech
</span>
```

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--topic` | The topic's colour. |
| `--topic-border` | A border in the topic's colour, softened. |
| `--topic-surface` | A very dark background in the topic's colour. |

## Layers

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--glass` | The background of a button floating over an image. |
| `--scrim` | The veil behind an open window. |
| `--shadow` | The shadow of a floating element. |

## Fonts

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--font-body` | Running text (Geist). |
| `--font-mono` | Captions, metadata and code (Geist Mono). |
| `--font-display` | Large titles, in capitals (Bebas Neue). |

## Corners

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--radius-thumb` | 10 px: a thumbnail, an image. |
| `--radius-card` | 16 px: a card. |
| `--radius-panel` | 20 px: a window, a large panel. |
| `--radius-pill` | A pill: a button, a chip. |

## Motion

Every transition in Hodi is gentle: nothing jumps. A plugin's transition uses the same values.

```css title="web/plugin.css"
.hello-world-card {
  transition: background var(--duration) var(--ease);
}
```

<!-- prettier-ignore -->
| Token | |
| --- | --- |
| `--duration` | 160 ms: a transition's length. |
| `--ease` | A transition's curve, `cubic-bezier(0.2, 0, 0, 1)`. |
