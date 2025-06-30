import { useState } from 'react';
import classes from './listCheckboxKit.module.scss';
import { CheckboxKit } from '@/shared/ui/checkboxKit/checkboxKit';
import { SkeletonKit } from '../skeleton-kit';

export interface ListCheckboxModel {
    id: string | number;
    name: string;
    checked: boolean;
}

export function ListCheckboxKit<T>({
    width = 'auto',
    height = 'auto',
    options,
    update,
    isLoading,
    getId,
    getValue,
    getCheck,
}: {
    width?: string,
    height?: string,
    options: T[],
    update: (item: T[]) => void,
    isLoading: boolean,
    getId: (val: T) => number | string,
    getValue: (val: T) => number | string,
    getCheck: (val: T) => boolean,
}) {
    const [searchText, setSearchText] = useState("");
    const [isCheckedAll, setIsCheckedAll] = useState(false);

    const toggleOption = (option: T) => {
        const newSigners = [...options];
        const idx = newSigners.findIndex(item => getId(item) === getId(option))
        newSigners[idx] = {
            ...newSigners[idx],
            checked: !getCheck(option)
        };
        update(newSigners);
    };

    const toggleCheckAll = () => {
        setIsCheckedAll(!isCheckedAll);
        if (!isCheckedAll) {
            const newSigners = options.map(item => ({
                ...item,
                checked: true,
            }));
            update(newSigners);
        } else {
            const newSigners = options.map(item => ({
                ...item,
                checked: false,
            }));
            update(newSigners);
        }
    }

    const filteredOptions = options.filter(option => String(getValue(option)).toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div style={{ width, height }} className={classes['list_wrapper']}>
            {!isLoading && <div className={classes["searcher"]}>
                <input
                    className={classes["input"]}
                    type="text"
                    placeholder="поиск"
                    onChange={e => setSearchText(e.target.value)}
                    value={searchText}
                />
                <div className={classes["selector-all"]}>
                    <CheckboxKit
                        checked={isCheckedAll}
                        onClick={toggleCheckAll}
                    />
                    <p>Выбрать всё</p>
                </div>
            </div>}

            <div className={`${classes["list"]} ${classes["scrollable"]}`}>
                {!isLoading && filteredOptions
                    .map(option => (
                        <div className={classes["list__row"]} key={getId(option)}>
                            <CheckboxKit
                                checked={getCheck(option)}
                                onClick={() => toggleOption(option)}
                            />
                            <p>{getValue(option)}</p>
                        </div>
                    ))}
                {isLoading &&
                    <div>
                        {[...Array(3)].map((_, index) =>
                            <div key={index} className={classes["list__row"]}>
                                <SkeletonKit type='text' />
                            </div>)
                        }
                    </div>
                }
            </div>
        </div >
    );
}