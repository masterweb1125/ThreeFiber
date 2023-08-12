import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useStore from '../../store'
import { defaultColors } from '../../constants'

export const AddTextModal = ({ modalInfo }: any) => {
	const updateModalInfo = useStore( (state: any) => state.updateModalInfo )
	const insertTextArray = useStore( (state: any) => state.insertTextArray )

	const [ value, setValue ] = useState('') as any

	const onClose = () => {
		updateModalInfo({
			show: false
		})
	}

	const confirmAdd = () => {
		if( !value || value === '' )	return

		insertTextArray({
			text: value,
			pos: [ modalInfo.pos[0], modalInfo.pos[1] + 0.05, modalInfo.pos[2] + 1 ],
			standUp: false,
			color: defaultColors[2].colorHex
		})

		setValue('')
		onClose()
	}

	return (
		<Transition appear show={ modalInfo.show } as={Fragment}>
			<Dialog as="div" className="relative z-20" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Add Text
								</Dialog.Title>
									
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										<input 
											onKeyDown={(e: any) => e.key === 'Enter' ? confirmAdd() : null} 
											className='form form-control p-2 focus:outline-none w-full my-2 border rounded border-slate-500 border-2' 
											type={'text'} 
											placeholder={'Type the text please...'} 
											value={value} 
											onChange={(e: any) => setValue(e.target.value)}
										/>
									</p>
								</div>

								<div className="mt-4 r-0 relative">
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										onClick={ confirmAdd }
									>
										Confirm
									</button>

									<button
										type="button"
										className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										onClick={onClose}
									>
										Close
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
      </Transition>
	)
}

export default AddTextModal