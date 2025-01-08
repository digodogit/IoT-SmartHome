import { DispType } from './dispModel';

export const dispTest: DispType[] = [
	{
		id: '11',
		name: 'Lampada 1',
		category: 'lampada',
		favDisp: false,
		dispProps: {
			components: [
				{ name: 'liga', style: 'switch', type: false },
				{ name: 'intesidade', style: 'slider', type: 0 },
				{ name: 'cores', style: 'rgb', type: 'blue' },
			],
		},
	},
	{
		id: '22',
		name: 'Lampada 2',
		category: 'lampada',
		favDisp: false,
		dispProps: {
			components: [
				{ name: 'liga', style: 'switch', type: false },
				{ name: 'intesidade', style: 'slider', type: 0 },
				{ name: 'cores', style: 'rgb', type: 'green' },
			],
		},
	},
	{
		id: '33',
		name: 'Lampada 3',
		category: 'lampada',
		favDisp: true,
		dispProps: {
			components: [
				{ name: 'liga', style: 'switch', type: false },
				{ name: 'intesidade', style: 'slider', type: 0 },
				{ name: 'cores', style: 'rgb', type: 'blue' },
			],
		},
	},
	{
		id: '44',
		name: 'Lampada 4',
		category: 'lampada',
		favDisp: false,
		dispProps: {
			components: [
				{ name: 'liga', style: 'switch', type: false },
				{ name: 'intesidade', style: 'slider', type: 0 },
				{ name: 'cores', style: 'rgb', type: 'green' },
			],
		},
	},
	{
		id: '55',
		name: 'Lampada 5',
		category: 'lampada',
		favDisp: true,
		dispProps: {
			components: [
				{ name: 'liga', style: 'switch', type: false },
				{ name: 'intesidade', style: 'slider', type: 0 },
				{ name: 'cores', style: 'rgb', type: 'red' },
			],
		},
	},
];
