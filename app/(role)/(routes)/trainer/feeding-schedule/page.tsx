'use client';
import { Internationalization, registerLicense } from '@syncfusion/ej2-base';
import {
  Agenda,
  Inject,
  Month,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective
} from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { CustomScheduleEditor } from './components/CustomEditor';
import { Event } from './modal/event';
registerLicense('ORg4AjUWIQA/Gnt2VlhhQlJCfV5AQmJKYVF2R2BJelR1c19GYkwgOX1dQl9gSH9SdUVmXHdfeHRdT2E=');

const SchedulePage: React.FC = () => {
  const scheduleObj = useRef(null);
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
    const currentView = scheduleObj.current.currentView;
    if (currentView === 'Agenda') {
      return (
        <div className="template-wrap" style={{ background: props.SecondaryColor }}>
          <div className="subject" style={{ background: props.PrimaryColor }}>
            <div className="flex">Title 123</div>
          </div>
          <div className="time" style={{ background: props.PrimaryColor }}>
            {' '}
            Time: {getTimeString(props.StartTime)} - {getTimeString(props.EndTime)}
          </div>
        </div>
      );
    }
    return (
      <div className="template-wrap" style={{ background: props.SecondaryColor }}>
        <div className="subject" style={{ background: props.PrimaryColor }}>
          <div className="flex">{getTimeString(props.StartTime)} - Title123</div>
        </div>
      </div>
    );
  };

  const onEventRendered = (args: any) => {
    const event = args.data as Event;
    const currentView = scheduleObj.current.currentView;
    switch (event.feedingStatus) {
      case 0:
        if (currentView === 'Agenda') {
          args.element.firstChild.style.borderLeftColor = 'black'; // Change to your desired color
        } else {
          args.element.style.backgroundColor = 'black'; // Change to your desired color
        }
        break;
      case 1:
        if (currentView === 'Agenda') {
          args.element.firstChild.style.borderLeftColor = 'green'; // Change to your desired color
        } else {
          args.element.style.backgroundColor = 'green'; // Change to your desired color
        } // Change to your desired color
        break;
      default:
        // Default background color if neither 0 nor 1
        args.element.style.backgroundColor = 'red'; // Change to your desired default color
        break;
    }
  };
  const timeScale = { enable: true, interval: 60, slotCount: 6 };

  return (
    <div>
      <ScheduleComponent
        ref={scheduleObj}
        timeScale={timeScale}
        currentView="Month"
        width="100%"
        height="950px"
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
          <ViewDirective option="Month" eventTemplate={eventTemplate} startHour="05:00" endHour="20:00"></ViewDirective>
          <ViewDirective
            option="Agenda"
            eventTemplate={eventTemplate}
            startHour="05:00"
            endHour="20:00"
          ></ViewDirective>
        </ViewsDirective>
        <Inject services={[Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default SchedulePage;
