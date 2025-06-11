import { useState } from 'react';
import classes from './listCheckboxKit.module.scss';
import { CheckboxKit } from '@/shared/ui/checkboxKit/checkboxKit';
import { useDebounceInput } from '@/shared/helper/debounceInput';

export interface ListCheckboxModel {
    id: string | number;
    name: string;
    checked: boolean;
}

export function ListCheckboxKit({
    width = 'auto',
    height = 'auto',
    options,
    update,
}: {
    width?: string,
    height?: string,
    options: ListCheckboxModel[],
    update: (item: ListCheckboxModel[]) => void,
}) {
    const [searchText, setSearchText] = useState("");
    const [laggingSearchText, setLaggingSearchText] = useState("");
    const [isCheckedAll, setIsCheckedAll] = useState(false);

    const debounceInput = useDebounceInput();

    const toggleOption = (option: ListCheckboxModel) => {
        //update({...option, checked: !option.checked})
        const newSigners = [...options];
        const idx = newSigners.findIndex(item => item.id === option.id)
        newSigners[idx] = {
            ...newSigners[idx],
            checked: !option.checked
        };
        update(newSigners);
        //setPlaceholder(getSelectionStatus(options));
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        debounceInput(() => {
            setLaggingSearchText(searchText);
        });
    };

    return (
        <div style={{ width, height }} className={classes['list_wrapper']}>
            <div className={classes["searcher"]}>
                <input
                    className={classes["input"]}
                    type="text"
                    placeholder="поиск"
                    onChange={handleChange}
                    value={searchText}
                />
                <div className={classes["selector-all"]}>
                    <CheckboxKit
                        checked={isCheckedAll}
                        onClick={toggleCheckAll}
                    />
                    <p>Выбрать всё</p>
                </div>
            </div>

            <div className={`${classes["list"]} ${classes["scrollable"]}`}>
                {options && options
                    .filter(option =>
                        option.name.toLowerCase().includes(laggingSearchText.toLowerCase())
                    )
                    .map(option => (
                        <div className={classes["list__row"]} key={option.id}>
                            <CheckboxKit
                                checked={option.checked}
                                onClick={() => toggleOption(option)}
                            />
                            <p>{option.name}</p>
                        </div>
                    ))}
            </div>
        </div >
    );
}