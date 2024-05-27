import { Request, Response } from 'express';
import { google } from 'googleapis';
import { oAuth2Client } from 'src/utils/google.utils'; 
import { VapiPayload, VapiWebhookEnum } from '../../types/vapi.types';

/**
 * Handles POST requests from Vapi to perform function calls.
 * Specifically, it processes the `googleCalendar` function call,
 * which creates an event in Google Calendar meeting based on the payload given by vapi.
 */

export const scheduleGoogleMeeting = async (req: Request, res: Response) => {
  
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    try {
      const payload = req.body.message as VapiPayload;
  
      if (payload.type === VapiWebhookEnum.FUNCTION_CALL) {
        const { functionCall } = payload;
  
        if (!functionCall) {
          throw new Error('Invalid Request.');
        }
  
        const { name, parameters } = functionCall;
  
        if (name === 'scheduleGoogleMeeting') {
          // Extract event details from parameters
          const { fullName, summary, start, email } = parameters;
          const attendees = { email, "devin.phat97@gmail.com" };

          // Parse the start time
          const startTime: Date = new Date(start);

          // Calculate the end time (one hour after start time)
          const endTime: Date = new Date(startTime);
          endTime.setHours(startTime.getHours() + 1);
          
          // Prepare the event object
          const event = {
            displayname: fullName,
            summary: summary,
            start: {
              dateTime: startTime, // Ensure this is in the correct format (ISO 8601)
              timeZone: 'America/Los_Angeles', // Adjust the timezone as needed
            },
            end: {
              dateTime: endTime, // Ensure this is in the correct format (ISO 8601)
              timeZone: 'America/Los_Angeles', // Adjust the timezone as needed
            },
            attendees: attendees.map((email: string) => ({ email })),
          };
  
          // Insert the event into the calendar
          const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });
  
          return res.status(201).json({ eventId: response.data.id });
        } else {
          throw new Error('Function name not recognized.');
        }
      } else {
        throw new Error('Invalid payload type.');
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  