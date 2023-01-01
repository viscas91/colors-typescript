import { useLayoutEffect, useState, useCallback, FC, lazy } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

const Card = lazy(() => import('./ColorCard'));

const generateColor = () => {
	return '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
}

const colorCount = 8

export interface ColorState {
	[key: string]: {
		isLocked: boolean,
		hex: string,
		rgb: string,
		rgba: string,
		hsl: string
	}
}

let state: ColorState = {}

for(let i=1; i<=colorCount; i++){
	let newState = {
		[`color${i}`]: {
			isLocked: false,
			hex: '',
			rgb: '',
			rgba: '',
			hsl: '',
		},
	}

	state = {...state, ...newState}
}

const ColorGenerator: FC = () => {
	const [color, setColor] = useState(state)

	const handleColorChange = useCallback((e?: React.SyntheticEvent) => {

		for(let i = 1; i<=colorCount; i++){
			if(color[`color${i}`].isLocked === false){
				setColor(prevState => ({ 
					...prevState, 
					[`color${i}`]: {
						...prevState[`color${i}`],
						hex: generateColor(),
					}
				}))
			}
		}
	}, [color])

	const handleIconChange = (props: number) => {
		for(let i = 1; i<=colorCount; i++){
			if(props === i){
				setColor(prevState => ({ ...prevState, [`color${i}`]: { ...prevState[`color${i}`], isLocked: !color[`color${i}`].isLocked } }));
			}
		}
	}

	useLayoutEffect(() => {
		handleColorChange();
	}, [])

	return (
		<>
		<Grid container spacing={1} marginTop='5rem'>
			<Grid item xs={12} sx={{ textAlign: 'center', margin: '1rem 0' }}>
				<Button variant='contained' aria-label='Generate Button' onClick={handleColorChange}>Generate</Button>
			</Grid>
			
		{ !!color['color1'].hex ? <Card color={color[`color1`]} id={1} handleIconChange={handleIconChange} /> : <Skeleton variant="rectangular" width={210} height={118} /> }
		{ !!color['color2'].hex ? <Card color={color[`color2`]} id={2} handleIconChange={handleIconChange} /> : <Skeleton variant="rectangular" width={210} height={118} /> }
		{ !!color['color3'].hex ? <Card color={color[`color3`]} id={3} handleIconChange={handleIconChange} /> : <Skeleton variant="rectangular" width={210} height={118} /> }
		{ !!color['color4'].hex ? <Card color={color[`color4`]} id={4} handleIconChange={handleIconChange} /> : <Skeleton variant="rectangular" width={210} height={118} /> }
		{ !!color['color5'].hex ? <Card color={color[`color5`]} id={5} handleIconChange={handleIconChange} /> : <Skeleton variant="rectangular" width={210} height={118} /> }
		{ !!color['color6'].hex ? <Card color={color[`color6`]} id={6} handleIconChange={handleIconChange} /> : <Skeleton variant="rectangular" width={210} height={118} /> }
		{ !!color['color7'].hex ? <Card color={color[`color7`]} id={7} handleIconChange={handleIconChange} /> : <Skeleton variant="rectangular" width={210} height={118} /> }
		{ !!color['color8'].hex ? <Card color={color[`color8`]} id={8} handleIconChange={handleIconChange} /> : <Skeleton variant="rectangular" width={210} height={118} /> }

		</Grid>
		</>
	)
}

export default ColorGenerator;