// react
import { useState, useEffect } from 'react'
// redux-react
import { useDispatch } from 'react-redux'
// utils
import { updateStatusOfPriceFromSupabase } from '../../../../utils/price'
// headlessUI
import { Switch } from '@headlessui/react'
//store
import { priceSliceAction } from '../../../../store/priceStore/price-redux'

const SwitchPrice = ({ id, status }) => {
	const dispatch = useDispatch()
	const [enabled, setEnabled] = useState(status)

	const onSwitchChangeHandler = () => {
		updateStatusOfPriceFromSupabase(id, status).then(response => {
			console.log(response)
			dispatch(priceSliceAction.changeSwitchState())
		})
		setEnabled(!enabled)
	}

	return (
		<Switch
			checked={enabled}
			onChange={onSwitchChangeHandler}
			className={`${enabled ? 'bg-pharmacy-color-3' : 'bg-pharmacy-color-1'}
relative inline-flex h-[20px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
		>
			<span className='sr-only'>Use setting</span>
			<span
				aria-hidden='true'
				className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
			/>
		</Switch>
	)
}

export default SwitchPrice
