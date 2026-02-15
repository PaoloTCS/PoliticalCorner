import { Pool, type QueryResultRow } from 'pg'

let pool: Pool | null = null
let schemaInitialized = false

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL)
}

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured')
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'disable' ? false : { rejectUnauthorized: false },
    })
  }

  return pool
}

export async function initializeDatabaseSchema() {
  if (!hasDatabase() || schemaInitialized) return

  const client = await getPool().connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        knowledge_score INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS usage_counters (
        key TEXT NOT NULL,
        date TEXT NOT NULL,
        count INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (key, date)
      );

      CREATE TABLE IF NOT EXISTS threads (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        query TEXT NOT NULL,
        classification TEXT NOT NULL,
        thesis TEXT NOT NULL,
        counter_thesis TEXT NOT NULL,
        synthesis TEXT NOT NULL,
        sources JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_by TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS philosophies (
        name TEXT PRIMARY KEY,
        source TEXT NOT NULL,
        by_continent JSONB NOT NULL
      );
    `)

    const { rows } = await client.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM philosophies')
    if ((rows[0]?.count || '0') === '0') {
      await client.query(`
        INSERT INTO philosophies (name, source, by_continent)
        VALUES
        ('Natural Rights', 'core', '{"Asia":"Democracy in Asia","Americas":"Democratic Systems","Europe":"Social Democracy","Africa":"Post-Colonial Rights"}'::jsonb),
        ('Classical Republicanism', 'core', '{"Asia":"Regional Cooperation","Americas":"Civic Participation","Europe":"EU Integration","Africa":"Pan-Africanism"}'::jsonb),
        ('Constitutionalism', 'core', '{"Asia":"Economic Development","Americas":"Economic Models","Europe":"Welfare States","Africa":"Development Models"}'::jsonb),
        ('Social Contract', 'core', '{"Asia":"Cultural Adaptation","Americas":"Social Justice","Europe":"Democratic Governance","Africa":"Sovereignty"}'::jsonb)
        ON CONFLICT (name) DO NOTHING;
      `)
    }

    schemaInitialized = true
  } finally {
    client.release()
  }
}

export async function dbQuery<T extends QueryResultRow = any>(text: string, params: any[] = []) {
  await initializeDatabaseSchema()
  return getPool().query<T>(text, params)
}
