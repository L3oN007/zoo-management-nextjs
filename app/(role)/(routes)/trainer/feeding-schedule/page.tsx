'use client';
import { Internationalization, registerLicense } from '@syncfusion/ej2-base';
import {
  Agenda,
  Day,
  DragAndDrop,
  Inject,
  Month,
  Resize,
  ScheduleComponent,
  TimelineMonth,
  TimelineViews,
  ViewDirective,
  ViewsDirective,
  Week
} from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { CustomScheduleEditor } from './components/CustomEditor';
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
  const [events, setEvents] = useState<Event[]>();
  const [summary, setSummary] = useState('');

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

          return {
            ...event,
            StartTime: startTime.toISOString(),
            EndTime: endTime.toISOString()
            // IsReadonly: startTime < currentDate
          };
        });

        setEvents(updatedEvents);
        console.log('events', events);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const processEventTimezone = (event: Event) => {
    const startTime = new Date(event.StartTime);
    const endTime = new Date(event.EndTime);

    // Get UTC offset in minutes
    const utcOffset = startTime.getTimezoneOffset();

    // Convert times to UTC
    startTime.setMinutes(startTime.getMinutes() - utcOffset);
    endTime.setMinutes(endTime.getMinutes() - utcOffset);

    // Add date to times
    const date = new Date();
    startTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    endTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

    // Format date strings
    function toIsoString(date: Date) {
      return date.toISOString().slice(0, 16) + 'Z';
    }

    return {
      ...event
    };
  };

  const addEvent = (newEvent: Event) => {
    const adjustedEvent = processEventTimezone(newEvent);
    const newSchedule = { ...adjustedEvent['0'], Id: undefined };
    axios
      .post<Event>('https://651d776944e393af2d59dbd7.mockapi.io/schedule', newSchedule)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateEvent = (updatedEvent: Event) => {
    const adjustedEvent = processEventTimezone(updatedEvent);
    const updateSchedule = { ...adjustedEvent, Id: undefined };

    axios
      .put(`https://651d776944e393af2d59dbd7.mockapi.io/schedule/${adjustedEvent.id}`, updateSchedule)
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

  let instance = new Internationalization();
  const getTimeString = (value: any) => {
    return instance.formatDate(value, { skeleton: 'hm' });
  };

  const eventTemplate = (props: any) => {
    return (
      <div className="template-wrap" style={{ background: props.SecondaryColor }}>
        <div className="subject" style={{ background: props.PrimaryColor }}>
          {props.Title}
        </div>
        <div className="time" style={{ background: props.PrimaryColor }}>
          {' '}
          Time: {getTimeString(props.StartTime)} - {getTimeString(props.EndTime)}
        </div>

        <div className="event-description">{props.Description}</div>
        <div className="footer" style={{ background: props.PrimaryColor }}></div>
        <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-1 py-0.5 text-emerald-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-3 w-3 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="whitespace-nowrap text-xs">Already Fed</p>
        </span>
      </div>
    );
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
        // editorTemplate={editorTemplate}
        editorTemplate={(props: Event) => <CustomScheduleEditor eventData={props} />}
      >
        <ViewsDirective>
          <ViewDirective option="Day" startHour="06:00" endHour="19:00"></ViewDirective>
          <ViewDirective option="Week" isSelected={true} eventTemplate={eventTemplate}></ViewDirective>
          <ViewDirective option="TimelineDay"></ViewDirective>
          <ViewDirective option="TimelineMonth"></ViewDirective>
        </ViewsDirective>
        <Inject services={[Day, Week, Month, DragAndDrop, Agenda, TimelineViews, TimelineMonth, Resize]} />
      </ScheduleComponent>
    </div>
  );
};

export default SchedulePage;
