import { Currency } from "@/hooks/useCurrency";
import { ReactNode, useEffect, useRef, useState } from "react";

type DropdownSelectProps = {
    id: string,
    label: ReactNode,
    list: Currency[],
    currentValue: string,
    setCurrency: (value: Currency) => void
}

export default ({ id, label, list, currentValue, setCurrency }: DropdownSelectProps) => {
    const [isFocus, setIsFocus] = useState(false);
    const inputRef = useRef(null);

    function toggle(e: any) {
        setIsFocus(e && e.target === inputRef.current);
    }

    useEffect(() => {
        document.addEventListener("click", toggle);
        return () => document.removeEventListener("click", toggle);
    }, []);

    return <label htmlFor={id} className="relative text-left h-[5.5rem] z-10 min-w-[20rem] rounded-lg border border-solid border-gray-200 bg-white px-4 py-2 text-2xl font-semibold text-gray-400 hover:bg-gray-100 has-[input:focus]:outline has-[input:focus]:outline-2 has-[input:focus]:outline-blue-400" onClick={toggle} onBlur={() => setIsFocus(false)}>
        <span className="text-sm text-gray-600 font-semibold">{label}</span>
        <div className="flex gap-1 width-full h-full text-slate-800 z-0 select-none" ref={inputRef}>
            {currentValue}
            {isFocus && <ul className="absolute top-[100%] left-0 w-full max-h-[20rem] overflow-auto shadow-xl bg-white">
                {list?.map((currency: Currency, index: number) => <li key={currency.currency + index} className={"flex items-center px-4 py-4 text-sm hover:bg-gray-100 cursor-pointer"} onClick={() => { setCurrency(currency) }}>{currency.currency}</li>)}
            </ul>}
        </div>
    </label>
}
