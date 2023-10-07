"use client"

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, format, subWeeks, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function CalendarDateRangePicker({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const today = new Date();
    const startOfThisWeek = startOfWeek(today);
    const endOfThisWeek = endOfWeek(today);
    const startOfThisMonth = startOfMonth(today);
    const endOfThisMonth = endOfMonth(today);
    const [startDateInput, setStartDateInput] = React.useState("");
    const [endDateInput, setEndDateInput] = React.useState("");

    const handleStartDateInputChange = (event: any) => {
        setStartDateInput(event.target.value);
    };

    const handleEndDateInputChange = (event: any) => {
        setEndDateInput(event.target.value);
    };



    const [date, setDate] = React.useState<DateRange | undefined>({
        from: startOfThisWeek,
        to: endOfThisWeek,
    });

    const handleTodayClick = () => {
        setDate({
            from: today,
            to: today,
        });
    };

    const handleThisWeekClick = () => {
        setDate({
            from: startOfThisWeek,
            to: endOfThisWeek,
        });
    };

    const handleThisMonthClick = () => {
        setDate({
            from: startOfThisMonth,
            to: endOfThisMonth,
        });
    };

    const handleLastWeekClick = () => {
        const lastWeekStart = subWeeks(today, 1);
        const lastWeekEnd = endOfWeek(lastWeekStart);
        setDate({
            from: lastWeekStart,
            to: lastWeekEnd,
        });
    };

    const handleLastMonthClick = () => {
        const lastMonthStart = subMonths(today, 1);
        const lastMonthEnd = endOfMonth(lastMonthStart);
        setDate({
            from: lastMonthStart,
            to: lastMonthEnd,
        });
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[260px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <div className="flex bg-white shadow-lg rounded-xl">
                        <div className="py-6 border-r border-gray-100">
                            <ul className="flex flex-col text-xs">
                                <li>
                                    <button
                                        onClick={handleTodayClick}
                                        className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-black text-left"
                                    >
                                        Today
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleThisWeekClick}
                                        className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-black text-left"
                                    >
                                        This week
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleThisMonthClick}
                                        className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-black text-left"
                                    >
                                        This month
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLastWeekClick}
                                        className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-black text-left"
                                    >
                                        Last week
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLastMonthClick}
                                        className="px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-black text-left"
                                    >
                                        Last month
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                            <div className="flex items-center justify-start px-2 mb-3">
                                <div className="flex ">
                                    <input
                                        type="text"
                                        className="flex items-center w-[30%] px-4 py-2 text-sm text-gray-900 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-black focus:outline-none"
                                        placeholder="MM/DD/YYYY"
                                        value={startDateInput}
                                        onChange={handleStartDateInputChange}
                                    />
                                    <div className="p-1">
                                        <svg className="w-6 h-6 text-gray-900 stroke-current" fill="none">
                                            <path
                                                d="M6.738 12.012h10.5m-4.476 4.25l4.5-4.25-4.5-4.25"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="flex items-center w-[30%] px-4 py-2 text-sm text-gray-900 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-black focus:outline-none"
                                        placeholder="MM/DD/YYYY"
                                        value={endDateInput}
                                        onChange={handleEndDateInputChange}
                                    />
                                    <Button
                                        className="ml-2"
                                        onClick={() => {
                                            const startDate = new Date(startDateInput);
                                            const endDate = new Date(endDateInput);

                                            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                                                setDate({
                                                    from: startDate,
                                                    to: endDate,
                                                });
                                            }
                                        }}
                                    >
                                        Apply
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
