---
title: "Champs"
description: "Le texte, le mot de passe, les codes, les interrupteurs et les choix."
intro: "Les champs de Hodi ont la hauteur d'un bouton : côte à côte, ils s'alignent."
order: 4
icon: "text-cursor-input"
topic: "culture"
preview: "segmented"
---

## TextField

Un champ d'une ligne, en pilule, avec son icône. Son `aria-label` le nomme.

```tsx title="web/index.tsx" render="textfield" play="textfield"
import { TextField } from 'hodi:sdk'
import { Mail } from 'lucide-react'

<TextField
  icon={Mail}
  aria-label="E-mail"
  placeholder="toi@exemple.be"
  value={email}
  onChange={e => setEmail(e.target.value)}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `icon` | `LucideIcon` | L'icône avant le texte. |
| `aria-label` | `string` | Le nom du champ, pour les lecteurs d'écran. |
| `onClear?` | `() => void` | Une recherche : une croix ronde le vide, dès qu'il y a quelque chose à vider. |
| `…` | `InputHTMLAttributes` | Tout ce qu'un `<input>` accepte : `value`, `onChange`, `type`, `placeholder`… |

## PasswordField

Un mot de passe, avec son œil pour l'afficher. Pour un nouveau, `PasswordRing` remplace le cadenas et `PasswordGauge` va dessous.

```tsx title="web/index.tsx" render="passwordfield" play="passwordfield"
import { PasswordField, PasswordGauge, PasswordRing } from 'hodi:sdk'

<PasswordField
  aria-label="Mot de passe"
  value={password}
  onChange={e => setPassword(e.target.value)}
  lead={<PasswordRing password={password} />}
/>
<PasswordGauge password={password} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `aria-label` | `string` | Le nom du champ. |
| `icon?` | `LucideIcon` | L'icône. Par défaut un cadenas. |
| `invalid?` | `boolean` | Bord rouge : le mot de passe a été refusé. |
| `lead?` | `ReactNode` | À la place de l'icône : un `PasswordRing`. |
| `…` | `InputHTMLAttributes` | Tout ce qu'un `<input>` accepte, sauf `type`. |

## PasswordGauge

La ligne sous un nouveau mot de passe : sa force et ce qui le rendrait plus fort. Elle disparaît dès qu'il est assez fort. `PasswordRing` prend la même prop.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `password` | `string` | Le mot de passe tapé. |

## PinField

Une case par caractère d'un code. Le code complet se vérifie tout seul, sans bouton.

```tsx title="web/index.tsx" render="pinfield" play="pinfield"
import { PinField } from 'hodi:sdk'

<PinField
  label="Code"
  length={6}
  value={code}
  onChange={setCode}
  onComplete={check}
  align="start"
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `label` | `string` | Le nom du champ. |
| `length` | `number` | Le nombre de caractères : 8 pour les codes de « J'ai un code », 6 pour une appli d'authentification. |
| `value` | `string` | Ce qui est tapé. |
| `onChange` | `(value: string) => void` | À chaque caractère. |
| `onComplete?` | `(value: string) => void` | Le code complet est tapé. |
| `state?` | `'idle' \| 'wrong' \| 'right'` | `wrong` les rougit, `right` les verdit. |
| `align?` | `'center' \| 'start'` | `start` dans un formulaire, centré sur son propre écran. |
| `masked?` | `boolean` | Les chiffres en points. |
| `characters?` | `RegExp` | Les caractères acceptés. Par défaut, les chiffres. |
| `disabled?` | `boolean` | Ne se remplit pas. |
| `autoFocus?` | `boolean` | Prend le focus à l'ouverture. |

## Toggle

L'interrupteur, pour un réglage qui s'allume ou s'éteint. Dans une ligne, il va dans une `SettingRow`.

```tsx title="web/index.tsx" render="toggle" play="toggle"
import { Toggle } from 'hodi:sdk'

<Toggle checked={morning} label="Saluer le matin" onChange={setMorning} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | Allumé ou non. |
| `label` | `string` | Ce qu'il allume, pour les lecteurs d'écran. |
| `onChange` | `(checked: boolean) => void` | À chaque bascule. |
| `disabled?` | `boolean` | Ne bascule pas. |

## Checkbox

Une phrase que la personne coche, comme un accord.

```tsx title="web/index.tsx" render="checkbox" play="checkbox"
import { Checkbox } from 'hodi:sdk'

<Checkbox checked={keep} onChange={setKeep}>Garder mes salutations</Checkbox>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | Cochée ou non. |
| `onChange` | `(checked: boolean) => void` | À chaque clic. |
| `children` | `ReactNode` | La phrase. |
| `disabled?` | `boolean` | Ne se coche pas. |

## AgeCheckbox

« J'ai au moins 13 ans », suivi de la ligne de chaque plugin qui en a une (`ageConsent`). C'est la case de tout formulaire qui crée un compte.

```tsx title="web/index.tsx" render="agecheckbox" play="agecheckbox"
import { AgeCheckbox } from 'hodi:sdk'

<AgeCheckbox checked={adult} onChange={setAdult} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | Cochée ou non. |
| `onChange` | `(checked: boolean) => void` | À chaque clic. |

## Segmented

Un choix parmi quelques-uns, dans une pilule, comme « Clair · Sombre · Système ». Dans une ligne, il va dans `choice` de `SettingRow`.

```tsx title="web/index.tsx" render="segmented" play="segmented"
import { Segmented } from 'hodi:sdk'

<Segmented
  label="Moment"
  value={moment}
  options={[
    { value: 'morning', label: 'Matin' },
    { value: 'noon', label: 'Midi' },
    { value: 'evening', label: 'Soir' }
  ]}
  onChange={setMoment}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `label` | `string` | Le nom du choix. |
| `value` | `string \| number` | L'option choisie. |
| `options` | `{ value; label; title? }[]` | Les options. `title` s'affiche au survol. |
| `onChange` | `(value) => void` | À chaque choix. |
| `wide?` | `boolean` | Toute la largeur, partagée entre les options. |
