import { CardPreview } from './dashboard';

const features = [
  {
    id: 'up-next', title: 'Walk into the day with context.',
    description: 'Your next meeting, the people in it, and the details that help you pick up the conversation. Bring the pieces together before the calendar reminder arrives.',
    detail: 'Follow a meeting back to its original source, with the people and companies alongside it.',
  },
  {
    id: 'this-month', title: 'See what’s coming into focus.',
    description: 'Meetings, milestones, and commitments in one view. Spot a busy day and see what’s on it, without losing the bigger picture.',
    detail: 'Keep quote follow-ups, renewals, and start dates in view alongside your events.',
  },
  {
    id: 'tips', anchor: 'tip-inbox', title: 'Give important messages their own space.',
    description: 'Hush Line notification emails have a dedicated place on your dashboard, separate from everyday conversations.',
    detail: 'The Tip Inbox shows snippets from local emails sent by notifications@hushline.app, only when message text is included. It is not a direct connection to your Hush Line account. Read and manage submissions in Hush Line.',
  },
  {
    id: 'recommendations', title: 'Find a reason to reconnect.',
    description: 'A conversation worth continuing. A meeting on the horizon. See who to reach out to, with the history behind the suggestion.',
    detail: 'Activity sparklines appear when there’s interaction history. Upcoming events bring their own context, even without a history of messages.',
  },
  {
    id: 'activity', title: 'Get a feel for your week.',
    description: 'See the rhythm of your archive. Messages, events, and other records come together in a view that makes the busiest days easy to spot.',
    detail: 'A little perspective on the information you already have, kept on your Mac.',
  },
];

export default function CardFeatures() {
  return <div className="card-features wrap">
    {features.map((feature, index) => <section className={`card-feature ${index % 2 ? 'reverse' : ''}`} id={feature.anchor || feature.id} key={feature.id} aria-labelledby={`${feature.id}-heading`}>
      <div className="card-feature-copy">
        <h2 id={`${feature.id}-heading`}>{feature.title}</h2>
        <p>{feature.description}</p>
        <p className="feature-detail">{feature.detail}</p>
      </div>
      <div className="card-feature-art"><CardPreview id={feature.id}/></div>
    </section>)}
  </div>;
}
