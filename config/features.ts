export const isEnabled = (name: string): boolean =>
  /^(true|1|yes|on)$/i.test(String(process.env[name] ?? ''));

export const features = {
  auth: isEnabled('ENABLE_AUTH'),
  supabase: isEnabled('ENABLE_SUPABASE'),
  resend: isEnabled('ENABLE_RESEND'),
  openai: isEnabled('ENABLE_OPENAI'),
  polar: isEnabled('ENABLE_POLAR'),
  maintenance: isEnabled('NEXT_PUBLIC_MAINTENANCE_MODE'),
};
