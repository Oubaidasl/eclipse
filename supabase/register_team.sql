create or replace function public.register_team(
  p_team_name text,
  p_organization_id uuid,
  p_players jsonb
)
returns jsonb
language plpgsql
set search_path = public
as $$
declare
  v_team_id uuid;
  v_leader_id uuid;
  v_player_id uuid;
  v_player jsonb;
  v_full_name text;
  v_email text;
  v_emails text[];
  v_player_ids uuid[] := '{}';
  v_index integer := 0;
  v_constraint text;
begin
  if coalesce(trim(p_team_name), '') = '' then
    raise exception 'Team name is required.';
  end if;

  if p_organization_id is null then
    raise exception 'Organization is required.';
  end if;

  if p_players is null or jsonb_typeof(p_players) <> 'array' then
    raise exception 'Players payload must be a JSON array.';
  end if;

  if jsonb_array_length(p_players) < 1 or jsonb_array_length(p_players) > 3 then
    raise exception 'You must register between 1 and 3 players.';
  end if;

  select array_agg(lower(trim(player.email)))
  into v_emails
  from jsonb_to_recordset(p_players) as player(full_name text, email text);

  if exists (
    select 1
    from unnest(v_emails) as email_value
    group by email_value
    having count(*) > 1
  ) then
    raise exception 'Duplicate player emails were provided in the registration payload.';
  end if;

  if exists (
    select 1
    from public.teams
    where name = trim(p_team_name)
  ) then
    raise exception 'A team with this name already exists.';
  end if;

  if exists (
    select 1
    from public.players
    where lower(email) = any(v_emails)
  ) then
    raise exception 'One or more player emails are already registered.';
  end if;

  insert into public.teams (name, organization_id, leader_id)
  values (trim(p_team_name), p_organization_id, null)
  returning id into v_team_id;

  for v_player in
    select value
    from jsonb_array_elements(p_players)
  loop
    v_index := v_index + 1;
    v_full_name := trim(coalesce(v_player ->> 'full_name', ''));
    v_email := lower(trim(coalesce(v_player ->> 'email', '')));

    if v_full_name = '' then
      raise exception 'Player % full name is required.', v_index;
    end if;

    if v_email = '' then
      raise exception 'Player % email is required.', v_index;
    end if;

    insert into public.players (full_name, email, team_id)
    values (v_full_name, v_email, v_team_id)
    returning id into v_player_id;

    v_player_ids := array_append(v_player_ids, v_player_id);

    if v_index = 1 then
      v_leader_id := v_player_id;
    end if;
  end loop;

  update public.teams
  set leader_id = v_leader_id
  where id = v_team_id;

  return jsonb_build_object(
    'team_id', v_team_id,
    'leader_id', v_leader_id,
    'player_ids', to_jsonb(v_player_ids)
  );
exception
  when unique_violation then
    get stacked diagnostics v_constraint = constraint_name;

    if v_constraint = 'teams_name_key' then
      raise exception 'A team with this name already exists.';
    elsif v_constraint = 'players_email_key' then
      raise exception 'One or more player emails are already registered.';
    else
      raise;
    end if;
end;
$$;
