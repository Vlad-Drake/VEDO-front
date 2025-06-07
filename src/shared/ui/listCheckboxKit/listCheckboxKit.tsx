import { useRef, useState } from 'react';
import classes from './listCheckboxKit.module.scss';
import Checkbox_ico from './assets/checkbox.svg';

export interface ListCheckboxModel {
    id: string | number;
    name: string;
    checked: boolean;
}

export function ListCheckboxKit({
    width = 'auto',
    options,
    update,
}: {
    width?: string,
    options: ListCheckboxModel[],
    update: (item: ListCheckboxModel[]) => void,
}) {

    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [searchText, setSearchText] = useState("");
    //const [filteredOptions, setFilteredOptions] = useState<ListCheckboxModel[]>(options);
    const searcherInput = useRef<HTMLInputElement | null>(null);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

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
            /*const newSigners = options.map(item => ({
                ...item,
                checked: true,
            }));*/
            //update(newSigners);
            //setPlaceholder("Все");
        } else {
            /*const newSigners = options.map(item => ({
                ...item,
                checked: false,
            }));*/
            //update(newSigners);
            //setPlaceholder("Ничего");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        //setSearchText(e.target.value);
        if(debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            setSearchText(e.target.value);
            /*setFilteredOptions(options.filter(option =>
                option.name.toLowerCase().includes(e.target.value.toLowerCase())
            ));*/
        }, 600);
    };

    return (
        <div style={{ width }} className={classes["list-checkbox-wrapper"]}>
            <div className={classes["searcher"]}>
                <input
                    className={classes["input"]}
                    type="text"
                    placeholder="поиск"
                    onChange={handleChange}
                    value={searchText}
                    ref={searcherInput}
                />
                <div className={classes["selector-all"]}>
                    <div
                        className={`${classes["checkbox-wrapper"]} ${isCheckedAll ? classes['checked'] : ''}`}
                        onClick={toggleCheckAll}
                    >
                        <div className={classes["checkbox"]}>
                            {isCheckedAll && (<img src={Checkbox_ico} alt="" className={classes["checkmark"]} />)}
                        </div>
                    </div>
                    <p>Выбрать всё</p>
                </div>
            </div>

            <div className={classes["list scrollable"]}>
                {options
                    .filter(option => option.name.toLowerCase().includes(searchText.toLowerCase()))
                    .map(option => (
                    <div className={classes["list__row"]} key={option.id}>
                        <div
                            className={`${classes["checkbox-wrapper"]} ${option.checked ? classes['checked'] : ''}`}
                            onClick={() => toggleOption(option)}
                        >
                            <div className={classes["checkbox"]}>
                                {option.checked && (<img src={Checkbox_ico} alt="" className={classes["checkmark"]} />)}
                            </div>
                        </div>
                        <p>{option.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}