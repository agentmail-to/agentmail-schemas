import { z } from 'zod'

import { ClientIdSchema } from './clientId.js'

export const DomainStringSchema = z
    .string()
    .toLowerCase()
    .regex(/^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63})+$/, 'Invalid domain format')
    .min(1, 'Domain cannot be empty')

export const DomainSchema = z.object({
    pod_id: z.uuid().optional(),
    domain_id: DomainStringSchema,
    client_id: ClientIdSchema.optional(),
    feedback_enabled: z.boolean(),
    dkim_signing_type: z.enum(['AWS_SES', 'BYODKIM']).default('AWS_SES'), // TODO: Rename to dkim_type and make required
    dkim_selector: z.string().optional(),
    status: z.enum(['NOT_STARTED', 'PENDING', 'INVALID', 'VERIFYING', 'VERIFIED', 'FAILED']),
    updated_at: z.iso.datetime(),
    created_at: z.iso.datetime(),
})

export type Domain = z.infer<typeof DomainSchema>
