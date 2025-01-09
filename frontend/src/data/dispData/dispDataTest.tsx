import { DispType } from './dispModel';

export const dispTest: DispType[] = [
	{
		_id: '11',
		name: 'Lampada 1',
		category: 'lampada',
		favDisp: false,
		components: [
			{ component: { name: 'liga', style: 'switch', type: false } },
			{ component: { name: 'intesidade', style: 'slider', type: 0 } },
			{ component: { name: 'cores', style: 'rgb', type: 'white' } },
		],
	},
	{
		_id: '22',
		name: 'Lampada 2',
		category: 'lampada',
		favDisp: false,
		components: [
			{ component: { name: 'liga', style: 'switch', type: false } },
			{ component: { name: 'intesidade', style: 'slider', type: 0 } },
			{ component: { name: 'cores', style: 'rgb', type: 'blue' } },
		],
	},
	{
		_id: '33',
		name: 'Lampada 3',
		category: 'lampada',
		favDisp: true,
		components: [
			{ component: { name: 'liga', style: 'switch', type: false } },
			{ component: { name: 'intesidade', style: 'slider', type: 0 } },
			{ component: { name: 'cores', style: 'rgb', type: 'green' } },
		],
	},
	{
		_id: '44',
		name: 'Lampada 4',
		category: 'lampada',
		favDisp: false,
		components: [
			{ component: { name: 'liga', style: 'switch', type: false } },
			{ component: { name: 'intesidade', style: 'slider', type: 0 } },
			{ component: { name: 'cores', style: 'rgb', type: 'yellow' } },
		],
	},
	{
		_id: '55',
		name: 'Lampada 5',
		category: 'lampada',
		favDisp: true,
		components: [
			{ component: { name: 'liga', style: 'switch', type: false } },
			{ component: { name: 'intesidade', style: 'slider', type: 0 } },
			{ component: { name: 'cores', style: 'rgb', type: 'red' } },
		],
	},
];
