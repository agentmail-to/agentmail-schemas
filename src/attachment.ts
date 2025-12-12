import { z } from 'zod'

export const AttachmentSchema = z.object({
    attachment_id: z.uuid(),
    filename: z.string(),
    content_type: z.string(),
    size: z.int(),
    inline: z.boolean(),
})

export type Attachment = z.infer<typeof AttachmentSchema>
