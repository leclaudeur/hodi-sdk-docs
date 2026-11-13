---
title: "Premiers pas"
description: "Un premier plugin Hodi en quatre étapes : son manifeste, sa route, sa carte, puis son installation."
intro: "Un premier plugin en quatre étapes, dans un éditeur qui montre Hodi à côté du code."
order: 0
icon: "graduation-cap"
steps:
  - name: "Le manifeste"
    text: "Le manifeste dit à Hodi qui est le plugin et quels réglages il a. Hodi dessine leur page tout seul."
    more:
      - label: "Le manifeste"
        href: "/fr/guide/manifest/"
      - label: "Serveur et web"
        href: "/fr/guide/server-and-web/"
    todo:
      - "Ouvrir `plugin.json`, dans les onglets au-dessus du code."
      - "Sur la ligne surlignée, remplacer « Bonjour » par « Salut ». C'est la valeur que le réglage a au départ."
      - "Dans l'aperçu, la ligne Salutation affiche alors « Salut »."
    file: "plugin.json"
    lang: "json"
    edit: 10
    start: '"default": "Bonjour"'
    code: |
      {
        "id": "hello-world",
        "name": "Hello world",
        "version": "0.1.0",
        "api": 2,
        "settings": [
          {
            "key": "greeting",
            "type": "text",
            "default": "Salut"
          }
        ]
      }
    preview:
      title: "Hello world"
      intro: "Ton premier plugin."
      rows:
        - label: "Salutation"
          value: "Salut"
          button: "Changer"
          flash: true
          live: true
  - name: "La route"
    text: "Une route, c'est une fonction : Hodi l'appelle, elle répond. Celle-ci lit le réglage « Salutation » et le renvoie."
    more:
      - label: "Le contexte serveur"
        href: "/fr/guide/server-context/"
      - label: "Serveur et web"
        href: "/fr/guide/server-and-web/"
    todo:
      - "Ouvrir `server/index.ts` : c'est la partie du plugin qui tourne sur le serveur."
      - "Sur la ligne surlignée, ajouter un « ! » après `greeting`, dans le texte que la route renvoie."
      - "Cliquer sur « Dire bonjour » dans l'aperçu : la route répond « Salut ! »."
    file: "server/index.ts"
    lang: "ts"
    edit: 7
    start: "return { body: { text: `${greeting}` } }"
    code: |
      import type { ServerPlugin } from '@hodi-app/plugin-sdk/server'

      const plugin: ServerPlugin = {
        routes: {
          'POST /hello': async (_request, ctx) => {
            const { greeting } = ctx.settings()
            return { body: { text: `${greeting} !` } }
          }
        }
      }

      export default plugin
    preview:
      title: "Hello world"
      intro: "Ton premier plugin."
      rows:
        - label: "Salutation"
          value: "Salut"
          button: "Changer"
        - label: "Dire bonjour"
          hint: "Réponse de ta route"
          button: "Dire bonjour"
          answer: "Salut !"
          live: true
  - name: "La carte"
    text: "La carte, c'est ce que Hodi affiche du plugin. Elle se dessine avec les composants de Hodi : elle a tout de suite l'air de l'app."
    more:
      - label: "Les emplacements"
        href: "/fr/guide/slots/"
      - label: "Les composants"
        href: "/fr/components/"
      - label: "Boutons"
        href: "/fr/components/buttons/"
    todo:
      - "Ouvrir `web/index.tsx` : c'est la partie du plugin qui s'affiche dans Hodi."
      - "Sur la ligne surlignée, ajouter `look=\"primary\"` au bouton pour qu'il ressorte."
      - "Dans l'aperçu, le bouton « Dire bonjour » prend alors le style principal."
    file: "web/index.tsx"
    lang: "tsx"
    edit: 15
    start: "<Button onClick={sayHello}>"
    code: |
      import { useState } from 'react'
      import {
        Button, SettingRow, definePlugin, usePluginApi
      } from 'hodi:sdk'

      const HelloCard = () => {
        const api = usePluginApi()
        const [text, setText] = useState('Dire bonjour')
        const sayHello = async () => {
          const response = await api('/hello', { method: 'POST' })
          setText((await response.json()).text)
        }
        return (
          <SettingRow label={text} hint="Réponse de ta route">
            <Button look="primary" onClick={sayHello}>
              Dire bonjour
            </Button>
          </SettingRow>
        )
      }

      definePlugin({ settingsPage: HelloCard })
    preview:
      title: "Hello world"
      intro: "Ton premier plugin."
      rows:
        - label: "Salutation"
          value: "Salut"
          button: "Changer"
        - label: "Salut !"
          hint: "Réponse de ta route"
          button: "Dire bonjour"
          primary: true
          live: true
    log: "POST /api/plugins/hello-world/hello  200"
  - name: "Installer"
    text: "Le mode développeur installe le plugin sur un Hodi de test, puis le remet à jour à chaque sauvegarde : Hodi redémarre tout seul pour le charger."
    more:
      - label: "Publier"
        href: "/fr/guide/publish/"
      - label: "Le manifeste"
        href: "/fr/guide/manifest/"
    todo:
      - "Dans l'aperçu, le mode développeur du Hodi de test est actif : il montre un code."
      - "Sur la ligne surlignée, taper ce code après `--code`, pour lancer `npx hodi-plugin dev`."
      - "Dans Serveur › Plugins, Hello world apparaît alors avec le badge « En développement »."
    file: "Terminal"
    lang: "text"
    edit: 3
    start: "--code"
    reveal: 4
    code: |
      $ npx hodi-plugin dev \
          --server http://localhost:3000 \
          --code 482913

      ✓ plugin.json
      ✓ server/index.ts
      ✓ web/index.tsx
      ✓ locales/fr.json, locales/en.json

      Installé : Hello world 0.1.0
      En attente d’un changement…
    preview:
      title: "Plugins"
      intro: "Ce que l'admin du serveur voit."
      plugins:
        - name: "Diagnostic"
          icon: "stethoscope"
          hint: "Signale un article mal lu"
          chip: "0.2.2"
          tone: "success"
        - name: "Hello world"
          icon: "hand"
          hint: "Ton premier plugin"
          chip: "En développement"
          tone: "warning"
          after: true
        - name: "Mode développeur"
          icon: "code"
          hint: "Code : 482913"
          chip: "Actif"
          tone: "success"
    log: "Mode développeur : Hello world 0.1.0  ok"
finish:
  title: "Tuto terminé !"
  intro: "Bravo ! Voilà comment se construit un plugin Hodi. C'était une démo : aucun serveur ne tournait et rien n'a été installé."
  recap:
    - name: "Le manifeste"
      text: "`plugin.json` donne au plugin son nom, sa version et son réglage."
    - name: "La route"
      text: "`server/index.ts` répond au bouton « Dire bonjour » avec ce réglage."
    - name: "La carte"
      text: "`web/index.tsx` affiche le réglage et le bouton dans Réglages."
    - name: "L'installation"
      text: "`npx hodi-plugin dev` l'envoie sur le Hodi de test et le met à jour à chaque enregistrement."
  real: "Pour le faire pour de vrai"
  realText: "Il faut un Hodi à soi et Node.js 24. Le modèle de plugin est le point de départ, et le guide accompagne pas à pas, de l'installation à la publication."
---
