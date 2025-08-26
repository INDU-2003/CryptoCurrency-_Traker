import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$",
    });

    const fetchAllCoin = async () => {
        try {
            const options = {
                method: "GET",
                headers: {
                accept: "application/json",
                    "x-cg-demo-api-key": "CG-a2MqUYasC5fLneRy7nodAY3F",
                },
            };

            const response = await fetch(
             `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
                options
            );
            const data = await response.json();
            setAllCoin(data); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]); // Re-fetch when currency changes

    const contextValue = { allCoin, currency, setCurrency };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
