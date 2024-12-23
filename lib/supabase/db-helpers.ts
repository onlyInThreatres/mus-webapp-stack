import { supabase } from './client'
import { Profile, ProfileInsert, AuditLogInsert } from '../types/supabase'
import { logger } from '../utils/logger'

/**
 * 🔒 Helper functions for database operations
 */
export const db = {
  /**
   * Create or update a user profile
   */
  async upsertProfile(profile: ProfileInsert): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profile)
        .select()
        .single()

      if (error) {
        throw error
      }

      logger.debug('Profile upserted:', data)
      return data
    } catch (err) {
      logger.error('Failed to upsert profile:', err)
      return null
    }
  },

  /**
   * Log an audit event
   */
  async logAudit(log: AuditLogInsert): Promise<void> {
    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert(log)

      if (error) {
        throw error
      }

      logger.debug('Audit log created:', log)
    } catch (err) {
      logger.error('Failed to create audit log:', err)
    }
  }
} 