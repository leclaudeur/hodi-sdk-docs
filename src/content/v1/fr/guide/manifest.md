---
title: "Le manifeste"
description: "`plugin.json` dit à Hodi qui est ton plugin, pour qui il est, quels réglages il a et ce qu'il a le droit de faire."
intro: "`plugin.json` dit à Hodi qui est ton plugin, pour qui il est, quels réglages il a et ce qu'il a le droit de faire. Hodi le vérifie à l'installation et refuse un manifeste qui ne va pas, en disant pourquoi."
order: 2
icon: "file-braces"
---

```json title="plugin.json"
{
  "id": "hello-world",
  "name": "Hello world",
  "version": "0.1.0",
  "description": "Un réglage, une route et sa propre carte.",
  "api": 2,
  "audience": "all",
  "settings": [
    {
      "key": "greeting",
      "type": "text",
      "default": "Bonjour",
      "maxLength": 40
    }
  ]
}
```

## Qui il est

- `id` : lettres minuscules, chiffres et tirets, 32 au plus. Il ne change plus.
- `name` et `description` : 60 et 280 caractères au plus.
- `version` : un numéro comme `1.2.0`, ou `1.2.0-beta.1` pour une préversion.
- `api` : la version de l'API des plugins, `2` aujourd'hui.

L'id nomme son dossier, ses routes et ses fichiers : le changer ferait un autre plugin, sans ses données. Hodi ne charge pas un plugin écrit pour une autre version de l'API.

Le nom et la description de `plugin.json` servent quand une langue n'a pas les siens. Donne-les quand même dans chaque fichier de `locales/`, sous `manifest`, car un nom peut changer d'une langue à l'autre, et Hodi montre toujours celui de la personne.

## Pour qui

`audience` dit qui voit le plugin, ses pages et ses [routes](/fr/guide/server-context/) :

- `"admin"` : l'admin du foyer seulement ;
- `"all"` : chaque profil du foyer, enfants compris.

Une route reçoit toujours le type du profil, `request.who.kind`.

## Ses réglages

Hodi dessine leurs lignes sur la page du plugin, dans _Serveur › Plugins_, au-dessus de [ses options](/fr/guide/slots/options/). 32 réglages au plus, chacun avec une clé, un type et une valeur par défaut :

- `"boolean"` : un interrupteur.
- `"number"` : un nombre, avec `min` et `max` si tu veux.
- `"text"` : un texte, avec `maxLength`, 2000 au plus.
- `"choice"` : un choix parmi `options`.

Le libellé d'un réglage vient de `settings.<clé>` dans ses locales, et sa ligne d'aide de `settings.<clé>Hint`. Ta partie serveur les lit avec `ctx.settings()`, valeurs par défaut comprises.

## Ses permissions

Chaque pouvoir est une permission, fausse tant que le manifeste ne dit pas `true`. Hodi montre leur liste à l'admin avant l'installation, puis refuse tout le reste.

```json title="plugin.json"
"permissions": {
  "network": [
    "api.example.com"
  ],
  "articles": true
}
```

Pour tous les plugins :

- `network` : les sites qu'il peut lire, par nom exact, 20 au plus.
- `articles` : les articles que Hodi a listés, et leur page.
- `publicRoutes` : des routes ouvertes à tous, et des [écrans avant la connexion](/fr/guide/slots/sign-in/).

Pour un plugin signé seulement, parce qu'elles touchent aux gens ou coûtent au foyer :

- `ai` : une question à l'IA du foyer, à chaque clic sur son bouton.
- `notify` et `mail` : notifications et e-mails.
- `accounts`, `households` et `signIn` : comptes, foyers et connexion.

Un plugin non signé qui en demande une est refusé à l'installation, sauf `ai`, dont il se passe. Le mode développeur les garde toutes, pour que tu puisses les tester.

## Le reste

- `menu` : où sa page se place dans Réglages ; voir [Réglages](/fr/guide/slots/settings/).
- `feeds` : jusqu'à 5 flux qu'un foyer peut suivre ; voir [les flux](/fr/guide/slots/feeds/).
- `memoryMb` : la mémoire de sa partie serveur, 16 Mo par défaut, 32 au plus.
- `publicPages` : les adresses qu'il ouvre aux moteurs de recherche.
