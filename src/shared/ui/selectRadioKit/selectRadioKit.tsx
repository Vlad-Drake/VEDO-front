
import { useEffect, useRef, useState } from 'react';
import classes from './selectRadioKit.module.scss';
import ArrowIco from './assets/arrow.svg';
import { useGlobalClickOutside } from '@/shared/helper/useGlobalClickOutside';

export interface SelectRadioModel{
    id: string;
    name: string;
}

export function SelectRadioKit({
    width = 'auto',
    isError,
    selected,
    options,
    placeholder = 'Выберите из списка',
    errorMessage = 'Ошибка',
    focused,
    blured,
    setId,
    setName
}:{
    width?: string,
    isError: boolean,
    selected: string | null,
    options: SelectRadioModel[],
    placeholder?: string,
    errorMessage?: string,
    focused?: () => void,
    blured?: () => void,
    setId?: (id: string) => void,
    setName?: (name: string) => void,
}) {
    const selectorContainer = useRef<HTMLDivElement | null>(null);
    const dropdownBody = useRef<HTMLDivElement | null>(null);
    const searcherInput = useRef<HTMLInputElement | null>(null);
    
    const [isSelection, setIsSelection] = useState(false);
    const [dropdownListHeight, setDropdownListHeight] = useState(550);
    const [searchText, setSearchText] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isAbove, setIsAbove] = useState(false);

    const { registerComponent, unregisterComponent } = useGlobalClickOutside();

    const ToggleDropdown = () => {
        const newIsSelection = !isSelection;
        setIsSelection(newIsSelection);

        if(newIsSelection && selectorContainer.current) {
            if(focused) focused();

            registerComponent({
                element: selectorContainer.current,
                close: () => {
                    setIsSelection(false);
                    if(blured) blured();
                },
            });
            adjustDropdownPosition();
            setTimeout(() => {
                searcherInput.current?.focus();
            }, 400); // Небольшая задержка для фокуса
        } else {
            if(blured) blured();
            setIsAbove(false);
            if(selectorContainer.current) {
                unregisterComponent(selectorContainer.current);
            }
        }
    }
    useEffect(() => {

        return (() => {
            if (selectorContainer.current) {
                unregisterComponent(selectorContainer.current);
            }
        });
    }, []);
    /*useEffect(() => {
        setFilteredOptions(options.filter(option =>
            option.name.toLowerCase().includes(searchText.toLowerCase())
        ));
        console.log('setFilteredOptions', filteredOptions)
    }, [searchText]);*/

    const adjustDropdownPosition = () => {
        //const container = document.querySelector('.selector-body');
        //const container = $refs.dropdownBody as HTMLElement;
        if (!dropdownBody.current) return;
        //if (!selectorContainer.value) return;
    
        const containerRect = dropdownBody.current.getBoundingClientRect();
        //console.log(containerRect)
        const windowHeight = window.innerHeight;
        //console.log(windowHeight)
    
        const spaceBelow = windowHeight - containerRect.bottom;
        const spaceAbove = containerRect.top;
    
        const menuHeight = 560;
    
        const above = spaceBelow < spaceAbove;
        setIsAbove(above);
    
        const availableSpace = isAbove ? spaceAbove : spaceBelow;
        const rootElement = document.documentElement;
        const rootStyles = getComputedStyle(rootElement);
        const navbarHeight = Number(rootStyles.getPropertyValue('--navbar-height').replace('px',''));
    
        setDropdownListHeight(Math.min(availableSpace - 60 - 20 - navbarHeight, menuHeight));
        //60px -> 50 размер поисковика, 10 отступ ниже list
        //20px -> отступ от navbar до list
    };

    const SelectOption = (option: SelectRadioModel) => {
        setIsSelection(false);
        if(setId) setId(option.id);
        if(setName) setName(option.name);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        setFilteredOptions(options.filter(option =>
            option.name.toLowerCase().includes(e.target.value.toLowerCase())
        ));
        console.log('setFilteredOptions', filteredOptions)
    };

    return (
        <div className={classes["input-block"]}>
            <div className={classes["selector"]} ref={selectorContainer}>
                <div 
                    onClick={ToggleDropdown}
                    className={`
                        ${classes["selector-body"]}
                        ${classes["input-body"]}
                        ${isError && classes["error-input"]}
                        ${!isError && !isSelection && classes["default-input"]}
                        ${!isError && isSelection && classes["default-input-focus"]}
                    `}
                    style={{ width }}
                    ref={dropdownBody}
                >
                    {selected != null && selected != '' && (<p>{ options.find(item => item.id == selected)?.name }</p>)}
                    {(selected == null || selected == '') && (<p className={classes["placeholder"]}>{ placeholder }</p>)}
                    <p><img src={ArrowIco} alt="" /></p>
                </div>
                
                {isSelection && (
                    <div className={`${classes["selector-list"]} ${isAbove ? classes["dropdown-menu--top"] : ''} ${"z-index-selector-list"}`}>
                        <div className={`${classes["searcher"]} ${classes["z-index-select-list-in-modal-window"]}`}>
                            <input className={classes["input"]} type="text" placeholder="поиск" onChange={handleChange} value={ searchText } ref={searcherInput} />
                        </div>
                        <div className={`
                                ${classes["list"]}
                                ${classes["scrollable"]}
                                ${classes["z-index-select-list-in-modal-window"]}
                            `}
                            style={{ width, maxHeight: dropdownListHeight + 'px' }}
                        >
                            { filteredOptions.map((option, index) => 
                                <p onClick={() => SelectOption(option)} key={`${option.id}-${index}`}>{ option.name }</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {isError && <span className={classes["error-text"]}>{ errorMessage }</span>}
        </div>
    );
}