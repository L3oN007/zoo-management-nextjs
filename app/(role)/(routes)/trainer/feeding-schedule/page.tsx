'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
  DragAndDrop,
  Agenda,
  ViewDirective,
  ViewsDirective,
  TimelineViews,
  TimelineMonth,
  Resize
} from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1JpRGBGfV5yd0VDalhRTnVZUj0eQnxTdEZiWX5bcXZWRmFUVUR2Ww==');

interface Event {
  id: string;
  Subject: string;
  StartTime: string;
  EndTime: string;
  IsAllDay: boolean;
  ProjectId: number;
  TaskId: number;
  Fed: boolean;
  IsReadonly: boolean;
}

const SchedulePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get<Event[]>('https://651d776944e393af2d59dbd7.mockapi.io/schedule')
      .then((response) => {
        const currentDate = new Date();
        const updatedEvents = response.data.map((event) => {
          // Convert event times from UTC to local time zone
          const startTime = new Date(event.StartTime);
          const endTime = new Date(event.EndTime);

          // Set the time zone offset (in minutes) to UTC
          const timeZoneOffset = new Date().getTimezoneOffset();

          // Adjust start and end times to local time zone
          startTime.setHours(startTime.getHours() + timeZoneOffset / 60);
          endTime.setHours(endTime.getHours() + timeZoneOffset / 60);

          return {
            ...event,
            StartTime: startTime.toISOString(),
            EndTime: endTime.toISOString(),
            IsReadonly: startTime < currentDate
          };
        });

        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const processEventTimezone = (event: Event) => {
    // Convert event times to UTC before sending to the API
    const startTime = new Date(event.StartTime);
    const endTime = new Date(event.EndTime);

    // Set the time zone offset (in minutes) to UTC
    const timeZoneOffset = new Date().getTimezoneOffset();

    // Adjust start and end times to UTC
    startTime.setHours(startTime.getHours() - timeZoneOffset / 60);
    endTime.setHours(endTime.getHours() - timeZoneOffset / 60);

    return {
      ...event,
      StartTime: startTime.toISOString(),
      EndTime: endTime.toISOString()
    };
  };

  const addEvent = (newEvent: Event) => {
    const adjustedEvent = processEventTimezone(newEvent);

    axios
      .post<Event[]>('https://651d776944e393af2d59dbd7.mockapi.io/schedule', adjustedEvent)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateEvent = (updatedEvent: Event) => {
    const adjustedEvent = processEventTimezone(updatedEvent);

    axios
      .put(`https://651d776944e393af2d59dbd7.mockapi.io/schedule/${adjustedEvent.id}`, adjustedEvent)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteEvent = (eventId: string) => {
    axios
      .delete(`https://651d776944e393af2d59dbd7.mockapi.io/schedule/${eventId}`)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <ScheduleComponent
        width="100%"
        height="550px"
        eventSettings={{ dataSource: events }}
        actionBegin={(args) => {
          if (args.requestType === 'eventCreate') {
            addEvent(args.data as Event);
          } else if (args.requestType === 'eventChange') {
            updateEvent(args.data as Event);
          } else if (args.requestType === 'eventRemove') {
            deleteEvent((args.data[0] as Event).id);
          }
        }}
      >
        <ViewsDirective>
          <ViewDirective option="Day" startHour="06:00" endHour="19:00"></ViewDirective>
          <ViewDirective option="Week" isSelected={true}></ViewDirective>
          <ViewDirective option="TimelineDay"></ViewDirective>
          <ViewDirective option="TimelineMonth"></ViewDirective>
        </ViewsDirective>
        <Inject services={[Day, Week, Month, DragAndDrop, Agenda, TimelineViews, TimelineMonth, Resize]} />
      </ScheduleComponent>
    </div>
  );
};

export default SchedulePage;
