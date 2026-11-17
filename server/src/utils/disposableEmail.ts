/**
 * List of known disposable / temporary email domains.
 * Blocks throwaway accounts from abusing the system.
 */
const DISPOSABLE_DOMAINS = new Set<string>([
  '10minutemail.com',
  '10minutemail.net',
  '10minutemail.org',
  '20minutemail.com',
  'armyspy.com',
  'burnermail.io',
  'cachedot.net',
  'crazymailing.com',
  'cuvox.de',
  'dayrep.com',
  'discard.email',
  'discardmail.com',
  'disposablemail.com',
  'dispostable.com',
  'einrot.com',
  'emailfake.com',
  'emailgenerator.net',
  'emailondeck.com',
  'fakemailgenerator.com',
  'fleckens.hu',
  'getairmail.com',
  'getnada.com',
  'grr.la',
  'guerrillamail.biz',
  'guerrillamail.com',
  'guerrillamail.de',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'gustr.com',
  'harakirimail.com',
  'inboxkitten.com',
  'inboxbear.com',
  'instantemailaddress.com',
  'jourrapide.com',
  'maildrop.cc',
  'mailcatch.com',
  'mailinator.com',
  'mailinator2.com',
  'mailnesia.com',
  'mailnull.com',
  'mohmal.com',
  'mytemp.email',
  'nada.ltd',
  'nada.email',
  'pokemail.net',
  'quickemail.info',
  'rhyta.com',
  'sharklasers.com',
  'superrito.com',
  'teleworm.us',
  'temp-mail.org',
  'temp-mail.ru',
  'tempail.com',
  'tempm.com',
  'tempmail.com',
  'tempmail.de',
  'tempmail.net',
  'tempmailaddress.com',
  'tempmailbox.net',
  'throwawaymail.com',
  'trashmail.com',
  'trashmail.net',
  'trashmail.org',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'zippymail.info',
]);

/**
 * Checks if the given email is a disposable/temp email.
 */
export const isDisposableEmail = (email: string): boolean => {
  if (!email || !email.includes('@')) return false;

  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) return false;

  // Direct match
  if (DISPOSABLE_DOMAINS.has(domain)) return true;

  // Subdomain match (e.g. *.mailinator.com)
  for (const blocked of DISPOSABLE_DOMAINS) {
    if (domain.endsWith('.' + blocked)) return true;
  }

  // Keywords in domain commonly used by temp services
  const suspiciousKeywords = ['tempmail', 'disposable', 'throwaway', 'fakeinbox', 'guerrillamail', '10minute'];
  if (suspiciousKeywords.some((kw) => domain.includes(kw))) {
    return true;
  }

  return false;
};
