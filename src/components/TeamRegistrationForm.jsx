import { useEffect, useState } from 'react'

const maxPlayers = 3

const emptyPlayer = () => ({
  full_name: '',
  email: '',
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(form) {
  const errors = {}

  if (!form.teamName.trim()) {
    errors.teamName = 'Team name is required.'
  }

  if (!form.organizationId) {
    errors.organizationId = 'Please choose an organization.'
  }

  const playerErrors = form.players.map((player, index) => {
    const nextError = {}

    if (!player.full_name.trim()) {
      nextError.full_name = `Player ${index + 1} full name is required.`
    }

    if (!player.email.trim()) {
      nextError.email = `Player ${index + 1} email is required.`
    } else if (!emailPattern.test(player.email.trim())) {
      nextError.email = `Player ${index + 1} email must be valid.`
    }

    return nextError
  })

  const normalizedEmails = form.players.map((player) => player.email.trim().toLowerCase())

  normalizedEmails.forEach((email, index) => {
    if (!email) {
      return
    }

    if (normalizedEmails.indexOf(email) !== index) {
      playerErrors[index].email = `Player ${index + 1} email must be unique in this team.`
    }
  })

  if (playerErrors.some((entry) => Object.keys(entry).length > 0)) {
    errors.players = playerErrors
  }

  return errors
}

export default function TeamRegistrationForm({ supabase }) {
  const [organizations, setOrganizations] = useState([])
  const [form, setForm] = useState({
    teamName: '',
    organizationId: '',
    players: [emptyPlayer()],
  })
  const [errors, setErrors] = useState({})
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    let isMounted = true

    async function loadOrganizations() {
      if (!supabase) {
        if (isMounted) {
          setIsLoadingOrganizations(false)
          setStatus({
            type: 'error',
            message: 'Supabase client is not configured yet.',
          })
        }
        return
      }

      setIsLoadingOrganizations(true)

      const { data, error } = await supabase
        .from('organizations')
        .select('id, name')
        .order('name', { ascending: true })

      if (!isMounted) {
        return
      }

      if (error) {
        setStatus({
          type: 'error',
          message: error.message || 'Unable to load organizations.',
        })
        setOrganizations([])
      } else {
        setOrganizations(
          (data ?? []).sort((a, b) => {
            if (a.name.toLowerCase() === 'others') return 1
            if (b.name.toLowerCase() === 'others') return -1
            return 0  // already sorted by Supabase, no need to re-sort the rest
          })
        )
      }

      setIsLoadingOrganizations(false)
    }

    loadOrganizations()

    return () => {
      isMounted = false
    }
  }, [supabase])

  function updatePlayer(index, field, value) {
    setForm((current) => ({
      ...current,
      players: current.players.map((player, playerIndex) =>
        playerIndex === index ? { ...player, [field]: value } : player,
      ),
    }))
  }

  function addPlayer() {
    setForm((current) => {
      if (current.players.length >= maxPlayers) {
        return current
      }

      return {
        ...current,
        players: [...current.players, emptyPlayer()],
      }
    })
  }

  function removePlayer(index) {
    setForm((current) => ({
      ...current,
      players: current.players.filter((_, playerIndex) => playerIndex !== index),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    setStatus({ type: '', message: '' })

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: 'error',
        message: 'Please fix the highlighted fields and try again.',
      })
      return
    }

    if (!supabase) {
      setStatus({
        type: 'error',
        message: 'Supabase client is not configured yet.',
      })
      return
    }

    setIsSubmitting(true)

    const payload = {
      p_team_name: form.teamName.trim(),
      p_organization_id: form.organizationId,
      p_players: form.players.map((player) => ({
        full_name: player.full_name.trim(),
        email: player.email.trim().toLowerCase(),
      })),
    }

    const { error } = await supabase.rpc('register_team', payload)

    if (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Registration failed.',
      })
      setIsSubmitting(false)
      return
    }

    setStatus({
      type: 'success',
      message: 'Team registration completed successfully.',
    })
    setErrors({})
    setForm({
      teamName: '',
      organizationId: '',
      players: [emptyPlayer()],
    })
    setIsSubmitting(false)
  }

  return (
    <section className="registration-shell" aria-labelledby="registration-heading">
      <div className="registration-header">
        <p className="eyebrow">Registration</p>
        <h2 id="registration-heading">Register your team</h2>
        <p>
          Player 1 becomes the team leader automatically when the form is
          submitted.
        </p>
      </div>

      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <div className="registration-grid">
          <div className="field-group">
            <label htmlFor="team-name">Team Name</label>
            <input
              id="team-name"
              name="teamName"
              type="text"
              value={form.teamName}
              onChange={(event) =>
                setForm((current) => ({ ...current, teamName: event.target.value }))
              }
              aria-invalid={Boolean(errors.teamName)}
              aria-describedby={errors.teamName ? 'team-name-error' : undefined}
            />
            {errors.teamName ? (
              <span id="team-name-error" className="field-error">
                {errors.teamName}
              </span>
            ) : null}
          </div>

          <div className="field-group">
            <label htmlFor="organization">Organization</label>
            <select
              id="organization"
              name="organizationId"
              value={form.organizationId}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  organizationId: event.target.value,
                }))
              }
              disabled={isLoadingOrganizations}
              aria-invalid={Boolean(errors.organizationId)}
              aria-describedby={errors.organizationId ? 'organization-error' : undefined}
            >
              <option value="">
                {isLoadingOrganizations ? 'Loading organizations...' : 'Select an organization'}
              </option>
              {organizations.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
            </select>
            {errors.organizationId ? (
              <span id="organization-error" className="field-error">
                {errors.organizationId}
              </span>
            ) : null}
          </div>
        </div>

        <div className="players-stack">
          {form.players.map((player, index) => {
            const playerError = errors.players?.[index] ?? {}
            const isLeader = index === 0

            return (
              <article key={`player-${index + 1}`} className="player-card">
                <div className="player-card-header">
                  <div>
                    <h3>Player {index + 1}</h3>
                    {isLeader ? <span className="player-label">Leader</span> : null}
                  </div>

                  {!isLeader ? (
                    <button
                      type="button"
                      className="action-button is-danger"
                      onClick={() => removePlayer(index)}
                    >
                      Remove player
                    </button>
                  ) : null}
                </div>

                <div className="registration-grid">
                  <div className="field-group">
                    <label htmlFor={`player-${index + 1}-full-name`}>Full Name</label>
                    <input
                      id={`player-${index + 1}-full-name`}
                      type="text"
                      value={player.full_name}
                      onChange={(event) =>
                        updatePlayer(index, 'full_name', event.target.value)
                      }
                      aria-invalid={Boolean(playerError.full_name)}
                    />
                    {playerError.full_name ? (
                      <span className="field-error">{playerError.full_name}</span>
                    ) : null}
                  </div>

                  <div className="field-group">
                    <label htmlFor={`player-${index + 1}-email`}>Email</label>
                    <input
                      id={`player-${index + 1}-email`}
                      type="email"
                      inputMode="email"
                      value={player.email}
                      onChange={(event) => updatePlayer(index, 'email', event.target.value)}
                      aria-invalid={Boolean(playerError.email)}
                    />
                    {playerError.email ? (
                      <span className="field-error">{playerError.email}</span>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="registration-actions">
          <button
            type="button"
            className="action-button"
            onClick={addPlayer}
            disabled={form.players.length >= maxPlayers || isSubmitting}
          >
            + Add Player
          </button>
          <span className="registration-help">
            {form.players.length} / {maxPlayers} players added
          </span>
        </div>

        {status.message ? (
          <div
            className={
              status.type === 'success'
                ? 'status-banner is-success'
                : 'status-banner is-error'
            }
            role="status"
          >
            {status.message}
          </div>
        ) : null}

        <div className="registration-footer">
          <button type="submit" className="primary-action" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Submit Registration'}
          </button>
        </div>
      </form>
    </section>
  )
}
