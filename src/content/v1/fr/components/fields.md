---
title: "Champs"
description: "Le texte, le mot de passe, les codes, les interrupteurs et les choix."
intro: "Les champs où la personne tape ou choisit quelque chose. Ils ont la même hauteur qu'un bouton : un champ et un bouton posés côte à côte s'alignent."
order: 4
icon: "text-cursor-input"
topic: "culture"
preview: "segmented"
---

## TextField

Un champ de texte sur une ligne, en forme de pilule, avec une icône au début. Il n'a pas de titre visible : son `aria-label` le nomme pour les lecteurs d'écran.

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
| `icon` | `LucideIcon` | L'icône au début du champ, une icône Lucide. |
| `aria-label` | `string` | Le nom du champ, pour les lecteurs d'écran. |
| `onClear?` | `() => void` | Pour une recherche : une croix ronde apparaît dès que le champ contient du texte, et un clic sur elle appelle cette fonction. |
| `…` | `InputHTMLAttributes` | Tout ce qu'un `<input>` accepte : `value`, `onChange`, `type`, `placeholder`… |

## PasswordField

Un champ de mot de passe, avec un œil pour afficher ce qui est tapé. Pour un nouveau mot de passe, `PasswordRing` remplace le cadenas et montre sa force, et `PasswordGauge` se place sous le champ.

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
| `aria-label` | `string` | Le nom du champ, pour les lecteurs d'écran. |
| `icon?` | `LucideIcon` | L'icône au début du champ. C'est un cadenas par défaut. |
| `invalid?` | `boolean` | Met le bord du champ en rouge, quand le mot de passe a été refusé. |
| `lead?` | `ReactNode` | Un élément à la place de l'icône, comme un `PasswordRing`. |
| `…` | `InputHTMLAttributes` | Tout ce qu'un `<input>` accepte, sauf `type`. |

## PasswordGauge

La ligne sous un nouveau mot de passe. Elle dit sa force et ce qui le rendrait plus fort, et disparaît dès qu'il est assez fort. `PasswordRing` prend la même prop.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `password` | `string` | Le mot de passe tapé, dont la ligne mesure la force. |

## PinField

Un champ de code, avec une case par caractère. Dès que le dernier caractère est tapé, le code se vérifie tout seul, sans bouton.

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
| `label` | `string` | Le nom du champ, pour les lecteurs d'écran. |
| `length` | `number` | Le nombre de caractères du code : 8 pour les codes de « J'ai un code », 6 pour une appli d'authentification. |
| `value` | `string` | Ce qui est tapé jusqu'ici. |
| `onChange` | `(value: string) => void` | Appelé à chaque caractère tapé ou effacé. |
| `onComplete?` | `(value: string) => void` | Appelé quand le code est tapé en entier, pour le vérifier. |
| `state?` | `'idle' \| 'wrong' \| 'right'` | `wrong` met les cases en rouge, `right` les met en vert. |
| `align?` | `'center' \| 'start'` | `start` aligne les cases à gauche, dans un formulaire. `center` les centre, quand le code a son propre écran. |
| `masked?` | `boolean` | Montre des points à la place des caractères. |
| `characters?` | `RegExp` | Les caractères acceptés. Par défaut, seulement les chiffres. |
| `disabled?` | `boolean` | Le champ est grisé et ne se remplit pas. |
| `autoFocus?` | `boolean` | Place le curseur dans la première case dès l'affichage. |

## Toggle

L'interrupteur, pour un réglage qui s'allume ou s'éteint. Dans une page de réglages, il se place au bout d'une `SettingRow`.

```tsx title="web/index.tsx" render="toggle" play="toggle"
import { Toggle } from 'hodi:sdk'

<Toggle
  checked={morning}
  label="Saluer le matin"
  onChange={setMorning}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | `true` quand l'interrupteur est allumé. |
| `label` | `string` | Ce que l'interrupteur allume, pour les lecteurs d'écran. |
| `onChange` | `(checked: boolean) => void` | Appelé à chaque bascule, avec le nouvel état. |
| `disabled?` | `boolean` | L'interrupteur est grisé et ne bascule pas. |

## Checkbox

Une case à cocher suivie d'une phrase, pour un accord, comme accepter des conditions.

```tsx title="web/index.tsx" render="checkbox" play="checkbox"
import { Checkbox } from 'hodi:sdk'

<Checkbox checked={keep} onChange={setKeep}>Garder mes salutations</Checkbox>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | `true` quand la case est cochée. |
| `onChange` | `(checked: boolean) => void` | Appelé à chaque clic, avec le nouvel état. |
| `children` | `ReactNode` | La phrase à côté de la case. |
| `disabled?` | `boolean` | La case est grisée et ne se coche pas. |

## AgeCheckbox

La case « J'ai au moins 13 ans », suivie du texte que chaque plugin ajoute avec [`ageConsent`](/fr/guide/slots/age-consent/). Tout formulaire qui crée un compte a cette case.

```tsx title="web/index.tsx" render="agecheckbox" play="agecheckbox"
import { AgeCheckbox } from 'hodi:sdk'

<AgeCheckbox checked={adult} onChange={setAdult} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | `true` quand la case est cochée. |
| `onChange` | `(checked: boolean) => void` | Appelé à chaque clic, avec le nouvel état. |

## Segmented

Un choix entre quelques options, dans une pilule, comme « Clair · Sombre · Système ». Dans une page de réglages, il se passe à la prop `choice` d'une `SettingRow`.

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
| `label` | `string` | Le nom du choix, pour les lecteurs d'écran. |
| `value` | `string \| number` | La valeur de l'option choisie. |
| `options` | `{ value; label; title? }[]` | Les options, dans l'ordre. Chacune a une valeur et un texte ; son `title` s'affiche au survol. |
| `onChange` | `(value) => void` | Appelé quand la personne choisit une option, avec sa valeur. |
| `wide?` | `boolean` | Le choix prend toute la largeur, partagée à parts égales entre les options. |
