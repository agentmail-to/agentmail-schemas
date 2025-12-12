import { z } from 'zod'

import { AttachmentSchema } from './attachment.js'

export const MessageSchema = z.object({
    pod_id: z.uuid(),
    inbox_id: z.email(),
    thread_id: z.uuid(),
    message_id: z.string(),
    labels: z.array(z.string()),
    timestamp: z.iso.datetime(),
    from: z.string(),
    reply_to: z.array(z.string()).optional(),
    to: z.array(z.string()).optional(),
    cc: z.array(z.string()).optional(),
    bcc: z.array(z.string()).optional(),
    subject: z.string().optional(),
    preview: z.string().optional(),
    text: z.string().optional(),
    html: z.string().optional(),
    extracted_text: z.string().optional(),
    extracted_html: z.string().optional(),
    attachments: z.array(AttachmentSchema).optional(),
    in_reply_to: z.string().optional(),
    references: z.array(z.string()).optional(),
    size: z.int(),
    updated_at: z.iso.datetime(),
    created_at: z.iso.datetime(),
})

export type Message = z.infer<typeof MessageSchema>
