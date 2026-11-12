---
title: "Premiers pas"
description: "Ton premier plugin Hodi en quatre étapes : son manifeste, sa route, sa carte, puis son installation."
intro: "Ton premier plugin en quatre étapes, dans un éditeur qui montre Hodi à côté de ton code."
order: 0
icon: "graduation-cap"
steps:
  - name: "Le manifeste"
    text: "Le manifeste dit à Hodi qui est ton plugin et quels réglages il a. Hodi dessine leur page tout seul."
    guide: "/fr/guide/manifest/"
    todo:
      - "Ouvre `plugin.json`, dans les onglets au-dessus du code."
      - "À la ligne 10, remplace « Bonjour » par « Salut ». C'est la valeur que le réglage a au départ."
      - "Regarde l'aperçu : la ligne Salutation affiche déjà « Salut »."
    file: "plugin.json"
    lang: "json"
    edit: 10
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
      crumb: "Serveur › Plugins › Hello world"
      rows:
        - label: "Salutation"
          value: "Salut"
          button: "Changer"
          flash: true
  - name: "La route"
    text: "Une route, c'est une fonction : Hodi l'appelle, elle répond. Celle-ci lit le réglage « Salutation » et le renvoie."
    guide: "/fr/guide/server-context/"
    todo:
      - "Ouvre `server/index.ts` : c'est la partie de ton plugin qui tourne sur le serveur."
      - "À la ligne 7, ajoute un « ! » après `greeting`, dans le texte que la route renvoie."
      - "Clique sur « Dire bonjour » dans l'aperçu : ta route répond « Salut ! »."
    file: "server/index.ts"
    lang: "ts"
    edit: 7
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
      crumb: "Serveur › Plugins › Hello world"
      rows:
        - label: "Salutation"
          value: "Salut"
          button: "Changer"
        - label: "Dire bonjour"
          hint: "Réponse de ta route"
          button: "Dire bonjour"
          answer: "Salut !"
  - name: "La carte"
    text: "La carte, c'est ce que Hodi affiche de ton plugin. Tu la dessines avec les composants de Hodi : elle a tout de suite l'air de l'app."
    guide: "/fr/components/"
    todo:
      - "Ouvre `web/index.tsx` : c'est la partie de ton plugin qui s'affiche dans Hodi."
      - "À la ligne 15, ajoute `look=\"primary\"` au bouton pour qu'il ressorte."
      - "Regarde l'aperçu : le bouton « Dire bonjour » prend le style principal."
    file: "web/index.tsx"
    lang: "tsx"
    edit: 15
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
      crumb: "Serveur › Plugins › Hello world"
      rows:
        - label: "Salutation"
          value: "Salut"
          button: "Changer"
        - label: "Salut !"
          hint: "Réponse de ta route"
          button: "Dire bonjour"
          primary: true
    log: "POST /api/plugins/hello-world/hello  200"
  - name: "Installer"
    text: "Le mode développeur installe ton plugin sur ton Hodi de test, puis le remet à jour à chaque sauvegarde : Hodi redémarre tout seul pour le charger."
    guide: "/fr/guide/publish/"
    todo:
      - "Dans Serveur › Plugins de ton Hodi de test, active le mode développeur et copie le code qu'il te montre."
      - "Lance `npx hodi-plugin dev` avec ce code, depuis le dossier de ton plugin."
      - "Regarde Serveur › Plugins : Hello world y est, avec le badge « En développement »."
    file: "Terminal"
    lang: "text"
    edit: 10
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
      crumb: "Serveur › Plugins"
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
    log: "Mode développeur : Hello world 0.1.0  ok"
finish:
  title: "Tuto terminé !"
  intro: "Bravo ! Tu viens de voir comment se construit un plugin Hodi. C'était une démo : aucun serveur ne tournait et rien n'a été installé."
  recap:
    - name: "Le manifeste"
      text: "`plugin.json` donne au plugin son nom, sa version et son réglage."
    - name: "La route"
      text: "`server/index.ts` répond au bouton « Dire bonjour » avec ce réglage."
    - name: "La carte"
      text: "`web/index.tsx` affiche le réglage et le bouton dans Réglages."
    - name: "L'installation"
      text: "`npx hodi-plugin dev` l'envoie sur ton Hodi et le met à jour à chaque enregistrement."
  real: "Pour le faire pour de vrai"
  realText: "Il te faut ton propre Hodi et Node.js 24. Pars du modèle de plugin : le guide t'accompagne pas à pas, de l'installation à la publication."
---
