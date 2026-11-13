import type { Lang } from './code.ts'

// What a plugin puts in its OverviewCard: here the household's hellos day by day this week, today in the accent.
// Each bar's height is in shadow.css, by its place in the week: 12, 18, 9, 22, 16, 27 and 24.
const WEEK = [12, 18, 9, 22, 16, 27, 24]
const DAYS = { fr: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] }

const WeekChart = ({ lang }: { lang: Lang }) => (
  <div className="week-chart" role="img" aria-label={WEEK.join(', ')}>
    {WEEK.map((count, day) => (
      <div key={day} className={`week-day${day === WEEK.length - 1 ? ' today' : ''}`}>
        <span className="week-bar" title={String(count)} />
        <span className="week-label">{DAYS[lang][day]}</span>
      </div>
    ))}
  </div>
)

export default WeekChart
