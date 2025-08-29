import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

const isNumber = (e:any) => {
  let key = e.target;
  let maxlength = key.maxLength ? key.maxLength : 0;

  let max = Number(key.max ? key.max : key.value);
  if (Number(key.value) > max) key.value = max;

  // let min = key.min;
  // if (min && Number(key.value)<Number(min)) key.value = min;


  if (maxlength > 0) {
    if (key.value.length > maxlength) key.value = key.value.slice(0, maxlength);
  }

  key.value = key.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");

  return key.value;
};

const OptionDropdown = ({isSearch=true, isLoading = false,position='absolute', isCreate = false, type = 'text', searchText = 'Search', maxlength = undefined, minlength = undefined, disabled = false, options = [], className = '', placeholder, value = '', displayValue = 'name', valueType = 'string', onChange = (_:any) => { } }:any) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<any>(null);
    const dropdownRef = useRef<any>(null);

    // This state stores the position of the button to place dropdown accordingly
    const [dropdownStyle, setDropdownStyle] = useState({});
    const [search, setSearch] = useState('');



    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const scrollX = position == 'fixed' ? (window.screenX || window.screenLeft) : (window.scrollX)
            const scrollY = position == 'fixed' ? (window.screenY || window.screenTop) : (window.scrollY)
            const rect = buttonRef.current.getBoundingClientRect();

            let left=rect.left + scrollX
            let top=rect.bottom + scrollY
            if(position=='fixed'){
                left=rect.left
                top=rect.bottom
            }
      
            setSearch('')
            setDropdownStyle({
                position:position,
                top: `${top}px`,
                left: `${left}px`,
                minWidth: `${rect.width}px`,
                zIndex: 9999,
                background: "white",
            });
        }
    }, [isOpen]);

    const handleChange = (option:any) => {
        if(option?.onClick) option.onClick(option)
        let e=option.id
        let v = e;
        if (valueType == "object") {
            v = options.find((itm:any) => itm.id == e);
        }
        setIsOpen(false);
        onChange(v)
    };

    const selected = useMemo(() => {
        let v = {
            color: '',
            className: '',
            id: value,
            [displayValue]: value || placeholder || 'Select'
        }
        let ext:any = options.find((itm:any) => itm.id == value)
        if (ext) v = {
            color: '',
            className: '',
            ...ext
        }
        return v
    }, [placeholder, options, displayValue, value])

    const list = useMemo(() => {
        let arr = [...options]
        arr = arr.filter((itm:any) => itm[displayValue]?.toLowerCase()?.includes(search?.toLowerCase().trim()))
        return arr
    }, [options, search])

    const createClick = () => {
        if (valueType == "object") {
            onChange({
                id: search,
                [displayValue]: search
            })
        } else {
            onChange(search)
        }
        setIsOpen(false);
    }

    const onSearch = (e:any) => {
        let v = ''
        if (type == 'number') {
            v = isNumber(e)
        } else {
            v = e.target.value
        }
        setSearch(v)
    }

    return (
        <>

            <button
                type="button"
                disabled={disabled}
                ref={buttonRef}
                onClick={() => setIsOpen((prev) => !prev)}
                className={`relative border border-[#e5e7eb] px-4 shadow-box bg-white  text-[#333] w-full rounded-lg h-10 flex items-center text-left text-sm gap-2 z-9 overflow-hidden px-2 ${className}`}
            >
                <div className={`truncate w-full border-r border-[#cccccc] pr-3 ${selected.color ? `text-[${selected.color}]` : ''} ${selected.className || ''}`}>
                    {selected[displayValue]}
                </div>
                <span className="material-symbols-outlined">arrow_drop_down</span>

            </button>

            {isOpen &&
                createPortal(
                    <div ref={dropdownRef} >
                        <div className="fixed w-full h-full  z-[9999] top-0 left-0" onClick={() => setIsOpen(false)}></div>
                        <div style={dropdownStyle} className="rounded-[5px] border-2 mt-2 border-primary shadow">
                            {isSearch ? <>
                                <div className="p-[4px] relative">
                                    <input type="text" maxLength={maxlength} minLength={minlength} className="w-full border px-[10px] py-[4px] rounded" placeholder={searchText} value={search} onChange={e => onSearch(e)} />
                                    {search ? <span className="material-symbols-outlined cursor-pointer absolute top-[12px] text-[14px] right-[7px]"
                                        onClick={() => setSearch('')}
                                    >close</span> : <></>}
                                </div>
                            </> : <></>}
                            
                            <div className="overflow-auto max-h-[180px] text-[14px]">
                                {isLoading ? <>
                                    <div className="px-[12px] py-[8px] text-center">Loading...</div>
                                </> : <>
                                    {isCreate && search ? <>
                                        <div
                                            onClick={() => {
                                                createClick()
                                            }}
                                            className={`px-[12px] py-[8px] border-b cursor-pointer`}
                                        >
                                            Click here to add "{search}"
                                        </div>
                                    </> : <></>}
                                    {list.map((option:any,i:any) => (
                                        <div
                                            key={option.id||i}
                                            onClick={() => (option.id != value) ? handleChange(option) : {}}
                                            className={`px-[12px] py-[8px] border-b cursor-pointer ${value == option.id ? 'bg-primary text-white' : ''} ${option.color ? `text-[${option.color}]` : ''} ${option.className || ''}`}
                                        >
                                            {option[displayValue]}
                                        </div>
                                    ))}
                                    {!list.length ? <>
                                        <div className="px-[12px] py-[8px] text-center text-gray-600">No Options</div>
                                    </> : <></>}
                                </>}

                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default OptionDropdown;
