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
} from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense(
	'Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1JpRGBGfV5yd0VDalhRTnVZUj0eQnxTdEZiWX5bcXZWRmFUVUR2Ww=='
);

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
				// Update events with IsReadonly property based on the current day
				const currentDate = new Date();
				const updatedEvents = response.data.map((event) => ({
					...event,
					IsReadonly: new Date(event.StartTime) < currentDate,
				}));
				setEvents(updatedEvents);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const addEvent = (newEvent: Event) => {
		console.log(newEvent);
		axios
			.post<Event[]>(
				'https://651d776944e393af2d59dbd7.mockapi.io/schedule',
				newEvent
			)
			.then(() => {
				fetchEvents();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const updateEvent = (updatedEvent: Event) => {
		axios
			.put(
				`https://651d776944e393af2d59dbd7.mockapi.io/schedule/${updatedEvent.id}`,
				updatedEvent
			)
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
				width='100%'
				height='550px'
				eventSettings={{ dataSource: events }}
				actionBegin={(args) => {
					if (args.requestType === 'eventCreate') {
						addEvent(args.data as Event);
					} else if (args.requestType === 'eventChange') {
						updateEvent(args.data as Event);
					} else if (args.requestType === 'eventRemove') {
						deleteEvent((args.data[0] as Event).id);
					}
				}}>
				<Inject services={[Day, Week, Month, DragAndDrop, Agenda]} />
			</ScheduleComponent>
		</div>
	);
};

export default SchedulePage;
