import { useEffect, useMemo, useState } from "react"

export type Currency = {
    currency: string,
    date: string | Date,
    price: string,
}

export default () => {
    const [currencyList, setCurrencyList] = useState<Currency[]>([]);
    const convertNumber = (amount: string, from?: string, to?: string) => (parseFloat(amount) * parseFloat(to as string)) / parseFloat(from as string);

    const currencyNameList = useMemo(() => {
        return currencyList.flatMap(e => e.currency);
    }, [currencyList]);

    useEffect(() => {
        fetch('https://interview.switcheo.com/prices.json').then(data => {
            return data.json();
        }).then(data => setCurrencyList(data)).catch(e => e);
    }, []);

    return { convertNumber, currencyNameList, currencyList };
}