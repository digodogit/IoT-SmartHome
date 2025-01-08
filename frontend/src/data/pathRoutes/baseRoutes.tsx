import DispositivosTemplate from '@/components/custom/dispositivos';
import { RouteType } from './config';
import Consumo from '@/components/custom/consumo';

export const baseRoutes: RouteType[] = [
	{
		path: '/dispositivos',
		element: <DispositivosTemplate />,
		state: 'dispositivos',
		sidebarProps: {
			displayText: 'Dispositivos',
		},
		child: [
			{
				path: '/dispositivos/lampada',
				element: <DispositivosTemplate categoria="lampada" />,
				state: 'lampada',
				sidebarProps: {
					displayText: 'lampada',
				},
			},
			{
				path: '/dispositivos/eletrodomesticos',
				element: <DispositivosTemplate categoria="eletrodomesticos" />,
				state: 'eletrodomesticos',
				sidebarProps: {
					displayText: 'eletrodomesticos',
				},
			},
		],
	},
	{
		path: '/consumo',
		element: <Consumo />,
		state: 'consumo',
		sidebarProps: {
			displayText: 'consumo',
		},
		child: [
			{
				path: '/consumo/geral',
				element: <Consumo categoria="geral" />,
				state: 'geral',
				sidebarProps: {
					displayText: 'geral',
				},
			},
			{
				path: '/consumo/energia',
				element: <Consumo categoria="energia" />,
				state: 'energia',
				sidebarProps: {
					displayText: 'energia',
				},
			},
			{
				path: '/consumo/agua',
				element: <Consumo categoria="agua" />,
				state: 'agua',
				sidebarProps: {
					displayText: 'agua',
				},
			},
		],
	},
];
