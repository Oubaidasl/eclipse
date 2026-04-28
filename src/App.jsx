import { useMemo, useState } from 'react'
import heroBackgroundVideo from './assets/vidBackground.mp4'
import sponsor1Image from './assets/sponsor1.jpeg'
import sponsor2Image from './assets/sponsor2.png'
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiHelpCircle,
  FiMapPin,
  FiMic,
  FiShield,
  FiTarget,
  FiUsers,
  FiVideo,
} from 'react-icons/fi'

const eventDays = [
  {
    id: 'day-1',
    label: 'Day 1',
    date: 'Dec 3',
    focus: 'Opening ceremony, keynotes, and community check-in.',
    items: [
      { time: '10:00', title: 'Check-in Window', meta: 'Main Gate' },
      { time: '15:00', title: 'Opening Ceremony', meta: 'Main Auditorium' },
      { time: '17:30', title: 'Industry Keynote', meta: 'Stage A' },
    ],
  },
  {
    id: 'day-2',
    label: 'Day 2',
    date: 'Dec 4',
    focus: 'Talk tracks, workshops, and challenge briefings.',
    items: [
      { time: '09:30', title: 'Workshop Block', meta: 'Labs Wing' },
      { time: '13:00', title: 'Speaker Sessions', meta: 'Stage A' },
      { time: '18:00', title: 'CTF Warm-up', meta: 'Arena Floor' },
    ],
  },
  {
    id: 'day-3',
    label: 'Day 3',
    date: 'Dec 5',
    focus: 'Main competition day with live scoring and team pushes.',
    items: [
      { time: '09:00', title: 'CTF Finals Start', meta: 'Arena Floor' },
      { time: '14:00', title: 'Mentor Office Hours', meta: 'Support Room' },
      { time: '20:00', title: 'Night Recap', meta: 'Community Lounge' },
    ],
  },
]

const speakerSlots = [
  'Keynote Speaker Slot',
  'Offensive Security Speaker Slot',
  'Blue Team Speaker Slot',
  'Builder / Career Speaker Slot',
]

const statCards = [
  { label: 'Attendees', value: '250+' },
  { label: 'Qualified Teams', value: '32' },
  { label: 'Challenge Tracks', value: '8' },
  { label: 'Prize Pool', value: 'TBA' },
]

const sponsors = [
  {
    name: 'Sponsor 1',
    type: 'image',
    src: sponsor1Image,
  },
  {
    name: 'Sponsor 2',
    type: 'image',
    src: sponsor2Image,
    className: 'is-rotated',
  },
]

const faqItems = [
  {
    question: 'Who is this event for?',
    answer:
      'Students, builders, and security enthusiasts. Keep the copy if that still fits, or replace it with your actual audience later.',
  },
  {
    question: 'Will there be a live CTF?',
    answer:
      'Yes. This section is wired as a placeholder for your real event details, formats, and timelines.',
  },
  {
    question: 'Can I join as a solo player or team?',
    answer:
      'This answer block is ready for your final rule set, team size, and qualification criteria.',
  },
  {
    question: 'Where do I add logistics and travel info?',
    answer:
      'Use this FAQ section for venue access, accommodation, food, gear requirements, and attendee support.',
  },
]

const placeholderText = {
  speaker: 'Speaker image placeholder',
  gallery: 'Gallery / recap asset placeholder',
  sponsor: 'Sponsor logo placeholder',
  organizer: 'Organizer photo placeholder',
}

function Placeholder({ icon: Icon, label, detail }) {
  return (
    <div className="placeholder-tile" role="img" aria-label={label}>
      <Icon />
      <span>{label}</span>
      {detail ? <small>{detail}</small> : null}
    </div>
  )
}

function App() {
  const [selectedDay, setSelectedDay] = useState(eventDays[0].id)
  const [openFaq, setOpenFaq] = useState(0)

  const activeDay = useMemo(
    () => eventDays.find((day) => day.id === selectedDay) ?? eventDays[0],
    [selectedDay],
  )

  return (
    <div className="page-shell">
      <main>
        <section className="hero-section">
          <div className="hero-video-stage">
            <div className="hero-background">
              <video
                className="hero-background-video"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={heroBackgroundVideo} type="video/mp4" />
              </video>
              <div className="hero-background-overlay" />
            </div>

            <header className="site-header hero-header">
              <div className="brand-lockup">
                <img
                  src="/cg-logo.jpeg"
                  alt="Cyber Guardians logo"
                  className="brand-logo"
                />
                <div>
                  <p className="eyebrow">Cyber Guardians</p>
                  <h1 className="brand-title">Eclipse</h1>
                </div>
              </div>

              <nav className="site-nav" aria-label="Primary">
                <a href="#about">About</a>
                <a href="#agenda">Agenda</a>
                <a href="#ctf">CTF</a>
                <a href="#faq">FAQ</a>
              </nav>
            </header>
          </div>

          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Annual Cybersecurity Experience</p>
            <h2>
              A neon-dark event site built for your community, talks, and CTF.
            </h2>
            <p className="hero-description">
              This layout mirrors the structure of the reference site while
              keeping the media slots intentionally empty so you can drop in
              your own video, speaker images, gallery assets, and sponsor logos.
            </p>

            <div className="hero-meta">
              <div>
                <FiCalendar />
                <span>December 2026</span>
              </div>
              <div>
                <FiMapPin />
                <span>Venue Placeholder</span>
              </div>
              <div>
                <FiUsers />
                <span>Registration CTA Ready</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#register" className="primary-action">
                Register Interest
                <FiArrowRight />
              </a>
              <a href="#agenda" className="secondary-action">
                Explore Program
              </a>
            </div>
          </div>

        </section>

        {/* <section className="stats-section">
          {statCards.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section> */}

        <section id="about" className="content-section two-column-section">
          <div className="section-copy">
            <p className="eyebrow">About The Event</p>
            <h3>Same energy as the reference, but tuned to your logo.</h3>
            <p>
              The palette is pulled from your mark: black background, bright
              radioactive green accents, subtle grid lines, and metallic muted
              text. The typography leans sharp and technical so the whole thing
              feels aligned with the bird emblem and cyber aesthetic.
            </p>
            <p>
              This section is ready for your event story, audience description,
              and positioning without needing structural changes later.
            </p>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <FiShield />
              <h4>Talks & Workshops</h4>
              <p>Use this card for your learning tracks and technical themes.</p>
            </article>
            <article className="info-card">
              <FiTarget />
              <h4>Competition Focus</h4>
              <p>Good spot for rules, challenge categories, or qualification.</p>
            </article>
            <article className="info-card">
              <FiGlobe />
              <h4>Community Reach</h4>
              <p>Use this for schools, teams, partners, and ecosystem notes.</p>
            </article>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Speakers</p>
            <h3>Speaker cards with empty media slots</h3>
          </div>

          <div className="speaker-grid">
            {speakerSlots.map((slot) => (
              <article key={slot} className="speaker-card">
                <Placeholder
                  icon={FiMic}
                  label={placeholderText.speaker}
                  detail="1:1 card asset area"
                />
                <div className="speaker-copy">
                  <h4>{slot}</h4>
                  <p>Role / title placeholder</p>
                  <span>Talk title placeholder</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="agenda" className="content-section agenda-section">
          <div className="section-heading">
            <p className="eyebrow">Agenda</p>
            <h3>Multi-day program with tab-style day switching</h3>
          </div>

          <div className="day-tabs" role="tablist" aria-label="Event days">
            {eventDays.map((day) => (
              <button
                key={day.id}
                type="button"
                className={day.id === activeDay.id ? 'day-tab active' : 'day-tab'}
                onClick={() => setSelectedDay(day.id)}
              >
                <span>{day.label}</span>
                <small>{day.date}</small>
              </button>
            ))}
          </div>

          <div className="agenda-panel">
            <div className="agenda-intro">
              <h4>{activeDay.label}</h4>
              <p>{activeDay.focus}</p>
            </div>

            <div className="timeline-list">
              {activeDay.items.map((item) => (
                <article key={`${activeDay.id}-${item.time}-${item.title}`} className="timeline-item">
                  <div className="timeline-time">
                    <FiClock />
                    <span>{item.time}</span>
                  </div>
                  <div>
                    <h5>{item.title}</h5>
                    <p>{item.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ctf" className="content-section two-column-section">
          <div className="section-copy">
            <p className="eyebrow">CTF Experience</p>
            <h3>Space for your challenge tracks, scoring model, and finals.</h3>
            <p>
              The layout below is already shaped for a public overview section
              similar to the live site you shared: challenge categories, format,
              stats, and a CTA that can later point at your platform or form.
            </p>
          </div>

          <div className="ctf-panel">
            <div className="mini-stat-grid">
              <article>
                <strong>Web</strong>
                <span>Track Placeholder</span>
              </article>
              <article>
                <strong>Pwn</strong>
                <span>Track Placeholder</span>
              </article>
              <article>
                <strong>Forensics</strong>
                <span>Track Placeholder</span>
              </article>
              <article>
                <strong>Crypto</strong>
                <span>Track Placeholder</span>
              </article>
            </div>
            <a href="#register" className="secondary-action inline-action">
              Add CTF Signup Link Later
            </a>
          </div>
        </section>

        {/* <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Recap Gallery</p>
            <h3>Keep these empty until your real visual assets are ready</h3>
          </div>

          <div className="gallery-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <Placeholder
                key={`gallery-${index + 1}`}
                icon={FiVideo}
                label={placeholderText.gallery}
                detail={`Slot ${index + 1}`}
              />
            ))}
          </div>
        </section> */}

        <section className="content-section sponsors-section">
          <div className="section-heading">
            <p className="eyebrow">Sponsors & Organizers</p>
            <h3>Current sponsors and organizer slots</h3>
          </div>

          <div className="sponsor-grid">
            {sponsors.map((sponsor) => (
              <article key={sponsor.name} className="sponsor-card">
                <div className="sponsor-media">
                  <img
                    src={sponsor.src}
                    alt={sponsor.name}
                    className={`sponsor-image ${sponsor.className ?? ''}`.trim()}
                  />
                </div>
                <div className="sponsor-copy">
                  <h4>{sponsor.name}</h4>
                </div>
              </article>
            ))}
          </div>

          <div className="organizer-grid">
            {Array.from({ length: 3 }).map((_, index) => (
              <article key={`organizer-${index + 1}`} className="speaker-card">
                <Placeholder
                  icon={FiUsers}
                  label={placeholderText.organizer}
                  detail="Team portrait slot"
                />
                <div className="speaker-copy">
                  <h4>Organizer Name</h4>
                  <p>Role placeholder</p>
                  <span>Short bio placeholder</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="content-section faq-section">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h3>Accordion-ready answers for event logistics and rules</h3>
          </div>

          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = index === openFaq
              return (
                <article key={item.question} className="faq-item">
                  <button
                    type="button"
                    className="faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>
                      <FiHelpCircle />
                      {item.question}
                    </span>
                    <strong>{isOpen ? '−' : '+'}</strong>
                  </button>
                  {isOpen ? <p className="faq-answer">{item.answer}</p> : null}
                </article>
              )
            })}
          </div>
        </section>

        <section id="register" className="content-section cta-section">
          <p className="eyebrow">Registration</p>
          <h3>Your main CTA can point to a form, ticket page, or CTF portal.</h3>
          <p>
            Right now it is a styled placeholder so the layout stays complete
            without forcing you to commit to the final destination yet.
          </p>
          <a href="/" className="primary-action" onClick={(event) => event.preventDefault()}>
            Placeholder Registration Button
            <FiArrowRight />
          </a>
        </section>
      </main>
    </div>
  )
}

export default App
