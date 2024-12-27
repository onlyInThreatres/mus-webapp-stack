import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Define types for schema objects
interface TableDefinition {
  name: string
  schema: string
  columns: Array<{
    name: string
    type: string
  }>
}

interface SchemaDefinition {
  tables?: TableDefinition[]
  policies?: Array<{
    name: string
    table: string
    definition: string
  }>
}

async function checkSchemaDiff() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  console.log('🔍 Checking schema differences...')

  // Get current schema from production
  const { data: prodSchema, error } = await supabase
    .rpc('get_schema_definition') as { data: SchemaDefinition | null, error: any }

  if (error) {
    console.error('🔴 Failed to fetch production schema:', error)
    process.exit(1)
  }

  // Read local schema file
  const localSchemaPath = path.join(__dirname, '../supabase/migrations/20240227000000_initial_schema.sql')
  const localSchema = fs.readFileSync(localSchemaPath, 'utf8')

  // Compare schemas (basic diff)
  console.log('📊 Schema Comparison:')
  console.log('Production tables:', prodSchema?.tables?.length)
  console.log('Production policies:', prodSchema?.policies?.length)

  // Log any missing tables or policies
  const missingTables = prodSchema?.tables?.filter(
    (table: TableDefinition) => !localSchema.includes(`CREATE TABLE ${table.name}`)
  )

  if (missingTables?.length) {
    console.warn('⚠️ Tables in production but not in local schema:', missingTables)
  }

  console.log('✅ Schema check complete')
}

checkSchemaDiff() 