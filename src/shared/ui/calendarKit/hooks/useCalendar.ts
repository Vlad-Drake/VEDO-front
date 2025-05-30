import { useState, useMemo } from 'react';
import { createDate } from '../createDate';
import { createMonth } from '../createMonth';
import { getMonthesNames } from '../getMonthNames';
import { getWeekDaysNames } from '../getWeekDaysNames';
import { getMonthNumberOfDays } from '../getMonthNumberOfDays';

interface UseCalendarParams{
    locale: string,
    selectedDate: Date | null,
    firstWeekDay: number
}

export const CalendarMods = {
    Days: 'days',
    Monthes: 'monthes',
    Years: 'years',
}

export type CalendarModsModel = typeof CalendarMods[keyof typeof CalendarMods];

const DirectionMods = {
    Right: 'right',
    Left: 'left',
}

type DirectionModsModel = typeof DirectionMods[keyof typeof DirectionMods];

const DAYS_IN_WEEK = 7;

const getYearsInterval = (year: number) => {
    const startYear = Math.floor(year / 10) * 10;
    return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = ({
    locale, //= 'defalut' 
    selectedDate: date,
    firstWeekDay = 2
}: UseCalendarParams) => {

    const [mode, setMode] = useState<CalendarModsModel>(CalendarMods.Days);

    /*function setMode(_mode: string){
        mode.current = _mode;
    }*/

    const [selectedDay, setSelectedDay] = useState(createDate({ locale, date }));
    const [selectedMonth, setSelectedMonth] = useState(createMonth({date: new Date(selectedDay.year, selectedDay.monthIndex), locale}));
    const [selectedYear, setSelectedYear] = useState(selectedDay.year);
    const [selectedYearsInterval, setSelectedYearsInterval] = useState(getYearsInterval(selectedDay.year));

    /*function setSelectedDay(_date: Date){
        selectedDay.value = createDate({ date: _date });
        selectedMonth.value = createMonth({date: new Date(selectedDay.value.year, selectedDay.value.monthIndex), locale});
        selectedYear.value = selectedDay.value.year;
        selectedYearsInterval.value = getYearsInterval(selectedDay.value.year);
    }

    function setSelectedYear(_year: any){
        selectedYear.value = _year;
        selectedYearsInterval.value = getYearsInterval(_year);
    }

    function setSelectedMonth(_month: any){
        selectedMonth.value = createMonth({date: new Date(_month.year, _month.monthIndex), locale});
        selectedYear.value = _month.year;
        selectedYearsInterval.value = getYearsInterval(_month.year);
    }

    function setSelectedYearsInterval(_years: any){
        selectedYearsInterval.value = _years;
    }*/

    const monthesNames = useMemo(() =>  getMonthesNames(locale), []);
    const weekDaysNames = useMemo(() =>  getWeekDaysNames(firstWeekDay, locale), []);
    
    const days = useMemo(() =>  selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

    const calendarDays = useMemo(() =>  {

        const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear)
        
        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale
        }).createMonthDays();

        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale
        }).createMonthDays();

        const firstDay = days[0];
        const lastDay = days[monthNumberOfDays - 1];

        const shiftIndex = firstWeekDay - 1
        const numberOfPrevDays = 
            firstDay.dayNumberInWeek - 1 - shiftIndex < 0
            ? DAYS_IN_WEEK - (firstWeekDay - firstDay.dayNumberInWeek)
            : firstDay.dayNumberInWeek - 1 - shiftIndex;

        const numberOfNextDays = 
        DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6 
            ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex) 
            : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

        const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

        const result = [];

        for(let i = 0; i < numberOfPrevDays; i += 1) {
            const inverted = numberOfPrevDays - i;
            result[i] = prevMonthDays[prevMonthDays.length - inverted];
        }
        for(let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
            result[i] = days[i - numberOfPrevDays];
        }
        for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
            result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
        }

        return result;
    }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

    const onClickArrow = (direction: DirectionModsModel) => {
        if (mode === CalendarMods.Days) {
            const monthIndex = direction === DirectionMods.Left ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;

            if (monthIndex === -1) {
                const year = selectedYear - 1;
                setSelectedYear(year);
                if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
                return setSelectedMonth(createMonth({ date: new Date(year, 11), locale }));
            }
    
            if (monthIndex === 12) {
                const year = selectedYear + 1;
                setSelectedYear(year);
                if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
                return setSelectedMonth(createMonth({ date: new Date(year, 0), locale }));
            }
 
            setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
        }
        
        if (mode === CalendarMods.Monthes && direction === DirectionMods.Left) {
            const year = selectedYear - 1;
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
            return setSelectedYear(selectedYear - 1);
        }
      
        if (mode === CalendarMods.Monthes && direction === DirectionMods.Right) {
            const year = selectedYear + 1;
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
            return setSelectedYear(selectedYear + 1);
        }
        
        if (mode === CalendarMods.Years && direction === DirectionMods.Left) {
            return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] - 10));
        }
    
        if (mode === CalendarMods.Years && direction === DirectionMods.Right) {
            return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] + 10));
        }
    };

    const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(createMonth({date: new Date(selectedYear, monthIndex), locale}));
    }

    const redefineSelectedDay = (date: Date | null) => {
        setSelectedDay(createDate({ locale, date }));
    }

    return{
        state: {
            mode,
            calendarDays,
            weekDaysNames,
            monthesNames,
            selectedDay,
            selectedMonth,
            selectedYear,
            selectedYearsInterval
        },
        functions: {
            setMode,
            setSelectedDay,
            redefineSelectedDay,
            onClickArrow,
            setSelectedMonthByIndex,
            setSelectedYear
        }
    };
};
