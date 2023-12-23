import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import s from './DatePicker.module.css'

type PropsType = {
    onChange?: (value: string) => void;
};

export const UIDatePicker: React.FC<PropsType> = ({onChange}) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        if (date !== null) {
            setStartDate(date);
            if (onChange) {
                onChange(date.toISOString());
            }
        }
    };

    return <DatePicker selected={startDate}
                       onChange={handleDateChange}
                       className={`custom-datepicker`}
                       calendarStartDay={1}
    />;
};
