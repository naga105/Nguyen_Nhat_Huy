// Can Add more linefeed for more readable code
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: BlockchainType;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Extract blockchain to be an enum list so it easier to iterate then using switch case
const BLOCKCHAIN = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const

type BlockchainType = keyof typeof BLOCKCHAIN;

type BoxProps = {};

interface Props extends BoxProps {
  children: React.ReactNode;
}

const WalletPage: React.FC<Props> = (props: Props) => {
  // children is being destruct here but never use in the component, either remove this or include this below
  const { children, ...rest } = props;
  // add type annotations for these extract value from hooks.
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Record<string, number> = usePrices();

  // remove return infer number to be more type strict (will return a set of number rather than type number itself)
  // remove any type for props blockchain type
  const getPriority = (blockchain?: BlockchainType) => {
    if (!blockchain) return -99
    // remove switch case for more perf orient
    return BLOCKCHAIN[blockchain];
  }
  // Reduce sort logic for clean code
  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount <= 0).
      sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(lhs.blockchain) - getPriority(rhs.blockchain))
    // remove un-related dependency [prices] 
  }, [balances]);

  // added useMemo for rows callback memo render to be skipped if unrelated state change
  const rows = useMemo(() => sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        // unknown variable 
        className={classes.row}
        key={`${balance.blockchain}-${balance.currency}-${balance.amount}-${index}`}  // not reccomend using index solely for map key
        amount={balance.amount}
        usdValue={usdValue}
        // added formatted directly here and remove formattedBalances.
        formattedAmount={balance.amount.toFixed()}
      />
    )
  }), [sortedBalances, prices]);

  return (
    <div {...rest}>
      {rows}
      {children}
    </div>
  )
}