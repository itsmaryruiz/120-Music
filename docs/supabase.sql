-- 120 Worship · Sincronización entre dispositivos (Supabase)
-- Pegar completo en Supabase → SQL Editor → Run. Se puede volver a ejecutar sin problema.

-- Canciones, listas de servicio y datos de los documentos originales.
-- Cada fila es de un usuario; nadie más la puede ver (RLS).
create table if not exists public.items (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  kind text not null check (kind in ('song', 'setlist', 'file')),
  id text not null,
  data jsonb,
  deleted boolean not null default false,
  updated_at bigint not null default 0,
  server_at timestamptz not null default now(),
  primary key (user_id, kind, id)
);
create index if not exists items_user_server_at on public.items (user_id, server_at);

-- server_at marca cuándo llegó cada cambio, para que los otros dispositivos pidan solo lo nuevo.
create or replace function public.items_touch() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.server_at := clock_timestamp();
  return new;
end $$;
drop trigger if exists items_touch on public.items;
create trigger items_touch before insert or update on public.items
  for each row execute function public.items_touch();

alter table public.items enable row level security;
drop policy if exists "solo mis datos" on public.items;
create policy "solo mis datos" on public.items for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, update, delete on public.items to authenticated;
revoke all on public.items from anon;

-- Documentos originales (PDF, Word): carpeta privada por usuario, archivos/<usuario>/<id>
insert into storage.buckets (id, name, public) values ('files', 'files', false)
  on conflict (id) do nothing;

drop policy if exists "mis documentos: ver" on storage.objects;
drop policy if exists "mis documentos: subir" on storage.objects;
drop policy if exists "mis documentos: cambiar" on storage.objects;
drop policy if exists "mis documentos: borrar" on storage.objects;
create policy "mis documentos: ver" on storage.objects for select to authenticated
  using (bucket_id = 'files' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "mis documentos: subir" on storage.objects for insert to authenticated
  with check (bucket_id = 'files' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "mis documentos: cambiar" on storage.objects for update to authenticated
  using (bucket_id = 'files' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "mis documentos: borrar" on storage.objects for delete to authenticated
  using (bucket_id = 'files' and (storage.foldername(name))[1] = auth.uid()::text);
