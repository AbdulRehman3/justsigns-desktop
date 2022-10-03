import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import ScreenWrapper from '../components/screen-wrapper';
// import CodeNumber from '../components/code-number';
import ErrorAlert from '../components/error-alert';
import Loader from '../components/loader';
import { selectPairCodeData } from '../store/selectors';
import { getLocalstoragePairCode } from '../utils/localstorage';
import { fetchPairCode, setPairCode } from '../store/actions';
import { AppDispatch } from '../store';

const PairingCode = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const pairCodeData = useSelector(selectPairCodeData);

	const fetchCode = async () => {
		const storedCode = getLocalstoragePairCode();
		if (storedCode && parseInt(storedCode)) {
			dispatch(setPairCode((parseInt(storedCode))));
			navigate('home');
		} else {
			dispatch(fetchPairCode());
		}
	}

	useEffect(() => {
		fetchCode();
	}, []);

	return (
		<div className="container">
			{pairCodeData.isLoading ? (
				<Loader/>
			) :
				pairCodeData.hasError ? (
					<ErrorAlert onRetry={fetchCode} error="Error" message="" />
				) : (pairCodeData.code !== null) && (
					<p>Pair Code...</p>
				)
			}
		</div>
	);
};

export default PairingCode;