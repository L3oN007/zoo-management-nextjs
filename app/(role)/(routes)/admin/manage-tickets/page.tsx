import { ManageTicketClient } from "./components/client";

import ErrorPage from "@/app/error/page";
import axios from "axios";
import { format } from "date-fns";

const ManageTicketPage = async () => {
  const url = process.env.NEXT_PUBLIC_API_LOAD_TICKET || "";
  try {
    // Make the GET request to fetch ticket data
    console.log(url);
    const response = await axios.get(url);

    // Check if the response contains data
    if (response.data === null) {
      // ticket not found, set ticketData to null
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Ticket not found.</p>
          </div>
        </div>
      );
    }

    // Extract ticketData from the response
    let ticketData = response.data;

    if (Array.isArray(ticketData)) {
      ticketData.forEach((ticket: any) => {
        // ticket.employeeStatus = ticket.employeeStatus.toString();
      });
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageTicketClient data={ticketData} />
        </div>
      </div>
      
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageTicketPage;
