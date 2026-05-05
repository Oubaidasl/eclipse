import { useMemo, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import heroBackgroundVideo from './assets/vidBackground.mp4'
import raulMesaImage from './assets/pics/Screenshot 2026-05-05 153602.png'
import sponsor1Image from './assets/sponsor1.jpeg'
import sponsor2Image from './assets/sponsor2.png'
import TeamRegistrationForm from './components/TeamRegistrationForm'
import { supabase } from './lib/supabase'
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiHelpCircle,
  FiMapPin,
  FiShield,
  FiTarget,
  FiUsers,
} from 'react-icons/fi'

const eventDays = [
  {
    id: 'day-1',
    label: 'Day 1',
    date: '09 May 2026',
    focus: 'Opening day with keynote, conference sessions, workshops, and the CTF briefing.',
    items: [
      { time: '08:30', title: 'Accueil & Check-in', meta: 'Arrival window' },
      { time: '09:30', title: 'Opening Keynote', meta: 'Main stage' },
      { time: '11:00 - 15:00', title: 'Conference Start to End', meta: 'Conference sessions' },
      { time: '16:00', title: 'Hands-on Workshops', meta: 'Workshop block' },
      { time: '18:00', title: 'Briefing CTF & Ending', meta: 'Day 1 close' },
    ],
  },
  {
    id: 'day-2',
    label: 'Day 2',
    date: '10 May 2026',
    focus: 'Competition day with the live CTF, closing ceremony, awards, and event wrap-up.',
    items: [
      { time: '09:30', title: 'CTF & Rules', meta: 'Competition briefing' },
      { time: '10:30 - 16:30', title: 'CTF Starting and Ending', meta: 'Live competition window' },
      { time: '17:00', title: 'Closing Ceremony', meta: 'Main stage' },
      { time: '18:00', title: 'Awards Ceremony', meta: 'Recognition and prizes' },
      { time: '19:00', title: 'The End!', meta: 'Event close' },
    ],
  },
]

const speakers = [
  {
    name: 'Rida Lkhluf',
    role: 'Dr. en ciberseguridad y CEO Cybercrin',
    organization: 'Cybercrin, Universidad de Malaga',
  },
  {
    name: 'Kamal Reklaui',
    role: 'Director de ENSA',
    organization: 'Abdelmalek Essaadi',
  },
  {
    name: 'Hamid Aboulas',
    role: 'Catedratico en derecho',
    organization: 'Abdelmalek Essaadi',
  },
  {
    name: 'Bruno Fernandez',
    role: 'Director general',
    organization: 'Asac comunicaciones',
  },
  {
    name: 'Enrique Rando',
    role: 'Consejero tecnico',
    organization: 'Junta de Andalucia',
  },
  {
    name: 'Raul Mesa',
    role: 'Jefe de area',
    organization: 'Oca Global',
    image: raulMesaImage,
    featured: true,
  },
  {
    name: 'Antonio Gil',
    role: 'Director general',
    organization: 'Softcom',
  },
  {
    name: 'Conchi Gordon',
    role: 'Jefa de proyectos',
    organization: 'Hispasec',
  },
  {
    name: 'Francisco Gonzalez',
    role: 'Director de departamento de tecnologia electronica y telecomunicaciones',
    organization: 'Universidad de Malaga',
  },
  {
    name: 'Watara Lamine',
    role: 'Ambassadeur',
    organization: "Cote d'Ivoire",
  },
  {
    name: 'Mamado Colibali',
    role: 'Ambassadeur',
    organization: 'Burkina Faso',
  },
  {
    name: 'Yahya Mohamed Lyassa',
    role: 'Ambassadeur',
    organization: 'Iles Comore',
  },
  {
    name: 'Al Aroui Ahmed',
    role: 'Director general',
    organization: 'SDK',
  },
]

const prizeTiers = [
  {
    place: '1st Place',
    amount: 'TBA',
    detail: 'Main event champion reward',
  },
  {
    place: '2nd Place',
    amount: 'TBA',
    detail: 'Runner-up team reward',
  },
  {
    place: '3rd Place',
    amount: 'TBA',
    detail: 'Podium team reward',
  },
]

// const statCards = [
//   { label: 'Attendees', value: '250+' },
//   { label: 'Qualified Teams', value: '32' },
//   { label: 'Challenge Tracks', value: '8' },
//   { label: 'Prize Pool', value: 'TBA' },
// ]

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

const partners = [
  {
    name: 'Partner 1',
    type: 'image',
    src: sponsor1Image,
  },
  {
    name: 'Partner 2',
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

function SpeakerInitials({ name }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return <div className="speaker-avatar" aria-hidden="true">{initials}</div>
}

function LandingPage() {
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
                <span>MAY 2026</span>
              </div>
              <div>
                <FiMapPin />
                <span>ENSA tetouan</span>
              </div>
              <div>
                <FiUsers />
                <span>Registration CTA Ready</span>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/register" className="primary-action">
                Register Interest
                <FiArrowRight />
              </Link>
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
            <h3>Forum speakers and invited figures</h3>
          </div>

          <div className="speaker-grid">
            {speakers.map((speaker) => (
              <article
                key={speaker.name}
                className={speaker.featured ? 'speaker-card speaker-card-featured' : 'speaker-card'}
              >
                {speaker.image ? (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className={speaker.featured ? 'speaker-photo speaker-photo-featured' : 'speaker-photo'}
                  />
                ) : (
                  <SpeakerInitials name={speaker.name} />
                )}
                <div className="speaker-copy">
                  <h4>{speaker.name}</h4>
                  <p>{speaker.role}</p>
                  <span>{speaker.organization}</span>
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
            <Link to="/register" className="secondary-action inline-action">
              Add CTF Signup Link Later
            </Link>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Prizes</p>
            <h3>Rewards for the top three teams</h3>
          </div>

          <div className="prize-grid">
            {prizeTiers.map((prize) => (
              <article key={prize.place} className="prize-card">
                <span className="prize-place">{prize.place}</span>
                <strong className="prize-amount">{prize.amount}</strong>
                <p className="prize-detail">{prize.detail}</p>
              </article>
            ))}
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
            <h3>Current sponsors</h3>
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

          {/* <div className="organizer-grid">
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
          </div> */}
        </section>

        <section className="content-section partners-section">
          <div className="section-heading">
            <p className="eyebrow">Partners</p>
            <h3>Current partners</h3>
          </div>

          <div className="partner-grid">
            {partners.map((partner) => (
              <article key={partner.name} className="sponsor-card">
                <div className="sponsor-media">
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className={`sponsor-image ${partner.className ?? ''}`.trim()}
                  />
                </div>
                <div className="sponsor-copy">
                  <h4>{partner.name}</h4>
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
          <h3>The main CTA now opens a dedicated registration page for teams.</h3>
          <p>
            Team name, organization, and player details are collected on a
            separate screen and submitted through the `register_team` RPC.
          </p>
          <Link to="/register" className="primary-action">
            Open Team Registration
            <FiArrowRight />
          </Link>
        </section>
      </main>
    </div>
  )
}

function RegistrationPage() {
  return (
    <div className="page-shell registration-page-shell">
      <main className="registration-page">
        <header className="registration-page-header">
          <Link to="/" className="secondary-action">
            <FiArrowRight className="back-arrow" />
            Back To Event
          </Link>
          <div className="registration-page-copy">
            <p className="eyebrow">Team Registration</p>
            <h1>Register your Cyber Guardians team</h1>
            <p>
              Fill in your team details, choose the organization, and add up to
              three players. Player 1 is saved as the team leader.
            </p>
          </div>
        </header>

        <TeamRegistrationForm supabase={supabase} />
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  )
}

export default App