import { useEffect, useRef, useState } from "react";
import classes from "./selectRadioKit.module.scss";
import ArrowIco from "./assets/arrow.svg";
import { useGlobalClickOutside } from "@/shared/helper/useGlobalClickOutside";

export interface SelectRadioModel {
  id: string | number;
  name: string;
}

export function SelectRadioKit({
  width = "auto",
  selectedId,
  options,
  placeholder = "Выберите из списка",
  error = "",
  focused,
  blured,
  updateId,
  updateName,
}: {
  width?: string;
  selectedId: string | number | null;
  options: SelectRadioModel[];
  placeholder?: string;
  error?: string;
  focused?: () => void;
  blured?: (id: string | number) => void;
  updateId?: (id: string | number) => void;
  updateName?: (name: string) => void;
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
  const localSelectedIdRef = useRef<string | number | null>(selectedId);
  const { registerComponent, unregisterComponent } = useGlobalClickOutside();

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const ToggleDropdown = () => {
    const newIsSelection = !isSelection;
    setIsSelection(newIsSelection);

    if (newIsSelection && selectorContainer.current) {
      if (focused) focused();

      registerComponent({
        element: selectorContainer.current,
        close: () => {
          setIsSelection(false);
          if (blured) blured(localSelectedIdRef.current ?? "");
        },
      });
      adjustDropdownPosition();
      setTimeout(() => {
        searcherInput.current?.focus();
      }, 400); // Небольшая задержка для фокуса
    } else {
      if (blured) blured(localSelectedIdRef.current ?? "");
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
    
        const availableSpace = above ? spaceAbove : spaceBelow;
        //const rootElement = document.documentElement;
        //const rootStyles = getComputedStyle(rootElement);
        const navbarHeight = 50;//Number(rootStyles.getPropertyValue('--navbar-height').replace('px',''));
        //console.log(availableSpace, above, spaceAbove, spaceBelow)
        setDropdownListHeight(Math.min(availableSpace - 60 - 20 - navbarHeight, menuHeight));
        //60px -> 50 размер поисковика, 10 отступ ниже list
        //20px -> отступ от navbar до list
    };

  const SelectOption = (option: SelectRadioModel) => {
    localSelectedIdRef.current = option.id;
    if (updateId) updateId(option.id);
    if (updateName) updateName(option.name);
    setIsSelection(false);
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
          {selectedId != null && selectedId != "" && (
            <p>{options.find((item) => item.id == selectedId)?.name}</p>
          )}
          {(selectedId == null || selectedId == "") && (
            <p className={classes["placeholder"]}>{placeholder}</p>
          )}
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
                <p
                  onClick={() => SelectOption(option)}
                  key={`${option.id}-${index}`}
                >
                  {option.name}
                </p>
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
