/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'pharmacy-color-1': '#00417B',
				'pharmacy-color-2': '#01A3E2',
				'pharmacy-color-3': '#018CC9',
				'pharmacy-color-4': '#016BA7',
				'pharmacy-color-5': '#004E89',
				'pharmacy-color-6': '#EEEEEE',
			},
		},
	},
	plugins: [],
}
