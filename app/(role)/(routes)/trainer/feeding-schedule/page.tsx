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
import { DateTimePicker, DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ScheduleModal } from '@/components/modals/schedule-modal';
import { CustomScheduleEditor } from './components/CustomEditor/CustomEditor';
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

          // // Set the time zone offset (in minutes) to UTC
          // const timeZoneOffset = new Date().getTimezoneOffset();

          // // Adjust start and end times to local time zone
          // startTime.setHours(startTime.getHours() + timeZoneOffset / 60);
          // endTime.setHours(endTime.getHours() + timeZoneOffset / 60);

          return {
            ...event,
            StartTime: startTime.toISOString(),
            EndTime: endTime.toISOString(),
            IsReadonly: startTime < currentDate
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

  const fetchEventDetails = (eventId: string) => {
    axios
      .get<Event>(`https://651d776944e393af2d59dbd7.mockapi.io/schedule/${eventId}`)
      .then((response) => {
        const detailedEvent = response.data;
        setSelectedEvent(detailedEvent);
      })
      .catch((error) => {
        console.error(error);
      });
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
    console.log(updateSchedule);

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

  return (
    <div>
      <ScheduleComponent
        width="100%"
        height="550px"
        eventSettings={{ dataSource: events }}
        popupOpen={(args) => {
          if (args.type === 'Editor' && args.data && args.data.id) {
            const eventId = args.data.id;
            console.log('Event id', eventId);
            fetchEventDetails(eventId);
          }
        }}
        actionBegin={(args) => {
          if (args.requestType === 'eventCreate') {
            addEvent(args.data as Event);
          } else if (args.requestType === 'eventChange') {
            updateEvent(args.data as Event);
          } else if (args.requestType === 'eventRemove') {
            deleteEvent((args.data[0] as Event).id);
          }
        }}
        editorTemplate={(props) => <CustomScheduleEditor eventData={selectedEvent || props} />}
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
