import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchSlidesData } from '../store/actions';
import { selectSlidesData } from '../store/slides';
// import DataCarousel from '../components/data-carousel';
// import ScreenWrapper from '../components/screen-wrapper';
// import Loader from '../components/loader';
// import ErrorAlert from '../components/error-alert';

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
		<div>
			{slidesData.isLoading ? (
				<p>Loader...</p>
			) :
				(slidesData.hasError || slidesData.slides.length === 0) ? (
					<p>Error</p>
				) : (
					<p>Data Carousel</p>
				)
			}
		</div>
	);
};

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		flexDirection: "column",
// 		width: "100%",
// 		height: "100%",
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		alignSelf: "center"
// 	}
// })

export default Home;