import { ReactNode, useCallback } from "react";

type InputType = {
    id: string,
    label: ReactNode,
    setAmount: (valu: string) => void
}

export default ({ id, label , setAmount }: InputType) => {
    const onInputChange = useCallback((value: string)=>{
        setAmount(value);
    },[])
    return <label htmlFor={id} className="relative text-left h-[5.5rem] rounded-lg border border-solid border-gray-200 bg-white px-4 py-2 text-2xl font-semibold text-gray-400 hover:bg-gray-100 has-[input:focus]:outline has-[input:focus]:outline-2 has-[input:focus]:outline-blue-400">
        <span className="text-sm text-gray-600 font-semibold" >{label}</span>
        <div className="flex gap-1 width-full overflow-hidden text-slate-800">
          $
          <input type="number" min="0" id={id} inputMode="decimal" onChange={(event) => onInputChange(event.target.value)} className="border-none outline-none hover:bg-gray-100 bg-white overflow-hidden max-w-[20rem]" />
        </div>
    </label>
}
