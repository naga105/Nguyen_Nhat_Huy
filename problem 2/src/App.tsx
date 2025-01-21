import './App.css'
import CurrencySwapForm from '@components/CurrencySwapForm'

function App() {
  return (
    <div className='relative bg-gradient-to-r text-white from-cyan-600 to-emerald-700  min-h-screen pt-[2rem]'>
      <p className="text-2xl font-bold">Currency Swap Form</p>
      <div className='flex justify-center p-8'>
        <CurrencySwapForm/>
      </div>
    </div>
  )
}

export default App
