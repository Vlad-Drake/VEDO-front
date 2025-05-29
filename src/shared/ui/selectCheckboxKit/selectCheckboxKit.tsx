import { useEffect, useRef, useState } from "react";
import classes from "./selectCheckboxKit.module.scss";
import ArrowIco from "./assets/arrow.svg";
import { useGlobalClickOutside } from "@/shared/helper/useGlobalClickOutside";
import Checkbox_ico from './assets/checkbox.svg';

export interface SelectCheckboxModel {
  id: string | number;
  name: string;
  checked: boolean;
}

export function SelectCheckboxKit({
  width = "auto",
  //selected,
  options,
  error = "",
  focused,
  blured,
  update,
}: {
  width?: string;
  //selected: SelectCheckbox[];
  options: SelectCheckboxModel[];
  error?: string;
  focused?: () => void;
  blured?: (id: string) => void;
  update: (item: SelectCheckboxModel[]) => void;
}) {
  const selectorContainer = useRef<HTMLDivElement | null>(null);
  const dropdownBody = useRef<HTMLDivElement | null>(null);
  const searcherInput = useRef<HTMLInputElement | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const [isSelection, setIsSelection] = useState(false);
  const [dropdownListHeight, setDropdownListHeight] = useState(550);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isAbove, setIsAbove] = useState(false);
  const [placeholder, setPlaceholder] = useState<string>('Ничего');
  
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const { registerComponent, unregisterComponent } = useGlobalClickOutside();

  useEffect(() => {
    setFilteredOptions(options);
    setPlaceholder(getSelectionStatus(options));
  }, [options]);

  function getSelectionStatus(arr: SelectCheckboxModel[]): "Все" | "Ничего" | "Частично" {
    if (arr.every(v => v.checked)) return "Все";
    if (arr.every(v => !v.checked)) return "Ничего";
    return "Частично";
  }

  const ToggleDropdown = () => {
    const newIsSelection = !isSelection;
    setIsSelection(newIsSelection);

    if (newIsSelection && selectorContainer.current) {
      if (focused) focused();

      registerComponent({
        element: selectorContainer.current,
        close: () => {
          setIsSelection(false);
          //if (blured) blured(localSelectedIdRef.current ?? "");
        },
      });
      adjustDropdownPosition();
      setTimeout(() => {
        searcherInput.current?.focus();
      }, 400); // Небольшая задержка для фокуса
    } else {
      //if (blured) blured(localSelectedIdRef.current ?? "");
      setIsAbove(false);
      if (selectorContainer.current) {
        unregisterComponent(selectorContainer.current);
      }
    }
  };
  useEffect(() => {
    return () => {
      if (selectorContainer.current) {
        unregisterComponent(selectorContainer.current);
      }
    };
  }, []);

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

    const availableSpace = above ? spaceAbove : spaceBelow;
    //const rootElement = document.documentElement;
    //const rootStyles = getComputedStyle(rootElement);
    const navbarHeight = 50;//Number(rootStyles.getPropertyValue('--navbar-height').replace('px',''));
    //console.log(availableSpace, above, spaceAbove, spaceBelow)
    setDropdownListHeight(Math.min(availableSpace - 60 - 20 - navbarHeight, menuHeight));
    //60px -> 50 размер поисковика, 10 отступ ниже list
    //20px -> отступ от navbar до list
  };

  const toggleOption = (option: SelectCheckboxModel) => {
    //update({...option, checked: !option.checked})
    const newSigners = [...options];
      const idx = newSigners.findIndex(item => item.id === option.id)
      newSigners[idx] = {
          ...newSigners[idx],
          checked: !option.checked
    };
    update(newSigners);
    setPlaceholder(getSelectionStatus(options));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setSearchText(e.target.value);
    if(debounceTimer.current) {
        clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
        
        setFilteredOptions(options.filter(option =>
            option.name.toLowerCase().includes(e.target.value.toLowerCase())
        ));
    }, 600);
  };

  useEffect(() => {
    return (() => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    }) as () => void;
  }, []);

  const toggleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
    if(!isCheckedAll) {
      const newSigners = options.map(item => ({
        ...item,
        checked: true,
      }));
      update(newSigners);
      setPlaceholder("Все");
    } else {
      const newSigners = options.map(item => ({
        ...item,
        checked: false,
      }));
      update(newSigners);
      setPlaceholder("Ничего");
    }
  }

  return (
    <div className={classes["input-block"]}>
      <div className={classes["selector"]} ref={selectorContainer}>
        <div
          onClick={ToggleDropdown}
          className={`
                        ${classes["selector-body"]}
                        ${classes["input-body"]}
                        ${error && classes["error-input"]}
                        ${!error && !isSelection && classes["default-input"]}
                        ${isSelection && classes["default-input-focus"]}
                    `}
          style={{ width }}
          ref={dropdownBody}
        >
          {/*TODO использовать семинтически верный html, случай когда нет options*/}
          
          <p className={classes["placeholder"]}>Выбрано: {placeholder}</p>
          <p>
            <img src={ArrowIco} alt="" />
          </p>
        </div>

        {isSelection && (
          <div
            className={`${classes["selector-list"]} ${isAbove ? classes["dropdown-menu--top"] : ""} ${"z-index-selector-list"}`}
          >
            <div
              className={`${classes["searcher"]} ${classes["z-index-select-list-in-modal-window"]}`}
            >
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
            <div
              className={`
                          ${classes["list"]}
                          ${classes["scrollable"]}
                          ${classes["z-index-select-list-in-modal-window"]}
                        `}
              style={{ width, maxHeight: dropdownListHeight + "px" }}
            >
              {filteredOptions.map((option, index) => (
                <div className={classes['selector-row']} key={`${option.id}-${index}`}>
                  <div
                    className={`${classes["checkbox-wrapper"]} ${option.checked ? classes['checked'] : ''}`}
                    onClick={() => toggleOption(option)}
                  >
                    <div className={classes["checkbox"]}>
                        {option.checked && (<img src={Checkbox_ico} alt="" className={classes["checkmark"]} />)}
                    </div>
                  </div>
                  <p>{ option.name }</p> 
                </div>
                   
              ))}
              {filteredOptions.length === 0 && 
                <p>
                  здесь пусто
                </p>
              }
            </div>
          </div>
        )}
      </div>
      {error && <span className={classes["error-text"]}>{error}</span>}
    </div>
  );
}
