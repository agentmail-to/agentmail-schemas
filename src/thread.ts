import { z } from 'zod'

import { AttachmentSchema } from './attachment.js'
import { MessageSchema } from './message.js'

export const ThreadMetadataSchema = z.object({
    pod_id: z.uuid(),
    inbox_id: z.email(),
    thread_id: z.uuid(),
    labels: z.array(z.string()),
    timestamp: z.iso.datetime(),
    received_timestamp: z.iso.datetime().optional(),
    sent_timestamp: z.iso.datetime().optional(),
    senders: z.array(z.string()),
    recipients: z.array(z.string()),
    subject: z.string().optional(),
    preview: z.string().optional(),
    attachments: z.array(AttachmentSchema).optional(),
    last_message_id: z.string(),
    message_count: z.int(),
    size: z.int(),
    updated_at: z.iso.datetime(),
    created_at: z.iso.datetime(),
})

export const ThreadSchema = ThreadMetadataSchema.extend({ messages: z.array(MessageSchema) })

export type Thread = z.infer<typeof ThreadSchema>
