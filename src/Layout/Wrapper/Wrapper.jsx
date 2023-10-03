import { Outlet } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
	IconUser,
	IconUserEdit,
	IconLogout,
	IconBuildingWarehouse,
	IconCash,
	IconNotes,
	IconUserPlus,
} from '@tabler/icons-react'

const Wrapper = () => {
	const session = JSON.parse(localStorage.getItem('session'))
	return (
		<>
			<header className='container w-full bg-pharmacy-color-1 text-white'>
				<div className='py-4  shadow-md'>
					<div className='flex px-6'>
						<ul className='flex justify-between'>
							<li>
								<Menu as='div' className='relative inline-block text-left'>
									<Menu.Button className='flex items-center'>
										Modulos
									</Menu.Button>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Menu.Items className='absolute left-0 mt-2 w-56 origin-top-right 100 rounded-md bg-white shadow-lg focus:outline-none'>
											<div className='px-1 py-1'>
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active
																	? 'bg-pharmacy-color-6 text-black flex'
																	: 'text-gray-900'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															<IconBuildingWarehouse className='mr-2' /> Almacen
														</button>
													)}
												</Menu.Item>
											</div>
											<div className='px-1 py-1'>
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active
																	? 'bg-pharmacy-color-6 text-black flex text-sm'
																	: 'text-gray-900'
															}	flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															<IconCash className='mr-2' /> Ventas
														</button>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active
																	? 'bg-pharmacy-color-6 text-black flex text-sm'
																	: 'text-gray-900'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															<IconNotes className='mr-2' /> Pedidos
														</button>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active
																	? 'bg-pharmacy-color-6 text-black flex text-sm'
																	: 'text-gray-900'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															<IconUserPlus className='mr-2' /> Recursos Humanos
														</button>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</li>
							<li className='pl-4'>
								<Menu as='div' className='relative inline-block text-left'>
									<Menu.Button className='flex items-center'>
										Tablas
									</Menu.Button>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Menu.Items className='absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg focus:outline-none'>
											<div className='px-1 py-1'>
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active
																	? 'bg-pharmacy-color-6 text-black flex'
																	: 'text-gray-900'
															} flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															Productos
														</button>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active
																	? 'bg-pharmacy-color-6 text-black flex'
																	: 'text-gray-900'
															} flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															Grupos
														</button>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active
																	? 'bg-pharmacy-color-6 text-black flex'
																	: 'text-gray-900'
															} flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															Tipos
														</button>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</li>
							<li className='pl-4'>Movimientos</li>
							<li className='pl-4'>Reportes</li>
							<li className='pl-4'>Procesos</li>
							{/* I need to think if they are necessary 👇 */}
							{/* <li>Ventana</li>
              <li>Utiliarios</li>
              <li>Ayuda</li> */}
						</ul>
						<div className='flex justify-end w-full'>
							<Menu as='div' className='relative inline-block text-left'>
								<Menu.Button className='flex items-center'>
									<IconUser className='mr-2 text-white' />
									{session.name}
								</Menu.Button>
								<Transition
									as={Fragment}
									enter='transition ease-out duration-100'
									enterFrom='transform opacity-0 scale-95'
									enterTo='transform opacity-100 scale-100'
									leave='transition ease-in duration-75'
									leaveFrom='transform opacity-100 scale-100'
									leaveTo='transform opacity-0 scale-95'
								>
									<Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none'>
										<div className='px-1 py-1'>
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${
															active
																? 'bg-pharmacy-color-6 text-black flex'
																: 'text-gray-900'
														} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
													>
														<IconUserEdit className='mr-2' /> Perfil
													</button>
												)}
											</Menu.Item>
										</div>
										<div className='px-1 py-1'>
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${
															active
																? 'bg-pharmacy-color-6 text-black flex text-sm'
																: 'text-gray-900'
														} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
													>
														<IconLogout className='mr-2' /> Salir
													</button>
												)}
											</Menu.Item>
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</header>
			<Outlet />
		</>
	)
}

export default Wrapper
