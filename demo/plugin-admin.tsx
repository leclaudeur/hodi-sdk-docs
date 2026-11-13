import i18next from 'i18next'
import { pluginNamespace } from '../src/plugins/registry.ts'
import { PluginOptions } from '../src/views/settings/sections/plugins/PluginOptions.tsx'
import PluginPermissions from '../src/views/settings/sections/plugins/PluginPermissions.tsx'

// What Hodi itself draws for a plugin in Serveur › Plugins, from its plugin.json: the guide's Le manifeste shows it.
const english = navigator.language.startsWith('en')
const w = (french: string, other: string) => (english ? other : french)
const phone = innerWidth <= 600

// The plugin's own texts, as its locales/<lang>.json gives them.
i18next.addResourceBundle(english ? 'en' : 'fr', pluginNamespace('hello-world'), {
  settings: {
    greeting: w('Message', 'Message'),
    greetingHint: w('Ce que le plugin répond', 'What the plugin answers'),
    loud: w('En majuscules', 'In capitals'),
    times: w('Nombre de bonjours', 'Number of hellos'),
    moment: w('Moment', 'Time of day'),
    momentOptions: { morning: w('Matin', 'Morning'), evening: w('Soir', 'Evening') }
  }
})

const plugin = {
  id: 'hello-world',
  enabled: true,
  settings: [
    { key: 'greeting', type: 'text', default: 'Bonjour', maxLength: 40 },
    { key: 'loud', type: 'boolean', default: false },
    { key: 'times', type: 'number', default: 1, min: 1, max: 5 },
    { key: 'moment', type: 'choice', default: 'morning', options: ['morning', 'evening'] }
  ],
  values: { greeting: w('Bonjour', 'Hello'), loud: false, times: 1, moment: 'morning' }
}

const no = () => {}

const PluginAdmin = () => (
  <>
    <section data-ex="pluginoptions">
      <PluginOptions plugin={plugin as never} layout={phone ? 'phone' : 'desktop'} onSave={no} />
    </section>
    <section data-ex="pluginpermissions">
      <PluginPermissions
        permissions={{
          network: ['api.example.com'],
          articles: true,
          publicRoutes: false,
          accounts: false,
          mail: false,
          signIn: false,
          households: false,
          notify: true,
          ai: true
        }}
      />
    </section>
  </>
)

export default PluginAdmin
