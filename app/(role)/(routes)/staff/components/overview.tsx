'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface OverviewProps {
  dataReal: any;
}

export function getMonthName(monthNumber: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  }

  return 'Unknown'; // Handle invalid month numbers as needed
}

export function Overview({ dataReal }: OverviewProps) {
  const dataWithMonth = dataReal?.map((item: { purchaseDate: Date }) => ({
    ...item,
    month: new Date(item.purchaseDate).getMonth() + 1
  }));

  const [revenueData, setRevenueData] = useState<any>();

  const calculateMonthlyRevenue = () => {
    if (!dataWithMonth) {
      console.warn('DataReal is null or empty.');
      return;
    }

    interface Transaction {
      month: number;
      totalPrice: number;
    }

    try {
      const monthlyRevenue: { [key: string]: number } = dataWithMonth.reduce(
        (acc: { [key: string]: number }, transaction: Transaction) => {
          const monthName = getMonthName(transaction.month);
          if (!acc[monthName]) {
            acc[monthName] = 0;
          }
          acc[monthName] += transaction.totalPrice;
          return acc;
        },
        {}
      );

      const revenueArray = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
        month,
        revenue
      }));

      console.log(revenueArray);

      setRevenueData(revenueArray);
    } catch (error) {
      console.error('An error occurred while calculating monthly revenue:', error);
      // Handle the error or set a default value for revenueData here.
    }
  };

  useEffect(() => {
    calculateMonthlyRevenue();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={revenueData || []}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000000}`}
        />
        <Bar dataKey="revenue" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
