import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { Heading } from '@/components/ui/heading';
import { getServerSession } from 'next-auth';
import { Overview } from './components/overview';
import axios from 'axios';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.'
};

function getMonthName(monthNumber : number) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    return 'Invalid month number';
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(options);
  const transUrl = process.env.NEXT_PUBLIC_API_LOAD_TRANSACTIONS!;
  const orderDetailUrl = process.env.NEXT_PUBLIC_API_LOAD_ORDERDETAIL!;

  const transResponse = await axios.get(transUrl);

  let transData = transResponse.data;
  console.log(transData)

  var totalRevenue = 0;

  var curTickets = 0;

  transData.forEach((element: any) => {
    totalRevenue += element.totalPrice;

    if ((new Date(element.purchaseDate).getMonth() + 1) === new Date().getMonth() + 1) {
      element.order.orderDetails.forEach((od: { quantity: number; }) => {
        curTickets += od.quantity;
      });
    }
  });

  const odResponse = await axios.get(orderDetailUrl);

  let odData = odResponse.data;

  var totalQuantityTickets = 0;

  odData.forEach((element: any) => {
    totalQuantityTickets += element.quantity;
  });

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <Heading
              title="Dashboard"
              description={`Welcome back ${session?.user.fullName}`}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue of {new Date().getFullYear()}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRevenue.toLocaleString('vi', {
                  style: 'currency',
                  currency: 'VND'
                })}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales in of {new Date().getFullYear()}</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalQuantityTickets} sold tickets</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview revenue of {new Date().getFullYear()}</CardTitle>
                <CardDescription>millions per month</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview dataReal={transData} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  We sold {curTickets} tickets this {getMonthName(new Date().getMonth() + 1)}.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
