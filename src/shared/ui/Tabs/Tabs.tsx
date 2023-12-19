import React, {useEffect, useRef, useState} from 'react';
import styles from './tabs.module.css';

interface ITabProps {
    options: {
        key: string;
        label: string;
    }[];
    disabled?: boolean;
    defaultValue?: string;
    onChange?: (selectedValue: object) => void;
}

export const Tabs = ({
     options,
     defaultValue,
     disabled = false,
     onChange,
     ...props
}: ITabProps) => {
    const [activeTab, setActiveTab] = useState('Option_1');

    const handleTabClick = (e: { target: any; }): void => {
        const activeTabKey = e.target.getAttribute('data-key'),
              activeTabOffset = e.target.offsetLeft,
              activeTabWidth = e.target.offsetWidth;

        setActiveTab(activeTabKey);
        changeTabSliderPosition(activeTabOffset, activeTabWidth);
    }

    const sliderRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const changeTabSliderPosition = (offsetLeft: number, width: number) => {
        if(!sliderRef || !sliderRef.current) return;
        sliderRef.current.style.transform = 'translateX(' + offsetLeft + 'px' + ')';
        sliderRef.current.style.width = width + 'px';
    }

    return (
        <div className={`${styles.tabs}`}>
            <div className={`${styles.tabs_wrapper}`}>
                {
                    options.map((item, key: number) => {
                        return <div
                                role={"tab"}
                                aria-selected={"true"}
                                tabIndex={0}
                                key={item.key}
                                data-index={key}
                                data-key={item.key}
                                onClick={handleTabClick}
                                className={`${styles.tab} ${activeTab == item.key ? styles.tab_active : ''}`}
                            >
                                {item.label}
                            </div>
                    })
                }
            </div>
            <div ref={sliderRef} className={`${styles.tabs_slider}`}></div>
        </div>
    )
}