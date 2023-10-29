"use client"

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface OverviewProps {
  dataReal: any
};

export function getMonthName(monthNumber: number): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  }

  return 'Unknown'; // Handle invalid month numbers as needed
}

export function Overview({ dataReal }: OverviewProps) {

  const dataWithMonth = dataReal.map((item: { purchaseDate: Date; }) => ({
    ...item,
    month: new Date(item.purchaseDate).getMonth() + 1,
  }));


  // const data = [
  //     {
  //         name: "Jan",
  //         total: 0,
  //         monthNum: 1,
  //     },
  //     {
  //         name: "Feb",
  //         total: 0,
  //         monthNum: 2,
  //     },
  //     {
  //         name: "Mar",
  //         total: 0,
  //         monthNum: 3    
  //     },
  //     {
  //         name: "Apr",
  //         total: 0,
  //         monthNum: 4
  //     },
  //     {
  //         name: "May",
  //         total: 0,
  //         monthNum: 5
  //     },
  //     {
  //         name: "Jun",
  //         total: 0,
  //         monthNum: 6
  //     },
  //     {
  //         name: "Jul",
  //         total: 0,
  //         monthNum: 7
  //     },
  //     {
  //         name: "Aug",
  //         total: 0,
  //         monthNum: 8
  //     },
  //     {
  //         name: "Sep",
  //         total: 0,
  //         monthNum: 9
  //     },
  //     {
  //         name: "Oct",
  //         total: 0,
  //         monthNum: 10
  //     },
  //     {
  //         name: "Nov",
  //         total: 0,
  //         monthNum: 11
  //     },
  //     {
  //         name: "Dec",
  //         total: 0,
  //         monthNum: 12
  //     },
  // ]

  // data.forEach(item => {
  //     const month = item.monthNum;
  //     if (monthTotal[month]) {
  //       item.total = monthTotal[month];
  //     }
  //   });

  const [revenueData, setRevenueData] = useState<any>();

  const calculateMonthlyRevenue = () => {
    interface Transaction {
      month: number;
      totalPrice: number;
    }

    const monthlyRevenue: {[key: string]: number} = dataWithMonth.reduce((acc: {[key: string]: number}, transaction: Transaction) => {
      const monthName = getMonthName(transaction.month);
      if (!acc[monthName]) {
        acc[monthName] = 0;
      }
      acc[monthName] += transaction.totalPrice;
      return acc;
    }, {});

    const revenueArray = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue,
    }));

    console.log(revenueArray);

    setRevenueData(revenueArray);
  };

  useEffect(() => {
    calculateMonthlyRevenue();
  }, []);


  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={revenueData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value/1000}`}
        />
        <Bar dataKey="revenue" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}