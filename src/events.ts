import { z } from 'zod'

import { MessageSchema } from './message.js'
import { ThreadMetadataSchema } from './thread.js'
import { DomainSchema } from './domain.js'

export const EventTypeSchema = z.enum([
    'message.received',
    'message.sent',
    'message.delivered',
    'message.bounced',
    'message.complained',
    'message.rejected',
    'domain.verified',
])

const EventSchema = z.object({
    type: z.literal('event'),
    event_type: EventTypeSchema,
    event_id: z.uuid(),
})

export const MessageReceivedEventSchema = EventSchema.extend({
    event_type: z.literal('message.received'),
    message: MessageSchema,
    thread: ThreadMetadataSchema,
    body_included: z.boolean(),
})

const MessageEventSchema = z.object({
    pod_id: z.uuid(),
    inbox_id: z.email(),
    thread_id: z.uuid().optional(), // TODO: Make required
    message_id: z.string(),
    timestamp: z.iso.datetime(),
})

export const MessageSentEventSchema = EventSchema.extend({
    event_type: z.literal('message.sent'),
    send: MessageEventSchema.extend({ recipients: z.array(z.email()) }),
})

export const MessageBouncedEventSchema = EventSchema.extend({
    event_type: z.literal('message.bounced'),
    bounce: MessageEventSchema.extend({
        type: z.string(),
        sub_type: z.string(),
        recipients: z.array(z.object({ address: z.email(), status: z.string() })),
    }),
})

export const MessageComplainedEventSchema = EventSchema.extend({
    event_type: z.literal('message.complained'),
    complaint: MessageEventSchema.extend({
        type: z.string().optional(),
        sub_type: z.string().optional(),
        recipients: z.array(z.email()),
    }),
})

export const MessageDeliveredEventSchema = EventSchema.extend({
    event_type: z.literal('message.delivered'),
    delivered: MessageEventSchema.extend({ recipients: z.array(z.email()) }),
})

export const MessageRejectedEventSchema = EventSchema.extend({
    event_type: z.literal('message.rejected'),
    reject: MessageEventSchema.extend({ reason: z.string() }),
})

export const DomainVerifiedEventSchema = EventSchema.extend({
    event_type: z.literal('domain.verified'),
    domain: DomainSchema,
})

export type MessageReceivedEvent = z.infer<typeof MessageReceivedEventSchema>
export type MessageSentEvent = z.infer<typeof MessageSentEventSchema>
export type MessageBouncedEvent = z.infer<typeof MessageBouncedEventSchema>
export type MessageComplainedEvent = z.infer<typeof MessageComplainedEventSchema>
export type MessageDeliveredEvent = z.infer<typeof MessageDeliveredEventSchema>
export type MessageRejectedEvent = z.infer<typeof MessageRejectedEventSchema>
export type DomainVerifiedEvent = z.infer<typeof DomainVerifiedEventSchema>
