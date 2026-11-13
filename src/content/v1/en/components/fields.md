---
title: "Fields"
description: "Text, password, codes, switches and choices."
intro: "The fields where the person types or picks something. They are as tall as a button: a field and a button placed side by side line up."
order: 4
icon: "text-cursor-input"
topic: "culture"
preview: "segmented"
---

## TextField

A one-line text field, pill-shaped, with an icon at the start. It has no visible title: its `aria-label` names it for screen readers.

```tsx title="web/index.tsx" render="textfield" play="textfield"
import { TextField } from 'hodi:sdk'
import { Mail } from 'lucide-react'

<TextField
  icon={Mail}
  aria-label="E-mail"
  placeholder="you@example.com"
  value={email}
  onChange={e => setEmail(e.target.value)}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `icon` | `LucideIcon` | The icon at the start of the field, a Lucide icon. |
| `aria-label` | `string` | The field's name, for screen readers. |
| `onClear?` | `() => void` | For a search: a round cross shows as soon as the field holds text, and a click on it calls this function. |
| `…` | `InputHTMLAttributes` | Everything an `<input>` accepts: `value`, `onChange`, `type`, `placeholder`… |

## PasswordField

A password field, with an eye to show what is typed. For a new password, `PasswordRing` replaces the padlock and shows its strength, and `PasswordGauge` goes under the field.

```tsx title="web/index.tsx" render="passwordfield" play="passwordfield"
import { PasswordField, PasswordGauge, PasswordRing } from 'hodi:sdk'

<PasswordField
  aria-label="Password"
  value={password}
  onChange={e => setPassword(e.target.value)}
  lead={<PasswordRing password={password} />}
/>
<PasswordGauge password={password} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `aria-label` | `string` | The field's name, for screen readers. |
| `icon?` | `LucideIcon` | The icon at the start of the field. It is a padlock by default. |
| `invalid?` | `boolean` | Turns the field's border red, when the password was refused. |
| `lead?` | `ReactNode` | An element in place of the icon, such as a `PasswordRing`. |
| `…` | `InputHTMLAttributes` | Everything an `<input>` accepts, except `type`. |

## PasswordGauge

The line under a new password. It says its strength and what would make it stronger, and goes away as soon as it is strong enough. `PasswordRing` takes the same prop.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `password` | `string` | The password typed, whose strength the line measures. |

## PinField

A code field, with one box per character. As soon as the last character is typed, the code checks itself, without a button.

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
| `label` | `string` | The field's name, for screen readers. |
| `length` | `number` | The number of characters in the code: 8 for the codes of _I have a code_, 6 for an authenticator app. |
| `value` | `string` | What is typed so far. |
| `onChange` | `(value: string) => void` | Called at each character typed or erased. |
| `onComplete?` | `(value: string) => void` | Called when the whole code is typed, to check it. |
| `state?` | `'idle' \| 'wrong' \| 'right'` | `wrong` turns the boxes red, `right` turns them green. |
| `align?` | `'center' \| 'start'` | `start` lines the boxes up on the left, in a form. `center` centres them, when the code has its own screen. |
| `masked?` | `boolean` | Shows dots instead of the characters. |
| `characters?` | `RegExp` | The characters accepted. Only digits by default. |
| `disabled?` | `boolean` | The field is greyed out and can't be filled in. |
| `autoFocus?` | `boolean` | Puts the cursor in the first box as soon as it shows. |

## Toggle

The switch, for a setting that turns on or off. In a settings page, it goes at the end of a `SettingRow`.

```tsx title="web/index.tsx" render="toggle" play="toggle"
import { Toggle } from 'hodi:sdk'

<Toggle
  checked={morning}
  label="Say hello in the morning"
  onChange={setMorning}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | `true` when the switch is on. |
| `label` | `string` | What the switch turns on, for screen readers. |
| `onChange` | `(checked: boolean) => void` | Called at each switch, with the new state. |
| `disabled?` | `boolean` | The switch is greyed out and doesn't switch. |

## Checkbox

A checkbox followed by a sentence, for an agreement, such as accepting terms.

```tsx title="web/index.tsx" render="checkbox" play="checkbox"
import { Checkbox } from 'hodi:sdk'

<Checkbox checked={keep} onChange={setKeep}>Keep my greetings</Checkbox>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | `true` when the box is ticked. |
| `onChange` | `(checked: boolean) => void` | Called at each click, with the new state. |
| `children` | `ReactNode` | The sentence next to the box. |
| `disabled?` | `boolean` | The box is greyed out and can't be ticked. |

## AgeCheckbox

The _I am at least 13 years old_ box, followed by the text each plugin adds with [`ageConsent`](/en/guide/slots/age-consent/). Every form that creates an account has this box.

```tsx title="web/index.tsx" render="agecheckbox" play="agecheckbox"
import { AgeCheckbox } from 'hodi:sdk'

<AgeCheckbox checked={adult} onChange={setAdult} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | `true` when the box is ticked. |
| `onChange` | `(checked: boolean) => void` | Called at each click, with the new state. |

## Segmented

A choice between a few options, in a pill, such as _Light · Dark · System_. In a settings page, it is passed to a `SettingRow`'s `choice` prop.

```tsx title="web/index.tsx" render="segmented" play="segmented"
import { Segmented } from 'hodi:sdk'

<Segmented
  label="Moment"
  value={moment}
  options={[
    { value: 'morning', label: 'Morning' },
    { value: 'noon', label: 'Noon' },
    { value: 'evening', label: 'Evening' }
  ]}
  onChange={setMoment}
/>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `label` | `string` | The choice's name, for screen readers. |
| `value` | `string \| number` | The value of the chosen option. |
| `options` | `{ value; label; title? }[]` | The options, in order. Each has a value and a text; its `title` shows on hover. |
| `onChange` | `(value) => void` | Called when the person picks an option, with its value. |
| `wide?` | `boolean` | The choice takes the whole width, shared equally between the options. |
