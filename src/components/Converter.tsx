import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useEffect , useCallback, useState, FC } from 'react';
import { useTheme, useMediaQuery, debounce } from '@mui/material';
import {
	hexToRGB,
	RGBToHex,
	RGBToHSL,
	HSLToRGB,
	hexToHSL,
	HSLToHex,
	getRGB,
	getRGBA,
	splitRGB,
	copyToClipboard,
} from '../utils/utils';
import { UseSnackbar } from '../ui/useSnackbar';

const hex_reg = /^#([0-9A-F]{3}){1,2}$/i;

const Converter: FC = () => {

	const [rgbaSlider, setRGBASlider] = useState<number>(50);
	const [r, setR] = useState<number>(0);
	const [g, setG] = useState<number>(0);
	const [b, setB] = useState<number>(0);
	const [hex, setHex] = useState<string>('');
	const [hsl, setHsl] = useState<string>('');
	const [customHex, setCustomHex] = useState<string>('');
	const [customHexHelper, setCustomHexHelper] = useState<string>('');
	const [so, setSo] = useState<boolean>(false);
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
	const headEl = document.querySelector('head')

	const handleSlider = (e: Event, newValue: number | number[]): void => {
		setRGBASlider(newValue as number);
	}

	const handleRGBSlider = (e: Event, newValue: number | number[], props: string): void => {
		setCustomHex('')
		const value = newValue as number;

		switch (props) {
			case 'r':
				setR(+value);
				break;
			case 'g':
				setG(+value);
				break;
			case 'b':
				setB(+value);
			default:
				break;
		}

		const rgb_join = getRGB(r, g, b);
		const rgb_hex = RGBToHex(rgb_join);
		const rgb_hsl = RGBToHSL(rgb_join);

		setHex(rgb_hex);
		setHsl(rgb_hsl);
	}

	const convertCode = useCallback((value: string): void => {
		const rgb_data = hexToRGB(value);
		const rgb_split_data = splitRGB(rgb_data);
		const hsl_data = hexToHSL(value);

		setHex(value);

		setR(rgb_split_data.r);
		setG(rgb_split_data.g);
		setB(rgb_split_data.b);

		setHsl(hsl_data);

		setRGBASlider(50);
	}, [])

	const handleCustomHex = (value: string): void => {
		let valid: boolean;
		setCustomHex(value);
		valid = hex_reg.test(value)

		if (value !== '' && !valid) {
			setCustomHexHelper("Hex code is invalid")
		} else {
			setCustomHexHelper("")
			convertCode(value)
		}
	}

	const handleChange = (value: string, colorType: string) => {
		setCustomHex('')

		switch (colorType) {
			case 'hex':
				if (value !== "") {
					convertCode(value);
				}
				break;
			case 'rgb':
				const rgb_split_data = splitRGB(value);

				setR(rgb_split_data.r)
				setG(rgb_split_data.g)
				setB(rgb_split_data.b)

				setRGBASlider(50);
				break;
			case 'hsl':
				const hsl_hex = HSLToHex(value);
				const hsl_rgb = HSLToRGB(value)
				const hsl_rgb_split = splitRGB(hsl_rgb)

				setHsl(value);

				setHex(hsl_hex);
				setR(hsl_rgb_split.r);
				setG(hsl_rgb_split.g);
				setB(hsl_rgb_split.b);

				setRGBASlider(50);
				break;
			default:
				break;
		}
	};

	const handleChangeOpt = debounce(handleChange, 250)
	const handleSliderOpt = debounce(handleSlider, 250)
	const handleRGBSliderOpt = debounce(handleRGBSlider, 250)
	const handleCustomHexOpt = debounce(handleCustomHex, 150)

	const customHexBlur = () => {
		if (customHex === '' || customHexHelper.length > 0) {
			setCustomHexHelper('This field cannot be left blank');
		}
	}

	useEffect(() => {
		let initial_rgb = getRGB(r, g, b);

		let rgb_hex = RGBToHex(initial_rgb);
		let rgb_hsl = RGBToHSL(initial_rgb);

		setHex(rgb_hex);
		setHsl(rgb_hsl);
	}, [r, g, b, customHex]);

	return (
		<>
			<Box sx={{ 'padding': '40px 0', marginTop: '5rem' }}>
				<Box component="label" htmlFor='colorpicker' mb={1} sx={{ display: 'block' }}>Color Picker</Box>
				<TextField
					inputProps={{
						style: {
							padding: 0,
							height: '50px',
							width: '50px'
						}
					}}
					id="colorpicker"
					type="color"
					variant='outlined'
					aria-label='Color input'
					value={hex}
					onChange={e => handleChangeOpt(e.target.value, 'hex')}
				/>


				{hex ? <Paper elevation={6} sx={{ 'textAlign': 'center', 'width': '200px', backgroundColor: hex, color: '#FFFFFF', padding: '20px 0', margin: '20px 0' }}>{hex}</Paper> : ''}

				<Grid container my={3} spacing={2}>
					<Grid item xs={12}>
						<TextField
							aria-label='Custom HEX input'
							sx={
								{
									marginBottom: '1rem',
									width: matchesSM ? '100%' : '50%',
									padding: '0 0',
									'& .MuiOutlinedInput-root': {
										'& fieldset,&.Mui-focused fieldset': hex_reg.test(customHex) ? {
											borderColor: 'green', '&:focus': {
												borderColor: 'green'
											}
										} : ''

									}
								}
							}
							error={customHexHelper.length !== 0}
							helperText={customHexHelper}
							id="customHex"
							type="text"
							value={customHex}
							placeholder="Input hex code here"
							onChange={(e) => handleCustomHexOpt(e.target.value)}
							onBlur={customHexBlur}
						/>
					</Grid>

					<Grid item md={4} sm={6} xs={12}>
						<TextField
							aria-label='Hex calculated disabled input'
							fullWidth
							disabled
							id="hex"
							type="text"
							label="Hex"
							variant='standard'
							value={hex}
							onChange={e => handleChangeOpt(e.target.value, 'hex')}
							InputProps={
								{
									endAdornment: <InputAdornment position="end" onClick={() => { copyToClipboard(hex); setSo(true); }}>
										<IconButton aria-label='Copy Hex code' edge="end">
											<ContentCopyIcon />
										</IconButton>
									</InputAdornment>
								}
							}
						/>
					</Grid>

					<Grid item md={4} sm={6} xs={12}>
						<TextField
							aria-label='RGB calculated disabled input'
							fullWidth
							disabled
							id="rgb"
							type="text"
							label="RGB"
							variant='standard'
							data-test="inputRgb"
							value={getRGB(r, g, b)}
							onChange={e => handleChangeOpt(e.target.value, 'rgb')}
							InputProps={
								{
									endAdornment: <InputAdornment position="end" onClick={() => { copyToClipboard(getRGB(r, g, b)); setSo(true); }}>
										<IconButton aria-label='Copy RGB code' edge="end">
											<ContentCopyIcon />
										</IconButton>
									</InputAdornment>
								}
							}
						/>
					</Grid>

					<Grid item md={4} sm={6} xs={12}>
						<TextField
							aria-label='HSL calculated disabled input'
							fullWidth
							disabled
							data-test="inputHsl"
							label="HSL"
							variant='standard'
							id="hsl"
							type="text"
							placeholder="HSL Value"
							value={hsl}
							onChange={e => handleChangeOpt(e.target.value, 'hsl')}
							InputProps={
								{
									endAdornment: <InputAdornment position="end" onClick={() => { copyToClipboard(hsl); setSo(true); }}>
										<IconButton aria-label='Copy HSL code' edge="end">
											<ContentCopyIcon />
										</IconButton>
									</InputAdornment>
								}
							}
						/>
					</Grid>

					<Grid item md={4} sm={6} xs={12}>
						{ r ? <Paper elevation={6} sx={{ backgroundColor: getRGBA(r, g, b, rgbaSlider), marginBottom: '5px', padding: '10px 30px', textAlign: 'center' }}>{getRGBA(r, g, b, rgbaSlider)}</Paper>: '' }
						<Slider aria-label='rgba slider input' data-test="rgba-slider" id="rgbaSlide" max={100} min={0} value={+rgbaSlider} onChange={handleSliderOpt} />
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					<Grid item md={4} sm={6} xs={12}>
						<Paper elevation={4} sx={{ padding: '1rem' }}>
							<Typography variant='h4' textAlign="center">{r}</Typography>
						</Paper>
						<Slider aria-label='R slider input' data-test="red-rgb" id="red" max={255} min={0} value={+r} onChange={(e, value) => handleRGBSliderOpt(e, value, 'r')} />
					</Grid>

					<Grid item md={4} sm={6} xs={12}>
						<Paper elevation={4} sx={{ padding: '1rem' }}>
							<Typography variant='h4' textAlign="center">{g}</Typography>
						</Paper>
						<Slider aria-label='G slider input' data-test="green-rgb" id="green" max={255} min={0} value={+g} placeholder="G Value" onChange={(e, value) => handleRGBSliderOpt(e, value, 'g')} />
					</Grid>

					<Grid item md={4} sm={6} xs={12}>
						<Paper elevation={4} sx={{ padding: '1rem' }}>
							<Typography variant='h4' textAlign="center">{b}</Typography>
						</Paper>
						<Slider aria-label='B slider input' data-test="blue-rgb" id="blue" max={255} min={0} value={+b} placeholder="R Value" onChange={(e, value) => handleRGBSliderOpt(e, value, 'b')} />
					</Grid>
				</Grid>

				<UseSnackbar message='Copied' so={so} setSo={setSo} />
			</Box>
		</>
	)
}

export default Converter;