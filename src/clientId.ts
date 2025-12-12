import { z } from 'zod'

export const ClientIdSchema = z.string().regex(/^[A-Za-z0-9._~-]+$/, 'Client ID must contain only the following characters: A-Z a-z 0-9 - . _ ~')
