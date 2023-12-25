import React, {useEffect, useState} from 'react';
import styles from './pagination.module.css';
import { Select } from './../Select/Select';
import ArrowLeft from '@/src/shared/assets/icons/ArrowLeft';
import ArrowRight from '@/src/shared/assets/icons/ArrowRight';

interface IPaginationProps {
    total: number;
    defaultCurrent?: number;
    itemsPerPage?: 10 | 20 | 30 | 50 | 100;
    onChange?: (selected: React.SetStateAction<number>) => void;
}

const transformToPagination = (number: number, selected: number) => {
    // Transform number to array of numbers
    const arr: any[] = Array.from({length: number}, (_, i) => i + 1);

    if (arr.length < 7) return arr;

    let index: number | string = arr.indexOf(selected);
    let result: any[];

    // Main algorithm
    if (index <= 2) {
        result = arr.slice(0, 5).concat(['...'], arr.slice(-1));
    } else if (index >= arr.length - 3) {
        result = arr.slice(0, 1).concat(['...'], arr.slice(-6));
    } else {
        result = arr.slice(0, 1).concat(['...'], arr.slice(index - 1, index + 2), ['...'], arr.slice(-1));
    }

    return result;
}

export const Pagination = ({
   total,
   defaultCurrent = 1,
   itemsPerPage = 10,
   onChange,
   ...props
}: IPaginationProps) => {
    const [activePage, setActivePage] = useState(defaultCurrent);
    const [pagesCount, setPagesCount] = useState(Math.ceil(total / itemsPerPage));

    const pagesArray: any[] = transformToPagination(pagesCount, activePage);

    useEffect((): void => {
        setActivePage(defaultCurrent);
        setPagesCount(Math.ceil(total / itemsPerPage));
    }, [total, defaultCurrent, itemsPerPage]);

    // Need fix
    const interFont = {
        fontFamily: 'Inter, sans-serif'
    };

    const handleSetActivePage = (page: React.SetStateAction<number>) => {
        if(page === activePage || !Number.isInteger(page)) return;
        setActivePage(page);
        if (onChange) {
            onChange(page);
        }
    }

    const PaginationPages = () => {
        const paginationElements: any = [];

        const handlePrevClick = (): void => {
            const newPage: number = Math.max(activePage - 1, 1);
            handleSetActivePage(newPage);
        };

        const handleNextClick = (): void => {
            const newPage: number = Math.min(activePage + 1, pagesCount);
            handleSetActivePage(newPage);
        };

        pagesArray.map((page: any, i: any) => {
            return paginationElements.push(
                <li
                    key={i}
                    className={`${styles.pagination__item} ${activePage === page ? styles.pagination__items_active : ''}`}
                    onClick={() => handleSetActivePage(page)}
                    tabIndex={0}
                >
                    {page}
                </li>
            );
        })

        return (
            <ul className={styles.pagination__items}>
                <li
                    className={`
                        ${styles.pagination__item} 
                        ${activePage === pagesArray[0] ? styles.pagination__items_disabled : ''}
                    `}
                    onClick={handlePrevClick}
                    tabIndex={0}
                >
                    <ArrowLeft />
                </li>
                {paginationElements}
                <li
                    className={`
                        ${styles.pagination__item} 
                        ${activePage === pagesCount ? styles.pagination__items_disabled : ''}
                        `}
                    onClick={handleNextClick}
                    tabIndex={0}
                >
                    <ArrowRight />
                </li>
            </ul>
        );
    };

    const PaginationItemsPerPage = () => {
        const itemsPerPageList: number[] = [10, 20, 30, 50, 100];
        const itemPerPageSelect: React.JSX.Element = <Select
            defaultValue={itemsPerPage}
            variant={"Pagination"}
            onChange={(selectedValue: object): void => {
                setItemsPerPage(parseInt(selectedValue.value));
                setActivePage(1);
            }}
            options={
                itemsPerPageList.map(item => {
                    return { title: item, value: item };
                })
            }
        />
        return (
            <div className={`${styles.pagination__items_per_page}`}>
                Show {itemPerPageSelect} on page
            </div>
        )
    }

    return (
        <div style={interFont} className={`${styles.pagination}`} {...props}>
            <PaginationPages />
            <PaginationItemsPerPage />
        </div>
    );
}