import useCurrency, { Currency } from "@hooks/useCurrency";
import { useState } from "react";
import Input from "./Input";
import Dropdown from "./Dropdown";

export default () => {
    const [amount, setAmount] = useState<string>("");
    const [fromCurrency, setFromCurrency] = useState<Currency>();
    const [toCurrency, setToCurrency] = useState<Currency>();
    const [convertString, setConvertString] = useState<string>("")
    const { currencyList, convertNumber } = useCurrency();

    const convertAction = () => {
        const converted = convertNumber(amount, fromCurrency?.price, toCurrency?.price);
        if (isNaN(converted)) {
            if (!!!amount.length) return window.alert('Amount missing');
            if (!fromCurrency) return window.alert('convert From Currency missing');
            if (!toCurrency) return window.alert('convert To Currency missing');
        }

        setConvertString(`Convert $${amount} from ${fromCurrency?.currency} to ${toCurrency?.currency}: $${converted}`);
    }

    return <div className="relative bg-white text-zinc-600 p-8 w-[75rem] rounded-xl flex flex-col gap-6">
        <div className="relative grid grid-cols-1 grid-rows-1 md:grid-cols-[33%_1fr] md:grid-rows-[none] gap-7 md:gap-2">
            <Input id="amount" label="Amount" setAmount={(value: string) => { setAmount(value) }}></Input>
            <div className="relative flex flex-col justify-evenly gap-2 md:flex-row">
                <Dropdown list={currencyList.filter(currency => currency.currency !== toCurrency?.currency)} currentValue={fromCurrency?.currency as string} setCurrency={(value: Currency) => { setFromCurrency(value) }} id="from" label="From"></Dropdown>
                <Dropdown list={currencyList.filter(currency => currency.currency !== fromCurrency?.currency)} currentValue={toCurrency?.currency as string} setCurrency={(value: Currency) => { setToCurrency(value) }} id="to" label="To"></Dropdown>
            </div>
        </div>
        <div className="flex justify-between flex-col md:flex-row gap-6">
            <div>
                {convertString}
            </div>
            <div
                onClick={convertAction}
                className="w-full rounded-xl cursor-pointer bg-blue px-6 py-3 text-center text-base font-semibold text-white transition-colors duration-200 bg-blue-600 hover:bg-blue-400 md:w-[234px]">
                Convert Currency
            </div>
        </div>
    </div>
}
