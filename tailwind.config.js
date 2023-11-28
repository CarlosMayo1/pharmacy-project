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
				'card-color-1': '#17a2b8',
				'card-color-2': '#28a745',
				'card-color-3': '#ffc107',
				'card-color-4': '#dc3545',
				'card-color-5': '#1591A5',
				'card-color-6': '#24963E',
				'card-color-7': '#D9A406',
				'card-color-8': '#BB2D3B',
			},
		},
	},
	plugins: [],
}
