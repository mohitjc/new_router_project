import { memo, useEffect, useRef } from "react";
import { isNumber } from "~/utils/shared";

function DebouncedInput({ type = 'text', value = '', onChange = (_: any) => { }, className = '', time = 500, placeholder = '', required = false, id = '' }) {
    const timeout = useRef<any>(null)
    const inputRef = useRef<any>(null)

    const inputChange = (e: any) => {
        // onChange(e)
    }

    useEffect(() => {
        inputRef.current?.addEventListener("input", function (e: Event) {
            clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                const target = e.target as HTMLInputElement;
                onChange(target.value)
            }, time);
        })
    }, [])

    useEffect(() => {
        inputRef.current.value = value
    }, [value])

    return <>
        <input type="text"
            ref={inputRef}
            id={id}
            onChange={e => inputChange(type == 'number' ? isNumber(e) : e.target.value)}
            placeholder={placeholder}
            className={className}
            required={required}
        />
    </>

}

export default memo(DebouncedInput)