import { useRef, useState, useEffect } from 'react';
import classes from './calendarKit.module.scss';
import { formatDate } from './formatDate';
import { CalendarMods, useCalendar } from './hooks/useCalendar';
import { useGlobalClickOutside } from '@/shared/helper/useGlobalClickOutside';
import { checkIsToday } from './checkIsToday';
import { checkDateIsEqual } from './checkDateIsEqual';
import { capitalize } from '@/shared/helper/capitalize';
import Calendar_ico from './assets/calendar_ico.svg';
export function CalendarKit({
    value = null,
    locale = 'defalut',
    placeholder,
    width = 'auto',
    updateValue,
}:{
    value: Date | null,
    placeholder: string,
    locale?: string,
    width?: string,
    updateValue: (newVal: Date) => void,
}) {
    const {state, functions } = useCalendar({ locale: locale, selectedDate: value, firstWeekDay: 2 });
    const calendarContainer = useRef<HTMLDivElement | null>(null);
    const calendarBody = useRef<HTMLDivElement | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [isAbove, setIsAbove] = useState<boolean>(false);
    const [isCalendar, setIsCalendar] = useState<boolean>(false);
    const { registerComponent, unregisterComponent } = useGlobalClickOutside();
    useEffect(() => {
        
        if(value) {
            functions.redefineSelectedDay(value)
            const rez = formatDate(value, 'DD.MM.YYYY');
            if(rez) {
                setFormattedDate(rez);
            }
            
        }
        return (() => {
            if (calendarContainer.current) {
                unregisterComponent(calendarContainer.current);
            }
        })
    }, [value]);

    /*const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //updateValue(e.target.value);
    };*/

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement;
        let input = inputElement.value;
    
        // Удаляем все нецифровые символы
        const digitsOnly = input.replace(/\D/g, "");
    
        // Форматируем дату с добавлением точек
        let formatted = "";
        if (digitsOnly.length > 0) {
            let day = digitsOnly.slice(0, 2);
    
            if (parseInt(day) > 31) {
                day = "31";
            } 
            else if (day.length === 1 && parseInt(day) > 3) {
                day = "0" + day; // Автодополнение ведущим нулём
            }
    
            formatted = day;
        }
    
        if (digitsOnly.length >= 2 || formatted.length >= 2) {
            formatted += ".";
        }
    
        if (digitsOnly.length > 2) {
            let month = digitsOnly.slice(2, 4);
    
            if (parseInt(month) > 12) {
                month = "12";
            } 
            else if (month.length === 1 && parseInt(month) > 1) {
                month = "0" + month; // Автодополнение ведущим нулём
            }
    
            formatted += month;
        }
        
        if (digitsOnly.length >= 4 || formatted.length >= 5) {
            formatted += ".";
        }
        if (digitsOnly.length > 4) {
            const year = digitsOnly.slice(4, 8);
            formatted += year;
        }
    
        setFormattedDate(formatted);
    
        if (digitsOnly.length === 8) {
            const day = parseInt(digitsOnly.slice(0, 2));
            const month = parseInt(digitsOnly.slice(2, 4)) - 1; // Месяцы от 0 до 11
            const year = parseInt(digitsOnly.slice(4, 8));
    
            const date = new Date(year, month, day);
    
            if (
                date.getFullYear() === year &&
                date.getMonth() === month &&
                date.getDate() === day
            ) {
                console.log("Корректная дата:", date);
                updateValue(date);
            } 
            else {
                console.error("Некорректная дата");
                setFormattedDate("");
            }
        }
    
    };

    const ToggleCalendar = async () => {
        const newIsCalendar = !isCalendar;
        setIsCalendar(!isCalendar);
    
        if(newIsCalendar && calendarContainer.current) {
            registerComponent({
                element: calendarContainer.current,
                close: () => {
                    setIsCalendar(false);
                },
            });
            adjustDropdownPosition();
        }
        else{
            setIsAbove(false);
            if(calendarContainer.current){
                unregisterComponent(calendarContainer.current);
            }
        }   
    }
    
    const adjustDropdownPosition = () => {
    
        if (!calendarBody.current) return;
    
        const containerRect = calendarBody.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
    
        const spaceBelow = windowHeight - containerRect.bottom;
        const spaceAbove = containerRect.top;
        
        spaceBelow < spaceAbove ? setIsAbove(true) : setIsAbove(false);
    };

    function selectDate(newDate: Date) {
        setIsCalendar(false);
        setFormattedDate(formatDate(newDate, 'DD.MM.YYYY')!);
        updateValue(newDate);
    }

    return (
        <div className={classes["calendar"]} ref={calendarContainer}>
            <div className={classes["calendar__body"]} ref={calendarBody} style={{width}}>
                <div className={classes["date-input-wrapper"]}>
                    <input
                        type="text"
                        value={formattedDate}
                        onChange={handleChange}
                        maxLength={10}
                    />
                    <div className={classes["placeholder-text"]}>
                        <span className={classes["entered"]}>{ formattedDate }</span>
                        <span className={classes["remaining"]}>{ placeholder.slice(formattedDate.length) }</span>
                    </div>
                </div>
                
                <div className={classes["img-btn"]} onClick={ToggleCalendar}>
                    <img src={Calendar_ico} alt="" />

                </div>
            </div>
            {isCalendar && ( 
                <div className={`${classes["calendar__selector"]} ${isAbove ? classes['calendar--top'] : ''}`}> {/* onClick.stop*/}
                    <div className={classes["top-panel"]}>
                        <div className={classes["btn"]}>
                            {state.mode === 'days' && (
                                <p className={classes["calendar-header-row-selectedDate-text"]} onClick={() => functions.setMode('monthes')}>
                                    {capitalize(state.monthesNames[state.selectedMonth.monthIndex].month)} {state.selectedYear}
                                </p>
                            )}
                            {state.mode === 'monthes' && (
                                <p className={classes["calendar-header-row-selectedDate-text"]} onClick={() => functions.setMode('years')}>
                                    {state.selectedYear}
                                </p>
                            )}
                            {state.mode === 'years' && (
                                <p className={classes["calendar-header-row-selectedDate-text"]} onClick={() => functions.setMode('days')}>
                                    {state.selectedYearsInterval[0]} - {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
                                </p>
                            )}
                        </div>
                        <div className={classes["arrows"]}>
                            <p onClick={() => functions.onClickArrow('left')}>◀</p>
                            <p onClick={() => functions.onClickArrow('right')}>▶</p>
                        </div>
                    </div>
                    <div className={classes["cells"]}>
                        {state.mode === CalendarMods.Days && (
                            <div className={classes["cells__days"]}>
                                <div className={classes["weeks"]}>
                                    {state.weekDaysNames.map((weekDaysName) => (
                                        <p key={weekDaysName.dayShort}>{ capitalize(weekDaysName.dayShort) }</p>
                                    ))}
                                </div>
                                
                                <div className={classes["days"]}>
                                    {state.calendarDays.map(day => (
                                        <div key={`${day.dayNumber}-${day.monthIndex}`}>
                                            <p 
                                                className={`
                                                ${checkIsToday(day.date) ? classes["today-day"] : ''}
                                                ${day.monthIndex !== state.selectedMonth.monthIndex ? classes["additional-days"] : ''}
                                                ${checkDateIsEqual(day.date, value!) ? classes["selected-day"] : ''}
                                                ${classes["month-days"]}`} 
                                                onClick={() => {functions.setSelectedDay(day), selectDate(day.date)}}
                                            >
                                                { day.dayNumber }
                                            </p>
                                        </div>
                                        
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {state.mode === CalendarMods.Monthes && (
                            <div className={classes["cells__monthes"]}>
                                {state.monthesNames.map(monthesName => (
                                    <div key={monthesName.month} onClick={() => {functions.setMode('days'), functions.setSelectedMonthByIndex(monthesName.monthIndex)}}>
                                        {new Date().getMonth() === monthesName.monthIndex && state.selectedYear === new Date().getFullYear() 
                                            ? <p className={classes["current-month"]}>{ capitalize(monthesName.monthShort) }</p>
                                            : <p className={classes["additional-monthes"]}>{ capitalize(monthesName.monthShort) }</p>
                                        }
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {state.mode === CalendarMods.Years && (
                            <div className={classes["cells__years"]}>
                                {state.selectedYearsInterval.map(year => (
                                    <div key={year} onClick={() => {functions.setMode('monthes'), functions.setSelectedYear(year)}}>
                                        {
                                            new Date().getFullYear() === year
                                            ? <p className={classes["current-year"]}>{ year }</p>
                                            : <p className={classes["additional-years"]}>{ year }</p>
                                        }
                                    </div>
                                ))}
                                
                            </div>
                        )}
                        
                    </div>
                </div>
            )}
            
        </div>
    );
}