import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader';
import ErrorAlert from '../components/error-alert';
import DataCarousel from '../components/data-carousel';

import { AppDispatch } from '../store';
import { fetchSlidesData } from '../store/actions';
import { selectSlidesData } from '../store/slides';

const Home = () => {
	const dispatch = useDispatch<AppDispatch>();
	const slidesData = useSelector(selectSlidesData);

	const fetchData = () => {
		dispatch(fetchSlidesData());
	}

	useEffect(() => {
		fetchData();
		let refreshRef: NodeJS.Timer;
		if (slidesData.refreshAfter) {
			refreshRef = setInterval(() => {
				fetchData();
			}, slidesData.refreshAfter);
		}

		return () => {
			clearInterval(refreshRef);
		}
	}, [slidesData.refreshAfter]);

	return (
		<div style={{height: "100%"}}>
			{slidesData.isLoading ? (
				<Loader />
			) :
				(slidesData.hasError || slidesData.slides.length === 0) ? (
					<ErrorAlert error={slidesData.hasError ? "Failed": "No Slides."} onRetry={fetchData} />
				) : (
					<DataCarousel slides={slidesData.slides} />
				)
			}
		</div>
	);
};

export default Home;