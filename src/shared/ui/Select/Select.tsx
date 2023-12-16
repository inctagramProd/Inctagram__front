import React, {useRef, useState, useEffect} from 'react';

interface ISelectPropsOptions {
    title: number | string;
    value: number | string;
}
interface ISelectProps {
    title?: string,
    options: Array<ISelectPropsOptions>
}
export const Select = ({
    title: title,
    options: options
}: ISelectProps) => {
    const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
    const [activeEl, setActiveEl] = useState(options[0].title);

    // Close dropdown if click outside
    const wrapperRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return (): void => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (e: { target: any; }) => {
        if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
            setIsVisibleDropdown(true);
        } else {
            setIsVisibleDropdown(false);
        }
    };

    return (
        <div className="max-w-sm relative disabled:opacity-10">
            <span className="storybook-select__title w-full text-light-900">{title}</span>
            <div
                ref={wrapperRef}
                className={`${isVisibleDropdown ? 'border-light-100' : 'border-dark-100'} focus:text-yellow-300 bg-dark-700 select-none w-full cursor-pointer text-light-100 border px-2 py-1.5 rounded-sm flex justify-between hover:text-light-900`}
            >
                <span>{activeEl}</span>
                <div className={`${isVisibleDropdown ? 'rotate-180' : 'rotate-0'} transition-transform`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.5141 9.45842C5.51364 9.22477 5.59502 8.99834 5.7441 8.81842C5.82805 8.71717 5.93115 8.63346 6.04749 8.57211C6.16384 8.51076 6.29115 8.47296 6.42212 8.46089C6.5531 8.44881 6.68517 8.46269 6.81078 8.50174C6.93638 8.54078 7.05305 8.60422 7.1541 8.68842L12.5141 13.1684L17.8841 8.84843C17.9864 8.76536 18.1041 8.70333 18.2304 8.6659C18.3568 8.62846 18.4893 8.61637 18.6203 8.63031C18.7513 8.64425 18.8783 8.68395 18.9939 8.74712C19.1096 8.81029 19.2116 8.8957 19.2941 8.99843C19.3851 9.10189 19.4538 9.22306 19.4958 9.35432C19.5378 9.48558 19.5522 9.62411 19.5381 9.7612C19.524 9.89829 19.4817 10.031 19.4139 10.151C19.3461 10.271 19.2543 10.3756 19.1441 10.4584L13.1441 15.2884C12.9652 15.4355 12.7407 15.5159 12.5091 15.5159C12.2775 15.5159 12.053 15.4355 11.8741 15.2884L5.8741 10.2884C5.75308 10.1881 5.65742 10.0607 5.59487 9.91646C5.53232 9.77225 5.50465 9.61533 5.5141 9.45842Z" fill="white"/>
                    </svg>
                </div>
            </div>

            <div className={`transition-opacity ${isVisibleDropdown ? 'opacity-1 z-10' : 'opacity-0 z-[-1]'} absolute w-full border bg-dark-500 rounded-b-sm`}>
                {
                    options.map((item) => (
                        <div
                            key={item.title}
                            onClick={() => setActiveEl(item.title)}
                            className="py-2 px-4 cursor-pointer select-none text-light-100 hover:bg-dark-300 hover:text-primary-500"
                        >
                            {item.title}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}