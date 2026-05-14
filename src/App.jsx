import { useMemo, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import organizerLogo from './assets/CB-logo.png'
import heroBackgroundVideo from './assets/pics/Hacker_s_Digital_Eclipse_Video_Generation.mp4'
import antonioImage from './assets/pics/Antonio Gil.png'
import conchiImage from './assets/pics/Conchi Gordon.png'
import enriqueImage from './assets/pics/Enrique Rando.png'
import franciscoImage from './assets/pics/Francisco Gonzalez.png'
import raulMesaImage from './assets/pics/Raul Mesa.png'
import brunoImage from './assets/pics/bruno_fernandez.png'
import ridaImage from './assets/pics/rida_lkhulf.png'
import kamalImage from './assets/pics/kamal reklaoui.jpg'
import yahyaImage from './assets/pics/Yahya mohamed.png'
import ahmedImage from './assets/pics/el aroui ahmed.png'
import mamadoImage from './assets/pics/mamado colibali.png'
import wataraImage from './assets/pics/watara lamine.png'
import sponsor1Image from './assets/sponsor1.jpeg'
import xlinx from './assets/xlinx.jpeg'
import sponsor2Image from './assets/sponsor2.png'
import sponsor3Image from './assets/CMO logo.jpg'
import cybercin from './assets/cybercin.jpeg'
import oca from './assets/oca.jpeg'
import malaga from './assets/malaga.jpeg'
import softcom from './assets/softcom.jpeg'
import c from './assets/c.jpg'
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
    date: '14 May 2026',
    focus: 'Conferences & Workshops (Salle du Barreau de Tétouan)',
    items: [
      { time: '10:00', title: 'Opening Session', meta: 'Opening words & speeches by VIPs and Partners' },
      { time: '11:00', title: 'Investment Session', meta: 'Francisco González, Raúl Mesa, Toufik Airane' },
      { time: '12:30', title: 'Coffee Break', meta: 'Networking with participants' },
      { time: '13:00', title: 'Information Session', meta: 'Conchi Gordon, Antonio Gil, Bruno Fernández, Samira Khouliji' },
      { time: '15:30', title: 'Ending of Day 1', meta: 'Conferences wrap-up' },
    ],
  },
  {
    id: 'day-2',
    label: 'Day 2',
    date: '15 May 2026',
    focus: 'CTF Competition (ENSA Tetouan)',
    items: [
      { time: '22:30', title: 'Welcoming Participants', meta: 'Opening words & explanation of the rules' },
      { time: '00:00', title: 'Hacking Night', meta: 'Think, exploit and break to win' },
      { time: '10:00', title: 'Breakfast Break', meta: 'Morning recharge' },
      { time: '10:30', title: 'The End!', meta: 'Competition concludes' },
      { time: '11:30', title: 'Awards Ceremony & Closing Remarks', meta: 'Recognition and prizes' },
    ],
  },
]

const speakers = [
  {
    name: 'Rida Lkhluf',
    role: 'Dr. en ciberseguridad y CEO Cybercrin',
    organization: 'Cybercrin, Universidad de Malaga',
    image: ridaImage,
  },
  {
    name: 'Kamal Reklaoui',
    role: 'Director de ENSA',
    organization: 'Abdelmalek Essaadi',
    image: kamalImage,
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
    image: brunoImage,
  },
  {
    name: 'Enrique Rando',
    role: 'Consejero tecnico',
    organization: 'Junta de Andalucia',
    image: enriqueImage,
  },
  {
    name: 'Raul Mesa',
    role: 'Jefe de area',
    organization: 'Oca Global',
    image: raulMesaImage,
  },
  {
    name: 'Antonio Gil',
    role: 'Director general',
    organization: 'Softcom',
    image: antonioImage,
  },
  {
    name: 'Conchi Gordon',
    role: 'Jefa de proyectos',
    organization: 'Hispasec',
    image: conchiImage,
  },
  {
    name: 'Francisco Gonzalez',
    role: 'Director de departamento de tecnologia electronica y telecomunicaciones',
    organization: 'Universidad de Malaga',
    image: franciscoImage,
  },
  {
    name: 'Watara Lamine',
    role: 'Ambassadeur',
    organization: "Cote d'Ivoire",
    image: wataraImage,
  },
  {
    name: 'Mamado Colibali',
    role: 'Ambassadeur',
    organization: 'Burkina Faso',
    image: mamadoImage,
  },
  {
    name: 'Yahya Mohamed Lyassa',
    role: 'Ambassadeur',
    organization: 'Iles Comore',
    image: yahyaImage,
  },
  {
    name: 'Al Aroui Ahmed',
    role: 'Director general',
    organization: 'SDK',
    image: ahmedImage,
  },
]

const prizeTiers = [
  {
    place: '1st Place',
    amount: '3 laptops',
    detail: 'Main event champion reward',
  },
  {
    place: '2nd Place',
    amount: '3 tablets',
    detail: 'Runner-up team reward',
  },
  {
    place: '3rd Place',
    amount: '3 smart watches',
    detail: 'Podium team reward',
  },
]

const statCards = [
  { label: 'Attendees', value: '250+' },
  { label: 'Qualified Teams', value: '32' },
  { label: 'Challenge Tracks', value: '8' },
  { label: 'Prize Pool', value: 'TBA' },
]

const sponsors = [
  {
    name: 'Union Change',
    type: 'image',
    src: sponsor2Image,
    className: 'is-rotated',
  },
  {
    name: 'NetSecIT',
    type: 'image',
    src: sponsor1Image,
  },
  // {
  //   name: 'Club Marketing Oujda',
  //   type: 'image',
  //   src: sponsor3Image,
  // },
  {
    name: 'XLinx',
    type: 'image',
    src: xlinx,
  },
]

const partners = [
  {
    name: 'CyberCrin',
    type: 'image',
    src: cybercin,
  },
  {
    name: 'OCA Global',
    type: 'image',
    src: oca,
    className: 'is-rotated',
  },
  {
    name: 'Uiversidad de Malaga',
    type: 'image',
    src: malaga,
    className: 'is-rotated',
  },
  {
    name: 'Softcom',
    type: 'image',
    src: softcom,
    className: 'is-rotated',
  },
  {
    name: 'C',
    type: 'image',
    src: c,
    className: 'is-rotated',
  },
]

const faqItems = [
  {
    question: 'Who is this event for?',
    answer:
      'Students, builders, and security enthusiasts. Ask your self, are you interested in cybersecurity? Do you want to learn, compete, and connect with others in the field? Then this event is for you.',
  },
  {
    question: 'Will there be a live CTF?',
    answer:
      'Yes! The CTF competition will be held in person on 15 May at ENSA Tetouan. All registered teams can participate directly — no qualification required.',
  },
  {
    question: 'Can I join as a solo player or team?',
    answer:
      'Yes, just create a team of 1 player.',
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
      <div className="site-watermark" aria-hidden="true">
        <img
          src={organizerLogo}
          alt=""
          className="site-watermark-logo"
        />
        <div className="site-watermark-copy">
          <span>Organized by:</span>
          <strong>Club CyberGuardians ENSATE</strong>
        </div>
      </div>
      <main>
        <section className="hero-section">
          <div className="hero-video-stage">
            <video
              className="hero-bg-video"
              src={heroBackgroundVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="hero-background-overlay" />
            
            <div className="hero-center-logo">
              <div className="hero-logo-wrapper">
                <img src="/cg-logo.jpeg" alt="Cyber Guardians Logo" className="hero-main-logo" />
              </div>
            </div>

            <header className="site-header hero-header">
              <div className="brand-lockup">
                <img
                  src="/cg-logo.jpeg"
                  alt="Cyber Guardians logo"
                  className="brand-logo"
                />
                <div>
                  <p className="eyebrow">Spain-Morocco Forum of Cybersecurity & AI</p>
                  <h1 className="brand-title">Eclipse</h1>
                </div>
              </div>

              <nav className="site-nav" aria-label="Primary">
                <a href="#about">About</a>
                <a href="#agenda">Agenda</a>
                <a href="#rewards">Prizes</a>
                <a href="#faq">FAQ</a>
              </nav>
            </header>
          </div>

          {/* <div className="hero-copy">
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
            </div>

            <div className="hero-actions">
              <Link to="/register" className="primary-action">
                Register Your Team
                <FiArrowRight />
              </Link>
              <a href="#agenda" className="secondary-action">
                Explore Program
              </a>
            </div>
          </div> */}

        </section>

        

        {/* <section className="stats-section">
          {statCards.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section> */}

        <section id="about" className="content-section" >
          {/* <div className="section-copy">
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
          </div> */}

          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Spain-Morocco Forum</p>
            <h2>
              The Premier Event for Cybersecurity and AI Collaboration
            </h2>
            <p className="hero-description">
              Join industry leaders, experts, and security enthusiasts from Spain and Morocco for an immersive experience. Explore the future of Artificial Intelligence and Cybersecurity through expert conferences, hands-on workshops, and a thrilling Capture The Flag (CTF) competition.
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
            </div>

            <div className="hero-actions">
              <Link to="/register" className="primary-action">
                Register Your Team
                <FiArrowRight />
              </Link>
              <a href="#agenda" className="secondary-action">
                Explore Program
              </a>
            </div>
          </div>

        </section>

        <section className="content-section sponsors-section">
          <div className="section-heading">
            <p className="eyebrow">Sponsors</p>
            <h3>Our sponsors</h3>
          </div>

          <div className="sponsor-grid">
            <div className="infinite-slider-track">
              {/* Duplicate array for seamless infinite scroll */}
              {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                <article key={`${sponsor.name}-${index}`} className="sponsor-card">
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
            <h3>Our partners</h3>
          </div>

          <div className="partner-grid">
            <div className="infinite-slider-track">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <article key={`${partner.name}-${index}`} className="sponsor-card">
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
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Speakers</p>
            <h3>Explore Our lineup of industry experts</h3>
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
            <h3>Explore Our Event Schedule</h3>
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

        {/* <section id="ctf" className="content-section two-column-section">
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
        </section> */}

        <section id='rewards' className="content-section">
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
          <h3>Ready to Compete? Register your team now</h3>
          {/* <p>
            Team name, organization, and player details are collected on a
            separate screen and submitted through the `register_team` RPC.
          </p> */}
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
      <div className="site-watermark" aria-hidden="true">
        <img
          src={organizerLogo}
          alt=""
          className="site-watermark-logo"
        />
        <div className="site-watermark-copy">
          <span>Organized by:</span>
          <strong>Club CyberGuardians ENSATE</strong>
        </div>
      </div>
      <main className="registration-page">
        {/* <header className="registration-page-header">
          <Link to="/" className="secondary-action">
            <FiArrowRight className="back-arrow" />
            Back To Event
          </Link>
          <div className="registration-page-copy">
            <p className="eyebrow">Team Registration</p>
            <h1>Register your team</h1>
            <p>
              Fill in your team details, choose the organization, and add up to
              three players. Player 1 is saved as the team leader.
            </p>
          </div>
        </header> */}

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