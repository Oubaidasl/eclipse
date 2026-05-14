import { Link } from 'react-router-dom'
import organizerLogo from '../assets/CB-logo.png'
import { FiArrowLeft, FiArrowRight, FiMapPin, FiClock, FiShield, FiCalendar, FiLock } from 'react-icons/fi'

export default function RegistrationPage() {
  return (
    <div className="page-shell registration-page-shell">

      {/* Watermark — same as LandingPage */}
      <div className="site-watermark" aria-hidden="true">
        <img src={organizerLogo} alt="" className="site-watermark-logo" />
        <div className="site-watermark-copy">
          <span>Organized by:</span>
          <strong>Club CyberGuardians ENSATE</strong>
        </div>
      </div>

      <main className="registration-page">

        {/* Back button header */}
        <header className="registration-page-header">
          <Link to="/" className="secondary-action">
            <FiArrowLeft className="back-arrow" />
            Back To Event
          </Link>
          <div className="registration-page-copy">
            <p className="eyebrow">Team Registration</p>
            <h1>Register your team</h1>
            <p>
              Online registration is now closed. See below for how to still join.
            </p>
          </div>
        </header>

        {/* Main card — same structure as TeamRegistrationForm */}
        <div className="reg-form-card">

          {/* Closed badge */}
          <div className="reg-closed-badge">
            <span className="reg-closed-dot" />
            Registration Closed
          </div>

          <p className="eyebrow">Registration</p>
          <h2 className="reg-card-title">Register your team</h2>
          <p className="reg-card-sub">
            Player 1 becomes the team leader automatically when the form is submitted.
          </p>

          {/* Expired message box */}
          <div className="reg-expired-box">
            <div className="reg-expired-icon">
              <FiLock size={26} />
            </div>
            <h3 className="reg-expired-title">Online Registration Has Expired</h3>
            <p className="reg-expired-body">
              The online registration window for Eclipse is now closed.
              <br />
              But don't worry — you can still join the CTF competition!
            </p>
            <div className="reg-expired-callout">
              <p className="reg-expired-callout-label">Come in person to</p>
              <p className="reg-expired-callout-venue">ENSA Tetouan</p>
              <p className="reg-expired-callout-time">10:30 PM</p>
              <p className="reg-expired-callout-label">to register on-site and play</p>
            </div>
          </div>

          {/* Info grid */}
          <div className="reg-info-grid">
            <div className="reg-info-box">
              <span className="reg-info-label">Location</span>
              <span className="reg-info-value">
                <FiMapPin />
                ENSA Tetouan
              </span>
            </div>
            <div className="reg-info-box">
              <span className="reg-info-label">Check-in Time</span>
              <span className="reg-info-value">
                <FiClock />
                10:30 PM
              </span>
            </div>
            <div className="reg-info-box">
              <span className="reg-info-label">Event</span>
              <span className="reg-info-value">
                <FiShield />
                Eclipse CTF Night
              </span>
            </div>
            <div className="reg-info-box">
              <span className="reg-info-label">Date</span>
              <span className="reg-info-value">
                <FiCalendar />
                15 May 2026
              </span>
            </div>
          </div>

          <hr className="reg-divider" />

          {/* CTA row */}
          <div className="reg-cta-row">
            <div>
              <h4 className="reg-cta-title">Still want to compete?</h4>
              <p className="reg-cta-sub">
                Show up at ENSA Tetouan tonight at 10:30 PM.<br />
                Bring your team and register at the door.
              </p>
            </div>
            <Link to="/#agenda" className="primary-action">
              View Schedule
              <FiArrowRight />
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}