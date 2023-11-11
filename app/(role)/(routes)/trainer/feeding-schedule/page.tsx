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
  Timezone,
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
import { useSession } from 'next-auth/react';
import { constants } from 'buffer';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1JpRGBGfV5yd0VDalhRTnVZUj0eQnxTdEZiWX5bcXZWRmFUVUR2Ww==');

const SchedulePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>();

  const session = useSession();
  const areaId = session.data?.user.areaId;

  const urlGetScheduleOfAnArea = process.env.NEXT_PUBLIC_API_LOAD_FEEDING_SCHEDULE_OF_AREA! + session.data?.user.areaId;
  const urlGetScheduleOfAnEmp =
    process.env.NEXT_PUBLIC_API_LOAD_FEEDING_SCHEDULE_OF_TRAINER! + session.data?.user.employeeId;

  const urlGetSchedule = areaId != null ? urlGetScheduleOfAnArea : urlGetScheduleOfAnEmp;

  const urlCreateSchedule = process.env.NEXT_PUBLIC_API_CREATE_SCHEDULE;
  const urlUpdateSchedule = process.env.NEXT_PUBLIC_API_UPDATE_SCHEDULE;
  const urlDeleteSchedule = process.env.NEXT_PUBLIC_API_DELETE_SCHEDULE;
  const urlUpdateScheduleStatus = process.env.NEXT_PUBLIC_API_UPDATE_SCHEDULE_STATUS;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get<Event[]>(urlGetSchedule!)
      .then((response) => {
        const currentDate = new Date();
        const updatedEvents = response.data.map((event) => {
          const endTime = new Date(event.EndTime);
          return {
            ...event
            // IsReadonly: endTime < currentDate
          };
        });

        setEvents(updatedEvents);
        console.log('events', events);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addEvent = (newEvent: Event) => {
    const adjustedEvent = newEvent;
    const newSchedule = { ...adjustedEvent['0'], Id: undefined };
    console.log(newEvent);
    axios
      .post<Event>(urlCreateSchedule!, newSchedule)
      .then(() => {
        fetchEvents();
        toast.success('Created successfully!');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.title);
      });
  };

  const updateEvent = (updatedEvent: Event) => {
    const adjustedEvent = updatedEvent;
    const updateSchedule = { ...adjustedEvent, Id: undefined };

    let updateUrl = areaId != null ? urlUpdateSchedule : urlUpdateScheduleStatus;
    axios
      .put(updateUrl + `${adjustedEvent.no}`, updateSchedule)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.title);
      });
  };

  const deleteEvent = (deleteEvent: Event) => {
    const adjustedEvent = deleteEvent;
    const updateSchedule = { ...adjustedEvent, Id: undefined };

    axios
      .delete(urlDeleteSchedule! + `${adjustedEvent.no}`)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.title);
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
            deleteEvent(args.data[0] as Event);
          }
        }}
        eventRendered={onEventRendered}
        showQuickInfo={false}
        editorTemplate={(props: Event) => <CustomScheduleEditor eventData={props} />}
        popupOpen={(args) => {
          let isEmptyCell =
            args.target?.classList.contains('e-work-cells') || args.target?.classList.contains('e-header-cells');
          if (args.type === 'Editor' && isEmptyCell && areaId == null) {
            args.cancel = true;
          }
        }}
      >
        <ViewsDirective>
          <ViewDirective option="Day" startHour="06:00" endHour="19:00"></ViewDirective>
          <ViewDirective option="Week" isSelected={true} eventTemplate={eventTemplate}></ViewDirective>
          <ViewDirective option="TimelineWeek" eventTemplate={eventTemplate}></ViewDirective>
          <ViewDirective option="Agenda" eventTemplate={eventTemplate}></ViewDirective>
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda, TimelineViews, TimelineMonth]} />
      </ScheduleComponent>
    </div>
  );
};

export default SchedulePage;
