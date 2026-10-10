/**
 * Legal identity used by Terms, Partner Terms and the Privacy Policy.
 *
 * Kept in one place so the operator name/address can't drift between pages
 * (the address was previously typed out only in PrivacyPolicy.tsx §13).
 *
 * Grievance Officer: the IT Rules 2011, the Consumer Protection (E-Commerce)
 * Rules 2020 and the DPDP Act 2023 expect a named grievance contact. No person
 * has been designated yet, so `grievanceOfficerName` is null and the pages
 * fall back to the role title. TODO(owner): set a real name here.
 */
export const LEGAL = {
  entityName: 'Keplix Private Limited',
  addressLines: ['9/2659, Kailash Nagar, Gandhi Nagar', 'Delhi, 110031', 'India'],
  grievanceOfficerName: null as string | null,
  grievanceEmail: 'privacy@keplix.co.in',
  /** Acknowledge within 48 hours, resolve within 30 days (E-Commerce Rules 2020, r.4(5)). */
  grievanceAckHours: 48,
  grievanceResolveDays: 30,
} as const;
