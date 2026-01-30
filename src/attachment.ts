import { z } from 'zod'

export const AttachmentSchema = z.object({
    attachment_id: z.uuid(),
    filename: z.string().optional(),
    size: z.int(),
    content_type: z.string().optional(),
    content_disposition: z.enum(['inline', 'attachment']),
    content_id: z.string().optional(),
})

export type Attachment = z.infer<typeof AttachmentSchema>
