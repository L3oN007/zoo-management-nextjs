'use client';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

interface CustomScheduleEditorProps {
  eventData: any;
}

export const CustomScheduleEditor: React.FC<CustomScheduleEditorProps> = ({ eventData }) => {
  console.log('Data nhan dc ben editor', eventData);
  // Parse string dates into Date objects
  const startTime = new Date(eventData?.startTime || eventData?.StartTime);
  const endTime = new Date(eventData?.endTime || eventData?.EndTime);

  return (
    <>
      <table className="custom-event-editor" style={{ width: '100%' }} cellPadding={5}>
        <tbody>
          <tr>
            <td className="e-textlabel">Summary</td>
            <td colSpan={4}>
              <input
                id="Summary"
                className="e-field e-input"
                type="text"
                name="Subject"
                style={{ width: '100%' }}
                defaultValue={eventData?.Subject}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Status</td>
            <td colSpan={4}>
              <DropDownListComponent
                id="EventType"
                placeholder="Choose status"
                data-name="EventType"
                className="e-field"
                style={{ width: '100%' }}
                dataSource={['New', 'Requested', 'Confirmed']}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                id="StartTime"
                format="dd/MM/yy hh:mm a"
                data-name="StartTime"
                value={startTime}
                className="e-field"
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                id="EndTime"
                format="dd/MM/yy hh:mm a"
                data-name="EndTime"
                value={endTime}
                className="e-field"
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Reason</td>
            <td colSpan={4}>
              <textarea
                defaultValue={eventData?.Description}
                id="Description"
                className="e-field e-input"
                name="Description"
                rows={3}
                cols={50}
                style={{ width: '100%', height: '60px !important', resize: 'vertical' }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
