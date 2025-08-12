import { useEffect, useRef, useState } from "react";
import ArrowIco from "./assets/arrow.svg";
import { CheckboxKit } from '@/shared/ui/checkboxKit/checkboxKit';
import styles from './listCheckboxesKit.module.scss';
import clsx from "clsx";

export function ListCheckboxesKit<T>({
  width = "auto",
  //selected,
  options,
  error = "",
  focused,
  //blured,
  update,
  getValue,
  getCheck,
  getId,
}: {
  width?: string,
  //selected: SelectCheckbox[],
  options: T[],
  error?: string,
  focused?: () => void,
  //blured?: (id: string) => void,
  update: (values: T[]) => void,
  getValue: (value: T) => string | number,
  getCheck: (value: T) => boolean,
  getId: (value: T) => string | number,
}) {
  const selectorContainer = useRef<HTMLDivElement | null>(null);
  const dropdownBody = useRef<HTMLDivElement | null>(null);
  const searcherInput = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const placeholder = useRef<string>('Ничего');

  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const ToggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen && selectorContainer.current) {
      focused?.();

      setTimeout(() => {
        searcherInput.current?.focus();
      }, 400);

    }
  };

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectorContainer.current && !selectorContainer.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);

      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const adjustDropdownPosition = (): { isAbove: boolean, dropdownListHeight: number } => {
    if (!dropdownBody.current || !isOpen) return { isAbove: false, dropdownListHeight: 550 };

    const menuHeight = 550;
    const navbarHeight = 50;

    const containerRect = dropdownBody.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const spaceBelow = windowHeight - containerRect.bottom;
    const spaceAbove = containerRect.top;
    const above = spaceBelow < spaceAbove;

    const availableSpace = above ? spaceAbove : spaceBelow;
    const dropdownListHeight = Math.min(availableSpace - 60 - 20 - navbarHeight, menuHeight)
    //60px -> 50 размер поисковика, 10 отступ ниже list
    //20px -> отступ от navbar до list
    return { isAbove: above, dropdownListHeight };
  };

  const toggleOption = (option: T) => {
    //update({...option, checked: !option.checked})
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

  function getSelectionStatus(arr: T[]): "Все" | "Ничего" | "Частично" {
    if (arr.every(v => getCheck(v))) return "Все";
    if (arr.every(v => !getCheck(v))) return "Ничего";
    return "Частично";
  }

  placeholder.current = getSelectionStatus(options);

  const filteredOptions = options.filter(option => String(getValue(option)).toLowerCase().includes(searchText.toLowerCase()));

  const { isAbove, dropdownListHeight } = adjustDropdownPosition();

  return (
    <div className={styles["input-block"]}>
      <div className={styles["selector"]} ref={selectorContainer}>
        <div
          onClick={ToggleDropdown}
          className={clsx(
            styles["selector-body"],
            styles["input-body"],
            error && styles["error-input"],
            !error && !isOpen && styles["default-input"],
            isOpen && styles["default-input-focus"])}
          style={{ width }}
          ref={dropdownBody}
        >
          {/*TODO использовать семинтически верный html, случай когда нет options*/}

          <p className={styles["placeholder"]}>Выбрано: {placeholder.current}</p>
          <p>
            <img src={ArrowIco} alt="" />
          </p>
        </div>

        {isOpen && (
          <div
            className={`${styles["selector-list"]} ${isAbove ? styles["dropdown-menu--top"] : ""} ${"z-index-selector-list"}`}
          >
            <div
              className={`${styles["searcher"]} ${styles["z-index-select-list-in-modal-window"]}`}
            >
              <input
                className={styles["input"]}
                type="text"
                placeholder="поиск"
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                ref={searcherInput}
              />
              <div className={styles["selector-all"]}>
                <CheckboxKit
                  checked={isCheckedAll}
                  onClick={toggleCheckAll}
                />
                <p>Выбрать всё</p>
              </div>
            </div>
            <div
              className={clsx(
                styles["list"],
                styles["scrollable"],
                styles["z-index-select-list-in-modal-window"])}
              style={{ width, maxHeight: dropdownListHeight + "px" }}
            >
              {filteredOptions
                .map((option, index) => (
                  <div className={styles['selector-row']} key={`${getId(option)}-${index}`}>
                    <CheckboxKit
                      checked={getCheck(option)}
                      onClick={() => toggleOption(option)}
                    />
                    <p>{getValue(option)}</p>
                  </div>

                ))}
              {options.length === 0 &&
                <p className={styles['selector-row']}>
                  здесь пусто
                </p>
              }
            </div>
          </div>
        )}
      </div>
      {error && <span className={styles["error-text"]}>{error}</span>}
    </div>
  );
}
