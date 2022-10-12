import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CodeNumber from '../components/code-number';
import ErrorAlert from '../components/error-alert';
import Loader from '../components/loader';
import { selectPairCodeData } from '../store/selectors';
import { getLocalstoragePairCode } from '../utils/localstorage';
import { fetchPairCode, fetchSlidesData, setPairCode } from '../store/actions';
import { AppDispatch } from '../store';
import { DEVICE_PAIRING_CHECK_INTERVAL } from '../utils/constants';

let timeIntervalRef: NodeJS.Timer | undefined;

const PairingCode = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const pairCodeData = useSelector(selectPairCodeData);

	const fetchCode = async () => {
		const storedCode = getLocalstoragePairCode();
		if (storedCode && parseInt(storedCode)) {
			dispatch(setPairCode(parseInt(storedCode)));
			dispatch(fetchSlidesData());
		} else {
			dispatch(fetchPairCode());
		}
	}

	useEffect(() => {
		fetchCode();
	}, []);

	useEffect(() => {
		if (pairCodeData.isPaired) {
			navigate('home');
		} else if (pairCodeData.code) {
			timeIntervalRef = setInterval(() => {
				dispatch(fetchSlidesData());
            }, DEVICE_PAIRING_CHECK_INTERVAL);
		}

		return () => {
			clearInterval(timeIntervalRef);
		}
	}, [pairCodeData.isPaired, pairCodeData.code]);

	return (
		<div className="container">
			{(pairCodeData.isLoading || !pairCodeData.pairingChecked) ? (
				<Loader />
			) :
				pairCodeData.hasError ? (
					<ErrorAlert onRetry={fetchCode} error="Error" message="" />
				) : (pairCodeData.code !== null) && (
					<CodeNumber code={pairCodeData.code} />
				)
			}
		</div>
	);
};

export default PairingCode;