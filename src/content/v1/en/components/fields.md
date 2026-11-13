---
title: "Fields"
description: "Text, password, codes, switches and choices."
intro: "Hodi's fields are as tall as a button: side by side, they line up."
order: 4
icon: "text-cursor-input"
topic: "culture"
preview: "segmented"
---

## TextField

A one-line field, pill-shaped, with its icon. Its `aria-label` names it.

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
| `icon` | `LucideIcon` | The icon before the text. |
| `aria-label` | `string` | The field's name, for screen readers. |
| `onClear?` | `() => void` | A search: a round cross clears it, as soon as there is something to clear. |
| `…` | `InputHTMLAttributes` | Everything an `<input>` accepts: `value`, `onChange`, `type`, `placeholder`… |

## PasswordField

A password, with its eye to show it. For a new one, put `PasswordRing` in place of the padlock and `PasswordGauge` under it.

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
| `aria-label` | `string` | The field's name. |
| `icon?` | `LucideIcon` | The icon. A padlock by default. |
| `invalid?` | `boolean` | Red border: the password was refused. |
| `lead?` | `ReactNode` | In place of the icon: a `PasswordRing`. |
| `…` | `InputHTMLAttributes` | Everything an `<input>` accepts, except `type`. |

## PasswordGauge

The line under a new password: its strength and what would make it stronger. It goes away as soon as it is strong enough. `PasswordRing` takes the same prop.

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `password` | `string` | The password typed. |

## PinField

One box per character of a code. The full code checks itself, without a button.

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
| `label` | `string` | The field's name. |
| `length` | `number` | The number of characters: 8 for the codes of "I have a code", 6 for an authenticator app. |
| `value` | `string` | What is typed. |
| `onChange` | `(value: string) => void` | At each character. |
| `onComplete?` | `(value: string) => void` | The full code is typed. |
| `state?` | `'idle' \| 'wrong' \| 'right'` | `wrong` turns them red, `right` green. |
| `align?` | `'center' \| 'start'` | `start` in a form, centred on its own screen. |
| `masked?` | `boolean` | The digits as dots. |
| `characters?` | `RegExp` | The characters accepted. Digits by default. |
| `disabled?` | `boolean` | Can't be filled in. |
| `autoFocus?` | `boolean` | Takes the focus when it opens. |

## Toggle

The switch, for a setting that turns on or off. In a row, it goes in a `SettingRow`.

```tsx title="web/index.tsx" render="toggle" play="toggle"
import { Toggle } from 'hodi:sdk'

<Toggle checked={morning} label="Say hello in the morning" onChange={setMorning} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | On or not. |
| `label` | `string` | What it turns on, for screen readers. |
| `onChange` | `(checked: boolean) => void` | At each switch. |
| `disabled?` | `boolean` | Doesn't switch. |

## Checkbox

A sentence the person ticks, like an agreement.

```tsx title="web/index.tsx" render="checkbox" play="checkbox"
import { Checkbox } from 'hodi:sdk'

<Checkbox checked={keep} onChange={setKeep}>Keep my greetings</Checkbox>
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | Ticked or not. |
| `onChange` | `(checked: boolean) => void` | At each click. |
| `children` | `ReactNode` | The sentence. |
| `disabled?` | `boolean` | Can't be ticked. |

## AgeCheckbox

"I am at least 13", followed by the line of each plugin that has one (`ageConsent`). It's the box of every form that creates an account.

```tsx title="web/index.tsx" render="agecheckbox" play="agecheckbox"
import { AgeCheckbox } from 'hodi:sdk'

<AgeCheckbox checked={adult} onChange={setAdult} />
```

<!-- prettier-ignore -->
| Props | Type | |
| --- | --- | --- |
| `checked` | `boolean` | Ticked or not. |
| `onChange` | `(checked: boolean) => void` | At each click. |

## Segmented

One choice among a few, in a pill, like "Light · Dark · System". In a row, pass it to `SettingRow`'s `choice`.

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
| `label` | `string` | The choice's name. |
| `value` | `string \| number` | The chosen option. |
| `options` | `{ value; label; title? }[]` | The options. `title` shows on hover. |
| `onChange` | `(value) => void` | At each choice. |
| `wide?` | `boolean` | The whole width, shared between the options. |
