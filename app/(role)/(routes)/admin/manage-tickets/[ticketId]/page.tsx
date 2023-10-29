import { format } from "date-fns";
import { ManageTicketForm } from "./components/manage-ticket-form";
import axios from "axios";

const EditTicketPage = async ({ params }: { params: { ticketId: string } }) => {
  // Construct the URL using the ticketId from the params object
  const url = process.env.NEXT_PUBLIC_API_GET_TICKET + `${params.ticketId}`;
  try {
    // Make the GET request to fetch ticket data
    const response = await axios.get(url);

    // Extract ticketData from the response
    let ticketData = response.data;


    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageTicketForm initialData={ticketData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageTicketForm initialData={null} />
        </div>
      </div>
    );
  }
};

export default EditTicketPage;
