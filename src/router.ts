import { Router } from 'express';
import { inboundHandler } from './handlers/inbound';
import { outboundHandler } from './handlers/outbound';
import { webhookHandler } from './handlers/webhook';
import { scheduleGoogleMeeting } from './handlers/google-api/google-calendar';

const router = Router();

router.post('/inbound', inboundHandler);
router.post('/outbound', outboundHandler);
router.post('/webhook', webhookHandler);

router.post('/google-api/scheduleGoogleMeeting', scheduleGoogleMeeting);

export { router };
