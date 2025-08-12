import { useEffect, useRef, useState } from "react";
import ArrowIco from "./assets/arrow.svg";
import styles from "./selectKit.module.scss";
import { clsx } from 'clsx';

export function SelectKit<T extends { id: string | number }, V extends string | number, I extends string | number>({
  width = "auto",
  selectedId,
  options,
  placeholder = "Выберите из списка",
  error,
  getValue,
  getId,
  onFocus,
  onBlur,
  updateId,
  updateValue,
}: {
  width?: string,
  selectedId: I | null,
  options: T[],
  placeholder?: string,
  error?: string,
  getValue: (value: T) => V,
  getId: (value: T) => I,
  onFocus?: () => void,
  onBlur?: (id: I | null) => void,
  updateId?: (id: I) => void,
  updateValue?: (value: V) => void,
}) {
  const selectorContainer = useRef<HTMLDivElement | null>(null);
  const dropdownBody = useRef<HTMLDivElement | null>(null);
  const searcherInput = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const ToggleDropdown = () => {
    const newIsOpen = !isOpen
    setIsOpen(newIsOpen);

    if (newIsOpen && selectorContainer.current) {
      onFocus?.();

      setTimeout(() => {
        searcherInput.current?.focus();
      }, 400); // Небольшая задержка для фокуса
    }
  };

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectorContainer.current && !selectorContainer.current.contains(event.target as Node)) {
          setIsOpen(false);
          onBlur?.(selectedId);
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

  const SelectOption = (option: T) => {
    updateId?.(getId(option));
    updateValue?.(getValue(option));
    onBlur?.(getId(option));
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option => String(getValue(option)).toLowerCase().includes(searchText.toLowerCase()));

  const selectedValue = options.find((item) => item.id == selectedId) ? getValue(options.find((item) => item.id == selectedId)!) : '';

  const { isAbove, dropdownListHeight } = adjustDropdownPosition();

  return (
    <div className={styles["input-block"]}>
      <div className={styles["selector"]} ref={selectorContainer}>
        <div
          onClick={ToggleDropdown}
          className={
            clsx(styles["selector-body"],
              styles["input-body"],
              error && styles["error-input"],
              !error && !isOpen && styles["default-input"],
              isOpen && styles["default-input-focus"]
            )}
          style={{ width }}
          ref={dropdownBody}
        >
          {selectedId != null && selectedId != "" && (
            <p>{selectedValue}</p>
          )}
          {(selectedId == null || selectedId == "") && (
            <p className={styles["placeholder"]}>{placeholder}</p>
          )}
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
            </div>
            <div
              className={clsx(styles["list"], styles["scrollable"], styles["z-index-select-list-in-modal-window"])}
              style={{ width, maxHeight: dropdownListHeight + "px" }}
            >
              {filteredOptions
                .map((option, index) => (
                  <p
                    onClick={() => SelectOption(option)}
                    key={`${option.id}-${index}`}
                  >
                    {getValue(option)}
                  </p>
                ))}
              {options.length === 0 &&
                <h4 className="">
                  здесь пусто
                </h4>
              }
            </div>
          </div>
        )}
      </div>
      {error && <span className={styles["error-text"]}>{error}</span>}
    </div>
  );
}
