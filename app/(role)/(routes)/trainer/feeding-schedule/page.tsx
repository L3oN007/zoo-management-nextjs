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
import { Event } from './modal/event';
import { CustomScheduleEditor } from './components/CustomEditor';
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1JpRGBGfV5yd0VDalhRTnVZUj0eQnxTdEZiWX5bcXZWRmFUVUR2Ww==');

const SchedulePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>();

  const urlGetSchedules = process.env.NEXT_PUBLIC_API_LOAD_SCHEDULES;
  const urlCreateSchedule = process.env.NEXT_PUBLIC_API_CREATE_SCHEDULE;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get<Event[]>(urlGetSchedules!)
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
        toast.error(error.response.data.title);
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
    const adjustedEvent = newEvent;
    const newSchedule = { ...adjustedEvent['0'], Id: undefined };
    axios
      .post<Event>(urlCreateSchedule!, newSchedule)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.title);
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
        toast.error(error.response.data.title);
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
          <div className="flex">{props.cageName}</div>
        </div>
        <div className="time" style={{ background: props.PrimaryColor }}>
          {' '}
          Time: {getTimeString(props.StartTime)} - {getTimeString(props.EndTime)}
        </div>

        <div className="event-description">{props.Description}</div>
        <div className="footer" style={{ background: props.PrimaryColor }}></div>
      </div>
    );
  };

  const onEventRendered = (args: any) => {
    const event = args.data as Event;

    switch (event.feedingStatus) {
      case 0:
        args.element.style.backgroundColor = 'black'; // Change to your desired color
        break;
      case 1:
        args.element.style.backgroundColor = 'green'; // Change to your desired color
        break;
      default:
        // Default background color if neither 0 nor 1
        args.element.style.backgroundColor = 'your_default_color'; // Change to your desired default color
        break;
    }
  };

  return (
    <div>
      <ScheduleComponent
        width="100%"
        height="100%"
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
        eventRendered={onEventRendered}
        showQuickInfo={false}
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
